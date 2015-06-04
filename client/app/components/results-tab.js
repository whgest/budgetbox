import Em from "ember";

export default Em.Component.extend({
	classNames: ['results-tab'],
	classNameBindings: ['card.selection'],
	card: null,
	title: Em.computed.alias('card.cardTitle'),
	selectionText: function() {
		var selection = this.get('card.selection'),
			amount = this.get('card.selectedAmount').toString(),
			base = this.get('card.baseAmount').toString();
		if (selection === "keep") {
			return this.t("loc.youKept", base);
		} else {
			return ((selection === "raise") ? this.t("loc.youRaised", amount) : this.t("loc.youLowered", amount));
		}
	}.property('card.selectedAmount'),
	currentPayText: function() {
		var selection = this.get('card.selection'), 
			base = this.get('card.baseAmount').toString();
		return (selection === "keep") ? null : this.t("loc.currentPay", base);
	}.property('card.selection'),
	iconClass: function() {
		var dir,
			selection = this.get('card.selection');
			dir = (selection === "raise") ? 'up' : (selection === "keep") ? 'right' : 'down'; 
		return 'fa-long-arrow-%@'.fmt(dir);
	}.property('card.selection'),
	click: function() {
		if (!this.get('responseWasSubmitted')) {
			this.sendAction('action', this.get('card.index'));
		}
	}
   
});