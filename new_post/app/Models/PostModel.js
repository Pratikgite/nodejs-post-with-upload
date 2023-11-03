const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    user_id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('post', Post);