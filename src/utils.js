
/**
 * Loop through an objects own properties and execute and action.
 * Action function will be provided the current key and the property assign to that key.
 * @param  {object} obj    Object to loop through.
 * @param  {function} action Action to perform on each property.
 */
var forEachProperty = function(obj, action) {
	for (var key in obj) {
	  	if (obj.hasOwnProperty(key)) {
	    	action(key, obj[key]);
	  	}
  	}
};

export { forEachProperty };