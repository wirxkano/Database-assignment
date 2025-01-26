import { CartModel } from "~/models/CartModel";

const getCartDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.getCartDetails(id);
    if (cart) {
      return res.status(200).json({message: 'Shopping cart is retrieved successfully', cart: cart});
    } else {
      return res.status(400).json({ message: "Failed to get cart details" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const CartController = { getCartDetails };
