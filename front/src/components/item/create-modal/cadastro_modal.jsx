// src/components/RegisterModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        matricula: '',
        curso: '', // Manter no estado, mas removeremos no envio para o backend
        senha: '',
        confirmarSenha: ''
    });

    // Novos estados para controle de UI e erros
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { // 🚨 Tornar a função assíncrona é crucial para o fetch
        e.preventDefault();
        setError(''); // Limpa erros anteriores
        setIsSubmitting(true); // Começa o envio

        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não coincidem!");
            setIsSubmitting(false);
            return;
        }

        // 1. DTO (Objeto de Transferência de Dados) para o Backend
        // Removendo 'curso' e 'confirmarSenha', que não são esperados pelo Spring
        const userDataToSend = {
            nome: formData.nome,
            email: formData.email,
            matricula: formData.matricula,
            senha: formData.senha,
        };

        try {
            // 2. Chamar o endpoint de cadastro no seu backend Java
            const response = await fetch('http://localhost:8080/users/cadastro', { // 🚨 ATUALIZE ESTA URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataToSend),
            });

            // 3. Tratar a resposta do servidor
            if (!response.ok) {
                // Se o status for 400 ou 500, o Spring enviou um erro (ex: email duplicado)
                const errorText = await response.text();
                throw new Error(errorText || 'Erro desconhecido no servidor.');
            }

            // 4. Se o cadastro for 201 Created (sucesso):
            const novoUsuario = await response.json();

            alert("Conta criada com sucesso!");
            login(novoUsuario); // Loga o usuário automaticamente
            onClose();

        } catch (err) {
            console.error("Falha no cadastro:", err.message);
            setError(err.message); // Define a mensagem de erro para ser exibida no modal
        } finally {
            setIsSubmitting(false); // Finaliza o envio
        }
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

                    {/* 🚨 Área para mostrar erro */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm" role="alert">
                            {error}
                        </div>
                    )}

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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
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

                    <button
                        type="submit"
                        disabled={isSubmitting} // Desabilita durante o envio
                        className={`w-full font-bold py-2 rounded transition duration-200 ${
                            isSubmitting
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
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