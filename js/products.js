const categories_section_html = document.getElementById("categories_section");
const products_section_html = document.getElementById("products_section");
const product_section_html = document.getElementById("product_section");
const products_html = document.getElementById("products");
const categories_html = document.getElementById("categories");

const url_params = new URLSearchParams(window.location.search);
const current_category = url_params.get("category");
const current_product = url_params.get("product")


if (current_category == null) {
  categories_section_html.classList.remove("hidden");
  let categories = query("get_categories");
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
  const brands_html = document.getElementById("brands")
  let brands = []
  document.getElementById("goback").href=`?()`
  let min_price = document.getElementById("min-price");
  let max_price = document.getElementById("max-price");
  let products = query("get_category", [current_category])
  products_html.innerHTML = "";
  products_section_html.classList.remove("hidden");
    for (let product of products) {
      product["Price"] = parseFloat(product["Price"])
      console.log(product["Price"], min_price, max_price)
      if (product["Price"] <= min_price.value) {
        min_price.value = product["Price"]
      }
      if (product["Price"] >= max_price.value) {
        max_price.value = product["Price"]
      }
      if (!brands.includes(product["Brand"])) {
        brands.push(product["Brand"])
      }
      console.log(product)
      products_html.innerHTML += `
<div class="prod main-ct shadow" value="${product["Brand"]}">
    <img src="img/products/${current_category}/${product["Image"]}">
    <label>${product["Name"]}</label>
    <label class="price">€ ${product["Price"]}</label>
    <a class="main-btn" href="/products.html?category=${current_category}&product=${product["PKProduct"]}">View</a>
</div>`;
    }
    for (let brand of brands) {
      brands_html.innerHTML += `
      <label><input type="checkbox" id="${brand}">${brand}</label>
      `
    }
    const checkboxes = brands_html.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', apply_filters);
    });
} else if (current_product != null) {
  product_section_html.classList.remove("hidden");
  let product = query("get_product", [current_product])[0]
  console.log(product)
  product_section_html.querySelector("#product_section img").src=`img/products/${current_category}/${product["Image"]}`
  product_section_html.querySelector("#product_section h1").innerHTML=product["Name"]
  product_section_html.querySelector("#product_section p").innerHTML=product["Description"]
  document.getElementById("cart_button").setAttribute("onclick", `add_cart(${current_product})`)
  document.getElementById("product_price").innerHTML=`€${product["Price"]}`
  document.getElementById("goback").href=`/products.html?category=${current_category}`

}

if(window.location.pathname=="/index.html" || window.location.pathname=="/") {
  console.log("abc")
  let new_products_section = document.getElementById("new_products_section")
  let new_products = query("get_new_products")
  let i =0;
  for(let product of new_products) {
    new_products_section.innerHTML+=`
<div class="prod main-ct white">
    <img src="img/products/${product["FKCategory"]}/${product["Image"]}">
    <label class="twoline">${product["Name"]}</label>
    <label class="price">€ ${product["Price"]}</label>
    <a class="main-btn" href="/products.html?category=${product["FKCategory"]}&product=${product["PKProduct"]}">View</a>
</div>`;
  }
}

function add_cart(item) {
  if (localStorage.getItem("user") == null) {
    window.location.href="/user.html?cart"
  } else {
    let user_data = JSON.parse(localStorage.getItem("user"))
    cart = query("get_cart", user_data)
    if (cart[0]["Cart"] != null) {
      cart = JSON.parse(cart[0]["Cart"])
      cart.push(item)
    } else {
      cart = [item]
    }
    console.log(cart)
    query("update_cart", [user_data[0], user_data[1], JSON.stringify(cart)])
  }
}



function apply_filters() {
  let selected_brands = document.querySelectorAll("input[type='checkbox']:checked")
  let products = document.querySelectorAll(".prod")
  if (selected_brands.length === 0) {
    for (let product of products) {
      product.style.display = "flex";
    }
  } else {
    let brands = []
    for (let brand of selected_brands) {
      brands.push(brand.id)
    }
    for (let product of products) {
      if (brands.includes(product.getAttribute("value"))) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    }
  }
}