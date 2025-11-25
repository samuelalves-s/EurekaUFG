import { useEffect, useState } from "react";
import "./modal.css";

import { useItemDataMutate } from "../../../hooks/useItemDataMutate";
import type { LocalDeixou } from "../../../interface/ItemData";

interface ModalProps {
  closeModal(): void;
}

export function CreateModal({ closeModal }: ModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [localAchou, setLocalAchou] = useState("");
  const [localDeixou, setLocalDeixou] = useState<LocalDeixou>("REITORIA");
  const [data, setData] = useState("");
  const [matriculaAchou, setMatriculaAchou] = useState("");

  // 🔴 antes: const { mutate, isSuccess, isLoading } = useItemDataMutate();
  // ✅ v5: isPending
  const { mutate, isSuccess, isPending } = useItemDataMutate();

  const submit = () => {
    if (!imagem) {
      alert("Selecione uma imagem");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("localAchou", localAchou);
    formData.append("localDeixou", localDeixou);
    formData.append("data", data);
    formData.append("matriculaAchou", matriculaAchou);
    formData.append("imagem", imagem);

    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      <div> deu certo</div>
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="modal-overlay">
      <div className="modal-body relative">
        {/* Botão de Fechar (X) */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>
       
        <h2>Cadastrar Item Perdido</h2>

        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e =>
            e.target.files && setImagem(e.target.files[0])
          }
        />
        <input
          placeholder="Local onde foi achado"
          value={localAchou}
          onChange={e => setLocalAchou(e.target.value)}
        />

        <label>Local deixado</label>
        <select
          value={localDeixou}
          onChange={e =>
            setLocalDeixou(e.target.value as LocalDeixou)
          }
        >
          <option value="REITORIA">Reitoria</option>
          <option value="BIBLIOTECA_CENTRAL">Biblioteca Central</option>
          <option value="CENTRO_DE_CONVIVENCIA">Centro de Convivência</option>
          <option value="FAV">FAV</option>
          <option value="EMAC">EMAC</option>
          <option value="SECAO_DE_VIGILANCIA">Seção de Vigilância</option>
          <option value="FACULDADE_DE_LETRAS">Faculdade de Letras</option>
          <option value="LABORATORIO_DE_LINGUAS">Laboratório de Línguas</option>
          <option value="ICB1">ICB1</option>
          <option value="ICB2">ICB2</option>
          <option value="ICB3">ICB3</option>
          <option value="ICB4">ICB4</option>
          <option value="INSTITUTO_DE_QUIMICA_I">Instituto de Química I</option>
          <option value="INSTITUTO_DE_QUIMICA_II">Instituto de Química II</option>
          <option value="INSTITUTO_DE_FISICA_I">Instituto de Física I</option>
          <option value="INSTITUTO_DE_FISICA_II">Instituto de Física II</option>
          <option value="FACULDADE_DE_COMUNICACAO_E_BIBLIOTECONOMIA">
            Faculdade de Comunicação e Biblioteconomia
          </option>
          <option value="FACULDADE_DE_HISTORIA_CIENCIAS_SOCIAIS_E_FILOSOFIA">
            Faculdade de História, Ciências Sociais e Filosofia
          </option>
          <option value="CENTRO_DE_AULAS_AROEIRA">Centro de Aulas Aroeira</option>
          <option value="CENTRO_DE_AULAS_BARU">Centro de Aulas Baru</option>
          <option value="CASA_DE_ESTUDANTE">Casa de Estudante</option>
          <option value="CENTRO_DE_CULTURA_E_EVENTOS">Centro de Cultura e Eventos</option>
          <option value="PARQUE_TECNOLOGICO_SAMAMBAIA">Parque Tecnológico Samambaia</option>
          <option value="CRTI">CRTI</option>
          <option value="OCA_INDIGENA">Oca Indígena</option>
          <option value="INSTITUTO_DE_MATEMATICA_E_ESTATISTICA">
            Instituto de Matemática e Estatística
          </option>
          <option value="IESA">IESA</option>
          <option value="UNIDADE_DE_SAUDE">Unidade de Saúde</option>
          <option value="CENTRO_ESPORTIVO">Centro Esportivo</option>
          <option value="LAMES">LAMES</option>
          <option value="CDIM">CDIM</option>
          <option value="CIAR">CIAR</option>
          <option value="LAPIG">LAPIG</option>
          <option value="LAMARH">LAMARH</option>
          <option value="LABICOM">LABICOM</option>
        </select>

        <input
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
        />
        <input
          placeholder="Matrícula de quem achou"
          value={matriculaAchou}
          onChange={e => setMatriculaAchou(e.target.value)}
        />

        <button
          className="btn-secondary"
          onClick={submit}
          disabled={isPending}
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
