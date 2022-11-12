import {apall} from '../components/AlltestApend.js'
import {navbar} from '../components/tlnavbar.js'
import {footer} from "../components/footer.js"

let nav = document.getElementById("navbar")
nav.innerHTML = navbar()

const fetch_data = async()=>{
    // const response = await fetch("http://localhost:1010/admin/monu")
    // const refine_data = await response.json()
    let m = JSON.parse(localStorage.getItem("TestPackage"))
    apall(m)
//    console.log(refine_data.Lab_Tests[0])
}
fetch_data()


let foot = document.getElementById("footer")
foot.innerHTML = footer()



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