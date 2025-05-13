const login_section = document.getElementById("login_section")
const user_section = document.getElementById("user_section")
const cart_section = document.getElementById("cart_section")

const forbidden = ["PKUser", "Is_Admin", "Cart"]
var user;
var user_data = localStorage.getItem("user")


if (user_data == null) {
} else if (window.location.search == "?cart") {
    load_cart()
} else if (window.location.search == "?account") {
    load_account()
}

function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    var user = query("get_account", [email, password])
    localStorage.setItem("user", JSON.stringify([user[0]["Email"], user[0]["Password"]]))
    if (typeof user != "string") {
        console.log("Succes")
        location.reload()
    } else {
        console.log("Invalid Credentials!")
        login_section.querySelector("#login_section p").innerHTML="Invalid Credentials !"
    }
}

function load_account() {
    var user = query("get_account", JSON.parse(localStorage.getItem("user")))
    login_section.classList.add("hidden")
    user_section.classList.remove("hidden")
    let key;
    for (let i = 0; i < Object.keys(user[0]).length; i++) {
        key = Object.keys(user[0])[i]
        if (forbidden.includes(key)) {
            console.log("forbidden : ", key)
        } else {
            if(user[0][key] == null) { user[0][key]="" }
            console.log("unforbidden : ", key)
            if ([""])
            user_section.querySelector("#user_section div").innerHTML += `
<input type="text" name="${key}" id="${key}" placeholder="${key}" value="${user[0][key]}" maxlength="20">`
        }
    }
}

function create_account() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    query("create_account", [email, password])
}

function update_account() {
    var array = []
    for (let i = 0; i < Object.keys(user[0]).length; i++) {
        key = Object.keys(user[0])[i]
        if (!forbidden.includes(key)) {
            array.push(document.getElementById(key).value)
        }
    }
    console.log(array)
    query("update_account", array)
}

function load_cart() {
    login_section.classList.add("hidden")
    user_data = JSON.parse(user_data)
    console.log(user_data)
    var cart = query("get_cart", user_data)[0]["Cart"]
    if(cart != null) {
        cart = JSON.parse(cart)
        for(let i=0; i < cart.length; i++) {
            let product = query("get_product", [cart[i]])[0]
            cart_section.innerHTML+=`
<div class="prod main-ct shadow">
    <img src="img/products/${product["FKCategory"]}/${product["Image"]}">
    <p>${product["Name"]}</p>
    <p class="price">€ ${product["Price"]}</p>
    <a class="main-btn" href="?category=${product["FKCategory"]}&product=${product["PKProduct"]}">View</a>
    <button class="main-btn" onclick="delete_cart(${product["PKProduct"]})">X</button>
</div>`
        }
    }
}

function delete_cart(item) {
    cart = query("get_cart", user_data)
    if (cart[0]["Cart"] != null) {
      cart = JSON.parse(cart[0]["Cart"])
      cart.splice(cart.indexOf(item), 1)
    } else {
      cart = [item]
    }
    console.log(cart)
    query("update_cart", [user_data[0], user_data[1], JSON.stringify(cart)])
    location.reload()
}

function logout() {
    localStorage.clear()
    location.reload()
}