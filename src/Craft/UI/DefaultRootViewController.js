
import { View } from './View.js';
import { Component } from '../Core/Component.js';
import { DefaultViewController } from './DefaultViewController.js';
import { Context } from '../Core/Context.js';

/** 
 * Default RootViewContoller.
 * 
 * Supports:
 * 
 * * `didReceivePopstate` with seeking hash
 * * `pushState` to window.history.pushState
 * 
 * @packagename Craft.UI.DefaultRootViewController
 * 
 * @example
 * 
 * class PageController extends Craft.UI.DefaultRootViewController {
 *     constructor(){
 *         super();
 *         this.tags = '';
 *         this.items = '';
 *     }
 *     viewDidLoad(callback){
 *         this.appendView(new Header());
 *         this.tags = new Tags();
 *         this.items = new Items();
 *         let container = new Container();
 *         container.loadView();
 *         container.appendView(this.tags);
 *         container.appendView(this.items);
 *         this.appendView(container);
 *         this.appendView(new Footer());
 *     }
 *     resolveRoutingRequest(route){
 *         this.selectTag(route);
 *         
 *         if( !route.path ){ route.path = ''; }
 *         let match = route.path.match(/(\w*)/);
 *         let tag = match[1];
 *         if( tag ){ this.selectTag(tag,route); }
 *     }
 *     selectTag(route){
 *         let match = route.path.match(/(\w*)/);
 *         let tag = match[1];
 *         if( route.launch ){
 *             // being in launching app. you should update history
 *             window.history.replaceState({state:{tag:tag},path:'/#/'+tag});
 *         }
 *         document.title = "Tag: "+tag;
 *         this.items.selectTag(tag);
 *     }
 *     style(componentId){
 *         return `
 *             * { box-sizing:border-box; margin:0; padding:0; }
 *             .root { display:flex; flex-direction:column; width:75%; margin-left:auto; margin-right:auto; }
 *         `;
 *     }
 *     template(componentId){
 *         return `<div id="root" class="root"></div>`;
 *     }
 * }
 * 
 */
export class DefaultRootViewController extends DefaultViewController {
	
	/**
	 * DefaultRootViewController Constructor  
	 */
	constructor(){
		super();
		this.packagename = 'Craft.UI.DefaultRootViewController';
	}
	
	/**
	 * Bringup routing by RootViewController  
	 */
	bringup(){
		this.didReceivePopstate(null,true); // enter routing with `launch flag`
	}
	
	/**
	 * Popstate event entrance
	 * 
	 * By default, popstate event is managed as hash routing.  
	 * Please implement your own strategy.
	 * 
	 * @param {PopStateEvent} event - PopStateEvent should be handled by your DefaultRootViewController#resolveRoutingRequest
	 * @param {Boolean} launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 */
	didReceivePopstate(event,launch){
		Context.getRouter().route(event,launch);
	}
	
	/**
	 * Wrapping history.pushState to be able to call with named object
	 * 
	 * @param {Object} options - options
	 * @param {Object} options.state - state
	 * @param {String} options.title - page title
	 * @param {String} options.path - path (hash)
	 */
	pushState(options){
		let state = options.state;
		let title = options.title;
		let path  = options.path;
		window.history.pushState(state,title,path);
	}
	
	/**
	 * Wrapping history.replaceState to be able to call with named object
	 * 
	 * @param {Object} options - options
	 * @param {Object} options.state - state
	 * @param {String} options.title - page title
	 * @param {String} options.path - path (hash)
	 */
	replaceState(options){
		let state = options.state;
		let title = options.title;
		let path  = options.path;
		window.history.replaceState(state,title,path);
	}
	
	/**
	 * Routing request handler.  
	 * You have to implement your routing here.
	 * 
	 * @param {Craft.Core.Route} route - route object
	 * @param {Boolean} options.launch - true if this is the first launch, or access from out side of application history scope caused by browser back/foward
	 * @param {String} options.path - parsed path. parsing is responsibility of Router implementation
	 * @param {PopStateEvent} options.event - PopStateEvent if defined
	 */
	resolveRoutingRequest(route){
		// here you should implement how to resolve popstate event
	}
	
};

