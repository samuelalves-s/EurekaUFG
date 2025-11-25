import React from "react";
import { LocalDeixou } from "../../../enums/LocalDeixou";

const ItemDetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl p-6 md:p-8 rounded-lg shadow-xl relative animate-fade-in">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Cabeçalho */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {item.nome || "Item sem nome"}
        </h2>

        {/* Conteúdo principal */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Imagem */}
          {item.imagem && (
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img
                src={item.imagem}
                alt={item.nome}
                className="max-h-48 object-contain rounded-md border border-gray-200"
              />
            </div>
          )}

          {/* Informações */}
          <div className="w-full md:w-1/2 space-y-2 text-sm">
            <p>
              <span className="font-semibold text-gray-700 word-brake: break-all">Descrição: </span>
              {item.descricao || "Não informada"}
            </p>

            <p>
              <span className="font-semibold text-gray-700 brake-words">Achado em: </span>
              {item.localAchou || "—"}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Local deixado:
              </span>{" "}
              {item.localDeixou ? LocalDeixou[item.localDeixou] : "—"}
            </p>

            <p>
              <span className="font-semibold text-gray-700">Data: </span>
              {item.data || "—"}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Matrícula de quem achou:
              </span>{" "}
              {item.matriculaAchou || "—"}
            </p>

            {item.matriculaPerdeu && (
              <p>
                <span className="font-semibold text-gray-700">
                  Matrícula de quem perdeu:
                </span>{" "}
                {item.matriculaPerdeu}
              </p>
            )}

            {item.statusItem && (
              <p>
                <span className="font-semibold text-gray-700">Status: </span>
                {item.statusItem === "DEVOLVIDO"
                  ? "Devolvido ao dono"
                  : "Aguardando retirada"}
              </p>
            )}
          </div>
        </div>

        {/* Rodapé com botão de fechar */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
