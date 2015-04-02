import Em from "ember";
import CONFIG from "../card-config";

export default Em.Controller.extend({
	needs: ['application'],
	userResponseModel: null,
	userFeedbackModel: null,
	displayedCardIndex: Em.computed.alias('model.displayedCard.index'),
	districtLinkout: CONFIG.linkToDistrictMap,
	districtPrompt: function() {
		return this.t("loc.districtPrompt");
	}.property(),
	agePrompt: function() {
		return this.t("loc.agePrompt");
	}.property(),
	racePrompt: function() {
		return this.t("loc.racePrompt");
	}.property(),
	districtOptions: function() {
		var options = [], that=this;
		for (var i=1; i<=10; ++i) {
			var name = "%@ %@".fmt(that.t("loc.district"), i.toString());
			options.push({"districtNum": i, "districtName": name});
		}
		return options;
	}.on('init').property(),

	transitionCard: function(cardIndex) {
		var newCard = (cardIndex) ? this.get('model.allCards')[cardIndex] : this.get('model.allCards')[0];
		this.set('model.displayedCard', newCard);
		this.send('renderCard', newCard);
	},

	localeDidChange: function() {
		this.get('model.allCards').forEach(function(card) {
			card.notifyPropertyChange('localeDidChange');
		});
	}.observes('controllers.application.localeDidChange'),

	footerString: function() {
		var total = this.get('model.allCards').filterBy('showResults', true).length;
		return this.t("loc.progress", this.get('model.displayedCard.index').toString(), total.toString());
	}.property('model.displayedCard'),

	estimatedTotalText: function() {
		return this.t('loc.estTotal', '0');
	}.property('model.displayedCard'),

	actions: {
		next: function() {
			var displayedCardIndex = this.get('displayedCardIndex'),
				allCards = this.get('model.allCards'),
				nextCardNeedingSelection = 0;
			for(var i=displayedCardIndex + 1; i<allCards.length; i++) {
				if(!allCards[i].get('selection')) {
					nextCardNeedingSelection = i;
					break;
				}
			}
			this.transitionCard(nextCardNeedingSelection);
		},
		previous: function() {
			this.transitionCard(this.get('displayedCardIndex') - 1);
			
		},
		jumpToCard: function(cardIndex) {
			this.transitionCard(cardIndex);
		},
		makeSelection: function(operand) {
			var propName = this.get('model.displayedCard.modelPropName'), 
				that = this;
			this.set('model.displayedCard.selection', operand);
			this.notifyPropertyChange('model.displayedCard.selection');
			this.get('userResponseModel').set(propName, CONFIG.percentChange[operand]);
			Em.run.later(function() {
				that.send('next');
			}, CONFIG.transitionDelay);
		}
	}
});