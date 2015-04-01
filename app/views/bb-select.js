import Em from "ember";

export default Em.Select.extend({
	layoutName: 'components/bb-select',
	labelLoc: null,
	promptLoc: null,
	label: function () {
		debugger;
		return this.t(this.get('labelLoc'));
	}.property('labelLoc')
});