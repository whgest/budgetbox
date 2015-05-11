export default {
	devMode: true,
	percentChange: {"raise": 5, "keep": 0, "cut": -5},
	linkToDistrictMap: "http://www.google.com",
	transitionDelay: 300,
	
	//define cards and overwrite defaults
	cards: [
		{
			id: 'welcome',
			view: 'welcome',
			showResults: false,
		},
		{
			id: 'emergency-services',
			baseAmount: 50
		},
		{
			id: 'parks-libraries',
			baseAmount: 100
		},
		{
			id: 'planning-development',
			baseAmount: 100
		},
		{
			id: 'health-housing',
			baseAmount: 100
		},
		{
			id: 'energy',
			baseAmount: 100
		},
		{
			id: 'water',
			baseAmount: 100
		},
		{
			id: 'clean-community',
			baseAmount: 100
		},
		{
			id: 'streets-infrastructure',
			baseAmount: 100
		},
		{
			id: 'results',
			view: 'results',
			showResults: false,
		},
		{
			id: 'feedback',
			view: 'feedback',
			showResults: false,			
		},
		{
			id: 'resources',
			view: 'resources',
			showResults: false,			
		},

	]
};