/* global FB */
import Em from "ember";

export default Em.Component.extend({
	classNames: ['col-xs-12'],
	locale: 'en',
	initTwit: function() {
		window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));
	},
	setupSocialNetworks: function() {
		Em.run.scheduleOnce('afterRender', this, function() {
			FB.XFBML.parse();
			this.initTwit();
		});
	}.on('didInsertElement'),
	facebookLink: "http://www.google.com",
	twitterParams: {
		dataUrl: "http://www.google.com",
        dataText: "Tweet text here",
        dataSize: "large",
        dataHashtags: "austinbudget"
	},
	emailParams: {
		subject: "Austin Budget In A Box",
		body: "check it ouuuuutttttttt"
	},
	emailHref: function() {
		return "mailto:?subject=%@&amp;body=%@".fmt(this.get('emailParams.subject'), this.get('emailParams.body'));
	}.on('init').property('locale')	
});