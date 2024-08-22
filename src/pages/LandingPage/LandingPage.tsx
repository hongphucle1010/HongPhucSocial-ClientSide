/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import LoginForm from "./Form";

const LandingPage: React.FC = function () {
  return (
    <div
      className={`flex flex-col items-center w-full p-0 py-5 
      lg:flex-row lg:h-screen lg:justify-around
      `}
    >
      <div
        id="logo-container"
        className="flex flex-col justify-center items-center my-5"
      >
        <img src="/logo.png" className="aspect-square w-1/5 rounded-xl" />
        <p className={`hidden mt-4 text-xl lg:block ${styles.myFont}`}>
          <span className="font-bold text-cyan-600">Hong Phuc Social</span> -
          Your world 🌏, your way!
        </p>
      </div>
      <div
        id="login-area"
        className="w-full flex flex-col items-center
          lg:w-5/12
        "
      >
        <LoginForm />
        <Link
          to="/forgot-password"
          className="mt-5 text-sm hover:text-blue-700 active:text-green-500"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
