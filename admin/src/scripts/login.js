import { login, signup } from "../../../src/scripts/auth.js";
import { alertMsg } from "../../../src/scripts/alertMsg.js";

const form = document.getElementById("admin_login_form");
window.onload = () => {
  form.onsubmit = (e) => {
    e.preventDefault();
    admin_login();
  };

  document.querySelector("#pass_div>i").onclick = (e) => {
    togglePasswordVisibility(e.target);
  };
};

async function admin_login() {
  let username = form.admin_username.value;
  let password = form.admin_password.value;
  if (username == "" || password == "") {
    alertMsg("Fields can not be empty", "fail");
    return;
  }
  let res = await login("admin", username, password);
  if (res.status == "fail" || res.status == "error") {
    alertMsg(res.message, res.status);
  } else {
    localStorage.setItem("admin_details", JSON.stringify(res.details));
    window.location.href = "dashboard.html";
  }
}

function togglePasswordVisibility(btn) {
  let password_field = document.querySelector("#pass_div>input");
  let visibility = password_field.type;

  if (visibility == "text") {
    password_field.type = "password";
    btn.setAttribute("class", "fa-solid fa-eye-slash");
  } else {
    password_field.type = "text";
    btn.setAttribute("class", "fa-solid fa-eye");
  }
}
