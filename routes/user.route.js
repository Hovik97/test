'use strict';
const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const reportCtrl = require('../controllers/reports.controller');
const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));
router.post('/get/my/reports', reportCtrl.getReportsUser);
