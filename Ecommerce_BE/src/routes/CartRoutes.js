import express from "express";
import { CartController } from "~/controllers/CartController";
import { authentication } from "~/middlewares/verify";

const router = express.Router();

router.get('/', authentication, CartController.getCartDetails);
router.put('/:productId', authentication, CartController.putProductInCart);
router.delete('/:productId', authentication, CartController.deleteProductInCart);


export const CartRoutes = router;
