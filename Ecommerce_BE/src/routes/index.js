import express from 'express';
import { UserRoutes } from '~/routes/UserRoutes';
import { ProductRoutes } from '~/routes/ProductRoutes';
import { OrderRoutes } from '~/routes/OrderRoutes';
import { CartRoutes } from '~/routes/CartRoutes';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);
router.use('/carts', CartRoutes);

export const API = router;
