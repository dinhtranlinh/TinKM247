import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const API_TOKEN = 'Token AIU4S9lfn9vz_SsvrpC3EXPKA5FHgd0I'; // Replace with your actual API token

  useEffect(() => {
    fetch('https://api.accesstrade.vn/v1/offers_informations/coupon', {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    // Apply filtering based on category and search keyword
    let filtered = products;
    if (selectedCategory !== '') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (searchKeyword !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchKeyword, products]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
        />
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
          {/* Add more category options here */}
        </select>
      </div>
      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
