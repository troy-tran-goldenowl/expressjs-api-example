const express = require('express');
const postRoutes = require('./post.route');
const authRoutes = require('./auth.route');

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

module.exports = router;
