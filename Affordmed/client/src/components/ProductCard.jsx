import React from 'react';

const ProductCard = ({ product }) => {
  const { productName, price, rating, discount, availability } = product;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <h2 className="text-lg font-semibold mb-2">{productName}</h2>
      <p>Price: ${price}</p>
      <p>Rating: {rating}</p>
      <p>Discount: {discount}%</p>
      <p>Availability: {availability}</p>
    </div>
  );
};

export default ProductCard;