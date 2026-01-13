import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../../Services/Api';

interface ModalColetaProps {
    isOpen: boolean;
    onClose: () => void;
    itemNome: string;
    itemId: number; 
    onSuccess: () => void;
}

function ModalColeta({ isOpen, onClose, itemNome, itemId, onSuccess }: ModalColetaProps) {
    const [collected_by, setCollectedBy] = useState('');
    const [document, setDocument] = useState('');
    const [collection_date, setCollectionDate] = useState('');
    const [collection_time, setCollectionTime] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // CORREÇÃO: Mudamos para .post para bater com o router.post do backend
            // Certifique-se que oitemId não é undefined
            await api.post(`/items/${itemId}/collect`, {
                collected_by,
                document,
                // Enviamos apenas se o usuário preencheu, senão o backend usa o default
                collection_date: collection_date || undefined,
                collection_time: collection_time || undefined
            });

            alert("Coleta registrada com sucesso!");
            onSuccess(); 
            onClose();
            
            // Limpa os campos para a próxima vez
            setCollectedBy('');
            setDocument('');
        } catch (error: any) {
            console.error("Erro na coleta:", error);
            // Se der 401 ou 403, o problema é o Token (Middleware Auth)
            alert(error.response?.data?.error || "Erro ao registrar coleta. Verifique se você está logado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Registrar Coleta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Item Selecionado</label>
                        <input 
                            disabled 
                            value={itemNome} 
                            className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 font-bold text-gray-600 cursor-not-allowed shadow-inner" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Nome do Receptor</label>
                        <input 
                            required
                            placeholder="Nome completo"
                            value={collected_by}
                            onChange={(e) => setCollectedBy(e.target.value)}
                            className="w-full bg-[#f3f4f6] rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner" 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Data</label>
                            <input 
                                type="date" 
                                value={collection_date}
                                onChange={(e) => setCollectionDate(e.target.value)}
                                className="w-full bg-[#f3f4f6] rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-inner" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Hora</label>
                            <input 
                                type="time" 
                                value={collection_time}
                                onChange={(e) => setCollectionTime(e.target.value)}
                                className="w-full bg-[#f3f4f6] rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-inner" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Documento / Matrícula</label>
                        <input 
                            required
                            placeholder="RG, CPF ou Matrícula"
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
                            className="w-full bg-[#f3f4f6] rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-inner" 
                        />
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 bg-[#0047ff] text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:bg-blue-300 transition-all shadow-lg shadow-blue-200"
                        >
                            {loading ? "Processando..." : "Confirmar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalColeta;