import React from 'react';
import { X } from 'lucide-react';

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
}

function ModalEditUser({ isOpen, onClose, user }: ModalEditUserProps) {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-black hover:scale-110 transition-transform"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-black">
                    Editar Usuário
                </h2>
                
                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Nome Completo:</label>
                        <input 
                            defaultValue={user.nome} 
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none shadow-inner" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">E-mail:</label>
                        <input 
                            type="email"
                            defaultValue={user.email} 
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none shadow-inner" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Cargo:</label>
                        <select 
                            defaultValue={user.cargo}
                            className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none shadow-inner appearance-none cursor-pointer"
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Funcionário">Funcionário</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 rounded-xl transition-colors shadow-md"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                        >
                            Salvar Dados
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditUser;