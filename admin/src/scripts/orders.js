import { container } from "../components/container.js";
import { orderDetail } from "../components/orderDetail.js";
import { productCard } from "../components/productCard.js";
import { alertMsg } from "../../../src/scripts/alertMsg.js";
const api = "http://localhost:1010";
let count = 0;

window.onload = async () => {
  // ----------DEFAULT APPENDING -----------

  let selected_option = document.querySelector("#orders");
  selected_option.setAttribute("class", "selected");
  document.querySelector("section").innerHTML = container();
  let res;
  try {
    res = await fetch(`${api}/admin/rohithanss`);
    res = await res.json();
  } catch (err) {
    alertMsg("Error occurred while fetching Orders", "error");
    console.log(err);
  }
  let orders = res.orders;
  let customers = res.customers;
  orders.reverse();
  appendOrders(orders, customers, 0, 10 > orders.length ? orders.length : 10);

  // ------------- SORTING ORDERS BY TIME --------------------

  document.getElementById("sort-by-date").onchange = () => {
    count = 0;
    orders.reverse();
    appendOrders(orders, customers, 0, 10 > orders.length ? orders.length : 10);
  };

  // ------------- FILTERING ORDERS BY ORDER STATUS --------------------

  document.getElementById("filter-by-status").onchange = (e) => {
    count = 0;
    if (e.target.value != "") {
      let temp_orders = orders.filter((el) => {
        return el.orderStatus == e.target.value;
      });
      appendOrders(
        temp_orders,
        customers,
        0,
        10 > temp_orders.length ? temp_orders.length : 10
      );
    } else {
      appendOrders(
        orders,
        customers,
        0,
        10 > temp_orders.length ? temp_orders.length : 10
      );
    }
  };
};

// --------------------------- DISPLAYING ALL ORDERS ON THE DOM -------------------

async function appendOrders(orders, customers, s, e) {
  document.querySelector("tbody").innerHTML = null;

  //   ---- PAGINATION EVENT ----

  let total_pages = Math.ceil(orders.length / 10);
  document.querySelector(".container-pagination .prevP").onclick = () => {
    prev_page(orders);
  };
  document.querySelector(".container-pagination .nextP").onclick = () => {
    next_page(orders, total_pages);
  };

  //   Updating page number and orders number on the Dom

  document.querySelector(
    ".container-pagination > div:first-child"
  ).innerText = `${s + 1} - ${e > orders.length ? orders.length : e} of ${
    orders.length
  } orders`;

  document.querySelector(
    ".container-pagination > div:last-child>span:first-child"
  ).innerText = `${count + 1} of ${total_pages}`;

  //   EXTRACTING EACH PRODUCT DATA

  for (let i = s; i < e; i++) {
    let el = orders[i];
    let { orderId, orderStatus, orderTotal, custId } = el;

    let customer = customers.find((ele) => {
      return ele.id == custId;
    });
    let { full_name, mobile } = customer;
    appendRow(el, orderId, full_name, mobile, orderStatus, orderTotal);
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

// ------------------------------- APPENDING TABLE ROWS ONE BY ONE -------------------------

function appendRow(order, ...data) {
  let tr = document.createElement("tr");
  data.forEach((el, i) => {
    let td = document.createElement("td");
    if (i == 0) {
      td.innerText = "#" + el;
    } else {
      td.innerText = el;
    }
    tr.append(td);
  });
  let td = document.createElement("td");
  td.innerText = "View";
  tr.append(td);
  tr.onclick = () => {
    switchToOrderDetail(order); // EVENT LISTENER TO VIEW ORDER DETAILS
  };
  document.querySelector("tbody").append(tr);
}

// ----------------------------------- FUNCTION TO VIEW ORDER DETAILS --------------------

async function switchToOrderDetail(order) {
  // APPENDING BASIC LAYOUT

  document.querySelector("section").innerHTML = await orderDetail(order);
  let products = order.order;

  // APPENDING ALL THE PRODUCTS IN AN ORDER

  products.forEach((el) => {
    let { image, product_name, quantity, price, discount, total_price } = el;

    productCard(image, product_name, quantity, price, discount, total_price);
  });

  // EVENT LISTENER TO VIEW ALL ORDERS AGAIN

  document.querySelector(".order-page>span:first-child").onclick = () => {
    window.location.reload();
  };

  // CHANGING ORDER STATUS FOR CUSTOMER AS WELL AS FOR THE ADMIN

  document.getElementById("order-status").onchange = (e) => {
    if (e.target.value != "") {
      changeOrderStatus(e, order); // FUNCTION TO CHANGE ORDER STATUS
    }
  };
}

// -------------------------------------- CHANGE ORDER STATUS FUNCTION ----------------------

async function changeOrderStatus(e, order) {
  try {
    let userOrders = await fetch(`${api}/user/${order.custId}`);
    let adminOrders = await fetch(`${api}/admin/rohithanss`);
    userOrders = await userOrders.json();
    let { orders, customers } = await adminOrders.json();

    // update admin orders

    orders.forEach((el, i) => {
      if (el.orderId == order.orderId) {
        orders[i].orderStatus = e.target.value;
      }
    });
    // update admin customers

    customers.forEach((el, i) => {
      if (el.id == order.custId) {
        el.orders.forEach((ele) => {
          if (ele.orderId == order.orderId) {
            ele.orderStatus = e.target.value;
          }
        });
      }
    });

    // patch admin

    await fetch(`${api}/admin/rohithanss`, {
      method: "PATCH",
      body: JSON.stringify({ customers, orders }),
      headers: {
        "content-type": "application/json",
      },
    });

    // update customer orders

    userOrders.orders.forEach((ele) => {
      if (ele.orderId == order.orderId) {
        console.log(ele);
        ele.orderStatus = e.target.value;
      }
    });

    // patch customer

    await fetch(`${api}/user/${order.custId}`, {
      method: "PATCH",
      body: JSON.stringify({ orders: userOrders.orders }),
      headers: {
        "content-type": "application/json",
      },
    });

    //  update on dom

    order.orderStatus = e.target.value;
    switchToOrderDetail(order);

    alertMsg("Order Status updated Successfully", "success");
  } catch (err) {
    alertMsg("some error occurred while updating status", "error");
    console.log(err);
  }
}
// ------------------------------------- PAGINATION FUNCTIONS -----------------------------

function prev_page(allOrders) {
  if (count >= 1) {
    count--;
    let start = count * 10;
    let end = start + 10;
    appendOrders(allOrders, start, end);
  }
}
function next_page(allOrders, total_pages) {
  if (count >= 0 && count < total_pages - 1) {
    count++;
    let start = count * 10;
    let end = start + 10;
    appendOrders(allOrders, start, end);
  }
}
