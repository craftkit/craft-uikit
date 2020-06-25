
/** 
 * Route object
 * 
 * Ojbect represent route information made by Router.
 * 
 * @packagename Craft.Core.Route
 * 
 * @example
 * 
 * resolveRoutingRequest(route){
 *     switch(route.path){
 *         case 'page1':
 *             this.open(new Page1(),route);
 *         case 'page2':
 *             this.open(new Page2(),route);
 *         default:
 *             this.open(new NotFound(),route);
 *     }
 * }
 * 
 */
export class Route {
	
	/**
	 * constructor
	 * 
	 * @param {Object} options - options
	 * @param {Boolean} options.launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 * @param {String} options.path - parsed path. parsing is responsibility of Router implementation. This is not a location.pathname
	 * @param {PopStateEvent} options.event - PopStateEvent if defined
	 */
	constructor(options){
		this.launch = options.launch;
		this.path   = options.path;
		this.event  = options.event;
	}
	
}

