'use strict';
const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();
module.exports = router;

router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/change/settings', passport.authenticate('jwt', { session: false }), authCtrl.changeUserSettings);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
