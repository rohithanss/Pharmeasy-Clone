
const apall = (data)=>{

    let testInfo = document.getElementById("testInfo")
testInfo.textContent = null
data.forEach((el)=>{
 let div = document.createElement("div")
 let div1 = document.createElement("div")
 let img = document.createElement("img")
 img.src  = el.image
 div1.append(img)
 let h2 = document.createElement("h2")
 h2.innerText = el.name
 let p1 = document.createElement("p")
 p1.innerText = "Available at Mars Pharmecy"
 let p2 = document.createElement("span")
let random = Math.floor(Math.random()*20 + 4)

let p3 = document.createElement("p")
p3.innerText = `includes ${random} tests`

let mn = Math.floor(el.price*.8)

p2.innerHTML = el.price + "  " 
p2.style.textDecoration = "line-through"
p2.style.color = "red"
p2.style.marginLeft = "10px"
let p4 = document.createElement("span")
p4.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>  ` +  mn
 let btn = document.createElement("button")
 btn.innerText = "Select"
 let div2 = document.createElement("div")

 let div3 = document.createElement("div")
 let div4 = document.createElement("div")
 div4.append(p4,p2)
 div4.style.marginTop = "15px"
 p1.style.marginBottom  = "10px"
 p3.style.background = "#f2fff8"
 p3.style.color = "green"
 p3.style.padding  = "10px"
 p3.style.borderRadius  = "10px"
 div3.append(btn)
 div2.append(h2,p1,p3,div4)
 h2.style.marginBottom = "15px"
div.append(div1,div2,div3)
testInfo.append(div)
})
}

export {apall}