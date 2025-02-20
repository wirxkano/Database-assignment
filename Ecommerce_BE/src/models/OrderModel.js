import { getConnection, sql } from '~/config/connectDB';

const getHistory = async (id, status) => {
  const pool = getConnection();

  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, id)
      .input('Status', sql.NVarChar, status)
      .execute('DisplayOrderByStatusOrSeachOrder');

    if (result.returnValue >= 0) {
      return result.recordset;
    }

    return 0;
  } catch (err) {
    throw new Error(err)
  }
};

const searchOrder = async (customerID, orderID) => {
  const pool = getConnection();

  try {
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, customerID)
      .input('SearchOrder', sql.Bit, 1)
      .input('OrderID', sql.Int, orderID)
      .execute('DisplayOrderByStatusOrSeachOrder');

    if (result.returnValue >= 0) {
      return result.recordset;
    }

    return 0;
  } catch (err) {
    throw new Error(err)
  }
};

const storeOrder = async (customerID, data, status = 'Processing') => {
  const pool = getConnection();
  const transaction = pool.transaction();
  
  try {
    await transaction.begin();

    const orderResult = await transaction
      .request()
      .input('CustomerID', sql.Int, customerID)
      .input('Status', sql.NVarChar, status)
      .input('Street', sql.NVarChar, data.selectedAddress.street)
      .input('Commune', sql.NVarChar, data.selectedAddress.commune)
      .input('District', sql.NVarChar, data.selectedAddress.district)
      .input('City', sql.NVarChar, data.selectedAddress.city)
      .input('CreatedAt', sql.DateTime, new Date())
      .input('TotalPrice', sql.Decimal, data.totalPrice)
      .query(`
        INSERT INTO [Order] (Status, Street, Commune, District, City, CreatedAt, CustomerID, TotalPrice)
        OUTPUT INSERTED.OrderID
        VALUES (@Status, @Street, @Commune, @District, @City, @CreatedAt, @CustomerID, @TotalPrice)
      `);

    const orderID = orderResult.recordset[0].OrderID;
    
    let query = `INSERT INTO OrderProduct (OrderID, ProductID, Quantity, PriceAtOrderedTime) VALUES `;
    const values = data.products.map((_, index) => 
      `(@OrderID, @ProductID${index}, @Quantity${index}, @PriceAtOrderedTime${index})`
    ).join(', '); 

    query += values;

    const request = transaction.request();
    request.input('OrderID', sql.Int, orderID);

    data.products.forEach((product, index) => {
      request.input(`ProductID${index}`, sql.Int, product.productId);
      request.input(`Quantity${index}`, sql.Int, product.numberPurchase);
      request.input(`PriceAtOrderedTime${index}`, sql.Decimal, product.priceAtOrderedTime);
    });

    await request.query(query);
    await transaction.commit();

    return 1;

  } catch (err) {
    await transaction.rollback();
    console.log(err);
    
    throw new Error(err)
  }
};

export const OrderModel = {
  getHistory,
  searchOrder,
  storeOrder
};
