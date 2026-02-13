import "./ProductCard.css";

const ProductCard = ({ name, price, inStock, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="product-img" />

      <h2>{name}</h2>

      <p className="price">₹{price}</p>

      {inStock ? (
        <span className="stock in">In Stock</span>
      ) : (
        <span className="stock out">Out of Stock</span>
      )}
    </div>
  );
};

export default ProductCard;
