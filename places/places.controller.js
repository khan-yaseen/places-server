const express = require('express');
const router = express.Router();
const placeService = require('./place.service');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// routes
router.post('/add', upload.single('imageFile'), save);
router.get('/:id', getByUser);
router.delete('/:id', _delete);

module.exports = router;

function save(req, res, next) {
    console.log(req.file);
    placeService.create(req.body, req.file.path)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByUser(req, res, next) {
    placeService.getByUser(req.params.id, req.body)
        .then(places => res.json(places))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    placeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}