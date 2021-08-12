export default function alertBox(val) {
    let alertDiv = document.getElementById("alert");
    alertDiv.classList.add("active");
    setTimeout(clearClass, 4000);
    alertDiv.innerHTML = val;
}

function clearClass() {
    document.getElementById("alert").classList.remove("active");
}