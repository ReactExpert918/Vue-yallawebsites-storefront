export default function alertBox(val,status) {
    let alertDiv = document.getElementById("alert");
    alertDiv.classList.add("active");
    if(status) {
        document.getElementsByClassName("active")[0].style.backgroundColor = "#20e26a"
    }
    else {
        document.getElementsByClassName("active")[0].style.backgroundColor = "#e14900"
    }
    setTimeout(clearClass, 4000);
    alertDiv.innerHTML = val;
}

function clearClass() {
    document.getElementById("alert").classList.remove("active");
}
