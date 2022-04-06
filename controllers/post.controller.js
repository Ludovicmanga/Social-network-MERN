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
}

module.exports.deletePost = (req, res) => {
}