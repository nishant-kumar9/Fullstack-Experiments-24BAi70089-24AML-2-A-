import ProductCard from "./ProductCard";
import "./ProductCard.css";

import headphone from "./assets/headphone.jpg";
import keyboard from "./assets/keyboard.jpg";
import watch from "./assets/watch.jpg";

function App() {
  return (
    <div className="container">
      <ProductCard
        name="Wireless Headphones"
        price="1299"
        inStock={true}
        image={headphone}
      />

      <ProductCard
        name="Mechanical Keyboard"
        price="2499"
        inStock={false}
        image={keyboard}
      />

      <ProductCard
        name="Smart Watch"
        price="3999"
        inStock={true}
        image={watch}
      />
    </div>
  );
}

export default App;
