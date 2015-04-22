import Em from "ember";
import CONFIG from "../card-config";

export default Em.Route.extend({
	model: function() {
		return this.store.createRecord('userResponse', {id: 0});
	},
	setupController: function(controller, model) {
		this._super(controller, model);
		this.controllerFor('index').set('userResponseModel', this.get('controller.model'));
		this.controllerFor('index').set('userFeedbackModel', this.store.createRecord('userFeedback', {id: 0}));
	},
	actions: {
		postUserResponse: function() {	
			var that = this;		
			this.set('controller.model.submitDate', new Date());
			this.set('controller.model.browserName', this.get('controller.browser.name'));
			this.set('controller.model.browserVersion', this.get('controller.browser.version'));

			if(!CONFIG.devMode) {
				this.get('controller.model').save().then(function(response) {
					that.controllerFor('index').set('userFeedbackModel.row', response.get('row'));
				});			
			}			
			this.controllerFor('index').send('next');
		},
		postFeedback: function() {
			var userFeedbackModel = this.controllerFor('index').get('userFeedbackModel');
			if(!CONFIG.devMode && userFeedbackModel.get('row')) {
				userFeedbackModel.save();				
			}
			this.controllerFor('index').send('next');
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