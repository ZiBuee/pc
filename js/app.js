const overlay_html = document.getElementById("overlay-section")

const components = ["CPU", "Motherboard",  "Cooler", "Memory", "GPU", "Storage", "PSU", "Case", "Monitor"];


const tbody = document.getElementById("tbody")
let component
for(let i = 0; i<components.length; i++) {
    
    //component.innerHTML = button_html
    tbody.innerHTML+=
    `<tr>
    <td>${components[i]}</td>
    <td id="${components[i]}"><button class=\"main-btn\" onclick=overlay(${components[i]})>Choose Part</button></td>
</tr>
    `;
}

function overlay(event) {
    if (overlay_html.classList.contains("hidden")) {
        overlay_html.classList.remove("hidden");
    } else if (event.target === event.currentTarget) {
        overlay_html.classList.add("hidden");
    }
}