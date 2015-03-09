import Em from "ember";

export default Em.Controller.extend({
	availableLocales: [
		{langCode: 'en', displayText: 'English'}, 
		{langCode:'es', displayText:'Español'}
	],
	selectedLocale: 'en',
	localeDidChange: false,
	changeLocale: function() {
		var that = this,
			application = this.container.lookup('application:main');
		Em.set(application, 'locale', this.get('selectedLocale'));
		Em.run.next(function() {
			that.toggleProperty('localeDidChange');
		});
	}.observes('selectedLocale')	
});
