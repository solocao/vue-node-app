import thingRouter from './api/thing';

const registerRoutes = function (app) {
    app.use('/api', thingRouter);


    app.use((req, res) => {//Handling all the 'other' routes 
        res.status(404).json({
            status: 404,
            err: {
                message: 'Page not found'
            }
        })
    });
};

export default registerRoutes;