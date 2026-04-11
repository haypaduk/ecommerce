import React from 'react';
import './SideMenu.css';

const SideMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    "Grocery", "Premium Fruits", "Home & Kitchen", "Fashion",
    "Electronics", "Beauty", "Home Improvement", "Sports, Toys & Luggage"
  ];

  return (
    <>
      <div className={`side-menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <div className="menu-logo">📱 Menu</div>
          <button className="menu-close" onClick={onClose}>✕</button>
        </div>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <span className="menu-item-icon">
                {index === 0 ? "🛒" : index === 1 ? "🍎" : index === 2 ? "🏠" : index === 3 ? "👕" : index === 4 ? "💻" : index === 5 ? "💄" : index === 6 ? "🔧" : "⚽"}
              </span>
              <span className="menu-item-text">{item}</span>
              <span className="menu-item-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
