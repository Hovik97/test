'use strict';
const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const superAdminCtrl = require('../controllers/superAdmin.controller');
const reportCtrl = require('../controllers/reports.controller');
const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));
router.post('/create/user/and/company', superAdminCtrl.createCompAndAdmin);
router.post('/get/companies', superAdminCtrl.getCompanies);
router.post('/get/all/users', superAdminCtrl.getUsers);
router.post('/get/reports/companies', reportCtrl.getReportsSupAdm);
