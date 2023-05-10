import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import { Routes, Route } from 'react-router-dom';
import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductForManager } from './components/admin/productForManager';
import { TypeManager } from './components/admin/typesManager';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<ProductForManager />} />
        <Route path='typemanager' element={<TypeManager />} />
      </Route>
    </Routes>
  );
}

export default App;
