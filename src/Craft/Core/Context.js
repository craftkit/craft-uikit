
import { Defaults } from './Defaults';
import { HashRouter } from './HashRouter';

/** 
 * Application context.
 * 
 * @namespace Craft.Core.Context
 * @packagename Craft.Core.Context
 */
export var Context = {
	
	/** @private */
	packagename : 'Craft.Core.Context',
	
	/** 
	 * RootViewController of this application.
	 * @private
	 */
	rootViewController : '',
	
	/** 
	 * Concrete application boot loader.
	 * @private 
	 */
	app : '', 
	
	/**
	 * Set your application bootloader.
	 * 
	 * @memberof Craft.Core.Context
	 * @method Craft.Core.Context.setApp
	 * 
	 * @param {Object} app - your application bootloader
	 * @param {Function} app.didBootApplication - called jsut after core system booted
	 */
	setApp : function(app){
		this.app = app;
		
		if( this.app.router ){
			this.router = this.app.router;
		}else{
			this.router = HashRouter;
		}
	},
	
	/**
	 * Get your application bootloader.
	 * 
	 * @memberof Craft.Core.Context
	 * @method Craft.Core.Context.getApp
	 * 
	 * @return {Object} app - your application bootloader
	 */
	getApp : function(){
		return this.app;
	},
	
	/**
	 * Setting Root-Element of your app.
	 * 
	 * If you have your RootViewController, 
	 * `Craft.Core.Context.setRootViewController()` will set Root-Element according to`Craft.Core.Default.BASE_DIV_NAME`.
	 * Otherwise, this is optional.
	 * 
	 * @memberof Craft.Core.Context
	 * @method Craft.Core.Context.setRootElement
	 * 
	 * @param {Element} rootElement 
	 */
	setRootElement : function(rootElement){
		this.rootElement = rootElement;
	},
	
	/**
	 * Getting Root-Element of your app.
	 * 
	 * @memberof Craft.Core.Context
	 * @method Craft.Core.Context.getRootElement
	 * 
	 * @return {Element} rootElement 
	 */
	getRootElement : function(){
		return this.rootElement;
	},
	
	/**
	 * Setting RootViewController of you application. 
	 * 
	 * If you want to manage popstate and history, you have to set your RootViewController that implements appropriate interface.
	 * @see {@link Craft.UI.DefaultViewController}
	 * 
	 * @memberof Craft.Core.Context
	 * @method Craft.Core.Context.setRootViewController
	 * 
	 * @param {Craft.UI.ViewController} rootViewController - rootViewController#resolveRoutingRequest required
	 */
	setRootViewController : function(rootViewController){
		this.rootViewController = rootViewController;
		if( !this.rootElement ){
			this.rootElement = document.getElementById(Defaults.BASE_DIV_NAME);
		}
		rootViewController.viewWillAppear();
		if( !rootViewController.isViewLoaded ){
			rootViewController.loadView();
		}
		this.rootElement.appendChild(rootViewController.view);
		rootViewController.viewDidAppear();
		
		// delegate popstate event to the RootViewController
		window.addEventListener('popstate',(event) => {
			rootViewController.didReceivePopstate(event);
		});
	},
	
	/**
	 * Getting RootViewController.
	 * 
	 * @memberof Craft.Core.Context
	 * @method Craft.Core.Context.getRootViewController
	 * 
	 * @return {Craft.UI.ViewController} - RootViewController of you application
	 */
	getRootViewController : function(){
		return this.rootViewController;
	},
	
	/** 
	 * Concrete router object.
	 * @private 
	 */
	router : '', 
	
	/**
	 * set router. always called by setApp().
	 * 
	 * @param {Craft.Core.Router} router - Router implementation
	 * 
	 * @memberof Craft.Core.Context
	 * @member Craft.Core.Context.setRouter
	 */
	setRouter : function(router){
		this.router = router;
	},
	
	/**
	 * get router
	 * 
	 * @memberof Craft.Core.Context
	 * @member Craft.Core.Context.getRouter
	 * 
	 * @return {Craft.Core.Router} - return router implementation
	 */
	getRouter : function(){
		return this.router;
	},
	
};

