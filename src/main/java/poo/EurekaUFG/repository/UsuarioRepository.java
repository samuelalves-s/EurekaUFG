package poo.EurekaUFG.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poo.EurekaUFG.model.entity.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByMatricula(String matricula);
}
