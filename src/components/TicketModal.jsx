import React from 'react';
import './TicketModal.css';

const TicketModal = ({ isOpen, onClose, ticket }) => {
  if (!isOpen || !ticket) return null;

  const downloadTicket = () => {
    const ticketHTML = document.getElementById('ticket-content').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket de Compra - ${ticket.id}</title>
          <style>
            body { font-family: monospace; padding: 20px; }
            .ticket { max-width: 400px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; }
            .header { text-align: center; border-bottom: 1px dashed #ccc; padding-bottom: 10px; }
            .items { margin: 20px 0; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="ticket">
            ${ticketHTML}
          </div>
          <script>window.print();<\/script>
        </body>
      </html>
    `);
  };

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="ticket-modal-close" onClick={onClose}>✕</button>
        
        <div id="ticket-content" className="ticket-content">
          <div className="ticket-header">
            <div className="ticket-logo">🛍️ watchdive Megamart</div>
            <div className="ticket-store">Tienda Online Futurista</div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-info">
            <div className="info-row">
              <span>Ticket N°:</span>
              <strong>{ticket.id}</strong>
            </div>
            <div className="info-row">
              <span>Fecha:</span>
              <strong>{ticket.date}</strong>
            </div>
            <div className="info-row">
              <span>Cliente:</span>
              <strong>{ticket.customer?.name || 'Cliente'}</strong>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-items">
            <div className="items-header">
              <span>Producto</span>
              <span>Cant</span>
              <span>Subtotal</span>
            </div>
            {ticket.items.map((item, index) => (
              <div key={index} className="item-row">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${ticket.subtotal.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>IVA (16%):</span>
              <span>${ticket.tax.toLocaleString()}</span>
            </div>
            <div className="total-row grand-total">
              <span>TOTAL:</span>
              <span>${ticket.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-payment">
            <div className="payment-row">
              <span>Método de pago:</span>
              <strong>{ticket.paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}</strong>
            </div>
            <div className="payment-row">
              <span>Transacción:</span>
              <strong>{ticket.transactionId}</strong>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-footer">
            <p>¡Gracias por tu compra!</p>
            <p className="footer-small">Este ticket es tu comprobante de compra</p>
          </div>
        </div>

        <div className="ticket-actions">
          <button className="download-btn" onClick={downloadTicket}>
            🖨️ Imprimir / Descargar Ticket
          </button>
          <button className="close-ticket-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
