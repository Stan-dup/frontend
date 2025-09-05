import GlobalStyles from "./global_styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/home";
import SomePage from "./pages/some_page";
import NotFound from "./pages/not_found";
import { RouterPath } from "./utils/path";

const router = createBrowserRouter([
  {
    path: RouterPath.root.path,
    element: <Layout />,
    children: [
      {
        path: RouterPath.home.path,
        element: <Home />,
      },
      {
        path: RouterPath.somePage.path,
        element: <SomePage />,
      },
      {
        path: RouterPath.notFound.path,
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <link
        href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css"
        rel="stylesheet"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
