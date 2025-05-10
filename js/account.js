const login_section = document.getElementById("login_section")
function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    query("get_account", [email, password, email, password])
}

function create_account() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    query("create_account", [email, password])
}