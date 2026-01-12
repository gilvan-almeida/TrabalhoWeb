import React from 'react';
import { X } from 'lucide-react';

interface ModalColetaProps {
    isOpen: boolean,
    onClose: () => void,
    itemNome: string,
}


function ModalColeta({ isOpen, onClose, itemNome }: ModalColetaProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">


                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-black hover:scale-110 transition-transform"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-black">
                    Registrar Coleta
                </h2>

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Item:</label>
                        <input
                            disabled
                            value={itemNome}
                            className="w-full bg-[#d9d9d9] border-none rounded-xl py-3 px-4 font-bold text-black shadow-inner"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Nome da Pessoa:</label>
                        <input className="w-full bg-[#d9d9d9] border-none rounded-xl py-3 px-4 shadow-inner outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1">Data:</label>
                            <input type="date" className="w-full bg-[#d9d9d9] border-none rounded-xl py-3 px-4 shadow-inner outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-600 ml-1">Hora:</label>
                            <input type="time" className="w-full bg-[#d9d9d9] border-none rounded-xl py-3 px-4 shadow-inner outline-none" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600 ml-1">Documento/Matricula:</label>
                        <input className="w-full bg-[#d9d9d9] border-none rounded-xl py-3 px-4 shadow-inner outline-none" />
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
                            className="flex-1 bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalColeta;