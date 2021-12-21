import { createGlobalStyle } from "styled-components";

// TODO: STYLE: stop using global style

const GlobalStyle = createGlobalStyle`
  body {
      background: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.foreground};
    }
  `;

export { GlobalStyle };
