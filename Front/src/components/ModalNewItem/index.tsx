import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ModalNewItemProps {
    isOpen: boolean;
    onClose: () => void;
}

function ModalNewItems({ isOpen, onClose }: ModalNewItemProps) {
    if (!isOpen) return null;
    const [fileName, setFileName] = useState("Selecionar arquivo...");

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

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Nome do Objeto:</label>
                        <input className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Categoria:</label>
                        <input className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Descrição:</label>
                        <textarea
                            rows={3}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Local onde foi encontrado:</label>
                        <input className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Data:</label>
                            <input type="date" className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none text-xs" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">Hora:</label>
                            <input type="time" className="w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner outline-none text-xs" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1 text-[13px]">
                            Image:
                        </label>
                        <label className="flex items-center w-full bg-[#d9d9d9] border-none rounded-xl py-2 px-4 shadow-inner cursor-pointer hover:bg-gray-300 transition-colors">
                            <span className="text-gray-500 text-sm">Selecionar arquivo...</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setFileName(file.name); 
                                }}
                                />
                        </label>
                        {fileName !== "Selecionar arquivo..." && (
                            <div className="mt-2 ml-1 flex items-center gap-2">
                            <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 truncate max-w-full">
                                📎 {fileName}
                            </span>
                            <button 
                                onClick={() => setFileName("Selecionar arquivo...")}
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
                            className="flex-1 bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalNewItems;