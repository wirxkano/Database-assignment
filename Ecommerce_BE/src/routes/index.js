import express from 'express';
import { UserRoutes } from '~/routes/UserRoutes';
import { ProductRoutes } from '~/routes/ProductRoutes';
import { OrderRoutes } from '~/routes/OrderRoutes';
import { CartRoutes } from './CartRoutes';
import { CouponRoutes } from './CouponRoutes';
import { PaymentRoutes } from './PaymentRoutes';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);
router.use('/carts', CartRoutes);
router.use('/coupons', CouponRoutes);
router.use('/payments', PaymentRoutes);

export const API = router;
