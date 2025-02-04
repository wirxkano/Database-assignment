import { useEffect, useState } from "react";
import { getCartDetail } from "~/apis/getAPIs";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Link } from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState(new Set()); //store the ProductIDs of checked products

  useEffect(() => {
    const fetchCartDetail = async () => {
      const response = await getCartDetail();
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data);
      }
    };

    fetchCartDetail();
  }, []);

  const handleIncreaseProducts = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.ProductID === productId
          ? { ...product, Quantity: product.Quantity + 1 }
          : product
      )
    );
  };

  const handleDecreaseProducts = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.ProductID === productId && product.Quantity > 1
          ? { ...product, Quantity: product.Quantity - 1 }
          : product
      )
    );
  };

  const handleDeleteProducts = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.ProductID !== productId)
    );
  };

  const handleCheckboxChange = (productId) => {
    setCheckedProducts((prevChecked) => {
      const newChecked = new Set(prevChecked); // Create a copy of the previous Set
      if (newChecked.has(productId)) {
        newChecked.delete(productId); // Uncheck: Remove productId
      } else {
        newChecked.add(productId); // Check: Add productId
      }
      return newChecked; // Update state
    });
  };

  const selectedProducts = products.filter((product) =>
    checkedProducts.has(product.ProductID)
  );

  const totalSellingPrice = selectedProducts.reduce(
    (total, product) => total + product.SellingPrice * product.Quantity,
    0
  );

  const totalDiscount = selectedProducts.reduce(
    (total, product) =>
      total +
      (product.DiscountPrice !== null
        ? (product.SellingPrice - product.DiscountPrice) * product.Quantity
        : 0),
    0
  );

  const totalOrderAmount = totalSellingPrice - totalDiscount;

  return (
    <>
      <Navbar />
      <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Giỏ hàng
          </h2>

          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div class="space-y-6">
                {products.map((product) => (
                  <div>
                    <div
                      key={product.ProductID}
                      class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <input
                          id={`checkbox-${product.ProductID}`}
                          type="checkbox"
                          value=""
                          checked={checkedProducts.has(product.ProductID)}
                          onChange={() =>
                            handleCheckboxChange(product.ProductID)
                          }
                          class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <a href="#" class="shrink-0 md:order-1">
                          <img
                            class="h-20 w-20 dark:hidden"
                            src={product.ImgUrl}
                            alt={product.ProductName}
                          />
                        </a>

                        <label for="counter-input" class="sr-only">
                          Choose quantity:
                        </label>
                        <div class="flex items-center justify-between md:order-3 md:justify-end">
                          <div class="flex items-center">
                            <button
                              onClick={() =>
                                handleDecreaseProducts(product.ProductID)
                              }
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="counter-input"
                              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input"
                              data-input-counter
                              class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              placeholder=""
                              value={product.Quantity}
                              readOnly
                            />
                            <button
                              onClick={() =>
                                handleIncreaseProducts(product.ProductID)
                              }
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="counter-input"
                              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div class="text-end md:order-4 md:w-32">
                            {product.DiscountPrice === null ? (
                              <p className="text-base text-gray-800 font-bold">
                                {product?.SellingPrice?.toLocaleString()}₫
                              </p>
                            ) : (
                              <>
                                <p className="text-base text-gray-900 font-bold">
                                  {product?.DiscountPrice?.toLocaleString()}₫
                                </p>
                                <p className="text-base text-gray-500 line-through">
                                  {product?.SellingPrice?.toLocaleString()}₫
                                </p>
                              </>
                            )}
                            {/* <p class="text-base font-bold text-gray-900 dark:text-white">
                              {(
                                (product.DiscountPrice ??
                                  product.SellingPrice) * product.Quantity
                              )?.toLocaleString()}
                              ₫
                            </p> */}
                          </div>
                        </div>

                        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            class="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            <p>{product?.ProductName?.toLocaleString()}</p>
                            <p>{product?.Description?.toLocaleString()}</p>
                          </a>

                          <div class="flex items-center gap-8">
                            <button
                              type="button"
                              class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                            >
                              <svg
                                class="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                              </svg>
                              Add to Favorites
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteProducts(product.ProductID)
                              }
                              type="button"
                              class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-red-700 dark:hover:text-red-700"
                            >
                              <svg
                                class="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="hidden xl:mt-8 xl:block">
                <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                  People also bought
                </h3>
                <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                  <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" class="overflow-hidden rounded">
                      <img
                        class="mx-auto h-44 w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                        alt="imac image"
                      />
                      <img
                        class="mx-auto hidden h-44 w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        iMac 27”
                      </a>
                      <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p class="text-lg font-bold text-gray-900 dark:text-white">
                        <span class="line-through"> $399,99 </span>
                      </p>
                      <p class="text-lg font-bold leading-tight text-gray-600 dark:text-gray-500">
                        $299
                      </p>
                    </div>
                    <div class="mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-1"
                        type="button"
                        class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-1"
                        role="tooltip"
                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Add to favourites
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <button
                        type="button"
                        class="inline-flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      >
                        <svg
                          class="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" class="overflow-hidden rounded">
                      <img
                        class="mx-auto h-44 w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                        alt="imac image"
                      />
                      <img
                        class="mx-auto hidden h-44 w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        Playstation 5
                      </a>
                      <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p class="text-lg font-bold text-gray-900 dark:text-white">
                        <span class="line-through"> $799,99 </span>
                      </p>
                      <p class="text-lg font-bold leading-tight text-gray-600 dark:text-gray-500">
                        $499
                      </p>
                    </div>
                    <div class="mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-2"
                        type="button"
                        class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-2"
                        role="tooltip"
                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Add to favourites
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <button
                        type="button"
                        class="inline-flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      >
                        <svg
                          class="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" class="overflow-hidden rounded">
                      <img
                        class="mx-auto h-44 w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                        alt="imac image"
                      />
                      <img
                        class="mx-auto hidden h-44 w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        Apple Watch Series 8
                      </a>
                      <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p class="text-lg font-bold text-gray-900 dark:text-white">
                        <span class="line-through"> $1799,99 </span>
                      </p>
                      <p class="text-lg font-bold leading-tight text-gray-600 dark:text-gray-500">
                        $1199
                      </p>
                    </div>
                    <div class="mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-3"
                        type="button"
                        class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-3"
                        role="tooltip"
                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Add to favourites
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>

                      <button
                        type="button"
                        class="inline-flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      >
                        <svg
                          class="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">
                  Tạm tính
                </p>

                <div class="space-y-4">
                  <div class="space-y-2">
                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tổng tiền
                      </dt>
                      <dd class="text-base font-medium text-gray-900 dark:text-white">
                        {totalSellingPrice.toLocaleString()}₫
                      </dd>
                    </dl>

                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                        Giảm giá
                      </dt>
                      <dd class="text-base font-medium text-green-600">
                        -{totalDiscount.toLocaleString()}₫
                      </dd>
                    </dl>
                  </div>

                  <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt class="text-base font-bold text-gray-900 dark:text-white">
                      Thành tiền
                    </dt>
                    <dd class="text-base font-bold text-gray-900 dark:text-white">
                      {totalOrderAmount.toLocaleString()}₫
                    </dd>
                  </dl>
                </div>

                <a
                  href="#"
                  class="flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  <Link to="/payment">Tiến hành thanh toán</Link>
                </a>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href="#"
                    title=""
                    class="inline-flex items-center gap-2 text-sm font-medium text-gray-400 underline hover:no-underline dark:text-gray-500"
                  >
                    <Link to="/">Tiếp tục mua sắm</Link>
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form class="space-y-4">
                  <div>
                    <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                    <input type="text" id="voucher" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500" placeholder="" required />
                  </div>
                  <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Apply Code</button>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
