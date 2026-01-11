import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import AdminNavbar from "../NavBarAdm/index";
import AdminSidebar from "../AdminSidebar/index";

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando verificação de login
    setTimeout(() => {
        setIsAdmin(true); 
        setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-slate-800" size={40} />
          <p className="text-slate-500">Acessando painel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
        <h1 className="text-3xl font-semibold text-slate-400 mb-4">Acesso Restrito</h1>
        <Link to="/" className="bg-slate-800 text-white flex items-center gap-2 p-3 px-8 rounded-full hover:bg-slate-900 transition">
          Voltar para home <ArrowRightIcon size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;