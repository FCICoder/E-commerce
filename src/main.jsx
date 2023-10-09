// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/solid.js'
// import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'
import UserContextProvider from './context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools}from 'react-query/devtools'
import CartContextProvider from './context/CartContext.jsx';
import {WishContextProvider} from './context/wishListContext.jsx';


let queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
    <CartContextProvider>    
        <QueryClientProvider client={queryClient}>
        <UserContextProvider>
        <WishContextProvider>
        <App/>
        </WishContextProvider>        

        </UserContextProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> */}
    </QueryClientProvider>
    </CartContextProvider>

)
