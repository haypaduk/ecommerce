/**
 * =====================================================
 * ARCHIVO: app.js
 * DESCRIPCIÓN: Lógica principal de la tienda online
 * FUNCIONES: Gestión de productos, carrito, modales, etc.
 * =====================================================
 */

/**
 * =====================================================
 * BASE DE DATOS DE PRODUCTOS (SIMULADA)
 * Array de objetos con todos los productos disponibles
 * Basado en la imagen proporcionada
 * =====================================================
 */

// Productos principales de la sección de ofertas
const products = [
    {
        id: 1,
        name: "Galaxy S22 Ultra",
        category: "Mobile",
        price: 24000,
        originalPrice: 67999,
        discount: 56,
        image: "📱", // Emoji como placeholder de imagen
        description: "El Galaxy S22 Ultra cuenta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, cámara de 108MP y S Pen integrado."
    },
    {
        id: 2,
        name: "Galaxy M13 (4GB | 64GB)",
        category: "Mobile",
        price: 14000,
        originalPrice: 10499,
        discount: 56,
        image: "📱",
        description: "Galaxy M13 con pantalla FHD+ de 6.6 pulgadas, batería de 5000mAh y cámara triple de 50MP."
    },
    {
        id: 3,
        name: "Galaxy M33 (4GB|64 GB|)",
        category: "Mobile",
        price: 24900,
        originalPrice: 16999,
        discount: 56,
        image: "📱",
        description: "Galaxy M33 con procesador Exynos 1280, pantalla de 120Hz y batería de 5000mAh."
    },
    {
        id: 4,
        name: "Galaxy M53 (4GB | 64 GB)",
        category: "Mobile",
        price: 40000,
        originalPrice: 31999,
        discount: 56,
        image: "📱",
        description: "Galaxy M53 con pantalla Super AMOLED+ de 6.7 pulgadas y cámara principal de 108MP."
    },
    {
        id: 5,
        name: "Galaxy S22 Ultra",
        category: "Mobile",
        price: 85000,
        originalPrice: 67999,
        discount: 56,
        image: "📱",
        description: "Galaxy S22 Ultra - La mejor experiencia móvil con S Pen y cámara profesional."
    }
];

// Productos adicionales de electrónica
const electronicsProducts = [
    {
        id: 6,
        name: "Smart Watch Pro",
        category: "Watches",
        price: 7999,
        originalPrice: 15999,
        discount: 50,
        image: "⌚",
        description: "Smart watch con monitor de frecuencia cardíaca, GPS y batería de larga duración."
    },
    {
        id: 7,
        name: "Realme GT Master",
        category: "Mobile",
        price: 22999,
        originalPrice: 32999,
        discount: 30,
        image: "📱",
        description: "Realme GT Master Edition con diseño de viaje y cámara de 64MP."
    },
    {
        id: 8,
        name: "Xiaomi Mi 11 Lite",
        category: "Mobile",
        price: 18999,
        originalPrice: 26999,
        discount: 30,
        image: "📱",
        description: "Xiaomi Mi 11 Lite, ultra delgado con pantalla AMOLED de 90Hz."
    }
];

/**
 * =====================================================
 * ESTADO DE LA APLICACIÓN
 * Variables globales que mantienen el estado
 * =====================================================
 */

// Array que almacena los productos en el carrito
let cart = [];

// Variable para el intervalo del contador regresivo
let timerInterval;

/**
 * =====================================================
 * INICIALIZACIÓN
 * Funciones que se ejecutan al cargar la página
 * =====================================================
 */

/**
 * Evento DOMContentLoaded - Se ejecuta cuando el DOM está listo
 * Inicializa todos los componentes de la página
 */
document.addEventListener('DOMContentLoaded', () => {
    renderOffers();        // Renderiza las ofertas principales
    renderElectronics();   // Renderiza los productos electrónicos
    startTimer();          // Inicia el contador regresivo del banner
});

/**
 * =====================================================
 * FUNCIONES DE RENDERIZADO
 * Crean el HTML dinámico para mostrar los productos
 * =====================================================
 */

/**
 * Renderiza las ofertas especiales en el grid de ofertas
 * Toma los productos del array 'products' y los convierte en HTML
 */
