import { Pencil, Trash2 } from 'lucide-react';

interface Item {
  id: number,
  nome: string,
  categoria: string,
  local: string,
  data: string,
  status: string,
  imagemUrl: string,
}

interface ItemsTableProps {
  data: Item[];
  onEdit: (item: Item) => void;
  onDelete: (item: any) => void;
}

function TableDados({ data, onEdit, onDelete }: ItemsTableProps) {
  return (
    <div className="overflow-x-auto border border-black rounded-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#d9d9d9] text-black uppercase text-sm">
          <tr>
            <th className="px-6 py-4 border-b border-black">Item</th>
            <th className="px-6 py-4 border-b border-black">Categoria</th>
            <th className="px-6 py-4 border-b border-black">Local</th>
            <th className="px-6 py-4 border-b border-black">Data</th>
            <th className="px-6 py-4 border-b border-black">Status</th>
            <th className="px-6 py-4 border-b border-black text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item) => (
            <tr key={item.id} className="border-b border-black last:border-none">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#d9d9d9] rounded-lg overflow-hidden flex-shrink-0 border border-gray-300">
                  {item.imagemUrl ? (
                    <img 
                      src={item.imagemUrl} 
                      alt={item.nome} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                      S/ Foto
                    </div>
                  )}
                </div>
                {item.nome}
              </td>
              <td className="px-6 py-4">{item.categoria}</td>
              <td className="px-6 py-4">{item.local}</td>
              <td className="px-6 py-4">{item.data}</td>
              <td className="px-6 py-4 font-medium">{item.status}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-4">
                  <button 
                    className="hover:text-blue-600 transition-colors"
                    onClick={() => onEdit(item)}>
                    <Pencil size={20} />
                  </button>
                  <button 
                    className="hover:text-red-600 transition-colors"
                    onClick={() => onDelete(item)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDados;