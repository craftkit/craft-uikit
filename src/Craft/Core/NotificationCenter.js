
/** 
 * Global event manager.
 * 
 * @namespace Craft.Core.NotificationCenter
 * @packagename Craft.Core.NotificationCenter
 * 
 * @example
 * 
 * // source
 * // you can use any keyword for your event name, and also can use wild card
 * 
 * Craft.Core.NotificationCenter.notify('Entity/path.to.attribute.updated',message);
 * Craft.Core.NotificationCenter.notify('Entity/path.to.attribute.deleted',message);
 * Craft.Core.NotificationCenter.notify('Entity/path.to.*',message);
 * 
 * // listener
 * // NotificationCenter returns serial id for your listener entry, that can be used to un-listen the event.
 * 
 * const serial = Craft.Core.NotificationCenter.listen('Entity.updated',handler);
 * Craft.Core.NotificationCenter.notify('Entity.updated',handler);
 * 
 * Craft.Core.NotificationCenter.remove('Entity.updated',serial);
 * 
 */
export var NotificationCenter = {
	
	/** @private */
	packagename : 'Craft.Core.NotificationCenter',
	
	/** @private */
	EventListeners : {},
	
	/**
	 * Actual listener registration
	 * 
	 * @private
	 * @param {String} event - event name
	 * @param {Object} listener - listener definition
	 */
	add : function(event,listener){
		if( !this.EventListeners[event] ){
			this.EventListeners[event] = { listeners:{}, serial:1 };
		}
		var listeners = this.EventListeners[event].listeners;
		var serial = this.EventListeners[event].serial++;
		listener.serial = serial;
		listeners[serial] = listener;
		return serial;
	},
	
	/**
	 * Register event listener
	 * 
	 * @memberof Craft.Core.NotificationCenter
	 * @method Craft.Core.NotificationCenter.listen
	 * 
	 * @param {String} event - event name
	 * @param {Function} handler - handler
	 */
	listen : function(event,handler){
		var listener = { method:handler, once:false };
		return this.add(event,listener);
	},
	
	/**
	 * Register event listener only onece fired
	 * 
	 * @memberof Craft.Core.NotificationCenter
	 * @method Craft.Core.NotificationCenter.once
	 * 
	 * @param {String} event - event name
	 * @param {Function} handler - handler
	 */
	once : function(event,handler){
		var listener = { method:handler, once:true };
		return this.add(event,listener);
	},
	
	/**
	 * Actual event trigger
	 * 
	 * @private
	 * @param {String} event - event name
	 * @param {Object} obj - argument (optional)
	 */
	do_notify : function(event,obj){
		if( !this.EventListeners[event] ){ return; }
		var listeners = this.EventListeners[event].listeners;
		var serials = Object.keys(listeners);
		var removes = [];
		for( var i=0; i<serials.length; i++ ){
			var serial   = serials[i];
			var listener = listeners[serial];
			var method   = listener.method;
			method(obj);
			if( listener.once ){
				removes.push(serial);
			}
		}
		for( var i=0; i<removes.length; i++ ){
			delete listeners[removes[i]];
		}
	},
	
	/**
	 * Fire event
	 * 
	 * @memberof Craft.Core.NotificationCenter
	 * @method Craft.Core.NotificationCenter.notify
	 * 
	 * @param {String} event - event name
	 * @param {Object} obj - argument (optional)
	 */
	notify : function(event,obj){
		var event_names = Object.keys(this.EventListeners);
		var hits = [];
		for( var i=0; i<event_names.length; i++ ){
			var event_name = event_names[i];
			var pattern = event_name.replace("\/","\\/").replace("\.","\\.").replace("*",".*");
			if( event.match(pattern) ){
				hits.push(event_name);
			}
		}
		for( var i=0; i<hits.length; i++ ){
			this.do_notify(hits[i],obj);
		}
	},
	
	/**
	 * Remove listener
	 * 
	 * @memberof Craft.Core.NotificationCenter
	 * @method Craft.Core.NotificationCenter.remove
	 * 
	 * @param {String} event - event name
	 * @param {Number} serial - serial id
	 */
	remove : function(event,serial){
		if( !this.EventListeners[event] ){ return; }
		var listeners = this.EventListeners[event].listeners;
		delete listeners[serial];
	}

};
