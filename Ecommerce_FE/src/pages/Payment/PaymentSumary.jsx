/* eslint-disable react/prop-types */
import { isEmpty } from '~/utils/isEmpty';

function PaymentSummary({ totalPrice, shippingFee, voucher = {}, onClick, paymentMethod = "cash", setPaymentMethod }) {
  let discountPrice = 0;

  if (!isEmpty(voucher)) {
    if (voucher?.Title === 'FREESHIP') {
      discountPrice = shippingFee;
    } else {
      discountPrice = totalPrice * voucher?.DiscountPercent / 100;
    }
  }

  return (
    <div className="mt-2">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex items-center justify-between text-gray-600">
          <p className="text-base">Tạm tính:</p>
          <span className="font-medium">{`${totalPrice.toLocaleString()}đ`}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <p className="text-base">Phí vận chuyển:</p>
          <span className="font-medium">{`${shippingFee.toLocaleString()}đ`}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <p className="text-base">Giảm giá:</p>
          <span className="font-medium">{discountPrice === 0 ? '0đ' : `-${discountPrice.toLocaleString()}đ`}</span>
        </div>

        <div className="border-t pt-4 flex items-center justify-between text-primary-500">
          <p className="text-lg font-semibold">Tổng cộng:</p>
          <span className="text-lg font-semibold text-primary-600">
            {`${(totalPrice + shippingFee - discountPrice).toLocaleString()}đ`}
          </span>
        </div>

        <div>
          <h3 className="text-gray-700 text-base font-medium mb-3">Phương thức thanh toán:</h3>
          <div className="space-y-2">
            {/* Payment by Cash */}
            <label
              htmlFor="payment-cash"
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all 
              ${paymentMethod === "cash" ? "bg-indigo-50 text-indigo-900 ring-1 ring-indigo-200" : "bg-white text-gray-700"} 
              hover:ring-1 hover:ring-indigo-300`}
            >
              <input
                id="payment-cash"
                type="radio"
                value="cash"
                name="payment-method"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="hidden peer"
              />
              <svg className="w-6 h-6 mr-3 text-primary-400 dark:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
              Thanh toán bằng tiền mặt
            </label>

            {/* Payment by Card */}
            <label
              htmlFor="payment-card"
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all 
              ${paymentMethod === "card" ? "bg-indigo-50 text-indigo-900 ring-1 ring-indigo-200" : "bg-white text-gray-700"} 
              hover:ring-1 hover:ring-indigo-300`}
            >
              <input
                id="payment-card"
                type="radio"
                value="card"
                name="payment-method"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="hidden peer"
              />
              <svg
                className="w-6 h-6 mr-3 text-primary-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM4 6h16v3H4Zm0 5h7v5H4Zm9 0h7v5h-7Z"></path>
              </svg>
              Thanh toán bằng thẻ
            </label>
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
