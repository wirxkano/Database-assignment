import { useLoaderData } from 'react-router-dom';
import Navbar from '~/components/Navbar';
import OrderItem from '~/pages/Order/OrderItem';

function Order() {
  const { orders } = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderItem key={order.OrderID} order={order} />
        ))}
      </div>
    </>
  )
}

export default Order;
