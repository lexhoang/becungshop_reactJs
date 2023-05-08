import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import { Routes, Route } from 'react-router-dom';
import LayoutAdmin from './components/admin/LayoutAdmin';
import { ProductForManager } from './components/admin/productForManager';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<ProductForManager />} />
      </Route>
    </Routes>
  );
}

export default App;
