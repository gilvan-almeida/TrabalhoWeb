import { useState, useEffect, useCallback } from "react";
import { User, Mail, ShieldCheck, Lock, Pencil, Trash2, X, Check, Loader2 } from "lucide-react"; 
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar";
import ModalAlert from "../../components/ModalAlert"; 
import api from '../../Services/Api';
import { useNavigate } from "react-router-dom";

function UserPage() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [fetching, setFetching] = useState(true); 
    
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
        password: '' 
    });

    const loadUserData = useCallback(async () => {
        try {
            const loggedUser = JSON.parse(localStorage.getItem('@App:user') || '{}');
            
            if (!loggedUser.id) {
                navigate('/login');
                return;
            }

            const response = await api.get(`/users/${loggedUser.id}`);
            const user = response.data;

            setFormData({
                id: user.id || '',
                name: user.name || user.nome || '',
                email: user.email || '',
                role: user.role || user.cargo || '',
                password: '' 
            });
        } catch (error) {
            console.error("Erro ao carregar dados do banco:", error);
            const user = JSON.parse(localStorage.getItem('@App:user') || '{}');
            setFormData(prev => ({
                ...prev,
                id: user.id,
                name: user.nome || user.name,
                email: user.email,
                role: user.cargo || user.role
            }));
        } finally {
            setFetching(false);
        }
    }, [navigate]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload: any = { name: formData.name, email: formData.email };
            if (formData.password) payload.password = formData.password;

            await api.put(`/users/${formData.id}`, payload);

            const currentUser = JSON.parse(localStorage.getItem('@App:user') || '{}');
            localStorage.setItem('@App:user', JSON.stringify({ 
                ...currentUser, 
                nome: formData.name, 
                email: formData.email 
            }));

            alert("Perfil atualizado com sucesso!");
            setIsEditing(false);
            loadUserData();
        } catch (error: any) {
            alert(error.response?.data?.error || "Erro ao atualizar perfil.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteSelf = async () => {
        try {
            await api.delete(`/users/${formData.id}`);
            alert("Sua conta foi excluída com sucesso.");
            localStorage.clear(); 
            navigate('/login');    
        } catch (error: any) {
            alert(error.response?.data?.error || "Erro ao excluir conta.");
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-gray-500 font-medium">Carregando seus dados...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <main className="max-w-3xl mx-auto p-8 pt-24">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-black">Meu Perfil</h1>
                    </div>
                    
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <>
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="p-3 bg-blue-100 text-[#0047ff] rounded-full hover:scale-110 transition-all shadow-sm"
                                    title="Editar Perfil"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button 
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="p-3 bg-red-100 text-red-600 rounded-full hover:scale-110 transition-all shadow-sm"
                                    title="Excluir Minha Conta"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="p-3 bg-gray-100 text-gray-600 rounded-full hover:scale-110 transition-all"
                                title="Cancelar"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleUpdate} className={`space-y-6 p-8 rounded-[30px] border transition-all duration-300 ${isEditing ? 'bg-white border-blue-200 shadow-2xl' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <User size={16} className="text-blue-500" /> Nome Completo
                        </label>
                        <input 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={!isEditing}
                            className={`w-full rounded-xl py-3 px-4 outline-none transition-all ${isEditing ? 'bg-white border border-blue-500 ring-4 ring-blue-50' : 'bg-transparent border-transparent cursor-default font-medium text-lg text-gray-800'}`} 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <Mail size={16} className="text-blue-500" /> E-mail
                        </label>
                        <input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={!isEditing}
                            className={`w-full rounded-xl py-3 px-4 outline-none transition-all ${isEditing ? 'bg-white border border-blue-500 ring-4 ring-blue-50' : 'bg-transparent border-transparent cursor-default font-medium text-lg text-gray-800'}`} 
                        />
                    </div>

                    {isEditing && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <Lock size={16} className="text-blue-500" /> Nova Senha
                            </label>
                            <input 
                                type="password"
                                placeholder="Deixe em branco para não alterar"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-white border border-blue-500 rounded-xl py-3 px-4 outline-none ring-4 ring-blue-50" 
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <ShieldCheck size={16} className="text-gray-400" /> Cargo atual
                        </label>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 w-fit rounded-full text-xs font-black uppercase tracking-widest">
                            {formData.role === 'admin' && "Administrador"}
                            {formData.role === 'employee' && "Funcionário"}
                            {formData.role !== 'admin' && formData.role !== 'employee' && formData.role}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} /> Confirmar Alterações</>}
                            </button>
                        </div>
                    )}
                </form>
            </main>

            <ModalAlert 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={confirmDeleteSelf}
                itemName="sua própria conta e todos os seus dados" 
            />
        </div>
    );
}

export default UserPage;