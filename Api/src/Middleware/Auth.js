const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Acesso negado. Permissão insuficiente.' 
            });
        }

        next();
    };
};

const authorizeSelfOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const userIdFromToken = String(req.user.id); 
    const idFromParams = String(req.params.id); 

    if (req.user.role === 'admin' || userIdFromToken === idFromParams) {
        return next();
    }

    return res.status(403).json({ 
        error: 'Acesso negado. Você só pode gerenciar sua própria conta ou ser um administrador.' 
    });
};

module.exports = { authenticate, authorize, authorizeSelfOrAdmin };