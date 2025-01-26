import { getConnection, sql } from "~/config/connectDB";


const getCustomerCart = async (id) => {
  const pool = getConnection();

  try {
    const result = await pool.request().input("CustomerID", sql.Int, id).query(`
      SELECT 
          P.Name AS ProductName,
          P.ProductID AS ProductID,
          PI.ImgUrl AS ProductImage,
          P.Description AS ProductDescription,
          P.SellingPrice,
          P.DiscountPrice,
          CHP.Quantity AS QuantityInCart
      FROM 
          Cart C
      JOIN 
          CartHasProduct CHP ON C.CartID = CHP.CartID
      JOIN 
          Product P ON CHP.ProductID = P.ProductID
      JOIN
          ProductImage PI ON PI.ProductID = P.ProductID
      WHERE 
          C.CustomerID = 15;
    `);
    if (result.recordset.length >= 0) {
      return result.recordset[0] || {};
    }
    return null;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const CartModel = { getCustomerCart };
