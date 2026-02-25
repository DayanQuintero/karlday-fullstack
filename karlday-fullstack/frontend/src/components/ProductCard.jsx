import React from 'react';

const ProductCard = ({ title, priceMXN, priceUSD, category }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        {/* Placeholder para la imagen de la prenda */}
        <img src="https://via.placeholder.com/300x300?text=Prenda" alt={title} />
      </div>
      <div className="product-info">
        <p className="price">${priceMXN} MXN / ${priceUSD} USD</p>
        <p>{title}</p>
        <p style={{ color: 'gray' }}>{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;