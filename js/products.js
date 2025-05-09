const categories_section_html = document.getElementById("categories_section");
const products_section_html = document.getElementById("products_section");
const product_section_html = document.getElementById("product_section");
const categories_html = document.getElementById("categories");
const products_html = document.getElementById("products");

const url_params = new URLSearchParams(window.location.search);
const current_category = url_params.get("category");
const current_product = url_params.get("product")

if (current_category == null) {
  var categories = get_categories();
  for (let category of categories) {
    console.log(category)
    categories_html.innerHTML += `
  <div class="prod main-ct shadow">
      <img src="img/categories/${category["Name"].toLowerCase()}.jpg">
      <a class="main-btn" href="products.html?category=${category["PKCategory"]}">${category["Name"]}</a>
  </div>
  `;
  } 
} else if (current_product == null) {
  var products = get_category(current_category)
  products_html.innerHTML = "";
  categories_section_html.classList.add("hidden");
  products_section_html.classList.remove("hidden");
    for (let product of products) {
      console.log(product)
      products_html.innerHTML += `
<div class="prod main-ct shadow">
    <img src="img/products/${current_category}/${product["Image"]}">
    <p>${product["Name"]}</p>
    <p class="price">€ ${product["Price"]}</p>
    <a class="main-btn" href="?category=${current_category}&product=${product["PKProduct"]}">View</a>
</div>`;
    }
} else if (current_product != null) {
  products_section_html.classList.add("hidden");
  product_section_html.classList.remove("hidden");
  var product = get_product(current_product)[0]
  console.log(product)
  product_section_html.querySelector("#product_section img").src=`img/products/${current_category}/${product["Image"]}`
  product_section_html.querySelector("#product_section h1").innerHTML=product["Name"]
  product_section_html.querySelector("#product_section p").innerHTML=product["Description"]
  document.getElementById("product_price").innerHTML=`€${product["Price"]}`
  document.getElementById("goback_btn").href=`?category=${current_category}`

}