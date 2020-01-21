
import { Context } from './Context.js';

/** 
 * The application entry point.
 * 
 * Argument for `Craft.Core.Bootstrap.boot` must have your entry function named as `didBootApplication`. 
 * The function will be called just after the initialization process of Craft-UIKit itself. 
 * 
 * You can also set your optional value or function in the argument object. 
 * It can be retrieved via `Craft.Core.Context.getApp()`.
 * 
 * @namespace Craft.Core.Bootstrap
 * @packagename Craft.Core.Bootstrap
 * 
 * @example
 * 
 * Craft.Core.Bootstrap.boot({
 *     router : Craft.Core.HashRouter,
 *     didBootApplication : function(options){
 *         let widget = new MyWidget();
 *         widget.loadView();
 *         document.getElementById('CraftRoot').appendChild(widget.view);
 *     },
 *     token : some_token
 * });
 * 
 * const token = Craft.Core.Context.getApp().token;
 * 
 */
export var Bootstrap = {
	
	/** @private */
	packagename : 'Craft.Core.Bootstrap',
	
	/**
	 * @typedef {Object} LaunchEnv
	 * @property {String} entryPoint - launching hash
	 */
	 
	/**
	 * Entry point of Craft-UIKit application.
	 * 
	 * @memberof Craft.Core.Bootstrap
	 * @method Craft.Core.Bootstrap.boot
	 * 
	 * @param {Object} app - your application bootloader with didBootApplication
	 * @param {Function} app.didBootApplication - your bootstrap
	 * @param {Craft.Core.Router} app.didBootApplication - your bootstrap
	 * @return {LaunchEnv} - info about launch environment
	 */
	boot : function(app){
		if( !app ){
			throw "no app";
		}
		
		// also, init context
		Context.setApp(app);
		
		// ok, launch the application
		Context.getApp().didBootApplication();
	}
	
};

