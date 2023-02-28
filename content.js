var CaptureScreenshot = function () {
  var extension = "webp";
  var appendixTitle = "screenshot." + extension;
  var player = document.querySelector("video");
  var canvas = document.createElement("canvas");
  var time = player.currentTime;
  var title = document.title + "-";
  let minutes = Math.floor(time / 60);
  time = Math.floor(time - minutes * 60);
  if (minutes > 60) {
    let hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
    title += hours + "-";
  }
  title += minutes + "-" + time;
  title += " " + appendixTitle;
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);

  var downloadLink = document.createElement("a");
  downloadLink.download = title;
  function DownloadBlob(blob) {
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
  }
  async function ClipboardBlob(blob) {
    const clipboardItemInput = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([clipboardItemInput]);
  }
  canvas.toBlob(async function (blob) {
    await ClipboardBlob(blob);
  }, "image/png");

  canvas.toBlob(async function (blob) {
    DownloadBlob(blob);
  }, "image/" + extension);
};
// 接收快捷键P 截图指令
document.addEventListener("keydown", function (e) {
  if (
    document.activeElement.contentEditable === "true" ||
    document.activeElement.tagName === "INPUT" ||
    document.activeElement.tagName === "TEXTAREA" ||
    document.activeElement.contentEditable === "plaintext"
  )
    return true;
  if (e.key === "p") {
    CaptureScreenshot();
    e.preventDefault();
    return false;
  }
});
// 接收后台 截图指令
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message && message.ev === "take-screenshot") {
    CaptureScreenshot();
  }
});
