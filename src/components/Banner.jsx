import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 26,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-container">
      <div className="banner-glass">
        <div className="banner-content">
          <div className="banner-badge">
            <span className="badge-icon">⚡</span>
            OFERTA RELÁMPAGO
          </div>
          <h1 className="banner-title">
            Mejores ofertas en 
            <span className="gradient-text"> Smart Watches</span>
          </h1>
          <div className="timer-container">
            <div className="timer-unit">
              <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="timer-label">Horas</span>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-unit">
              <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="timer-label">Minutos</span>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-unit">
              <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="timer-label">Segundos</span>
            </div>
          </div>
          <div className="offer-tag">
            <span className="offer-percent">80% de descuento!!</span>
          </div>
          <p className="banner-subtitle">Toma las mejores ofertas</p>
          <button className="shop-now-btn">
            Comprar Ahora
            <span className="btn-glow"></span>
          </button>
        </div>
        <div className="banner-visual">
          <div className="floating-device">
            <div className="device-ring"></div>
            <div className="device-icon">⌚</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;