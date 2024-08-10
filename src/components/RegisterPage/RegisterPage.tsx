/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { signUpPath } from "../../config/api/api";
import { Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { useState } from "react";
import { signUp } from "../../utils/authentication/authentication";
import { SIGN_UP_SUCCESS } from "../../config/api/responseCode";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    const warning = document.getElementById("warning") as HTMLParagraphElement;
    if (password !== confirmPassword) {
      warning.innerText = "Passwords do not match";
      return;
    }
    try {
      const response = await signUp(email, username, password);
      if (response.status === SIGN_UP_SUCCESS) {
        window.location.href = "/";
      } else {
        warning.innerText = "Invalid email or password";
      }
    } catch (error: Error | any) {
      warning.innerText = error.data.message;
    }
  };

  return (
    <div
      id="login-box"
      className="rounded-xl w-5/6 px-5 py-4 shadow-2xl shadow-slate-400"
    >
      <p id="warning"></p>
      <form action={signUpPath} className="w-full" method="POST">
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
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            name="username"
            placeholder="hongphucle"
            icon={FaUser}
            required
            shadow
            onChange={(event: any) => setUsername(event.target.value)}
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
        <div>
          <div className="my-2 block">
            <Label htmlFor="confirm-password" value="Confirm password" />
          </div>
          <TextInput
            id="confirm-password"
            type="password"
            name="confirm-password"
            icon={PiPassword}
            required
            shadow
            onChange={(event: any) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center my-2">
          <Button
            gradientDuoTone="greenToBlue"
            type="submit"
            onClick={(e: any) => handleSignUp(e)}
          >
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
};

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
