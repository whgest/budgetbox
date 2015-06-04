export default {
	devMode: false,
	percentChange: {"raise": 5, "keep": 0, "cut": -5},
	linkToDistrictMap: "http://www.austintexas.gov/GIS/CouncilDistrictMap/",
	transitionDelay: 300,
	
	//define cards and overwrite defaults
	cards: [
		{
			id: 'welcome',
			view: 'welcome',
			showResults: false,
		},
		{
			id: 'emergency-response',
			baseAmount: 677
		},
		{
			id: 'parks-libraries',
			baseAmount: 124
		},
		{
			id: 'planning-development',
			baseAmount: 41
		},
		{
			id: 'health-housing',
			baseAmount: 79
		},
		{
			id: 'energy',
			baseAmount: 1295
		},
		{
			id: 'water',
			baseAmount: 1209
		},
		{
			id: 'clean-community',
			baseAmount: 348
		},
		{
			id: 'streets-infrastructure',
			baseAmount: 99
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