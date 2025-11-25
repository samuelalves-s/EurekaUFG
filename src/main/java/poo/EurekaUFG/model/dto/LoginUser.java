package poo.EurekaUFG.model.dto;

import lombok.Data; // Certifique-se de que o Lombok está funcionando!

@Data
public class LoginUser {
    private String email;
    private String senha;
}