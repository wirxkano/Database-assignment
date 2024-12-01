import { Link } from 'react-router-dom';
import arya from '~/assets/Arya-Logo-Lg.png';
import { Icon } from '@iconify/react';
import { useState } from 'react';

function Navbar() {
  const [userPopup, setUserPopup] = useState(false);


  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-[calc(100vw-190px)] flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={arya} className="h-8" alt="Arya Logo" />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-white bg-primary-500 rounded md:bg-transparent md:text-primary-500 md:p-0 dark:text-white md:dark:text-primary-500" aria-current="page">Trang chủ</Link>
              </li>
              <li>
                <Link to="/products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/oders" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Đơn hàng của tôi</Link>
              </li>
              <li>
                <Link to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-8">
            <Link to="#" className="flex items-center hover:text-primary-500">
              <Icon icon="mdi:cart-outline" width="24" height="24" />
              Giỏ hàng
            </Link>
            <div className="relative hover:text-primary-500">
              <button onClick={() => setUserPopup(!userPopup)}>
                <Icon icon="mdi:user-circle" width="36" height="36" />
              </button>

              {userPopup && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-md w-48 z-10">
                  <Link to="/profile" className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Thông tin cá nhân
                  </Link>
                  <hr />
                  <Link to="/logout" className="block px-2 py-2 text-primary-500 hover:bg-red-100 rounded">
                    Đăng xuất
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;