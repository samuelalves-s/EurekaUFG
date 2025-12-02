package poo.EurekaUFG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import poo.EurekaUFG.model.dto.LoginUser;
import poo.EurekaUFG.model.dto.RegisterUser;
import poo.EurekaUFG.model.dto.UpdateUserRequest;
import poo.EurekaUFG.model.entity.Usuario;
import poo.EurekaUFG.service.UsuarioService;

import java.security.Principal;
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
            Usuario usuario = usuarioService.login(dto);

            Map<String, Object> response = new HashMap<>();
            response.put("nome", usuario.getNome());
            response.put("email", usuario.getEmail());
            response.put("matricula", usuario.getMatricula());
            response.put("curso", usuario.getCurso());
            response.put("foto", usuario.getFoto());
            response.put("adm", usuario.getAdm()); // 👈 usa getAdm().put("adm", usuario.isAdm());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Unauthorized");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }


    @PutMapping("/me")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest request) {
        try {
            // 1. Buscar o usuário atual pelo email antigo
            Usuario usuario = usuarioService.findByEmail(request.getEmailAntigo()); // precisamos enviar email antigo do frontend

            // 2. Verifica se o novo email já existe (e não é o do próprio usuário)
            if (!usuario.getEmail().equals(request.getEmail()) &&
                    usuarioService.existsByEmail(request.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Email já está em uso por outro usuário.");
            }

            // 3. Atualiza campos
            usuario.setNome(request.getNome());
            usuario.setEmail(request.getEmail());
            usuario.setMatricula(request.getMatricula());
            usuario.setCurso(request.getCurso());
            usuario.setFoto(request.getFoto());

            // 4. Salva
            Usuario atualizado = usuarioService.save(usuario);

            return ResponseEntity.ok(atualizado);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }


}