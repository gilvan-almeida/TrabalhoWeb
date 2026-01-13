import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../Services/Supabase';
import api from '../../Services/Api';

interface ModalNewItemProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

function ModalNewItems({ isOpen, onClose, onSuccess }: ModalNewItemProps) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        location: '',
        date: '',
        time: ''
    });

    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("Selecionar arquivo...");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let publicUrl = "";

            if (selectedFile) {
                const uniqueFileName = `${Date.now()}-${selectedFile.name}`;
                
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('ImagensSystem')
                    .upload(uniqueFileName, selectedFile);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from('ImagensSystem')
                    .getPublicUrl(uniqueFileName);
                
                publicUrl = urlData.publicUrl;
            }

            const payload = {
                title: formData.title,
                category: formData.category,
                description: formData.description,
                location: formData.location,
                date_found: formData.date,
                time_found: formData.time,
                image_url: publicUrl, 
                status: 'available'
            };

            await api.post("/items", payload);

            alert("Item cadastrado com sucesso!");
            onSuccess(); 
            onClose();
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-black hover:scale-110 transition-transform"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-black">
                    Registrar Novo Item
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Nome do Objeto:</label>
                        <input 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Categoria:</label>
                        <input 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Descrição:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Local onde foi encontrado:</label>
                        <input 
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Data:</label>
                            <input 
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none text-xs" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Hora:</label>
                            <input 
                                type="time" 
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none text-xs" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">
                            Imagem:
                        </label>
                        <label className="flex items-center w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner cursor-pointer hover:bg-gray-300 transition-colors">
                            <span className="text-gray-500 text-sm">{fileName}</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setSelectedFile(file); 
                                        setFileName(file.name); 
                                    }
                                }}
                            />
                        </label>
                        {fileName !== "Selecionar arquivo..." && (
                            <div className="mt-2 ml-1 flex items-center gap-2">
                                <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 truncate max-w-full">
                                    📎 {fileName}
                                </span>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setFileName("Selecionar arquivo...");
                                        setSelectedFile(null);
                                    }}
                                    className="text-red-500 text-[10px] font-bold hover:underline"
                                >
                                    Remover
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-[#ccc] hover:bg-gray-400 text-black font-bold py-3 rounded-xl transition-colors shadow-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Enviando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalNewItems;