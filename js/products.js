const categories_section_html = document.getElementById("categories-section");
const products_section_html = document.getElementById("products-section");
const products_html = document.getElementById("products");
const categories = ["CPUs", "Motherboards",  "Coolers", "Memory", "GPUs", "Storage", "PSUs", "Cases"];
const smart_categories = {cpus : ["I3.svg", "I5.svg", "I7.svg", "I9.svg", "Ryzen 3.webp", "Ryzen 5.webp", "Ryzen 7.webp", "Ryzen 9.webp"]}
const cpus = [
    "Intel I3-11300",
    "Intel I7-14700",
    "Intel I9-13900",
    "AMD Ryzen 5 7500F",
    "Intel I5-12400F",
    "Intel I7-13700K",
    "Intel I9-14900K",
    "AMD Ryzen 3 4100",
    "AMD Ryzen 5 5600X",
    "AMD Ryzen 7 5800X",
    "AMD Ryzen 9 7950X",
    "Intel I5-14600K",
    "Intel I3-12100",
    "AMD Ryzen 7 7800X3D"
];

let i;
let j;
for(i = 0; i< categories.length; i++) {
    categories_section_html.innerHTML+=`
<div class="ct-square">
    <img class="img-square" src="img/categories/${categories[i].toLowerCase()}.jpg">
    <button class="btn-2" onclick="load('${categories[i].toLowerCase()}')">${categories[i]}</button>
</div>
`;
}


function load(category) {
    products_html.innerHTML = ""
    console.log(category);
    categories_section_html.classList.add("hidden");
    products_section_html.classList.remove("hidden");
    if(category in smart_categories) {
        let img_name
        for(i in cpus) {
            for(j in smart_categories[category]) {
                if (cpus[i].includes(smart_categories[category][j].split(".")[0])) {
                    img_name = smart_categories[category][j]
                }
            }
            products_html.innerHTML+=`
<div class="ct-square">
    <img class="img-square" src="img/products/${category}/${img_name}">
    <p>${cpus[i]}</p>
    <button class="btn-2">View</button>
</div>`;
        }
    } else {
        return;
    }
}


function hide_products() {
    products_section_html.classList.add("hidden")
    categories_section_html.classList.remove("hidden")
}