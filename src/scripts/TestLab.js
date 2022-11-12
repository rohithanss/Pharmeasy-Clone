import { navbar } from "../components/tlnavbar.js";
import {slider} from "../components/tlsection.js"
import {button4} from "../components/tlsection.js"
import {footer} from "../components/footer.js"

let nav = document.getElementById("navbar")
nav.innerHTML = navbar()

let buttn4 = document.getElementById("button4")
buttn4.innerHTML = button4()

let fa_bars = document.querySelector(".fa-bars")
fa_bars.onclick = ()=>{
  nav.style.marginBottom = "100px"
}

//slider---------------------------------------------
let slid  = document.getElementById("slider")
slid.innerHTML = slider()

let foot = document.getElementById("footer")
foot.innerHTML = footer()




let Search = document.getElementById("glass")
 Search.onclick = async ()=>{
  let input = document.getElementById("search").value
  
  
  const response = await fetch("http://localhost:1010/admin/monu")
  let refine_data = await response.json()
  let actual_data = refine_data.Lab_Tests[1].All_Test
  let actual_health = refine_data.Lab_Tests[0].Health_Packages
 
let meta = []
  for(let i =0; i<actual_data.length; i++){
    if(actual_data[i].Test_name.includes(input)==true){
      meta.push(actual_data[i])
    }
  }

  for(let i =0; i<actual_health.length; i++){
    if(actual_health[i].name.includes(input)==true){
      meta.push(actual_health[i])
    }
  }
  if(meta.length>0){
    localStorage.setItem("TestPackage",JSON.stringify(meta))
    window.location.href = "Tlsearched.html"
  }
  
}

let myBtn = document.getElementById("myBtn")
myBtn.onclick = ()=>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myBtn.style.display = "block";
  } else {
    myBtn.style.display = "none";
  }
}






let prev = document.querySelector(".prev")
let next  = document.querySelector(".next")

let slideIndex = 1;
showSlides(slideIndex);

prev.onclick = ()=>{
    plusSlides(-1)
}

next.onclick = ()=>{
    plusSlides(1)
}


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

let dot1 = document.querySelector(".dot1")
let dot2 = document.querySelector(".dot2")
let dot3 = document.querySelector(".dot3")
let dot4 = document.querySelector(".dot4")
let dot5 = document.querySelector(".dot5")

dot1.onclick = ()=>{
    currentSlide(1)
}
dot2.onclick = ()=>{
    currentSlide(2)
}
dot3.onclick = ()=>{
    currentSlide(3)
}
dot4.onclick = ()=>{
    currentSlide(4)
}
dot5.onclick = ()=>{
    currentSlide(5)
}

let arr = JSON.parse(localStorage.getItem("Lab_Test")) || []

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}



//-----------------------------------------------

// button4--------------
let ltbutton = document.getElementById("ltbutton")
ltbutton.onclick = ()=>{
  window.location.href = "Alltest.html"
}
let hpbutton = document.getElementById("hpbutton")
hpbutton.onclick = ()=>{
  window.location.href = "HealthPackages.html"
}

let right = document.getElementById("right")
right.onclick = ()=>{
  let f_book = document.getElementById("f_book")
  f_book.scrollLeft -= 400
}


let left = document.getElementById("left")
left.onclick = ()=>{
  let f_book = document.getElementById("f_book")
  f_book.scrollLeft += 400
}



let brl = document.querySelector(".brl")
brl.onclick = ()=>{
  let browsed = document.getElementById("browsed")
  browsed.scrollLeft -= 400
}


let brr = document.querySelector(".brr")
brr.onclick = ()=>{
  let browsed = document.getElementById("browsed")
  browsed.scrollLeft += 400
}




let hel = document.querySelector(".hel")
hel.onclick = ()=>{
  let Health = document.getElementById("Health")
  Health.scrollLeft -= 400
}


