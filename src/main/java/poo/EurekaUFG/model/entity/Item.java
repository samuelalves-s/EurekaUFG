 package poo.EurekaUFG.model.entity;

 import jakarta.persistence.*;
 import lombok.AllArgsConstructor;
 import lombok.Data;
 import lombok.NoArgsConstructor;

 import java.time.LocalDate;

 @Data // Getters e setters
 @Entity
 @NoArgsConstructor           // Obrigatório para JPA (um construtor vazio)
 @AllArgsConstructor          // Cria construtor com todos os parâmetros
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

     @ManyToOne
     @JoinColumn(name = "usuario_achou_id")
     private Usuario usuarioAchou;

     @ManyToOne
     @JoinColumn(name = "usuario_perdeu_id")
     private Usuario usuarioPerdeu;

     public Item(String nome, String descricao, String localAchou, LocalDeixou localDeixou,
                 LocalDate data, StatusItem statusItem, Usuario usuarioAchou, Usuario usuarioPerdeu) {
         this.nome = nome;
         this.descricao = descricao;
         this.localAchou = localAchou;
         this.localDeixou = localDeixou;
         this.data = data;
         this.statusItem = statusItem;
         this.usuarioAchou = usuarioAchou;
         this.usuarioPerdeu = usuarioPerdeu;
     }

 }
