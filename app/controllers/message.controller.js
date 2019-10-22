const Message = require('../models/message.model.js');

exports.create = (req, res) => {

    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Description cannot be empty."
        });
    }

    // Create a Message
    const message = new Message({
        description: req.body.description, 
        username: req.username
    });

    // Save Message in the database
    message.save()
        .then(data => {
        res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Message."
            });
        });
};

exports.findAll = (req, res) => {
    Message.find()
        .then(messages => {
            res.send(messages);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving message."
            });
        });
};

exports.findOne = (req, res) => {
    Message.findById(req.params.messageId)
        .then(messages => {
            if (!messages) {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.messageId
                });
            }
            res.send(messages);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.messageId
                });
            }
            return res.status(500).send({
                message: "Error retrieving message with id " + req.params.messageId
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Message content can not be empty"
        });
    }

    // Find message and update it with the request body
    Message.findByIdAndUpdate(req.params.messageId, {
        description: req.body.description
    })
        .then(messages => {
            if (!messages) {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.messageId
                });
            }
            res.send(messages);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.messageId
                });
            }
            return res.status(500).send({
                message: "Error updating message with id " + req.params.messageId
            });
        });
};

exports.delete = (req, res) => {
    Message.findByIdAndRemove(req.params.messageId)
        .then(messages => {
            if (!messages) {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.messageId
                });
            }
            res.send({ message: "Message deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.messageId
                });
            }
            return res.status(500).send({
                message: "Could not delete message with id " + req.params.messageId
            });
        });
};

exports.deleteAll = (req, res) => {
    Message.remove({})
        .then(message => {
            res.send({ message: "Message deleted successfullly." });
        }).catch(err => {
            return res.status(500).send({
                message: "Couldn't delete messages."
            });
        });
};