let helr = document.querySelector(".helr")
helr.onclick = ()=>{
  let Health = document.getElementById("Health")
  Health.scrollLeft += 400
}



// Previous viewed------------------------
const test_data = async ()=>{
  const response  = await fetch("http://localhost:1010/admin/monu")
  let refine_data = await response.json()
  // {Lab_Test} = refine_data
  apendAll(refine_data.Lab_Tests[1].All_Test)
  apendHealth(refine_data.Lab_Tests[0].Health_Packages)
  apend(refine_data.Lab_Tests[1].All_Test)
  console.log(refine_data.Lab_Tests)
}
test_data()


const apend = (data)=>{
let browsed = document.getElementById("browsed")
browsed.textContent = null
for(let i=8; i<13; i++){
let div = document.createElement("div")
div.onclick = ()=>{
  arr.push(data[i])
  localStorage.setItem("Lab_Test",JSON.stringify(arr))
}
div.setAttribute("class","browsedCard")
let img = document.createElement("img")
let h2  = document.createElement("h3")
let p1 = document.createElement("p")
let p2 = document.createElement("p")
let span1 = document.createElement("span")
let span2 = document.createElement("span")
img.src = data[i].image
h2.textContent = data[i].Test_name
p1.textContent = "Available at 1 certified lab"
span1.textContent = data[i].price
span2.textContent = "Onwards"
p2.append(span1,span2)
div.append(img,h2,p1,p2)
browsed.append(div)

}

}
// -------------------------------

const apendAll = (data)=>{
  let f_booked = document.getElementById("f_book")
  // f_booked.textContent = null
  data.forEach((el)=>{
    let div = document.createElement("div")
    div.setAttribute("class","f_Card")
    div.onclick = ()=>{
      arr.push(el)
      localStorage.setItem("Lab_Test",JSON.stringify(arr))
    }
    let img = document.createElement("img")
    let h2  = document.createElement("h3")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")
    let btn = document.createElement("button")
    btn.innerHTML = `Book Now >`; 
    img.src = el.image
    h2.textContent = el.Test_name
    p1.textContent = "Available at 1 certified lab"
  p2.textContent = el.price
  let div2 = document.createElement("div")
  div2.append(p2,btn)
  div.append(img,h2,p1,div2)
  f_booked.append(div)
  })
  }


  
