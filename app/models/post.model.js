const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);