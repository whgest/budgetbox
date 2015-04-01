import Em from "ember";

export default Em.Component.extend({
	tabLabel: null,
	tabLabelLocalized: function() {
		return this.t(this.get('tabLabel'));
	}.property('tabLabel'),
	textContents: null,
	hiddenElementId: function() {
		return this.get('elementId') + 'hidden';
	}.on('init').property(),
	hiddenElementIdFmt: function() {
		return '#' + this.get('hiddenElementId');
	}.property('hiddenElementId'),
    actions:{
        callAction:function(item){
            this.sendAction('action', this.get('actionParam') || item);
        }
    }
});