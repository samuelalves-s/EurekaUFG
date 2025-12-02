package poo.EurekaUFG.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import poo.EurekaUFG.model.dto.ItemRequestDTO;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String localAchou;

    @Enumerated(EnumType.STRING)
    private LocalDeixou localDeixou;

    private LocalDate data;

    @Enumerated(EnumType.STRING)
    private StatusItem statusItem;

    private String matriculaAchou;

    private String matriculaPerdeu; // sempre null no cadastro

    private String imagem; // caminho da imagem no servidor

    // Construtor usando DTO
    public Item(ItemRequestDTO data, String caminhoImagem) {
        this.nome = data.nome();
        this.descricao = data.descricao();
        this.localAchou = data.localAchou();
        this.localDeixou = data.localDeixou();
        this.data = data.data();
        this.matriculaAchou = data.matriculaAchou();
        this.imagem = caminhoImagem;
        this.statusItem = StatusItem.ENCONTRADO;
        this.matriculaPerdeu = null;
    }
}
