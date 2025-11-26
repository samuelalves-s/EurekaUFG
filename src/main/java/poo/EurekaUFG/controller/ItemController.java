package poo.EurekaUFG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import poo.EurekaUFG.model.dto.ItemRequestDTO;
import poo.EurekaUFG.model.dto.ItemResponseDTO;
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

@RestController
@RequestMapping("/itens")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> createItem(
            @RequestParam("nome") String nome,
            @RequestParam("descricao") String descricao,
            @RequestParam("localAchou") String localAchou,
            @RequestParam("localDeixou") String localDeixou,
            @RequestParam("data") String data,
            @RequestParam("matriculaAchou") String matriculaAchou,
            @RequestParam("imagem") MultipartFile imagemFile
    ) throws IOException {

        if (imagemFile == null || imagemFile.isEmpty()) {
            return ResponseEntity.badRequest().body("Imagem é obrigatória");
        }

        String uploadDir = "uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + imagemFile.getOriginalFilename(); // CRIA UM NOME ÚNICO PARA O ARQUIVO DA IMAGEM
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(imagemFile.getInputStream(), filePath);

        LocalDeixou localDeixouEnum = LocalDeixou.valueOf(localDeixou);
        LocalDate dataConvertida = LocalDate.parse(data);

        ItemRequestDTO dto = new ItemRequestDTO(
                nome,
                descricao,
                localAchou,
                localDeixouEnum,
                dataConvertida,
                matriculaAchou,
                imagemFile
        );

        // Criar a entidade usando o construtor existente
        Item item = new Item(dto, filePath.toString());

        itemRepository.save(item);

        return ResponseEntity.ok("Item cadastrado com sucesso!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> atualizarItem(@PathVariable Long id, @RequestBody Item itemAtualizado) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));

        item.setNome(itemAtualizado.getNome());
        item.setDescricao(itemAtualizado.getDescricao());
        item.setLocalAchou(itemAtualizado.getLocalAchou());
        item.setLocalDeixou(itemAtualizado.getLocalDeixou());
        item.setStatusItem(itemAtualizado.getStatusItem());
        // se quiser permitir alterar outros campos, adicione aqui

        Item salvo = itemRepository.save(item);
        return ResponseEntity.ok(salvo);
    }

}
