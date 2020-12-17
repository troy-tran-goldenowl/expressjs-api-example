const express = require('express');
const postRoutes = require('./post.route');
const authRoutes = require('./auth.route');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.use('/posts', authMiddleware, postRoutes);
router.use('/users', authRoutes);

module.exports = router;
