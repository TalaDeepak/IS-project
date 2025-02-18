import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Verify2FA from "./pages/verify2FA";
import Setup2FA from "./pages/Setup2FA";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FA />,
        errorElement: <Error />,
      },
    ],
  },
]);
