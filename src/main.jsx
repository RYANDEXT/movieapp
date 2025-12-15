import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import router from './routes/index.jsx';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

//  axios setup
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const VITE_MOVIE_ACCESS_TOKEN = import.meta.env.VITE_MOVIE_ACCESS_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_MOVIE_ACCESS_TOKEN}`;

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
    // </StrictMode>
);
