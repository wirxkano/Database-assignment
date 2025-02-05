/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Product({ product }) {
  const { ProductID, ProductName, SellingPrice, DiscountPrice, ImgUrl } = product;

  return (
    <div>
      <div className="relative group hover:shadow-md">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center 
            w-12 h-12 rounded-full bg-gray-200 hover:bg-black opacity-0 group-hover:opacity-100 transition duration-300
            cursor-pointer z-10">
          <svg className="h-7 w-7 text-gray-900 dark:text-white transition duration-300 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"></path>
          </svg>
        </div>
        <Link
          to={`products/${ProductID}`}
          className="w-[320px] h-[360px] bg-gray-100 rounded-lg overflow-hidden flex flex-col transition duration-300 group-hover:bg-gray-300"
        >
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={ImgUrl}
              className="w-full h-auto object-cover rounded-bl-lg"
            />
            <div
              className="absolute inset-0 bg-gray-300/50 opacity-0 group-hover:opacity-100 transition duration-300"
            ></div>
          </div>
        </Link>
      </div>

      <div className="p-4 text-center">
        <Link
          to={`products/${ProductID}`}
          className="mb-4 font-medium hover:text-gray-600"
        >
          {ProductName}
        </Link>
        <div className="flex items-center justify-center gap-x-2">
          {DiscountPrice === null ? (
            <span className="text-gray-800 text-lg font-medium">{SellingPrice.toLocaleString()}đ</span>
          ) : (
            <span className="text-primary-500 text-lg font-medium">{DiscountPrice.toLocaleString()}đ</span>
          )}
          <span className="text-gray-500 text-lg font-normal line-through">
            {DiscountPrice === null ? '' : SellingPrice.toLocaleString() + 'đ'}
          </span>
        </div>
      </div>
    </div >
  );
}

export default Product;
