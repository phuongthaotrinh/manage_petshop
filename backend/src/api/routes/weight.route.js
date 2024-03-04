import express from 'express'
import * as WeightController from '../controllers/weigth.controller';
const router = express.Router();


router.post('/weight/new-weight-by-default',WeightController.createWeightByDefaultValue);
router.get('/weight/get-all-weight',WeightController.getAllWeight);

export default router