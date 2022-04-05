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

    UserModel.findOne(req.body.id, (error, docs) => {
        if(!error) res.send(docs);
        else console.log('ID unknown ' + error)
    }).select('-password');
}

module.exports.updateUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      const userObject = {...req.body};
  
      UserModel.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

module.exports.deleteUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.deleteOne({_id: req.params.id})
        .then(() => res.status(202).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }))
}