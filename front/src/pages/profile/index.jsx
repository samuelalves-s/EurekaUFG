// src/pages/Profile/index.jsx
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useAuth } from '../../context/AuthContext';   // Importe nosso hook
import avatarPadrao from '../../assets/me_bebe_laranja-1.webp';

const Profile = () => {    
   
  const { logout, user } = useAuth(); // Pega a função logout e o usuário da "nuvem"
  const navigate = useNavigate();     // Ferramenta de redirecionamento


  // Se não tiver usuário logado, chuta ele pra Home (Proteção de Rota)
  useEffect(() => {
    if (!user) {
      navigate('/home');
    }
  }, [user, navigate]);

    // 1. Estado para controlar se está editando ou não
  const [isEditing, setIsEditing] = useState(false);

  // 2. Estado com os dados do usuário (Simulando que veio do Banco)
  const [userData, setUserData] = useState({
    nome: "Gabriel Estudante",
    email: "gabriel@ufg.br",
    matricula: "202301552",
    curso: "Ciência da Computação",
    foto: avatarPadrao
  });

  const [tempData, setTempData] = useState({});

  const handleStartEditing = () => {
    setTempData({ ...userData }); // Cria uma cópia dos dados atuais para o rascunho
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () =>{
    setIsEditing(false);
  }

  // Função para salvar (aqui conectaremos com o Back-end no futuro)
  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
    alert("Dados salvos com sucesso! (Simulação)");
    // Aqui viria a chamada: api.atualizarUsuario(userData)
  };
  
  const handleLogout = () => {
    const confirm = window.confirm("Tem certeza que deseja sair?");
    if (confirm) {
      logout(); // Limpa o contexto
      navigate('/home'); // Manda para a Home
    }
  };

  // Se user for nulo (ainda carregando ou deslogado), não mostra nada para evitar erro
  if (!user) return null;

  return (
  <div className="min-h-screen bg-gray-50 p-8">
      <Link to="/home" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Home</Link>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Cabeçalho do Perfil */}
        <div className="bg-blue-600 p-6 flex items-center gap-6">
            <img src={userData.foto} alt="Perfil" className="w-24 h-24 rounded-full border-4 border-white shadow-sm"/>
            <div className="flex-1">
                {/* Lógica: Se estiver editando, mostra Input. Se não, mostra Texto */}
                {isEditing ? (
                    <input 
                        type="text" 
                        name="nome"
                        value={tempData.nome}
                        onChange={handleChange}
                        className="w-full bg-gray-100 text-2xl font-bold text-gray-800 py-2 px-4 rounded w-full"
                    />
                ) : (
                    <h1 className="text-2xl font-bold text-white">{userData.nome}</h1>
                )}
                
                <p className="text-blue-100">{userData.curso}</p>
            </div>
        </div>

        {/* Detalhes */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">Informações Pessoais</h3>
                <div className="space-y-4">
                    
                    {/* Campo Email */}
                    <div>
                        <label className="block text-sm text-gray-600">Email Acadêmico</label>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="email"
                                value={tempData.email}
                                onChange={handleChange}
                                className="font-medium border border-gray-300 rounded p-1 w-full mt-1"
                            />
                        ) : (
                            <p className="font-medium">{userData.email}</p>
                        )}
                    </div>

                    {/* Campo Matrícula (Geralmente não editável, mas deixei como exemplo) */}
                    <div>
                        <label className="block text-sm text-gray-600">Matrícula</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="matricula"
                                value={tempData.matricula}
                                onChange={handleChange}
                                className="font-medium border border-gray-300 rounded p-1 w-full mt-1 cursor-pointer"
                            />
                        ):(
                        <p className="font-medium text-gray-500" >{userData.matricula}</p>
                        )}
                    </div>

                     {/* Campo Curso (Novo input se estiver editando) */}
                     {isEditing && (
                        <div>
                            <label className="block text-sm text-gray-600">Curso</label>
                            <input 
                                type="text" 
                                name="curso"
                                value={tempData.curso}
                                onChange={handleChange}
                                className="font-medium border border-gray-300 rounded p-1 w-full mt-1"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Área de Ações */}
            <div>
                <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">Configurações</h3>
                
                {/* Botão Dinâmico: Muda de "Editar" para "Salvar" */}
                {isEditing ? (
                    <div className="flex gap-2 mb-3">
                        <button 
                            onClick={handleSave}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-center font-bold"
                        >
                            Salvar Alterações
                        </button>
                        <button 
                            onClick={handleCancel}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => handleStartEditing(true)}
                        className="w-full mb-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded text-left flex justify-between items-center transition"
                    >
                        Editar Perfil <span>✎</span>
                    </button>
                )}

                <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded text-left flex justify-between items-center transition">
                    Sair da Conta <span>🚪</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;