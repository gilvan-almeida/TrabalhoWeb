import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Tag, Share2, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react"; 
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";

export const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // MOCK DE DADOS
  const item = {
    id: id,
    titulo: "Relógio Cassio",
    descricao: "Encontrado no banco próximo à biblioteca. O relógio está funcionando mas tem um pequeno arranhão na tela. Pulseira branca de silicone.",
    categoria: "Acessórios",
    status: "Disponível", // ou 'Recuperado'
    localEncontrado: "Bloco C - Pátio Central",
    dataEncontrado: "10/01/2026",
    // Array de imagens para simular a galeria
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", // Imagem 1
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/8e2dc458481685.59fdfb75a96d6.jpg", // Imagem 2
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/4bddf558481685.59fdfb75a8cff.jpg", // Imagem 3
    ]
  };

  const [mainImage, setMainImage] = useState(item.images[0]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="flex max-lg:flex-col gap-12">
          
          <div className="flex max-sm:flex-col-reverse gap-3 flex-1">
            <div className="flex sm:flex-col gap-3">
              {item.images.map((image, index) => (
                <div 
                  key={index} 
                  onClick={() => setMainImage(image)} 
                  className={`bg-slate-100 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg cursor-pointer border-2 transition-all ${mainImage === image ? 'border-slate-800' : 'border-transparent hover:border-slate-300'}`}
                >
                  <img src={image} className="w-full h-full object-cover rounded-md" alt={`Vista ${index}`} />
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center bg-slate-100 rounded-lg w-full h-[400px] sm:h-[500px] overflow-hidden">
              <img src={mainImage} alt="Item principal" className="w-full h-full object-contain hover:scale-105 transition duration-500" />
            </div>
          </div>

          <div className="flex-1">
            
            <h1 className="text-4xl font-semibold text-slate-800">{item.titulo}</h1>

            <div className='flex items-center gap-3 mt-4'>
              <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                <Tag size={14} /> {item.categoria}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${item.status === 'Disponível' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                {item.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 my-8">
               <div className="flex items-center gap-3 text-xl text-slate-700">
                  <MapPin className="text-slate-400" /> 
                  <span>Encontrado em: <strong>{item.localEncontrado}</strong></span>
               </div>
               <div className="flex items-center gap-3 text-xl text-slate-700">
                  <Calendar className="text-slate-400" /> 
                  <span>Data: <strong>{item.dataEncontrado}</strong></span>
               </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Descrição do Item</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                {item.descricao}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              
              <button 
                className="
                  group
                  flex-1 sm:flex-none
                  flex items-center justify-center gap-3 
                  bg-slate-800 text-white 
                  px-8 py-4 rounded-xl 
                  font-semibold text-lg tracking-wide
                  hover:bg-slate-900 hover:shadow-lg hover:-translate-y-0.5
                  active:scale-95 
                  transition-all duration-200 ease-in-out 
                "
              >
                <CheckCircle2 size={22} className="text-green-400 group-hover:text-green-300 transition-colors" /> 
                <span>Este item é meu!</span>
              </button>

              <button className="p-4 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition text-slate-600">
                <Share2 size={24} />
              </button>
            </div>

            <hr className="border-gray-200 my-8" />

            <div className="flex flex-col gap-4 text-slate-500 text-sm">
              <p className="flex gap-3 items-center"> 
                <ShieldCheck className="text-green-500" size={20} /> 
                Processo de devolução seguro e verificado pela coordenação. 
              </p>
              <p className="flex gap-3 items-center"> 
                <MapPin className="text-slate-400" size={20} /> 
                Retirada disponível no setor de Achados e Perdidos. 
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};