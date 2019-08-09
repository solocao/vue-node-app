import { Router }  from 'express';
import ThingController from './thing.controller';

let router = new Router();
router.get('/thing/:id',ThingController.retrieve);
router.get('/things',ThingController.retrieveMany);
router.post('/thing',ThingController.create);
router.put('/thing/:id',ThingController.update);
router.delete('/thing/:id',ThingController.delete);

export default router;

