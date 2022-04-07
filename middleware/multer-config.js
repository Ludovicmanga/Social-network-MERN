
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
        callback(null, `${__dirname}/../client/public/uploads/profile`, )
    },
    filename: (req, file, callback) => {
        const name = req.body.name.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];

        if(!extension) throw Error('incorrect file');
        if (file.size > 500000) throw Error("max size");
        console.log(file.size);

        filename = name + '.' + extension;
        callback(null, filename);
        req.body.filename = filename;
    }
})

module.exports = multer({ storage }).single('file');