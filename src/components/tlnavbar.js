const navbar = ()=>{
    return `
    <ul id="container">

        <li class="under" style="display:flex;  align-items: center;">
<a href="index.html"> <img src="./images/logoc.png" id="logo"></a>
 <a href="Test_lab.html" style="color:white; font-size: 20px;">LabTest</a>
        </li>



        <li style="width: 65%;">
            <ul id="part" style="width: 100%;">
             
                <li class="under one" style="width: 160px;border:1px solid black; border-width: 0 1px 0 0;"><a href="#Gif" style="color:#10847e;">Select Pincode <i class="fa-solid fa-caret-down"></i> </a>
                <li style="width: 80%;">  <input  
                    style="min-width: 160px; width: 100%" id="search" type="search" placeholder="Search for Tests/Packages/Labs" id="search" color: #10847e;></li>
             
                <li class="under one glass"><a href="#Translate"><i id="glass" class="fa-solid fa-magnifying-glass"></i></a></li>
            </ul>
        </li>




        <li>
            <input type="checkbox" id="check" >
<label for="check">
<i class="fa-solid fa-bars"></i>
</label>
            <ul id="res">
                <li class="under two"><a href="#Gif">Select Pincode <i class="fa-solid fa-arrow-down-long"></i> </a></li>
              <li>
           
                <li style="width: 200px" id="loginc"><a href="#login" id="login"><i class="fa-solid fa-circle-user"></i> Login/Signup</a> </li>
            </ul>
        </li>
    </ul>
`
}

export {navbar}