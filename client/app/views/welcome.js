import Em from "ember";

export default Em.View.extend({
	localeDidChange: Em.computed.alias('controller.controllers.application.localeDidChange'),
	districtOptions: function() {
		var options = [], that=this;
		for (var i=1; i<=10; ++i) {
			var name = "%@ %@".fmt(that.t("loc.district"), i.toString());
			options.push({"districtNum": i, "districtName": name});
		}
		options.push({"districtNum": -1, "districtName": this.t("loc.dontKnowDistrict")});
		return options;
	}.on('init').property('localeDidChange'),

	districtPrompt: function() {
		return this.t('loc.districtPrompt');
	}.property('localeDidChange')
});