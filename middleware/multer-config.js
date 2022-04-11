
const res = require('express/lib/response');
const multer = require('multer');
const { uploadErrors } = require('../utils/errors.utils');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(req.body.type === 'user') {
            path = `${__dirname}/../client/public/uploads/profil`;
        };
        if(req.body.type === 'post') {
            path = `${__dirname}/../client/public/uploads/post`;
        };
        callback(null, path)
    },
    filename: (req, file, callback) => {
        const name = req.body.name.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];

        if(!extension) throw Error('incorrect file');

        if(req.body.type === 'user') {
            fileName = name + '.' + extension;
        };
        if(req.body.type === 'post') {
            fileName = name + Date.now() + '.' + extension;
        };

        callback(null, fileName);
        req.body.fileName = fileName;
    }
})

module.exports = multer({ storage }).single('file');