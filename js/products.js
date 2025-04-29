const categories_section_html = document.getElementById("categories-section");
const products_section_html = document.getElementById("products-section");
const categories_html = document.getElementById("categories");
const products_html = document.getElementById("products");
const categories = ["CPUs", "Motherboards",  "Coolers", "Memory", "GPUs", "Storage", "PSUs", "Cases"];
const smart_categories = {cpus : ["i3.svg", "i5.svg", "i7.svg", "i9.svg", "Ryzen 3.webp", "Ryzen 5.webp", "Ryzen 7.webp", "Ryzen 9.webp"]}
const cpus = [
    "Intel Core i3-11300 Processor - 4 Cores, 8 Threads, up to 4.4GHz (11th Gen)",
    "Intel Core i7-14700 Processor - 20 Cores, 28 Threads, up to 5.4GHz (14th Gen)",
    "Intel Core i9-13900 Processor - 24 Cores, 32 Threads, up to 5.6GHz (13th Gen)",
    "AMD Ryzen 5 7500F Processor - 6 Cores, 12 Threads, up to 5.0GHz (Zen 4)",
    "Intel Core i5-12400F Processor - 6 Cores, 12 Threads, up to 4.4GHz (12th Gen)",
    "Intel Core i7-13700K Processor - 16 Cores, 24 Threads, up to 5.4GHz (Unlocked, 13th Gen)",
    "Intel Core i9-14900K Processor - 24 Cores, 32 Threads, up to 6.0GHz (Unlocked, 14th Gen)",
    "AMD Ryzen 3 4100 Processor - 4 Cores, 8 Threads, up to 4.0GHz (Zen 2)",
    "AMD Ryzen 5 5600X Processor - 6 Cores, 12 Threads, up to 4.6GHz (Zen 3)",
    "AMD Ryzen 7 5800X Processor - 8 Cores, 16 Threads, up to 4.7GHz (Zen 3)",
    "AMD Ryzen 9 7950X Processor - 16 Cores, 32 Threads, up to 5.7GHz (Zen 4)",
    "Intel Core i5-14600K Processor - 14 Cores, 20 Threads, up to 5.3GHz (Unlocked, 14th Gen)",
    "Intel Core i3-12100 Processor - 4 Cores, 8 Threads, up to 4.3GHz (12th Gen)",
    "AMD Ryzen 7 7800X3D Processor - 8 Cores, 16 Threads, up to 5.0GHz (3D V-Cache, Zen 4)",
    "i3 Blyat"
];

let i;
let j;
for(i = 0; i< categories.length; i++) {
    categories_html.innerHTML+=`
<div class="prod-ct">
    <img class="prod-img" src="img/categories/${categories[i].toLowerCase()}.jpg">
    <button class="main-btn" onclick="load('${categories[i].toLowerCase()}')">${categories[i]}</button>
</div>
`;
}


function load(category) {
    products_html.innerHTML = ""
    console.log(category);
    categories_section_html.classList.add("hidden")
    products_section_html.classList.remove("hidden")
    if(category in smart_categories) {
        let img_name
        for(i in cpus) {
            for(j in smart_categories[category]) {
                if (cpus[i].includes(smart_categories[category][j].split(".")[0])) {
                    img_name = smart_categories[category][j]
                }
            }
            products_html.innerHTML+=`
<div class="prod-ct">
    <img class="prod-img" src="img/products/${category}/${img_name}">
    <p>${cpus[i]}</p>
    <p class="price">€199.99</p>
    <button class="main-btn">View</button>
</div>`;
        }
    } else {
        return;
    }
}


function hide_products() {
    categories_section_html.classList.remove("hidden")
    products_section_html.classList.add("hidden")
}