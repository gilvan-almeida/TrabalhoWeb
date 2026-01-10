import React from 'react';
import { ArrowLeft, User } from 'lucide-react';

function LoginPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
            <div className="bg-[#eeeeee] w-full max-w-md rounded-[40px] p-10 shadow-xl relative">

                <button className="absolute top-8 left-8 text-black hover:scale-110 transition-transform">
                    <ArrowLeft size={32} strokeWidth={2.5} />
                </button>

                <div className="flex flex-col items-center mt-6 mb-8">
                    <div className="bg-black rounded-full p-4 mb-4">
                        <User size={48} className="text-white fill-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-black tracking-tight">
                        Área Administrativa
                    </h1>
                </div>


                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold ml-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-white border-none rounded-2xl py-4 px-6 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold ml-1">Senha</label>
                        <input
                            type="password"
                            className="w-full bg-white border-none rounded-2xl py-4 px-6 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <button className="w-full bg-[#0047ff] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] text-xl mt-4">
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