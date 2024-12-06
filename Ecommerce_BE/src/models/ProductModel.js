import { getConnection } from "~/config/connectDB";

const getAllProducts = async () => {
  const pool = getConnection();
  const result = await pool.request().query("SELECT * FROM products"); // just for testing
  
  return result.recordset;
};

const getTrendingProducts = async (startDate, endDate, n) => {
  const pool = getConnection();

  const result = await pool
    .request()
    .input("StartDate", sql.DATE, startDate)
    .input("EndDate", sql.DATE, endDate)
    .input("N", sql.Int, n)
    .execute("retrieveBestSellingProducts");

  return result.recordset;
};

export const ProductModel = {
  getAllProducts,
  getTrendingProducts,
};
