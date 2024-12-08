import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  
  useEffect(() => {
    if (error.status === 401) {
      sessionStorage.setItem('failedMessage', true);
      navigate('/login');
    }
  }, [error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-20 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-primary-600">Oops!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Đã có lỗi xảy ra, vui lòng thử lại sau.
        </p>
        <p className="mt-2 text-gray-500">
          <i>Lỗi: {error?.response.data.message || error?.statusText}</i>
        </p>
        
      </div>
    </div>
  );
}
