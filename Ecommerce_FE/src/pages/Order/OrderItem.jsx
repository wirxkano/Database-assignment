/* eslint-disable react/prop-types */

function OrderItem({ order }) {

  return (
    <>
      <div>Mã đơn hàng: {order.OrderID}</div>
      <hr />
    </>
  )
}

export default OrderItem
