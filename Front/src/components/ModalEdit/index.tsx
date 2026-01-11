import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Item {
    id: number;
    nome: string;
    categoria: string;
    local: string;
    data: string;
    status: string;
    imageUrl?: string;
}

interface ModalEditItemProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item | null; 
}

function ModalEditItem({ isOpen, onClose, item }: ModalEditItemProps) {
    const [fileName, setFileName] = useState("Alterar imagem...");

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl border border-gray-200">
                
                <button onClick={onClose} className="absolute top-6 right-6 text-black hover:scale-110 transition-transform">
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-black">
                    Editar Item
                </h2>

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Nome do Objeto:</label>
                        <input 
                            defaultValue={item.nome} 
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Categoria:</label>
                        <input 
                            defaultValue={item.categoria} 
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Local onde foi encontrado:</label>
                        <input 
                            defaultValue={item.local} 
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Data:</label>
                            <input 
                                type="text"
                                defaultValue={item.data} 
                                className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none text-xs" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Status:</label>
                            <select 
                                defaultValue={item.status}
                                className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none text-xs h-[32px]"
                            >
                                <option value="Pendente">Pendente</option>
                                <option value="Coletado">Coletado</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Image:</label>
                        <label className="flex items-center w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner cursor-pointer">
                            <span className="text-gray-500 text-sm truncate">{fileName}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
                        </label>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button type="button" onClick={onClose} className="flex-1 bg-[#ccc] text-black font-bold py-3 rounded-xl shadow-md">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 bg-[#0047ff] text-white font-bold py-3 rounded-xl shadow-lg">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditItem;