import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ModalAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

function ModalAlert({ isOpen, onClose, onConfirm, itemName }: ModalAlertProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsDeleting(true);
        await onConfirm();
        setIsDeleting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-[30px] p-8 relative shadow-2xl text-center">
                
                <div className="flex justify-center mb-4 text-red-500">
                    <AlertTriangle size={50} />
                </div>

                <h2 className="text-xl font-bold text-black mb-2">
                    Deseja mesmo apagar?
                </h2>
                
                <p className="text-gray-500 text-sm mb-8">
                    Você está prestes a excluir o item <span className="font-bold text-black">"{itemName}"</span>. Esta ação não pode ser desfeita.
                </p>

                <div className="flex gap-4">
                    <button 
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                    >
                        Não, voltar
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
                    >
                        {isDeleting ? "Apagando..." : "Sim, apagar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAlert;