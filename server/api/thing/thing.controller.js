import ThingsSchema from './thing.model';

class ThingController {
    constructor() {}

    retrieve(req, res) {
        return ThingsSchema.findById(req.params.id).lean().exec()
            .then((data) => {
                res.status(200).json({
                    status: 200,
                    data: data
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    err: err
                });
            });
    }

    retrieveMany(req, res) {
        return ThingsSchema.find().lean().exec()
            .then((data) => {
                res.status(200).json({
                    status: 200,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    err: err
                });
            });
    }

    create(req, res) {
        return ThingsSchema.create(req.body)
            .then((data) => {
                res.status(201).json({
                    status: 201,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    err: err
                });
            });
    }

    update(req, res) {
        return ThingsSchema.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            }).exec()
            .then((data) => {
                global.socketsController.broadcastMessage('thingUpdate', data);
                res.status(201).json({
                    status: 201,
                    data: data
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    err: err
                });
            })
    }

    delete(req, res) {
        return ThingsSchema.findByIdAndDelete(req.params.id).exec()
            .then((data) => {
                if (!data) {
                    res.status(404).json({
                        status: 404,
                        data: []
                    });
                    return;
                }
                global.socketsController.broadcastMessage('thingDelete', data);
                res.status(200).json({
                    status: 200,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    err: err
                });
            });
    }

};

export default new ThingController();