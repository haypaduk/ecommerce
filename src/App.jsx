import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import SideMenu from './components/SideMenu';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import TicketModal from './components/TicketModal';
import { products } from './data/products';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [lastTicket, setLastTicket] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Cargar usuario al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Cargar carrito guardado del usuario
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      setCart([]);
    }
  }, [user]);

  // Guardar carrito cuando cambie
  useEffect(() => {
    if (user && cart.length > 0) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    } else if (user && cart.length === 0) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  }, [cart, user]);

  // Filtrar productos por búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  // Funciones del carrito
  const addToCart = (product) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Funciones de autenticación
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setCart([]);
  };

  // Funciones de checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (ticket) => {
    setLastTicket(ticket);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsTicketOpen(true);
  };

  // Abrir modal de producto
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Toggle funciones
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isAuthOpen) setIsAuthOpen(false);
    if (isCheckoutOpen) setIsCheckoutOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
    if (isAuthOpen) setIsAuthOpen(false);
    if (isCheckoutOpen) setIsCheckoutOpen(false);
  };

  const toggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
    if (isCartOpen) setIsCartOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isCheckoutOpen) setIsCheckoutOpen(false);
  };

  return (
    <div className="app">
      <Header
        cartCount={getCartCount()}
        onCartClick={toggleCart}
        onMenuClick={toggleMenu}
        onAuthClick={toggleAuth}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
      />
      
      <main className="main-content">
        <Banner />
        
        <div className="container">
          <CategoryGrid />
          
          <div className="products-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="gradient-text">✨ Productos Destacados</span>
              </h2>
              <div className="section-line"></div>
            </div>
            
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={openProductModal}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        onClose={toggleCart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={getCartTotal()}
        onCheckout={handleCheckout}
      />
      <ProductModal
        product={selectedProduct}
        onClose={closeProductModal}
        onAddToCart={addToCart}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={toggleAuth}
        onLogin={handleLogin}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={getCartTotal()}
        cart={cart}
        onSuccess={handlePaymentSuccess}
      />
      <TicketModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        ticket={lastTicket}
      />
    </div>
  );
}

export default App;
