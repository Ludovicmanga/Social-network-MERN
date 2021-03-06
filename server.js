const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowed-Headers': ['sessionId', 'Content-type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.use((err, req, res, next) => {
    console.log(err)
  })

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
})
