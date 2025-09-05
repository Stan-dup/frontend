import { css, Global } from "@emotion/react";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff")
            format("woff");
          font-weight: 100;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraLight.woff")
            format("woff");
          font-weight: 200;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff")
            format("woff");
          font-weight: 300;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
            format("woff");
          font-weight: 500;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
            format("woff");
          font-weight: 700;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraBold.woff")
            format("woff");
          font-weight: 800;
          font-display: swap;
        }

        @font-face {
          font-family: "Pretendard";
          src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Black.woff")
            format("woff");
          font-weight: 900;
          font-display: swap;
        }
        :root {
          --color-main: #2173a2;
          --color-side: #57b6d4;
          --color-background: #f0f0ec;
          --color-gray: #aaa;
          --color-gray2: #ddd;
          --color-black: #2c2c2c;
          --color-red: #d24833ff;
          --font-size-exLarge: 36px;
          --font-size-large: 24px;
          --font-size-base: 15px;
          --font-size-small: 12px;
          @media (max-width: 768px) {
            --font-size-exLarge: 25px;
            --font-size-large: 21px;
            --font-size-base: 12px;
            --font-size-small: 9px;
          }
        }
        * {
          font-family: "inherit";
        }
        p,
        li {
          line-height: 120%;
        }
        button {
          border: none;
          background-color: transparent;
          padding: 0;
          cursor: pointer;
        }
        body {
          font-family: "Pretendard", -apple-system, BlinkMacSystemFont;
          color: var(--color-black);
          background: var(--color-background);
        }
        a {
          color: var(--color-black);
          text-decoration: none;
        }
      `}
    />
  );
}
