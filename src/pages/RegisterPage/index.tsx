/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import SignUpForm from "./Form";

const RegisterPage: React.FC = function () {
  return (
    <div className="flex flex-col items-center w-full p-0 pb-5 dark:text-slate-100">
      <div id="logo-container" className="flex justify-center my-5">
        <Link
          to="/"
          className="mt-5 text-sm flex justify-center hover:text-blue-700 active:text-green-500"
        >
          <img src="/logo.png" className="aspect-square w-1/5 rounded-xl" />
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;
