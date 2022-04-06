const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
ObjectId = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find()
        .then(post => res.status(200).json({post}))
        .catch(error => res.status(200).json({error}))
}

module.exports.createPost = (req, res) => {
    newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: []
    });

    newPost.save()
        .then(post => res.status(200).json({post}))
        .catch(error => res.status(400).json({error}))
}

module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

      const updatedRecord = {
          message: req.body.message
      }
      console.log(updatedRecord)

      PostModel.updateOne({_id: req.params.id}, {$set: updatedRecord} )
        .then(() => res.status(200).json({mesage: "post modifié"}))
        .catch(error => res.status(200).json({ error }))
}

module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.deleteOne({_id: req.params.id})
        .then(() => res.status(202).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error }))
}