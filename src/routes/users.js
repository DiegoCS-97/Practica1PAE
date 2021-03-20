const express = require('express');
const UsersController = require('../controllers/usersController');
const {User} = require('../models/index');
const bodyParser = require('body-parser');
const multer = require('multer');

const controller = new UsersController;

const router = express.Router();
router.use(bodyParser.json());

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        console.log('file: ', file);
        cb(null, file.originalname);
    }
});

const fileFilters = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};

const uploadFile = multer({
    storage: multerStorage,
    fileFilter: fileFilters
});


router.get('/', (req, res) => {
     console.log(req.query.user);

     const user = controller.findUser(req.query.user);
     res.send(user);
});

router.post('/', uploadFile.single('profilePic'), (req, res) => {
    console.log('body params: ', req.body);

    const user = req.body;
    controller.addNewUser(user);

    if(req.file){
        res.end('user created');
    } else {
        res.end('File not supported');
    }
});

module.exports = router;