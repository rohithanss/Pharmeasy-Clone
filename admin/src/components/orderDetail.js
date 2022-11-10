const api = "http://localhost:1010";

async function orderDetail(order) {
  let { custId, orderTotal, orderStatus, orderId } = order;

  let res = await fetch(`${api}/user/${custId}`);
  res = await res.json();
  console.log();
  let { email, mobile, full_name } = res;
  let letter_icon = full_name.toUpperCase()[0];
  return ` <div class="order-page">
  <span>Orders</span><i class="fa-solid fa-chevron-right"></i>
  <span>Order Details</span>
</div>
<div id="order-number">
  <div>
    <div>
      <h2>Order Number:</h2>
      <h2>#${orderId}</h2>
    </div>
    <div>
      <span>Status: ${orderStatus} </span>
      <select name="order-status" id="order-status" >
        <option value="">Update Status</option>
        <option value="placed">Placed</option>
        <option value="shipped">Shipped</option>
        <option value="returned">Returned</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>
  </div>
  <div>
    <div>
      <p>Email:</p>
      <p>${email}</p>
    </div>
    <div>
      <p>Mobile:</p>
      <p>${mobile}</p>
    </div>
    <div>
      <p>Payment:</p>
      <p>Received</p>
    </div>
  </div>
</div>
<div id="order-summary">
  <h1>Summary</h1>
  <div class="order-products"></div>
  <div>
    <h4>Net Total</h4>
    <h2 id="total-amount">Rs.<span> ${orderTotal}</span></h2>
  </div>
</div>
<div id="order-customer">
<h1>Customer</h1>
<div>
<div class="letter_icon">${letter_icon}</div>
  <p>${full_name}</p>
</div>
<div>
    <div>
      <p>Email:</p>
      <p>${email}</p>
    </div>
    <div>
      <p>Mobile:</p>
      <p>${mobile}</p>
    </div>
    <div>
      <p>Payment:</p>
      <p>Received</p>
    </div>
  </div>
</div>`;
}
export { orderDetail };
