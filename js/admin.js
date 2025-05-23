var user_data = JSON.parse(localStorage.getItem("user"))
let forbidden = ["PKCategory"]
const url_params = new URLSearchParams(window.location.search);
const object_section = document.getElementById("object_section")
if (user_data == null) {
    window.location.href="/user.html"
}

if (url_params.has("edit")) {
    type = url_params.get("type")
    PK = url_params.get("PK")
    PKValue = url_params.get("PKValue")
    item = su(`SELECT * FROM ${type} WHERE ${PK} = ${PKValue}`)
    console.log(item)
    for(let i = 0; i < Object.keys(item[0]).length; i++) {
        key = Object.keys(item[0])[i]
        value = item[0][key]
        if (forbidden.includes(key) || key.includes("PK")) { continue}
        if (key == "Description") {
            object_section.innerHTML+=`
<div>
<label>${key} :</label>
<textarea id="${key}"> ${value}</textarea>
</div>`
            continue
        }
        object_section.innerHTML+=`
<div>
<label>${key} :</label>
<input id="${key}" value="${value}">
</div>`
    }
    object_section.innerHTML+=`
<button onclick="save()" ">Save</button>`
} else if (window.location.search=="?orders") {
    orders = su("SELECT * FROM orders")
    add(orders, "orders", "orders")
} else if (window.location.search=="?categories") {
    categories = su("SELECT PKCategory, Name FROM categories")
    add(categories, "categories", "PKCategory")
} else if(window.location.search=="?products") {
    products = su("SELECT PKProduct, Name, Price, Image, FKCategory FROM products")
    for (let product in products) {
        product = products[product]
        create_product(product)
    }
}


function add(object, type, PK) {
    for (let column of object){
        for(let i = 0; i < Object.keys(column).length; i++) {
            key = Object.keys(column)[i]
            value = column[Object.keys(column)[i]]
            if (forbidden.includes(key)) { continue}
            document.getElementById("object_section").innerHTML+=`
<div>
<input id="${key}" value="${value}" disabled>
<a href="admin.html?edit&type=${type}&PK=${PK}&PKValue=${column[PK]}">✏️</button>
</div>`
        }
    }
}

function create_product(product) {
    object_section.innerHTML+=`
<div class=prod_preview>
<img src="img/products/${product["FKCategory"]}/${product["Image"]}">
<label>${product["Name"]}</label>
<label class="price">${product["Price"]}</label>
<a href="admin.html?edit&type=products&PK=PKProduct&PKValue=${product["PKProduct"]}">✏️</button>
</div>`
}