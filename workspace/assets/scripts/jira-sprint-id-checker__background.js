'use strict';

// 状態保持
let isTranslate = false;

// ボタンが押されたら、状態を入れ替えてリロードする
chrome.browserAction.onClicked.addListener(function(tab) {
  isTranslate = !isTranslate;

  // 状態をバッジとして表示する
  if (isTranslate) {
    chrome.browserAction.setBadgeText({text: 'ON' });
  } else {
    chrome.browserAction.setBadgeText({text: ''});
  }

  // chrome.tabs.reload(tab.id);
  chrome.tabs.sendMessage(tab.id, {}, function(msg) {});
});

// contents_scriptからのメッセージ処理
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (isTranslate) {
    switch (request.cmd) {
      case 'isTranslate':
        // 状態の取得
        sendResponse(isTranslate);
        return;

      default: break;
    }
  }

  sendResponse('');
});
