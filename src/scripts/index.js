
import {showForm} from "./showForm.js";
import {logout} from "./auth.js"

// cart items display
let ls_cart = JSON.parse(localStorage.getItem("ls_cart")) || null;
// ls_cart = [1,2,3,4]
if(ls_cart!=null){
    let number = ls_cart.length;
    document.querySelector(".carticon>span").innerHTML = number;
    document.querySelector(".carticon>span").style.display = "inline-block"
}

let user = JSON.parse(localStorage.getItem("user_details")) || null;

if(user!=null){
    let log_in = document.querySelector(".logintext>span:first-child");
    let log_out = document.querySelector("#LogOut");
    log_in.innerHTML = user.full_name.split(" ")[0];
    log_out.style.display = "inline-block";
    log_out.onclick = ()=>{
        logout()
    window.location.reload()

    }
};

document.querySelector(".personalcareP").onclick = ()=>{
    window.location.href = "personal_care.html"
}
document.querySelector(".skincareP").onclick = ()=>{
    window.location.href = "skin_care.html"
}
document.querySelector(".beautyP").onclick = ()=>{
    window.location.href = "beauty.html"
}
document.querySelector(".homecareP").onclick = ()=>{
    window.location.href = "home_care.html"
}

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

//lab Test link
let lbtest = document.getElementById("LabTest")
lbtest.onclick = () => {
    window.location.href = "Test_lab.html";
};


// Login form popup
document.querySelector(".login").onclick= async () => {
 let res =  await showForm("login");
 console.log('res',res);

 if(res.status === "success"){
    window.location.reload()
 }
 
}





let count4 =0;
    document.querySelector("#ltarrow").onclick = () => {
        console.log("clicked")
        
        if(count4 <= 0){
            return;
        }
        count4--;
        let val = count4 * 45;
        document.querySelector(".container").style.transform = `translateX(${val}vw)`;

    };

    document.querySelector("#rtarrow").onclick = () => {

        if(count4  > 0){
           return;
        }
        count4++;
        let val =count4 *45;
        document.querySelector(".container").style.transform = `translateX(-${val}vw)`;
    };


    /////////////////////////////////////////////////////////////////////////////

let count =0;
    document.querySelector("#payleft").onclick = () => {
        console.log("clicked")
        
        if(count ==0){
            return;
        }
        count--;
        let val = count * 30;
        document.querySelector(".payment_offer_container").style.transform = `translateX(-${val}vw)`;

    };

    document.querySelector("#payright").onclick = () => {

        if(count *30 > 100){
           return;
        }
        count++;
        let val =count *30;
        document.querySelector(".payment_offer_container").style.transform = `translateX(-${val}vw)`;
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////
let count1 =0;
    document.querySelector("#cat_left").onclick = () => {
        console.log("clicked")
        
        if(count1 ==0){
            return;
        }
        count1--;
        let val = count1 * 120;
        document.querySelector("#categories_container").style.transform = `translateX(-${val}px)`;

    };

    document.querySelector("#cat_right").onclick = () => {

        if(count1 > 4){
           return;
        }
        count1++;
        let val =count1 *120;
        document.querySelector("#categories_container").style.transform = `translateX(-${val}px)`;
    };

//3
    let count2 =0;
    document.querySelector("#category_left").onclick = () => {
        console.log("clicked")
        
        if(count2 ==0){
            return;
        }
        count2--;
        let val = count2 * 30;
        document.querySelector("#newLaunch_container").style.transform = `translateX(${val}vw)`;

    };

    document.querySelector("#category_right").onclick = () => {

        if(count2 *30 > 5){
           return;
        }
        count2++;
        let val =count2 *30;
        document.querySelector("#newLaunch_container").style.transform = `translateX(-${val}vw)`;
    };

