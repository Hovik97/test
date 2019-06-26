'use strict';
const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const adminCtrl = require('../controllers/admin.controller');
const reportCtrl = require('../controllers/reports.controller');
const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));
router.post('/create/new/user', adminCtrl.createUser);
router.post('/get/all/users', adminCtrl.getUsersCompany);
router.post('/get/all/reports', reportCtrl.getReportsAdm);
