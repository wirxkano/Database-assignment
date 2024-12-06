import { ProductModel } from '~/models/ProductModel';

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTrendingProducts = async (req, res) => {
    try {
        const { startDate, endDate, n } = req.query;
        const products = await ProductModel.getTrendingProducts(startDate, endDate, n);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const ProductController = {
    getAllProducts,
    getTrendingProducts
};
