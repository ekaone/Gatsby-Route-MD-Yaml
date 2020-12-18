import * as React from "react";
import { Link } from "gatsby";

function ProductCatchAll({ params }) {
  return (
    <div className="wrapper">
      <header>
        <Link to="/">Kembali "Home"</Link>
      </header>
      <main>
        <h1>Tidak dapat menemukan product</h1>
        <p>Maaf untuk product "{params.name}" tidak ada</p>
      </main>
    </div>
  );
}

export default ProductCatchAll;
