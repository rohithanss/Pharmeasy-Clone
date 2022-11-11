function productCard(imgUrl, title, price, quantity, total_price) {
  title = title.split(",")[0];
  title = title.split("(")[0];
  return `             <div class="product-card">
    <div>
      <img
        src=${imgUrl}
        alt=""
      />
      <p>${title}</p>
    </div>

    <p>
      <span class="product-price">${price}</span>X
      <span class="product-quantity">${quantity}</span
      ><span class="product-total">Rs. ${total_price}</span>
    </p>
  </div>`;
}
export { productCard };
