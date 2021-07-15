const express = require("express")
const router = new express.Router();


const { ok } = require('assert')
const { validate } = require('../model/test_mentor')
const Mentor_TestController = require('../controllers/test_mentor');


router.post('/mentor_test', Mentor_TestController.mentors_post_test);

router.get('/mentor_test', Mentor_TestController.mentors_get_api);

router.get('/mentor_test/:subject', Mentor_TestController.mentors_get_test);

router.patch("/mentor_test/:subject", Mentor_TestController.mentors_patch_test);

router.delete("/mentor_test/:subject", Mentor_TestController.mentors_delete_test);

module.exports = router;