const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multerMiddleware = require('../middleware/multer-config');
const { uploadErrors } = require('../utils/errors.utils');

router.get("/", postController.readPost);
router.post("/", (req, res, next) => {
    multerMiddleware(req, res, function (error) {
        if (error) {
            const formatedErrors = uploadErrors(error);
            res.send(formatedErrors);
        } else next();
    });
  }, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;