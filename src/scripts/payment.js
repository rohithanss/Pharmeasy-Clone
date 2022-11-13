import { alertMsg } from "./alertMsg.js";
// import { orderTotal } from "./cartMain.js";
// import { orderTotal } from "./cartMain.js";
import { placeOrder } from "./placeOrder.js";

document.querySelector("input[type='submit']").onclick = async (e) => {
  e.preventDefault();
  if (e.target.value == "Send OTP") {
    e.target.value = "Verify OTP";
    document.querySelector(".otpBox").style.display = "flex";
  } else {
    alertMsg("order placed successfully", "success");
    let userDetails = JSON.parse(localStorage.getItem("user_details"));
    let res = await placeOrder(userDetails);
    if (res.status == "success") {
      window.location.href = "index.html";
    }
    document.getElementById("overLay").style.display = "none";
  }
};

document.getElementById("showPayment").onclick = () => {
  document.getElementById("overLay").style.display = "flex";
};

document.onclick = (e) => {
  if (
    (e.target.id == "overLay" || e.target.id == "close-overLay-box") &&
    e.target.id != "overLay-box"
  ) {
    document.getElementById("overLay").style.display = "none";
  }
};
let orderTotal = localStorage.getItem("orderTotal");
document.querySelector(
  "#priceBreakdown>div:first-child> div:nth-child(2) > p:last-child"
).innerHTML = `₹${orderTotal}`;
document.querySelector(
  "#AmountPaid > p:last-child"
).innerHTML = `₹${orderTotal}`;

document.getElementById("cart-logo").onclick = () => {
  window.location.href = "index.html";
};
