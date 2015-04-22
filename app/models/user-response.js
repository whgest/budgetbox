import DS from "ember-data";

export default DS.Model.extend({
    postalCode: DS.attr('string'),
    referredBy: DS.attr('string'),
    district: DS.attr('string'),
    emergencyResponse: DS.attr('number'),
    parksLibraries: DS.attr('number'),
    healthHousing: DS.attr('number'),
    planningDevelopment: DS.attr('number'),
    energy: DS.attr('number'),
    water: DS.attr('number'),
    cleanCommunity: DS.attr('number'),
    streetsInfrastructure: DS.attr('number'),
    total: DS.attr('number'),
    submitDate: DS.attr('date'),
    row: DS.attr('string'),
    browserName: DS.attr('string'),
    browserVersion: DS.attr('string')
    // getChangeProp: function(prop) {
    // 	return "change" + Em.String.capitalize(prop);
    // }
});