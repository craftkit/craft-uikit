
import { Route } from './Route';
import { Context } from './Context';


/** 
 * router by hash strategy
 * 
 * @namespace Craft.Core.HashRouter
 * @packagename Craft.Core.HashRouter
 */
export var HashRouter = {
	
	/** @private */
	packagename : 'Craft.Core.HashRouter',
	
	/**
	 * make Route from location.hash
	 * 
	 * @memberof Craft.Core.HashRoute
	 * @method Craft.Core.HashRoute.route
	 * 
	 * @param {PopStateEvent} event - PopStateEvent
	 * @param {Boolean} launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 */
	route : function(event,launch){
		let hash = window.location.hash;
		let match = hash.match(/^#\/(.*)/);
		let path = '';
		if( match ){
			path = match[1];
		}
		
		let route = new Route({
			launch : launch,
			path   : path,
			event  : event || {}
		});
		
		Context.getRootViewController().resolveRoutingRequest(route);
	},
	
	/**
	 * normalize path
	 * 
	 * Concrete RootViewController that has a responsibility for routing request should normalize path to absorb the inaccuracy.
	 * 
	 * @memberof Craft.Core.PathRoute
	 * @method Craft.Core.PathRoute.normalize
	 * 
	 * @param {String} path - path for component
	 */
	normalize : function(path){
		if( !path ){ path = ''; }
		path = path.replace(/^#*\/*/,'');
		return '#/'+path;
	}
	
};

