
/** 
 * Router interface
 * 
 * @namespace Craft.Core.Router
 * @packagename Craft.Core.Router
 */
export var Router = {
	
	/** @private */
	packagename : 'Craft.Core.Router',
	
	/**
	 * Router interface
	 * 
	 * @memberof Craft.Core.Router
	 * @method Craft.Core.Router.route
	 * 
	 * @param {PopStateEvent} event - PopStateEvent
	 * @param {Boolean} launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 */
	route : function(event,launch){}
	
};

