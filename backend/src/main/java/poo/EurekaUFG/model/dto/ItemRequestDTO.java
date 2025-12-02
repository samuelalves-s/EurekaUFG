package poo.EurekaUFG.model.dto;

import org.springframework.web.multipart.MultipartFile;
import poo.EurekaUFG.model.entity.LocalDeixou;

import java.time.LocalDate;

public record ItemRequestDTO(
        String nome,
        String descricao,
        String localAchou,
        LocalDeixou localDeixou,
        LocalDate data,
        String matriculaAchou,
        MultipartFile imagem
) {}
