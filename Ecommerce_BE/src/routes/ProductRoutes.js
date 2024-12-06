import express from 'express';
import { ProductController } from '~/controllers/ProductController';

const router = express.Router();

router.get('/trending', ProductController.getTrendingProducts);

export const ProductRoutes = router;
