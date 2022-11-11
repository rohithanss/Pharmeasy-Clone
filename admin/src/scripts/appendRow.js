import { orderDetail } from "../components/orderDetail.js";
import { productCard } from "../components/productCard.js";
import { alertMsg } from "../../../src/scripts/alertMsg.js";
const api = "http://localhost:1010";

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

export { appendRow };

// ----------------------------------- FUNCTION TO VIEW ORDER DETAILS --------------------

async function switchToOrderDetail(order) {
  // APPENDING BASIC LAYOUT

  document.querySelector("section").innerHTML = await orderDetail(order);
  let products = order.order;

  // APPENDING ALL THE PRODUCTS IN AN ORDER

  products.forEach((el) => {
    let { image, product_name, quantity, price, total_price } = el;
    let div = document.createElement("div");
    div.innerHTML = productCard(
      image,
      product_name,
      quantity,
      price,
      total_price
    );
    document.querySelector(".order-products").append(div);
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
