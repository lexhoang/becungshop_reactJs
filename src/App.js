import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/carousel.css';
import './styles/header.css';

import { Routes, Route } from 'react-router-dom';
import LayoutUser from './components/user/LayoutUser'

import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductsManager } from './components/admin/productsManager';
import { TypesManager } from './components/admin/typesManager';
import { ProductForManager } from './components/admin/productForManager';
import HomePage from './components/user/home';
import ProductsPage from './components/user/products';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutUser />} >
        <Route index element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
      </Route>

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<ProductForManager />} />
        <Route path='typesmanager' element={<TypesManager />} />
        <Route path='productsmanager' element={<ProductsManager />} />
      </Route>
    </Routes>
  );
}

export default App;
