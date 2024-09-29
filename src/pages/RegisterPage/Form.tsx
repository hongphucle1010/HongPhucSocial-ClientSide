import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { FaUser } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { PiPassword } from "react-icons/pi";
import { signUpPath } from "../../config/apiPath";
import { SIGN_UP_SUCCESS } from "../../config/responseCode";
import { signUp } from "../../utils/authentication/authentication";
import { useLoadingSpinner } from "../../hooks/loadingSpinner";
import { useState } from "react";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const normalText = <span>Sign up</span>;
  const { btnText, toggleLoading } = useLoadingSpinner(
    normalText,
    <Spinner color="info" />
  );

  const handleSignUp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    toggleLoading();
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
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
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
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setUsername(event.currentTarget.value)
            }
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
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center my-2">
          <Button
            gradientDuoTone="greenToBlue"
            type="submit"
            onClick={(e) => handleSignUp(e)}
          >
            {btnText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
