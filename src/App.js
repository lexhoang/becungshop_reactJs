// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import './styles/btn.css';
import './styles/card.css';
import { Routes, Route } from 'react-router-dom';

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
import Cart from './components/user/cart';
import OrderManager from './components/admin/orderManager';
import Admin from './components/admin/Admin';



function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutUser />} >
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='products/:productId' element={<ProductDetail />} />
        <Route path='editInfoUser' element={<InfoUser />} />
        <Route path='cart' element={<Cart />} />
      </Route>

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<Admin />} />
        <Route index path='productsmanager' element={<ProductsManager />} />
        <Route path='typesmanager' element={<TypesManager />} />
        <Route path='authManager' element={<AuthManager />} />
        <Route path='orderManager' element={<OrderManager />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
