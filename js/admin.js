var user_data = JSON.parse(localStorage.getItem("user"))

if (user_data == null) {
    window.location.href="/user.html"
}

if (window.location.search=="?categories") {
    categories = su("SELECT Name FROM categories")
    add(categories)
} else if(window.location.search=="?products") {
    products = su("SELECT Name, Price, Image FROM products")
    for (let product in products) {
        product = products[product]
        for (const key in product) {
            console.log(product[key])
        }
    }
}


function add(object) {
    for (let column of object){
        for(let i = 0; i < Object.keys(column).length; i++) {
            item = column[Object.keys(column)[i]]
            document.getElementById("object_section").innerHTML+=`
    <p>${item}</p>`
        }
    }
}