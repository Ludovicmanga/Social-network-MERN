const Router = require('express').Router();
const authController = require('../controllers/auth.controller');

Router.post("/register", authController.signUp);

module.exports = Router;