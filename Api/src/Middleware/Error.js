const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code && err.code.startsWith('PGRST')) {
        return res.status(400).json({
            error: 'Erro no banco de dados',
            details: err.message
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Erro de validação',
            details: err.message
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }

    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
};

module.exports = { errorHandler };