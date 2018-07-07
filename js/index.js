var appliedFix = null;
var menu = document.getElementById("fix-options");
var checkbox = document.getElementById("toggle-center");

document.body.classList.add("hide-arrows");

menu.onchange = function () {
    document.body.classList.remove(appliedFix);
    appliedFix = menu.selectedOptions[0].value;
    document.body.classList.add(appliedFix);
}

checkbox.onchange = function () {
    if (checkbox.checked) {
        document.body.classList.remove("hide-arrows");
    } else {
        document.body.classList.add("hide-arrows");
    }
}
