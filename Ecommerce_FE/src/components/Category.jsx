/* eslint-disable react/prop-types */

import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function Category({ category }) {
  const { name, quantity, img } = category;

  return (
    <Link to="#" className="w-[320px] h-[260px] bg-white rounded-lg overflow-hidden relative flex flex-col hover:shadow-md hover:w-[330px] hover:h-[270px] transition-all duration-300 ease-in-out">
      <div className="flex flex-col pl-8 pt-8 justify-between items-start w-full">
        <div className="flex justify-between items-center w-full pr-4">
          <div>
            <p className="text-gray-600 text-md">{quantity}+ sản phẩm</p>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          </div>
          <Icon icon="mdi:arrow-right-circle-outline" width="24" height="24" />
        </div>
      </div>

      <div className="w-2/3 h-auto absolute p-2 bottom-5 right-3 hover:w-3/4 transition-all duration-300 ease-in-out">
        <img
          src={img}
          className="w-full max-h-[120px] object-cover rounded-bl-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
    </Link>
  );
}

export default Category;
