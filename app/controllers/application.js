import Em from "ember";

export default Em.Controller.extend({
	selectedLocale: 'en',
	languageOption: function() {
		return (this.get('selectedLocale') === 'en') ? 'español' : 'english';
	}.property('selectedLocale'),
	localeDidChange: false
});
