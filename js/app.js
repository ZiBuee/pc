const components = ["CPU", "Motherboard", "GPU"]

const button_html = "<button class=\"btn-2\">Choose Part</button>"
const tbody = document.getElementById("tbody")
let component
for(let i = 0; i<components.length; i++) {
    
    //component.innerHTML = button_html
    tbody.innerHTML+=
    `<tr>
    <td>${components[i]}</td>
    <td id="${components[i]}">${button_html}</td>
</tr>
    `
}