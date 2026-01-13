import { useState, useEffect } from "react";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar";
import CardStatistics from "../../components/CardStatistics";
import PesquisaBar from "../../components/PesquisaBar";
import CardObject from "../../components/CardObject";
import ModalColeta from "../../components/ModalColeta";
import ModalAlert from "../../components/ModalAlert"; 
import ModalDetalhes from "../../components/ModalDetails";
import { Package, Clock, CheckCircle } from "lucide-react";

import api from "../../Services/Api"

function HomeAdmPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [itens, setItens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [termoPesquisa, setTermoPesquisa] = useState(""); 

    const [modalColetaOpen, setModalColetaOpen] = useState(false);
    const [itemParaColeta, setItemParaColeta] = useState<any>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemParaExcluir, setItemParaExcluir] = useState<any>(null);

    const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);

    const carregarItens = async () => {
        try {
            setLoading(true);
            const response = await api.get("/items");
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarItens();
    }, []);

    const itensFiltrados = itens.filter((item) => {
        const busca = termoPesquisa.toLowerCase();
        return (
            item.title.toLowerCase().includes(busca) || 
            item.category.toLowerCase().includes(busca) ||
            item.location.toLowerCase().includes(busca)
        );
    });

    const abrirModalColeta = (item: any) => {
        setItemParaColeta(item);
        setModalColetaOpen(true);
    };

    const abrirConfirmacaoDelete = (item: any) => {
        setItemParaExcluir(item);
        setIsDeleteModalOpen(true);
    };

    const confirmarExclusao = async () => {
        if (!itemParaExcluir) return;
        try {
            await api.delete(`/items/${itemParaExcluir.id}`);
            alert("Item removido com sucesso!");
            carregarItens();
        } catch (error: any) {
            console.error("Erro ao excluir:", error);
            alert(error.response?.data?.error || "Erro ao excluir item");
        } finally {
            setIsDeleteModalOpen(false);
            setItemParaExcluir(null);
        }
    };

    const totalItens = itens.length;
    const disponiveis = itens.filter(i => i.status === 'available').length;
    const coletados = itens.filter(i => i.status === 'collected').length;
    const taxaColeta = totalItens > 0 ? ((coletados / totalItens) * 100).toFixed(0) : 0;

    return (
        <div className="min-h-screen bg-white">
            <NavBarAdm openMenu={() => setMenuOpen(true)} />
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <ModalColeta
                isOpen={modalColetaOpen}
                onClose={() => setModalColetaOpen(false)}
                itemNome={itemParaColeta?.title || ""}
                itemId={itemParaColeta?.id} 
                onSuccess={carregarItens}
            />

            <ModalAlert 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmarExclusao}
                itemName={itemParaExcluir?.title || ""}
            />

            <ModalDetalhes 
                isOpen={modalDetalhesOpen}
                onClose={() => setModalDetalhesOpen(false)}
                item={itemParaColeta} 
            />

            <main className="max-w-7xl mx-auto p-8 space-y-12">
                <section>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold border-b-4 border-blue-600 w-fit pb-1">Início</h1>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <CardStatistics icon={Package} label="Total Itens" value={totalItens.toString()} />
                        <CardStatistics icon={Clock} label="Itens Disponíveis" value={disponiveis.toString()} />
                        <CardStatistics icon={CheckCircle} label="Itens Coletados" value={coletados.toString()} />
                        <CardStatistics icon={CheckCircle} label="Taxa de Coleta" value={`${taxaColeta}%`} />
                    </div>
                </section>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Itens para coleta</h2>
                        <PesquisaBar onSearch={(valor: string) => setTermoPesquisa(valor)} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {loading ? (
                            <p>Carregando itens...</p>
                        ) : itensFiltrados.length > 0 ? ( 
                            itensFiltrados.map((item: any) => (
                                <CardObject
                                    key={item.id}
                                    adminMode={true}
                                    title={item.title}
                                    category={item.category}
                                    status={item.status}
                                    location={item.location}
                                    date={new Date(item.created_at).toLocaleDateString('pt-BR')}
                                    imageUrl={item.image_url || "https://via.placeholder.com/150"}
                                    openModal={() => abrirModalColeta(item)}
                                    onShowDetails={() => {
                                        setItemParaColeta(item);
                                        setModalDetalhesOpen(true);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500 text-lg">Nenhum item encontrado para "{termoPesquisa}".</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomeAdmPage;