import Em from "ember";
import CONFIG from "../card-config";

export default Em.Object.extend({
	id: null,
	index: 0,
	isActive: false,
	selection: 'keep',
	view: 'card',
	localeDidChange: false,
	didSelectRaise: Em.computed.equal('selection', 'raise'),
	didSelectKeep: Em.computed.equal('selection', 'keep'),
	didSelectCut: Em.computed.equal('selection', 'cut'),
	imagePath: function() {
		return CONFIG.baseImagePath.fmt(this.get('id'));
	}.on('init').property('localeDidChange'),
	textString: function() {
		return this.t(CONFIG.baseTextLoc.fmt(this.get('id')));
	}.on('init').property('localeDidChange'),
	cardTitle: function() {
		return this.t(CONFIG.baseTitleLoc.fmt(this.get('id')));
	}.on('init').property('localeDidChange'),
	cardShortTitle: function() {
		return this.t(CONFIG.baseShortTitleLoc.fmt(this.get('id')));
	}.on('init').property('localeDidChange'),
	selectionDisplay: function() {
		var operand = this.get('selection');
		if (operand) {
			var locKey = (operand === 'keep') ? 'loc.keptFunding': (operand === 'cut') ? 'loc.reducedFunding' : 'loc.raisedFunding';
			return this.t(locKey);
		}
	}.on('init').property('selection')
});