import LandingPage from "../pages/LandingPage/LandingPage";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import MainLayout from "../layout/MainLayout/MainLayout";
import GuestLayout from "../layout/GuestLayout/GuestLayout";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import Content from "../pages/Content/Content";
// import ForgotPasswordPage from "../components/ForgotPasswordPage/ForgotPasswordPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authorization } from "../redux/reducers/userState";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import LogOut from "../components/LogOut/LogOut";
import UserSettings from "../pages/UserSettings/UserSettings";
import Profile from "../pages/Profile/Profile";

const Router: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.userRole.value).role;

  const userRoutes = [
    {
      path: "/",
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      ),
      errorElement: (
        <MainLayout>
          <ErrorPage />
        </MainLayout>
      ),
    },
    {
      path: "/logout",
      element: (
        <MainLayout>
          <LogOut />
        </MainLayout>
      ),
    },
    {
      path: "/profile",
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      ),
    },
    {
      path: "/profile/:username",
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      ),
    },
    {
      path: "/settings",
      element: (
        <MainLayout>
          <UserSettings />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <ErrorPage />
        </MainLayout>
      ),
    },
  ];

  const guestRoutes = [
    {
      path: "/",
      element: (
        <GuestLayout>
          <LandingPage />
        </GuestLayout>
      ),
      errorElement: (
        <GuestLayout>
          <ErrorPage />
        </GuestLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <GuestLayout>
          <RegisterPage />
        </GuestLayout>
      ),
    },
    // {
    //   path: "/forgot-password",
    //   element: (
    //     <GuestLayout>
    //       <ForgotPasswordPage />
    //     </GuestLayout>
    //   ),
    // },
    {
      path: "*",
      element: (
        <GuestLayout>
          <ErrorPage />
        </GuestLayout>
      ),
    },
  ];
  const adminRoutes = [{}];

  const routes =
    userRole === Authorization.ADMIN
      ? adminRoutes
      : userRole === Authorization.USER
      ? userRoutes
      : guestRoutes;

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
