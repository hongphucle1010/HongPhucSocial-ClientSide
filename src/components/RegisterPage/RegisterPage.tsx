import { Link } from "react-router-dom";
import { signUpPath } from "../../config/api/api";
import { Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { PiPassword } from "react-icons/pi";

const SignUpForm: React.FC = () => {
  return (
    <div
      id="login-box"
      className="rounded-xl bg-white w-5/6 px-5 py-4 shadow-2xl"
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
            placeholder="name@flowbite.com"
            icon={HiMail}
            required
            shadow
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
            name="password"
            icon={PiPassword}
            required
            shadow
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
          />
        </div>
        <div className="flex justify-center my-2">
          <Button type="submit">Create account</Button>
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
