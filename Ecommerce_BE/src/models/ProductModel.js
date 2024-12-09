import { getConnection, sql } from '~/config/connectDB';

const getAllProducts = async () => {
  const pool = getConnection();
  const result = await pool.request().query('SELECT * FROM Product'); // just for testing

  return result.recordset;
};

const retrieveTrendingProducts = async (startDate, endDate, n) => {
  const pool = getConnection();

  const result = await pool
    .request()
    .input('StartDate', sql.Date, startDate)
    .input('EndDate', sql.Date, endDate)
    .input('N', sql.Int, n)
    .execute('retrieveBestSellingProducts');

  if (result.recordset.length >= 0) {
    return result.recordset;
  }
  return null;
};

const getProductDetails = async (id) => {
  const pool = getConnection();

  try {
    const result = await pool
      .request()
      .input('ProductID', sql.Int, id)
      .query(`
      SELECT Name, Description, SellingPrice, DiscountPrice, Quantity, AverageRate, ImgUrl, BrandName, Country, CategoryName
      FROM Product P
      JOIN ProductImage PI ON P.ProductID = PI.ProductID
      JOIN Brand B ON P.BrandID = B.BrandID
      JOIN Category C ON P.CategoryID = C.CategoryID
      WHERE P.ProductID = @ProductID 
    `);

    if (result.recordset.length >= 0) {
      return result.recordset[0] || {};
    }
    return null;
  } catch (err) {
    console.log(err);

    throw new Error(err)
  }
};

export const ProductModel = {
  getAllProducts,
  retrieveTrendingProducts,
  getProductDetails
};
