import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import CategoriesPage from './pages/CategoriesPage';
import TagsPage from './pages/TagsPage';

function AppContent() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/"></Route>
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/tags" element={<TagsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return <AppContent />;
}

export default App;
