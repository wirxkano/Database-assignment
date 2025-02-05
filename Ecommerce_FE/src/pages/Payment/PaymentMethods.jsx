/* eslint-disable react/prop-types */

const PaymentMethods = ({ lstPaymentMethods, paymentMethod = "cash", setPaymentMethod }) => {

  return (
    <div>
      <h3 className="text-gray-700 text-base font-medium mb-3">Phương thức thanh toán:</h3>
      <div className="space-y-2">
        {lstPaymentMethods.map((method, idx) => (
          <label
            key={idx}
            htmlFor={method.id}
            className={`flex items-center p-4 border rounded-lg transition-all
            ${paymentMethod === method.id ? "bg-indigo-50 text-indigo-900 ring-1 ring-indigo-200" : "bg-white text-gray-700 hover:bg-gray-100"} 
            `}
          >
            <input
              id={method.id}
              type="radio"
              value={method.id}
              name="payment-method"
              checked={paymentMethod === method.id}
              onChange={() => setPaymentMethod(method.id)}
              className="peer hidden"
            />
            {method.svgPath}
            {method.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
