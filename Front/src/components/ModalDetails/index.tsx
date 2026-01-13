import React from 'react';
import { X, User, FileText, Calendar, Clock, Package, MapPin, AlignLeft } from 'lucide-react';

interface ModalDetalhesProps {
    isOpen: boolean;
    onClose: () => void;
    item: any; 
}

function ModalDetalhes({ isOpen, onClose, item }: ModalDetalhesProps) {
    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                    <X size={24} strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Informações Detalhadas</h2>

                <div className="space-y-6">

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                            <Package size={16} /> Sobre o Objeto
                        </h3>
                        
                        <div className="bg-gray-50 p-5 rounded-2xl space-y-4">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400">Nome do Item</p>
                                <p className="font-bold text-gray-800 text-lg">{item.title}</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-1" />
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Local onde foi encontrado</p>
                                    <p className="text-sm font-semibold text-gray-700">{item.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <AlignLeft size={18} className="text-gray-400 mt-1" />
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Descrição</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.description || "Nenhuma descrição detalhada fornecida."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {item.status === 'collected' && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider flex items-center gap-2">
                                <CheckCircleIcon size={16} /> Dados da Retirada
                            </h3>

                            <div className="border-2 border-green-50 p-5 rounded-2xl space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Retirado por</p>
                                        <p className="text-sm font-bold text-gray-700">{item.collected_by}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Documento / Matrícula</p>
                                        <p className="text-sm font-bold text-gray-700">{item.document}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <div>
                                            <p className="text-[9px] uppercase font-bold text-gray-400">Data da Coleta</p>
                                            <p className="text-xs font-bold text-gray-700">{item.collection_date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-gray-400" />
                                        <div>
                                            <p className="text-[9px] uppercase font-bold text-gray-400">Horário</p>
                                            <p className="text-xs font-bold text-gray-700">{item.collection_time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={onClose}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98]"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
}

function CheckCircleIcon({size}: {size: number}) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}

export default ModalDetalhes;