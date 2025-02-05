/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function CartPreview({ cartItems = [] }) {

  return (
    <div className="bg-gradient-to-t from-white from-90% to-slate-50 to-10% p-8 shadow-xl rounded-lg">
      <div className="mt-8">
        <div className="flow-root">
          {cartItems.length > 0
            ? (<ul role="list" className="-my-6 divide-y divide-gray-200 pb-6">
              {cartItems.slice(0, 2).map((item) => (
                <li key={item.ProductID} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={item.ImgUrl} className="size-full object-cover" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/products/${item.ProductID}`} className="line-clamp-2">{item.ProductName}</Link>
                        </h3>
                        <p className="ml-4">{item.DiscountPrice ? item?.DiscountPrice.toLocaleString() : item?.SellingPrice.toLocaleString()}đ</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.Description}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Số lượng {item.Quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>)
            : (
              <div className="text-center mb-8">
                <div className="text-xl font-semibold text-gray-600">
                  Giỏ hàng của bạn đang trống
                </div>
                <p className="text-gray-500">
                  Hãy thêm sản phẩm yêu thích vào giỏ hàng để bắt đầu mua sắm!
                </p>
              </div>
            )
          }
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 sm:px-6">
        <div className="mt-6">
          <Link
            to="/cart"
            className="flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-gray-800"
          >
            Xem giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  )
}
