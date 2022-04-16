
const res = require('express/lib/response');
const req = require('express/lib/request');
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(req.body.postType === 'user') {
            path = `${__dirname}/../client/public/uploads/profil`;
        };
        if(req.body.postType === 'post') {
            path = `${__dirname}/../client/public/uploads/posts`;
        };
        
        callback(null, path)
    },
    filename: (req, file, callback) => {
        const name = req.body.name.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];

        if(req.body.postType === 'user') {
            fileName = name + '.' + extension;
        };
        if(req.body.postType === 'post') {
            fileName = name + Date.now() + '.' + extension;
        };

        callback(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('invalid file'));
    }
  }

  const maxSize = 50000;


module.exports = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: maxSize }
}).single('file');