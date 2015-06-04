import Em from "ember";

export default Em.Handlebars.makeBoundHelper(function(value, card) {
   var t = this.container.lookup('utils:t'),
   	   formatValue = value + '.%@';
   return t(formatValue.fmt(card.get('id')));
}, 'card.localeDidChange');