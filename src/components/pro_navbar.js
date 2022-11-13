const navbar = () => {
    return `<div class="top_navbar">
    <div class="top_navbar1">
        <div class="top_navbar1_left">
            <div class="logo">
                <img src="images/logo.png">
            </div>
            <div id="vl"></div>
            <div class="pincode">
                <div class="pincodetitle">
                    <div class="bolt"><img src="https://cdn-icons-png.flaticon.com/512/222/222506.png"></div>
                    <div class="slogon">Express Delivery to</div>    
                </div>
                <div class="pincodenumber">
                    <div class="pincodeDet">201003 Ghaziabd</div>
                </div>
            </div>
        </div>
        <div class="top_navbar1_right">
            <div class="app">
                <div class="mobile"><img src="https://cdn-icons-png.flaticon.com/512/4443/4443113.png" /></div>
                <div class="download"> Download App</div>
            </div>
            <div class="login">
                <div class="user"><img src="https://cdn-icons-png.flaticon.com/512/5087/5087592.png" /></div>
                <div class="logintext"><span>Hello, Log in</span><span id="LogOut">Log out</span></div>
            </div>
            <div class="offer">
                <div class="offericon"><img src="https://cdn-icons-png.flaticon.com/512/3119/3119226.png" /></div>
                <div class="offertext">Offers</div>
            </div>
            <div class="cart">
            <!-- <a href="./cartMain.html">  -->
                <div class="carticon"><img src="https://cdn-icons-png.flaticon.com/512/4296/4296929.png" /><span>1</span> </div>
                <div class="carttext">Cart</div>
            <!-- </a> -->
            </div>
        </div>
    </div>
</div>
<div class="mid_navbar">
            <div class="facility">
                <a href="">Medicine</a>
                <a href="">Healthcare</a>
                <a href="Test_lab.html">Lab Tests</a>
                <a href="">Plus</a>
                <a href="">Offers</a>
                <a href="">Health Blogs</a>
            </div>
        </div>`
}

export {navbar}