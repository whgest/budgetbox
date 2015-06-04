import Em from "ember";
import CONFIG from "../card-config";

export default Em.Route.extend({
	redirect: function() {
		var firstCardId = CONFIG.cards[0].id;
		this.transitionTo('showCard', firstCardId);
	}
});