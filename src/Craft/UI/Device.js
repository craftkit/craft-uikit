
/** 
 * Provide device information 
 * 
 * @namespace Craft.UI.Device
 * @packagename Craft.UI.Device
 */
export var Device = {
	
	/**
	 * Report display cutout (quick and dirty)
	 * 
	 * @memberof Craft.UI.Device
	 * @method Craft.UI.Device.hasDisplayCutout
	 * @return {Boolean} - true to the device has display cutout
	 */
	hasDisplayCutout : function(){
		
		let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
		let pixel_ratio = window.devicePixelRatio || 1;
		let screen_width = window.screen.width * pixel_ratio;
		let screen_height = window.screen.height * pixel_ratio;
		
		if( iOS && screen_width === 1125 && screen_height === 2436 ){
			// iPhone XS
			return true;
		}else if( iOS && screen_width === 1242 && screen_height === 2688 ){
			// iPhone XS Max
			return true;
		}else if( iOS && screen_width === 828 && screen_height === 1792 ){
			// iPhone XR
			return true;
		}else{
			return false;
		}
	}
	
}

