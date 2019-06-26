'use strict';
const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const superAdminRoutes = require('./superAdmin.route');
const reportRoutes = require('./reports.route');

const router = express.Router();

router.use('/auth/', authRoutes);
router.use('/user/', userRoutes);
router.use('/admin/', adminRoutes);
router.use('/superAdmin/', superAdminRoutes);
router.use('/report/', reportRoutes);

module.exports = router;
