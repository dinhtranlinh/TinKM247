import React, { useState, useEffect } from 'react';
import './App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [countdown, setCountdown] = useState(3600); // 3600 giây = 1 tiếng

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://103.29.2.117/api/products', {
        cache: 'no-store'
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Đếm ngược thời gian cập nhật
    const timerId = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
      <p className="promotion-time red-text">
          Chuẩn bị cập nhật khuyến mãi mới trong:{' '}
          {Math.floor(countdown / 3600)} giờ{' '}
          {Math.floor((countdown % 3600) / 60)} phút{' '}
          {countdown % 60} giây
        </p>
        <h2 className="product-list-title">Danh sách sản phẩm</h2>
      </div>
      {(!Array.isArray(products) || products.length === 0) && (
        <p>Không có dữ liệu sản phẩm.</p>
      )}
      {Array.isArray(products) && (
        <ul className="product-list">
          {products.map((product, index) => (
             <li key={index} className="product-item">
                <div className="product-image">
                  <img src={product.image} alt={product.campaign_name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Nhãn hàng: {product.merchant}</p>
                  <p>Mã khuyến mãi: {product.content}</p>
                  <a href={product.aff_link} target="_blank" rel="noopener noreferrer">
                    Link mua
                  </a>
                  <p className="promotion-time">Thời hạn áp dụng khuyến mãi: <span className="red-text">{product.time_left}</span></p>
                </div>
              </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
