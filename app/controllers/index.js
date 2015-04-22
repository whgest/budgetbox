import Em from "ember";
import CONFIG from "../card-config";

export default Em.Controller.extend({
	needs: ['application'],
	userResponseModel: null,
	userFeedbackModel: null,
	anim: "toRight",
	displayedCardIndex: Em.computed.alias('model.displayedCard.index'),
	districtLinkout: CONFIG.linkToDistrictMap,

	postalCodeIsValid: function() {
		var zip = this.get('userResponseModel.postalCode');		
		return (zip) ? zip.match(/[0-9]{5}/) : false;
	}.property('userResponseModel.postalCode'),

	districtIsValid: function() {
		var district = this.get('userResponseModel.district');		
		return !!district;
	}.property('userResponseModel.district'),

	transitionCard: function(cardIndex) {
		var newCard = (cardIndex) ? this.get('model.allCards')[cardIndex] : this.get('model.allCards')[0];
		this.set('anim', 
			(cardIndex > this.get('displayedCardIndex')) ? 'toLeft' : 'toRight'
		);		
		this.set('model.displayedCard', newCard);
		window.scrollTo(0, 0);
	},

	localeDidChange: function() {
		this.get('model.allCards').forEach(function(card) {
			card.notifyPropertyChange('localeDidChange');
		});
	}.observes('controllers.application.localeDidChange'),

	footerString: function() {
		var total = this.get('model.allCards').filterBy('showResults', true).length;
		return this.t('loc.progress', this.get('model.displayedCard.index').toString(), total.toString());
	}.property('model.displayedCard'),

	estimatedTotal: function() {
		var total = 0;
		this.get('model.allCards').filterBy('showResults', true).mapBy('selectedAmount').forEach(function(i) {total += i;});
		return total;
	}.property('model.displayedCard'),

	estimatedTotalText: function() {
		return this.t('loc.estTotal', this.get('estimatedTotal'));
	}.property('estimatedTotal'),

	currentPay: function() {
		var total = 0;
		this.get('model.allCards').mapBy('baseAmount').forEach(function(i) {total += i;});
		return total;
	}.property('model.displayedCard'),

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