import { alertMsg } from "../../../src/scripts/alertMsg.js";

let selected_option = document.querySelector("#products");
selected_option.setAttribute("class", "selected");

const api = "http://localhost:1010";
let count = 0;

window.onload = async () => {
  // FETCHING ALL PRODUCTS FROM THE SERVER IN AN ARRAY
  let products;
  try {
    let admin = await fetch(`${api}/admin/rohithanss`);
    admin = await admin.json();
    products = await admin.products;
  } catch (err) {
    alertMsg("Error occurred while fetching Products", "error");
    console.log(err);
  }
  let allProducts = [];
  for (let k in products) {
    let el = products[k];
    el.forEach((ele) => {
      allProducts.push(ele);
    });
  }

  //   ---- SORTING EVENT ----

  document.getElementById("sort-by-stock").onchange = (e) => {
    count = 0;
    if (e.target.value == "lh") {
      allProducts.sort((a, b) => {
        return +a.quantity - +b.quantity;
      });
      appendProducts(allProducts, 0, 10);
    } else if (e.target.value == "hl") {
      allProducts.sort((a, b) => {
        return +b.quantity - +a.quantity;
      });
      appendProducts(allProducts, 0, 10);
    }
  };
  //   ---- FILTERING EVENT ----

  document.getElementById("filter-by-category").onchange = async (e) => {
    let filteredData = allProducts.filter((el) => {
      return el.id.includes(e.target.value);
    });
    count = 0;
    appendProducts(filteredData, 0, 10);
  };

  //   ---- ADD NEW PRODUCT ----
  document.querySelector(".container-add-product > button").onclick = () => {
    let overlay = document.getElementById("overlay");
    addProduct();
    overlay.style.display = "flex";
  };

  let input_fields = document.querySelectorAll(".product-inputBox>input");
  input_fields.forEach((el) => {
    el.addEventListener("focus", (e) => {
      e.path[1].style = `
      border: 1px solid rgb(180, 92, 235);
      box-shadow: rgba(180, 92, 235, 0.2) 0px 2px 8px 0px;
      `;
    });
    el.addEventListener("blur", (e) => {
      e.path[1].style = `
      `;
    });
  });

  appendProducts(allProducts, 0, 10);
};

// ---------------------------- APPEND PRODUCTS FUNCTION -----------------------------

function appendProducts(products, s, e) {
  document.querySelector("tbody").innerHTML = null;
  //   ---- PAGINATION EVENT ----
  let total_pages = Math.ceil(products.length / 10);
  document.querySelector(".container-pagination .prevP").onclick = () => {
    prev_page(products);
  };
  document.querySelector(".container-pagination .nextP").onclick = () => {
    next_page(products, total_pages);
  };
  //   Updating page number and products number on the Dom

  document.querySelector(
    ".container-pagination > div:first-child"
  ).innerText = `${s + 1} - ${e > products.length ? products.length : e} of ${
    products.length
  } Products`;

  document.querySelector(
    ".container-pagination > div:last-child>span:first-child"
  ).innerText = `${count + 1} of ${total_pages}`;

  //   EXTRACTING EACH PRODUCT DATA
  for (let i = s; i < e; i++) {
    let product = products[i];
    if (product == undefined) {
      break;
    }
    let { id, product_name, image, quantity } = product;

    let category;
    if (id.includes("hc")) {
      category = "Home Care";
    } else if (id.includes("sc")) {
      category = "Skin Care";
    } else if (id.includes("Beauty")) {
      category = "Beauty";
    } else if (id.includes("per")) {
      category = "Personal Care";
    }
    product_name = product_name.split(",")[0];
    product_name = product_name.split("(")[0];
    product_name = product_name.split("-")[0];
    appendRow(product, id, image, product_name, category, quantity);
  }
  // HOVER EFFECT FOR THE TABLE ROWS

  let rows = document.querySelectorAll("tbody>tr");
  rows.forEach((el) => {
    el.onmouseover = (e) => {
      e.path[1].children[0].style.color = "rgb(180, 92, 235)";
      e.path[1].children[5].style.color = "rgb(180, 92, 235)";
    };
    el.onmouseout = (e) => {
      e.path[1].children[0].style.color = e.path[1].children[1].style.color;
      e.path[1].children[5].style.color = e.path[1].children[1].style.color;
    };
  });
}

