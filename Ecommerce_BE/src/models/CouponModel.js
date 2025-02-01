import { getConnection, sql } from '~/config/connectDB';

const getCoupons = async (id) => {
  const pool = getConnection();

  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, id)
      .query(`
        SELECT C.CouponID, C.Title, C.Detail, C.DiscountPercent, C.Quantity
        FROM Customer Cus
        JOIN CouponCustomer CC ON Cus.CustomerID = CC.CustomerID
        JOIN Coupon C ON CC.CouponID = C.CouponID
        WHERE Cus.CustomerID = @CustomerID
      `);

    if (result.rowsAffected.length > 0) {
      return result.recordset;
    }

    return 0;
  } catch (err) {
    console.log(err);
    
    throw new Error(err)
  }
};

export const CouponModel = {
  getCoupons
};
