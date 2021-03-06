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
	},
	textBlockOneFormatted: function() {
		var id = this.get('id'),
			elements = this.t('textBlockOne.' + id).split("|"),
			list = '';

			elements.forEach(function(element) {
				list += ("<li>%@</li>".fmt(element));
			});
			return "<ul>%@</ul>".fmt(list);

	}.on('init').property(),

	textBlockTwoFormatted: function() {
		var id = this.get('id'),
			elements = this.t('textBlockTwo.' + id).split("|"),
			list = '';

			elements.forEach(function(element) {
				list += ("<p>%@</p>".fmt(element));
			});
			return list;

	}.on('init').property(),
});