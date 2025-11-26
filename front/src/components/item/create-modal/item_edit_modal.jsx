import React, { useState } from "react";
import { LocalDeixou } from "../../../enums/LocalDeixou";

const EditItemModal = ({ item, onClose }) => {
  const [nome, setNome] = useState(item.nome || "");
  const [descricao, setDescricao] = useState(item.descricao || "");
  const [localAchou, setLocalAchou] = useState(item.localAchou || "");
  const [localDeixou, setLocalDeixou] = useState(item.localDeixou || "");
  const [statusItem, setStatusItem] = useState(item.statusItem || "ENCONTRADO");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");

    try {
      const response = await fetch(`http://localhost:8080/itens/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          localAchou,
          localDeixou,
          statusItem,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao salvar item");
      }

      // por enquanto, recarrega a página pra ver a alteração
      window.location.reload();

    } catch (err) {
      console.error(err);
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-6 md:p-8 rounded-lg shadow-xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Editar Item
        </h2>

        {erro && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 px-3 py-2 rounded">
            {erro}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome do item
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Local onde foi achado
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                value={localAchou}
                onChange={(e) => setLocalAchou(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Local deixado
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                value={localDeixou}
                onChange={(e) => setLocalDeixou(e.target.value)}
              >
                <option value="">Selecione...</option>
                {Object.keys(LocalDeixou).map((key) => (
                  <option key={key} value={key}>
                    {LocalDeixou[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Status do item
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              value={statusItem}
              onChange={(e) => setStatusItem(e.target.value)}
            >
              <option value="ENCONTRADO">Encontrado</option>
              <option value="DEVOLVIDO">Devolvido ao dono</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={salvando}
              className={`px-4 py-2 rounded text-white text-sm font-semibold ${
                salvando ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
