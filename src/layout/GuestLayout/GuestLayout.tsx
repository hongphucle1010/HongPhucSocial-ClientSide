import React from "react";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "../../types/layout";
import styles from "./GuestLayout.module.scss";

const GuestLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen ${styles.myBackground}`}>
      {children}
      <Outlet />
    </div>
  );
};

export default GuestLayout;
