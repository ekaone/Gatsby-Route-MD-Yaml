import * as React from "react";
import { Link } from "gatsby";

function BrandOfferCoupon({ params }) {
  return (
    <div className="wrapper">
      <header>
        <Link to="/">Kembali "Home"</Link>
      </header>
      <main>
        <h1>Brand: {params.brand}</h1>
        <p>
          Anda beruntung, ini adalah kupon anda: <em>{params.coupon}</em>
        </p>
      </main>
    </div>
  );
}

export default BrandOfferCoupon;
