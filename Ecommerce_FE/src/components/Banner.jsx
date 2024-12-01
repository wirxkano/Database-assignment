import { Link } from 'react-router-dom';
import banner from '~/assets/deal.webp';

function Banner() {
  return (
    <div className="relative w-full">
      <img src={banner} className="w-full h-auto" alt="Banner" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-gray-800 text-4xl font-bold">
          Giảm giá lớn nhất năm
        </h1>
        <div className="text-gray-500 font-light">
          Giảm 30% cho tất cả các đơn hàng trị giá từ 30.000.000 đồng
        </div>
        <Link
          to="#"
          className="bg-primary-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-black transition-all duration-300">
          Mua ngay
        </Link>
      </div>

    </div>
  );
}

export default Banner;
