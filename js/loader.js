// This script loads the Header and Footer
let header = document.querySelector("header");
let footer = document.querySelector("footer");

header.innerHTML=`
<a href="index.html">
    <img class="logo" src="img/logo.webp" onclick="/">
</a>
<nav>
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="user.html?account">Account</a>
    <a href="user.html?cart">Cart</a>
</nav>`;

if (window.innerWidth <= 1300) {
    header.innerHTML=`
<div style="display: flex; justify-content: space-between;">
    <a href="index.html">
        <img class="logo" src="img/logo.webp" onclick="/">
    </a>
    <button onclick="menu()">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </button>
</div>
<nav class="hidden" style="flex-direction: column;">
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="user.html?account">Account</a>
    <a href="user.html?cart">Cart</a>
</nav>`;
    header.style.flexDirection = "column";
    header.style.display = "block";
}

footer.innerHTML=`
    <div class="footer-content">
        <div>
            <h4>PC-World</h4>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/products.html">Products</a></li>
                <li><a href="/user.html">Account</a></li>
                <li><a href="/user.html?cart">Cart</a></li>
                <li><a href="/admin.html?orders">Admin</a></li>
            </ul>
        </div>
        
        <div>
            <h4>Work Hours</h4>
            <ul>
                <li>Monday-Friday: 9-18h</li>
                <li>Saturday: 10-18h</li>
                <li>Sunday: Closed</li>
            </ul>
        </div>
        
        <div>
            <h4>Contact Us</h4>
            <ul>
                <li>Email: support@b3n.me</li>
                <li>Phone: +32 498 38 38 38</li>
                <li><a href="https://www.google.com/maps/place/North+Korea">Address: Diestsestraat 163, Leuven</a></li>
            </ul>
        </div>
    </div>
    <p>©2025 PC-World, All rights reserved.</p>
`


function menu() {
    let nav_menu = header.querySelector("nav");
    if (header.querySelector("nav").classList.contains("hidden")) {
        nav_menu.style.height = "0px";
        nav_menu.classList.remove("hidden")
        nav_menu.style.transition = "height 0.3s ease-in-out";
        setTimeout(() => {
            nav_menu.style.height = nav_menu.scrollHeight + "px";
        }, 100)
    } else {
        nav_menu.style.height = "0px"
        setTimeout(() => {
            nav_menu.classList.add("hidden")
        }, 300)
    }
}

/*
        <div>
            <p>PC-World</p>
            <ul>
                <li>Home</li>
                <li>Builder App</li>
                <li>Products</li>
            </ul>
        </div>
*/