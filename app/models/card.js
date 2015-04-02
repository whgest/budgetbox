import Em from "ember";
import CONFIG from "../card-config";

export default Em.Object.extend({
	id: null,
	index: 0,
	isActive: false,
	selection: null,
	showResults: true,
	view: 'card',
	localeDidChange: false,
	didSelectRaise: Em.computed.equal('selection', "raise"),
	didSelectKeep: Em.computed.equal('selection', "keep"),
	didSelectCut: Em.computed.equal('selection', "cut"),
	raisePrompt: function() {
		return this.t("loc.youSpend", this.calcAmount(1));
	}.on('init').property(),
	keepPrompt: function() {
		return this.t("loc.youSpend", this.calcAmount(0));
	}.on('init').property(),
	cutPrompt: function() {
		return this.t("loc.youSpend", this.calcAmount(-1));
	}.on('init').property(),

	modelPropName: function() {
		return this.get('id').camelize();
	}.on('init').property(),

	imagePath: function() {
		return CONFIG.baseImagePath.fmt(this.get('id')) || '';
	}.on('init').property('localeDidChange'),

	textBlockOne: function() {
		return this.t(CONFIG.baseBlockOneLoc.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),

	textBlockTwo: function() {
		return this.t(CONFIG.baseBlockTwoLoc.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),

	cardTitle: function() {
		return this.t(CONFIG.baseTitleLoc.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),

	// cardShortTitle: function() {
	// 	return this.t(CONFIG.baseShortTitleLoc.fmt(this.get('id'))) || '';
	// }.on('init').property('localeDidChange'),
	
	selectionDisplay: function() {
		var operand = this.get('selection');
		var locKey = (operand === "keep") ? 'loc.keptFunding': (operand === "cut") ? 'loc.reducedFunding' : 'loc.raisedFunding';
		return this.t(locKey, this.calcAmount(operand));
	}.on('init').property('selection'),

	calcAmount: function(operand) {
		return '0';
	}
});