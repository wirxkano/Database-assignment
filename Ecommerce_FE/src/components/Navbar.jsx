import { Link, useLocation, useNavigate } from "react-router-dom";
import arya from "~/assets/Arya-Logo-Lg.png";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { logoutAction } from '~/apis/postAPIs';
import SearchBar from '~/components/SearchBar';

function Navbar() {
  const [userPopup, setUserPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

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
      <nav className="bg-white border-gray-200 dark:bg-gray-900" ref={navbarRef}>
        <div className="md:max-w-[calc(100vw-190px)] flex flex-wrap items-center justify-between mx-auto p-4">
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
                { path: "/#all-products", label: "Sản phẩm" },
                { path: "/orders", label: "Đơn hàng của tôi" },
                { path: "/#contact", label: "Liên hệ" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-3 rounded ${location.pathname === item.path
                      ? "text-primary-500"
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

          <div className="hidden md:flex items-center gap-8">
            <div
              className="cursor-pointer"
              onClick={() => setIsSearch(!isSearch)}
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <Link to="/cart" className="flex items-center hover:text-primary-500">
              <Icon icon="mdi:cart-outline" width="24" height="24" />
            </Link>
            {isLoggedIn ? (
              <div className="relative hover:text-primary-500">
                <button onClick={() => setUserPopup(!userPopup)}>
                  <Icon icon="mdi:user-circle" width="36" height="36" />
                </button>

                {userPopup && (
                  <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-md w-48 z-30">
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

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <div
              className="cursor-pointer"
              onClick={() => setIsSearch(!isSearch)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white hover:text-primary-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            {/* Hamburger Menu */}
            <button
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 z-50 border-t border-gray-200 dark:border-gray-700 shadow-md">
              <ul className="flex flex-col gap-4 p-4">
                {[{ path: "/", label: "Trang chủ" },
                { path: "/orders", label: "Đơn hàng của tôi" },
                { path: "#", label: "Giỏ hàng" }
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block rounded ${location.pathname === item.path
                        ? "text-primary-500"
                        : "text-gray-900"
                        } hover:text-primary-500 dark:text-white`}
                      aria-current={location.pathname === item.path ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                <div className="flex flex-col gap-4">
                  {isLoggedIn ? (
                    <div className="flex justify-between">
                      <Link to="/info" className="hover:text-primary-500">
                        Thông tin cá nhân
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-primary-500"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="hover:text-primary-500">
                      Đăng nhập
                    </Link>
                  )}
                </div>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {isSearch ? (
        <SearchBar closeSearch={() => setIsSearch(false)} navbarRef={navbarRef} />
      ) : <hr />}
    </div>
  );
}

export default Navbar;
