import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Login_Cadastro/home";
import Login from "./pages/Login_Cadastro/login";
import Profile from "./pages/profile";

function App() {
    return(
        <Router>
            <Routes>

                {/* Redireciona a rota raiz (/) para /home */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Rota 1: Tela Inicial (Login/Cadastro) */}
                <Route path="/home" element={<Home />} />

                {/* Adicionei o Login, caso você queira usá-lo */}
                <Route path="/login" element={<Login />} />

                <Route path="/minha-conta" element={<Profile />} />

                {/* Rota de Teste */}
                <Route path="/teste" element={<h1>Router Funcionando! 🚀</h1>} />
            </Routes>
        </Router>
    );
}

export default App;