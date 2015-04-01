import Em from "ember";
import CONFIG from "../card-config";

export default Em.Controller.extend({
	needs: ['application'],
	userResponseModel: null,
	displayedCardIndex: Em.computed.alias('model.displayedCard.index'),
	districtLinkout: CONFIG.linkToDistrictMap,
	districtPrompt: function() {
		return this.t("loc.districtPrompt");
	}.property(),
	districtOptions: function() {
		var options = [], that=this;
		for (var i=1; i<=10; ++i) {
			var name = "%@ %@".fmt(that.t("loc.district"), i.toString());
			options.push({"districtNum": i, "districtName": name});
		}
		return options;
	}.on('init').property(),

	canNext: function() {
		return this.get('model.allCards').length > this.get('model.displayedCard.index') + 1;
	}.property('model.displayedCard'),

	canPrev: function() {
		return this.get('model.displayedCard.index') > 0;
	}.property('model.displayedCard'),

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
		return this.t("loc.progress", this.get('model.displayedCard.index').toString(), (this.get('model.allCards.length')-2).toString());
	}.property('model.displayedCard'),

	estimatedTotalText: function() {
		return this.t('loc.estTotal', '0');
	}.property('model.displayedCard'),

	actions: {
		next: function() {
			if (this.get('canNext')) {
				this.transitionCard(this.get('displayedCardIndex') + 1);
			}
		},
		previous: function() {
			if (this.get('canPrev')) {
				this.transitionCard(this.get('displayedCardIndex') - 1);
			}
		},
		jumpToCard: function(cardIndex) {
			this.transitionCard(cardIndex);
		},
		makeSelection: function(operand) {
			var propName = this.get('model.displayedCard.modelPropName'), 
				that = this;
			this.set('model.displayedCard.selection', operand);
			this.get('userResponseModel').set(propName, CONFIG.percentChange[operand]);
			Em.run.later(function() {
				that.send('next');
			}, CONFIG.transitionDelay);
		}
	}
});