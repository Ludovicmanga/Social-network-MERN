const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const multerMiddleware = require('../middleware/multer-config');
const { uploadErrors } = require('../utils/errors.utils');

router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

router.post("/upload", (req, res, next) => {
    multerMiddleware(req, res, function (error) {
        if (error) {
            const formattedErrors = uploadErrors(error);
            res.send({formattedErrors});
        } else next();
    });
  }, userController.addOrUpdateProfilePicture);

module.exports = router;