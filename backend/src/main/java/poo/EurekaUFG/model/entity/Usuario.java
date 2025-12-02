package poo.EurekaUFG.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String curso;
    private String nome;
    private String email;
    private String matricula;
    private String senha;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String foto;

    private Boolean adm;
}
