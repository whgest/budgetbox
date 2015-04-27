import Em from "ember";
import CardModel from "../models/card";
import CONFIG from "../card-config";

export default Em.Route.extend({
	isInitialRender: true,
	init: function() {
		var that = this,
			cardIndex = 0;
		CONFIG.cards.forEach(function(card) {
			that.controllerFor('index').get('allCards').push(CardModel.create({
				index: cardIndex, 
				t: that.t, //pass localizer utility
				id: card.id,
			}).setProperties(card));
			cardIndex += 1;
		});
	},
	afterModel: function(model, transition) {
		//redirect to first card on first render
		if(this.get('isInitialRender') && model.index !== 0) {
			this.set('isInitialRender', false);
			transition.abort();
			this.transitionTo('showCard', this.controllerFor('index').get('allCards').findBy('index', 0));
		} else {
			this.set('isInitialRender', false);
		}
	},
	model: function(params) {
		return this.controllerFor('index').get('allCards').findBy('id', params.card_id);
	},
	renderTemplate: function() {
		var view = this.get('controller.model.view');
		this.render(view, {into: 'application', outlet: 'content'});
	}
});