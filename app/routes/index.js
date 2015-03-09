import Em from "ember";
import cardStackModel from "../models/card-stack";

export default Em.Route.extend({
	model: function() {
		return cardStackModel.create({
			t: this.t //pass localizer utility
		});
	},
	renderTemplate: function(controller) {
		this.render(controller.get('model.displayedCard.view'), {into: 'application', outlet: 'card'});
	},
	actions: {
		renderCard: function(card) {
			//create new view here for animation reset?
			var that = this;
			this.disconnectOutlet({into: 'application', outlet: 'card'});
			Em.run.next(function() {that.render(card.get('view'), {into: 'application', outlet: 'card'});});
		}
	}
});