/**
 * Mother of this code:
 * ====================
 * Roland Siegbert <roland.siegbert@gmail.com>
 * Powered by unicorns living on colorful rainbows!
 *
 *
 * Special thanks go to:
 * =====================
 *
 * Vimium:
 * -------
 * Kudos to the vimium project! Actually this is my very first js program
 * I ever wrote and most of the R&D was done there and I ported it to Opera,
 * while learning the bits and pieces of js, Opera and the DOM.
 *
 * Opera-Community and Devs:
 * -------------------------
 * For paciently answering my questions.
 *
 *
 * Thanks go to:
 * =============
 * Vimium - The hacker's browser - http://vimium.github.com/
 * Quirksmode - http://quirksmode.org/
 *
 *
 * TODOs:
 * ======
 * DONE: Open link in new tab
 * DONE: options
 * TODO: Google handling
 *
 */


var DEBUG = true;
var isHelpVisible = false;
var previousKey = 0;
var settingsStorage = widget.preferences;
var settings = {
  excludedURLs:
    "http*://mail.google.com/*\n" +
    "http*://www.google.com/reader/*\n",
  scrollStepLarge: 100,
  scrollStepSmall: 20
};

settings.scrollStepLarge = typeof(settingsStorage.scrollStepLarge) != 'undefined' ? settingsStorage.scrollStepLarge : settings.scrollStepLarge;
settings.scrollStepSmall = typeof(settingsStorage.scrollStepSmall) != 'undefined' ? settingsStorage.scrollStepSmall : settings.scrollStepSmall;
settings.excludedURLs = typeof(settingsStorage.excludedURLs) != 'undefined' ? settingsStorage.excludedURLs : settings.excludedURLs;

/**
 * Controlling the keydown events and launching the appropriate action/service.
 */
window.addEventListener("keydown", function(e) {

  log("KeyDown Event firing: " + e.key);

  // Exit if excluded URL
  if(isExcludedUrl(window.location.href, settings.excludedURLs))
    return;

  // Exit if insertMode!
  if (document.activeElement && isEditable(document.activeElement))
    return;


  switch(e.key) {
    case 'Esc':
      if (isHelpVisible)
        toggleHelp("");
      deactivateLinkHintsMode();
      linkHintsModeActivated = false;
      return;
    case 'k':
    case 'Up':
      window.scrollBy(0, -1 * settings.scrollStepLarge);
      break;
    case 'Down':
    case 'j':
      window.scrollBy(0, settings.scrollStepLarge);
      break;
    case 'Left':
    case 'h':
      window.scrollBy(-1 * settings.scrollStepLarge / 2, 0);
      break;
    case 'Right':
    case 'l':
      window.scrollBy(settings.scrollStepLarge / 2, 0);
      break;
    case 'I':
      toggleHelp(strVar);
      break;
    case 'f':
      activateLinkHintsMode();
      linkHintsModeActivated = true;
      break;
    case 'F':
      activateLinkHintsMode(true);
      linkHintsModeActivated = true;
      break;
    case 'G':
      window.scrollTo(0, document.body.clientHeight);
      break;
    case 'H':
      window.history.back();
      log("history back");
      break;
    case 'L':
      window.history.forward();
      log("history forward");
      break;
    case 't':
      opera.extension.postMessage('createTab');
      break;
    case 'g':
      if(previousKey == 'g') {
        window.scrollTo(0, 0);
      }
      break;
    case 'f':
      window.scrollBy(0, window.innerHeight);
      break;
    case 'b':
      window.scrollBy(0, -1 * window.innerHeight);
      break;
    case 'r':
      window.location.reload();
      break;
    case 'W':
      opera.extension.postMessage('createWindow');
      break;
  }
  //Pretty simple memory
  previousKey = e.key;
}, false);
