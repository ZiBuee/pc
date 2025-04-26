const products_html = document.getElementById("products");
const products = ["CPUs", "Motherboards",  "Coolers", "Memory", "GPUs", "Storage", "PSUs", "Cases"];

let i;
for(i = 0; i< products.length; i++) {
    products_html.innerHTML+=`
<div class="product">
    <img class="product-img" src="img/products/${products[i].toLowerCase()}.jpg">
    <button class="product-btn">${products[i]}</button>
</div>
`
}