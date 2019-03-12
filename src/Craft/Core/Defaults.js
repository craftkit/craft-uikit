
/** 
 * Application default valiables.
 * 
 * @namespace Craft.Core.Defaults
 * @packagename Craft.Core.Defaults
 * 
 * @example
 * 
 * Craft.Core.Defaults.BASE_DIV_NAME = 'CraftRoot';
 * Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT = true;
 * 
 */
export var Defaults = {
	
	/** @private */
	packagename : 'Craft.Core.Defaults',
	
	/**
	 * Element.id of the root element. 
	 * It is recommended to use default (CraftRoot).
	 * 
	 * @memberof Craft.Core.Defaults
	 * @member Craft.Core.Defaults.BASE_DIV_NAME
	 * 
	 * @example
	 * 
	 * // at your bootloader
	 * Craft.Core.Defaults.BASE_DIV_NAME = 'ROOT';
	 * 
	 * // at any place
	 * let rootElement = document.getElementById(Craft.Core.Defaults.BASE_DIV_NAME);
	 * 
	 * // if your RootViewController is managed by Craft.Core.Context, you may get the same result by:
	 * let rootElement = Craft.Core.Contest.getRootElement();
	 * 
	 */
	BASE_DIV_NAME : 'CraftRoot',
	
	/**
	 * Whether to use component shortcut in HTML. 
	 * True to set `window['componentId'] = component`, to be able to use `${componentId}.method()` in template. 
	 * This is set to false by default, but it is recommended to set to true at the start of your application bootloader.
	 * 
	 * @memberof Craft.Core.Defaults
	 * @member Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT
	 */
	ALLOW_COMPONENT_SHORTCUT : false,
	
};

