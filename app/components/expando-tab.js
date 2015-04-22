import Em from "ember";

export default Em.Component.extend({
	classNames: ['expando-container'],
	tabLabel: null,
	isExpanded: false,
	tabLabelLocalized: function() {
		return this.t(this.get('tabLabel'));
	}.property('tabLabel'),
	textContents: null,
	hiddenElementId: function() {
		return this.get('elementId') + '-expando';
	}.on('init').property(),
	hiddenElementIdFmt: function() {
		return '#' + this.get('hiddenElementId');
	}.property('hiddenElementId'),
	caretClass: function() {
		return (this.get('isExpanded')) ? 'fa-caret-up': 'fa-caret-down';
	}.property('isExpanded'),
	locText: function() {
		return this.t(this.get('textContents') + '.%@'.fmt(this.get('cardId')));
	}.property(),
	actions: {
		expando: function() {
			this.toggleProperty('isExpanded');
		}
	}
});