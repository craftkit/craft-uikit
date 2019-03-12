
import { View } from './View.js';
import { Component } from '../Core/Component.js';
import { DefaultViewController } from './DefaultViewController.js';

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
 *     resolveRoutingRequest(path,event){
 *         if( !path ){ path = ''; }
 *         let match = path.match(/(\w*)/);
 *         let tag = match[1];
 *         if( tag ){ this.selectTag(tag,event); }
 *     }
 *     selectTag(tag,event){
 *         if( !event ){
 *             // the event is popstate event object
 *             // you should update history if it is not passed.
 *             this.pushState({state:{tag:tag},path:'/#/'+tag});
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
		this.didReceivePopstate(); // kick the entry method
	}
	
	/**
	 * Popstate event entrance
	 * 
	 * By default, popstate event is managed as hash routing.  
	 * Please implement your own strategy.
	 * 
	 * @param {PopStateEvent} event - PopStateEvent should be handled by your DefaultRootViewController#resolveRoutingRequest
	 */
	didReceivePopstate(event){
		let hash = window.location.hash;
		let match = hash.match(/^#\/(.*)/);
		let path = '';
		if( match ){
			path = match[1];
		}
		this.resolveRoutingRequest(path,event);
	}
	
	/**
	 * Register History (history.pushState)
	 * 
	 * @param {Object} options - options
	 * @param {Object} options.state - state
	 * @param {String} options.path - path (hash)
	 */
	pushState(options){
		let state = options.state;
		let path  = options.path;
		window.history.pushState(state,null,path);
	}
	
	/**
	 * Routing request handler.  
	 * You have to implement your routing here.
	 * 
	 * @param {String} path - path (hash by default)
	 * @param {PopStateEvent} event - PopStateEvent is defined if this method is called via browser back|forward
	 */
	resolveRoutingRequest(path,event){
		// here you should implement how to resolve popstate event
	}
	
};

