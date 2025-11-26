package poo.EurekaUFG.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // << Importe isto
import org.springframework.stereotype.Service;

import poo.EurekaUFG.model.dto.LoginUser; // << Nova Importação
import poo.EurekaUFG.model.dto.RegisterUser;
import poo.EurekaUFG.model.entity.Usuario;
import poo.EurekaUFG.repositories.UsuarioRepository; // << Certifique-se de que o Repositório está aqui

import java.util.HashMap;
import java.util.Map;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // << Injeção necessária

    // Método de Cadastro (assumindo que já existe)
    public Usuario cadastrar(RegisterUser dto) {
        // 1. Verifica se o email já existe
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        // 2. Cria e preenche o novo usuário (Use os métodos get/set gerados pelo Lombok)
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setMatricula(dto.getMatricula());

        // 3. Criptografa a senha antes de salvar
        String senhaCriptografada = passwordEncoder.encode(dto.getSenha());
        novoUsuario.setSenha(senhaCriptografada);
        novoUsuario.setAdm(false);

        // 4. Salva no banco de dados
        return usuarioRepository.save(novoUsuario);
    }

    public Object login(LoginUser dto) {
        // 1. Encontrar o usuário pelo email
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas."));

        // 2. Verificar a senha
        boolean senhaCorreta = passwordEncoder.matches(dto.getSenha(), usuario.getSenha());

        if (!senhaCorreta) {
            throw new RuntimeException("Credenciais inválidas.");
        }

        // 3. Retornar um objeto Map (que o Spring converte para JSON)
        // CORREÇÃO 2: Usando HashMap, que funciona em todas as versões do Java
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "Login bem-sucedido");
        responseMap.put("token", "TOKEN_AQUI_FUTURAMENTE");
        responseMap.put("usuario", dto.getEmail());
        responseMap.put("nome", usuario.getNome());
        responseMap.put("adm", usuario.getAdm());

        return responseMap; // << Retorna o Map
    }
}