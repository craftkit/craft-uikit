
const Craft = {};

import { Bootstrap } from './src/Craft/Core/Bootstrap.js';
import { Route } from './src/Craft/Core/Route.js';
import { Router } from './src/Craft/Core/Router.js';
import { HashRouter } from './src/Craft/Core/HashRouter.js';
import { PathRouter } from './src/Craft/Core/PathRouter.js';
import { Context } from './src/Craft/Core/Context.js';
import { Defaults } from './src/Craft/Core/Defaults.js';
import { ComponentStack } from './src/Craft/Core/ComponentStack.js';
import { KeyboardManager } from './src/Craft/Core/KeyboardManager.js';
import { NotificationCenter } from './src/Craft/Core/NotificationCenter.js';
import { Component } from './src/Craft/Core/Component.js';
import { StickComponent } from './src/Craft/Core/StickComponent.js';
import { Transition } from './src/Craft/Core/Transition.js';
import { Gesture } from './src/Craft/Core/Gesture.js';

Craft.Core = {
	Bootstrap          : Bootstrap,
	Context            : Context,
	Defaults           : Defaults,
	ComponentStack     : ComponentStack,
	KeyboardManager    : KeyboardManager,
	NotificationCenter : NotificationCenter,
	Component          : Component,
	StickComponent     : StickComponent,
	Transition         : Transition,
	Gesture            : Gesture,
	Route              : Route,
	Router             : Router,
	HashRouter         : HashRouter,
	PathRouter         : PathRouter
};

import { View } from './src/Craft/UI/View.js';
import { BlockView } from './src/Craft/UI/BlockView.js';
import { InlineBlockView } from './src/Craft/UI/InlineBlockView.js';
import { DefaultViewController } from './src/Craft/UI/DefaultViewController.js';
import { DefaultRootViewController } from './src/Craft/UI/DefaultRootViewController.js';
import { ModalViewController } from './src/Craft/UI/ModalViewController.js';
import { Device } from './src/Craft/UI/Device.js';

Craft.UI = {
	View                      : View,
	BlockView                 : BlockView,
	InlineBlockView           : InlineBlockView,
	DefaultViewController     : DefaultViewController,
	DefaultRootViewController : DefaultRootViewController,
	ModalViewController       : ModalViewController,
	Device                    : Device
};

Craft.Widget = {}; // placeholder

Craft.usePackage = function(packages){
	packages.inject(Craft);
};

export default Craft;

