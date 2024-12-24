import { createGlobalStyle } from "styled-components";
import "../../assets/css/fonts.css";

export const GlobalStyle = createGlobalStyle`
    #root {
        height: 100%;
    }

    *,*::before,*::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        font-family: Plus Jakarta Sans, sans-serif;
        font-optical-sizing: auto;
        font-variation-settings: 'wght' 500;
        font-style: normal;
    }
    
    html, body {
        scroll-behaviour: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: #16161E;
        height: 100%;
    }
    
    a, a:hover, a:active {
        text-decoration: none;
    }

    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-20px);
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-20px);
        }
        to {
            transform: translateY(0);
        }
    }
`;
