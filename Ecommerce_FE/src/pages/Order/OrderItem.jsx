/* eslint-disable react/prop-types */

function OrderItem({ order }) {
  return (
    <div className="p-4 mb-6 bg-white shadow-lg rounded-lg w-3/5">
      <div className="flex justify-between items-center border-b pb-3">
        <div className="text-sm text-gray-500">Mã đơn hàng: <span className="font-medium text-gray-800">{order[0].OrderID}</span></div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-semibold ${order[0].Status === 'COMPLETED'
            ? 'bg-green-100 text-green-700'
            : order[0].Status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-700'
              : order[0].Status === 'CANCELLED'
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'}`}
        >
          {order[0].Status}
        </div>
      </div>

      <div className="divide-y divide-gray-200 my-3">
        {order.map((product, index) => (
          <div key={index} className="flex items-center py-3">
            <img
              src={product.ImgUrl}
              alt={product.Name}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-800">{product.Name}</div>
              <div className="text-sm text-gray-500">Phân loại: {product.CategoryName}</div>
              <div className="text-sm text-gray-500">Số lượng: {product.Quantity}</div>
            </div>
            <div className="font-medium text-primary-300">{product.TotalPrice.toLocaleString()}₫</div>
          </div>
        ))}
      </div>

      <div className="text-right font-medium text-lg text-gray-800 mt-4">
        Tổng tiền: <span className="text-primary-400">{order[0].TotalPriceOfOrder.toLocaleString()}₫</span>
      </div>
    </div>
  );
}

export default OrderItem;
