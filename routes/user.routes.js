const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const multer = require('../middleware/multer-config');

router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

router.post("/upload", multer , userController.addOrUpdateProfilePicture);

module.exports = router;