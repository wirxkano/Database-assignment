import Slider from '~/components/Slider';
import Navbar from '~/components/Navbar';
import Category from '~/components/Category';
import { Form, useLoaderData } from 'react-router-dom';
import Product from '~/pages/Product/Product';
import Banner from '~/components/Banner';
import { useEffect, useState } from 'react';
import { retrieveTrendingProducts } from '~/apis/postAPIs';
import Pagination from '~/components/Pagination/Pagination';
import Footer from '~/components/Footer';

function Home() {
  const { categories, products } = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const pageSize = 12;

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex);
  };  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingProducts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [trendingProducts.length]);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      const response = await retrieveTrendingProducts({ startDate: null, endDate: null, n: '5' });

      if (response.status === 200) {
        setTrendingProducts(response.data);
      }
    }
    fetchBestSellingProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      startDate: formData.get('start-date'),
      endDate: formData.get('end-date'),
      n: formData.get('top-n'),
    };

    const response = await retrieveTrendingProducts(data);

    if (response.status === 200) {
      setTrendingProducts(response.data);
    }

  }

  return (
    <div>
      <Navbar />
      <Slider />
      <div className="w-full h-auto bg-gray-100 py-12">
        <p className="font-bold text-2xl text-gray-800 text-center mb-12">Danh mục</p>
        <div className="flex items-center justify-center gap-4">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="w-full h-auto mb-12 px-16">
        <p className="font-bold text-2xl text-gray-800 text-center mt-16 mb-8">Sản phẩm bán chạy</p>
        <Form className="w-full flex items-center justify-center gap-4 mb-12" onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="start-date">
            Từ ngày
          </label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
          />
          <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="end-date">
            Đến ngày
          </label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
          />
          <input
            type="number"
            min="1"
            max="10"
            name="top-n"
            className="border border-gray-300 rounded-md px-4 py-2 w-40 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
            placeholder="Số lượng"
          />
          <button
            className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-all duration-300"
            type="submit"
          >
            Tìm kiếm
          </button>
        </Form>

        <div className="flex justify-center">
          {trendingProducts.length <= 4 && trendingProducts.map((product, index) => (
            <div key={index} className="w-1/4">
              <Product product={product} />
              <div className="text-center text-gray-600 font-medium">Số lượng đã bán: {product.TotalSold}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {trendingProducts.length > 4 && trendingProducts.concat(trendingProducts.slice(0, 4)).map((product, index) => (
              <div key={index} className="w-1/4 flex-shrink-0">
                <Product product={product} />
                <div className="text-center text-gray-600 font-medium">Số lượng đã bán: {product.TotalSold}</div>
              </div>
            ))}
          </div>
          {trendingProducts.length === 0 && (
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Không có sản phẩm nào được tìm thấy trong thời gian trên</p>
              <p className="font-medium text-gray-600 mt-4">Vui lòng chọn ngày khác.</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-auto mb-12">
        <p className="font-bold text-2xl text-gray-800 text-center my-16">Tất cả sản phẩm</p>
        <div className="flex flex-wrap justify-center gap-6">
          {getPaginatedProducts().map((product) => (
            <Product key={product.ProductID} product={product} />
          ))}
        </div>
      </div>

      {/* <div className="w-full h-24 flex justify-center items-center pb-6 mb-12">
        <Link
          to="#"
          className="text-white bg-primary-500 hover:bg-black py-2 px-6 rounded-md text-lg font-semibold transition-all duration-300"
        >
          Xem thêm
        </Link>
      </div> */}
      <div className="flex justify-center mb-8">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>

      <div className="w-full h-auto mb-12">
        <Banner />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
