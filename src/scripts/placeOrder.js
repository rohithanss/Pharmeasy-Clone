import { showForm } from "./showForm.js";
const api = "http://localhost:1010";

async function placeOrder(user) {
  if (user == null) {
    showForm("signup");
    return { message: "Login or Signup first to place order", status: "fail" };
  }
  let custId = user.id;
  let orderId = await generateOrderId();
  let order = user.cart;
  let orderStatus = "Placed";
  let orderTotal = cartTotal(user.cart);
  let finalOrder = {
    custId,
    orderId,
    order,
    orderStatus,
    orderTotal,
  };

  //   updating USER cart and orders on the Database

  user.orders.push(finalOrder);

  let cart = [];
  try {
    let res = await fetch(`${api}/user/${custId}`, {
      method: "PATCH",
      body: JSON.stringify({ cart, orders: user.orders }),
      headers: {
        "content-type": "application/json",
      },
    });

    //   updating ADMIN ORDERS and orders on the Database

    let final_customer = await fetch(`${api}/user/${custId}`);
    let admin = await fetch(`${api}/admin/rohithanss`);
    admin = await admin.json();

    final_customer = await final_customer.json();

    let flag = true;
    for (let i = 0; i < admin.customers.length; i++) {
      // console.log(admin.customers[i].id, custId);
      if (admin.customers[i].id == custId) {
        admin.customers[i] = final_customer;
        flag = false;
        break;
      }
    }
    if (flag) {
      admin.customers.push(final_customer);
    }
    admin.orders.push(finalOrder);

    //   Patching changes to server

    let updateAdmin = {
      customers: admin.customers,
      orders: admin.orders,
    };

    let admin_res = await fetch(`${api}/admin/rohithanss`, {
      method: "PATCH",
      body: JSON.stringify(updateAdmin),
      headers: {
        "content-type": "application/json",
      },
    });

    // Updating on the local storage
    localStorage.removeItem("ls_cart");
    return {
      status: "success",
      message: "Order placed successfully",
      data: final_customer,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Some error occurred! try again later.",
    };
  }
}

async function generateOrderId() {
  let res = await fetch(`${api}/orderId/`);
  res = await res.json();
  let orderId = `ord${res.count}`;
  res.count++;
  await fetch(`${api}/orderId/`, {
    method: "PATCH",
    body: JSON.stringify(res),
    headers: {
      "content-type": "application/json",
    },
  });
  return orderId;
}

function cartTotal(cart) {
  let total = cart.reduce((ac, el) => {
    return ac + el.total_price;
  }, 0);
  return total;
}

export { placeOrder };
