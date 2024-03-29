const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
    mongoose.connect(
        app.get('mongodb'),
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true, // Connection retry on first startup
            poolSize: 10, // Maintain up to 10 socket connections
        }

    ).catch(err => {
        logger.error(err);
        process.exit(1);
    });

    app.set('mongooseClient', mongoose);
};
