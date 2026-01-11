import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const AdminNavbar = () => {
  // Simulação de usuário
  const user = { firstName: "Admin" };

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white transition-all">
      {/* Logo */}
      <Link to="/" className="relative text-3xl font-bold text-slate-700 tracking-tight group">
        <span className="text-blue-600">Achados e </span>Perdidos
        <span className="text-blue-600 text-4xl leading-none">.</span>
        <div className="absolute -top-2 -right-12 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          Admin
        </div>
      </Link>

      {/* Perfil */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-700">Olá, {user.firstName}</p>
          <p className="text-xs text-slate-400">Gerente</p>
        </div>
        <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 hover:border-blue-400 transition-colors">
                <User size={20} className="text-slate-600" />
            </div>
            {/* Tooltip de Sair */}
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-slate-100 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg">
                    <LogOut size={14} /> Sair
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;