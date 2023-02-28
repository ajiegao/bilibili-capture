document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("capture-screenshot");
  button.addEventListener("click", function () {
    chrome.commands.executeCommand("capture-screenshot");
  });
});
