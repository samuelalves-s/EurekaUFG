package poo.EurekaUFG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import poo.EurekaUFG.model.entity.Item;
import poo.EurekaUFG.service.ItemService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/itens")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAll() {
        return itemService.findAll();
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

        itemService.createItem(nome, descricao, localAchou, localDeixou, data, matriculaAchou, imagemFile);

        return ResponseEntity.ok("Item cadastrado com sucesso!");
    }


    @PutMapping("/{id}")
    public ResponseEntity<Item> atualizarItem(
            @PathVariable Long id,
            @RequestBody Item itemAtualizado) {
        Item salvo = itemService.atualizarItem(id, itemAtualizado);
        return ResponseEntity.ok(salvo);
    }

}
