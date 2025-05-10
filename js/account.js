const login_section = document.getElementById("login_section")
function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    var user = query("get_account", [email, password, email])
    if (typeof user != "string") {
        console.log("Succes")
        login_section.classList.add("hidden")
        user_section.classList.remove("hidden")
    } else {
        console.log("Invalid Credentials!")
        login_section.querySelector("#login_section p").innerHTML="Invalid Credentials !"
    }
}

function create_account() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    query("create_account", [email, password])
}