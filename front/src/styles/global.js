import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body.modal-open {
    overflow: hidden;
  }

  .modal-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    height: 60%; /* Ajuste conforme necessário */
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    z-index: 1000; /* Ajuste conforme necessário */
  }
`;

export default GlobalStyle;