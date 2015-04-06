import Em from "ember";

export default Em.View.extend({
	localeDidChange: function() {
		var that = this;
		Em.run.next(function() {
			that.rerender();
		});
	}.observes('controller.controllers.application.localeDidChange'),
});