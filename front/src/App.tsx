import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Login_Cadastro/home";
import Login from "./pages/Login_Cadastro/login";
import Profile from "./pages/profile";

function App() {
  return( 
<Router>
      <Routes>
        {/* Rota 1: Tela Inicial (Login/Cadastro) */}
        <Route path="/home" element={<Home />} />

        <Route path="/minha-conta" element={<Profile />} />
        {/* Rota de Teste: Só para ver se o Router funcionou */}
        <Route path="/teste" element={<h1>Router Funcionando! 🚀</h1>} />
      </Routes>
    </Router>
    );
  }

export default App;
