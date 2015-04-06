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
			if(!CONFIG.devMode) {
				this.get('controller.model').save().then(function(response) {
					that.controllerFor('index').set('userFeedbackModel.row', response.get('row'));
				});			
			}			
			this.controllerFor('index').send('next');
		},
		postFeedback: function() {
			if(!CONFIG.devMode) {
				this.controllerFor('index').get('userFeedbackModel').save();				
			}
			this.controllerFor('index').send('next');
		},
		changeLocale: function() {
			var that = this, 
				application = this.container.lookup('application:main'),
				newLocale = (this.get('controller.selectedLocale') === "en") ? "es" : "en";

			Em.set(this.controller, 'selectedLocale', newLocale);
			Em.set(application, 'locale', newLocale);
			Em.run.next(function() {
				that.controller.toggleProperty('localeDidChange');
			});
		}
	}
});