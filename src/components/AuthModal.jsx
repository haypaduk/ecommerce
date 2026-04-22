import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Validar email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Registrar usuario
  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Email no válido');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === formData.email)) {
      setError('El email ya está registrado');
      return;
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login después de registrar
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    setSuccess('¡Registro exitoso! Redirigiendo...');
    setTimeout(() => {
      onLogin(userData);
      onClose();
    }, 1500);
  };

  // Iniciar sesión
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Email y contraseña son obligatorios');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (!user) {
      setError('Email o contraseña incorrectos');
      return;
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setSuccess('¡Bienvenido de vuelta!');
    setTimeout(() => {
      onLogin(userData);
      onClose();
    }, 1500);
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogin(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>✕</button>
        
        <div className="auth-modal-header">
          <div className="auth-logo">🔐</div>
          <h2>{isLogin ? 'Bienvenido de vuelta' : 'Crear cuenta'}</h2>
          <p>{isLogin ? 'Inicia sesión para continuar' : 'Regístrate para empezar a comprar'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
              />
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button 
              className="auth-switch-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>

        <div className="auth-demo">
          <p>✨ Cuentas de demostración:</p>
          <div className="demo-accounts">
            <div className="demo-account" onClick={() => {
              setFormData({
                ...formData,
                email: 'usuario@demo.com',
                password: '123456'
              });
            }}>
              👤 usuario@demo.com / 123456
            </div>
            <div className="demo-account" onClick={() => {
              setFormData({
                ...formData,
                email: 'admin@demo.com',
                password: '123456'
              });
            }}>
              👑 admin@demo.com / 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
