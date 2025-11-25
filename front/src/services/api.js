// src/services/api.js

// 1. Dados Falsos (Mock) - Simula o que viria do Banco de Dados Java
const ITENS_MOCK = [
  {
    id: 1,
    titulo: "Chave de Carro Honda",
    descricao: "Encontrada no estacionamento do bloco B, chave com chaveiro azul.",
    tipo: "ACHADO", // Enum: ACHADO ou PERDIDO
    data: "2023-11-24",
    imagem: "https://placehold.co/300x200/png?text=Chave+Carro", // Imagem placeholder
    local: "Estacionamento Bloco B",
    contato: "portaria@ufg.br"
  },
  {
    id: 2,
    titulo: "Caderno de Cálculo 1",
    descricao: "Esqueci na sala 204. Capa vermelha do Homem Aranha.",
    tipo: "PERDIDO",
    data: "2023-11-23",
    imagem: "https://placehold.co/300x200/png?text=Caderno",
    local: "Sala 204 - Bloco C",
    contato: "aluno@email.com"
  },
  {
    id: 3,
    titulo: "Garrafa Térmica Preta",
    descricao: "Deixada na mesa do refeitório durante o almoço.",
    tipo: "PERDIDO",
    data: "2023-11-25",
    imagem: "https://placehold.co/300x200/png?text=Garrafa",
    local: "Refeitório Central",
    contato: "aluno2@email.com"
  }
];

// 2. Função que simula a chamada ao Backend (GET /itens)
export const buscarItens = async () => {
  return new Promise((resolve) => {
    // Simula um delay de 1.5 segundos para parecer internet real
    setTimeout(() => {
      resolve(ITENS_MOCK);
    }, 1500);
  });
};

// 3. Função para simular o cadastro (POST /itens)
export const cadastrarItem = async (novoItem) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Enviando para o Java:", novoItem);
      // Adiciona um ID falso e retorna sucesso
      resolve({ ...novoItem, id: Math.random() }); 
    }, 1000);
  });
};