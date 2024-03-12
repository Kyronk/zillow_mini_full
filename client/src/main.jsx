import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';

import { BrowserRouter } from "react-router-dom";

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import reduxStore from './redux.js';

const { store, persistor } = reduxStore();


ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    
    ,

)
