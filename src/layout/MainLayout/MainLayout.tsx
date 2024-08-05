import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer.tsx";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from "./MainLayout.module.scss";
import type { RootState } from "../../redux/store";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <div
        className={`dark:bg-slate-800 dark:text-slate-100 ${styles["transition-bg-text"]} min-h-screen`}
      >
        <Header />
        {children}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
