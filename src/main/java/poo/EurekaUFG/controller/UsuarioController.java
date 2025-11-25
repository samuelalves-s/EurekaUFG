package poo.EurekaUFG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import poo.EurekaUFG.model.dto.LoginUser;
import poo.EurekaUFG.model.dto.RegisterUser;
import poo.EurekaUFG.model.entity.Usuario;
import poo.EurekaUFG.service.UsuarioService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody RegisterUser dto) {

        try {
            Usuario novoUsuario = usuarioService.cadastrar(dto);
            // Retorna o usuário criado com status 201 Created
            return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Retorna 400 Bad Request se o Service lançar um erro (ex: email duplicado)
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUser dto) {
        try {
            // ... (Chama o Service) ...
            Object responseData = usuarioService.login(dto);
            return ResponseEntity.ok(responseData);
        } catch (RuntimeException e) {
            // CORREÇÃO: Forçar o retorno de um JSON de erro válido

            // Crie um mapa simples para o erro
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Unauthorized");
            errorResponse.put("message", e.getMessage());

            // Retorne o status 401 Unauthorized com o mapa (JSON válido)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}