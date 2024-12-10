import { getConnection, sql } from '~/config/connectDB';

const sqlHelpers = {
  toDate: (value) => value ? new Date(value) : null,
  toInt: (value) => value ? parseInt(value) : null
};

const getAllProducts = async () => {
  const pool = getConnection();

  try {
    const result = await pool.request().query('SELECT * FROM Product'); // just for testing

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const retrieveTrendingProducts = async (startDate, endDate, n) => {
  const pool = getConnection();

  try {
    const result = await pool
    .request()
    .input('StartDate', sql.Date, sqlHelpers.toDate(startDate))
    .input('EndDate', sql.Date, sqlHelpers.toDate(endDate))
    .input('N', sql.Int, sqlHelpers.toInt(n))
    .execute('retrieveBestSellingProducts');

  
    if (result.recordset.length >= 0) {
      return result.recordset;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
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
