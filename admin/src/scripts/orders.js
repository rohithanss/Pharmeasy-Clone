import { appendRow } from "./appendRow.js";
import { placeOrder } from "../../../src/scripts/placeOrder.js";
import { container } from "../components/container.js";
import { alertMsg } from "../../../src/scripts/alertMsg.js";
const api = "http://localhost:1010";

window.onload = async () => {
  // ----------DEFAULT APPENDING -----------

  let selected_option = document.querySelector("#orders");
  selected_option.setAttribute("class", "selected");
  document.querySelector("section").innerHTML = container();

  let res = await fetch(`${api}/admin/rohithanss`);
  res = await res.json();
  let orders = res.orders;
  let customers = res.customers;
  orders.reverse();
  appendOrders(orders, customers);

  // ------------- SORTING ORDERS BY TIME --------------------

  document.getElementById("sort-by-date").onchange = () => {
    orders.reverse();
    appendOrders(orders, customers);
  };

  // ------------- FILTERING ORDERS BY ORDER STATUS --------------------

  document.getElementById("filter-by-status").onchange = (e) => {
    if (e.target.value != "") {
      let temp_orders = orders.filter((el) => {
        return el.orderStatus == e.target.value;
      });
      appendOrders(temp_orders, customers);
    } else {
      appendOrders(orders, customers);
    }
  };
};

// --------------------------- DISPLAYING ALL ORDERS ON THE DOM -------------------

async function appendOrders(orders, customers) {
  document.querySelector("tbody").innerHTML = null;
  orders.forEach((el, i) => {
    let { orderId, orderStatus, orderTotal, custId } = el;

    let customer = customers.find((ele) => {
      return ele.id == custId;
    });
    let { full_name, mobile } = customer;
    appendRow(el, orderId, full_name, mobile, orderStatus, orderTotal);
  });

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
