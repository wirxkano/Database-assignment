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
    return res.status(500).json({ message: error.message });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const customerId = req.userId; // Lấy từ token sau khi xác thực
    const productId = parseInt(req.params.productId); // Lấy từ path parameter

    const result = await CartModel.deleteProductInCart(customerId, productId);
    if (result) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "Failed to delete product in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putProductInCart = async (req, res) => {
  try {
    const customerId = req.userId;
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;

    const result = await CartModel.putProductInCart(
      customerId,
      productId,
      quantity
    );
    if (result) {
      return res.status(200).json({ message: "Add product successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add product in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CartController = {
  getCartDetails,
  deleteProductInCart,
  putProductInCart,
};
