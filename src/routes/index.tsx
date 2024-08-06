import LandingPage from "../pages/LandingPage/LandingPage";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import MainLayout from "../layout/MainLayout/MainLayout";
import GuestLayout from "../layout/GuestLayout/GuestLayout";
import RegisterPage from "../components/RegisterPage/RegisterPage";
// import ForgotPasswordPage from "../components/ForgotPasswordPage/ForgotPasswordPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authorization } from "../redux/reducers/isAuthenticated";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Router: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.userRole.value);

  const userRoutes = [
    {
      path: "/",
      element: (
        <MainLayout>
          <LandingPage />
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
