import express from 'express';
import { OrderController } from '~/controllers/OrderController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.get('/history', authentication, OrderController.getHistory);
router.get('/search', authentication, OrderController.searchOrder);

export const OrderRoutes = router;
