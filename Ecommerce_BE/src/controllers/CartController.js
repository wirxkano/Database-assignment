import { CartModel } from '~/models/CartModel';

const getCartItems = async (req, res) => {
  try {
    const items = await CartModel.getCartItems(req.userId);
    if (items) {
      return res.status(200).json(items);
    } else {
      return res.status(400).json({ message: 'Failed to get cart items' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CartController = {
  getCartItems
};
