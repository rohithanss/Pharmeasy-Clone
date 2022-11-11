import { alertMsg } from "../../../src/scripts/alertMsg.js";

const api = "http://localhost:1010";
let count = 0;

window.onload = async () => {
  let allCategories = [];
  let count1 = 1;
  let temp;
  try {
    temp = await fetch(`${api}/admin/rohithanss`);
    temp = await temp.json();
    temp = await temp.products;
  } catch (err) {
    alertMsg("Error occurred while fetching Categories", "error");
    console.log(err);
  }

  for (let k in temp) {
    let cat_name = k.split("");
    cat_name[0] = cat_name[0].toUpperCase();
    cat_name = cat_name.join("");
    let cat;
    if (k[0] == "h") {
      cat = "hc";
    } else if (k[0] == "p") {
      cat = "per";
    } else if (k[0] == "s") {
      cat = "sc";
    } else if (k[0] == "b") {
      cat = "Beauty";
    }

    let prod = temp[k];
    prod = prod.reduce((acc, el) => {
      return acc + +el.quantity;
    }, 0);
    let obj = {
      num: count1++,
      name: cat_name,
      products: temp[k].length,
      cat,
      totalStock: prod,
    };

    allCategories.push(obj);
  }

  appendData(
    allCategories,
    0,
    10 > allCategories.length ? allCategories.length : 10
  );

  //   ---- SORTING  BY Total Stock EVENT ----

  document.getElementById("sort-by-total-stock").onchange = (e) => {
    count = 0;
    if (e.target.value == "lh") {
      allCategories.sort((a, b) => {
        return +a.totalStock - +b.totalStock;
      });
      appendData(
        allCategories,
        0,
        10 > allCategories.length ? allCategories.length : 10
      );
    } else if (e.target.value == "hl") {
      allCategories.sort((a, b) => {
        return +b.totalStock - +a.totalStock;
      });
      appendData(
        allCategories,
        0,
        10 > allCategories.length ? allCategories.length : 10
      );
    }
  };
  //   ---- SORTING  BY Number of Products EVENT ----

  document.getElementById("sort-by-total-products").onchange = (e) => {
    if (e.target.value == "lh") {
      allCategories.sort((a, b) => {
        return +a.products - +b.products;
      });
      appendData(
        allCategories,
        0,
        10 > allCategories.length ? allCategories.length : 10
      );
    } else if (e.target.value == "hl") {
      allCategories.sort((a, b) => {
        return +b.products - +a.products;
      });
      appendData(
        allCategories,
        0,
        10 > allCategories.length ? allCategories.length : 10
      );
    }
  };
};
async function appendData(allCategories, s, e) {
  document.querySelector("tbody").innerHTML = null;

  //   ---- PAGINATION EVENT ----

  let total_pages = Math.ceil(allCategories.length / 10);
  document.querySelector(".container-pagination .prevP").onclick = () => {
    prev_page(allCategories);
  };
  document.querySelector(".container-pagination .nextP").onclick = () => {
    next_page(allCategories, total_pages);
  };

  //   Updating page number and allCategories number on the Dom

  document.querySelector(
    ".container-pagination > div:first-child"
  ).innerText = `${s + 1} - ${
    e > allCategories.length ? allCategories.length : e
  } of ${allCategories.length} Categories`;

  document.querySelector(
    ".container-pagination > div:last-child>span:first-child"
  ).innerText = `${count + 1} of ${total_pages}`;

  //   EXTRACTING EACH Category DATA

  for (let i = s; i < e; i++) {
    let category = allCategories[i];
    let { num, name, cat, products, totalStock } = category;
    appendRow(num, name, cat, products, totalStock);
  }
  // HOVER EFFECT FOR THE TABLE ROWS

  let rows = document.querySelectorAll("tbody>tr");
  rows.forEach((el) => {
    el.onmouseover = (e) => {
      e.path[1].children[0].style.color = "rgb(180, 92, 235)";
      e.path[1].children[4].style.color = "rgb(180, 92, 235)";
    };
    el.onmouseout = (e) => {
      e.path[1].children[0].style.color = e.path[1].children[1].style.color;
      e.path[1].children[4].style.color = e.path[1].children[1].style.color;
    };
  });
}
// ------------------------------- APPENDING TABLE ROWS ONE BY ONE -------------------------

function appendRow(...data) {
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

  document.querySelector("tbody").append(tr);
}

// ------------------------------------- PAGINATION FUNCTIONS -----------------------------

function prev_page(allCategories) {
  if (count >= 1) {
    count--;
    let start = count * 10;
    let end = start + 10;
    appendData(allCategories, start, end);
  }
}
function next_page(allCategories, total_pages) {
  if (count >= 0 && count < total_pages - 1) {
    count++;
    let start = count * 10;
    let end = start + 10;
    appendData(allCategories, start, end);
  }
}
