//modules
const express = require('express');
const mongosee =require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
// import routes
const IndexRouter = require("./routers/IndexRouter");
const connDb = require("./database/connDb");
const JokesRouter = require("./routers/JokesRouter");

class Server {
    constructor() {
        this.objConn = new connDb();
        this.app = express();
        this.#config();
    }

    #config() {
        var db = mongosee.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function cb() {
            console.log('Connected to MongoDB');
        })
        // Middlewares
        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json());
        this.app.set('PORT', process.env.PORT || 3000);
        const indexR =  new IndexRouter();
        const jokeR = new JokesRouter();
        this.app.use(indexR.router);
        this.app.use(jokeR.router);
        this.app.listen(this.app.get('PORT'), () => {
            console.log(`Server on port ${this.app.get('PORT')}`)
        });
    }
}

new Server();