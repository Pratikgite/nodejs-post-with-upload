const Post = require("../Models/PostModel");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

var storage = multer.diskStorage({
    'destination': function(req, file, cb) {
        cb(null,"uploads");
    },
    'filename': function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage:storage });

module.exports = (router) => {

    router.get('/post', (req, res) => {
        res.send("POST");
    })

    router.get('/post/:id', (req, res) => {

    });

    router.post('/post', [ 
                    body('title')
                        .notEmpty()
                        .withMessage('Title field is required.')
                        .isLength({ min: 3 })
                        .withMessage('Title field Must be at least 3 chars long'),
                    body('description')
                        .notEmpty()
                        .withMessage('Description field is required.'),
                    body('user_id')
                        .notEmpty()
                        .withMessage('User ID field is required.')
                        .isNumeric()
                        .withMessage('Only numeric values are allowed.'),
                ], upload.single('image'), (req, res) => {
        
                    
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send({ 'status':0, 'msg': errors.array().map(err =>  err.msg), 'data': Array() });
        } else {
            const post = new Post({
                title: req.body.title,
                description: req.body.description,
                user_id: req.body.user_id,
                image: null,
            });

            post.save()
                .then(data => {
                    res.send({ 'status':1, 'msg': 'Post created successfully.', 'data': Array() });
                })
                .catch(err => {
                    res.send({ 'status':0, 'msg': err.message, 'data': Array() });
                })
        }

    });

    router.put('/post/:id', (req, res) => {

    });

    router.delete('/post/:id', (req, res) => {

    });

}