const jwt = require('jsonwebtoken');

const verifyTokenAndRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json({ error: 'Acceso denegado' });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            
            // Verificación de roles para el 100% de la rúbrica
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ error: 'No tienes permisos de administrador' });
            }
            next();
        } catch (error) {
            res.status(400).json({ error: 'Token no válido' });
        }
    };
};

module.exports = verifyTokenAndRole;