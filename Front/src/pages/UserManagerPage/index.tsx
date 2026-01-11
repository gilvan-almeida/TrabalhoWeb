import { useState } from "react";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar";
import TableUser from "../../components/TableUser";
import ModalNewUser from "../../components/ModalNewUser";
import ModalEditUser from "../../components/ModalEditUser";
import ModalAlert from "../../components/ModalAlert";

function UsersManagerPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalNewOpen, setModalNewOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [users, setUsers] = useState([
        { id: 1, nome: "Admin Master", email: "admin@escola.com", cargo: "Administrador", status: "Ativo" },
        { id: 2, nome: "João Silva", email: "joao@escola.com", cargo: "Funcionário", status: "Ativo" },
    ]);

    const handleEdit = (user: any) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <ModalNewUser isOpen={modalNewOpen} onClose={() => setModalNewOpen(false)} />
            <ModalEditUser isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={userToEdit} />
            <ModalAlert 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={confirmDelete}
                itemName={userToDelete?.nome || ""} 
            />

            <main className="max-w-7xl mx-auto p-8 space-y-8">
                <div className="flex justify-between items-start pt-4">
                    <div>
                        <h1 className="text-4xl font-bold text-black">Gerenciar Usuários</h1>
                        <p className="text-gray-500 mt-2 text-lg">Controle quem tem acesso ao painel administrativo.</p>
                    </div>
                    <button 
                        onClick={() => setModalNewOpen(true)}
                        className="bg-[#0047ff] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-700 transition-all"
                    >
                        Novo Usuário
                    </button>
                </div>

                <div className="mt-4">
                    <TableUser data={users} onEdit={handleEdit} onDelete={handleDeleteClick} />
                </div>
            </main>
        </div>
    );
}

export default UsersManagerPage;