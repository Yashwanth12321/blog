import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter,Route,Routes } from 'react-router'
import Home from './components/pages/Home.tsx'
import Createblog from './components/pages/Createblog.tsx'
import Login from './components/Auth/Login.tsx'
import Sign from './components/Auth/Sign.tsx'
import MyBlogs from './components/pages/MyBlogs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<App />} />
      <Route path="/createblog" element={<Createblog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Sign />} />
      <Route path="/myblogs" element={<MyBlogs />} />


    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
