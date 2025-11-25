// src/pages/Profile/index.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import avatarPadrao from "../../assets/me_bebe_laranja-1.webp";

const Profile = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    // Proteção da rota
    useEffect(() => {
        if (!user) navigate("/home");
    }, [user, navigate]);

    // userData vem do user
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData({
                nome: user.nome || "",
                email: user.email || "",
                matricula: user.matricula || "",
                curso: user.curso || "",
                foto: user.foto || avatarPadrao,
            });
        }
    }, [user]);

    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState({});

    const handleStartEditing = () => {
        setTempData({ ...userData });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        setUserData(tempData);
        setIsEditing(false);
        alert("Dados salvos com sucesso! (Simulação)");
    };

    const handleLogout = () => {
        if (window.confirm("Tem certeza que deseja sair?")) {
            logout();
            navigate("/home");
        }
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Link
                to="/home"
                className="text-blue-600 hover:underline mb-4 inline-block"
            >
                &larr; Voltar para Home
            </Link>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">

                {/* Cabeçalho */}
                <div className="bg-blue-600 p-6 flex items-center gap-6">

                    <div className="relative">
                        <img
                            src={isEditing ? tempData.foto : userData.foto}
                            alt="Perfil"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover"
                        />

                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 text-sm">
                                📷
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const preview = URL.createObjectURL(file);
                                            setTempData((prev) => ({ ...prev, foto: preview }));
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex-1">
                        {isEditing ? (
                            <input
                                type="text"
                                name="nome"
                                value={tempData.nome}
                                onChange={handleChange}
                                className="w-full bg-gray-100 text-2xl font-bold text-gray-800 py-2 px-4 rounded"
                            />
                        ) : (
                            <h1 className="text-2xl font-bold text-white">{userData.nome}</h1>
                        )}

                        <p className="text-blue-100">{userData.curso}</p>
                    </div>
                </div>

                {/* Detalhes */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Informações Pessoais */}
                    <div>
                        <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">
                            Informações Pessoais
                        </h3>

                        <div className="space-y-4">

                            {/* Email */}
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

                            {/* Matrícula */}
                            <div>
                                <label className="block text-sm text-gray-600">Matrícula</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="matricula"
                                        value={tempData.matricula}
                                        onChange={handleChange}
                                        className="font-medium border border-gray-300 rounded p-1 w-full mt-1"
                                    />
                                ) : (
                                    <p className="font-medium text-gray-500">{userData.matricula}</p>
                                )}
                            </div>

                            {/* Curso */}
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

                    {/* Configurações */}
                    <div>
                        <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">
                            Configurações
                        </h3>

                        {isEditing ? (
                            <div className="flex gap-2 mb-3">
                                <button
                                    onClick={handleSave}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-bold"
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
                                onClick={handleStartEditing}
                                className="w-full mb-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded flex justify-between items-center transition"
                            >
                                Editar Perfil <span>✎</span>
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded flex justify-between items-center transition"
                        >
                            Sair da Conta <span>🚪</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
