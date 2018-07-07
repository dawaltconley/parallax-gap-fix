window.onload = function () {
  var appliedFix = null;
  var menu = document.getElementById("fix-options");
  menu.onchange = function () {
    document.body.classList.remove(appliedFix);
    appliedFix = menu.selectedOptions[0].value;
    document.body.classList.add(appliedFix)
  }
}