import { footer } from '../components/footer.js'
import { navbar } from '../components/pro_navbar.js';

import {showForm} from "./showForm.js";
import {logout} from "./auth.js"

let navbar_show = document.getElementById('navbar')
navbar_show.innerHTML = navbar();

const api = "http://localhost:1010";

/* -----------appending data on product page-------------- */

const append_data = async () => {
  let res = await fetch(`${api}/products`);
  res = await res.json();
  // console.log(res)
  let data = res["beauty"];
  console.log(data);
  append_product_data(data);
};

append_data();

const append_product_data = (data) => {
  let product_data = document.getElementById("product_data");
  product_data.innerHTML = null;

  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "product_card";
    div.onclick = () => {
      // console.log(p_img,p_name,strikedOff_price,final_price,discount);
      storeDataLS(el);
      redirectToProductPage();
    };

    let p_img = document.createElement("img");
    p_img.src = el.image;
    p_img.className = "product_img";

    let p_name = document.createElement("p");
    p_name.innerText = el.product_name;
    p_name.className = "product_name";

    let price_div = document.createElement("div");
    price_div.className = "price_div";

    let price = document.createElement("p");
    price.innerText = `MRP ₹`;
    price.className = "product_price";

    let strikedOff_price = document.createElement("s");
    strikedOff_price.innerText = el.price;

    price.append(strikedOff_price);

    let discount = document.createElement("p");
    discount.innerText = `${el.discount}% OFF  `;
    discount.className = "discount";

    let final_price = document.createElement("p");
    final_price.className = "product_final_price";
    final_price.innerText = ` ₹ ${el.price - (el.price * +el.discount) / 100}`;

    price_div.append(price, discount);
    div.append(p_img, p_name, price_div, final_price);
    product_data.append(div);
  });
};

/* -------------------sorting data---------------------- */

const sorting_data = async () => {
  let res = await fetch(`${api}/products`);
  res = await res.json();
  // console.log(res)
  let data = res["beauty"];
  sorting(data);
};

let select = document.getElementById("sorting");
select.onclick = () => {
  sorting_data();
};
const sorting = (data) => {
  let selected = select.value;
  console.log(selected);
  if (selected === "LH") {
    data.sort(function (a, b) {
      return a.price - b.price;
    });
    append_product_data(data);
  }
  if (selected === "HL") {
    data.sort(function (a, b) {
      return b.price - a.price;
    });
    append_product_data(data);
  }
  if (selected === "Popularity") {
    append_product_data(data);
  }
};

/*-----------------Function to store data to Local Storage---------------------*/
const storeDataLS = (el) => {
  // let lsData = {p_img,p_name,strikedOff_price,final_price,discount};
  localStorage.setItem("product_Details", JSON.stringify(el));
};




/*-----------------to Redirect to different pages---------------------*/
const redirectToProductPage = () => {
  window.location.href = "single_product.html";
};

let footer_show = document.getElementById('footer')
footer_show.innerHTML = footer();

let all_cat = document.getElementById('cat_care')
all_cat.onclick = () => {
  window.location.href = 'index.html#categories'
}

let home_redir = document.querySelector('.logo')
home_redir.onclick = () => {
  window.location.href = 'index.html'
}

let cart_redirect  = document.querySelector('.cart')
cart_redirect.onclick = () => {
  window.location.href = 'cartMain.html'
}


// cart items display
let ls_cart = JSON.parse(localStorage.getItem("ls_cart")) || null;
// ls_cart = [1,2,3,4]
if(ls_cart!=null){
    let number = ls_cart.length;
    document.querySelector(".carticon>span").innerHTML = number;
    document.querySelector(".carticon>span").style.display = "inline-block"
}

let user = JSON.parse(localStorage.getItem("user_details")) || null;

if(user!=null){
    let log_in = document.querySelector(".logintext>span:first-child");
    let log_out = document.querySelector("#LogOut");
    log_in.innerHTML = user.full_name.split(" ")[0];
    log_out.style.display = "inline-block";
    log_out.onclick = ()=>{
        logout()
    window.location.reload()

    }
};


// Login form popup
document.querySelector(".login").onclick= async () => {
  let res =  await showForm("login");
  console.log('res',res);
 
  if(res.status === "success"){
     window.location.reload()
  }
  
 }