import Em from "ember";

export default Em.Component.extend({
	classNames: ['results-tab', 'col-xs-12'],
	card: null,
	title: Em.computed.alias('card.cardTitle'),
	selectionText: Em.computed.alias('card.selectionDisplay'),
	click: function() {
		this.sendAction('action', this.get('card.index'));
	}
   
});