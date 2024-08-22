/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { PiPassword } from "react-icons/pi";
import { logIn } from "../../utils/authentication/authentication";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LOG_IN_SUCCESS } from "../../config/api/responseCode";
import { useLoadingSpinner } from "../../hooks/loadingSpinner";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [loginBtnText, setLoginBtnText] = useState<any>(<span>Log in</span>);
  const [loginBtnText, toggleLoading] = useLoadingSpinner(
    <span>Log in</span>,
    <Spinner color="info" />
  );

  const handleLogin = async (event: any) => {
    event.preventDefault();
    toggleLoading();
    const warning = document.getElementById("warning") as HTMLParagraphElement;
    try {
      const response = await logIn(email, password, dispatch);
      if (response.status === LOG_IN_SUCCESS) {
        window.location.href = "/";
      } else {
        warning.innerText = "Invalid email or password";
      }
    } catch (error: Error | any) {
      warning.innerText = error.data.message;
    } finally {
      toggleLoading();
    }
  };

  return (
    <div
      id="login-box"
      className="rounded-xl w-5/6 px-5 py-4 shadow-2xl shadow-slate-400"
    >
      <p id="warning"></p>
      <form className="w-full" method="POST">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            placeholder="hongphuc@hongphuc.vn"
            icon={HiMail}
            required
            shadow
            onChange={(event: any) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <div className="my-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            icon={PiPassword}
            required
            shadow
            onChange={(event: any) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center my-2">
          <Button
            gradientDuoTone="greenToBlue"
            type="submit"
            onClick={(event: any) => handleLogin(event)}
          >
            {loginBtnText}
          </Button>
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
