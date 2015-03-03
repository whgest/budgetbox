import Em from "ember";
import cardStackModel from "../models/card-stack";

export default Em.Route.extend({
	model: function() {
		return cardStackModel.create({
			t: this.t //pass localizer utility
		});
	},
	renderTemplate: function(controller) {
		this.render(controller.get('model.displayedCard.view'), {into: 'application'});
	},
	actions: {
		renderCard: function(card) {
			//create new view here for animation reset?
			this.render(card.get('view'));
		}
	}
});