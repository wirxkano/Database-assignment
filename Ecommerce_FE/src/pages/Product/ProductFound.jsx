import Navbar from '~/components/Navbar';
import { getProductsByKeyword } from '~/apis/getAPIs';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '~/components/Footer';
import Pagination from '~/components/Pagination/Pagination';
import EmptyProduct from '~/assets/empty-product.png';

function ProductFound() {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductsByKeyword(productName);

      if (response.status === 200) {
        setProducts(response.data);
      }
    }

    fetchProducts();
  }, [productName]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Navbar />
      <div className="px-28 min-h-80">
        <div className="text-sm text-gray-500 my-8">Tìm thấy {products.length} kết quả phù hợp.</div>
        <div>
          {getPaginatedProducts().map((product) => (
            <div key={product.ProductID} className="flex gap-4 mb-6">
              <Link
                to={`/products/${product.ProductID}`}
                className="w-[180px] h-[180px] bg-white overflow-hidden flex flex-col"
              >
                <div className="flex justify-center items-center w-full h-full">
                  <img
                    src={product.ImgUrl}
                    className="w-full h-auto object-cover rounded-bl-lg"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link
                  to={`/products/${product.ProductID}`}
                  className="text-xl font-bold text-gray-800 hover:underline hover:text-primary-400 cursor-pointer">
                  {product.ProductName}
                </Link>
                <p className="text-lg text-gray-700 mt-4 line-clamp-2">
                  {product.Description || 'Chưa có mô tả cho sản phẩm này.'}
                </p>

                <div className="flex items-center mt-8 text-blue-700">
                  <Link
                    to={`/products/${product.ProductID}`}
                    className="font-normal mr-1 hover:underline cursor-pointer text-lg">
                    Xem chi tiết sản phẩm
                  </Link>
                  <svg className="w-4 h-4 dark:text-white mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="flex justify-center">
              <img src={EmptyProduct} alt="Empty product" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
      <div>
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default ProductFound;