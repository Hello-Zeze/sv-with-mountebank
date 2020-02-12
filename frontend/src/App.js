import React from 'react';
import './App.css';
import MainBar from './layout/mainbar';
import ProductsListing from './products/ProductsListing';

function App() {  
  return (
    <div className="App">      
      <MainBar/>
      <ProductsListing />
    </div>
  );
}

export default App;
