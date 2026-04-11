import React, { useState } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose, total, cart, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [step, setStep] = useState('method'); // method, card, success
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const generateTicket = () => {
    const ticket = {
      id: 'ORD-' + Date.now(),
      date: new Date().toLocaleString(),
      customer: JSON.parse(localStorage.getItem('currentUser')),
      items: cart,
      subtotal: total,
      tax: total * 0.16,
      total: total * 1.16,
      paymentMethod: paymentMethod,
      transactionId: paymentMethod === 'card' ? 'TX-' + Math.random().toString(36).substr(2, 10).toUpperCase() : 'EFECTIVO-' + Date.now()
    };
    return ticket;
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.number.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.number = 'Número de tarjeta inválido (16 dígitos)';
    }
    if (!cardData.name.trim()) {
      newErrors.name = 'Nombre del titular requerido';
    }
    if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiry = 'Formato MM/AA inválido';
    }
    if (!cardData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV inválido (3-4 dígitos)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
    return v.match(/.{1,4}/g)?.join(' ') || v;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setCardData({ ...cardData, [name]: formattedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'cash') {
      setStep('success');
      const ticket = generateTicket();
      localStorage.setItem('lastTicket', JSON.stringify(ticket));
      setTimeout(() => {
        onSuccess(ticket);
      }, 1500);
    } else if (paymentMethod === 'card') {
      if (validateCard()) {
        setStep('success');
        const ticket = generateTicket();
        localStorage.setItem('lastTicket', JSON.stringify(ticket));
        setTimeout(() => {
          onSuccess(ticket);
        }, 1500);
      }
    }
  };

  const resetModal = () => {
    setPaymentMethod(null);
    setStep('method');
    setCardData({ number: '', name: '', expiry: '', cvv: '' });
    setErrors({});
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-modal-overlay" onClick={handleClose}>
      <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-modal-close" onClick={handleClose}>✕</button>
        
        {step === 'method' && (
          <>
            <div className="checkout-header">
              <div className="checkout-icon">💳</div>
              <h2>Método de Pago</h2>
              <p>Total a pagar: <strong>${(total * 1.16).toLocaleString()}</strong></p>
              <small>(IVA 16% incluido)</small>
            </div>

            <div className="payment-methods">
              <div 
                className={`payment-method ${paymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="method-icon">💵</div>
                <div className="method-info">
                  <h3>Efectivo</h3>
                  <p>Paga al recibir el producto</p>
                </div>
                <div className="method-radio">
                  <div className={`radio-circle ${paymentMethod === 'cash' ? 'active' : ''}`}></div>
                </div>
              </div>

              <div 
                className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="method-icon">💳</div>
                <div className="method-info">
                  <h3>Tarjeta de Crédito/Débito</h3>
                  <p>Visa, Mastercard, American Express</p>
                </div>
                <div className="method-radio">
                  <div className={`radio-circle ${paymentMethod === 'card' ? 'active' : ''}`}></div>
                </div>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-form">
                <h3>Datos de la tarjeta</h3>
                <div className="form-group">
                  <label>Número de tarjeta</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={handleCardChange}
                    className={errors.number ? 'error' : ''}
                  />
                  {errors.number && <span className="error-message">{errors.number}</span>}
                </div>

                <div className="form-group">
                  <label>Nombre del titular</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Como aparece en la tarjeta"
                    value={cardData.name}
                    onChange={handleCardChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha expiración</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      className={errors.expiry ? 'error' : ''}
                    />
                    {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}

            <button 
              className="confirm-payment-btn"
              onClick={handlePayment}
              disabled={!paymentMethod}
            >
              Confirmar Pago
            </button>
          </>
        )}

        {step === 'success' && (
          <div className="success-screen">
            <div className="success-icon">✅</div>
            <h2>¡Pago Exitoso!</h2>
            <p>Tu compra ha sido procesada correctamente</p>
            <div className="loading-bar"></div>
            <p className="redirect-text">Generando ticket...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
