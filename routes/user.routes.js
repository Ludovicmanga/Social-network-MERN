const Router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

Router.post("/register", authController.signUp);

Router.get("/", userController.getAllUsers);
Router.get("/:id", userController.userInfo);

module.exports = Router;