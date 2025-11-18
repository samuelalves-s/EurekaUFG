package poo.EurekaUFG.model.dto;

import lombok.Data;

@Data
public class RegisterUser {
    private String nome;
    private String email;
    private String senha;
    private String matricula;
}
