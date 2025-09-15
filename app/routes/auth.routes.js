const express = require('express');
const router = express.Router();
const { signup, login, logout, getProfile, editProfile, deleteAccount, updateAvatar } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../configs/multer.config'); // Multer import qilish

router.post('/signup', signup);
router.post('/login', login);

router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

router.put('/profile', authMiddleware, editProfile);
router.delete('/delete/:id', authMiddleware, deleteAccount);

router.put('/profile/avatar', authMiddleware, upload.single('avatar'), updateAvatar);

module.exports = router;