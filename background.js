chrome.action.onClicked.addListener(async (tab) => {
  var url = chrome.runtime.getURL('swagger-ui/index.html')
  chrome.tabs.create({
    url: url,
    selected: true
  });
});

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
//   (e) => console.log(e)
// );
