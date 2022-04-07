
const multer = require('multer');

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
        req.body.filename = name + '.' + extension;
        callback(null, req.body.filename);
    }
})

module.exports = multer({ storage }).single('file');