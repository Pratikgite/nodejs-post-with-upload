const Post = require("../models/post.model");
const multer = require("multer");
const { body, validationResult } = require('express-validator');


exports.create = (req, res) => {

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.send({ status:0, msg: errors.array(), data: Array() });
    }
    
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        user_id: req.body.user_id,
    });

    post.save()
        .then(data => {
            if(data)
                res.send({ status:1, msg: "Post Created.", data: data });
            else 
                res.send({ status:0, msg: "Something wents worng.", data: Array() });
        })
        .catch(err => {
            res.send({ status:0, msg: err.message, data: Array() });
        })
}

exports.findAll = (req, res) => {
    Post.find()
        .then(data => {
            if(data)
                res.send({ status:1, msg: "Record found", data: data });
            else 
                res.send({ status:0, msg: "No record found", data: Array() });
        })
        .catch(err => {
            res.send({ status:0, msg: err.message, data: Array() });
        })
}

exports.findOne = (req, res) => {
    Post.findById(req.params.id)
        .then(data => {
            if(data)
                res.send({ status:1, msg: "Record found", data: data });
            else 
                res.send({ status:0, msg: "No record found", data: Array() });
        })
        .catch(err => {
            res.send({ status:0, msg: err.message, data: Array() });
        })
}

exports.update = (req, res) => {

    Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    })
        .then(data => {
            if(data)
                res.send({ status:1, msg: "Updated Successfully", data: Array() });
            else 
                res.send({ status:0, msg: "No record found", data: Array() });
        })
        .catch(err => {
            res.send({ status:0, msg: err.message, data: Array() });
        })
}

exports.delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(data => {
            if(data)
                res.send({ status:1, msg: "Deleted Successfully", data: Array() });
            else 
                res.send({ status:0, msg: "No record found", data: Array() });
        })
        .catch(err => {
            res.send({ status:0, msg: err.message, data: Array() });
        })
}