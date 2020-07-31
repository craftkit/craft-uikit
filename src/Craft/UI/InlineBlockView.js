
import { View } from './View.js';

/** 
 * InlineBlock View
 * Craft.UI.View with display:inline-block
 * 
 * @packagename Craft.UI.View.InlineBlock
 * 
 */
export class InlineBlockView extends View {
	
	/**
	 * override showView
	 * 
	 * @argument {Function} callback - callback
	 */
	showView(callback){
		this.view.style.display = 'inline-block';
		if( callback ){ callback() }
	}
	
	/**
	 * override hideView
	 * 
	 * @argument {Function} callback - callback
	 */
	hideView(callback){
		this.view.style.display = 'none';
		if( callback ){ callback() }
	}
	
	/**
	 * apply display:block
	 */
	style(componentId){
		return super.style(componentId) + `
			:host {
				display:inline-block;
			}
		`;
	}
}

