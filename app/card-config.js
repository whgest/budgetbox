export default {
	baseTextLoc: "cardText.%@",
	baseTitleLoc: "cardTitle.%@",
	baseShortTitleLoc: "cardShortTitle.%@",
	baseImagePath: "assets/images/%@.png",
	
	//define cards and overwrite defaults
	cards: [
		{
			id: 'landing-page',
			view: 'landingPage',
			selection: null
		},
		{
			id: 'emergency'
		},
		{
			id: 'parks'
		},
		{
			id: 'planning'
		},
		{
			id: 'results',
			view: 'results',
			selection: null
		},
	]
};