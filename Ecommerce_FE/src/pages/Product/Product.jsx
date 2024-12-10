/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Product({ product }) {
  const { ProductID, Name, SellingPrice, DiscountPrice, ImgUrl } = product;

  return (
    <div>
      <Link to={`products/${ProductID}`} className="w-[320px] h-[360px] bg-gray-100 rounded-lg overflow-hidden flex flex-col hover:bg-gray-200 hover:shadow-md hover:w-[330px] hover:h-[370px] transition-all duration-300 ease-in-out">
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={ImgUrl}
            className="w-full h-auto object-cover rounded-bl-lg"
          />
        </div>
      </Link>

      <div className="p-4 text-center">
        <Link to={`products/${ProductID}`} className="mb-4 font-medium hover:text-gray-600">{Name}</Link>
        <div className="flex items-center justify-center gap-x-2">
          {DiscountPrice === null ? (
            <span className="text-gray-800 text-lg font-medium">{SellingPrice.toLocaleString()}</span>
          ) : (
            <span className="text-primary-500 text-lg font-medium">{DiscountPrice.toLocaleString()}</span>
          )}
          <span className="text-gray-500 text-lg font-normal line-through">
            {DiscountPrice === null ? '' : SellingPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;