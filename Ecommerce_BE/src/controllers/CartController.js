import { CartModel } from "~/models/CartModel";

const getCartDetails = async (req, res) => {
  try {
    const id = req.userId;
    const cartItems = await CartModel.getCartDetails(id);
    if (cartItems) {
      return res.status(200).json(cartItems);
    } else {
      return res.status(400).json({ message: "Failed to get cart details" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const CartController = { getCartDetails };
