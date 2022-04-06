const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = (req, res) => {
    const {pseudo, email, password} = req.body;

    user = new UserModel({pseudo, email, password});
    user.save()
        .then(user => res.status(201).json({ user: user._id }))
        .catch (error => res.json({ error }))
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;

    user = UserModel.login( email, password )
        .then(
            user => {
                token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge });
                res.status(200).json({ user: user._id});
            }
        )
        .catch(error => res.status(500).json({ error }));
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}