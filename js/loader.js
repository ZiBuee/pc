// This script loads the Header and Footer

let header = document.getElementById("header");
let footer = document.getElementById("footer");


header.innerHTML=`
<a href="index.html">
    <img class="logo" src="img/logo.webp" onclick="/">
</a>
<nav>
    <a href="index.html">Home</a>
    <a href="app.html">Builder App</a>
    <a href="products.html">Products</a>
    <a href="user.html?account">Account</a>
    <a href="user.html?cart">Cart</a>
</nav>`;

footer.innerHTML=`
    <div>
        <div>
            <p>PC-World</p>
            <ul>
                <li>Home</li>
                <li>Builder App</li>
                <li>Products</li>
            </ul>
        </div>
        
        <div>
            <p>PC-World</p>
            <ul>
                <li>Home</li>
                <li>Builder App</li>
                <li>Products</li>
            </ul>
        </div>
        
        <div>
            <p>PC-World</p>
            <ul>
                <li>Home</li>
                <li>Builder App</li>
                <li>Products</li>
            </ul>
        </div>
    </div>
    <p>©2025 PC-World, All rights reserved.</p>
`