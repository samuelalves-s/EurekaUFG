// src/pages/Login_Cadastro/login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { login } = useAuth(); // vem do AuthContext

  const fazerLogin = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // aqui é importante bater com o DTO do backend (provavelmente email + senha)
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      if (!response.ok) {
        setMensagem("Erro ao realizar login. Verifique suas credenciais.");
        return;
      }

      const data = await response.json();
      // data esperado: { message, token, usuario, nome, admin }

      // Monta o objeto do usuário para o contexto
      const userData = {
        nome: data.nome,
        email: data.usuario || email,
        adm: data.adm,      // <-- AQUI entra o ADM
        token: data.token || null,
      };

      // Salva no AuthContext e no localStorage
      login(userData);

      setMensagem("Login realizado com sucesso!");
      // aqui você pode redirecionar, por ex: navigate("/")
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={fazerLogin}>
        <h2>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Entrar
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
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: 10,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: 10,
    background: "#0066ffff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};