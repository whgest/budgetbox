import DS from "ember-data";

export default DS.RESTAdapter.extend({
    host: 'http://localhost:8000',
    buildURL: function(type) {
        return this.get('host').concat('/', type);
    }
});