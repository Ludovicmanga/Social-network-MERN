const req = require("express/lib/request");
const UserModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password')
        .then(users => res.status(200).json({ users }));
}

module.exports.userInfo = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) 
        return res.status(400).send('ID unknown ' + req.params.id)

    UserModel.findOne({_id: req.params.id}).select('-password')
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }))
        
}

module.exports.updateUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      const userObject = {...req.body};
  
      UserModel.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

module.exports.follow = (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
      return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.updateOne(
        { _id: req.params.id },
        { $set: { following: req.body.idToFollow } }
    )
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    
    UserModel.updateOne(
        { _id: req.body.idToFollow },
        { $set: { followers: req.params.id } }
    )
        .catch(error => res.status(400).json({ error }));
}

module.exports.unfollow = (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
      return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.updateOne(
        { _id: req.params.id },
        { $pull: { following: req.body.idToUnfollow } }
    )
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    
    UserModel.updateOne(
        { _id: req.body.idToUnfollow },
        { $pull: { followers: req.params.id } }
    )
        .catch(error => res.status(400).json({ error }));
}

module.exports.deleteUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.deleteOne({_id: req.params.id})
        .then(() => res.status(202).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }))
}