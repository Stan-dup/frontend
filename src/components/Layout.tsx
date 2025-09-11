import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import { Button } from "./Button";
import { RouterPath } from "../utils/path";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Root>
        <Inner>
          <button onClick={() => navigate(RouterPath.home.path)}>
            <Logo>스탠드업</Logo>
          </button>
          <Nav>
            <Button
              variant={
                location.pathname === RouterPath.home.path ? "primary" : "ghost"
              }
              onClick={() => navigate(RouterPath.home.path)}
            >
              포스터 만들기
            </Button>
            <Button
              variant={
                location.pathname === RouterPath.gallery.path
                  ? "primary"
                  : "ghost"
              }
              onClick={() => navigate(RouterPath.gallery.path)}
            >
              갤러리
            </Button>
            <Button
              variant={
                location.pathname === RouterPath.video.path
                  ? "primary"
                  : "ghost"
              }
              onClick={() => navigate(RouterPath.video.path)}
            >
              동영상
            </Button>
          </Nav>
        </Inner>
      </Root>
      <Outlet />
    </>
  );
};

const Root = styled.header({
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  borderBottom: "1px solid var(--color-gray2)",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(6px)",
});
const Inner = styled.div({
  maxWidth: 1100,
  margin: "0 auto",
  display: "flex",
  height: 64,
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
});
const Logo = styled.h1({
  fontSize: "20px",
  fontWeight: 800,
  background: "linear-gradient(90deg,var(--color-main),var(--color-side))",
  WebkitBackgroundClip: "text",
  color: "transparent",
});
const Nav = styled.nav({ display: "flex", alignItems: "center", gap: 8 });

export default Layout;
