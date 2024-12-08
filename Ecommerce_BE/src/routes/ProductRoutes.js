import express from 'express';
import { ProductController } from '~/controllers/ProductController';

const router = express.Router();

router.post('/trending', ProductController.retrieveTrendingProducts);

export const ProductRoutes = router;
