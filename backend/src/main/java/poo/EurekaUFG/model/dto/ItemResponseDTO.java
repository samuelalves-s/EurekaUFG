package poo.EurekaUFG.model.dto;

import poo.EurekaUFG.model.entity.Item;
import poo.EurekaUFG.model.entity.LocalDeixou;
import poo.EurekaUFG.model.entity.StatusItem;

import java.time.LocalDate;

public record ItemResponseDTO(
        Long id,
        String nome,
        String descricao,
        String localAchou,
        LocalDeixou localDeixou,
        LocalDate data,
        StatusItem statusItem,
        String matriculaAchou,
        String matriculaPerdeu,
        String imagem
) {
    public ItemResponseDTO(Item item){
        this(
                item.getId(),
                item.getNome(),
                item.getDescricao(),
                item.getLocalAchou(),
                item.getLocalDeixou(),
                item.getData(),
                item.getStatusItem(),
                item.getMatriculaAchou(),
                item.getMatriculaPerdeu(),
                item.getImagem()
        );
    }
}
