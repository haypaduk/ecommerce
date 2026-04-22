import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const save = product.originalPrice - product.price;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-content">
          <div className="modal-image">
            <div className="modal-icon">{product.image}</div>
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-category">{product.category}</div>
            <div className="modal-prices">
              <span className="modal-current">${product.price.toLocaleString()}</span>
              <span className="modal-original">${product.originalPrice.toLocaleString()}</span>
            </div>
            <div className="modal-discount">-{product.discount}% OFF</div>
            <div className="modal-save">✨ Ahorras ${save.toLocaleString()}</div>
            <p className="modal-description">{product.description}</p>
            {product.specs && (
              <div className="modal-specs">
                <h4>Especificaciones:</h4>
                <ul>
                  {product.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
            <button 
              className="modal-add-btn"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              Añadir al Carrito 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
