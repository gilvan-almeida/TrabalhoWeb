import { useState } from "react";
import PesquisaBar from "../../components/PesquisaBar";
import TableDados from "../../components/TableDados";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar"; 
import ModalNewItems from "../../components/ModalNewItem";
import ModalEditItem from "../../components/ModalEdit";
import ModalAlert from "../../components/ModalAlert";

function ManagerPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalCadastroOpen, setModalCadastroOpen] = useState(false);
    const [itemParaEditar, setItemParaEditar] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemParaExcluir, setItemParaExcluir] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const abrirEdicao = (item: any) => {
        setItemParaEditar(item);
        setIsEditModalOpen(true);
    };

    const confirmarExclusao = () => {
        console.log("Excluindo item:", itemParaExcluir.id);
        setIsDeleteModalOpen(false);
    }

    const abrirConfirmacaoDelete = (item: any) => {
        setItemParaExcluir(item);
        setIsDeleteModalOpen(true); 
    };

    const mockItens = [
        { id: 1, nome: "Relogio Cassio", imagemUrl:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", categoria: "Acessórios", local: "Laboratório", data: "12/12/2025", status: "Pendente" },
        { id: 2, nome: "Relogio Cassio", imagemUrl:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", categoria: "Acessórios", local: "Laboratório", data: "12/12/2025", status: "Pendente" },
        { id: 3, nome: "Relogio Cassio", imagemUrl:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",categoria: "Acessórios", local: "Laboratório", data: "12/12/2025", status: "Pendente" },
    ];

    return (
        <div className="min-h-screen bg-white">

            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            <ModalNewItems 
                isOpen={modalCadastroOpen} 
                onClose={() => setModalCadastroOpen(false)} 
            />
            
            <ModalEditItem 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                item={itemParaEditar} 
            />

            <ModalAlert 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={confirmarExclusao}
                itemName={itemParaExcluir?.nome || ""}
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
                    <PesquisaBar />
                </div>

                <div className="mt-4">
                    <TableDados data={mockItens} onEdit={abrirEdicao} onDelete={abrirConfirmacaoDelete}/>
                </div>
            </main>
        </div>
    );
}

export default ManagerPage;