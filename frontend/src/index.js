import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider , ColorModeScript } from '@chakra-ui/react';
import {theme} from 'assets/themes'
import App from './App';

/*if (process.env.NODE_ENV === "production") {
  console.log = () =>{}
  console.error = () =>{}
  console.debug = () =>{}

}
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <ChakraProvider resetCSS theme={theme} >
        <ColorModeScript initialColorMode="dark"></ColorModeScript>
        <App />
      </ChakraProvider>
    
);







