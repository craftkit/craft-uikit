
/** 
 * Global key-press event manager.  
 * Before you use this utility, you have to call `activate`.  
 * (You will call this in your bootstrap)
 * 
 * You have to manage your registration key by yourself.
 * 
 * @namespace Craft.Core.KeyboardManager
 * @packagename Craft.Core.KeyboardManager
 * 
 * @example
 * 
 * const ESC_KEY = 27;
 * 
 * Craft.Core.KeyboardManager.activate();
 * 
 * const action_id = 'action_name'+this.componentId;
 * 
 * Craft.Core.KeyboardManager.register(action_id,ESC_KEY, () => {
 *     this.work_when_esc_pressed();
 *     Craft.Core.KeyboardManager.remove(action_id);
 * });
 * 
 */
export var KeyboardManager = {
	
	/** @private */
	packagename : 'Craft.Core.KeyboardManager',
	
	/** @private */
	keyboard_actions : {},
	
	/**
	 * key-press handler
	 * @private
	 * @param {KeyboardEvent} e - KeyboardEvent
	 */
	handler : function(e){
		Craft.Core.KeyboardManager.action(e.keyCode);
	},
	
	/**
	 * Activate KeyboardManager
	 * 
	 * @memberof Craft.Core.KeyboardManager
	 * @method Craft.Core.KeyboardManager.activate
	 */
	activate : function(){
		window.addEventListener('keyup',this.handler);
	},
	
	/**
	 * Deactivate KeyboardManager
	 */
	deactivate : function(){
		window.removeEventListener('keyup',this.handler);
	},
	
	/**
	 * Register key-press handler
	 * 
	 * @memberof Craft.Core.KeyboardManager
	 * @method Craft.Core.KeyboardManager.register
	 * 
	 * @param {String} id - identifier
	 * @param {Number} key - key number ex) ESC:27
	 * @param {Function} action - handler
	 */
	register : function(id,key,action){
		if( !(id && key && action) ){ return; }
		if( !this.keyboard_actions[key] ){
			this.keyboard_actions[key] = {};
		}
		this.keyboard_actions[key][id] = action;
	},
	
	/**
	 * Remove key-press handler
	 * 
	 * @memberof Craft.Core.KeyboardManager
	 * @method Craft.Core.KeyboardManager.remove
	 * 
	 * @param {String} id - identifier
	 */
	remove : function(id){
		if( !id ){ return; }
		
		var keys = Object.keys(this.keyboard_actions);
		for( var i=0; i<keys.length; i++ ){
			delete this.keyboard_actions[keys[i]][id];
		}
	},
	
	/**
	 * Actual event handler
	 * @private
	 */
	action : function(key){
		if( !this.keyboard_actions[key] ){ return; }
		var ids = Object.keys(this.keyboard_actions[key]);
		for( var i=0; i<ids.length; i++ ){
			var action = this.keyboard_actions[key][ids[i]];
			action();
		}
	},
	
	/**
	 * Clear all handlers
	 * 
	 * @memberof Craft.Core.KeyboardManager
	 * @method Craft.Core.KeyboardManager.clear
	 */
	clear : function(){
		this.keyboard_actions = {};
		let keys = Object.keys(this.keyboard_actions);
		for( let i=0; i<keys.length; i++ ){
			let key = keys[i];
			if( !this.keyboard_actions[key] ){ continue;	}
			let ids = Object.keys(this.keyboard_actions[key]);
			for( let j=0; i<ids.length; j++ ){
				this.remove(this.keyboard_actions[key][ids[j]]);
			}
		}
	}
	
};
