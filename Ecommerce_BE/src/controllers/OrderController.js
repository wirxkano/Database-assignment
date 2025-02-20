import { OrderModel } from '~/models/OrderModel';

const getHistory = async (req, res) => {
  try {
    const orders = await OrderModel.getHistory(req.userId, req.query.status);
    if (orders) {
      return res.status(200).json({ message: 'Get orders by status successfully', orders: orders });
    } else {
      return res.status(400).json({ message: 'Failed to get orders' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const searchOrder = async (req, res) => {
  try {
    const orders = await OrderModel.searchOrder(req.userId, req.query.q);
    if (orders) {
      return res.status(200).json({ message: 'Get orders by ID successfully', orders: orders });
    } else {
      return res.status(400).json({ message: 'Failed to get orders' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const storeOrder = async (req, res) => {
  try {
    if (req.body.extraData && typeof req.body.extraData === 'string') {
      const parts = req.body.extraData.split(';');
      
      const dataPart = parts.find(part => part.startsWith('data='));
      const userIdPart = parts.find(part => part.startsWith('userId='));

      if (dataPart) {
        req.body = JSON.parse(dataPart.split('=')[1]); 
      }
      
      if (userIdPart) {
        req.userId = parseInt(JSON.parse(userIdPart.split('=')[1]));
      }
    }

    const result = await OrderModel.storeOrder(req.userId, req.body);
    if (result) {
      return res.status(200).json({ message: 'Create order successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to create order' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const OrderController = {
  getHistory,
  searchOrder,
  storeOrder
};
