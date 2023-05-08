const jwt = require('jsonwebtoken');
const token = require('../model/token.model');

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const accessToken = authHeader && authHeader.split(' ')[1];

            if (!accessToken) {
                return res.status(401).json({ success: false, message: 'Access token missing' });
            }

            jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Invalid access token' })
                }
                req.userId = decoded.userId;
                next();
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    },
    verifyRole: async (req, res, next) => {
        try{
            const authHeader = req.headers['authorization'];
            const accessToken = authHeader && authHeader.split(' ')[1];

            if (!accessToken) {
                return res.status(401).json({ success: false, message: 'Access token missing' });
            }

            jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Invalid access token' })
                }
                req.userId = decoded.userId;
                req.role = decoded.role;
                next();
            });
        }catch(err)
        {
            console.log(err);
        }
    }
};

module.exports = authMiddleware;
