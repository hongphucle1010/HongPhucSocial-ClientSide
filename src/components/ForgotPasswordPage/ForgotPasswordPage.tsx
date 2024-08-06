import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = function () {
  return (
    <div className="flex flex-col items-center w-full p-0 py-5 dark:text-slate-100">
      <div id="logo-container" className="flex justify-center my-5">
        <img src="/logo.png" className="aspect-square w-1/5 rounded-xl" />
      </div>
      <div id="login-box" className="rounded-xl bg-white w-5/6 p-3">
        <p id="warning"></p>
        <form action="post" className="w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="rounded-xl border border-slate-400 p-2 my-1 w-full bg-gray-200"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="rounded-xl border border-slate-400 p-2 my-1 w-full bg-gray-200"
          />
          <div className="w-full flex justify-center">
            <input
              type="submit"
              value="Log In"
              className="rounded-lg my-2 mx-auto bg-blue-500 py-2 px-5 transition-colors 
                hover:bg-blue-600 hover:cursor-pointer 
                active:bg-green-500"
            />
          </div>
        </form>
        <div className="w-full flex justify-center">
          <Link
            to="/register"
            className="text-blue-500 text-sm 
            hover:underline hover:text-blue-700 active:text-green-500"
          >
            Create an account
          </Link>
        </div>
      </div>
      <Link
        to="/forgot-password"
        className="mt-5 text-sm hover:text-blue-700 active:text-green-500"
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
