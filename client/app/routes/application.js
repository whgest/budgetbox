import Em from "ember";
import CONFIG from "../card-config";

export default Em.Route.extend({
	setupController: function(controller) {
		controller.set('userResponseModel', this.store.createRecord('userResponse', {id: 0}));
		controller.set('userFeedbackModel', this.store.createRecord('userFeedback', {id: 0}));
	},
	actions: {
		postUserResponse: function() {	
			var that = this;		
			this.set('controller.userResponseModel.submitDate', new Date());
			this.set('controller.userResponseModel.browserName', this.get('controller.browser.name'));
			this.set('controller.userResponseModel.browserVersion', this.get('controller.browser.version'));

			if(!CONFIG.devMode && !this.controller.get('responseWasSubmitted')) {
				this.get('controller.userResponseModel').save().then(function(response) {
					that.controller.set('userFeedbackModel.row', response.get('row'));
				});			
			}			
			this.controller.set('responseWasSubmitted', true);
			this.controllerFor('showCard').send('next');
		},
		postFeedback: function() {
			var userFeedbackModel = this.controller.get('userFeedbackModel');
			if(!CONFIG.devMode && userFeedbackModel.get('row') && !this.controller.get('feedbackWasSubmitted')) {
				userFeedbackModel.save();				
			}
			this.controller.set('feedbackWasSubmitted', true);
		},
		changeLocale: function() {
			var that = this, 
				application = this.container.lookup('application:main'),
				newLocale = (this.get('controller.selectedLocale') === "en") ? "es" : "en";

			this.controller.set('selectedLocale', newLocale);
			application.set('locale', newLocale);
			Em.run.next(function() {
				that.controller.toggleProperty('localeDidChange');
			});
		}
	}
});