import Em from "ember";

export default Em.View.extend({
	localeDidChange: Em.computed.alias('controller.controllers.application.localeDidChange'),
	districtPrompt: function() {
		return this.t('loc.districtPrompt');
	}.property('localeDidChange'),
	agePrompt: function() {
		return this.t('loc.agePrompt');
	}.property('localeDidChange'),
	racePrompt: function() {
		return this.t('loc.racePrompt');
	}.property('localeDidChange'),
	genderPrompt: function() {
		return this.t('loc.genderPrompt');
	}.property('localeDidChange'),

	districtOptions: function() {
		var options = [], that=this;
		for (var i=1; i<=10; ++i) {
			var name = "%@ %@".fmt(that.t("loc.district"), i.toString());
			options.push({"districtNum": i, "districtName": name});
		}
		options.push({"districtNum": -1, "districtName": this.t("loc.dontKnowDistrict")});
		return options;
	}.on('init').property('localeDidChange'),

	genderOptions: function() {
		return ['Female', 'Male'];
	}.on('init').property('localeDidChange'),

	raceOptions: function() {
		return ['Human', 'Dwarf', 'Halfling']; 
	}.on('init').property('localeDidChange'),

	ageOptions: function() {
		return ['0 to 130 years']; 
	}.on('init').property('localeDidChange'),

});