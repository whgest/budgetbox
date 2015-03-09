/* jshint jquery: true */

import Em from "ember";

export default Em.View.extend({
	classNames: ['animate-card'],
	didInsertElement: function() {
        $(this.$()[0]).animate({
            opacity: 1,
            marginLeft: '+=1500'
        }, 200);
    },	
	localeDidChange: function() {
		var that = this;
		Em.run.next(function() {
			that.rerender();
		});
	}.observes('controller.controllers.application.localeDidChange')
});