package poo.EurekaUFG.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import poo.EurekaUFG.model.entity.Usuario;

import java.util.Optional;

@Repository // Permite que o Spring injete esta interface
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Método customizado para buscar o usuário pelo email (útil para login e validação de cadastro)
    Optional<Usuario> findByEmail(String email);

}