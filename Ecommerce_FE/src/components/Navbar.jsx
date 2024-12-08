import { Link, useLocation, useNavigate } from "react-router-dom";
import arya from "~/assets/Arya-Logo-Lg.png";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { logoutAction } from '~/apis/postAPIs';

function Navbar() {
  const [userPopup, setUserPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = async () => {
    const response = await logoutAction();
    if (response.status === 200) {
      sessionStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/login");
    }
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-[calc(100vw-190px)] flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={arya} className="h-8" alt="Arya Logo" />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {[
                { path: "/", label: "Trang chủ" },
                { path: "/products", label: "Sản phẩm" },
                { path: "/orders", label: "Đơn hàng của tôi" },
                { path: "/contact", label: "Liên hệ" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-3 rounded ${location.pathname === item.path
                      ? "text-red-500"
                      : "text-gray-900"
                      } hover:bg-gray-100 hover:text-primary-500 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    aria-current={
                      location.pathname === item.path ? "page" : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-8">
            <Link to="#" className="flex items-center hover:text-primary-500">
              <Icon icon="mdi:cart-outline" width="24" height="24" />
              Giỏ hàng
            </Link>
            {isLoggedIn ? (
              <div className="relative hover:text-primary-500">
                <button onClick={() => setUserPopup(!userPopup)}>
                  <Icon icon="mdi:user-circle" width="36" height="36" />
                </button>

                {userPopup && (
                  <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-md w-48 z-10">
                    <Link
                      to="/info"
                      className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Thông tin cá nhân
                    </Link>
                    <hr />
                    <div
                      onClick={handleLogout}
                      className="block px-2 py-2 text-primary-500 hover:bg-red-100 rounded cursor-pointer"
                    >
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-primary-500">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
