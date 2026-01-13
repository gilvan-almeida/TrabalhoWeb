import { useState } from "react";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar";
import TableUser from "../../components/TableUser";
import ModalNewUser from "../../components/ModalNewUser";
import ModalEditUser from "../../components/ModalEditUser";
import ModalAlert from "../../components/ModalAlert";
import { useNavigate } from "react-router-dom";
import api from '../../Services/Api';

import { useEffect } from "react";

function UsersManagerPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalNewOpen, setModalNewOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const userRaw = localStorage.getItem('@App:user');
        const loggedUser = JSON.parse(userRaw || '{}');

        console.log("Dados do usuário logado:", loggedUser);
        const userRole = loggedUser.role || loggedUser.cargo || loggedUser.nome_do_cargo;

        if (!userRole || userRole.trim().toLowerCase() !== 'admin') { 

            alert(`Acesso Negado: Seu cargo atual é "Funcionario", mas apenas "Administradores" tem acesso.`);
            navigate('/HomeAdm');
        }
    }, [navigate]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);


    const handleEdit = (user: any) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return; 

        try {
            await api.delete(`/users/${userToDelete.id}`);
            
            alert("Usuário removido com sucesso!");

            loadUsers(); 
        } catch (error: any) {
            console.error("Erro ao deletar:", error);
            const msg = error.response?.data?.error || "Erro ao remover usuário.";
            alert(msg);
        } finally {
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <ModalNewUser 
                isOpen={modalNewOpen} 
                onClose={() => setModalNewOpen(false)} 
                onSuccess={loadUsers}/>

            <ModalEditUser 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                user={userToEdit} 
                onSuccess={loadUsers} 
            />

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