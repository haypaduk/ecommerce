import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const save = product.originalPrice - product.price;
  
  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="card-glow"></div>
      <div className="product-image-container">
        <div className="product-image">{product.image}</div>
        <div className="discount-badge">-{product.discount}%</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-category">
          <span className="category-dot"></span>
          {product.category}
        </div>
        <div className="product-prices">
          <span className="current-price">${product.price.toLocaleString()}</span>
          <span className="original-price">${product.originalPrice.toLocaleString()}</span>
        </div>
        <div className="save-amount">✨ Ahorras ${save.toLocaleString()}</div>
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <span className="btn-content">Añadir al Carrito</span>
          <span className="btn-icon">+</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;