const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    const messages = require('../controllers/message.controller.js');

    app.post('/api/messages', user.authWrapper(messages.create));
    app.get('/api/messages', user.authWrapper(messages.findAll));
    app.get('/api/messages/:messageId', user.authWrapper(messages.findOne));
    app.post('/api/messages/:messageId', user.authWrapper(messages.update));
    app.delete('/api/messages/:messageId', user.authWrapper(messages.delete));
    app.delete('/api/messages', user.authWrapper(messages.deleteAll));
}