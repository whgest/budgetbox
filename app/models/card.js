import Em from "ember";
import CONFIG from "../card-config";

export default Em.Object.extend({
	id: null,
	index: 0,
	selection: null,
	showResults: true,
	view: 'card',
	localeDidChange: false,
	baseAmount: 0,
	didSelectRaise: Em.computed.equal('selection', "raise"),
	didSelectKeep: Em.computed.equal('selection', "keep"),
	didSelectCut: Em.computed.equal('selection', "cut"),

	setSpendPrompts: function() {
		var that = this;
		['raise', 'keep', 'cut'].forEach(function(operand) {
			var prompt = that.t("loc.youSpend", that.calcAmount(operand));
			that.set(operand + 'Prompt', prompt);
		});		
	}.observes('localeDidChange', 'baseAmount'),

	modelPropName: function() {
		return this.get('id').camelize();
	}.on('init').property(),

	imagePath: function() {
		return CONFIG.baseImagePath.fmt(this.get('id')) || '';
	}.on('init'),

	cardTitle: function() {
		return this.t('cardTitle.%@'.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),
	
	selectedAmount: function() {
		var operand = this.get('selection');
		return this.calcAmount(operand);	
	}.property('selection'),

	calcAmount: function(operand) {
		var multiplier = CONFIG.percentChange[operand] / 100,
			amount = Math.round(this.get('baseAmount')  * (1 + multiplier));

		return amount;
	}
});