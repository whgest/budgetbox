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
	didSelectRaise: Em.computed.equal('selection', 1),
	didSelectKeep: Em.computed.equal('selection', 0),
	didSelectCut: Em.computed.equal('selection', -1),
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

	servicesTextString: function() {
		return this.t(CONFIG.baseServicesLoc.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),

	providedTextString: function() {
		return this.t(CONFIG.baseProvidedLoc.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),

	cardTitle: function() {
		return this.t(CONFIG.baseTitleLoc.fmt(this.get('id'))) || '';
	}.on('init').property('localeDidChange'),

	// cardShortTitle: function() {
	// 	return this.t(CONFIG.baseShortTitleLoc.fmt(this.get('id'))) || '';
	// }.on('init').property('localeDidChange'),
	
	selectionDisplay: function() {
		var operand = this.get('selection');
		var locKey = (operand === 0) ? 'loc.keptFunding': (operand === -1) ? 'loc.reducedFunding' : 'loc.raisedFunding';
		return this.t(locKey, this.calcAmount(operand));
	}.on('init').property('selection'),

	calcAmount: function(operand) {
		return '0';
	}
});