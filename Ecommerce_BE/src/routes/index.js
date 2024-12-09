import express from 'express';
import { UserRoutes } from '~/routes/UserRoutes';
import { ProductRoutes } from '~/routes/ProductRoutes';
import { OrderRoutes } from '~/routes/OrderRoutes';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);

export const API = router;
