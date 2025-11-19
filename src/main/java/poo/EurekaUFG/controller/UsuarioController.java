package poo.EurekaUFG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import poo.EurekaUFG.model.dto.LoginRequest;
import poo.EurekaUFG.model.dto.RegisterUser;
import poo.EurekaUFG.model.entity.Usuario;
import poo.EurekaUFG.repository.UsuarioRepository;
import poo.EurekaUFG.service.UsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody RegisterUser dto) {
        return usuarioService.cadastrar(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return usuarioService.login(request);
    }
}