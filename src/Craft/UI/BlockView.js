
import { View } from './View.js';

/** 
 * Block View
 * Craft.UI.View with display:block
 * 
 * @packagename Craft.UI.View.Block
 * 
 */
export class BlockView extends View {
	
	/**
	 * override showView
	 * 
	 * @argument {Function} callback - callback
	 */
	showView(callback){
		this.view.style.display = 'block';
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
				display:block;
			}
		`;
	}
}

