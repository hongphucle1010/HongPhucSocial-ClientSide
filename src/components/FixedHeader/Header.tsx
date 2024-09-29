import styles from "./Header.module.scss";
import { DarkThemeToggle } from "flowbite-react";
import { Dropdown, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { concatFirstAndLastName } from "../../utils/functions";
import { HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
import { FaArrowLeft, FaPeopleGroup } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { RootState } from "../../lib/redux/store";

const FixedHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.userRole.value.user);

  return (
    <div className="fixed w-full top-0 z-10">
      <nav className="w-full flex h-14 p-2 items-center justify-around border-blue-500 border-b bg-white dark:bg-slate-900	dark:border-cyan-200 dark:text-slate-200">
        <Link
          to="/message"
          className={`${styles.header_name} aspect-square p-2 rounded-full active:scale-95 hover:bg-slate-200 dark:hover:bg-slate-700 transition-transform myPointer`}
        >
          <FaArrowLeft />
        </Link>
        <DarkThemeToggle />
        <Dropdown
          label={
            <Avatar
              img={user?.profile?.avatarUrl ? user.profile.avatarUrl : ""}
              rounded
            />
          }
          arrowIcon={false}
          className={`shadow-md shadow-slate-200 z-10`}
          inline
        >
          <Dropdown.Header className="flex items-center gap-2">
            <HiUserCircle />
            <span className="block text-sm">
              <Link to="/profile">
                {user?.profile?.firstName && user.profile?.lastName
                  ? concatFirstAndLastName(
                      user.profile.firstName ?? "",
                      user.profile.lastName ?? ""
                    ) || user.username
                  : user?.username}
              </Link>
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiOutlineAdjustments}>
            <Link to="/settings">Settings</Link>
          </Dropdown.Item>
          <Dropdown.Item icon={FaPeopleGroup}>
            <Link to="/find-friends">Find friends</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={MdLogout}>
            <Link to="/logout">Log out</Link>
          </Dropdown.Item>
        </Dropdown>
      </nav>
    </div>
  );
};

export default FixedHeader;
