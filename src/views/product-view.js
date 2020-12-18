import * as React from "react";
import { Link } from "gatsby";

function ProductView({ product }) {
  return (
    <div className="wrapper">
      <header>
        Product
        <br />
        <Link to="/">Kembali "Home"</Link>
      </header>
      <main>
        <h1>{product.name}</h1>
        <p>
          {product.description}. Appeared in {product.appearance}.
        </p>
        <p>SKU: {product.meta.sku}</p>
      </main>
      <footer>Product provided by PT ABC.</footer>
    </div>
  );
}

export default ProductView;
