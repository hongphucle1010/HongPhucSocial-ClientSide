import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { convertTime } from "../../../utils/functions";

export const LeftMessageElement = ({
  name,
  date,
  text,
  avatarUrl,
  username,
}: LeftMessageElementProps) => {
  return (
    <div className="flex gap-2.5 w-5/6 sm:w-4/6">
      <Link to={`/profile/${username}`}>
        <Avatar rounded className="self-start" img={avatarUrl} />
      </Link>
      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {text}
        </p>
        <div className="flex justify-end w-full">
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
            {convertTime(date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const RightMessageElement = ({
  date,
  text,
  avatarUrl,
}: RightMessageElementProps) => {
  return (
    <div className="flex gap-2.5 w-5/6 sm:w-4/6 self-end">
      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-blue-500 rounded-s-xl rounded-ee-xl dark:bg-blue-600">
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-white">You</span>
          <span className="text-xs font-normal text-gray-200">
            {convertTime(date)}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-white">{text}</p>
      </div>
      <Avatar rounded className="self-start" img={avatarUrl} />
    </div>
  );
};

interface LeftMessageElementProps {
  name: string;
  date: string;
  text: string;
  avatarUrl: string;
  username: string;
}

interface RightMessageElementProps {
  date: string;
  text: string;
  avatarUrl: string;
}
