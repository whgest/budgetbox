import Em from "ember";

export default Em.Component.extend({
	classNames: ['results-tab', 'col-xs-12'],
	card: null,
	title: Em.computed.alias('card.cardTitle'),
	selectionText: Em.computed.alias('card.selectionDisplay'),
	iconClass: function() {
		var dir,
			selection = this.get('card.selection');
			dir = (selection === "raise") ? 'up' : (selection === "keep") ? 'right' : 'down'; 
		return 'fa-long-arrow-%@'.fmt(dir);
	}.property('card.selection'),
	click: function() {
		this.sendAction('action', this.get('card.index'));
	}
   
});