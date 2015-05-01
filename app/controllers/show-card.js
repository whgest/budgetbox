import Em from "ember";
import CONFIG from "../card-config";

export default Em.Controller.extend({
	needs: ['application', 'index'],
	displayedCardIndex: Em.computed.alias('model.index'),
	districtLinkout: CONFIG.linkToDistrictMap,
	isTransitioning: false,
	anim: "toRight",
	allCards: Em.computed.alias('controllers.index.allCards'),
	userResponseModel: Em.computed.alias('controllers.application.userResponseModel'),
	userFeedbackModel: Em.computed.alias('controllers.application.userFeedbackModel'),
	responseWasSubmitted: Em.computed.alias('controllers.application.responseWasSubmitted'),
	feedbackWasSubmitted: Em.computed.alias('controllers.application.feedbackWasSubmitted'),

	postalCodeIsValid: function() {
		var zip = this.get('userResponseModel.postalCode');		
		return (zip) ? zip.match(/[0-9]{5}/) : false;
	}.property('userResponseModel.postalCode'),

	districtIsValid: function() {
		var district = this.get('userResponseModel.district');		
		return !!district;
	}.property('userResponseModel.district'),

	transitionCard: function(cardIndex) {		
		var allCards = this.get('controllers.index.allCards'),
			newCard = (cardIndex) ? allCards[cardIndex] : allCards[0],
			that = this;
			this.set('anim', (cardIndex > this.get('model.index') ? "toLeft" : "toRight"));
		if (!this.get('isTransitioning')) {
			this.set('isTransitioning', true);
			this.transitionToRoute('showCard', newCard);
			window.scrollTo(0, 0);
			Em.run.later(function() {
				that.setProperties({isTransitioning: false, anim: 'toRight'});
			}, 500);
		}
	},

	localeDidChange: function() {
		this.get('allCards').forEach(function(card) {
			card.notifyPropertyChange('localeDidChange');
		});
	}.observes('controllers.application.localeDidChange'),

	footerString: function() {
		var total = this.get('controllers.index.allCards').filterBy('showResults', true).length;
		return this.t('loc.progress', this.get('model.index').toString(), total.toString());
	}.property('model.index'),

	estimatedTotal: function() {
		var total = 0;
		this.get('allCards').filterBy('showResults', true).mapBy('selectedAmount').forEach(function(i) {total += i;});
		return total;
	}.property('model.index'),

	estimatedTotalText: function() {
		return this.t('loc.estTotal', this.get('estimatedTotal'));
	}.property('estimatedTotal'),

	currentPay: function() {
		var total = 0;
		this.get('allCards').mapBy('baseAmount').forEach(function(i) {total += i;});
		return total;
	}.property('model.index'),

	currentPayText: function() {
		return this.t('loc.baseTotal', this.get('currentPay'));
	}.property('currentPay'),

	totalClass: function() {
		var base = this.get('currentPay'),
			userTotal = this.get('estimatedTotal');
		return (base > userTotal) ? "cut" : (base === userTotal) ? "keep" : "raise";
	}.property('estimatedTotal'),

	actions: {
		submitLandingPage: function() {
			this.set('showZipValidation', !this.get('postalCodeIsValid'));
			this.set('showDistrictValidation', !this.get('districtIsValid'));
			if ((this.get('postalCodeIsValid') && this.get('districtIsValid')) || CONFIG.devMode) {
				this.send('next');
			}
		},

		next: function() {
			var displayedCardIndex = this.get('displayedCardIndex'),
				allCards = this.get('controllers.index.allCards'),
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
			var propName = this.get('model.modelPropName'), 
				that = this;
			this.set('model.selection', operand);
			this.notifyPropertyChange('model.selection');
			this.get('controllers.application.userResponseModel').set(propName, CONFIG.percentChange[operand]);
			Em.run.later(function() {
				that.send('next');
			}, CONFIG.transitionDelay);
		}
	}
});