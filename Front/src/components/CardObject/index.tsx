import { MapPin, Calendar, Info } from 'lucide-react'; // Trocado Trash2 por Info

interface CardObjectProps {
    adminMode: boolean;
    title: string;
    category: string;
    location: string;
    date: string;
    status: string;
    imageUrl: string;
    openModal?: (nome: string) => void;
    onDelete?: () => void; 
    onShowDetails?: () => void;
}

function CardObject({ adminMode, title, category, location, date, status, imageUrl, openModal, onShowDetails }: CardObjectProps) {
    
    const handleColetaClick = () => {
        if (status === 'collected') {
            onShowDetails?.();
            return;
        }
        openModal?.(title);
    };

    return (
        <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 font-sans relative">
            <div className="relative">
                <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />

                    <div className="absolute top-4 right-4 flex gap-2 items-center">
                        <span className={`text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm ${
                            status === 'collected' ? 'bg-green-600/90' : 'bg-yellow-500/90'
                        }`}>
                            {status === 'collected' ? 'Coletado' : 'Disponível'}
                        </span>
                    </div>
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mt-2 font-semibold">
                        {category}
                    </span>
                </div>

                <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-gray-900" />
                        <span className="text-sm font-medium">{location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-gray-900" />
                        <span className="text-sm font-medium">{date}</span>
                    </div>
                </div>

                {adminMode && (
                    <button
                        className={`w-full font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 mt-2 ${
                            status === 'collected' 
                            ? 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200' 
                            : 'bg-[#0047ff] hover:bg-blue-700 text-white'
                        }`}
                        onClick={handleColetaClick}
                    >
                        {status === 'collected' ? 'Ver Detalhes da Coleta' : 'Registrar Coleta'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CardObject;