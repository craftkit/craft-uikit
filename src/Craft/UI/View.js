
import { Component } from '../Core/Component.js';

/** 
 * View
 * 
 * @packagename Craft.UI.View
 * 
 * @example
 * 
 * class Hello extends Craft.UI.View {
 *     constructor(){
 *         super();
 *         ths.name = 'World';
 *     }
 *     style(componentId){
 *         return `
 *             .root { font-size:1em; }
 *             .message { color:blue; }
 *         `;
 *     }
 *     template(componentId){
 *         return `
 *             <div id='root' class='root'>
 *                 <h1 class='message'>Hello ${this.name} !<\h1>
 *             </div>
 *         `;
 *     }
 * }
 * 
 */
export class View extends Component {
	
	/**
	 * Get the ViewController this component is managed by
	 */
	getViewController(){
		return this.viewController;
	}
	
	/**
	 * Set ViewController manages me.  
	 * If you have more components under your RootView, you have to propagete the viewController for them.
	 * 
	 * @param {Craft.Core.Component} viewController - any Component available
	 */
	setViewController(viewController){
		this.viewController = viewController;
	}
}

