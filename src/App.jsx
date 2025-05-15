import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/editorpage';
import BlogListPage from './pages/bloglistpage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
