import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body.modal-open {
    overflow: hidden;
  }

  .modal-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%; /* Ajuste conforme necessário */
    height: 60%; /* Ajuste conforme necessário */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    z-index: 1000; /* Ajuste conforme necessário */
  }
`;

export default GlobalStyle;