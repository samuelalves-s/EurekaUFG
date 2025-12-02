// src/pages/HowItWorks/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      {/* 1. Cabeçalho da Página */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Como Funciona?</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto px-4">
          Entenda o processo simples para recuperar seus itens ou ajudar a comunidade devolvendo algo encontrado no campus.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        
        {/* 2. Cartões de Passo a Passo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* FLUXO: QUEM PERDEU ALGO */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <span className="text-4xl">😟</span>
                    <h2 className="text-2xl font-bold text-gray-800">Perdi um objeto</h2>
                </div>
                
                <ul className="space-y-6 relative border-l-2 border-gray-200 ml-3 pl-8">
                    <li className="relative">
                        <span className="absolute -left-[2.4rem] bg-blue-100 text-blue-600 font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">1</span>
                        <h3 className="font-bold text-lg text-gray-800">Busque no Site</h3>
                        <p className="text-gray-600 text-sm">Procure na lista da página de itens encontrados se tem o item que você perdeu.</p>
                    </li>
                    <li className="relative">
                        <span className="absolute -left-[2.4rem] bg-blue-100 text-blue-600 font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">2</span>
                        <h3 className="font-bold text-lg text-gray-800">Verifique os Detalhes</h3>
                        <p className="text-gray-600 text-sm">Encontrou algo parecido? Clique para ver a foto e detalhes como onde ele está guardado atualmente.</p>
                    </li>
                    <li className="relative">
                        <span className="absolute -left-[2.4rem] bg-blue-100 text-blue-600 font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">3</span>
                        <h3 className="font-bold text-lg text-gray-800">Vá buscar</h3>
                        <p className="text-gray-600 text-sm">Dirija-se ao local indicado (ex: Reitoria ou Guarita), lembre que para retira-lo deve informar sua matrícula.</p>
                    </li>
                </ul>
            </div>

            {/* FLUXO: QUEM ACHOU ALGO */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <span className="text-4xl">🦸</span>
                    <h2 className="text-2xl font-bold text-gray-800">Achei um objeto</h2>
                </div>

                <ul className="space-y-6 relative border-l-2 border-gray-200 ml-3 pl-8">
                    <li className="relative">
                        <span className="absolute -left-[2.4rem] bg-green-100 text-green-600 font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">1</span>
                        <h3 className="font-bold text-lg text-gray-800">Cadastre o Item</h3>
                        <p className="text-gray-600 text-sm">Se cadastre no site, clique em "Reportar Item" e tire uma foto do objeto. Descreva onde você o encontrou.</p>
                    </li>
                    <li className="relative">
                        <span className="absolute -left-[2.4rem] bg-green-100 text-green-600 font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">2</span>
                        <h3 className="font-bold text-lg text-gray-800">Entregue no Ponto de Coleta</h3>
                        <p className="text-gray-600 text-sm">Leve o objeto até a seção de Achados e Perdidos mais próxima.</p>
                    </li>
                    <li className="relative">
                        <span className="absolute -left-[2.4rem] bg-green-100 text-green-600 font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">3</span>
                        <h3 className="font-bold text-lg text-gray-800">Pronto!</h3>
                        <p className="text-gray-600 text-sm">Você ajudou a comunidade. O status do item ficará como "Disponível" até o dono aparecer.</p>
                    </li>
                </ul>
            </div>
        </div>

        {/* 4. Botão de Voltar */}
        <div className="text-center mt-12">
            <Link to="/">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                    Voltar para o Início
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;