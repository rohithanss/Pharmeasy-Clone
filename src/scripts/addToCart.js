import { alertMsg } from "./alertMsg.js";
const api = "http://localhost:1010";

const addToCart = async (product, value) => {
  let user = JSON.parse(localStorage.getItem("user_details")) || null;

  product.quantity = +value;
  product.total_price = product.quantity * product.price;
  product.total_price =
    product.total_price - (product.total_price * +product.discount) / 100;
  let cart = JSON.parse(localStorage.getItem("ls_cart")) || [];

  // UPDATING CART WITH NEW VALUE/PRODUCT
  let flag = true;
  cart.forEach((ele, i) => {
    if (ele.id == product.id) {
      if (value != "") {
        cart[i] = product;
      } else {
        cart.splice(i, 1);
      }
      flag = false;
    }
  });
  if (flag) {
    cart.push(product);
  }
  // UPDATING USER'S CART IN DB

  if (user != null) {
    try {
      console.log("hey user");
      user.cart = cart;
      await fetch(`${api}/user/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ cart }),
        headers: {
          "content-type": "application/json",
        },
      });
      localStorage.setItem("user_details", JSON.stringify(user));
    } catch (err) {
      alertMsg("error while updating User's cart in DB", "error");
      console.log(err);
    }
  }

  console.log("snd", cart);
  // UPDATING USER'S CART IN LOCAL STORAGE

  localStorage.setItem("ls_cart", JSON.stringify(cart));
  alertMsg("Product added to cart Successfully", "success");
  return cart;
};
export { addToCart };
