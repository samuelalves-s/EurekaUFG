// src/components/RegisterModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const { login } = useAuth(); // Usamos o login para entrar direto após cadastrar
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    matricula: '',
    curso: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Simulação de Cadastro + Login Automático
    // Aqui você enviaria os dados para o Java
    const novoUsuario = {
        nome: formData.nome,
        email: formData.email,
        matricula: formData.matricula,
        curso: formData.curso,
        senha:formData.confirmarSenha,
        token: "token_novo_123"
    };

    alert("Conta criada com sucesso!");
    login(novoUsuario); // Loga o usuário automaticamente
    onClose(); // Fecha o modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl relative animate-fade-in">
        
        {/* Botão Fechar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl">
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Crie sua Conta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input name="nome" type="text" required onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Seu nome" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" required onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="seu.email@ufg.br" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
            <input name="matricula" type="text" required onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="200012345" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="curso" type="text" required onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Ciência da Computação" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input name="senha" type="password" required onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••" />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
             <input name="confirmarSenha" type="password" required onChange={handleChange}
               className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
               placeholder="••••••••" />
           </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-200">
            Cadastrar
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Já tem uma conta? 
          {/* Botão para trocar para o Login */}
          <button 
            onClick={onSwitchToLogin} 
            className="text-blue-600 hover:underline ml-1 font-medium"
          >
            Faça Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;