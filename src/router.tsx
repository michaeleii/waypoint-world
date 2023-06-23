import { Navigate, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";
import { CitiesProvider } from "./contexts/CitiesContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { lazy } from "react";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    index: true,
    element: <Homepage />,
  },
  {
    path: "product",
    element: <Product />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <CitiesProvider>
          <AppLayout />
        </CitiesProvider>
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="cities" replace />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:id",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
