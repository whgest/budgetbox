import Em from "ember";
import CardModel from "../models/card";
import CONFIG from "../card-config";

export default Em.Object.extend({
	allCards: [],
	init: function () {
		var that = this,
			cardIndex = 0;
		CONFIG.cards.forEach(function(card) {
			that.get('allCards').push(CardModel.create({
				index: cardIndex, 
				t: that.t //pass localizer utility
			}).setProperties(card));
			cardIndex += 1;
		});
		this.set('displayedCard', this.get('allCards')[0]);
	}
});