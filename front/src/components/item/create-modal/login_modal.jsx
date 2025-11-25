// src/components/LoginModal.jsx

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const LoginModal = ({ onClose, onSwitchToCadastro }) => {
    const { login } = useAuth();

    // Estados locais do formulário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(''); // Para exibir mensagens de erro
    const [isSubmitting, setIsSubmitting] = useState(false); // Para desabilitar o botão

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpar erros anteriores
        setIsSubmitting(true); // Começa o processo de envio

        try {
            // 1. Chamar o endpoint de login no seu backend Java
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            // 2. Tratar erro de credenciais (ex: status 401 Unauthorized)
            if (!response.ok) {
                // Tenta ler o corpo da resposta como texto primeiro
                const errorText = await response.text();
                let errorMessage = 'Ocorreu um erro desconhecido no servidor.';

                // Tenta analisar o texto como JSON (para erros customizados do Spring)
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || errorData.error || errorText;
                } catch (e) {
                    // Se a análise JSON falhar (HTML/texto simples)
                    if (response.status === 401 || response.status === 403) {
                        errorMessage = 'Email ou senha incorretos.';
                    } else {
                        errorMessage = errorText || `Erro (${response.status}): Falha na requisição.`;
                    }
                }
                throw new Error(errorMessage);
            }

            // 3. Obter os dados REAIS do usuário
            const userData = await response.json();

            // 4. Se o login foi bem-sucedido: Salvar os dados e fechar o modal
            login(userData);
            onClose();

        } catch (err) {
            // 5. Bloco CATCH: Captura o erro lançado no try ou falha de rede/parsing
            console.error("Erro no login:", err.message);
            setError(err.message);

        } finally {
            // 6. Bloco FINALLY: Sempre executa (limpeza)
            setIsSubmitting(false); // Termina o processo de envio, independente de sucesso ou falha
        }
    }; // <<< FIM DA FUNÇÃO handleSubmit

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

                    {/* 🚨 Área para mostrar erro */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm" role="alert">
                            {error}
                        </div>
                    )}

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
                        disabled={isSubmitting} // Desabilita durante o envio
                        className={`w-full font-bold py-2 rounded transition duration-200 ${
                            isSubmitting
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
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