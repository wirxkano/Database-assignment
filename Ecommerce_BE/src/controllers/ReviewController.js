import { ReviewModel } from '~/models/ReviewModel';

const getReviewsOfProduct = async (req, res) => {
  try {
    const reviews = await ReviewModel.getReviewsOfProduct(req.params.id);

    if (reviews) {
      return res.status(200).json(reviews);
    } else {
      return res.status(400).json({ message: 'Failed to get reviews' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const storeReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { rating, description } = req.body;
    const result = await ReviewModel.storeReview(userId, rating, description, req.params.id);

    if (result) {
      return res.status(200).json({ message: 'Create review successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to create review' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const ReviewController = {
  getReviewsOfProduct,
  storeReview
};
