import { useNavigate } from "react-router-dom"; // 1. Importar o hook de navegação
import CardObject from "../../components/CardObject";
import Navbar from "../../components/NavBar";
import PesquisaBar from "../../components/PesquisaBar";

function HomePage() {
  const navigate = useNavigate(); 

  const handleCardClick = (id: string) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Itens Encontrados</h1>
          <p className="text-xl text-gray-700">Procurando por algo que perdeu?</p>
        </div>

        <div className="mb-10">
          <PesquisaBar />
        </div>

        <div className="mb-6">
          <span className="text-gray-600 text-lg">Exibindo 3 itens</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          
          <div 
            onClick={() => handleCardClick("1")} 
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <CardObject />
          </div>

          <div 
            onClick={() => handleCardClick("2")} 
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <CardObject />
          </div>

          <div 
            onClick={() => handleCardClick("3")} 
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <CardObject />
          </div>

        </div>
        
      </main>
    </div>
  );
}

export default HomePage;