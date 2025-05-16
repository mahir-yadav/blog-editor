import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/editorpage';
import BlogListPage from './pages/bloglistpage';
import Navbar from './components/navbar';
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/edit/:id" element={<EditorPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
