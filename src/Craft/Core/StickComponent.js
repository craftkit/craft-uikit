
import { Component } from './Component.js';

/** 
 * Component disabled auto componentId
 * 
 * All of your instances will have static componentId based on your `packagename`. 
 * This will simplify singleton object. 
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
			this.componentname = this.packagename.replace(/[\/\.]/g,'_'); // id should not have dot
		}else{
			this.componentname = this.constructor.name;
		}
		this.componentId = this.componentname;
		ComponentStack.set(this.componentId,this);
	}
	
}

