import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provedor (A "Nuvem" que envolve o app)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ao carregar a página, verifica se já tem alguém salvo no LocalStorage
    useEffect(() => {
        const recoveredUser = localStorage.getItem('u_user');
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, []);

    // Função de Login (Salva no estado e no navegador)
    // Alterado: só recebe o objeto correto do usuário
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('u_user', JSON.stringify(userData));
    };

    // Função de Logout (Limpa tudo)
    const logout = () => {
        setUser(null);
        localStorage.removeItem('u_user');
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Hook personalizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);
