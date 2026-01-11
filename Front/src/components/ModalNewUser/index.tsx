import { X } from 'lucide-react';

function ModalNewUser({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6"><X size={24} /></button>
                <h2 className="text-2xl font-bold text-center mb-8">Novo Usuário</h2>
                
                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Nome Completo:</label>
                        <input className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none" placeholder="Ex: Maria Souza" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">E-mail:</label>
                        <input type="email" className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none" placeholder="maria@email.com" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">Cargo:</label>
                        <select className="w-full bg-[#d9d9d9] rounded-xl py-3 px-4 outline-none appearance-none">
                            <option>Administrador</option>
                            <option>Funcionário</option>
                        </select>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-200 font-bold py-3 rounded-xl">Cancelar</button>
                        <button type="submit" className="flex-1 bg-[#0047ff] text-white font-bold py-3 rounded-xl">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalNewUser;