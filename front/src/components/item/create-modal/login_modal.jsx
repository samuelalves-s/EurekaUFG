// src/components/LoginModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext'; // Importe seu contexto

const LoginModal = ({ onClose, onSwitchToCadastro }) => {
  const { login } = useAuth();
  
  // Estados locais do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simula o envio dos dados
    login({
      nome: "Gabriel Estudante", // Aqui viria do backend
      email: email,
      token: "token_fake_123"
    });

    // Fecha o modal após logar
    onClose();
  };

  return (
    // 1. O FUNDO ESCURO E BORRADO (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      {/* 2. A CAIXA BRANCA (Modal) */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl relative animate-fade-in">
        
        {/* Botão de Fechar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Acesse sua Conta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="seu.email@ufg.br"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Não tem conta? <button 
          onClick={onSwitchToCadastro}
          className="text-blue-600 hover:underline"> Cadastre-se</button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;