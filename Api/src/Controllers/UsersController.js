const { supabase } = require("../Config/Supabase");
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, role, status, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, role, status, created_at')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Usuário não encontrado' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }

        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([{
                name,
                email,
                password: hashedPassword,
                role,
                status: 'active',
                created_at: new Date()
            }])
            .select('id, name, email, role, status, created_at')
            .single();

        if (error) throw error;

        res.status(201).json({ message: 'Usuário criado com sucesso', user: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, status, password } = req.body;

        const updateData = { name, email, role, status };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select('id, name, email, role, status, created_at'); 

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado ou nenhuma alteração feita' });
        }

        res.json({ message: 'Usuário atualizado com sucesso', user: data[0] });
    } catch (error) {
        console.error("Erro no servidor:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ error: 'Não é possível excluir seu próprio usuário' });
        }

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};