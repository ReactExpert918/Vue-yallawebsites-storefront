export default function warnBox(val) {
    let alertDiv = document.getElementById("warnalert");
    alertDiv.classList.add("warn");
    setTimeout(warnClass, 4000);
    alertDiv.innerHTML = val;
}

function warnClass() {
    document.getElementById("warnalert").classList.remove("warn");
}