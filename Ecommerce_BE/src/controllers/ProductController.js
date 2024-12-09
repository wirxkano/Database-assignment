import { ProductModel } from '~/models/ProductModel';

const getAllProducts = async (req, res) => {
  try {
    // just for testing
    const products = await ProductModel.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const retrieveTrendingProducts = async (req, res) => {
  try {
    const { startDate, endDate, n } = req.body;
    const products = await ProductModel.retrieveTrendingProducts(startDate, endDate, n);

    if (products) {
      return res.status(200).json(products);
    } else {
      return res.status(400).json({ message: 'Failed to get products' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getProductDetails(id);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(400).json({ message: 'Failed to get product details' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const ProductController = {
  getAllProducts,
  retrieveTrendingProducts,
  getProductDetails
};
