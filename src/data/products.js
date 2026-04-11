// Base de datos de productos futurista

export const products = [
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    category: "Mobile",
    price: 24000,
    originalPrice: 67999,
    discount: 56,
    image: "📱",
    description: "Sumérgete en la era digital con el Galaxy S22 Ultra. Pantalla Dynamic AMOLED 2X de 6.8 pulgadas, cámara de 108MP con tecnología de inteligencia artificial y S Pen integrado. La potencia de la innovación en tus manos.",
    specs: ["6.8\" Dynamic AMOLED", "108MP Cámara", "S Pen incluido", "5000mAh Batería"]
  },
  {
    id: 2,
    name: "Galaxy M13",
    category: "Mobile",
    price: 14000,
    originalPrice: 24999,
    discount: 44,
    image: "📱",
    description: "Experiencia sin límites con el Galaxy M13. Pantalla FHD+ de 6.6 pulgadas, batería de 5000mAh y cámara triple de 50MP. Diseñado para los que buscan rendimiento sin compromisos.",
    specs: ["6.6\" FHD+", "50MP Cámara Triple", "5000mAh Batería", "4GB RAM"]
  },
  {
    id: 3,
    name: "Galaxy M33",
    category: "Mobile",
    price: 24900,
    originalPrice: 49999,
    discount: 50,
    image: "📱",
    description: "Rendimiento de próxima generación. Procesador Exynos 1280, pantalla de 120Hz y batería de 5000mAh con carga rápida. El futuro de la tecnología móvil está aquí.",
    specs: ["120Hz Display", "Exynos 1280", "5000mAh", "Carga Rápida"]
  },
  {
    id: 4,
    name: "Galaxy M53",
    category: "Mobile",
    price: 40000,
    originalPrice: 69999,
    discount: 43,
    image: "📱",
    description: "Redefiniendo los límites. Pantalla Super AMOLED+ de 6.7 pulgadas, cámara principal de 108MP y diseño ultra elegante. La innovación nunca se vio tan bien.",
    specs: ["6.7\" Super AMOLED+", "108MP Principal", "Ultra elegante", "6GB RAM"]
  },
  {
    id: 5,
    name: "Quantum Smart Watch X",
    category: "Watches",
    price: 7999,
    originalPrice: 19999,
    discount: 60,
    image: "⌚",
    description: "El futuro en tu muñeca. Monitor de ritmo cardíaco avanzado, GPS integrado, resistencia al agua 5ATM y batería de 7 días. Más que un smartwatch, tu compañero digital.",
    specs: ["Monitor cardíaco", "GPS integrado", "5ATM Resistencia", "7 días batería"]
  },
  {
    id: 6,
    name: "Realme GT Master",
    category: "Mobile",
    price: 22999,
    originalPrice: 39999,
    discount: 42,
    image: "📱",
    description: "Diseño que inspira. Edición Master con diseño de viaje, cámara de 64MP y procesador Snapdragon. Estilo y potencia en un solo dispositivo.",
    specs: ["64MP Cámara", "Snapdragon", "Diseño único", "120Hz Display"]
  },
  {
    id: 7,
    name: "Xiaomi Mi 11 Lite",
    category: "Mobile",
    price: 18999,
    originalPrice: 32999,
    discount: 42,
    image: "📱",
    description: "Ligero, potente, extraordinario. Pantalla AMOLED de 90Hz, diseño ultradelgado y cámara profesional. La ligereza del poder.",
    specs: ["90Hz AMOLED", "Ultradelgado", "Cámara profesional", "5G Ready"]
  },
  {
    id: 8,
    name: "Neo Audio Pods",
    category: "Accessories",
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    image: "🎧",
    description: "Sonido del futuro. Cancelación activa de ruido, batería de 24 horas y carga inalámbrica. Sumérgete en tu música como nunca antes.",
    specs: ["Cancelación ruido", "24h batería", "Carga inalámbrica", "Resistente agua"]
  }
];

export const categories = [
  { id: 1, name: "Mobile", icon: "📱", color: "#00f2fe" },
  { id: 2, name: "Watches", icon: "⌚", color: "#ff0844" },
  { id: 3, name: "Electronics", icon: "💻", color: "#4facfe" },
  { id: 4, name: "Accessories", icon: "🎧", color: "#ffb199" },
  { id: 5, name: "Cosmetics", icon: "💄", color: "#ff6b6b" },
  { id: 6, name: "Furniture", icon: "🪑", color: "#00d2ff" },
  { id: 7, name: "Gaming", icon: "🎮", color: "#ff0844" },
  { id: 8, name: "Smart Home", icon: "🏠", color: "#4facfe" }
];