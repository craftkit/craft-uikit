
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
	 * Route.path is raw window.location.pathname.
	 * Your `resolveRoutingRequest()` has a responsibility for handling the starting `/`.
	 * 
	 * @memberof Craft.Core.PathRoute
	 * @method Craft.Core.PathRoute.route
	 * 
	 * @param {PopStateEvent} event - PopStateEvent
	 * @param {Boolean} launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 */
	route : function(event,launch){
		let path = window.location.pathname;
		/*
		let match = path.match(/\/(.*)\/?/);
		let path = '';
		if( match ){
			path = match[1];
		}
		*/
		
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
		path = path.replace(/^#*\/*/,'')
		return '/'+path;
	}
	
};

