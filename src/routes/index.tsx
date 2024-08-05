import LandingPage from "../pages/LandingPage/LandingPage";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import MainLayout from "../layout/MainLayout/MainLayout";

const routes = [
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

export default routes;
