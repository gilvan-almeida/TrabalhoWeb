import { useState, useEffect } from "react";
import PesquisaBar from "../../components/PesquisaBar";
import TableDados from "../../components/TableDados";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar"; 
import ModalNewItems from "../../components/ModalNewItem";
import ModalEditItem from "../../components/ModalEdit";
import ModalAlert from "../../components/ModalAlert";
import api from '../../Services/Api';

function ManagerPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [itens, setItens] = useState<any[]>([]);
    const [termoPesquisa, setTermoPesquisa] = useState("");

    const [modalCadastroOpen, setModalCadastroOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemParaEditar, setItemParaEditar] = useState<any>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemParaExcluir, setItemParaExcluir] = useState<any>(null);

    const buscarItens = async () => {
        try {
            setLoading(true);
            const response = await api.get("/items"); 
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao carregar tabela:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarItens();
    }, []);

    const itensFiltrados = itens.filter((item) => {
        const busca = termoPesquisa.toLowerCase();
        return (
            item.title?.toLowerCase().includes(busca) || 
            item.nome?.toLowerCase().includes(busca) || 
            item.category?.toLowerCase().includes(busca) ||
            item.location?.toLowerCase().includes(busca)
        );
    });

    const abrirEdicao = (item: any) => {
        setItemParaEditar(item);
        setIsEditModalOpen(true);
    };

    const abrirConfirmacaoDelete = (item: any) => {
        setItemParaExcluir(item);
        setIsDeleteModalOpen(true); 
    };

    const confirmarExclusao = async () => {
        if (!itemParaExcluir) return;

        try {
            await api.delete(`/items/${itemParaExcluir.id}`);
            alert("Item removido com sucesso!");
            buscarItens();
        } catch (error) {
            console.error("Erro ao excluir item:", error);
            alert("Não foi possível excluir o item.");
        } finally {
            setIsDeleteModalOpen(false);
            setItemParaExcluir(null);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <ModalNewItems 
                isOpen={modalCadastroOpen} 
                onClose={() => setModalCadastroOpen(false)} 
                onSuccess={buscarItens}
            />
            
            <ModalEditItem 
                isOpen={isEditModalOpen} 
                onClose={() => {
                    setIsEditModalOpen(false);
                    setItemParaEditar(null);
                }} 
                item={itemParaEditar} 
                onSuccess={buscarItens}
            />

            <ModalAlert 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={confirmarExclusao}
                itemName={itemParaExcluir?.title || itemParaExcluir?.nome || "este item"}
            />

            <main className="max-w-7xl mx-auto p-8 space-y-8">
                <div className="flex justify-between items-start pt-4">
                    <div>
                        <h1 className="text-4xl font-bold text-black">Gerenciar Itens</h1>
                        <p className="text-gray-500 mt-2 text-lg">
                            Cadastre, edite ou exclua itens encontrados.
                        </p>
                    </div>
                    <button 
                        className="bg-[#0047ff] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-700 transition-all active:scale-95"
                        onClick={() => setModalCadastroOpen(true)}>
                        Novo Item
                    </button>
                </div>

                <div className="w-full">
                    <PesquisaBar onSearch={(valor) => setTermoPesquisa(valor)} />
                </div>

                <div className="mt-4">
                    {loading ? (
                        <div className="text-center py-10 font-medium text-gray-500">
                            Carregando dados da tabela...
                        </div>
                    ) : itensFiltrados.length > 0 ? (
                        <TableDados 
                            data={itensFiltrados}
                            onEdit={abrirEdicao} 
                            onDelete={abrirConfirmacaoDelete}
                        />
                    ) : (
                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500 text-lg">
                                {termoPesquisa 
                                    ? `Nenhum resultado para "${termoPesquisa}"` 
                                    : "Nenhum item cadastrado no momento."}
                            </p>
                            {!termoPesquisa && (
                                <button 
                                    onClick={() => setModalCadastroOpen(true)}
                                    className="mt-4 text-blue-600 font-bold hover:underline"
                                >
                                    Cadastrar o primeiro item
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ManagerPage;