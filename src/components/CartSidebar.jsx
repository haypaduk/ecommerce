import React from 'react';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, cart, onClose, onRemove, onUpdateQuantity, total, onCheckout }) => {
  return (
    <>
      <div className={`cart-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>🛒 Tu Carrito</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛍️</div>
              <p>Tu carrito está vacío</p>
              <button className="continue-shopping" onClick={onClose}>Continuar comprando</button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">{item.image}</div>
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">${item.price.toLocaleString()}</div>
                    <div className="cart-item-quantity">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemove(item.id)}>🗑️</button>
                </div>
              ))}
            </>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal:</span>
              <span className="total-amount">${total.toLocaleString()}</span>
            </div>
            <div className="cart-total">
              <span>IVA (16%):</span>
              <span className="total-amount">${(total * 0.16).toLocaleString()}</span>
            </div>
            <div className="cart-total grand-total">
              <span>Total:</span>
              <span className="total-amount">${(total * 1.16).toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceder al Pago →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
