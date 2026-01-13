import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../Services/Api';

interface User {
    id: number;
    nome: string;
    email: string;
    cargo: string; 
}

interface ModalEditUserProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSuccess: () => void;
}

function ModalEditUser({ isOpen, onClose, user, onSuccess }: ModalEditUserProps) {
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            
            setFormData({
                name: user.nome,
                email: user.email,
                role: user.cargo 
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/users/${user.id}`, formData);
            alert("Usuário atualizado com sucesso!");
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Erro ao editar usuário:", error.response?.data || error);
            alert("Erro ao atualizar usuário no servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">
                
                <button onClick={onClose} className="absolute top-6 right-6 text-black hover:scale-110 transition-transform">
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-black">Editar Usuário</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Nome Completo:</label>
                        <input 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="w-full bg-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">E-mail:</label>
                        <input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="w-full bg-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Cargo:</label>
                        <select 
                            value={formData.role} 
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            className="w-full bg-gray-100 rounded-xl py-3 px-4 outline-none cursor-pointer"
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Funcionário">Funcionário</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 rounded-xl transition-colors">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Salvando..." : "Salvar Dados"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditUser;