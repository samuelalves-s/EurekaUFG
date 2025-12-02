package poo.EurekaUFG.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUser {
    // Esses nomes devem ser EXATOS aos do frontend
    private String nome;
    private String email;
    private String matricula;
    private String curso;
    private String senha;
}