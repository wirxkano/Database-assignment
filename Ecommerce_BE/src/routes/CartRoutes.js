import express from "express";
import { CartController } from "~/controllers/CartController";
import { authentication } from "~/middlewares/verify";

const router = express.Router();

router.get('/cart', authentication, CartController.getCartDetails);

export const CartRoutes = router;
