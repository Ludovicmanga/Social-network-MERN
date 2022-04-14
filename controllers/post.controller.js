const { findByIdAndUpdate } = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
ObjectId = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find().sort({ createdAt: -1 })
        .then(post => res.status(200).send(post))
        .catch(error => res.status(200).json({error}))
}

module.exports.createPost = (req, res) => {
    newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.body.fileName != null ? 'uploads/posts/' + fileName : "",
        video: req.body.video,
        likers: [],
        comments: []
    });

    newPost.save()
        .then(post => res.status(200).send(post))
        .catch(error => console.log(error))
}

module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      const message = req.body.updatedMessage

      PostModel.findByIdAndUpdate(
          req.params.id,
          {$set: {message}},
          { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then(post => res.status(200).send(post))
        .catch(error => res.status(200).json({ error }))
}

module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.deleteOne({_id: req.params.id})
        .then(() => res.status(202).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error }))
}

module.exports.likePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndUpdate(req.params.id, {$addToSet: { likers: req.body.userId }}, {new: true})
        .then(() => {
            UserModel.findByIdAndUpdate(req.body.userId, {$addToSet: { likes: req.params.id }}, {new: true})
                .then(post => res.status(200).send(post))
                .catch(error => res.status(200).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}

module.exports.unlikePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndUpdate(req.params.id, {$pull: { likers: req.body.userId }}, {new: true})
    .then(() => {
        UserModel.findByIdAndUpdate(req.body.userId, {$pull: { likes: req.params.id }}, {new: true})
            .then(() => res.status(200).send(post))
            .catch(error => res.status(200).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}

module.exports.commentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndUpdate(
        req.params.id,
        {$push: {
            comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.pseudo,
                text: req.body.text,
                timestamp: new Date().getTime()
            }
        }},
        {new: true}
    )
        .then(post => res.status(200).send(post))
        .catch(error => res.status(200).json({ error }))
}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.commentId))
      return res.status(400).send("ID unknown : " + req.params.id);
    
      PostModel.findById(req.params.id)
        .then(post => {
            const theComment = post.comments.find(comment =>
                comment._id.equals(req.body.commentId)
            );
            if(!theComment) return res.status(404).send('Comment not found')
            theComment.text = req.body.text;
            post.save()
                .then(post => res.status(200).send(post))
                .catch(error => res.status(200).json({ error }))
        })
        .catch(error => res.status(200).json({ error }))
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.commentId))
      return res.status(400).send("ID unknown : " + req.params.id);

    return PostModel.findByIdAndUpdate(
        req.params.id,
        {
            $pull: {
                comments: {
                    _id: req.body.commentId
                }
            }
        },
        {new: true})
            .then(() => res.status(200).json({ message: 'comment deleted' }))
            .catch(error => res.status(200).json({ error }))
}