const express = require("express");
const passport  = require('passport');
const router = express.Router();
const homeController = require("../controllers/homeController");

router.post('/create-session',passport.authenticate('local', {
    failureRedirect:'/'}),homeController.create_session);
router.get('/',homeController.login);
router.post('/create',homeController.create_user);
router.get('/sign-out',homeController.sign_out);
router.use('/users', require('./users'));
router.use('/post',require('./post'));

module.exports = router;