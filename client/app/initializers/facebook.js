export function initialize(container, application) {
  // offline mode stubs `FB`
  // if (ENV.offlineMode) { return setupOfflineMode(); }

  // Wait for Facebook to load before allowing the application
  // to fully boot. This prevents `ReferenceError: FB is not defined`
  application.deferReadiness();

  var fbAsyncInit = function() {
    initFacebook(window.FB);
    application.advanceReadiness();
  };

  loadFacebookSDK();

  window.fbAsyncInit = fbAsyncInit;
}

function loadFacebookSDK() {
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

function initFacebook(FB) {
  FB.init({
    appId: '1629709823908410',
    xfbml: true,
    version: 'v2.3'
  });
}

export default {
  name: 'facebook',
  initialize: initialize
};