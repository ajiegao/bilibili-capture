// 后台接收指令 传送给前台
chrome.commands.onCommand.addListener(function (command) {
  if (command === "take-screenshot") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // chrome.scripting.executeScript({
      //   target: { tabId: tabs[0].id },
      //   func: takeScreenShot,
      // });
      chrome.tabs.sendMessage(tabs[0].id, { ev: "take-screenshot" });
    });
  }
});
