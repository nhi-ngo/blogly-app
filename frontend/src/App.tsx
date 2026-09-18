import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import CategoriesPage from './pages/CategoriesPage';
import TagsPage from './pages/TagsPage';
import HomePage from './pages/HomePage';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <BrowserRouter>
      <NavBar
        isAuthenticated={isAuthenticated}
        userProfile={
          user
            ? {
                name: user.name,
                avatar: undefined,
              }
            : undefined
        }
        onLogout={logout}
      />

      <main className="container mx-auto py-6">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/categories" element={<CategoriesPage isAuthenticated={isAuthenticated} />} />
          <Route path="/tags" element={<TagsPage isAuthenticated={isAuthenticated} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
