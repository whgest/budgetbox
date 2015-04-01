export default {
	baseServicesLoc: "whatServices.%@",
	baseProvidedLoc: "servicesProvided.%@",
	baseTitleLoc: "cardTitle.%@",
	baseShortTitleLoc: "cardShortTitle.%@",
	baseImagePath: "assets/images/%@.png",
	percentChange: {"raise": 5, "keep": 0, "cut": -5},
	linkToDistrictMap: "http://www.google.com",
	transitionDelay: 300,
	
	//define cards and overwrite defaults
	cards: [
		{
			id: 'landing-page',
			view: 'landingPage',
			showResults: false
		},
		{
			id: 'emergency-response',
		},
		{
			id: 'parks-libraries'
		},
		// {
		// 	id: 'planning-development'
		// },
		// {
		// 	id: 'health-housing'
		// },
		// {
		// 	id: 'energy'
		// },
		// {
		// 	id: 'water'
		// },
		// {
		// 	id: 'clean-community'
		// },
		// {
		// 	id: 'streets-infrastructure'
		// },
		{
			id: 'results',
			view: 'results',
			showResults: false
		},
	]
};