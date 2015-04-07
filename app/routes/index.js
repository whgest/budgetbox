import Em from "ember";
import cardStackModel from "../models/card-stack";

export default Em.Route.extend({
	model: function() {
		return cardStackModel.create({
			t: this.t, //pass localizer utility
		});
	},
	renderTemplate: function(controller) {
		this.render('index', {into: 'application', outlet: 'content'});
		this.render(controller.get('model.displayedCard.view'), {into: 'index', outlet: 'card'});
	}
});