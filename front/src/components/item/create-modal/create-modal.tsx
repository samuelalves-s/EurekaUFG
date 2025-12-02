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
  const [localDeixou, setLocalDeixou] = useState<LocalDeixou | "">("");
  const [data, setData] = useState("");
  const [matriculaAchou, setMatriculaAchou] = useState("");

  // antes: const { mutate, isSuccess, isLoading } = useItemDataMutate();
  // v5: isPending
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

      <div className="file-wrapper">
        {/* Campo VISUAL, igual aos outros inputs */}
        <div
          className={`fake-file-input ${imagem ? "has-file" : ""}`}
          onClick={() => document.getElementById("real-file-input")?.click()}
        >
          {imagem ? imagem.name : "Selecione uma imagem"}
        </div>

        {/* Input REAL, escondido, que abre o seletor de arquivos */}
        <input
          id="real-file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setImagem(e.target.files[0]);
            }
          }}
        />


      </div>


        <input
          placeholder="Local encontrado"
          value={localAchou}
          onChange={e => setLocalAchou(e.target.value)}
        />

        <div className="input-container">
          <div className="select-wrapper">
            <select
              className="styled-select"
              value={localDeixou}
              onChange={e => setLocalDeixou(e.target.value as LocalDeixou)}
            >
              <option value="" disabled>Local deixado</option>
              {Object.entries(LocalDeixou).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>




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
