import { createGlobalStyle } from "styled-components";
import "../../assets/css/fonts.css";

export const GlobalStyle = createGlobalStyle`
    *,*::before,*::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        font-family: Plus Jakarta Sans, sans-serif;
        font-optical-sizing: auto;
        font-variation-settings: 'wght' 500;
        font-style: normal;
        color: #FFFFFF;
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
    
    #root {
        height: 100%;
    }

    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
`;
