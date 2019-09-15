
import { Defaults } from './Defaults.js';

/** 
 * Provides global Component access.  
 * 
 * You may love to set`Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT = true` to be able to access component via its id.
 * 
 * ### Example in your template
 * 
 * ``` 
 * <!-- fully qualified -->
 * <div onclick="window.Craft.Core.ComponentStack.get('${componentId}').action()">action</div>
 * 
 * <!-- ALLOW_COMPONENT_SHORTCUT is true -->
 * <div onclick="${componentId}.action()">action</div>
 * ``` 
 * 
 * @namespace Craft.Core.ComponentStack
 * @packagename Craft.Core.ComponentStack
 * 
 */
export var ComponentStack = {
	
	/** @private */
	packagename : 'Craft.Core.ComponentStack',
	
	/** @private */
	counter : 0,
	
	/** @private */
	container : {},
	
	/**
	 * Shortcut for set
	 * 
	 * @memberof Craft.Core.ComponentStack
	 * @method Craft.Core.ComponentStack.push
	 */
	push : function(component){
		this.container[component.componentId] = component;
	},

	/**
	 * Set component into the stack
	 * 
	 * @memberof Craft.Core.ComponentStack
	 * @method Craft.Core.ComponentStack.set
	 * 
	 * @param {String} componentId - componentId
	 * @param {Craft.Core.Component} component - component
	 */
	set : function(componentId,component){
		this.container[componentId] = component;
		if( Defaults.ALLOW_COMPONENT_SHORTCUT ){
			window[componentId] = component;
		}
	},
	
	/**
	 * Get component from the stack
	 * 
	 * @memberof Craft.Core.ComponentStack
	 * @method Craft.Core.ComponentStack.get
	 * 
	 * @param {string} componentId - componentId
	 */
	get : function(componentId){
		return this.container[componentId];
	},
	
	/**
	 * Delete component from the stack
	 * 
	 * @memberof Craft.Core.ComponentStack
	 * @method Craft.Core.ComponentStack.del
	 * 
	 * @param {string} componentId - componentId
	 */
	del : function(componentId){
		delete this.container[componentId];
		if( Defaults.ALLOW_COMPONENT_SHORTCUT ){
			delete window[componentId];
		}
	},
	
	/**
	 * Publish new serial number. Actual componentId will be made by its packagename.
	 * 
	 * @memberof Craft.Core.ComponentStack
	 * @method Craft.Core.ComponentStack.nextSerial
	 * 
	 * @return {Number}
	 */
	nextSerial : function(){
		return this.counter++;
	}
	
};
