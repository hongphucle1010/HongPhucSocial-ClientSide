import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../MainLayout/MainLayout.module.scss";
import { LayoutProps } from "../../lib/types/layout.tsx";
import FixedHeader from "../../components/FixedHeader/Header.tsx";

const MessageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`py-0 dark:bg-slate-800 dark:text-slate-100 ${styles["transition-bg-text"]} min-h-screen`}
    >
      <FixedHeader />
      {children}
      <Outlet />
    </div>
  );
};

export default MessageLayout;
