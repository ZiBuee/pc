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
    <div>
        <div>
            <p>Work Hours</p>
            <ul>
                <li>Monday-Friday: 9-18h</li>
                <li>Saturday: 10-18h</li>
                <li>Sunday: Closed</li>
            </ul>
        </div>
        
        <div>
            <p>PC-World</p>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/products.html">Products</a></li>
                <li><a href="/user.html">Account</a></li>
                <li><a href="/user.html?cart">Cart</a></li>
            </ul>
        </div>
    </div>
    <p>©2025 PC-World, All rights reserved.</p>
`


function menu() {
    if (header.querySelector("nav").classList.contains("hidden")) {
        header.querySelector("nav").classList.remove("hidden")
    } else {
        header.querySelector("nav").classList.add("hidden")
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