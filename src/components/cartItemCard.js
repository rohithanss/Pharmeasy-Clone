function cartItemCard(
  image,
  product_name,
  price,
  total_price,
  discount,
  quantity
) {
  product_name = product_name.split("(")[0];
  product_name = product_name.split("/")[0];
  product_name = product_name.split(",")[0];
  let originalPrice = +price * +quantity;
  return `

<div id="appendingCartItem">
<div>
  <img
    src="${image}"
    alt=""
  />
  </div>
  <div>
    <h2>${product_name}<i class="fa-solid fa-trash" ></i></h2>
    <p>By Mars pharmacy</p>
    <div>
      <select name="product-qty-cart" id="product-qty-cart">
        <option value="">Select Qty</option>
        <option value="1">Qty 1</option>
        <option value="2">Qty 2</option>
        <option value="3">Qty 3</option>
        <option value="4">Qty 4</option>
        <option value="5">Qty 5</option>
        <option value="6">Qty 6</option>
        <option value="7">Qty 7</option>
        <option value="8">Qty 8</option>
        <option value="9">Qty 9</option>
        ;
      </select>
      <div>
        <p><span>₹${originalPrice}</span><span>${discount}% OFF</span></p>
        <h4>₹${total_price}</h4>
      </div>
    </div>
    <p>Delivery by <span>Today, before 09:00 pm </span></p>
  </div>
</div>
`;
}
export { cartItemCard };
