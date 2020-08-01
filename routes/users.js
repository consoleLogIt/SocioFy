const express  = require('express');
const router = express.Router();
const passport  = require('passport');

const usersController = require('../controllers/usersController');
const usersPosts = require('../controllers/usersPosts');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/posts', usersPosts.posts);
router.post('/create-post',)

module.exports = router;