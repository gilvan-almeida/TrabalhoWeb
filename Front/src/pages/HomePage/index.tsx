import React from "react";
import CardObject from "../../components/CardObject";
import Navbar from "../../components/NavBar";
import PesquisaBar from "../../components/PesquisaBar";
import api from '../../Services/Api';
import { useState, useEffect } from "react";

function HomePage() {
    const [itens, setItens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [termoPesquisa, setTermoPesquisa] = useState(""); 

    const buscarItens = async () => {
        try {
            setLoading(true);
            const response = await api.get("/items"); 
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao carregar tabela:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarItens();
    }, []);

    const itensFiltrados = itens.filter((item) => {
        const busca = termoPesquisa.toLowerCase();
        return (
            item.title.toLowerCase().includes(busca) || 
            item.category.toLowerCase().includes(busca) ||
            item.location.toLowerCase().includes(busca)
        );
    });

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-8 py-12">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Itens Encontrados</h1>
                    <p className="text-xl text-gray-700">Procurando por algo que perdeu?</p>
                </div>

                <div className="mb-10">
                    <PesquisaBar onSearch={(valor: string) => setTermoPesquisa(valor)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {loading ? (
                        <p className="text-gray-500">Carregando itens...</p>
                    ) : itensFiltrados.length > 0 ? ( 
                        itensFiltrados.map((item: any) => (
                            <CardObject 
                                key={item.id}
                                adminMode={false}
                                title={item.title}
                                category={item.category}
                                location={item.location}
                                status={item.status}
                                date={new Date(item.created_at).toLocaleString('pt-BR')}
                                imageUrl={item.image_url || "https://via.placeholder.com/150"}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-500 text-lg">
                                {termoPesquisa 
                                    ? `Nenhum item encontrado para "${termoPesquisa}"` 
                                    : "Nenhum item cadastrado no momento."}
                            </p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

export default HomePage;