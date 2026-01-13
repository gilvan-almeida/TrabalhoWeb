import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from "../../Services/Api";

// Interface igual à da Tabela
interface Item {
    id: number;
    title: string;
    category: string;
    location: string;
    date_found: string;
    status: string;
    image_url: string;
}

interface ModalEditItemProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item | null; 
    onSuccess: () => void;
}

function ModalEditItem({ isOpen, onClose, item, onSuccess }: ModalEditItemProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Item>>({});
    
    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                category: item.category,
                location: item.location,
                status: item.status
            });
        }
    }, [item]);

    if (!isOpen || !item) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/items/${item.id}`, formData);
            alert("Item atualizado com sucesso!");
            onSuccess();
            onClose();
        } catch (error) {
            alert("Erro ao atualizar item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 hover:scale-110 transition-transform"><X size={24} /></button>
                <h2 className="text-2xl font-bold text-center mb-8">Editar Item</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Nome do Objeto:</label>
                        <input 
                            name="title"
                            value={formData.title || ''} 
                            onChange={handleChange}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Categoria:</label>
                        <input 
                            name="category"
                            value={formData.category || ''} 
                            onChange={handleChange}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Local:</label>
                        <input 
                            name="location"
                            value={formData.location || ''} 
                            onChange={handleChange}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Status:</label>
                        <select 
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 outline-none"
                        >
                            <option value="available">Disponível</option>
                            <option value="collected">Retirado</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button type="button" onClick={onClose} className="flex-1 bg-[#ccc] font-bold py-3 rounded-xl">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-[#0047ff] text-white font-bold py-3 rounded-xl">
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditItem;