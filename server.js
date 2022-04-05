const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
})
