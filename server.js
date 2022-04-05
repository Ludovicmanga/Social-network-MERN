const express = require('express');
const app = express();
require('dotenv').config({path: './config/.env'});
require('./config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
})
