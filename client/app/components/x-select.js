import Em from "ember";

export default Em.Component.extend({
	classNames: ['form-group col-xs-12'],
	elementId: null,
	label: null,
	value: null,
	promptLoc: function() {
		return this.t('validationLoc');
	}.property('validationLoc'),	
	content: function() {
		return this.t('validationLoc');
	}.property('validationLoc'),	


	showValidation: false,
	//isValid: Em.computed.not(!'value')),
	validationMsg: function() {
		return this.t('validationLoc');
	}.property('validationLoc'),	


	linkoutHref: null,
	linkoutText: function() {
		return this.t('linkoutLoc');
	}.property('linkoutLoc'),



});