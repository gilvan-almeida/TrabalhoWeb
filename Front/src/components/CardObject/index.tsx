import { MapPin, Calendar } from 'lucide-react';

interface CardObjectProps{
    adminMode: boolean,
}

function CardObject({adminMode}: CardObjectProps) {
  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 font-sans">

      <div className="relative">
        <img 
          className="w-full h-64 object-cover" 
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" 
          alt="Relógio" 
        />
        <span className="absolute top-4 right-4 bg-yellow-600/80 text-white text-xs font-medium px-4 py-1.5 rounded-full backdrop-blur-sm">
          Disponível
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Relogio Cassio</h2>
          <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mt-2 font-semibold">
            Acessórios
          </span>
        </div>

        <div className="space-y-3 text-gray-600">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gray-900" />
            <span className="text-sm font-medium">Biblioteca - 2 bloco</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-900" />
            <span className="text-sm font-medium">12/12/2025 - 14:30Hrs</span>
          </div>
        </div>
        {adminMode && (
          <button className="w-full bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 mt-2">
            Registrar Coleta
          </button>
        )}
      </div>
    </div>
  );
}

export default CardObject;