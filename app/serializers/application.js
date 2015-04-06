import Em from "ember";
import DS from "ember-data";

export default DS.JSONSerializer.extend({	
	serialize: function() {
		var json = this._super.apply(this, arguments);
		for (var dataKey in json) {
			if (json.hasOwnProperty(dataKey)) {
				var unCamel = Em.String.decamelize(dataKey);
				if(!json.hasOwnProperty(unCamel)) {
					json[unCamel] = json[dataKey];
					delete json[dataKey];
				}
			}
		}
		return json;
	}
});