const apendHealth = (data)=>{
  let Health = document.getElementById("Health")
  // Health.textContent = null
  data.forEach((el)=>{
    let div = document.createElement("div")
    div.setAttribute("class","f_Card")
    div.onclick = ()=>{
      arr.push(el)
      localStorage.setItem("Lab_Test",JSON.stringify(arr))
    }
    let img = document.createElement("img")
    let h2  = document.createElement("h3")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")
    let btn = document.createElement("button")
    // btn.innerHTML = `onwards`;
    img.src = el.image
    h2.textContent = el.name
    p1.textContent = "Available at 1 certified lab"
  p2.textContent = el.price + "  Onwards"
  let div2 = document.createElement("div")
  div2.append(p2,btn)
  div.append(img,h2,p1,p2)
  Health.append(div)
  })
  }


  let a1 = document.querySelector('.a1')
  a1.onclick = ()=>{
  let b1= document.querySelector(".b1")
  b1.style.display = "block"
  let a11 = document.getElementById("a11")
  a11.style.display = "none"
  let a12 = document.getElementById("a12")
  a12.style.display = "block"
  }
  a1.ondblclick = ()=>{
    let b1= document.querySelector('.b1')
    b1.style.display = "none"
     let a11 = document.getElementById("a11")
  a11.style.display = "block"
  let a12 = document.getElementById("a12")
  a12.style.display = "none"
  }

  
  
  let a2 = document.querySelector('.a2')
  a2.onclick = ()=>{
  let b2= document.querySelector(".b2")
  b2.style.display = "block"
  let a21 = document.getElementById("a21")
  a21.style.display = "none"
  let a22 = document.getElementById("a22")
  a22.style.display = "block"

  }
  a2.ondblclick = ()=>{
    let b2= document.querySelector('.b2')
    b2.style.display = "none"
    let a21 = document.getElementById("a21")
    a21.style.display = "block"
    let a22 = document.getElementById("a22")
    a22.style.display = "none"
  }

  
  let a3 = document.querySelector('.a3')
  a3.onclick = ()=>{
  let b3= document.querySelector(".b3")
  b3.style.display = "block"

  let a31 = document.getElementById("a31")
  a31.style.display = "none"
  let a32 = document.getElementById("a32")
  a32.style.display = "block"
  }
  a3.ondblclick = ()=>{
    let b3= document.querySelector('.b3')
    b3.style.display = "none"

    let a31 = document.getElementById("a31")
    a31.style.display = "block"
    let a32 = document.getElementById("a32")
    a32.style.display = "none"
  }

  
  let a4 = document.querySelector('.a4')
  a4.onclick = ()=>{
  let b4= document.querySelector(".b4")
  b4.style.display = "block"

  let a41 = document.getElementById("a41")
  a41.style.display = "none"
  let a42 = document.getElementById("a42")
  a42.style.display = "block"
  }
  a4.ondblclick = ()=>{
    let b4= document.querySelector('.b4')
    b4.style.display = "none"

    let a41 = document.getElementById("a41")
    a41.style.display = "block"
    let a42 = document.getElementById("a42")
    a42.style.display = "none"
  }

  
  let a5 = document.querySelector('.a5')
  a5.onclick = ()=>{
  let b5= document.querySelector(".b5")
  b5.style.display = "block"

  let a51 = document.getElementById("a51")
  a51.style.display = "none"
  let a52 = document.getElementById("a52")
  a52.style.display = "block"
  }


  a5.ondblclick = ()=>{
    let b5= document.querySelector('.b5')
    b5.style.display = "none"

    let a51 = document.getElementById("a51")
    a51.style.display = "block"
    let a52 = document.getElementById("a52")
    a52.style.display = "none"
  }

  
  let a6 = document.querySelector('.a6')
  a6.onclick = ()=>{
  let b6= document.querySelector(".b6")
  b6.style.display = "block"

  let a61 = document.getElementById("a61")
  a61.style.display = "none"
  let a62 = document.getElementById("a62")
  a62.style.display = "block"
  }
  a6.ondblclick = ()=>{
    let b6= document.querySelector('.b6')
    b6.style.display = "none"

    let a61 = document.getElementById("a61")
    a61.style.display = "block"
    let a62 = document.getElementById("a62")
    a62.style.display = "none"
  }

  
  let a7 = document.querySelector('.a7')
  a7.onclick = ()=>{
  let b7= document.querySelector(".b7")
  b7.style.display = "block"

  let a71 = document.getElementById("a71")
  a71.style.display = "none"
  let a72 = document.getElementById("a72")
  a72.style.display = "block"
  }
  a7.ondblclick = ()=>{
    let b7= document.querySelector('.b7')
    b7.style.display = "none"

    let a71 = document.getElementById("a71")
    a71.style.display = "block"
    let a72 = document.getElementById("a72")
    a72.style.display = "none"
  }

  
  let a8 = document.querySelector('.a8')
  a8.onclick = ()=>{
  let b8= document.querySelector(".b8")
  b8.style.display = "block"

  let a81 = document.getElementById("a81")
  a81.style.display = "none"
  let a82 = document.getElementById("a82")
  a82.style.display = "block"
  }


  a8.ondblclick = ()=>{
    let b8= document.querySelector('.b8')
    b8.style.display = "none"

    let a81 = document.getElementById("a81")
    a81.style.display = "block"
    let a82 = document.getElementById("a82")
    a82.style.display = "none"
  }

  
  

  
 