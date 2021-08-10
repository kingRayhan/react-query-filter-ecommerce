import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div>
      <img className="rounded-md" src={product.thumbnail} alt={product.title} />

      <div className="mt-3">
        <h3 className="text-xl">{product.title}</h3>
        <p className="text-green-500">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
