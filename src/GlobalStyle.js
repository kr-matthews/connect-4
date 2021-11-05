import { createGlobalStyle } from "styled-components";

// PROBLEM: TODO: THEME: in dark mode on refresh, it transitions from light mode

const GlobalStyle = createGlobalStyle`
  body {
      background: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.foreground};
      transition: all 0.75s ease-in;
      transition-property: background, color
    }
  `;

export { GlobalStyle };
