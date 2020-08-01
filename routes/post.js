const express  = require('express');
const router = express.Router();

const usersPosts = require('../controllers/usersPosts');



router.post('/create', usersPosts.posts);
module.exports = router;

