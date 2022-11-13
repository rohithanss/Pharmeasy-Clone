const api = "http://localhost:1010";
import { showForm } from "./showForm.js";
import { logout } from "./auth.js";
let cart_Data = JSON.parse(localStorage.getItem("ls_cart")) || [];

if (cart_Data.length != 0) {
  window.location.href = "cartMain.html";
}
let user_detail = JSON.parse(localStorage.getItem("user_details")) || null;

if (user_detail != null) {
  document.querySelector(".log-in-li").innerHTML =
    user_detail.full_name.split(" ")[0];
  document.querySelector(".sign-up-li").innerHTML = "Log out";
}

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
