const mongoose = require('mongoose');

const { cloud_db } = require('./urlDb');

class connDb {
    constructor() {
        this.connection();
    }

    connection() {
        this.conn = mongoose.connect(cloud_db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
}

module.exports = connDb;