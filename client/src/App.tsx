import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './component/Nav/Nav';
import ArticlesPlan from './page/ArticelsPlan';
import Articles from './page/Articles';
import LandingPage from './page/LandingPage';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/articles' element={<ProtectedRoutes />}>
          <Route path='/articles' element={<Articles />} />
        </Route>
        <Route path='/articles-plan' element={<ProtectedRoutes />}>
          <Route path='/articles-plan' element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
