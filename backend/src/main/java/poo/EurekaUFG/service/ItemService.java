package poo.EurekaUFG.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import poo.EurekaUFG.model.dto.ItemRequestDTO;
import poo.EurekaUFG.model.entity.Item;
import poo.EurekaUFG.model.entity.LocalDeixou;
import poo.EurekaUFG.repositories.ItemRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> findAll(){
        return itemRepository.findAll();
    }


    public void createItem(
            String nome,
            String descricao,
            String localAchou,
            String localDeixou,
            String data,
            String matriculaAchou,
            MultipartFile imagemFile
    ) throws IOException {

        if (imagemFile == null || imagemFile.isEmpty()) {
            throw new IllegalArgumentException("Imagem é obrigatória");
        }

        // Criar pasta caso não exista
        String uploadDir = "uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Gerar nome único
        String fileName = UUID.randomUUID() + "_" + imagemFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        Files.copy(imagemFile.getInputStream(), filePath);

        // Converter valores
        LocalDeixou localDeixouEnum = LocalDeixou.valueOf(localDeixou);
        LocalDate dataConvertida = LocalDate.parse(data);

        // Criar DTO
        ItemRequestDTO dto = new ItemRequestDTO(
                nome,
                descricao,
                localAchou,
                localDeixouEnum,
                dataConvertida,
                matriculaAchou,
                imagemFile
        );

        // Criar entidade
        Item item = new Item(dto, filePath.toString());

        // Salvar no banco
        itemRepository.save(item);
    }

    public Item atualizarItem(Long id, Item  itemAtualizado) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));

        item.setNome(itemAtualizado.getNome());
        item.setDescricao(itemAtualizado.getDescricao());
        item.setLocalAchou(itemAtualizado.getLocalAchou());
        item.setLocalDeixou(itemAtualizado.getLocalDeixou());
        item.setStatusItem(itemAtualizado.getStatusItem());
        item.setMatriculaPerdeu(itemAtualizado.getMatriculaPerdeu());
        // se quiser permitir alterar outros campos, adicione aqui

        return itemRepository.save(item);
    }




















}
