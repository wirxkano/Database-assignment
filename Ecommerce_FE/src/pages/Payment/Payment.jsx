import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { userLoader } from '~/apis/getAPIs';
import Navbar from '~/components/Navbar';
import PaymentSumary from './PaymentSumary';
import { makeOrder } from '~/apis/postAPIs';

const SHIPPING_FEE = 30000;

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [userData, setUserData] = useState({});
  const [numberPurchase, setNumberPurchase] = useState(1);
  const [isPopup, setIsPopup] = useState(false);
  const [addressIndex, setAddressIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  useEffect(() => {
    if (!(sessionStorage.getItem("isLoggedIn") === "true")) {
      navigate("/login");
    }

  }, [navigate]);

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const { user } = await userLoader();
        setUserData(user);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/login');
        }
      }
    }

    fecthUser();
  }, [navigate]);

  const handleIncrease = () => {
    if (numberPurchase < product.Quantity) {
      setNumberPurchase((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (numberPurchase > 1) {
      setNumberPurchase((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const value = Math.max(1, Math.min(product.Quantity, Number(e.target.value)));
    setNumberPurchase(value);
  };

  const handlePurchase = async () => {
    const data = {
      ...userData,
      product: {
        productId,
        numberPurchase,
        priceAtOrderedTime: product.DiscountPrice ? product.DiscountPrice : product.SellingPrice
      },
      selectedAddress: userData.addresses[addressIndex]
    }

    const response = await makeOrder(data);

    if (response.status === 200) {
      sessionStorage.setItem('successMessage', 'Đặt hàng thành công, vui lòng theo dõi trạng thái đơn hàng của bạn.');
      navigate('/orders');
    }
  }

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  if (!product || product === undefined || isEmpty(userData)) {
    return (
      <div role="status" className="flex items-center justify-center w-full h-screen">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 pb-4">
      <Navbar />
      <div className="mx-16 my-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Thông tin người nhận:</p>
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-primary-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-200">{userData?.fullName}</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-primary-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
            </svg>
            <span className="text-gray-700 dark:text-gray-200">{userData?.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-primary-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-200">
              {userData?.address?.length >= 0
                ? `${userData?.addresses[addressIndex]?.street}, ${userData?.addresses[addressIndex]?.commune}, ${userData?.addresses[addressIndex]?.district}, ${userData?.addresses[addressIndex]?.city}`
                : 'Chưa nhập địa chỉ'
              }
            </span>
            <button
              className="text-primary-500"
              onClick={() => setIsPopup(true)}
            >
              Thay đổi
            </button>
          </div>
        </div>

        {isPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Chọn địa chỉ nhận hàng
              </h3>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {userData.addresses.map((address, index) => (
                  <label
                    key={index}
                    className={`flex justify-between items-center p-4 border rounded-md ${addressIndex === index
                      ? 'bg-teal-50 border-teal-200'
                      : 'bg-gray-50 border-gray-300'
                      } hover:shadow-md transition`}
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {`${address.street}, ${address.commune}, ${address.district}, ${address.city}`}
                    </span>
                    <input
                      type="radio"
                      name="address"
                      checked={addressIndex === index}
                      onChange={() => setAddressIndex(index)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 focus:ring-2"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsPopup(false);
                  }}
                  className="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Hình ảnh</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Đơn giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tiền
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="p-4">
                  <img src={product.ImgUrl} className="w-16 md:w-32 max-w-full max-h-full" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.Name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.DiscountPrice ? product?.DiscountPrice.toLocaleString() : product?.SellingPrice.toLocaleString()}đ
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={handleDecrease}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="number"
                        id="first_product"
                        value={numberPurchase}
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        min="1"
                        max={product.Quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button
                      onClick={handleIncrease}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>

                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.DiscountPrice ? (product.DiscountPrice * numberPurchase)?.toLocaleString() : (product.SellingPrice * numberPurchase)?.toLocaleString()}đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <PaymentSumary
          totalPrice={product.DiscountPrice ? product.DiscountPrice * numberPurchase : product.SellingPrice * numberPurchase}
          shippingFee={SHIPPING_FEE}
          onClick={handlePurchase}
        />

      </div>
    </div>
  );
}

export default Payment;