// ---------------------------- Appending Product Row one By One --------------------------

function appendRow(product, ...data) {
  let tr = document.createElement("tr");
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let td = document.createElement("td");
    if (i == 0) {
      td.innerText = "#" + el;
    } else if (i == 1) {
      let img = document.createElement("img");
      img.src = el;
      img.style = `
      max-height:40px;
      padding: 0px 0;
      `;
      td.append(img);
    } else {
      td.innerText = el;
    }
    tr.append(td);
  }
  let td = document.createElement("td");
  td.innerText = "View";
  tr.append(td);
  tr.onclick = () => {
    updateProduct(product, data[3]);
    // EVENT LISTENER TO VIEW PRODUCT DETAILS
  };
  document.querySelector("tbody").append(tr);
}

// ------------------------------------- PAGINATION FUNCTIONS -----------------------------

function prev_page(allProducts) {
  if (count >= 1) {
    count--;
    let start = count * 10;
    let end = start + 10;
    appendProducts(allProducts, start, end);
  }
}
function next_page(allProducts, total_pages) {
  if (count >= 0 && count < total_pages - 1) {
    count++;
    let start = count * 10;
    let end = start + 10;
    appendProducts(allProducts, start, end);
  }
}

// ------------------------------- ADD  PRODUCT FUNCTION --------------------------------

