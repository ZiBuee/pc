const categories_section_html = document.getElementById("categories-section");
const products_section_html = document.getElementById("products-section");
const categories_html = document.getElementById("categories");
const products_html = document.getElementById("products");
var categories = get_categories();

for (let category of categories) {
  console.log(category)
  categories_html.innerHTML += `
<div class="prod-ct main-ct shadow">
    <img class="prod-img" src="img/categories/${category["Name"].toLowerCase()}.jpg">
    <button class="main-btn" onclick="load('${category["PKCategory"]}')">${category["Name"]}</button>
</div>
`;
}

function load(PKCategory) {
  var products = get_category(PKCategory)
  products_html.innerHTML = "";
  categories_section_html.classList.add("hidden");
  products_section_html.classList.remove("hidden");
    for (let product of products) {
      console.log(product)
      products_html.innerHTML += `
<div class="prod-ct main-ct shadow">
    <img class="prod-img" src="img/products/${PKCategory}/${product["Image"]}">
    <p>${product["Name"]}</p>
    <p class="price">€ ${product["Price"]}</p>
    <button class="main-btn">View</button>
</div>`;
    }
}

function hide_products() {
  categories_section_html.classList.remove("hidden");
  products_section_html.classList.add("hidden");
}