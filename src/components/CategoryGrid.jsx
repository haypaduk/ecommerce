import React from 'react';
import './CategoryGrid.css';

const categories = [
  { id: 1, name: "Mobile", icon: "📱", color: "#00f2fe" },
  { id: 2, name: "Watches", icon: "⌚", color: "#ff0844" },
  { id: 3, name: "Electronics", icon: "💻", color: "#4facfe" },
  { id: 4, name: "Accessories", icon: "🎧", color: "#ffb199" },
  { id: 5, name: "Cosmetics", icon: "💄", color: "#ff6b6b" },
  { id: 6, name: "Furniture", icon: "🪑", color: "#00d2ff" },
  { id: 7, name: "Gaming", icon: "🎮", color: "#ff0844" },
  { id: 8, name: "Smart Home", icon: "🏠", color: "#4facfe" }
];

const CategoryGrid = () => {
  return (
    <div className="categories-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="gradient-text">🚀 Shop From Top Categories</span>
        </h2>
        <div className="section-line"></div>
      </div>
      
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-icon" style={{ textShadow: `0 0 10px ${category.color}` }}>
              {category.icon}
            </div>
            <div className="category-name">{category.name}</div>
            <div className="category-glow" style={{ background: `linear-gradient(135deg, ${category.color}, transparent)` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
