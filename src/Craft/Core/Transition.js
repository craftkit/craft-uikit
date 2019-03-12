
/** 
 * Entry point for animation.
 * 
 * @namespace Craft.Core.Transition
 * @packagename Craft.Core.Transition
 * 
 * @example
 * 
 * Craft.Core.Transition.animate({
 *     element : this.view.getElementById('anim_target');,
 *     properties : {
 *         top  : '100px',
 *         left : '150px',
 *     },
 *     duration : 200,   // number (msec)
 *     ease : 'ease-in',
 *     callback : () => {
 *         console.log('animation ended');
 *     }
 * });
 * 
 */
export var Transition = {
	
	/** @private */
	packagename : 'Craft.Core.Transition',
	
	/**
	 * Make animation
	 * 
	 * @memberof Craft.Core.Transition
	 * @method Craft.Core.Transition.animate
	 * 
	 * @param {Object} options - animation paramaters
	 * @param {Element} options.element - element
	 * @param {Object} options.properties - css key-value: ex) top:'100px'
	 * @param {Number} options.duration - msec
	 * @param {Number} options.delay - msec
	 * @param {String} options.ease - ease-in-out
	 * @param {Function} options.callback - callback
	 */
	animate : function(options){
		new Animator(options).animate();
	}
	
};

/** 
 * Internal animation object
 * @access private
 */
class Animator {
	
	/**
	 * Animation constructor
	 * @param {Object} options - animation paramaters
	 * @param {Element} options.element - element
	 * @param {Object} options.properties - css key-value: ex) top:'100px'
	 * @param {Number} options.duration - msec
	 * @param {Number} options.delay - msec
	 * @param {String} options.ease - ease-in-out
	 * @param {Function} options.callback - callback
	 */
	constructor(options){
		this.packagename = 'Craft.Core.Transition.Animator',
		
		this.DEFAULT_DURATION = 150;
		this.DEFAULT_EASE     = 'ease-in';
		
		this.options = options;
	}
	
	/**
	 * Do animation
	 */
	animate(){
		let element    = this.options.element;
		let properties = this.options.properties || {};
		let duration   = this.options.duration   || this.DEFAULT_DURATION; // Number(msec)
		let delay      = this.options.delay      || 0;
		let ease       = this.options.ease       || this.DEFAULT_EASE;
		let callback   = this.options.callback;
		
		if( !element ){ return; }
		
		let animated = false;
		let transitions = [];
		let keys = Object.keys(properties);
		for( let i=0; i<keys.length; i++ ){
			transitions.push( keys[i] + ' ' + String(duration) + 'ms ' + ease + ' ' + delay + 'ms' );
			if( i === 0 ){
				element.style[keys[i]] = window.getComputedStyle(element).getPropertyValue(keys[i]); // force reflow once
			}
		}
		let transition = transitions.join(', ');
		
		element.style.transition = transition;
		
		let handler = function(event){
			if( animated ){ return; }
			animated = true;
			clearTimeout(no_animation);
			element.removeEventListener('transitionend',handler);
			element.style.transition = '';
			if( callback ){ callback(); }
		};
		element.addEventListener('transitionend',handler);
		let no_animation = setTimeout(handler, (parseInt(duration) + parseInt(delay) + 50) );
		
		keys.map(function(key){
			element.style[key] = properties[key];
		});
	}
	
};
