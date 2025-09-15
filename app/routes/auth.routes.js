const express = require('express');
const router = express.Router();
const { signup, login, logout, getProfile, editProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', signup);
router.post('/login', login);

router.post('/logout', logout);
router.get('/profile', authMiddleware, getProfile);

router.put('/profile', authMiddleware, editProfile);

module.exports = router;
