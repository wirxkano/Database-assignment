import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRelatedProducts, productDetailsLoader } from "~/apis/getAPIs";
import Navbar from "~/components/Navbar";
import Product from "./Product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "~/components/Footer";
import Review from "../Review/Review";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLove, setIsLove] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numProducts, setNumProducts] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productDetailsLoader(id);
      setProduct(response);
    };

    const fetchRelatedProducts = async () => {
      const response = await getRelatedProducts(id);
      if (response.status === 200) {
        setRelatedProduct(response.data);
        setNumProducts(response.data.length);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return relatedProduct.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-gray-100">
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

            <div className="flex items-center gap-4 my-6">
              {product.DiscountPrice === null ? (
                <span className="text-2xl text-gray-800 font-bold">
                  {product?.SellingPrice?.toLocaleString()}₫
                </span>
              ) : (
                <>
                  <span className="text-2xl text-red-500 font-bold">
                    {product?.DiscountPrice?.toLocaleString()}₫
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product?.SellingPrice?.toLocaleString()}₫
                  </span>
                </>
              )}

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(product.AverageRate);
                  const hasHalfStar = product.AverageRate % 1 !== 0;
                  return (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < fullStars
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

                <div className="underline hover:no-underline cursor-pointer">
                  {product.AverageRate ? product.AverageRate.toFixed(1) : 0.0}{" "}
                  Đánh giá
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              <span className="font-medium">Số lượng trong kho:</span>{" "}
              {product.Quantity}
            </p>
            <hr className="my-4" />

            <p className="text-gray-700 mb-6">
              <span className="font-medium">Mô tả sản phẩm:</span>{" "}
              {product.Description}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">Hãng sản xuất:</span>{" "}
              {product.BrandName}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">Quốc gia:</span> {product.Country}
            </p>

            <div className="flex items-center gap-4">
              <Link
                to={`/payment?productId=${id}`}
                state={{ product }}
                className="bg-primary-500 text-white text-center px-4 py-2 rounded-md shadow hover:bg-primary-600 md:min-w-48"
              >
                Mua ngay
              </Link>
              <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300 hover:text-primary-400">
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Thêm vào giỏ hàng
              </button>

              <div
                className="flex gap-2 items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300 md:min-w-48 cursor-pointer"
                onClick={() => setIsLove(!isLove)}
              >
                {isLove ? (
                  <svg
                    className="w-6 h-6 text-red-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                )}
                Yêu thích
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 relative">
          <p className="font-bold text-2xl text-gray-800 text-center mt-12 mb-8">
            Sản phẩm cùng thương hiệu
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {getPaginatedProducts().map((product) => (
              <Product key={product.ProductID} product={product} />
            ))}
          </div>

          {getPaginatedProducts().length === 0 && (
            <div className="text-center text-gray-700 text-lg">
              Hiện chưa có sản phẩm nào.
            </div>
          )}

          <div className="flex justify-center space-x-2">
            {[...Array(Math.ceil(relatedProduct.length / pageSize))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index + 1 === currentPage ? "bg-black" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                />
              )
            )}
          </div>

          <button
            className={`${
              currentPage === 1 ? "hidden" : "block"
            } absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full opacity-70 transition duration-200 ease-in-out hover:opacity-100`}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {numProducts > pageSize && (
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full opacity-70 transition duration-200 ease-in-out hover:opacity-100"
              onClick={() =>
                setCurrentPage(
                  (currentPage % Math.ceil(relatedProduct.length / pageSize)) +
                    1
                )
              }
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <Review />
      <hr />

      <Footer />
    </div>
  );
}

export default ProductDetail;
