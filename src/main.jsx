import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './router/index.jsx'
import { ThemeContextProvider } from './contexts/ThemeContext';
import AuthContextProvider from './contexts/AuthContext.jsx';
import Router from './router'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <ThemeContextProvider>
    <Router/>
  </ThemeContextProvider>
  </AuthContextProvider>

)
