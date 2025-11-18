// package poo.EurekaUFG.controller;

// import org.springframework.web.bind.annotation.*;
// import poo.EurekaUFG.model.entity.Item;
// import poo.EurekaUFG.service.ItemService;
// import poo.EurekaUFG.model.entity.Usuario;

// import java.util.List;

// @RestController
// @RequestMapping("/itens")
// public class ItemController {

//     private final ItemService service = new ItemService();

//     @GetMapping
//     public List<Item> listar() throws Exception {
//         return service.listar();
//     }

//     @PostMapping
//     public void criar(@RequestBody Item item, Usuario usuario_achou) throws Exception{
//         service.criar(item, usuario_achou);
//     }
// }