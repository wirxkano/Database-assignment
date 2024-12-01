import Slider from '~/components/Slider';
import Navbar from '~/components/Navbar';
import Category from '~/components/Category';
import { Link, useLoaderData } from 'react-router-dom';
import Product from '~/components/Product';
import Banner from '~/components/Banner';
import { useEffect, useState } from 'react';

function Home() {
  const { categories, trendingProducts, products } = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingProducts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [trendingProducts.length]);

  return (
    <div>
      <Navbar />
      <Slider />
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center gap-4">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>

     <div className="w-full h-auto mb-12 px-16">
        <p className="font-bold text-2xl text-gray-800 text-center my-16">Sản phẩm bán chạy</p>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {trendingProducts.concat(trendingProducts.slice(0, 4)).map((product, index) => (
              <div key={index} className="w-1/4 flex-shrink-0">
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-auto mb-12">
        <p className="font-bold text-2xl text-gray-800 text-center my-16">Tất cả sản phẩm</p>
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="w-full h-24 flex justify-center items-center pb-6 mb-12">
        <Link
          to="#"
          className="text-white bg-primary-500 hover:bg-black py-2 px-6 rounded-md text-lg font-semibold transition-all duration-300"
        >
          Xem thêm
        </Link>
      </div>

      <div className="w-full h-auto mb-12">
        <Banner />
      </div>
    </div>
  );
}

export default Home;
