import express from 'express';
import { OrderController } from '~/controllers/OrderController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.get('/history', authentication, OrderController.getHistory);
router.get('/search', authentication, OrderController.searchOrder);

router.post('/purchase', authentication, OrderController.storeOrder);

export const OrderRoutes = router;
