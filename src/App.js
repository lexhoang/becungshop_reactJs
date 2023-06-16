import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/form.scss';
import './styles/carousel.css';
import './styles/header.css';
import './styles/card.css';

import { Routes, Route, Router } from 'react-router-dom';
import LayoutUser from './components/user/LayoutUser'

import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductsManager } from './components/admin/productsManager';
import { TypesManager } from './components/admin/typesManager';
import AuthManager from './components/admin/authManager';

import HomePage from './components/user/home';
import ProductsPage from './components/user/products';
import ProductDetail from './components/user/productDetail';
import Login from './components/auth/Login';
import Resgister from './components/auth/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutUser />} >
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='products/:productId' element={<ProductDetail />} />
      </Route>

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index path='productsmanager' element={<ProductsManager />} />
        <Route path='typesmanager' element={<TypesManager />} />
        <Route path='authManager' element={<AuthManager />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Resgister />} />
    </Routes>
  );
}

export default App;
