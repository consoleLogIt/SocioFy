const express  = require('express');
const router = express.Router();
const passport  = require('passport');

const usersController = require('../controllers/usersController');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/homepage',passport.checkAuthentication,usersController.homepage);
router.post('/update/:id',usersController.update);

module.exports = router;