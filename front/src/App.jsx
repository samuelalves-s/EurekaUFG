import { useState } from 'react'
import './App.css'

export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const fazerCadastro = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8080/users/cadastro";

        const usuario = {
            nome: nome,
            email: email,
            matricula: matricula,
            senha: senha
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });

            const texto = await response.text();
            setMensagem(texto);

        } catch (error) {
            setMensagem("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={fazerCadastro} style={styles.card}>
                <h2>Cadastro</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="text"
                    placeholder="Matrícula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={styles.input}
                />

                <button style={styles.button} type="submit">
                    Cadastrar
                </button>

                {mensagem && <p>{mensagem}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f8f8ff",
    },
    card: {
        background: "#ffffffff",
        padding: 30,
        width: 300,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    input: {
        padding: 10,
        fontSize: 16,
        borderRadius: 4,
        border: "1px solid #ccc"
    },
    button: {
        padding: 10,
        background: "#0066ff",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer"
    }
};
