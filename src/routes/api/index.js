const express = require('express');
const postRoutes = require('./post.route');
const authRoutes = require('./auth.route');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.use('/posts', auth, postRoutes);
router.use('/auth', authRoutes);

module.exports = router;
