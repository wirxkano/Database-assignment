import express from "express";
import { ReviewController } from "~/controllers/ReviewController";
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.get('/:id', ReviewController.getReviewsOfProduct);
router.post('/:id', authentication, ReviewController.storeReview);

export const ReviewRoutes = router;
