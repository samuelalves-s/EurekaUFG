import { useState } from "react";
import { useItemData } from "../../hooks/useItemData";
import { CreateModal } from "../../components/item/create-modal/create-modal";
import type { ItemData } from "../../interface/ItemData";
//itens falsos para teste:
import { useQuery } from '@tanstack/react-query';
import { buscarItens } from '../../services/api'; // <--- Importe o Mock aqui!
import { Link } from "react-router-dom";
//incompleto
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../components/item/create-modal/login_modal';
import CadastroModal from '../../components/item/create-modal/cadastro_modal';
import ItemDetailsModal from '../../components/item/create-modal/item_detalhe_modal';
import { LocalDeixou } from "../../enums/LocalDeixou";

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCadOpen, setIsCadOpen] = useState(false);
  const handleSwitchToCadastro = () => {
    setIsLoginOpen(false);    // Fecha Login
    setIsCadOpen(true);  // Abre Cadastro
  };
  const handleSwitchToLogin = () => {
    setIsCadOpen(false); // Fecha Cadastro
    setIsLoginOpen(true);     // Abre Login
  };
  const handleItemToLogin = () =>{
    setIsCreateOpen(false);
    setIsLoginOpen(true);
  }

  const { data, isLoading, isError } = useItemData();
  const foundItems: ItemData[] = data ?? [];

  const { authenticated, login, user } = useAuth(); // Pega o status e a função login
  const handleLoginFake = () => {
    login({
      nome: "Gabriel Estudante",
      email: "gabriel@ufg.br",
      token: "token_falso_123"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2">
                <span role="img" aria-label="buscar">🔍</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Achados &amp; Perdidos</h1>
            </div>
            <div className="flex items-center gap-3">
              {authenticated? (
              <button
                className="gap-2 border px-4 py-2 rounded bg-transparent cursor-pointer"
                onClick={() => setIsCreateOpen(true)}
              >
                <span>➕</span>
                <span className="hidden sm:inline">Reportar Item</span>
                
              </button>
              ):(
                <button
                className="gap-2 border px-4 py-2 rounded bg-transparent cursor-pointer"
                onClick={() => setIsLoginOpen(true)}
              >
                <span>➕</span>
                <span className="hidden sm:inline">Reportar Item</span>
                
              </button>

              )}
              <div>
            {authenticated ? (
               /* SE ESTIVER LOGADO: Mostra botão Minha Conta e o Nome */
               <div className="flex gap-4 items-center">
                 <span>Olá, {user?.nome}</span>
                 <Link to="/minha-conta">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Minha Conta</button>
                 </Link>
               </div>
            ) : (
               /* SE ESTIVER DESLOGADO: Mostra botão Entrar */
               /*onClick={handleLoginFake} className="bg-gray-800 text-white px-4 py-2 rounded"> so que escrito abaixo de button*/
               <button 
               className="bg-gray-800 text-white px-4 py-2 rounded"
               onClick={() => setIsLoginOpen(true)}
               >
                  Entrar (Teste)
               </button>
            )}
          </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold text-slate-900 sm:text-4xl">
              Recupere seus Pertences Perdidos
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Consulte todos os itens encontrados no campus UFG Samambaia. Seu objeto pode estar aqui!
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                className="px-6 py-3 rounded bg-blue-600 text-white"
                onClick={() => {
                  const section = document.getElementById("grid-itens");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Buscar Itens
              </button>
              <button className="px-6 py-3 rounded border">
                Como Funciona?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {isLoading ? "..." : foundItems.length}
              </p>
              <p className="mt-2 text-sm text-slate-600">Itens Encontrados</p>
            </div>
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <p className="text-3xl font-bold text-green-600">127</p>
              <p className="mt-2 text-sm text-slate-600">Devolvidos ao Dono</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 text-center">
              <p className="text-3xl font-bold text-purple-600">24/7</p>
              <p className="mt-2 text-sm text-slate-600">Disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section
        id="grid-itens"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Itens Encontrados Recentemente</h2>
          <p className="mt-2 text-slate-600">Novos itens são adicionados diariamente</p>
        </div>

        {isLoading && <p className="text-slate-600">Carregando itens...</p>}
        {isError && (
          <p className="text-red-600">
            Ocorreu um erro ao carregar os itens. Tente novamente mais tarde.
          </p>
        )}

        {!isLoading && !isError && foundItems.length === 0 && (
          <p className="text-slate-600">Nenhum item encontrado até o momento.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!isLoading &&
            !isError &&
            foundItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border bg-white shadow-sm"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img
                    src={`http://localhost:8080/${item.imagem}`}
                    alt={item.nome}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="line-clamp-2 text-lg font-semibold">
                      {item.nome}
                    </h3>
                    {item.localAchou && (
                      <p className="mt-1 text-sm text-slate-500">
                        Achado em {item.localAchou}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="line-clamp-2 text-sm text-slate-600">
                      {item.descricao}
                    </p>
                    <div className="text-xs text-slate-500">
                      <strong>Local deixado:</strong> {item.localDeixou ? LocalDeixou[item.localDeixou] : "—"}
                    </div>
                    <div className="text-xs text-slate-500">
                      <strong>Data:</strong>{" "}
                      {item.data && new Date(item.data).toLocaleDateString("pt-BR")}
                    </div>
                    <button
                      onClick={() => {
                        // guarda o item que foi clicado
                        setSelectedItem({
                          ...item,
                          imagem: `http://localhost:8080/${item.imagem}`, // mesma URL que você usa no <img>
                        });
                        setShowDetails(true);
                      }}
                      className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white cursor-pointer"
                    >
                      Ver Detalhes
                    </button>

                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900">Sobre</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Contato</h3>
              <p className="mt-4 text-sm text-slate-600">
                Email:{" "}
                <a
                  href="mailto:achados@ufg.br"
                  className="text-blue-600 hover:underline"
                >
                  achados@ufg.br
                </a>
              </p>
              <p className="text-sm text-slate-600">
                Campus Samambaia - Goiânia, GO
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2025 Achados e Perdidos UFG Samambaia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {showDetails && selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => {
            setShowDetails(false);
            setSelectedItem(null); // limpa o item quando fechar
          }}
        />
      )}


      {isLoginOpen && (
         <LoginModal 
         onClose={() => setIsLoginOpen(false)} 
         onSwitchToCadastro={handleSwitchToCadastro}
         />
       )}
       {isCadOpen && (
         <CadastroModal 
            onClose={() => setIsCadOpen(false)} 
            onSwitchToLogin={handleSwitchToLogin} // Passamos a função de troca
         />
       )}

      {//Modal de criação }
      }
      {isCreateOpen && (
          <CreateModal closeModal= {() => setIsCreateOpen(false)} />     
      )}
      
    </div>
  );
}
