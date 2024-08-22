import { Label, TextInput, Button, Spinner } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { PiPassword } from "react-icons/pi";
import { logIn } from "../../utils/authentication/authentication";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LOG_IN_SUCCESS } from "../../config/responseCode";
import { useLoadingSpinner } from "../../hooks/loadingSpinner";
import { Link } from "react-router-dom";

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

export default LoginForm;
