import React from "react";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "../../lib/types/layout";
import styles from "./GuestLayout.module.scss";

const GuestLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`min-h-screen dark:bg-slate-800 dark:text-slate-100 ${styles.myBackground}`}
    >
      {children}
      <Outlet />
    </div>
  );
};

export default GuestLayout;
