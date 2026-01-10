import { Search } from 'lucide-react';

function PesquisaBar() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="p-2 rounded-2xl shadow-sm">
        <div className="relative flex items-center bg-white rounded-lg overflow-hidden transition-shadow focus-within:shadow-md">
          <div className="pl-4 text-gray-400">
            <Search size={20} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full py-3 px-3 text-gray-700 outline-none placeholder:text-gray-400 font-medium"
          />
          
        </div>
      </div>
    </div>
  );
}

export default PesquisaBar;