
export const groupOrder = (orderData) => {
  if (orderData.length === 0) {
    return [];
  }
  const groupedOrders = orderData.reduce((acc, order) => {
    if (!acc[order.OrderID]) {
      acc[order.OrderID] = [];
    }

    acc[order.OrderID].push(order);
    return acc;
  }, {});

  const groupedOrderArray = Object.entries(groupedOrders).map(([orderID, orders]) => ({
    OrderID: orderID,
    Orders: orders,
  }));

  return groupedOrderArray;
};
