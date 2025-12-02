// src/pages/Contact/index.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      {/* 1. CABEÇALHO AZUL (Padrão das outras páginas) */}
      <div className="bg-blue-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Fale Conosco</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Dúvidas sobre um item? Sugestões para o sistema? Ou precisa saber onde fica nossa central?
        </p>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (Grid de 2 Colunas) */}
      <div className="container mx-auto px-4 -mt-10 mb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            
            {/* COLUNA DA ESQUERDA: Informações de Contato */}
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Atendimento</h2>
                
                <div className="space-y-6">
                    {/* Item: Endereço */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">📍</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Central de Achados e Perdidos</h3>
                            <p className="text-gray-600 text-sm">Prédio da Segurança Universitária</p>
                            <p className="text-gray-600 text-sm">Câmpus Samambaia - Goiânia, GO</p>
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-bold hover:underline mt-1 inline-block">
                                Ver no Google Maps &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Item: Email */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">✉️</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Email Oficial</h3>
                            <p className="text-gray-600 text-sm">achados@ufg.br</p>
                            <p className="text-gray-500 text-xs mt-1">Respondemos em até 24h úteis.</p>
                        </div>
                    </div>

                    {/* Item: Telefone */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">📞</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Telefone / WhatsApp</h3>
                            <p className="text-gray-600 text-sm">(62) 3521-0000</p>
                            <p className="text-gray-600 text-sm">Ramal: 1234</p>
                        </div>
                    </div>

                    {/* Item: Horário */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">🕒</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Horário de Funcionamento</h3>
                            <p className="text-gray-600 text-sm">Segunda a Sexta: 08:00 às 18:00</p>
                            <p className="text-gray-500 text-xs">Exceto feriados.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Botão Voltar */}
      <div className="text-center">
        <Link to="/" className="text-blue-600 font-bold hover:underline">
            &larr; Voltar para o Início
        </Link>
      </div>

    </div>
  );
};

export default Contact;