/* global FB */
import Em from "ember";

export default Em.View.extend({
	localeDidChange: Em.computed.alias('controller.controllers.application.localeDidChange'),

	setupSocialNetworks: function() {
		Em.run.scheduleOnce('afterRender', this, function() {
			FB.XFBML.parse();
		});
	}.on('didInsertElement')
});