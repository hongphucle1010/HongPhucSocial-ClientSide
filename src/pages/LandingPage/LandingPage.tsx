import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import { logInPath } from "../../config/api/api";
import { Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { PiPassword } from "react-icons/pi";

const LoginForm: React.FC = () => {
  return (
    <div
      id="login-box"
      className="rounded-xl bg-white w-5/6 px-5 py-4 shadow-2xl"
    >
      <p id="warning"></p>
      <form action={logInPath} className="w-full" method="POST">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            icon={HiMail}
            required
            shadow
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            icon={PiPassword}
            required
            shadow
          />
        </div>
        <div className="flex justify-center my-2">
          <Button type="submit">Log in</Button>
        </div>
      </form>
      <div className="w-full flex justify-center border-t pt-2 mt-2">
        <Link
          to="/register"
          className="text-blue-500 text-sm 
            hover:underline hover:text-blue-700 active:text-green-500"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

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
