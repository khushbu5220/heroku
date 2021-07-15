const express = require("express")
const router = new express.Router();


const { ok } = require('assert')
const { validate } = require('../model/mentor')
const checkAuth = require('../middleware/check-auth');
const MentorsController = require('../controllers/mentor');


router.post('/mentor/register', MentorsController.mentors_post_register);

// router.post('/api/register', MentorsController.verifyEmail);

router.post('/mentor/login', MentorsController.mentors_post_login);

router.post('/mentor/profile',checkAuth, MentorsController.mentors_post_checkAuth);

router.post('/mentor/change-password',checkAuth, MentorsController.mentors_post_changePassword);


module.exports = router;