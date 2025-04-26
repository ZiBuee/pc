// This script loads the Header and Footer

let header = document.getElementById("header");
let footer = document.getElementById("footer");


header.innerHTML=`
<a href="index.html">
    <img class="logo" src="img/logo.png" onclick="/">
</a>
<nav>
    <a href="index.html">Home</a>
    <a href="app.html">Builder App</a>
    <a href="pricing.html">Pricing</a>
</nav>`;

footer.innerHTML=`
<div>
    <p>Contact</p>
    <p>Abc</p>
    <p>Abc</p>
</div>
`