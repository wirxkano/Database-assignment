/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getReviewsOfProduct } from '~/apis/getAPIs';
import { storeReview } from '~/apis/postAPIs';
import Pagination from '~/components/Pagination/Pagination';

function Review({ productID, product }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getReviewsOfProduct(productID);

      if (response.status == 200) {
        setReviews(response.data);
      }
    }

    fetchReviews();
  }, [productID]);

  const ratingCounts = useMemo(() => {
    return [1, 2, 3, 4, 5].reduce((acc, star) => {
      acc[star] = reviews.filter((r) => r.Rate === star).length;
      return acc;
    }, {});
  }, [reviews]);

  const getPaginatedReview = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return reviews.slice(startIndex, endIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      setMessage("Bạn phải đồng ý với các chính sách và điều khoản trước!");
      setFailedMessage(true);
      return;
    }

    const formData = new FormData(e.target);
    const description = formData.get("description");
    

    if (rating === 0 || description === "") {
      setMessage("Bắt buộc phải chọn số sao và nhập mô tả!");
      setFailedMessage(true);
      return;
    }

    if (description.length > 100) {
      setMessage("Mô tả tối đa 100 ký tự");
      setFailedMessage(true);
      return;
    }

    try {
      const response = await storeReview({ rating, description }, productID);

      if (response.status == 200) {
        setMessage("Thêm nhận xét thành công!");
        setSuccessMessage(true);
        handleCloseForm();
      }
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
      } 
    }
  }

  const handleCloseForm = async () => {
    setIsOpenModal(false);
    setRating(0);
    setIsChecked(false);
  }

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
      setSuccessMessage(false);
    }

    if (failedMessage) {
      setTimeout(() => {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
      setFailedMessage(false);
    }
  }, [failedMessage, message, successMessage]);

  return (
    <div id="reviews-of-product">
      <ToastContainer />
      
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Đánh giá</h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(product.AverageRate);
                  const hasHalfStar = product.AverageRate % 1 !== 0;
                  return (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < fullStars
                        ? "text-yellow-300" // Full star
                        : i === fullStars && hasHalfStar
                          ? "text-yellow-300 half-star" // Half star
                          : "text-gray-400" // Empty star
                        }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {i < fullStars ? (
                        // Full Star
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      ) : i === fullStars && hasHalfStar ? (
                        // Half Star (Using Clipped SVG)
                        <path d="M12 2c-.64 0-1.28.318-1.6 1l-2 4.5-4.9.4c-1.12.1-1.8 1.3-1.2 2.3l3.8 3.2-1.2 5c-.3 1.2 1 2.3 2.1 1.6L12 18.5V2z" />
                      ) : (
                        // Empty Star
                        <path
                          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      )}
                    </svg>
                  );
                })}
              </div>

              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">({product.AverageRate ? product.AverageRate.toFixed(1) : 0.0})</p>
              <div className="text-sm font-medium leading-none text-gray-900 dark:text-white"> {reviews.length} đánh giá </div>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {product.AverageRate} trên 5 sao
              </p>
              <button
                type="button"
                data-modal-target="review-modal"
                data-modal-toggle="review-modal"
                className="mb-2 me-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => setIsOpenModal(true)}
              >
                Viết đánh giá
              </button>
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratingCounts[star] || 0;
                const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">{star}</p>
                    <svg className="h-4 w-4 shrink-0 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-1.5 rounded-full bg-yellow-300" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left">
                      {count} <span className="hidden sm:inline">nhận xét</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            {getPaginatedReview().map((review, idx) => (
              <div key={idx} className="gap-3 pt-6 pb-6 sm:flex sm:items-start">
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.Rate ? review.Rate : 0)].map((_, i) => {
                      return (
                        <svg
                          key={i}
                          className={`w-4 h-4 text-yellow-300`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      );
                    })}
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{review.FirstName} {review.LastName}</p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400 hidden">{review.Date}</p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <svg className="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Đã mua hàng</p>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-4 sm:mt-0">
                  <p className="mt-6 text-base font-normal text-gray-800 dark:text-gray-400">{review.Detail}</p>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Đánh giá này có hữu ích cho bạn?</p>
                    <div className="flex items-center">
                      <input id="reviews-radio-3" type="radio" value="" name="reviews-radio-2" className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                      <label htmlFor="reviews-radio-3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Có: 1 </label>
                    </div>
                    <div className="flex items-center">
                      <input id="reviews-radio-4" type="radio" value="" name="reviews-radio-2" className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                      <label htmlFor="reviews-radio-4" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Không: 0 </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={reviews.length}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </section>

      {isOpenModal && (
        <div id="review-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 h-screen w-full flex items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased bg-black bg-opacity-50">
          <div className="relative max-h-full w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Nhận xét cho sản phẩm:</h3>
                  <a href="#" className="font-medium text-primary-700 hover:underline dark:text-primary-500">{product.Name}</a>
                </div>
                <button
                  type="button"
                  className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="review-modal"
                  onClick={handleCloseForm}
                >
                  <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <Form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  {/* <div className="col-span-2">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg className="ms-2 h-6 w-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg className="ms-2 h-6 w-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg className="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg className="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <span className="ms-2 text-lg font-bold text-gray-900 dark:text-white">3.0 out of 5</span>
                    </div>
                  </div> */}

                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <svg
                          key={index}
                          className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${starValue <= rating ? "text-yellow-300" : "text-gray-300 dark:text-gray-500"
                            }`}
                          onClick={() => setRating(starValue)}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      );
                    })}
                    <span className="ms-2 text-lg font-bold text-gray-900 dark:text-white">
                      {rating} trên {5}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Mô tả chi tiết (tối đa 100 ký tự)</label>
                    <textarea id="description" name="description" rows="6" className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required=""></textarea>
                  </div>
                  {/* <div className="col-span-2">
                    <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Add real photos of the product to help other customers <span className="text-gray-500 dark:text-gray-400">(Optional)</span></p>
                    <div className="flex w-full items-center justify-center">
                      <label htmlFor="dropzone-file" className="dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div> */}
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <input id="review-checkbox" type="checkbox" onClick={() => setIsChecked(!isChecked)} value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-0 outline-none dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                      <label htmlFor="review-checkbox" className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">Tôi đồng ý với các <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">chính sách và điều khoản</a>.</label>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                  <button type="submit" className="me-2 inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Thêm nhận xét</button>
                  <button onClick={handleCloseForm} type="button" data-modal-toggle="review-modal" className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Hủy</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;