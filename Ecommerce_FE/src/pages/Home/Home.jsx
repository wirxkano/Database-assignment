import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      Home page

      <div className="mt-6 px-6 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition">
        <Link to="/login">Đăng nhập</Link>
      </div>
    </div>
  );
}

export default Home;