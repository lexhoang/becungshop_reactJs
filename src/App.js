import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import { Routes, Route } from 'react-router-dom';
import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductManager } from './components/admin/productManager';
import { TypeManager } from './components/admin/typesManager';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<TypeManager />} />
        <Route path='productmanager' element={<ProductManager />} />
      </Route>
    </Routes>
  );
}

export default App;
