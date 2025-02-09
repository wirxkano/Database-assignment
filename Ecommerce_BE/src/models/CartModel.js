import { getConnection, sql } from "~/config/connectDB";

const getCartDetails = async (id) => {
  const pool = getConnection();

  try {
    const result = await pool.request().input("CustomerID", sql.Int, id).query(`
      SELECT P.ProductID, P.Name AS ProductName, P.Description, P.SellingPrice, P.DiscountPrice, CP.Quantity, MIN(PI.ImgUrl) AS ImgUrl
        FROM Customer Cus
        JOIN Cart C ON Cus.CustomerID = C.CustomerID
        JOIN CartHasProduct CP ON C.CartID = CP.CartID
        JOIN Product P ON CP.ProductID = P.ProductID
        JOIN ProductImage PI ON P.ProductID = PI.ProductID
        WHERE Cus.CustomerID = @CustomerID
        GROUP BY P.ProductID, P.Name, P.Description, P.SellingPrice, P.DiscountPrice, CP.Quantity
    `);
    if (result.recordset.length >= 0) {
      return result.recordset || {};
    }
    return null;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const deleteProductInCart = async (customerId, productId) => {
  const pool = getConnection();
  try {
    const result = await pool
      .request()
      .input("CustomerID", sql.Int, customerId)
      .input("ProductID", sql.Int, productId)
      .query(`DELETE FROM CartHasProduct
        WHERE CartID = (SELECT CartID FROM Cart WHERE CustomerID = @CustomerID)
        AND ProductID = @ProductID
      `);

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      console.log(
        `Product with ID ${productId} deleted from cart for customer ${customerId}.`
      );
      return { message: "Product deleted successfully" };
    } else {
      return { message: "Product not found in cart" };
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const CartModel = { getCartDetails, deleteProductInCart };
