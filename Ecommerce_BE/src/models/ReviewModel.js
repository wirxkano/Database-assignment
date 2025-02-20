import { getConnection, sql } from '~/config/connectDB';

const getReviewsOfProduct = async (productID) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input('ProductID', sql.Int, productID)
      .query(`
        SELECT P.FirstName, P.LastName, R.Rate, R.Detail, DATEADD(SECOND, CAST(R.Timestamp AS BIGINT), '1970-01-01') AS Date
        FROM Review R
        JOIN Person P ON R.CustomerID = P.PersonID
        WHERE R.ProductID = @ProductID
      `);

    if (result.recordset.length > 0) {
      return result.recordset;
    }

    return null;
  } catch (err) {
    console.log(err);

    throw new Error(err);
  }
};

const storeReview = async (userId, rating, description, productId) => {
  const pool = getConnection();

  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, userId)
      .input('ProductID', sql.Int, productId)
      .input('Rate', sql.Int, rating)
      .input('Detail', sql.NVarChar, description)
      .query(`
        INSERT INTO Review (CustomerID, ProductID, Rate, Detail)
        VALUES (@CustomerID, @ProductID, @Rate, @Detail)
      `);
    
    if (result.rowsAffected.length > 0) {
      return true;
    }
    return null;
  } catch (error) {
    console.log(error);

    throw new Error(err);
  }
};

export const ReviewModel = {
  getReviewsOfProduct,
  storeReview
};
