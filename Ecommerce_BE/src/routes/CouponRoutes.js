import express from 'express';
import { CouponController } from '~/controllers/CouponController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.get('/', authentication, CouponController.getCoupons);

export const CouponRoutes = router;
