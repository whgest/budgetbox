import Em from "ember";

export default Em.ObjectController.extend({
	canNext: function() {
		return this.get('model.allCards').length > this.get('model.displayedCard.index') + 1;
	}.property('model.displayedCard'),
	canPrev: function() {
		return this.get('model.displayedCard.index') > 0;
	}.property('model.displayedCard'),
	transitionCard: function(operand) {
		var currentCardIndex = this.get('model.displayedCard.index'),
			newCard = (operand) ? this.get('model.allCards')[currentCardIndex + operand] : this.get('model.allCards')[0];
		this.set('model.displayedCard', newCard);
		this.send('renderCard', newCard);
	},
	actions: {
		next: function() {
			if (this.get('canNext')) {
				this.transitionCard(1);
			}
		},
		previous: function() {
			if (this.get('canPrev')) {
				this.transitionCard(-1);
			}
		},
		return: function() {
			this.transitionCard();
		},
		makeSelection: function(operand) {
			this.set('model.displayedCard.selection', operand);
		}
	}
});