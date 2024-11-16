import React from 'react';
import ProductoList from './components/ProductoList';
import AgregarProducto from './components/AgregarProducto';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Productos</h1>
        <AgregarProducto />
        <ProductoList />
      </header>
    </div>
  );
}

export default App;
