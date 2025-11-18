package poo.EurekaUFG.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor           // Obrigatório para JPA (um construtor vazio)
@AllArgsConstructor          // Cria construtor com todos os parâmetros
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;
    private String matricula;

    public Usuario(String nome, String email, String matricula, String senha) {
        this.nome = nome;
        this.email = email;
        this.matricula = matricula;
        this.senha = senha;
    }
}