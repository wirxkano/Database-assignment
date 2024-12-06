import express from 'express';
import { ProductRoutes } from './ProductRoutes';
import { UserRoutes } from './UserRoutes';

const router = express.Router();

router.use('/products', ProductRoutes);
router.use('/users', UserRoutes);

export const API = router;
