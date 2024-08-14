import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer.tsx";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import { LayoutProps } from "../../lib/types/layout.tsx";

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`pb-24 dark:bg-slate-800 dark:text-slate-100 ${styles["transition-bg-text"]} min-h-screen`}
    >
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
