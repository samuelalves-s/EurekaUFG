package poo.EurekaUFG.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import poo.EurekaUFG.model.dto.LoginRequest;
import poo.EurekaUFG.model.dto.RegisterUser;
import poo.EurekaUFG.model.entity.Usuario;
import poo.EurekaUFG.repository.UsuarioRepository;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // -----------------------------
    // CADASTRAR USUÁRIO
    // -----------------------------
    public ResponseEntity<?> cadastrar(RegisterUser dto) {

        // Verificar email duplicado
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já está em uso!");
        }

        // Verificar matrícula duplicada
        if (usuarioRepository.findByMatricula(dto.getMatricula()).isPresent()) {
            return ResponseEntity.badRequest().body("Matrícula já cadastrada!");
        }

        Usuario user = new Usuario();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setMatricula(dto.getMatricula());
        user.setSenha(dto.getSenha()); // <-- sem criptografia

        usuarioRepository.save(user);

        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }

    // -----------------------------
    // LOGIN
    // -----------------------------
    public ResponseEntity<?> login(LoginRequest request) {

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado!");
        }

        Usuario usuario = usuarioOpt.get();

        // comparação direta da senha
        if (!usuario.getSenha().equals(request.getSenha())) {
            return ResponseEntity.badRequest().body("Senha incorreta!");
        }

        return ResponseEntity.ok("Login realizado com sucesso!");
    }
}
