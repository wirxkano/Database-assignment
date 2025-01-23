import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productDetailsLoader } from '~/apis/getAPIs';
import Navbar from '~/components/Navbar';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLove, setIsLove] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productDetailsLoader(id);
      setProduct(response);
    }

    fetchProduct();
  }, [id]);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="container mx-auto p-8 px-16">
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg p-6">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={product.ImgUrl}
              alt={product.Name}
              className="w-full h-auto object-cover rounded-lg border"
            />
          </div>


          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-2">{product.CategoryName}</p>
            <h1 className="text-2xl font-bold text-gray-800">{product.Name}</h1>

            <div className="flex items-center gap-2 mt-2 mb-4">
              <div className="flex gap-2 items-center">
                {product.AverageRate
                ? <span className="text-yellow-300 font-medium text-lg">{product.AverageRate}</span>
                : <span className="text-gray-700">Chưa có đánh giá</span>}
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">(Đánh giá)</span>
            </div>

            <p className="text-gray-600 mb-4">
              <span className="font-medium">Số lượng trong kho:</span> {product.Quantity}
            </p>
            <hr className="my-4" />

            <div className="flex gap-2 items-center mb-2 cursor-pointer" onClick={() => setIsLove(!isLove)}>
              {isLove
                ? <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
                : <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
              }

              <span className="text-gray-700 font-semibold">Thêm vào mục yêu thích</span>
            </div>

            <p className="text-gray-700 mb-6">
              <span className="font-medium">Mô tả sản phẩm:</span> {product.Description}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">Hãng sản xuất:</span> {product.BrandName}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">Quốc gia:</span> {product.Country}
            </p>

            <div className="flex items-center gap-4 mb-6">
              {product.DiscountPrice === null ? (
                <span className="text-xl text-gray-800 font-bold">{product?.SellingPrice?.toLocaleString()}₫</span>
              ) : (
                <>
                  <span className="text-xl text-red-500 font-bold">{product?.DiscountPrice?.toLocaleString()}₫</span>
                  <span className="text-lg text-gray-400 line-through">{product?.SellingPrice?.toLocaleString()}₫</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={`/payment?productId=${id}`}
                state={{ product }}
                className="bg-primary-500 text-white text-center px-4 py-2 rounded-md shadow hover:bg-primary-600 min-w-40"
              >
                Mua ngay
              </Link>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
