import { ProductModel } from '~/models/ProductModel';

const getAllProducts = async (_, res) => {
  try {
    const products = await ProductModel.getAllProducts();

    if (products) {
      return res.status(200).json(products);
    console.log('Query Result:', products);
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const retrieveTrendingProducts = async (req, res) => {
  try {
    const { startDate, endDate, n } = req.body;
    const products = await ProductModel.retrieveTrendingProducts(startDate, endDate, n);

    if (products && products.length > 0) {
      return res.status(200).json({
        success: true,
        data: products,
      });
    } else {
      return res.status(404).json({ 
        success: false,
        message: "No trending products found for the given parameters.",
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "An error occurred while retrieving trending products.",
      error: error.message,
    });
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
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
  }
}

const searchProducts = async (req, res) => {
  try {
    const products = await ProductModel.searchProducts(req.query.q);
    
    if (products) {      
      return res.status(200).json(products);
    } else {
      return res.status(400).json({ message: 'Failed to get products' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const ProductController = {
  getAllProducts,
  retrieveTrendingProducts,
  getProductDetails,
  searchProducts
};
