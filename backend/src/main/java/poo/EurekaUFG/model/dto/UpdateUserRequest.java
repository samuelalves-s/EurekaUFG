package poo.EurekaUFG.model.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String nome;
    private String emailAntigo;
    private String email;
    private String matricula;
    private String curso;
    private String foto; // pode ser URL ou Base64
}