function renderOffers() {
    const offersGrid = document.getElementById('offersGrid');
    offersGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

/**
 * Renderiza los productos electrónicos en su grid correspondiente
 * Combina productos de ambos arrays y filtra por categorías relevantes
 */
function renderElectronics() {
    const electronicsGrid = document.getElementById('electronicsGrid');
    // Combina todos los productos y filtra los que son móviles o relojes
    const allElectronics = [...products, ...electronicsProducts].filter(p => p.category === 'Mobile' || p.category === 'Watches');
    electronicsGrid.innerHTML = allElectronics.map(product => createProductCard(product)).join('');
}

/**
 * Crea el HTML para una tarjeta de producto individual
 * @param {Object} product - El objeto del producto a renderizar
 * @returns {string} HTML de la tarjeta de producto
 */
function createProductCard(product) {
    const save = product.originalPrice - product.price; // Calcula el ahorro
    return `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">${product.image}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-price">
                <span class="current-price">$${product.price.toLocaleString()}</span>
                <span class="original-price">$${product.originalPrice.toLocaleString()}</span>
            </div>
            <div class="discount">${product.discount}% OFF</div>
            <div class="save-amount">Save -$${save.toLocaleString()}</div>
            <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">Añadir al Carrito</button>
        </div>
    `;
}

/**
 * =====================================================
 * FUNCIONES DEL MODAL DE PRODUCTO
 * Gestionan la visualización detallada de productos
 * =====================================================
 */

/**
 * Abre el modal con los detalles de un producto específico
 * @param {number} productId - ID del producto a mostrar
 */
function openProductModal(productId) {
    // Busca el producto en ambos arrays
    const product = [...products, ...electronicsProducts].find(p => p.id === productId);
    if (!product) return;

    const save = product.originalPrice - product.price;
    const modalContent = document.getElementById('modalContent');
    
    // Genera el HTML del modal con los datos del producto
    modalContent.innerHTML = `
        <div class="modal-image">${product.image}</div>
        <div class="modal-details">
            <h2>${product.name}</h2>
            <div class="modal-price">
                <span class="modal-current-price">$${product.price.toLocaleString()}</span>
                <span class="modal-original-price">$${product.originalPrice.toLocaleString()}</span>
            </div>
            <div class="modal-discount">${product.discount}% OFF</div>
            <div class="modal-save">Ahorras: $${save.toLocaleString()}</div>
            <div class="modal-description">
                ${product.description}
            </div>
            <button class="modal-add-to-cart" onclick="addToCart(${product.id}); closeModal();">Añadir al Carrito</button>
        </div>
    `;

    // Muestra el modal y el overlay
    document.getElementById('productModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

/**
 * Cierra el modal de producto
 */
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

/**
 * =====================================================
 * FUNCIONES DEL CARRITO
 * Gestionan todas las operaciones relacionadas con el carrito
 * =====================================================
 */

/**
 * Añade un producto al carrito
 * @param {number} productId - ID del producto a añadir
 */
function addToCart(productId) {
    // Busca el producto en la base de datos
    const product = [...products, ...electronicsProducts].find(p => p.id === productId);
    if (!product) return;

    // Verifica si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Si existe, incrementa la cantidad
        existingItem.quantity += 1;
    } else {
        // Si no existe, lo añade con cantidad 1
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Actualiza la vista del carrito
    updateCart();
    // Muestra notificación de éxito
    showNotification('Producto añadido al carrito');
}

/**
 * Actualiza la interfaz del carrito
 * Renderiza los items y actualiza el contador y total
 */
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // Calcula el total de items en el carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Si el carrito está vacío, muestra mensaje
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
        cartTotal.textContent = 'Total: $0';
        return;
    }

    // Genera HTML para cada item del carrito
    let itemsHtml = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHtml += `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()} x ${item.quantity}</div>
                    <div class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</div>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = itemsHtml;
    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
}

/**
 * Elimina un producto del carrito
 * @param {number} productId - ID del producto a eliminar
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Producto eliminado del carrito');
}

/**
 * =====================================================
 * FUNCIONES DE INTERFAZ DE USUARIO
 * Controlan menús, modales y navegación
 * =====================================================
 */

/**
 * Alterna la visibilidad del menú lateral
 * Abre o cierra el menú y el overlay
 */
function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

/**
 * Alterna la visibilidad del carrito lateral
 * Abre o cierra el carrito y el overlay
 */
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

/**
 * Muestra el modal de autenticación (versión demo)
 * Simula la funcionalidad de login/registro
 */
function showAuth() {
    alert('Funcionalidad de autenticación - Versión demo');
}

/**
 * Procesa el checkout (versión demo)
 * Simula la compra de los productos en el carrito
 */
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    alert('¡Gracias por tu compra! Esta es una versión demo.');
    cart = []; // Vacía el carrito
    updateCart(); // Actualiza la vista
    toggleCart(); // Cierra el carrito
}

/**
 * Filtra productos por categoría (versión demo)
 * @param {string} category - Categoría seleccionada
 */
function filterCategory(category) {
    alert(`Mostrando productos de la categoría: ${category} - Versión demo`);
}

/**
 * =====================================================
 * FUNCIONES UTILITARIAS
 * Utilidades y helpers
 * =====================================================
 */

/**
 * Inicia el contador regresivo del banner
 * Cuenta regresiva desde 08:26:00
 */
function startTimer() {
    let time = 8 * 3600 + 26 * 60; // 08:26:00 en segundos
    const timerElement = document.getElementById('timer');

    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00:00";
            return;
        }

        time--;
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        // Formatea el tiempo con dos dígitos
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000); // Actualiza cada segundo
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 */
function showNotification(message) {
    // Busca o crea el elemento de notificación
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.display = 'block';

    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

/**
 * Limpieza al cerrar la página
 * Elimina el intervalo del contador para evitar memory leaks
 */
window.addEventListener('beforeunload', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});