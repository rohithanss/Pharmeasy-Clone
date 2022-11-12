import { loginForm, signupForm } from "../components/login_signup_forms.js";
import { login, signup } from "./auth.js";
import { alertMsg } from "./alertMsg.js";

async function showForm(type) {
  if (type == "login") {
    document.getElementById("overLay-box").innerHTML = loginForm();
    document.getElementById("overLay").style.display = "block";

    document.onclick = (e) => {
      if (
        (e.target.id == "overLay" || e.target.id == "close-overLay-box") &&
        e.target.id != "overLay-box" &&
        e.target.id != "closeAlert"
      ) {
        document.getElementById("overLay").style.display = " none";
        document.getElementById("overLay-box").innerHTML = null;
      }
    };
    document.getElementById("log-in").onclick = async (e) => {
      e.preventDefault();
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      let response = await login("user", username, password);
      alertMsg(response.message, response.status);
      if (response.status == "success") {
        document.getElementById("overLay").style.display = " none";
        document.getElementById("overLay-box").innerHTML = null;
      }
    };
  } else if (type == "signup") {
    document.getElementById("overLay-box").innerHTML = signupForm();
    document.getElementById("overLay").style.display = "block";
    document.onclick = (e) => {
      if (
        (e.target.id == "overLay" || e.target.id == "close-overLay-box") &&
        e.target.id != "overLay-box" &&
        e.target.id != "closeAlert"
      ) {
        document.getElementById("overLay").style.display = "none";
        document.getElementById("overLay-box").innerHTML = null;
      }
    };
    document.getElementById("sign-up").onclick = async (e) => {
      e.preventDefault();
      let name = document.getElementById("name").value;
      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let mobile = document.getElementById("mobile").value;
      let password = document.getElementById("password").value;

      let response = await signup(username, name, email, mobile, password);
      alertMsg(response.message, response.status);
      if (response.status == "success") {
        showForm("login");
      }
    };
  }
  document.querySelector("#pass_div>i").onclick = (e) => {
    togglePasswordVisibility(e.target);
  };
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
}

export { showForm };
