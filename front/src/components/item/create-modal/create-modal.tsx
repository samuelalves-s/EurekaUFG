import { useEffect, useState } from "react";
import "./modal.css";

import { useItemDataMutate } from "../../../hooks/useItemDataMutate";
import { LocalDeixou } from "../../../enums/LocalDeixou";

interface ModalProps {
  closeModal(): void;
}

export function CreateModal({ closeModal }: ModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [localAchou, setLocalAchou] = useState("");
  const [localDeixou, setLocalDeixou] = useState<LocalDeixou>(LocalDeixou.REITORIA);
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
          onChange={e => setLocalDeixou(e.target.value as LocalDeixou)}
        >
          {Object.entries(LocalDeixou).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
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
