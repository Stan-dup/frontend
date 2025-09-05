import GlobalStyles from "./global_styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/home";
import NotFound from "./pages/not_found";
import { RouterPath } from "./utils/path";
import PosterMaker from "./pages/poster-maker";

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
        path: RouterPath.posterMaker.path,
        element: <PosterMaker />,
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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
