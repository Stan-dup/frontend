import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <h1>헤더</h1>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
