"use strict";

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    delay: 10000,
    message: 'Shouldn\'t you be doing something else?',
    greyscale: 100,
    urls: ['facebook.com', 'reddit.com', 'imgur.com', 'instagram.com', 'mail.google.com', 'pinterest.com', 'amazon.com', 'feedly.com', 'buzzfeed.com'],
    version: '1.1.0',
    // DEFAULTS - also change in content.js
  }, (items) => {
    document.getElementById('delay').value = Math.round(items.delay / 1000);
    document.getElementById('message').value = items.message;
    document.getElementById('greyscale').value = items.greyscale;
    document.getElementById('urls').value = items.urls.join(',');
  });
}

// Saves options to chrome.storage.sync.
function save_options() {
  const button = document.getElementById('save');
  button.disabled = true;
  button.innerHTML = '...';

  chrome.storage.sync.set({
    delay: document.getElementById('delay').value * 1000,
    message: document.getElementById('message').value,
    greyscale: Math.min(100, Math.max(0 ,+document.getElementById('greyscale').value)),
    urls: document.getElementById('urls').value.split(',').map((url) => url.trim()),
  }, () => {
    // Update status to let user know options were saved.
    button.innerHTML = 'Saved!';
    setTimeout(() => {
      button.innerHTML = 'Save';
      button.disabled = false;
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
