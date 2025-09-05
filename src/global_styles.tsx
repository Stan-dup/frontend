import { css, Global } from "@emotion/react";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          --color-main: #2173a2;
          --color-side: #57b6d4;
          --color-background: #f0f0ec;
          --color-gray: #aaa;
          --color-gray2: #ddd;
          --color-black: #2c2c2c;
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
