import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to home page after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
};

export default ErrorPage;
