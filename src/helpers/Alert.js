export default function alertBox(val) {
    let alertDiv = document.getElementById("alert");
    alertDiv.classList.add("active");
    alertDiv.innerHTML = val;
}