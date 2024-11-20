import google from '~/assets/google.png'
import login from '~/assets/login.png'
import arya from '~/assets/Arya-Logo-Lg.png'
import InputForm from '~/components/InputForm'
import SubmitButton from '~/components/SubmitButton'
import { Form, Link } from 'react-router-dom'

function Login() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Arya logo"
            src={arya}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Đăng nhập
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form method="POST" className="space-y-6">
            <InputForm id={"email"} name={"email"} type={"email"} placeholder={"Email"} />

            <InputForm id={"password"} name={"password"} type={"password"} placeholder={"Password"} />

            <div className="text-sm text-right">
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">
                Quên mật khẩu?
              </a>
            </div>

            <SubmitButton>Đăng nhập</SubmitButton>
          </Form>

          <div className="m-6">
            <div className="flex items-center">
              <hr className="flex-1 border-t border-gray-300" />
              <p className="text-gray-500 text-center px-4">Hoặc</p>
              <hr className="flex-1 border-t border-gray-300" />
            </div>
            <a href="#" className="flex justify-center items-center gap-4 mt-5 border-2 rounded-xl hover:bg-gray-200">
              <img src={google} alt="google" className="w-8 my-2" />
              <p className="font-semibold text-gray-700 hover:text-gray-600">Đăng nhập với Google</p>
            </a>
          </div>

          <p className="mt-8 text-center text-sm/6 text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-primary-500 hover:text-primary-400">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full sm:w-2/3 max-w-screen-md bg-primary-100">
        <img src={login} alt="Login image" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default Login;
