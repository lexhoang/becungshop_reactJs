import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Routes, Route } from 'react-router-dom';
import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductsManager } from './components/admin/productsManager';
import { TypesManager } from './components/admin/typesManager';
import { ProductForManager } from './components/admin/productForManager';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<ProductForManager />} />
        <Route path='typesmanager' element={<TypesManager />} />
        <Route path='productsmanager' element={<ProductsManager />} />
      </Route>
    </Routes>
  );
}

export default App;
