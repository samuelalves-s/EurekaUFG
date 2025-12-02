import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const LoginModal = ({ onClose, onSwitchToCadastro }) => {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Ocorreu um erro desconhecido no servidor.';
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || errorData.error || errorText;
                } catch (e) {
                    if (response.status === 401 || response.status === 403) {
                        errorMessage = 'Email ou senha incorretos.';
                    } else {
                        errorMessage = errorText || `Erro (${response.status}): Falha na requisição.`;
                    }
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const userData = data.user || data; // se não tiver "user", usa o próprio objeto
            const token = data.token || null;   // opcional, se quiser guardar

            console.log("RESPOSTA DO BACKEND:", userData);

            // Envia o objeto correto para login()
            login(userData);

            // Salva token se houver
            if (token) localStorage.setItem('token', token);

            onClose();


        } catch (err) {
            console.error("Erro no login:", err.message);
            setError(err.message);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Acesse sua Conta</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        disabled={isSubmitting}
                        className={`w-full font-bold py-2 rounded transition duration-200 ${
                            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
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
