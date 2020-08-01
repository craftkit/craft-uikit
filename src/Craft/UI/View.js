
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
	 * Change viewController that manages me
	 * 
	 * @param {Craft.Core.Component} viewController - allow any Component
	 */
	setViewController(viewController){
		this.viewController = viewController;
	}
}

