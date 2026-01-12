import { PackageSearch, Home, Box, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface mainSidebar {
    isOpen: boolean,
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: mainSidebar) {

    const navigation = useNavigate();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>


                <div className="p-6 flex items-center gap-3 border-b border-gray-100">
                    <div className="bg-black p-1.5 rounded-lg">
                        <PackageSearch size={22} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-sm font-bold text-black leading-tight">Achados e Perdidos</h2>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Administrativo</span>
                    </div>
                </div>

                <nav className="p-4 space-y-4">
                    <button className="w-full flex items-center gap-4 bg-[#d9d9d9] hover:bg-gray-300 p-3 rounded-xl shadow-sm transition-all group"
                        onClick={() => navigation("/homeAdm")}
                    >
                        <div className="bg-black p-2 rounded-lg text-white">
                            <Home size={20} />
                        </div>
                        <span className="font-bold text-gray-800 text-lg">Início</span>
                    </button>

                    <button 
                        className="w-full flex items-center gap-4 bg-[#d9d9d9] hover:bg-gray-300 p-3 rounded-xl shadow-sm transition-all group"
                        onClick={() => navigation("/managerPage")}>
                        <div className="bg-black p-2 rounded-lg text-white">
                            <Box size={20} />
                        </div>
                        <span className="font-bold text-gray-800 text-lg text-left leading-tight">
                            Gerenciar<br />itens
                        </span>
                    </button>

                    <button
                        className="w-full flex items-center gap-4 bg-[#d9d9d9] hover:bg-gray-300 p-3 rounded-xl shadow-sm transition-all group"
                        onClick={() => navigation("/managerUser")}
                    >
                        <div className="bg-black p-2 rounded-lg text-white  transition-colors">
                            <Users size={20} />
                        </div>
                        <span className="font-bold text-gray-800 text-lg text-left leading-tight">
                            Gerenciar<br />usuários
                        </span>
                    </button>

                </nav>

            </div>
        </>
    );
}

export default Sidebar;