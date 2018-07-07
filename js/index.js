var appliedFix = null;
var menu = document.getElementById("fix-options");
var checkbox = document.getElementById("toggle-center");

document.body.classList.add("hide-arrows");

menu.onchange = function () {
    document.body.classList.remove(appliedFix);
    appliedFix = menu.selectedOptions[0].value;
    document.body.classList.add(appliedFix);
    console.log("added " + appliedFix + " class to document body");
}

checkbox.onchange = function () {
    if (checkbox.checked) {
        document.body.classList.remove("hide-arrows");
        console.log("removed hide-arrows class from document body");
    } else {
        document.body.classList.add("hide-arrows");
        console.log("added hide-arrows class to document body");
    }
}
