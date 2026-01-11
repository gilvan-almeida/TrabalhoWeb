import { useState } from "react";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar";
import CardStatistics from "../../components/CardStatistics";
import PesquisaBar from "../../components/PesquisaBar"; 
import CardObject from "../../components/CardObject";   
import ModalColeta from "../../components/ModalColeta";
import { Package, Clock, CheckCircle } from "lucide-react";

function HomeAdmPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState("");


    const abrirModal = (nomeItem: string) => {
        setItemSelecionado(nomeItem);
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <ModalColeta 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                itemNome={itemSelecionado}
            />
            
            <main className="max-w-7xl mx-auto p-8 space-y-12">
                

                <section>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold border-b-4 border-blue-600 w-fit pb-1">
                            Início
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <CardStatistics icon={Package} label="Total Itens" value="0" />
                        <CardStatistics icon={Clock} label="Itens Disponíveis" value="0" />
                        <CardStatistics icon={CheckCircle} label="Itens Coletados" value="0" />
                        <CardStatistics icon={CheckCircle} label="Taxa de Coleta" value="0 %" />
                    </div>
                </section>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Itens para coleta
                        </h2>
                        <PesquisaBar />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        <CardObject 
                            adminMode={true}
                            title="Relógio Cassio"
                            category="Acessórios"
                            location="Biblioteca - 2 bloco"
                            date="12/12/2025 - 14:30Hrs"
                            imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                            openModal={abrirModal} 
                        />
                    </div>
                </section>

            </main>
        </div>
    );
}

export default HomeAdmPage;