import { addToCart } from "./addToCart.js";
import { showForm } from "./showForm.js";
import { logout } from "./auth.js";
// import { placeOrder } from "./placeOrder.js";
import { alertMsg } from "./alertMsg.js";
import { footer } from '../components/footer.js'

const api = "http://localhost:1010";


let lsData = JSON.parse(localStorage.getItem("product_Details"));
console.log(lsData);

let pro_flow_name = document.querySelector("#flow>a+p+p");
pro_flow_name.innerHTML = lsData.product_name;

let user = JSON.parse(localStorage.getItem("user_details")) || null;

/*---------------------------------------------appending data---------------------------------*/

const append_product_details = (lsData) => {
  let product_details = document.getElementById("product_details");
  product_details.innerHTML = null;

  let prod_img_div = document.createElement("div");
  prod_img_div.className = "prod_img_div";

  let prod_img = document.createElement("img");
  prod_img.src = lsData.image;

  prod_img_div.append(prod_img);

  let prod_desc_div = document.createElement("div");
  prod_desc_div.className = "prod_desc_div";

  let prod_final_div = document.createElement("div");
  prod_final_div.className = "prod_final_div";

  let prod_desc = document.createElement("div");
  prod_desc.className = "prod_desc";

  let prod_name = document.createElement("h1");
  prod_name.innerText = lsData.product_name;
  prod_name.className = "prod_name";

  /*--------------------price related div--------------------*/
  let price_div = document.createElement("div");
  price_div.className = "price_div";

  let prod_original_price = document.createElement("p");
  prod_original_price.innerText = `MRP ₹`;
  let strikedOff_price = document.createElement("s");
  strikedOff_price.innerText = lsData.price;
  prod_original_price.append(strikedOff_price);

  let prod_final_price = document.createElement("p");
  prod_final_price.innerText = `₹ ${
    lsData.price - (lsData.price * +lsData.discount) / 100
  }`;

  let prod_discount = document.createElement("p");
  prod_discount.innerText = `${lsData.discount}% OFF  `;

  price_div.append(prod_final_price, prod_original_price, prod_discount);
  /*-----------------------------------------------*/

  let tax = document.createElement("p");
  tax.innerText = "Inclusive of all taxes";

  /*--------------------delivery div---------------------------*/
  let del_time = document.createElement("p");
  del_time.innerText = "Delivery by";
  del_time.style.fontSize = "12px";
  let del_time_details = document.createElement("span");
  del_time_details.innerText = "  Tomorrow, before 4:00 p.m";
  del_time_details.style.fontWeight = 700;
  del_time.append(del_time_details);
  /*-----------------------------------------------------------*/

  /*--------------------Add to Cart button---------------------------*/
  let addToCartBtn = document.createElement("button");
  addToCartBtn.className = "addToCartBtn";
  addToCartBtn.innerText = "Add To Cart";
  addToCartBtn.onclick = () => {
    addToCartBtn.style.display = "none";

    let selectopt = document.createElement("select");
    selectopt.className = "selectopt";
    selectopt.innerHTML = seleopt();
    selectopt.style = `
    padding: 2px 5px;
    width: 120px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 7px;
    `;

    prod_desc_div.append(prod_desc, selectopt);

    selectopt.onchange = async (e) => {
      let product_details = JSON.parse(localStorage.getItem("product_Details"));

      let newCart = await addToCart(product_details, e.target.value);
      document.getElementById(
        "num_of_items"
      ).innerText = `${newCart.length} Items in cart`;
    };
  };

  prod_desc.append(price_div, tax, del_time);
  prod_desc_div.append(prod_desc, addToCartBtn);
  prod_final_div.append(prod_name, prod_desc_div);
  product_details.append(prod_img_div, prod_final_div);
};

append_product_details(lsData);

const seleopt = () => {
  return `
  <Option value="">
  Select Qty
</Option>
    <Option value="1">
    Qty 1
    </Option>
    <Option value="2">
    Qty 2
    </Option>
    <Option value="3">
    Qty 3
    </Option>
    <Option value="4">
    Qty 4
    </Option>
    <Option value="5">
    Qty 5
    </Option>
    <Option value="6">
    Qty 6
    </Option>
    <Option value="7">
    Qty 7
    </Option>
    <Option value="8">
    Qty 8
    </Option>
    <Option value="9">
    Qty 9
    </Option>`;
};

// ---------------------- Rough work --------------------------

document.querySelector("#navbar > button:first-child").onclick = () => {
  showForm("signup");
};

document.querySelector("#navbar > button:nth-child(2)").onclick = () => {
  showForm("login");
};
document.querySelector("#navbar > button:nth-child(3)").onclick = async () => {
  let res = await placeOrder(JSON.parse(localStorage.getItem("user_details")));
  console.log(res);
  alertMsg(res.message, res.status);
};
document.querySelector("#navbar > button:last-child").onclick = () => {
  let res = logout();
  alertMsg(res.message, res.status);
};


let footer_show = document.getElementById('footer')
footer_show.innerHTML = footer();