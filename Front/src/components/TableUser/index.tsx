import { Pencil, Trash2, User } from 'lucide-react';

interface UserItem {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    status: string;
}

interface UsersTableProps {
    data: UserItem[];
    onEdit: (user: UserItem) => void;
    onDelete: (user: UserItem) => void;
}

function TableUser({ data, onEdit, onDelete }: UsersTableProps) {
    return (
        <div className="overflow-x-auto border border-black rounded-xl">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#d9d9d9] text-black uppercase text-sm font-bold">
                    <tr>
                        <th className="px-6 py-4 border-b border-black">Nome</th>
                        <th className="px-6 py-4 border-b border-black">E-mail</th>
                        <th className="px-6 py-4 border-b border-black">Cargo</th>
                        <th className="px-6 py-4 border-b border-black text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.map((user) => (
                        <tr key={user.id} className="border-b border-black last:border-none hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center gap-3 font-medium">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-gray-500" />
                                </div>
                                {user.nome}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                    {user.cargo}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => onEdit(user)} className="hover:text-blue-600"><Pencil size={20} /></button>
                                    <button onClick={() => onDelete(user)} className="hover:text-red-600"><Trash2 size={20} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableUser;