import { Package, Users, DollarSign } from "lucide-react";

const HomeAdmPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Itens Perdidos</p>
            <h3 className="text-2xl font-bold text-slate-700">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Usuários Ativos</p>
            <h3 className="text-2xl font-bold text-slate-700">540</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Itens Recuperados</p>
            <h3 className="text-2xl font-bold text-slate-700">8</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 h-64 flex items-center justify-center text-slate-400">
        Gráficos e tabelas virão aqui...
      </div>
    </div>
  );
};

export default HomeAdmPage;