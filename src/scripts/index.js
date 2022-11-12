// show and hide navbar

window.onscroll = () => {
    if(window.pageYOffset > 200){
        console.log("scrolled down")
        document.getElementById("show_hide_navbar").style.display = "block";
    } else if(window.pageYOffset < 200){
        console.log("scrolled up")
        document.getElementById("show_hide_navbar").style.display = "none";
    }
}

// slider for offer
let body = document.querySelector("body");
body.onload = showoffer();
 body.onload = showpaymentoffer();


let leftarrow = document.querySelector("#ltarrow");
leftarrow.addEventListener("click", moveleft);

let rightarrow = document.querySelector("#rtarrow");
rightarrow.addEventListener("click", moveright);


// let left =1;
// let right=2;
function showoffer() {
    let left =1;
    let right=2;

    for(let i=left; i<=right; i++){
        document.getElementById("c"+i).style.display = "inline-block";
    
    }
    
}
let left =1;
let right=2;
function moveleft() {
    // let left =1;
    // let right=2;
    console.log("ltclicked")
  if(left <= 1 && right<= 2){
   document.getElementById("c"+left).style.display = "none";
   left +=1;
   right +=1;

      for(let i=left; i<=right; i++){
       document.getElementById("c"+i).style.display = "inline-block";
      }
 } else {
   return; 
}
}


function moveright() {
    // let left =1;
    // let right=2;
   console.log("rtclicked")
  if(left >= 2 && right >= 3){
   document.getElementById("c"+right).style.display = "none";
   left -=1;
   right -=1;

   for(let i=left; i<=right; i++){
    document.getElementById("c"+i).style.display = "inline-block";
   }
} else {
   return; 
}
}


//
let payleftarrow = document.querySelector("#payleft");
payleftarrow.addEventListener("click", paymoveleft);

let payrightarrow = document.querySelector("#payright");
payrightarrow.addEventListener("click", paymoveright);

function showpaymentoffer(){

    let left =1;
    let right=3;

    for(i=left; i<=right; i++){
        document.getElementById("p"+i).style.display = "inline-block";
    }
}

let pleft=1;
let pright=3;

function paymoveleft(){
    //console.log("clicked");
    if(pleft <= 3 && pright<= 6){
        document.getElementById("p"+left).style.display = "none";
        pleft +=1;
        pright +=1;
     
           for(let i=pleft; i<=pright; i++){
            document.getElementById("p"+i).style.display = "inline-block";
           }
      } else {
        return; 
     }

}

function paymoveright() {
   //console.log("rtclicked")
  if(pleft >= 2 && pright >= 5){
   document.getElementById("p"+pright).style.display = "none";
   pleft -=1;
   pright -=1;

   for(let i=pleft; i<=pright; i++){
    document.getElementById("p"+i).style.display = "inline-block";
   }
} else {
   return; 
}
}



let count =0;
    document.querySelector("cat_left").onclick = () => {
        console.log("clicked")
        
        if(count =0){
            return;
        }
        count--;
        let val = count * 10;
        document.getElementById("categories_container").style.transform = `translateX(${val}vw)`;

    };

    document.querySelector("cat_right").onclick = () => {

        if(count * 10 > 100){
           return;
        }
        count++;
        let val =count *10;
        document.getElementById("categories_container").style.transform = `translateX(-${val}vw)`;
    };

