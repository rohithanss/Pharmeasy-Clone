import { showForm } from "./showForm.js";
import { logout } from "./auth.js";

/////////////////////////////////////////////////////////////logo link////////////////////////////////////////////////////

let logo_link = document.querySelector(".logo");
logo_link.style.cursor = "pointer";
logo_link.onclick = () => {
  window.location.href = "index.html";
};

///////////////////////////////////////////////////cart items display//////////////////////////////////////////////////////

let ls_cart = JSON.parse(localStorage.getItem("ls_cart")) || null;
// ls_cart = [1,2,3,4]
if (ls_cart != null) {
  let number = ls_cart.length;
  document.querySelector(".carticon>span").innerHTML = number;
  document.querySelector(".carticon>span").style.display = "inline-block";
}

/////////////////////////////////////////////////////////Login///////////////////////////////////////////////////////////

let user = JSON.parse(localStorage.getItem("user_details")) || null;

if (user != null) {
  let log_in = document.querySelector(".logintext>span:first-child");
  let log_out = document.querySelector("#LogOut");
  log_in.innerHTML = user.full_name.split(" ")[0];
  log_out.style.display = "inline-block";
  log_out.onclick = () => {
    logout();
    window.location.reload();
  };
}

//////////////////////////////////////////////////////// Login form popup/////////////////////////////////////////////////
document.querySelector(".login").onclick = async () => {
  let res = await showForm("login");
  console.log("res", res);

  if (res.status === "success") {
    window.location.reload();
  }
};

///////////////////////////////////////////////////////Links for Different Pages//////////////////////////////////////////

document.querySelector(".personalcareP").onclick = () => {
  window.location.href = "personal_care.html";
};
document.querySelector(".skincareP").onclick = () => {
  window.location.href = "skin_care.html";
};
document.querySelector(".beautyP").onclick = () => {
  window.location.href = "beauty.html";
};
document.querySelector(".homecareP").onclick = () => {
  window.location.href = "home_care.html";
};

////////////////////////////////////////////////show and hide navbar//////////////////////////////////////////////////////

window.onscroll = () => {
  if (window.pageYOffset > 200) {
    console.log("scrolled down");
    document.getElementById("show_hide_navbar").style.display = "block";
  } else if (window.pageYOffset < 200) {
    console.log("scrolled up");
    document.getElementById("show_hide_navbar").style.display = "none";
  }
};

////////////////////////////////////////////////////////lab Test link////////////////////////////////////////////////////
let lbtest = document.getElementById("LabTest");
lbtest.onclick = () => {
  window.location.href = "Test_lab.html";
};

// Login form popup
// document.querySelector(".login").onclick= async () => {
//  let res =  await showForm("login");
//  console.log('res',res);

//  if(res.status === "success"){
//     window.location.reload()
//  }

// }
document.querySelector(".cart").onclick = () => {
  window.location.href = "cartMain.html";
};
document.querySelector(".cart").style = `
cursor: pointer;
`;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let count4 = 0;
document.querySelector("#ltarrow").onclick = () => {
  console.log("clicked");

  if (count4 <= 0) {
    return;
  }
  count4--;
  let val = count4 * 45;
  document.querySelector(".container").style.transform = `translateX(${val}vw)`;
};

document.querySelector("#rtarrow").onclick = () => {
  if (count4 > 0) {
    return;
  }
  count4++;
  let val = count4 * 45;
  document.querySelector(
    ".container"
  ).style.transform = `translateX(-${val}vw)`;
};

//////////////////////////////////////////Payment Offers/////////////////////////////////////////////////////////////

let count = 0;
document.querySelector("#payleft").onclick = () => {
  console.log("clicked");

  if (count == 0) {
    return;
  }
  count--;
  let val = count * 30;
  document.querySelector(
    ".payment_offer_container"
  ).style.transform = `translateX(-${val}vw)`;
};

document.querySelector("#payright").onclick = () => {
  if (count * 30 > 100) {
    return;
  }
  count++;
  let val = count * 30;
  document.querySelector(
    ".payment_offer_container"
  ).style.transform = `translateX(-${val}vw)`;
};

///////////////////////////////////////////////categories////////////////////////////////////////////////////
let count1 = 0;
document.querySelector("#cat_left").onclick = () => {
  console.log("clicked");

  if (count1 == 0) {
    return;
  }
  count1--;
  let val = count1 * 120;
  document.querySelector(
    "#categories_container"
  ).style.transform = `translateX(-${val}px)`;
};

document.querySelector("#cat_right").onclick = () => {
  if (count1 > 4) {
    return;
  }
  count1++;
  let val = count1 * 120;
  document.querySelector(
    "#categories_container"
  ).style.transform = `translateX(-${val}px)`;
};

///////////////////////////////////New Launches and Tending naer you/////////////////////////////////////////////////////////////////////////////////
let count2 = 0;
document.querySelector("#category_left").onclick = () => {
  console.log("clicked");

  if (count2 <= 0) {
    return;
  }
  count2--;
  let val = count2 * 30;
  document.querySelector(
    "#newLaunch_container"
  ).style.transform = `translateX(${val}vw)`;
};

document.querySelector("#category_right").onclick = () => {
  if (count2 >= 2) {
    return;
  }
  count2++;
  let val = count2 * 30;
  document.querySelector(
    "#newLaunch_container"
  ).style.transform = `translateX(-${val}vw)`;
};

/////////////////////////////Features/////////////////////////////////////////////////////////////////////////////

let count5 = 0;
document.querySelector("#feat_left").onclick = () => {
  console.log("clicked");

  if (count5 <= 0) {
    return;
  }
  count5--;
  let val = count5 * 20;
  document.querySelector(
    "#features_container"
  ).style.transform = `translateX(-${val}vw)`;
};

document.querySelector("#feat_right").onclick = () => {
  if (count5 >= 3) {
    return;
  }
  count5++;
  let val = count5 * 20;
  document.querySelector(
    "#features_container"
  ).style.transform = `translateX(-${val}vw)`;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let count6 = 0;
document.querySelector("#lab_left").onclick = () => {
  console.log("clicked");

  if (count6 <= 0) {
    return;
  }
  count6--;
  let val = count6 * 20;
  document.querySelector(
    ".labtest_slider_container"
  ).style.transform = `translateX(-${val}vw)`;
};

document.querySelector("#lab_right").onclick = () => {
  if (count6 >= 4) {
    return;
  }
  count6++;
  let val = count6 * 11;
  document.querySelector(
    ".labtest_slider_container"
  ).style.transform = `translateX(-${val}vw)`;
};

//////////////////////////Tending Near You/////////////////////////////////////////////////////////////////////

let count7 = 0;
document.querySelector("#category_left").onclick = () => {
  console.log("clicked");

  if (count7 <= 0) {
    return;
  }
  count7--;
  let val = count7 * 20;
  document.querySelector(
    "#newLaunch_container"
  ).style.transform = `translateX(-${val}vw)`;
};

document.querySelector("#category_right").onclick = () => {
  if (count7 >= 4) {
    return;
  }
  count7++;
  let val = count7 * 20;
  document.querySelector(
    "#newLaunch_container"
  ).style.transform = `translateX(-${val}vw)`;
};
