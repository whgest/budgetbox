import DS from "ember-data";

export default DS.Model.extend({
    ageBracket: DS.attr('string'),
    comments: DS.attr('string'),
    race: DS.attr('string'),
    gender: DS.attr('string'),
    referredBy: DS.attr('string')
});