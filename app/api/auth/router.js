const express = require('express');
const { register, login, updateUser } = require('./controller');
const { isLoginUser } = require('../middleware/auth');
const router = express.Router();

/* GET home page. */
router.post('/register', register);
router.post('/login', login);
router.put('/user', isLoginUser, updateUser);

module.exports = router;
