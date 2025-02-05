import { CouponModel } from '~/models/CouponModel';

const getCoupons = async (req, res) => {
  try {
    const coupons = await CouponModel.getCoupons(req.userId);
    if (coupons) {
      return res.status(200).json(coupons);
    } else {
      return res.status(400).json({ message: 'Failed to get coupon' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CouponController = {
  getCoupons
};
