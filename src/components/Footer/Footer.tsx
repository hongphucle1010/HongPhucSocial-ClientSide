// import styles from "./Footer.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

interface FooterItem {
  iconClass: string;
  path: string;
}

const footerItemArray: FooterItem[] = [
  { iconClass: "bi-house-door-fill", path: "/#" },
  { iconClass: "bi-chat-dots-fill", path: "/chat" },
  { iconClass: "bi-person-fill", path: "/profile" },
];

const Footer: React.FC = () => (
  <footer
    className="fixed bottom-0 w-full text-center border-t py-2 border-blue-500 text-sm 
  sm:text-base flex justify-around bg-white
  dark:bg-slate-800 dark:text-slate-200"
  >
    {footerItemArray.map((footerItem) => (
      <Link key={footerItem.iconClass} to={footerItem.path}>
        <i className={`bi ${footerItem.iconClass} text-2xl sm:text-3xl`} />
      </Link>
    ))}
  </footer>
);

export default Footer;
