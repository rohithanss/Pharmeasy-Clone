const api = "http://localhost:8080";

let cart_Data = JSON.parse(localStorage.getItem("ls_cart")) || [];
display(cart_Data);
function display(cart_Data){
    document.querySelector("#addingcartItems").innerHTML="";
    cart_Data.forEach(function(el,i){
  
  
  let cards = document.createElement("div");
  
  let productImg = document.createElement("img");
  productImg.src=el.image;
  
  let brandname = document.createElement("h3");
  brandname.innerText=el.product_name;

  let price = document.createElement("p");
  price.innerText=+el.total_price;
  
  let btn = document.createElement("button");
  btn.innerText="Remove";
  btn.addEventListener("click",function(event){
      //event.target.parentNode.remove();
     remove(el,i);
  });
  
  cards.append(productImg,brandname,price,btn);
  document.querySelector("#addingcartItems").append(cards);
  
  
  });


function remove(el,i){
    cart_Data.splice(i,1);
     localStorage.setItem("ls_cart", JSON.stringify(cart_Data));
     window.location.reload();
     
     
    }
};