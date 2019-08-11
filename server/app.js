import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config';
import registerRoutes from './routes';
import bodyParser from 'body-parser';
import socketSetup from './sockets/sockets.setup';
import cors from 'cors';
import socketsController from './sockets/sockets.controller';
import pino from 'pino';
import path from 'path';
import opn from 'opn';

global.socketsController = socketsController;
global.logger = pino({
    prettyPrint: true
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true,
}));
registerRoutes(app); //The api routes are here
const server = http.createServer(app);

mongoose.connect(config.mongo_url, {
        useNewUrlParser: true, //NOTE: Fixes deprication warnings
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        global.logger.info('Connected with mongo');

    })
    .catch(err => {
        global.logger.error(err);
    });

socketSetup(server)
    .then(startServer)
    .catch(err => {
        global.logger.error(err);
    });

function startServer() {
    server.listen(config.port, () => {
        if (config.serve_page)
            opn('http://localhost:' + config.port);
            
        global.logger.info(`Awesome server is listening to ${config.port}`);
    });
};