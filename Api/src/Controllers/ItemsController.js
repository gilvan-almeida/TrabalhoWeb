const { supabase } = require("../Config/Supabase");

const getItems = async (req, res) => {
    try {
        const { search, category, status, limit = 20, page = 1 } = req.query;
        let query = supabase.from('items').select('*', { count: 'exact' });

        if (search) {
            query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`);
        }
        if (category) {
            query = query.eq('category', category);
        }
        if (status) {
            query = query.eq('status', status);
        }


        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to).order('created_at', { ascending: false });

        const { data, error, count } = await query;

        if (error) throw error;

        res.json({
            items: data,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
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
            date,
            time,
            description,
            image_url,
            status = 'available'
        } = req.body;


        if (!title || !category || !location) {
            return res.status(400).json({ error: 'Título, categoria e local são obrigatórios' });
        }

        const { data, error } = await supabase
            .from('items')
            .insert([{
                title,
                category,
                location,
                date_found: date,
                time_found: time,
                description,
                image_url,
                status,
                created_at: new Date()
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({ message: 'Item criado com sucesso', item: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const { data: existingItem, error: fetchError } = await supabase
            .from('items')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !existingItem) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        const { data, error } = await supabase
            .from('items')
            .update({
                ...updateData,
                updated_at: new Date()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ message: 'Item atualizado com sucesso', item: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({ message: 'Item excluído com sucesso' });
    } catch (error) {
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