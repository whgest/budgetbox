/* global FB */
import Em from "ember";

export default Em.View.extend({
  setupSocialNetworks: function() {
    Em.run.scheduleOnce('afterRender', this, function() {
      FB.XFBML.parse();
    });
}.on('didInsertElement')
});