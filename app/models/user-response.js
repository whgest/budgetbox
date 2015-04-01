import Em from "ember";
import DS from "ember-data";

// export default DS.Model.extend({
//     postal_code: DS.attr('string'),
//     username: DS.attr('string'),
//     referred_by: DS.attr('string'),
//     age_bracket: DS.attr('string'),
//     district: DS.attr('string'),
//     change_emergency_response: DS.attr('number'),
//     change_parks_libraries: DS.attr('number'),
//     change_health_housing: DS.attr('number'),
//     change_planning_development: DS.attr('number'),
//     change_energy: DS.attr('number'),
//     change_water: DS.attr('number'),
//     change_clean_community: DS.attr('number'),
//     change_streets_infrastructure: DS.attr('number'),
//     emergency_response: DS.attr('number'),
//     parks_libraries: DS.attr('number'),
//     health_housing: DS.attr('number'),
//     planning_development: DS.attr('number'),
//     energy: DS.attr('number'),
//     water: DS.attr('number'),
//     clean_community: DS.attr('number'),
//     streets_infrastructure: DS.attr('number'),
//     total: DS.attr('number'),
//     comments: DS.attr('string'),
//     submit_date: DS.attr('date')
// });

export default DS.Model.extend({
    postalCode: DS.attr('string'),
    username: DS.attr('string'),
    referredBy: DS.attr('string'),
    ageBracket: DS.attr('string'),
    district: DS.attr('string'),
    changeEmergencyResponse: DS.attr('number'),
    changParksLibraries: DS.attr('number'),
    changeHealthHousing: DS.attr('number'),
    changePlanningDevelopment: DS.attr('number'),
    changeEnergy: DS.attr('number'),
    changeWater: DS.attr('number'),
    changeCleanCommunity: DS.attr('number'),
    changeStreetsInfrastructure: DS.attr('number'),
    emergencyResponse: DS.attr('number'),
    parksLibraries: DS.attr('number'),
    healthHousing: DS.attr('number'),
    planningDevelopment: DS.attr('number'),
    energy: DS.attr('number'),
    water: DS.attr('number'),
    cleanCommunity: DS.attr('number'),
    streetsInfrastructure: DS.attr('number'),
    total: DS.attr('number'),
    comments: DS.attr('string'),
    submitDate: DS.attr('date'),
    getChangeProp: function(prop) {
    	return "change" + Em.String.capitalize(prop);
    }
});