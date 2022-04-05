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
