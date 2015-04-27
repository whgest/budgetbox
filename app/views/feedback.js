/* global FB */
import Em from "ember";

export default Em.View.extend({
	localeDidChange: Em.computed.alias('controller.controllers.application.localeDidChange'),

	setupSocialNetworks: function() {
		Em.run.scheduleOnce('afterRender', this, function() {
			FB.XFBML.parse();
		});
	}.on('didInsertElement'),

	agePrompt: function() {
		return this.t('loc.agePrompt');
	}.property('localeDidChange'),
	racePrompt: function() {
		return this.t('loc.racePrompt');
	}.property('localeDidChange'),
	genderPrompt: function() {
		return this.t('loc.genderPrompt');
	}.property('localeDidChange'),

	genderOptions: function() {
		return ['Female', 'Male'];
	}.on('init').property('localeDidChange'),

	raceOptions: function() {
		return ['Human', 'Dwarf', 'Halfling']; 
	}.on('init').property('localeDidChange'),

	ageOptions: function() {
		return ['0 to 130 years']; 
	}.on('init').property('localeDidChange')
});