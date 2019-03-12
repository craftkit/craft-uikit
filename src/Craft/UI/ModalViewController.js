
import { View } from './View.js';
import { Transition } from '../Core/Transition.js';

/** 
 * ViewController for Modal.
 * 
 * If you put full page content, 
 * you have to set content background color by yourself to fill the safe area.
 * 
 * ``` 
 * modalViewController.setContent(modal_page);
 * modalViewController.content.style['background-color'] = '#fff';
 * ``` 
 * 
 * @packagename Craft.UI.ModalViewController
 * 
 * @example
 * 
 * const modalViewController = new Craft.UI.ModalViewController();
 * modalViewController.loadView();
 * 
 * const dialog = new Dialog({
 *     closeHandler : () => {
 *         modalViewController.hideContent( () => {
 *             dialog.unloadView();
 *             modalViewController.unloadView();
 *         });
 *     }
 * });
 * dialog.loadView();
 * 
 * modalViewController.setContent(dialog);
 * 
 * Craft.Core.Context.getRootViewController().appendView(modalViewController);
 * modalViewController.showContent();
 * 
 */
export class ModalViewController extends View {
	
	/**
	 * ModalViewController Constructor
	 * 
	 * You can customize modal behaviour via `this.MaskConfig` and `this.AnimationConfig`.  
	 * See the code if needed.
	 */
	constructor(){
		super();
		
		this.packagename = 'Craft.UI.ModalViewController';
		
		this.MaskConfig = {};
		this.MaskConfig.color = '#000';
		this.MaskConfig.opacity = 0.5;
		
		this.AnimationConfig = {};
		this.AnimationConfig.duration  = 150;
		this.AnimationConfig.delayShow = 0;
		this.AnimationConfig.delayHide = 150;
		
		this.mask = '';
		this.container = '';
		
		this.content = '';
		this.viewController = '';
	}
	
	/**
	 * override viewDidLoad: 
	 * @override
	 * @param {Function} callback - callback
	 */
	viewDidLoad(callback){
		this.mask = this.shadow.getElementById('mask');
		this.container = this.shadow.getElementById('container');
		this.view.addEventListener('touchmove',(e) => { e.preventDefault(); });
		this.mask.addEventListener('touchmove',(e) => { e.preventDefault(); });
	}
	
	/**
	 * Set modal content
	 * @param {Craft.Core.Component} component - component
	 */
	setContent(component){
		if( !component.isViewLoaded ){
			component.loadView();
		}
		this.content = component;
		this.content.setViewController(this);
		this.container.style['margin-top'] = String(window.screen.height)+'px';
		this.container.innerHTML = '';
		this.content.viewWillAppear();
		this.container.appendChild(this.content.view);
	}
	
	/**
	 * Show mask
	 * @param {Function} callback - callback
	 */
	showMask(callback){
		this.mask.style['display']          = 'block';
		this.mask.style['opacity']          = this.MaskConfig.opacity;
		this.mask.style['background-color'] = this.MaskConfig.color;
		if( callback ){ callback(); }
	}
	
	/**
	 * Hide mask
	 * @param {Function} callback - callback
	 */
	hideMask(callback){
		Transition.animate({
			element    : this.mask,
			properties : { 'opacity': 0 },
			duration   : this.AnimationConfig.duration,
			delay      : this.AnimationConfig.delayHide,
			callback   : () => {
				this.mask.style['display'] = 'none';
				if( callback ){ callback(); }
			},
		});
	}
	
	/**
	 * Show modal content
	 * @param {Function} callback - callback
	 */
	showContent(callback){
		this.showMask();
		this.content.viewDidAppear();
		Transition.animate({
			element    : this.container,
			properties : { 'margin-top': '0px' },
			duration   : this.AnimationConfig.duration,
			delay      : this.AnimationConfig.delayShow,
			callback   : callback,
		});
	}
	
	/**
	 * Hide modal content
	 * @param {Function} callback - callback
	 */
	hideContent(callback){
		this.hideMask();
		this.content.viewWillDisappear();
		Transition.animate({
			element    : this.container,
			properties : { 'margin-top': String(window.screen.height)+'px' },
			duration   : this.AnimationConfig.duration,
			delay      : this.AnimationConfig.delay,
			callback   : () => {
				this.content.viewDidDisappear();
				this.hideMask(callback);
			}
		});
	}
	
	/**
	 * style
	 * @protected
	 */
	style(){
		return `
			* { 
				box-sizing:border-box; margin:0; padding:0;
			}
			:host {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				overflow-x: hidden;
				overflow-y: hidden;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
				-webkit-touch-callout: none;
			}
			.root {
				width: 100vw;
				height: 100vh;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
				-webkit-touch-callout: none;
			}
			.mask {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				padding-top: env(safe-area-inset-top);
				padding-bottom: env(safe-area-inset-bottom);
				background-color: #000;
				opacity: 0.5;
				overflow-x: hidden;
				overflow-y: hidden;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
				-webkit-touch-callout: none;
			}
			.container {
				display: block;
				position: absolute;
				top: 0px;
				left: 0px;
				margin-top: 0px;
				padding-top: env(safe-area-inset-top);
				padding-bottom: env(safe-area-inset-bottom);
				min-width: 100vw;
				height: 100vh;
				color: #000;
				overflow-x: hidden;
				overflow-y: hidden;
			}
		`;
	}
	
	/**
	 * template
	 * @protected
	 */
	template(){
		return `
			<div class="root">
				<div id="mask" class="mask"></div>
				<div id="container" class="container"></div>
			</div>
		`;
	}
	

}
