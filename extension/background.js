chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'WORTHPROOF_OPEN_APP') {
    chrome.storage.local.get({ appUrl: 'https://worthproof.com' }, ({ appUrl }) => chrome.tabs.create({ url: appUrl }));
  }
});
