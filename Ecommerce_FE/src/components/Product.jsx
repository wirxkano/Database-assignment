/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Product({ product }) {
  const { name, selling_price, discount_price, img } = product;

  return (
    <div>
      <Link to="#" className="w-[320px] h-[360px] bg-gray-100 rounded-lg overflow-hidden flex flex-col hover:bg-gray-200 hover:shadow-md hover:w-[330px] hover:h-[370px] transition-all duration-300 ease-in-out">
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={img}
            className="w-full h-auto object-cover rounded-bl-lg"
          />
        </div>
      </Link>

      <div className="p-4 text-center">
        <Link to="#" className="mb-4 font-medium hover:text-gray-600">{name}</Link>
        <div className="flex items-center justify-center gap-x-2">
          {discount_price === 'Null' ? (
            <span className="text-gray-800 text-lg font-medium">{selling_price}</span>
          ) : (
            <span className="text-primary-500 text-lg font-medium">{discount_price}</span>
          )}
          <span className="text-gray-500 text-lg font-normal line-through">
            {discount_price === 'Null' ? '' : selling_price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;