import { X } from 'lucide-react';
import { useState } from 'react';
import api from "../../Services/Api";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

function ModalNewUser({ isOpen, onClose, onSuccess }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    if (!isOpen) return null;

    const formAddNewUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/users', formData);
            
            alert("Usuário criado com sucesso!");
            onSuccess(); 
            onClose();  
            setFormData({ name: '', email: '', password: '', role: 'user' }); 
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error);
            alert(error.response?.data?.error || "Erro ao conectar com o servidor");
        } finally {
            setLoading(false);
        }
    };

    const valorCamps = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 hover:text-red-500 transition-colors">
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl font-bold text-center mb-8">Novo Usuário</h2>
                
                <form className="space-y-4" onSubmit={formAddNewUser}>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Nome Completo:</label>
                        <input 
                            name="name" 
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none" 
                            placeholder="Ex: Maria Souza" 
                            onChange={valorCamps}
                            value={formData.name}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">E-mail:</label>
                        <input 
                            name="email"
                            type="email" 
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none" 
                            placeholder="maria@email.com" 
                            onChange={valorCamps}
                            value={formData.email}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Senha:</label>
                        <input 
                            name="password" 
                            type="password" 
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none" 
                            placeholder="*****"
                            onChange={valorCamps}
                            value={formData.password}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Cargo:</label>
                        <select 
                            name="role" 
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none appearance-none cursor-pointer"
                            value={formData.role}
                            onChange={valorCamps}
                            required
                        >
                            <option value="user">Funcionário</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 bg-gray-200 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 bg-[#0047ff] text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalNewUser;