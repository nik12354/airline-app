const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    description: String,
    username: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);