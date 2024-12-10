import express from "express";
import { ProductController } from "~/controllers/ProductController";

const router = express.Router();

router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductDetails);
router.post('/trending', ProductController.retrieveTrendingProducts);

export const ProductRoutes = router;
