const api = "http://localhost:1010";
import { showForm } from "./showForm.js";
import { cartItemCard } from "../components/cartItemCard.js";
import { addToCart } from "./addToCart.js";
import { logout } from "./auth.js";
let cart_Data = JSON.parse(localStorage.getItem("ls_cart")) || [];
// cart items display
if (cart_Data != null) {
  let number = cart_Data.length;
  document.querySelector(".cart-li>span").innerHTML = number;
  document.querySelector(".cart-li>span").style.display = "inline-block";
}
if (cart_Data.length === 0) {
  window.location.href = "cart.html";
}
let user_detail = JSON.parse(localStorage.getItem("user_details")) || null;

if (user_detail != null) {
  document.querySelector(".log-in-li").innerHTML =
    user_detail.full_name.split(" ")[0];
  document.querySelector(".sign-up-li").innerHTML = "Log out";
}

let orderTotal = 0;
let totalDiscount = 0;
cart_Data.forEach((product) => {
  let { product_name, price, total_price, image, discount, quantity } = product;
  let div = document.createElement("div");
  div.innerHTML = cartItemCard(
    image,
    product_name,
    price,
    total_price,
    discount,
    quantity
  );
  document.querySelector(".addCartItemHere").append(div);
  let s = document.querySelectorAll("#appendingCartItem select");
  s[s.length - 1].value = quantity;
  orderTotal += total_price;
  let dlt = document.querySelectorAll(".fa-trash");
  dlt[dlt.length - 1].style.cursor = "pointer";
  dlt[dlt.length - 1].onclick = () => {
    addToCart(product, "");
    window.location.reload();
  };

  totalDiscount += price * quantity * (+discount / 100);
});

orderTotal = orderTotal.toFixed(2);

let selects = document.querySelectorAll("#appendingCartItem select");
selects.forEach((sel, i) => {
  sel.onchange = (e) => {
    addToCart(cart_Data[i], e.target.value);
    window.location.reload();
  };
});

document.querySelector(
  "#order_summary>div:first-child> div:nth-child(2) > p:last-child"
).innerHTML = `₹${orderTotal}`;
document.querySelector(
  "#AmountPaid > p:last-child"
).innerHTML = `₹${orderTotal}`;
totalDiscount = totalDiscount.toFixed(2);
document.querySelector(".appendTotalDis").innerHTML = `₹${totalDiscount}`;

localStorage.setItem("orderTotal", orderTotal);

document.getElementById("delbtn").onclick = () => {
  let user_details = JSON.parse(localStorage.getItem("user_details")) || null;

  if (user_details == null) {
    showForm("signup");
  } else {
    window.location.href = "payment.html";
  }
};

document.querySelector(".log-in-li").onclick = (e) => {
  if (e.target.innerText == "Log in") {
    showForm("login");
  }
};
document.querySelector(".sign-up-li").onclick = (e) => {
  if (e.target.innerText == "Sign up") {
    showForm("signup");
  } else {
    logout();
    window.location.reload();
  }
};
document.querySelector(".cart-li").onclick = () => {
  window.location.href = "cartMain.html";
};

document.getElementById("cart-logo").onclick = () => {
  window.location.href = "index.html";
};

document.querySelector(
  "#addingcartItems > h1"
).innerText = `${cart_Data.length} Items in Cart`;
