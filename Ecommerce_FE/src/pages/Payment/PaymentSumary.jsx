/* eslint-disable react/prop-types */
import { useState } from 'react';

function PaymentSummary({ totalPrice, shippingFee, onClick }) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex items-center justify-between text-gray-600">
          <p className="text-base">Tạm tính:</p>
          <span className="font-medium">{`${totalPrice.toLocaleString()}đ`}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <p className="text-base">Phí vận chuyển:</p>
          <span className="font-medium">{`${shippingFee.toLocaleString()}đ`}</span>
        </div>
        <div className="border-t pt-4 flex items-center justify-between text-primary-500">
          <p className="text-lg font-semibold">Tổng cộng:</p>
          <span className="text-lg font-semibold text-primary-600">
            {`${(totalPrice + shippingFee).toLocaleString()}đ`}
          </span>
        </div>

        <div>
          <h3 className="text-gray-700 text-base font-medium mb-3">Phương thức thanh toán:</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="payment-cash"
                type="radio"
                value="cash"
                name="payment-method"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="w-4 h-4 text-primary-400 bg-gray-100 border-gray-300"
              />
              <label htmlFor="payment-cash" className="ml-2 text-gray-700">
                Thanh toán bằng tiền mặt
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="payment-card"
                type="radio"
                value="card"
                name="payment-method"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="w-4 h-4 text-primary-400 bg-gray-100 border-gray-300"
              />
              <label htmlFor="payment-card" className="ml-2 text-gray-700">
                Thanh toán bằng thẻ
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClick}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow hover:bg-primary-700"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
