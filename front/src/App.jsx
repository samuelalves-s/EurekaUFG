import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





export default function Login() {
  const [Email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  

  const fazerLogin = async (e) => {
    e.preventDefault();

    // Substituir pela URL do seu backend em Java
    const url = "http://localhost:8080/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
      });

      if (response.ok) {
        setMensagem("Login realizado com sucesso!");
      } else {
        setMensagem("Usuário ou senha incorretos.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={fazerLogin} style={styles.card}>
        <h2>Cadastro</h2>

        <input
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Nome"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
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

        <button style={styles.button}>Entrar</button>

       <button style={styles.link}>Logar</button>
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
    background: "#0066ffff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  },
  
  link:{
    padding: 10,
    border: "none",
    background: "#0066ffff",
    color: "#fff",
    cursor: "pointer"
  }
  
};







/*
// // Importamos a página que criamos acima
// import login from './pages/Login_Cadastro/login'; 
// //import Cadastro from './pages/Cadastro/Cadastro';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Define as rotas aqui *///}
//         <Route path="/login" element={<login />} />
//         {/*<Route path="/cadastro" element={<Cadastro />} />*/}
//         <Route path="/" element={<h1>Bem-vindo à Home</h1>} />
//       </Routes>
//     </Router>
//   );
// }


// export default App