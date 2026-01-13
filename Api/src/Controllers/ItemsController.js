const { supabase } = require("../Config/Supabase");

const getItems = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);  
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Item não encontrado' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const {
            title,
            category,
            location,
            date_found,   
            time_found,
            description,
            image_url,
            status = 'available'
        } = req.body;

        // console.log('Dados recebidos:', req.body);


        if (!title || !category || !location) {
            return res.status(400).json({ error: 'Título, categoria e local são obrigatórios' });
        }

        const { data, error } = await supabase
            .from('items')
            .insert([{
                title,
                category,
                location,
                date_found: date_found,
                time_found: time_found,
                description,
                image_url,
                status,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            // console.error('Erro ao inserir no Supabase:', error);
            throw error;
        }

        res.status(201).json({ message: 'Item criado com sucesso', item: data });
    } catch (error) {
        // console.error('Erro no createItem:', error);
        res.status(500).json({ error: error.message });
    }
};


const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, location, status } = req.body;

        console.log("Tentando atualizar o item ID:", id);
        console.log("Dados recebidos:", req.body);

        const { data, error } = await supabase
            .from('items')
            .update({
                title,
                category,
                location,
                status,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select(); 

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado ou sem permissão para editar' });
        }

        res.json({ message: 'Item atualizado com sucesso', item: data[0] });
    } catch (error) {
        console.error("Erro no updateItem:", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('items')
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.error("Erro no Supabase ao deletar:", error);
            throw error;
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ 
                error: 'Item não encontrado ou você não tem permissão para excluí-lo' 
            });
        }

        res.json({ message: 'Item excluído com sucesso', deletedItem: data[0] });
    } catch (error) {
        console.error("Erro no deleteItem:", error);
        res.status(500).json({ error: error.message });
    }
};

const registerCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const { collected_by, document, collection_date, collection_time } = req.body;

        if (!collected_by || !document) {
            return res.status(400).json({ error: 'Nome e documento são obrigatórios' });
        }

        const { data, error } = await supabase
            .from('items')
            .update({
                status: 'collected',
                collected_by,
                document,
                collection_date: collection_date || new Date().toISOString().split('T')[0],
                collection_time: collection_time || new Date().toTimeString().split(' ')[0],
                collected_at: new Date()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ message: 'Coleta registrada com sucesso', item: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    registerCollection
};