import { Menu, PackageSearch, LogOut } from 'lucide-react';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface mainNavbarAdm{
    openMenu: () => void,
}


function NavBarAdm({openMenu}: mainNavbarAdm) {

    const navigation = useNavigate();

    return (
        <nav className="w-full">
            <div className="bg-[#d9d9d9] py-4 px-8 flex items-center justify-between shadow-sm">

                <div className="flex items-center gap-8">
                    <button 
                        onClick={openMenu}
                        className="text-black hover:bg-gray-300 p-2 rounded-lg transition-colors">
                        <Menu size={32} strokeWidth={2.5} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="bg-black p-2 rounded-lg">
                            <PackageSearch size={28} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold leading-tight text-black">
                                Achados e Perdidos
                            </h1>
                            <span className="text-sm font-medium text-gray-600 -mt-1">
                                Administrativo
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                    className="flex items-center gap-2 text-black hover:text-red-600 font-bold text-xl transition-colors group"
                    onClick={()=>navigation("/")}>
                    <LogOut size={24} className="group-hover:translate-x-1 transition-transform" />
                    <span>Sair</span>
                </button>

            </div>
        </nav>
    );
}

export default NavBarAdm;