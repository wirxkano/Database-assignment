import express from 'express';
import { PaymentController } from '~/controllers/PaymentController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.post('/card', authentication, PaymentController.handleTransactionMomo);
router.post('/card-callback', PaymentController.callbackMomo);

router.post('/cash', authentication, PaymentController.handleTransactionCash);

export const PaymentRoutes = router;
