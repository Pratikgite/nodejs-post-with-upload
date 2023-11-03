const Note = require("../models/note.model");

exports.create = (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    note.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ msg: err.message });
    })
};

exports.findAll = (req, res) => {
    Note.find()
        .then(data => {
            if(data)
                res.send({ status:1, msg:"Record found.", data:data });
            else
                res.send({ status:0, msg:"No record found.", data:Array() });
        })
        .catch(err => {
            res.status(500).send({ status:0, msg: err.message });
        })
};

exports.findOne = (req, res) => {
    Note.findById(req.params.id)
        .then(data => {
            if(data)
                res.send({ status:1, msg:"Record found.", data:data });
            else
                res.send({ status:0, msg:"No record found.", data:Array() });
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.send({ status:0, msg: "No record found with id: " + req.params.id });                
            }
            res.status(500).send({ status:0, msg: err.message });
        })
};

exports.update = (req, res) => {
    Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    })
    .then(data => {
        res.send({ status:1, msg:"Data Updated Successfully." });
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.send({ status:0, msg: "No record found with id: " + req.params.id });                
        }
        res.status(500).send({ status:0, msg: err.message })
    })
};

exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(data => {
            res.send({ status:1, msg: "Data Deleted Successfully." })
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.send({ status:0, msg: "No record found with id: " + req.params.id });                
            }
            res.send({ status:0, msg: err.message });
        })
};