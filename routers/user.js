const express = require("express")
const router = new express.Router();


const { ok } = require('assert')
const { validate } = require('../model/user')
const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/user');


router.post('/user/register', UsersController.users_post_register);

router.post('/user/verifyEmail', UsersController.verifyEmail);

router.post('/user/login', UsersController.users_post_login);

router.post('/user/profile',checkAuth, UsersController.users_post_checkAuth);

router.post('/user/change-password', UsersController.users_post_changePassword);


module.exports = router;