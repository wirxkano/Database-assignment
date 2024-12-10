import { useEffect, useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import Navbar from '~/components/Navbar';
import { groupOrder } from '~/utils/groupOrder';
import OrderItem from '~/pages/Order/OrderItem';
import { getOrdersById, getOrdersByStatus } from '~/apis/getAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const { orders } = useLoaderData();
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [currentOrders, setCurrentOrders] = useState(groupOrder(orders));
  const [searchValue, setSearchValue] = useState(0);
  const tabs = [
    { name: "Tất cả", status: 'All' },
    { name: "Chờ xác nhận", status: 'Processing' },
    { name: "Vận chuyển", status: 'Delivering' },
    { name: "Hoàn thành", status: 'Delivered' },
    { name: "Đã huỷ", status: 'Canceled' }
  ];

  useEffect(() => {
    const successMessage = sessionStorage.getItem('successMessage');

    if (successMessage) {
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
      sessionStorage.removeItem('successMessage');
    }
  }, []);

  const handleStatusChange = async (tab) => {
    const response = await getOrdersByStatus(tab.status);

    if (response.status === 200) {
      setCurrentOrders(groupOrder(response.data.orders));
      setActiveTab(tab.name);
    }
  }

  const handleSubmit = async () => {
    const intValue = parseInt(searchValue);

    if (isNaN(intValue)) {
      alert('Mã đơn hàng phải là số nguyên');
      return;
    }
    const response = await getOrdersById(intValue);

    if (response.status === 200) {
      let tab;

      const rcvOrder = response.data.orders;
      if (rcvOrder.length === 0) {
        tab = null;
      } else {
        tab = tabs.find(tab => tab.status === rcvOrder[0].Status);
      }

      setCurrentOrders(groupOrder(rcvOrder));
      setActiveTab(tab?.name);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-auto">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100">
        <div className="font-bold text-2xl m-6 text-gray-800 flex-shrink-0">
          Lịch sử đặt hàng
        </div>

        <div className="flex justify-around w-full max-w-xl flex-shrink-0" role="tablist" aria-label="Order Status Tabs">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              role="tab"
              tabIndex={0}
              aria-selected={activeTab === tab.name}
              className={`px-4 py-2 cursor-pointer ${activeTab === tab.name
                ? "border-b-2 border-primary-500 text-primary-500 font-semibold"
                : "text-gray-600"
                }`}
              onClick={() => handleStatusChange(tab)}
            >
              {tab.name}
            </div>
          ))}
        </div>

        <Form className="w-3/5 my-4 flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-3xl border-none bg-white shadow-md focus:ring-primary-300 placeholder:text-gray-500"
              placeholder="Tìm kiếm theo mã đơn hàng"
              required
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
        </Form>

        {currentOrders.map((order) => {
          return <OrderItem key={order.OrderID} order={order.Orders} />
        })}

        {currentOrders.length === 0 && (
          <div className="flex flex-col items-center p-2">
            <img src="https://organickle.com/images/no-order.svg" className="w-80 h-auto" />
            <p className="text-center font-medium text-2xl text-gray-700">Bạn chưa có đơn hàng nào</p>
            <Link to="/" className="p-4 max-w-48 bg-primary-300 hover:bg-primary-500 rounded-md mt-5 mb-6 text-white font-medium">Tiếp tục mua sắm</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
