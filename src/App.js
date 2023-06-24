import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import './styles/form-auth.scss';
import './styles/btn.css';
import './styles/carousel.css';
import './styles/header.css';
import './styles/card.css';
import { Routes, Route, Router } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductsManager } from './components/admin/productsManager';
import { TypesManager } from './components/admin/typesManager';
import AuthManager from './components/admin/authManager';

import LayoutUser from './components/user/LayoutUser'
import HomePage from './components/user/home';
import ProductsPage from './components/user/products';
import ProductDetail from './components/user/productDetail';
import InfoUser from './components/user/infoUser';



function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutUser />} >
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='products/:productId' element={<ProductDetail />} />
        <Route path='editInfoUser' element={<InfoUser />} />
      </Route>

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index path='productsmanager' element={<ProductsManager />} />
        <Route path='typesmanager' element={<TypesManager />} />
        <Route path='authManager' element={<AuthManager />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