async function addProduct() {
  let id;
  let name = document.getElementById("product_name");
  let product_id = document.querySelector(".product-id");
  let image = document.getElementById("image");
  let price = document.getElementById("price");
  let category = document.getElementById("product_category");
  let stock = document.getElementById("stock_quantity");
  let discount = document.getElementById("discount");
  let description = document.getElementById("desc");
  let button = document.querySelector(".submit-product-form");

  name.value = "";
  price.value = 0;
  category.value = "";
  category.disabled = false;
  image.value = "";
  stock.value = 0;
  discount.value = 0;
  description.value = "";
  product_id.innerText = null;
  button.innerText = "Add Product";

  // ASSIGNING AN UNIQUE PRODUCT ID TO THE PRODUCT BASIS ON THE CATEGORY

  category.onchange = async (e) => {
    let cat;
    if (e.target.value == "hc") {
      cat = "home care";
    } else if (e.target.value == "per") {
      cat = "personal care";
    } else if (e.target.value == "sc") {
      cat = "skin care";
    } else if (e.target.value == "Beauty") {
      cat = "beauty";
    }

    try {
      let res = await fetch(`${api}/products`);
      res = await res.json();
      let temp = res[cat];
      temp = temp[temp.length - 1].id;
      let temp_id = [];
      for (let i = temp.length - 1; i >= 0; i--) {
        temp_id.unshift(temp[i]);
        if (
          temp[i - 1] != "1" &&
          temp[i - 1] != "2" &&
          temp[i - 1] != "3" &&
          temp[i - 1] != "5" &&
          temp[i - 1] != "4" &&
          temp[i - 1] != "6" &&
          temp[i - 1] != "7" &&
          temp[i - 1] != "8" &&
          temp[i - 1] != "9" &&
          temp[i - 1] != "0"
        ) {
          break;
        }
      }
      temp_id = +temp_id.join("");
      id = e.target.value + ++temp_id;
      product_id.innerText = id;
      alertMsg("An unique product id has been Assigned", "success");
    } catch (err) {
      alertMsg("Error while assigning Id to the product", "error");
      console.log(err);
    }
  };

  // ----------------------------- ADDING THE NEW PRODUCT TO THE DATA BASE ----------------------

  button.onclick = async (e) => {
    if (
      e.target.innerText != "Add Product" ||
      name.value == "" ||
      price.value == "" ||
      image.value == "" ||
      stock.value == "" ||
      product_id.value == ""
    ) {
      alertMsg("Fields cannot be empty", "error");
      return;
    }

    // Data to append

    let sendData = {
      id,
      adminId: "rohithanss",
      product_name: name.value,
      image: image.value,
      price: price.value,
      total_price: null,
      discount: discount.value,
      description: description.value,
      status: null,
      quantity: stock.value,
    };

    // fetching category, where data will be appended
    let cat;
    if (category.value == "hc") {
      cat = "home care";
    } else if (category.value == "per") {
      cat = "personal care";
    } else if (category.value == "sc") {
      cat = "skin care";
    } else if (category.value == "Beauty") {
      cat = "beauty";
    }

    try {
      let res = await fetch(`${api}/products`);
      res = await res.json();
      let temp = res[cat];
      temp.push(sendData);

      // updating in all products

      await fetch(`${api}/products`, {
        method: "PATCH",
        body: JSON.stringify(res),
        headers: {
          "content-type": "application/json",
        },
      });
      // updating in admin products

      await fetch(`${api}/admin/rohithanss`, {
        method: "PATCH",
        body: JSON.stringify({ products: res }),
        headers: {
          "content-type": "application/json",
        },
      });
      alertMsg("Product added successfully!", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      alertMsg("Error while adding product", "fail");
      console.log(err);
    }
  };
}

// ------------------------------- UPDATE  PRODUCT FUNCTION --------------------------------

async function updateProduct(product, cat_name) {
  let name = document.getElementById("product_name");
  let product_id = document.querySelector(".product-id");
  let image = document.getElementById("image");
  let price = document.getElementById("price");
  let category = document.getElementById("product_category");
  let stock = document.getElementById("stock_quantity");
  let discount = document.getElementById("discount");
  let description = document.getElementById("desc");
  let button = document.querySelector(".submit-product-form");

  // extracting category from product id
  let cat = "";
  for (let i = 0; i < product.id.length; i++) {
    cat += product.id[i];
    if (
      product.id[i + 1] == "1" ||
      product.id[i + 1] == "2" ||
      product.id[i + 1] == "3" ||
      product.id[i + 1] == "5" ||
      product.id[i + 1] == "4" ||
      product.id[i + 1] == "6" ||
      product.id[i + 1] == "7" ||
      product.id[i + 1] == "8" ||
      product.id[i + 1] == "9" ||
      product.id[i + 1] == "0"
    ) {
      break;
    }
  }
  name.value = product.product_name;
  price.value = +product.price;
  category.value = cat;
  category.disabled = true;
  image.value = product.image;
  stock.value = +product.quantity;
  discount.value = +product.discount;
  description.value = product.description;
  product_id.innerText = product.id;
  button.innerText = "Update Changes";

  document.getElementById("overlay").style.display = "flex";

  button.onclick = async (e) => {
    if (
      e.target.innerText != "Update Changes" ||
      name.value == "" ||
      price.value == "" ||
      image.value == "" ||
      stock.value == "" ||
      product_id.value == ""
    ) {
      alertMsg("Fields cannot be empty", "error");
      return;
    }

    let newData = {
      id: product.id,
      adminId: "rohithanss",
      product_name: name.value,
      image: image.value,
      price: price.value,
      total_price: null,
      discount: discount.value,
      description: description.value,
      status: null,
      quantity: stock.value,
    };
    try {
      let res = await fetch(`${api}/products`);
      res = await res.json();
      let temp = res[cat_name.toLowerCase()];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == newData.id) {
          temp[i] = newData;
        }
      }

      // updating in all products

      await fetch(`${api}/products`, {
        method: "PATCH",
        body: JSON.stringify(res),
        headers: {
          "content-type": "application/json",
        },
      });
      // updating in admin products

      await fetch(`${api}/admin/rohithanss`, {
        method: "PATCH",
        body: JSON.stringify({ products: res }),
        headers: {
          "content-type": "application/json",
        },
      });
      alertMsg("Product details updated successfully!", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      alertMsg("Error while updating product details", "fail");
      console.log(err);
    }
  };
}
