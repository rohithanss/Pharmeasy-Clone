import { navbar } from "../components/tlnavbar.js";
import {slider} from "../components/tlsection.js"
import {button4} from "../components/tlsection.js"
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