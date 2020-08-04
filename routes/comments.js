const express  = require('express');
const router = express.Router();

const usersComments = require('../controllers/userComments');



router.post('/create',usersComments.create);
module.exports = router;
