const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controller/auth.controller');

router.post('/login', authController.login);
//refresh token with authMiddleware.verifyToken
router.post('/refresh-token', authMiddleware.verifyToken, authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;