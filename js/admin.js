const user_data = JSON.parse(localStorage.getItem("user"))
const url_params = new URLSearchParams(window.location.search);
const object_section = document.getElementById("object_section")

const loc = window.location.search

const Type = url_params.get("Type")
const PK = url_params.get("PK")
const PKValue = url_params.get("PKValue")
const New = url_params.get("New")

let item

if (user_data == null) {
    window.location.href="/user.html"
}


if (url_params.has("edit")) {
    edit()
}  else if (loc=="?orders") {
    orders()
}  else if (loc=="?categories") {
    categories()
}  else if(loc=="?products") {
    products()
}

document.getElementById("create_new").href=`?edit&Type=${window.location.search.slice(1)}&New=1`


function create_category(category) {
    object_section.innerHTML+=`
<div>
<input value="${category["Name"]}" disabled>
<a href="admin.html?edit&Type=categories&PK=PKCategory&PKValue=${category["PKCategory"]}">✏️</button>
</div>`
}

function create_product(product) {
    object_section.innerHTML+=`
<div class=prod_preview>
<img src="img/products/${product["FKCategory"]}/${product["Image"]}">
<label>${product["Name"]}</label>
<label class="price">${product["Price"]}</label>
<a href="admin.html?edit&Type=products&PK=PKProduct&PKValue=${product["PKProduct"]}">✏️</button>
</div>`
}

function create_orders(orders) {
    let productsHTML = "";
    products_ids = ""
    for (let order in orders) {
        products_ids+=orders[order]["Items"].slice(1,-1)+","
    }
    products_ids = products_ids.slice(0,-1)
    const products = su(`SELECT PKProduct, Name, Image, FKCategory FROM products WHERE PKProduct IN (${products_ids})`);
    
    for (let order in orders) {
        productsHTML+="<div class='order'>"
        const items = JSON.parse(orders[order]["Items"]);
        for (let i of items) {
            product = products.find(p => p.PKProduct == String(i));
            productsHTML += `
            <div>
                <img src="img/products/${product["FKCategory"]}/${product["Image"]}">
                <span>${product["Name"]}</span>
            </div>`;
        }
        productsHTML += `
        <label class="order-email">Customer: ${orders[order]["Email"]}</label>
        `
        productsHTML += "</div>"
    }
    
    object_section.innerHTML += `
    <div class="orders">
        ${productsHTML}
    </div>`;
}

function orders() {
    let orders = su("SELECT orders.Items, users.Email FROM orders JOIN users ON orders.FKUser = users.PKUser")
    create_orders(orders)
}
function categories() {
    let categories = su("SELECT PKCategory, Name FROM categories")
    for (let category in categories) {
        create_category(categories[category])
    }
}

function products() {
    let products = su("SELECT PKProduct, Name, Price, Image, FKCategory FROM products")
    for (let product in products) {
        create_product(products[product])
    }
}


function edit () {
    if (New == "1") {
        table = su(`describe ${Type}`)
        console.log(item)
        item = {}
        for (let key in table) {
            item[table[key]["Field"]] = ""
        }
        console.log(item)
    } else {
        item = su(`SELECT * FROM ${Type} WHERE ${PK} = ${PKValue}`)[0]
    }
    for(let key in item) {
        let value = item[key]
        if (key.includes("PK")) continue;
        let field
        if (key == "Description") {
            field = `<textarea id="${key}">${value}</textarea>`
        } else {
            field = `<input id="${key}" value="${value}"></input>`
        }
        object_section.innerHTML+=`
<div>
<label>${key} :</label>
${field}
</div>`
    }
    object_section.innerHTML+=`<button onclick="save(item)" ">Save</button>`
}

function save(item) {
    let things = ""
    for(let key in item) {
        if (key.includes("PK")) continue;
        things += `${key} = '${document.getElementById(key).value.replace(/'/g, "''")}',`
    }
    things = things.slice(0, -1)
    su(`UPDATE ${Type} SET ${things} WHERE ${PK} = ${PKValue}`);
    window.location.href = `admin.html?${Type.toLowerCase()}`;
}
