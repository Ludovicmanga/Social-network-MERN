const UserModel = require('../models/user.model');

module.exports.signUp = (req, res) => {
    const {pseudo, email, password} = req.body;

    user = new UserModel({pseudo, email, password});
    user.save()
        .then(user => res.status(201).json({ user: user._id }))
        .catch (error => console.log(error))
}