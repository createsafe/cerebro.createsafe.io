// GLOBAL JS

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Browser Checks

function isIE () {
  return (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0)
}

function isChrome () {
  return navigator.userAgent.indexOf('Chrome') > -1
}

function isSafari () {
  var isSafari = navigator.userAgent.indexOf('Safari') > -1
  return !(isChrome() && isSafari)
}
