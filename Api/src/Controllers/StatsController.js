const { supabase } = require("../Config/Supabase");

const getStatistics = async (req, res) => {
    try {
        // Total de itens
        const { count: totalItems, error: countError } = await supabase
            .from('items')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        const { count: availableItems, error: availableError } = await supabase
            .from('items')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'available');

        if (availableError) throw availableError;

        const { count: collectedItems, error: collectedError } = await supabase
            .from('items')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'collected');

        if (collectedError) throw collectedError;

        const collectionRate = totalItems > 0 
            ? ((collectedItems / totalItems) * 100).toFixed(1)
            : 0;

        const { data: recentItems, error: recentError } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (recentError) throw recentError;

        res.json({
            totalItems,
            availableItems,
            collectedItems,
            collectionRate: `${collectionRate}%`,
            recentItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStatistics };