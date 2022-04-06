const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
})
