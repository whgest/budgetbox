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
		return [this.t('loc.genderFemale'), this.t('loc.genderMale')];
	}.on('init').property('localeDidChange'),

	raceOptions: function() {
		return [this.t('loc.raceWhite'), 
				this.t('loc.raceHispanic'), 
				this.t('loc.raceBlack'), 
				this.t('loc.raceNativeAm'), 
				this.t('loc.raceAsian'), 
				this.t('loc.raceOther')]; 
	}.on('init').property('localeDidChange'),

	ageOptions: function() {
		return ['<20', '21-30', '31-40', '41-50', '51-60', '61-70', '>71']; 
	}.on('init').property('localeDidChange')

});