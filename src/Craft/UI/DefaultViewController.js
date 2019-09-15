
import { View } from './View.js';
import { ComponentStack } from '../Core/ComponentStack.js';
import { Gesture } from '../Core/Gesture.js';
import { NotificationCenter } from '../Core/NotificationCenter.js';
import { Component } from '../Core/Component.js';

/** 
 * Default ViewContoller.
 * 
 * Supports:
 * 
 * * Tap event (can be listen via NotificationCenter by name of 'ContentTapped')
 * * Automatically register `this` to the appended Component
 * * Width and height fit to the viewport
 * 
 * @packagename Craft.UI.DefaultViewController
 * 
 * @example
 * 
 * class PageController extends Craft.UI.DefaultViewController {
 *     constructor(){
 *         super();
 *         this.tags = '';
 *         this.items = '';
 *     }
 *     viewDidLoad(callback){
 *         this.appendView(new Header());
 *         this.appendView(new Container());
 *         this.appendView(new Footer());
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
export class DefaultViewController extends View {
	
	/**
	 * DefaultViewController Constructor  
	 */
	constructor(){
		super();
		this.packagename = 'Craft.UI.DefaultViewController';
	}
	
	/**
	 * overriding viewDidLoad with 'ContentTapped' event on this.view
	 * 
	 * When you override this method, you have to call `super.viewDidLoad()` at the start of yours, 
	 * and you have to call `callback` at the end of yours.
	 * But if you don't want to enable 'ContentTapped' event, don't call `super.viewDidLoad`.
	 * 
	 * @override
	 * @param {Function} callback - callback
	 * 
	 * @example
	 * 
	 * viewDidLoad(callback){
	 *     super.viewDidLoad();
	 *     // your original logic
	 *     if(callback){ callback(); }
	 * }
	 * 
	 */
	viewDidLoad(callback){
		this.enableContentTapped();
		if( callback ){ callback(); }
	}
	
	/**
	 * Append 'ContentTapped' event on `this.view`
	 * @protected
	 */
	enableContentTapped(){
		Gesture.enableTap({
			target : this.view,
			tap    : (event) => {
				NotificationCenter.notify('ContentTapped',event);
			}
		});
	}
	
	/**
	 * ovverride appendView: with viewController cascading
	 * 
	 * @param {Object} options - options|component
	 * @param {Craft.Core.Component} options.component - component (auto setViewController)
	 */
	appendView(options){
		if( !options ){ return; }
		let component;
		if( options instanceof Component ){
			component = options;
		}else{
			component = options.component;
		}
		component.setViewController(this);
		
		super.appendView(options);
	}
	
	/**
	 * ovverride append: with viewController cascading
	 */
	append(options){
		this.appendView(options);
	}
	
	/**
	 * Remove view
	 */
	removeView(options){
		super.removeView(options);
	}
	
	/**
	 * style
	 * @protected
	 */
	style(){
		return `
			* { box-sizing:border-box; margin:0; padding:0; }
			:host {
				height: 100%;
				width: 100%;
				margin: 0px;
				overflow: hidden;
				box-sizing: border-box;
			}
			.root {
				height: 100%;
				width: 100%;
				margin: 0px;
				overflow: hidden;
				box-sizing: border-box;
			}
		`;
	}
	
	/**
	 * template
	 * @protected
	 */
	template(){
		return `
			<div class="root"></div>
		`;
	}
	
};

