import { PackageSearch, LogIn } from 'lucide-react';

function Navbar() {
  return (
    <nav className="w-full">
      <div className="bg-[#1a1a1a] text-gray-400 py-2 px-8 text-xs uppercase tracking-widest">
        <span>Home</span>
      </div>

      <div className="bg-[#d9d9d9] py-6 px-8 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-4 text-[#1a1a1a]">
          <div className="bg-black p-2 rounded-lg">
            <PackageSearch size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Achados e Perdidos
          </h1>
        </div>

        <button className="flex items-center gap-2 bg-[#0047ff] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95">
          <LogIn size={20} />
          <span>Área Administrativa</span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;