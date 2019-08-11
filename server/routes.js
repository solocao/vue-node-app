import thingRouter from './api/thing';
import path from 'path';

const registerRoutes = function (app) {
    app.use('/api', thingRouter);

    app.use('/vue', (req, res) => { //Serving vue client page
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });

    app.use((req, res) => { //Handling all the 'other' routes 
        res.status(404).json({
            status: 404,
            err: {
                message: 'Page not found'
            }
        })
    });
};

export default registerRoutes;