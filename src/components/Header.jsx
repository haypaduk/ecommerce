import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = ({ cartCount, onCartClick, onMenuClick, searchTerm, setSearchTerm, user, onAuthClick, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="menu-btn" onClick={onMenuClick}>
            <span className="menu-icon">☰</span>
          </button>
          <div className="logo">
            <span className="logo-neon">Bienvenido a</span>
            <span className="logo-highlight"> GlobalMart!</span>
          </div>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-glow"></div>
        </div>
        
        <div className="header-right">
          <div className="user-menu-container" ref={menuRef}>
            <button className="auth-btn" onClick={() => user ? setShowUserMenu(!showUserMenu) : onAuthClick()}>
              <span className="auth-icon">👤</span>
              <span className="auth-text">
                {user ? user.name : 'Acceder'}
              </span>
            </button>
            {showUserMenu && user && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar">👤</div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}>
                  <span>🚪</span> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
          <button className="cart-btn" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
