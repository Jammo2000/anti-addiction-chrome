chrome.storage.sync.get({
  delay: 2000,
  message: 'Don\'t feed the addiction!',
    urls: ['facebook.com', 'reddit.com', 'imgur.com', 'instagram.com', 'mail.google.com', 'pinterest.com', 'amazon.com'],
  // DEFAULTS - also change in options.js
}, (settings) => {
  if (settings.urls.some((check) => window.location.href.indexOf(check) >= 0)) {
    delaySite(settings.delay);
  }
});

function delaySite(delay) {
  var div = document.createElement('div');
  div.id = "antiaddiction";
  div.innerHTML = 'Shouldn\'t you be doing something else?';
  div.style.cssText = `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #FFF;
    color: #000;
    padding: 5%;
    font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
    font-size: 2em;
    text-align: center;
    z-index: 2147483647;
  `;
  document.body.appendChild(div);

  setTimeout(() => {
    var elem = document.querySelector('#antiaddiction');
    elem.parentNode.removeChild(elem);
  }, delay);
}