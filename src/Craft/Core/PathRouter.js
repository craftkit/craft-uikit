
import { Route } from './Route';
import { Context } from './Context';


/** 
 * router by path strategy
 * 
 * @namespace Craft.Core.PathRouter
 * @packagename Craft.Core.PathRouter
 */
export var PathRouter = {
	
	/** @private */
	packagename : 'Craft.Core.PathRouter',
	
	/**
	 * make Route from location.
	 * 
	 * @memberof Craft.Core.PathRoute
	 * @method Craft.Core.PathRoute.route
	 * 
	 * @param {PopStateEvent} event - PopStateEvent
	 * @param {Boolean} launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 */
	route : function(event,launch){
		let path = window.location.pathname;
		let match = path.match(/\/(.*)\/?/);
		
		let route = new Route({
			launch : launch,
			path   : path,
			event  : event || {}
		});
		
		Context.getRootViewController().resolveRoutingRequest(route);
	}
	
};

