
/** 
 * Entry point for gesture.
 * 
 * @namespace Craft.Core.Gesture
 * @packagename Craft.Core.Gesture
 */
export var Gesture = {
	
	/** @private */
	packagename : 'Craft.Core.Gesture',
	
	/**
	 * Enable tap
	 * 
	 * @memberof Craft.Core.Gesture
	 * @method Craft.Core.Gesture.enableTap
	 * 
	 * @param {Element} options.target - target element
	 * @param {Function} options.tap - tap handler
	 * @return {Craft.Core.Gesture.Swipe} swipe handling instance (see code)
	 * 
	 * @example
	 * 
	 * Craft.Core.Gesture.enableTap({
	 *     target : this.view.querySelector('#id'),
	 *     tap    : tapHandler
	 * });
	 * 
	 */
	enableTap : function(options){
		return new Tap(options);
	},
	
	/**
	 * Enable swipe
	 * 
	 * @memberof Craft.Core.Gesture
	 * @method Craft.Core.Gesture.enableSwipe
	 * 
	 * @param {Element} options.target - target element
	 * @param {Number} options.left - swipe left hander
	 * @param {Number} options.right - swipe right hander
	 * @param {Number} options.up - swipe up hander
	 * @param {Number} options.down - swipe down hander
	 * @param {Number} options.DIFF_THRESHOLD - movement should more than this
	 * @param {Number} options.TIME_THRESHOLD - time should be more than this
	 * @param {Number} options.MULTI_THRESHOLD - last multi-touch more than before
	 * @return {Craft.Core.Gesture.Tap} tap handling instance (see code)
	 * 
	 * @example
	 * 
	 * Craft.Core.Gesture.enableSwipe({
	 *     target : this.view.querySelector('#id'),
	 *     left   : swipeLeftHandler,
	 *     right  : swipeRgihtHandler,
	 *     up     : swipeUpHandler,
	 *     down   : swipeDownHandler,
	 * });
	 * 
	 */
	enableSwipe : function(options){
		return new Swipe(options);
	}
	
};

/** 
 * Internal class for handling tap 
 * @private
 */
class Tap {
	
	/**
	 * Make tap handler instance
	 * @param {Element} options.target - target element
	 * @param {Function} options.tap - tap handler
	 */
	constructor(options){
		this.packagename = 'Craft.Core.Gesture.Tap';
		
		this.target     = options.target;
		this.tapHandler = options.tap;
		
		if( 'ontouchend' in window ){
			this.target.addEventListener('touchend', this.handleTouchEnd.bind(this), false); // mobile
		}else{
			this.target.addEventListener('mouseup', this.handleTouchEnd.bind(this), false); // pc
		}
	}
	
	/**
	 * Call by tap event
	 * @param {UIEvent} event - TouchEvent|MouseEvent
	 */
	handleTouchEnd(event){
		if( this.tapHandler ){
			this.tapHandler(event);
		}
	}
};

/** 
 * Internal clss for handling swipe 
 * @private
 */
class Swipe {
	
	/**
	 * Make swipe handler instance
	 * @param {Element} options.target - target element
	 * @param {Function} options.left - swipe left hander
	 * @param {Function} options.right - swipe right hander
	 * @param {Function} options.up - swipe up hander
	 * @param {Function} options.down - swipe down hander
	 * @param {Number} options.DIFF_THRESHOLD - movement should more than this
	 * @param {Number} options.TIME_THRESHOLD - time should be more than this
	 * @param {Number} options.MULTI_THRESHOLD - last multi-touch more than before
	 */
	constructor(options){
		this.packagename = 'Craft.Core.Gesture.Swipe';
		
		this.target = options.target;
		
		this.target.addEventListener('touchstart', this.handleTouchStart.bind(this), false);        
		this.target.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
		
		this.swipeLeftHandler  = options.left;
		this.swipeRightHandler = options.right;
		this.swipeUpHandler    = options.up;
		this.swipeDownHandler  = options.down;
		
		this.DIFF_THRESHOLD  = options.DIFF_THRESHOLD  || 50;
		this.TIME_THRESHOLD  = options.TIME_THRESHOLD  || 40;
		this.MULTI_THRESHOLD = options.MULTI_THRESHOLD || 60;
		
		this.xDown = null;
		this.yDown = null;
		this.tDown = null;
		
		this.lastMultiTouch = null;
	}
	
	/**
	 * Called by touch start event
	 * @param {TouchEvent} event - TouchEvent
	 */
	handleTouchStart(event){
		let firstTouch = event.touches[0];
		this.xDown = firstTouch.clientX;
		this.yDown = firstTouch.clientY;
		this.tDown = Date.now();
	}
	
	/**
	 * Called by touch end event
	 * @param {TouchEvent} event - TouchEvent
	 */
	handleTouchMove(event){
		if( !this.xDown || !this.yDown || !this.tDown ){
			return;
		}
		if( event.touches.length > 1 ){
			this.lastMultiTouch = Date.now();
			return; // multi touch
		}
		
		let xUp = event.touches[0].clientX;
		let yUp = event.touches[0].clientY;
		
		let xDiff = this.xDown - xUp;
		let yDiff = this.yDown - yUp;
		let tDiff = Date.now() - this.tDown;
		let mDiff = Date.now() - this.lastMultiTouch;
		
		if( Math.abs(xDiff) + Math.abs(yDiff) < this.DIFF_THRESHOLD ){
			return;
		}
		if( tDiff < this.TIME_THRESHOLD ){
			return;
		}
		if( mDiff < this.MULTI_THRESHOLD ){
			return;
		}
		
		if( Math.abs( xDiff ) > Math.abs( yDiff ) ){
			if( xDiff > 0 ){
				if( this.swipeLeftHandler ){ this.swipeLeftHandler(event); }
			}else{
				if( this.swipeRightHandler ){ this.swipeRightHandler(event); }
			}
		}else{
			if( yDiff > 0 ){
				if( this.swipeUpHandler ){ this.swipeUpHandler(event); }
			}else{ 
				if( this.swipeDownHandler){ this.swipeDownHandler(event); }
			}
		}
		
		this.xDown = null;
		this.yDown = null;
		this.tDown = null;
	}
	
};
