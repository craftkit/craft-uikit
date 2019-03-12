
import { Component } from './Component.js';

/** 
 * Component disabled auto componentId
 * 
 * All of your instances will have static componentId based on your `packagename`. 
 * This is for simplify your singleton object. 
 * 
 * @packagename Craft.Core.StickComponent
 */
export class StickComponent extends Component {
	
	/**
	 * init method without serial number
	 * 
	 * (highly recommended to be implemented as synchronous)
	 */
	init(){
		if( this.packagename ){
			this.name = this.packagename.replace(/[\/\.]/g,'_'); // id should not have dot
		}else{
			this.name = this.constructor.name;
		}
		this.componentId = this.name;
		ComponentStack.set(this.componentId,this);
	}
	
}

