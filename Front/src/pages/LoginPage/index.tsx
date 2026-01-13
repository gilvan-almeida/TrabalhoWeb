import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/Api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const actionLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { 
                email, 
                password 
            });
            
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            
            localStorage.setItem('@App:user', JSON.stringify(user));

            navigation('/homeAdm'); 
            
        } catch (err: any) {
            const message = err.response?.data?.error || 'Erro ao conectar com o servidor';
            setError(message);
            console.error('Erro no login:', message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
            <div className="bg-[#eeeeee] w-full max-w-md rounded-[40px] p-10 shadow-xl relative">

                <button 
                    className="absolute top-8 left-8 text-black hover:scale-110 transition-transform"
                    onClick={() => navigation("/")}
                >
                    <ArrowLeft size={32} strokeWidth={2.5} />
                </button>

                <div className="flex flex-col items-center mt-6 mb-8">
                    <div className="bg-black rounded-full p-4 mb-4">
                        <User size={48} className="text-white fill-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-black tracking-tight text-center">
                        Área Administrativa
                    </h1>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4 text-center animate-in fade-in duration-300">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={actionLogin}>
                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@gmail.com"
                            className="w-full bg-white border-none rounded-2xl py-4 px-6 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold ml-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border-none rounded-2xl py-4 px-6 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] text-xl mt-4"
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-600 font-medium">
                    Esqueceu sua senha? <a href="#" className="text-blue-600 underline decoration-blue-600 decoration-2">recuperar</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;