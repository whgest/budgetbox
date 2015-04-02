import Em from "ember";

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
			//this.get('model').save();
			this.controllerFor('index').send('next');
		},
		postFeedback: function() {
			//this.get('model').save();
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