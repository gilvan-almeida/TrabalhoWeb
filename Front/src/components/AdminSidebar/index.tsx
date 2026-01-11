import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PackageSearch, Users, Settings, ShieldCheck } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const user = {
    fullName: "Administrador",
    imageUrl: "https://github.com/shadcn.png" 
  };

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Itens Perdidos", href: "/admin/itens", icon: PackageSearch },
    { name: "Usuários", href: "/admin/usuarios", icon: Users },
    { name: "Permissões", href: "/admin/permissoes", icon: ShieldCheck },
    { name: "Configurações", href: "/admin/config", icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-full border-r border-slate-200 bg-white">
      <div className="flex flex-col gap-3 justify-center items-center pt-8 pb-4">
        <div className="p-1 border-2 border-slate-100 rounded-full">
            <img className="w-16 h-16 rounded-full object-cover" src={user.imageUrl} alt="Avatar" />
        </div>
        <p className="text-slate-700 font-semibold">{user.fullName}</p>
      </div>

      <div className="flex-1 mt-4">
        {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
                <Link key={index} to={link.href} className={`relative flex items-center gap-3 p-3.5 mx-2 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
                  <link.icon size={20} />
                  <p>{link.name}</p>
                </Link>
            );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;