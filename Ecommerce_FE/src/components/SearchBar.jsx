/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { getSearchProductHistory } from '~/apis/getAPIs';
import { storeSearchProductHistory } from '~/apis/postAPIs';

function SearchBar({ closeSearch, navbarRef }) {
  const navigate = useNavigate();
  const searchBarRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchSearchData = async () => {
      const response = await getSearchProductHistory();
      setSearchHistory(response.data);
    }

    fetchSearchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        (!navbarRef.current || !navbarRef.current.contains(event.target))
      ) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSearch, navbarRef]);

  const handleSubmit = async (keyword = searchValue) => {
    if ((sessionStorage.getItem("isLoggedIn") === "true")) {
      const response = await storeSearchProductHistory(keyword);
      console.log(response);
    }
    closeSearch();
    navigate(`/products/search?q=${keyword}`);
  };

  return (
    <div>
      <div
        className="w-full mx-auto z-50 bg-white py-8 px-28 absolute shadow-lg"
        ref={searchBarRef}
      >
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <Form>
            <input
              type="text"
              autoFocus={true}
              className="border-none outline-none w-full text-lg font-semibold focus:ring-0"
              placeholder="Tìm kiếm sản phẩm..."
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </Form>
        </div>
        <div>
          <p className="text-xs font-medium mt-6 mb-4 text-gray-600">Lịch sử tìm kiếm</p>
          {searchHistory && searchHistory.length > 0 ? (
            <div className="space-y-2 max-h-56 overflow-y-scroll">
              {searchHistory.map((keyword, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  tabIndex={0}
                  aria-label={`Tìm kiếm: ${keyword.SearchKeywords}`}
                  onClick={() => handleSubmit(keyword.SearchKeywords)}
                >
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                  <span
                    className="text-sm text-gray-800 dark:text-gray-300 truncate"
                  >
                    {keyword.SearchKeywords}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Chưa có lịch sử tìm kiếm.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;