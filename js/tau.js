/*
 * TAU (Tizen Advanced UI)
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */

(function(window, document, undefined) {

var ns = window.tau = {},
nsConfig = window.tauConfig = window.tauConfig || {};
nsConfig.rootNamespace = 'tau';
nsConfig.fileName = 'tau';
ns.version = '0.9.27';
/*global window, console, define, ns, nsConfig */
/*jslint plusplus:true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Core namespace
 * Object contains main framework methods.
 * @class ns
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function (document, ns, nsConfig) {
	
			var idNumberCounter = 0,
			currentDate = +new Date(),
			slice = [].slice,
			rootNamespace = nsConfig.rootNamespace,
			fileName = nsConfig.fileName,
			infoForLog = function (args) {
				var dateNow = new Date();
				args.unshift('[' + rootNamespace + '][' + dateNow.toLocaleString() + ']');
			};

		/**
		* Return unique id
		* @method getUniqueId
		* @static
		* @return {string}
		* @member ns
		*/
		ns.getUniqueId = function () {
			return rootNamespace + "-" + ns.getNumberUniqueId() + "-" + currentDate;
		};

		/**
		* Return unique id
		* @method getNumberUniqueId
		* @static
		* @return {number}
		* @member ns
		*/
		ns.getNumberUniqueId = function () {
			return idNumberCounter++;
		};

		/**
		* logs supplied messages/arguments
		* @method log
		* @static
		* @param {...*} argument
		* @member ns
		*/
		ns.log = function () {
			var args = slice.call(arguments);
			infoForLog(args);
			if (console) {
				console.log.apply(console, args);
			}
		};

		/**
		* logs supplied messages/arguments ad marks it as warning
		* @method warn
		* @static
		* @param {...*} argument
		* @member ns
		*/
		ns.warn = function () {
			var args = slice.call(arguments);
			infoForLog(args);
			if (console) {
				console.warn.apply(console, args);
			}
		};

		/**
		* logs supplied messages/arguments and marks it as error
		* @method error
		* @static
		* @param {...*} argument
		* @member ns
		*/
		ns.error = function () {
			var args = slice.call(arguments);
			infoForLog(args);
			if (console) {
				console.error.apply(console, args);
			}
		};

		/**
		* get from nsConfig
		* @method getConfig
		* @param {string} key
		* @param {*} defaultValue
		* @return {*}
		* @static
		* @member ns
		*/
		ns.getConfig = function (key, defaultValue) {
			return nsConfig[key] === undefined ? defaultValue : nsConfig[key];
		};

		/**
		 * set in nsConfig
		 * @method setConfig
		 * @param {string} key
		 * @param {*} value
		 * @param {boolean} [asDefault=false] value should be treated as default (doesn't overwrites the config[key] if it already exists)
		 * @static
		 * @member ns
		*/
		ns.setConfig = function (key, value, asDefault) {
			if (!asDefault || (asDefault && nsConfig[key] === undefined)) {
				nsConfig[key] = value;
			}
		};

		/**
		 * Return path for framework script file.
		 * @method getFrameworkPath
		 * @returns {?string}
		 * @member ns
		 */
		ns.getFrameworkPath = function () {
			var scripts = document.getElementsByTagName('script'),
				countScripts = scripts.length,
				i,
				url,
				arrayUrl,
				count;
			for (i = 0; i < countScripts; i++) {
				url = scripts[i].src;
				arrayUrl = url.split('/');
				count = arrayUrl.length;
				if (arrayUrl[count - 1] === fileName + '.js' || arrayUrl[count - 1] === fileName + '.min.js') {
					return arrayUrl.slice(0, count - 1).join('/');
				}
			}
			return null;
		};

		}(window.document, ns, nsConfig));

/*global window, define*/
/*jslint bitwise: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (ns) {
	
	
			// Default configuration properties
			ns.setConfig('rootDir', ns.getFrameworkPath(), true);
			ns.setConfig('version', '');
			ns.setConfig('allowCrossDomainPages', false, true);
			ns.setConfig('domCache', false, true);
			// .. other possible options
			// ns.setConfig('autoBuildOnPageChange', true);
			// ns.setConfig('autoInitializePage', true);
			// ns.setConfig('container', document.body); // for defining application container
			// ns.setConfig('pageContainer', document.body); // same as above, but for wearable version

			}(ns));

/*global window, define*/
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint bitwise: true */
/*
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (ns) {
	
	
			// Default configuration properties for wearable
			ns.setConfig('autoBuildOnPageChange', false, true);
			ns.setConfig('popupTransition', 'slideup');
			// .. other possible options
			// ns.setConfig('autoInitializePage', true);
			// ns.setConfig('pageContainer', document.body); // defining application container for wearable

			}(ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint plusplus: true, nomen: true */
//  * @TODO add support of $.mobile.buttonMarkup.hoverDelay
/*
 * Defaults settings object
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @class ns.defaults
 */
(function (ns) {
	
	
			ns.defaults = {};

			Object.defineProperty(ns.defaults, "autoInitializePage", {
				 get: function(){
					 return ns.getConfig("autoInitializePage", true);
				 },
				 set: function(value){
					 return ns.setConfig("autoInitializePage", value);
				 }
			});

			Object.defineProperty(ns.defaults, "dynamicBaseEnabled", {
				 get: function(){
					 return ns.getConfig("dynamicBaseEnabled", true);
				 },
				 set: function(value){
					 return ns.setConfig("dynamicBaseEnabled", value);
				 }
			});

			Object.defineProperty(ns.defaults, "pageTransition", {
				 get: function(){
					 return ns.getConfig("pageTransition", "none");
				 },
				 set: function(value){
					 return ns.setConfig("pageTransition", value);
				 }
			});

			Object.defineProperty(ns.defaults, "popupTransition", {
				 get: function(){
					 return ns.getConfig("popupTransition", "none");
				 },
				 set: function(value){
					 return ns.setConfig("popupTransition", value);
				 }
			});

			}(ns));

/*global window, define, XMLHttpRequest, console, Blob */
/*jslint nomen: true, browser: true, plusplus: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Utilities
 *
 * The Tizen Advanced UI (TAU) framework provides utilities for easy-developing
 * and fully replaceable with jQuery method. When user using these DOM and
 * selector methods, it provide more light logic and it proves performance
 * of web app. The following table displays the utilities provided by the
 * TAU framework.
 *
 * @class ns.util
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (window, document, ns) {
	
				var currentFrame = null,
				/**
				 * requestAnimationFrame function
				 * @method requestAnimationFrame
				 * @static
				 * @member ns.util
				*/
				requestAnimationFrame = (window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function (callback) {
						currentFrame = window.setTimeout(callback.bind(callback, +new Date()), 1000 / 60);
					}).bind(window),
				util = ns.util || {},
				slice = [].slice;

			/**
			 * fetchSync retrieves a text document synchronously, returns null on error
			 * @param {string} url
			 * @param {=string} [mime=""] Mime type of the resource
			 * @return {string|null}
			 * @static
			 * @member ns.util
			 */
			function fetchSync(url, mime) {
				var xhr = new XMLHttpRequest(),
					status;
				xhr.open("get", url, false);
				if (mime) {
					xhr.overrideMimeType(mime);
				}
				xhr.send();
				if (xhr.readyState === 4) {
					status = xhr.status;
					if (status === 200 || (status === 0 && xhr.responseText)) {
						return xhr.responseText;
					}
				}

				return null;
			}
			util.fetchSync = fetchSync;

			/**
			 * Removes all script tags with src attribute from document and returns them
			 * @param {HTMLElement} container
			 * @return {Array.<HTMLElement>}
			 * @private
			 * @static
			 * @member ns.util
			 */
			function removeExternalScripts(container) {
				var scripts = slice.call(container.querySelectorAll("script[src]")),
					i = scripts.length,
					script;

				while (--i >= 0) {
					script = scripts[i];
					script.parentNode.removeChild(script);
				}

				return scripts;
			}

			/**
			 * Evaluates code, reason for a function is for an atomic call to evaluate code
			 * since most browsers fail to optimize functions with try-catch blocks, so this
			 * minimizes the effect, returns the function to run
			 * @param {string} code
			 * @return {Function}
			 * @static
			 * @member ns.util
			 */
			function safeEvalWrap(code) {
				return function () {
					try {
						window.eval(code);
					} catch (e) {
						if (typeof console !== "undefined") {
							if (e.stack) {
								console.error(e.stack);
							} else if (e.name && e.message) {
								console.error(e.name, e.message);
							} else {
								console.error(e);
							}
						}
					}
				};
			}
			util.safeEvalWrap = safeEvalWrap;

			/**
			 * Calls functions in supplied queue (array)
			 * @param {Array.<Function>} functionQueue
			 * @static
			 * @member ns.util
			 */
			function batchCall(functionQueue) {
				var i,
					length = functionQueue.length;
				for (i = 0; i < length; ++i) {
					functionQueue[i].call(window);
				}
			}
			util.batchCall = batchCall;

			/**
			 * Creates new script elements for scripts gathered from a differnt document
			 * instance, blocks asynchronous evaluation (by renaming src attribute) and
			 * returns an array of functions to run to evalate those scripts
			 * @param {Array.<HTMLElement>} scripts
			 * @param {HTMLElement} container
			 * @return {Array.<Function>}
			 * @private
			 * @static
			 * @member ns.util
			 */
			function createScriptsSync(scripts, container) {
				var scriptElement,
					scriptBody,
					i,
					length,
					queue = [];

				// proper order of execution
				for (i = 0, length = scripts.length; i < length; ++i) {
					scriptBody = fetchSync(scripts[i].src, "text/plain");
					if (scriptBody) {
						scriptElement = document.adoptNode(scripts[i]);
						scriptElement.setAttribute("data-src", scripts[i].src);
						scriptElement.removeAttribute("src"); // block evaluation
						queue.push(safeEvalWrap(scriptBody));
						if (container) {
							container.appendChild(scriptElement);
						}
					}
				}

				return queue;
			}

			util.requestAnimationFrame = requestAnimationFrame;

			/**
			* cancelAnimationFrame function
			* @method cancelAnimationFrame
			* @return {Function}
			* @member ns.util
			* @static
			*/
			util.cancelAnimationFrame = (window.cancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					function () {
						// propably wont work if there is any more than 1
						// active animationFrame but we are trying anyway
					window.clearTimeout(currentFrame);
				}).bind(window);

			/**
			 * Method make asynchronous call of function
			 * @method async
			 * @inheritdoc #requestAnimationFrame
			 * @member ns.util
			 * @static
			 */
			util.async = requestAnimationFrame;

			/**
			 * Appends element from different document instance to current document in the
			 * container element and evaluates scripts (synchronously)
			 * @param {HTMLElement} element
			 * @param {HTMLElement} container
			 * @method importEvaluateAndAppendElement
			 * @member ns.util
			 * @static
			 */
			util.importEvaluateAndAppendElement = function (element, container) {
				var externalScriptsQueue = createScriptsSync(removeExternalScripts(element), element),
					newNode = document.importNode(element, true);

				container.appendChild(newNode); // append and eval inline
				batchCall(externalScriptsQueue);

				return newNode;
			};

			/**
			* Checks if specified string is a number or not
			* @method isNumber
			* @return {boolean}
			* @member ns.util
			* @static
			*/
			util.isNumber = function (query) {
				var parsed = parseFloat(query);
				return !isNaN(parsed) && isFinite(parsed);
			};

			/**
			 * Reappend script tags to DOM structure to correct run script
			 * @method runScript
			 * @param {string} baseUrl
			 * @param {HTMLScriptElement} script
			 * @member ns.util
			 * @deprecated 2.3
			 */
			util.runScript = function (baseUrl, script) {
				var newScript = document.createElement("script"),
					scriptData = null,
					i,
					scriptAttributes = slice.call(script.attributes),
					src = script.getAttribute("src"),
					path = util.path,
					request,
					attribute,
					status;

				// 'src' may become null when none src attribute is set
				if (src !== null) {
					src = path.makeUrlAbsolute(src, baseUrl);
				}

				//Copy script tag attributes
				i = scriptAttributes.length;
				while (--i >= 0) {
					attribute = scriptAttributes[i];
					if (attribute.name !== "src") {
						newScript.setAttribute(attribute.name, attribute.value);
					} else {
						newScript.setAttribute("data-src", attribute.value);
					}
				}

				if (src) {
					scriptData = fetchSync(src, "text/plain");
									} else {
					scriptData = script.textContent;
				}

				if (scriptData) {
					// add the returned content to a newly created script tag
					newScript.src = URL.createObjectURL(new Blob([scriptData], {type: "text/javascript"}));
					newScript.textContent = scriptData; // for compatibility with some libs ex. templating systems
				}
				script.parentNode.replaceChild(newScript, script);
			};

			ns.util = util;
			}(window, window.document, ns));

/*global window, define */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Array Utility
 * Utility helps work with arrays.
 * @class ns.util.array
 */
(function (window, document, ns) {
	
				/**
			 * Create an array containing the range of integers or characters
			 * from low to high (inclusive)
			 * @method range
			 * @param {number|string} low
			 * @param {number|string} high
			 * @param {number} step
			 * @static
			 * @return {Array} array containing continous elements
			 * @member ns.util.array
			 */
			function range(low, high, step) {
				// Create an array containing the range of integers or characters
				// from low to high (inclusive)
				//
				// version: 1107.2516
				// discuss at: http://phpjs.org/functions/range
				// +   original by: Waldo Malqui Silva
				// *	example 1: range ( 0, 12 );
				// *	returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
				// *	example 2: range( 0, 100, 10 );
				// *	returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
				// *	example 3: range( 'a', 'i' );
				// *	returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
				// *	example 4: range( 'c', 'a' );
				// *	returns 4: ['c', 'b', 'a']
				var matrix = [],
					inival,
					endval,
					plus,
					walker = step || 1,
					chars = false;

				if (!isNaN(low) && !isNaN(high)) {
					inival = low;
					endval = high;
				} else if (isNaN(low) && isNaN(high)) {
					chars = true;
					inival = low.charCodeAt(0);
					endval = high.charCodeAt(0);
				} else {
					inival = (isNaN(low) ? 0 : low);
					endval = (isNaN(high) ? 0 : high);
				}

				plus = inival <= endval;
				if (plus) {
					while (inival <= endval) {
						matrix.push((chars ? String.fromCharCode(inival) : inival));
						inival += walker;
					}
				} else {
					while (inival >= endval) {
						matrix.push((chars ? String.fromCharCode(inival) : inival));
						inival -= walker;
					}
				}

				return matrix;
			}

			/**
			 * Check object is arraylike (arraylike include array and
			 * collection)
			 * @method isArrayLike
			 * @param {Object} object
			 * @return {boolean} Whether arraylike object or not
			 * @member ns.util.array
			 * @static
			 */
			function isArrayLike(object) {
				var type = typeof object,
					length = object && object.length;

				// if object exists and is different from window
				// window object has length property
				if (object && object !== object.window) {
					// If length value is not number, object is not array and collection.
					// Collection type is not array but has length value.
					// e.g) Array.isArray(document.childNodes) ==> false
					return Array.isArray(object) || object instanceof NodeList || type === "function" &&
						(length === 0 || typeof length === "number" && length > 0 && (length - 1) in object);
				}
				return false;
			}

			ns.util.array = {
				range: range,
				isArrayLike: isArrayLike
			};
			}(window, window.document, ns));

/*global window, ns, define, CustomEvent */
/*jslint nomen: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Events
 *
 * The Tizen Advanced UI (TAU) framework provides events optimized for the Tizen
 * Web application. The following table displays the events provided by the TAU
 * framework.
 * @class ns.event
 */
(function (window, ns) {
	
	
			/**
			* Checks if specified variable is a array or not
			* @method isArray
			* @return {boolean}
			* @member ns.event
			* @private
			* @static
			*/
		var isArray = Array.isArray,
			isArrayLike = ns.util.array.isArrayLike,
			/**
			 * @property {RegExp} SPLIT_BY_SPACES_REGEXP
			 */
			SPLIT_BY_SPACES_REGEXP = /\s+/g,

			/**
			 * Returns trimmed value
			 * @method trim
			 * @param {string} value
			 * @return {string} trimmed string
			 * @static
			 * @private
			 * @member ns.event
			 */
			trim = function (value) {
				return value.trim();
			},

			/**
			 * Split string to array
			 * @method getEventsListeners
			 * @param {string|Array|Object} names string with one name of event, many names of events divided by spaces, array with names of widgets or object in which keys are names of events and values are callbacks
			 * @param {Function} globalListener
			 * @return {Array}
			 * @static
			 * @private
			 * @member ns.event
			 */
			getEventsListeners = function (names, globalListener) {
				var name,
					result = [],
					i;

				if (typeof names === 'string') {
					names = names.split(SPLIT_BY_SPACES_REGEXP).map(trim);
				}

				if (isArray(names)) {
					for (i=0; i<names.length; i++) {
						result.push({type: names[i], callback: globalListener});
					}
				} else {
					for (name in names) {
						if (names.hasOwnProperty(name)) {
							result.push({type: name, callback: names[name]});
						}
					}
				}
				return result;
			};

			ns.event = {

				/**
				* Triggers custom event fastOn element
				* The return value is false, if at least one of the event
				* handlers which handled this event, called preventDefault.
				* Otherwise it returns true.
				* @method trigger
				* @param {HTMLElement} element
				* @param {string} type
				* @param {?*} [data=null]
				* @param {boolean=} [bubbles=true]
				* @param {boolean=} [cancelable=true]
				* @return {boolean=}
				* @member ns.event
				* @static
				*/
				trigger: function (element, type, data, bubbles, cancelable) {
					var evt = new CustomEvent(type, {
							"detail": data,
							//allow event to bubble up, required if we want to allow to listen fastOn document etc
							bubbles: typeof bubbles === "boolean" ? bubbles : true,
							cancelable: typeof cancelable === "boolean" ? cancelable : true
						});
										return element.dispatchEvent(evt);
				},

				/**
				 * Prevent default on original event
				 * @method preventDefault
				 * @param {CustomEvent} event
				 * @member ns.event
				 * @static
				 */
				preventDefault: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;
					if (originalEvent && originalEvent.preventDefault) {
						originalEvent.preventDefault();
					}
					event.preventDefault();
				},

				/**
				* Stop event propagation
				* @method stopPropagation
				* @param {CustomEvent} event
				* @member ns.event
				* @static
				*/
				stopPropagation: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;
					if (originalEvent && originalEvent.stopPropagation) {
						originalEvent.stopPropagation();
					}
					event.stopPropagation();
				},

				/**
				* Stop event propagation immediately
				* @method stopImmediatePropagation
				* @param {CustomEvent} event
				* @member ns.event
				* @static
				*/
				stopImmediatePropagation: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;
					if (originalEvent && originalEvent.stopImmediatePropagation) {
						originalEvent.stopImmediatePropagation();
					}
					event.stopImmediatePropagation();
				},

				/**
				 * Return document relative cords for event
				 * @method documentRelativeCoordsFromEvent
				 * @param {Event} event
				 * @return {Object}
				 * @return {number} return.x
				 * @return {number} return.y
				 * @member ns.event
				 * @static
				 */
				documentRelativeCoordsFromEvent: function(event) {
					var _event = event ? event : window.event,
							client = {
								x: _event.clientX,
								y: _event.clientY
							},
							page = {
								x: _event.pageX,
								y: _event.pageY
							},
							posX = 0,
							posY = 0,
							touch0,
							body = document.body,
							documentElement = document.documentElement;

						if (event.type.match(/^touch/)) {
							touch0 = _event.targetTouches[0] || _event.originalEvent.targetTouches[0];
							page = {
								x: touch0.pageX,
								y: touch0.pageY
							};
							client = {
								x: touch0.clientX,
								y: touch0.clientY
							};
						}

						if (page.x || page.y) {
							posX = page.x;
							posY = page.y;
						}
						else if (client.x || client.y) {
							posX = client.x + body.scrollLeft + documentElement.scrollLeft;
							posY = client.y + body.scrollTop  + documentElement.scrollTop;
						}

						return { x: posX, y: posY };
				},

				/**
				 * Return target relative cords for event
				 * @method targetRelativeCoordsFromEvent
				 * @param {Event} event
				 * @return {Object}
				 * @return {number} return.x
				 * @return {number} return.y
				 * @member ns.event
				 * @static
				 */
				targetRelativeCoordsFromEvent: function(event) {
					var target = event.target,
						cords = {
							x: event.offsetX,
							y: event.offsetY
						};

					if (cords.x === undefined || isNaN(cords.x) ||
						cords.y === undefined || isNaN(cords.y)) {
						cords = ns.event.documentRelativeCoordsFromEvent(event);
						cords.x -= target.offsetLeft;
						cords.y -= target.offsetTop;
					}

					return cords;
				},

				/**
				 * Add event listener to element
				 * @method fastOn
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				fastOn: function(element, type, listener, useCapture) {
					element.addEventListener(type, listener, useCapture || false);
				},

				/**
				 * Remove event listener to element
				 * @method fastOff
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				fastOff: function(element, type, listener, useCapture) {
					element.removeEventListener(type, listener, useCapture || false);
				},

				/**
				 * Add event listener to element that can be added addEventListner
				 * @method on
				 * @param {HTMLElement|HTMLDocument|Window} element
				 * @param {string|Array|Object} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				on: function(element, type, listener, useCapture) {
					var i,
						j,
						elementsLength,
						typesLength,
						elements,
						listeners;

					if (isArrayLike(element)) {
						elements = element;
					} else {
						elements = [element];
					}
					elementsLength = elements.length;
					listeners = getEventsListeners(type, listener);
					typesLength = listeners.length;
					for (i = 0; i < elementsLength; i++) {
						if (typeof elements[i].addEventListener === "function") {
							for (j = 0; j < typesLength; j++) {
								ns.event.fastOn(elements[i], listeners[j].type, listeners[j].callback, useCapture);
							}
						}
					}
				},

				/**
				 * Remove event listener to element
				 * @method off
				 * @param {HTMLElement|HTMLDocument|Window} element
				 * @param {string|Array|Object} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				off: function(element, type, listener, useCapture) {
					var i,
						j,
						elementsLength,
						typesLength,
						elements,
						listeners;
					if (isArrayLike(element)) {
						elements = element;
					} else {
						elements = [element];
					}
					elementsLength = elements.length;
					listeners = getEventsListeners(type, listener);
					typesLength = listeners.length;
					for (i = 0; i < elementsLength; i++) {
						if (typeof elements[i].addEventListener === "function") {
							for (j = 0; j < typesLength; j++) {
								ns.event.fastOff(elements[i], listeners[j].type, listeners[j].callback, useCapture);
							}
						}
					}
				},

				/**
				 * Add event listener to element only for one trigger
				 * @method one
				 * @param {HTMLElement|HTMLDocument|window} element
				 * @param {string|Array|Object} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				one: function(element, type, listener, useCapture) {
					var arraySlice = [].slice,
						i,
						j,
						elementsLength,
						typesLength,
						elements,
						types,
						listeners,
						callbacks = [];
					if (isArrayLike(element)) {
						elements = arraySlice.call(element);
					} else {
						elements = [element];
					}
					elementsLength = elements.length;
					listeners = getEventsListeners(type, listener);
					typesLength = listeners.length;
					for (i = 0; i < elementsLength; i++) {
						if (typeof elements[i].addEventListener === "function") {
							callbacks[i] = [];
							for (j = 0; j < typesLength; j++) {
								callbacks[i][j] = (function(i, j) {
									var args = arraySlice.call(arguments);
									ns.event.fastOff(elements[i], listeners[j].type, callbacks[i][j], useCapture);
									args.shift(); // remove the first argument of binding function
									args.shift(); // remove the second argument of binding function
									listeners[j].callback.apply(this, args);
								}).bind(null, i, j);
								ns.event.fastOn(elements[i], listeners[j].type, callbacks[i][j], useCapture);
							}
						}
					}
				}

			};

			}(window, ns));

/*global define: true, window: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Selectors Utility
 * Object contains functions to get HTML elements by different selectors.
 * @class ns.util.selectors
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Damian Osipiuk <d.osipiuk@samsung.com>
 */
(function (document, ns) {
	
				/**
			 * @method slice Alias for array slice method
			 * @member ns.util.selectors
			 * @private
			 * @static
			 */
			var slice = [].slice,
				/**
				 * @method matchesSelectorType
				 * @return {string|boolean}
				 * @member ns.util.selectors
				 * @private
				 * @static
				 */
				matchesSelectorType = (function () {
					var el = document.createElement("div");

					if (typeof el.webkitMatchesSelector === "function") {
						return "webkitMatchesSelector";
					}

					if (typeof el.mozMatchesSelector === "function") {
						return "mozMatchesSelector";
					}

					if (typeof el.msMatchesSelector === "function") {
						return "msMatchesSelector";
					}

					if (typeof el.matchesSelector === "function") {
						return "matchesSelector";
					}

					return false;
				}());

			/**
			 * Prefix selector with 'data-' and namespace if present
			 * @method getDataSelector
			 * @param {string} selector
			 * @return {string}
			 * @member ns.util.selectors
			 * @private
			 * @static
			 */
			function getDataSelector(selector) {
				var namespace = ns.getConfig('namespace');
				return '[data-' + (namespace ? namespace + '-' : '') + selector + ']';
			}

			/**
			 * Runs matches implementation of matchesSelector
			 * method on specified element
			 * @method matchesSelector
			 * @param {HTMLElement} element
			 * @param {string} selector
			 * @return {boolean}
			 * @static
			 * @member ns.util.selectors
			 */
			function matchesSelector(element, selector) {
				if (matchesSelectorType && element[matchesSelectorType]) {
					return element[matchesSelectorType](selector);
				}
				return false;
			}

			/**
			 * Return array with all parents of element.
			 * @method parents
			 * @param {HTMLElement} element
			 * @return {Array}
			 * @member ns.util.selectors
			 * @private
			 * @static
			 */
			function parents(element) {
				var items = [],
					current = element.parentNode;
				while (current && current !== document) {
					items.push(current);
					current = current.parentNode;
				}
				return items;
			}

			/**
			 * Checks if given element and its ancestors matches given function
			 * @method closest
			 * @param {HTMLElement} element
			 * @param {Function} testFunction
			 * @return {?HTMLElement}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function closest(element, testFunction) {
				var current = element;
				while (current && current !== document) {
					if (testFunction(current)) {
						return current;
					}
					current = current.parentNode;
				}
				return null;
			}

			/**
			 * @method testSelector
			 * @param {string} selector
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function testSelector(selector, node) {
				return matchesSelector(node, selector);
			}

			/**
			 * @method testClass
			 * @param {string} className
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function testClass(className, node) {
				return node && node.classList && node.classList.contains(className);
			}

			/**
			 * @method testTag
			 * @param {string} tagName
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function testTag(tagName, node) {
				return node.tagName.toLowerCase() === tagName;
			}

			/**
			 * @class ns.util.selectors
			 */
			ns.util.selectors = {
				matchesSelector: matchesSelector,

				/**
				* Return array with children pass by given selector.
				* @method getChildrenBySelector
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getChildrenBySelector: function (context, selector) {
					return slice.call(context.children).filter(testSelector.bind(null, selector));
				},

				/**
				* Return array with children pass by given data-namespace-selector.
				* @method getChildrenByDataNS
				* @param {HTMLElement} context
				* @param {string} dataSelector
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getChildrenByDataNS: function (context, dataSelector) {
					return slice.call(context.children).filter(testSelector.bind(null, getDataSelector(dataSelector)));
				},

				/**
				* Return array with children with given class name.
				* @method getChildrenByClass
				* @param {HTMLElement} context
				* @param {string} className
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getChildrenByClass: function (context, className) {
					return slice.call(context.children).filter(testClass.bind(null, className));
				},

				/**
				* Return array with children with given tag name.
				* @method getChildrenByTag
				* @param {HTMLElement} context
				* @param {string} tagName
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getChildrenByTag: function (context, tagName) {
					return slice.call(context.children).filter(testTag.bind(null, tagName));
				},

				/**
				* Return array with all parents of element.
				* @method getParents
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getParents: parents,

				/**
				* Return array with all parents of element pass by given selector.
				* @method getParentsBySelector
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getParentsBySelector: function (context, selector) {
					return parents(context).filter(testSelector.bind(null, selector));
				},

				/**
				* Return array with all parents of element pass by given selector with namespace.
				* @method getParentsBySelectorNS
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getParentsBySelectorNS: function (context, selector) {
					return parents(context).filter(testSelector.bind(null, getDataSelector(selector)));
				},

				/**
				* Return array with all parents of element with given class name.
				* @method getParentsByClass
				* @param {HTMLElement} context
				* @param {string} className
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getParentsByClass: function (context, className) {
					return parents(context).filter(testClass.bind(null, className));
				},

				/**
				* Return array with all parents of element with given tag name.
				* @method getParentsByTag
				* @param {HTMLElement} context
				* @param {string} tagName
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getParentsByTag: function (context, tagName) {
					return parents(context).filter(testTag.bind(null, tagName));
				},

				/**
				* Return first element from parents of element pass by selector.
				* @method getClosestBySelector
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @member ns.util.selectors
				*/
				getClosestBySelector: function (context, selector) {
					return closest(context, testSelector.bind(null, selector));
				},

				/**
				* Return first element from parents of element pass by selector with namespace.
				* @method getClosestBySelectorNS
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @member ns.util.selectors
				*/
				getClosestBySelectorNS: function (context, selector) {
					return closest(context, testSelector.bind(null, getDataSelector(selector)));
				},

				/**
				* Return first element from parents of element with given class name.
				* @method getClosestByClass
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @member ns.util.selectors
				*/
				getClosestByClass: function (context, selector) {
					return closest(context, testClass.bind(null, selector));
				},

				/**
				* Return first element from parents of element with given tag name.
				* @method getClosestByTag
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @member ns.util.selectors
				*/
				getClosestByTag: function (context, selector) {
					return closest(context, testTag.bind(null, selector));
				},

				/**
				* Return array of elements from context with given data-selector
				* @method getAllByDataNS
				* @param {HTMLElement} context
				* @param {string} dataSelector
				* @return {Array}
				* @static
				* @member ns.util.selectors
				*/
				getAllByDataNS: function (context, dataSelector) {
					return slice.call(context.querySelectorAll(getDataSelector(dataSelector)));
				}
			};
			}(window.document, ns));

/*global window, define, ns */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Object Utility
 * Object contains functions help work with objects.
 * @class ns.util.object
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (ns) {
	
	
			var object = {
				/**
				* Copy object to new object
				* @method copy
				* @param {Object} orgObject
				* @return {Object}
				* @static
				* @member ns.util.object
				*/
				copy: function (orgObject) {
					return object.merge({}, orgObject);
				},

				/**
				* Attach fields from second object to first object.
				* @method fastMerge
				* @param {Object} newObject
				* @param {Object} orgObject
				* @return {Object}
				* @static
				* @member ns.util.object
				*/
				fastMerge: function (newObject, orgObject) {
					var key;
					for (key in orgObject) {
						if (orgObject.hasOwnProperty(key)) {
							newObject[key] = orgObject[key];
						}
					}
					return newObject;
				},

				/**
				* Attach fields from second and next object to first object.
				* @method merge
				* @param {Object} newObject
				* @param {...Object} orgObject
				* @param {?boolean} [override=true]
				* @return {Object}
				* @static
				* @member ns.util.object
				*/
				merge: function ( /* newObject, orgObject, override */ ) {
					var newObject, orgObject, override,
						key,
						args = [].slice.call(arguments),
						argsLength = args.length,
						i;
					newObject = args.shift();
					override = true;
					if (typeof arguments[argsLength-1] === "boolean") {
						override = arguments[argsLength-1];
						argsLength--;
					}
					for (i = 0; i < argsLength; i++) {
						orgObject = args.shift();
						if (orgObject !== null) {
							for (key in orgObject) {
								if (orgObject.hasOwnProperty(key) && ( override || newObject[key] === undefined )) {
									newObject[key] = orgObject[key];
								}
							}
						}
					}
					return newObject;
				},

				/**
				 * Function add to Constructor prototype Base object and add to prototype properties and methods from
				 * prototype object.
				 * @method inherit
				 * @param {Function} Constructor
				 * @param {Function} Base
				 * @param {Object} prototype
				 * @static
				 * @member ns.util.object
				 */
				/* jshint -W083 */
				inherit: function( Constructor, Base, prototype ) {
					var basePrototype = new Base(),
						property,
						value;
					for (property in prototype) {
						if (prototype.hasOwnProperty(property)) {
							value = prototype[property];
							if ( typeof value === "function" ) {
								basePrototype[property] = (function createFunctionWithSuper(Base, property, value) {
									var _super = function() {
										var superFunction = Base.prototype[property];
										if (superFunction) {
											return superFunction.apply(this, arguments);
										}
										return null;
									};
									return function() {
										var __super = this._super,
											returnValue;

										this._super = _super;
										returnValue = value.apply(this, arguments);
										this._super = __super;
										return returnValue;
									};
								}(Base, property, value));
							} else {
								basePrototype[property] = value;
							}
						}
					}

					Constructor.prototype = basePrototype;
					Constructor.prototype.constructor = Constructor;
				},

				/**
				 * Returns true if every property value corresponds value from 'value' argument
				 * @method hasPropertiesOfValue
				 * @param {Object} obj
				 * @param {*} [value=undefined]
				 * @return {boolean}
				 */
				hasPropertiesOfValue: function (obj, value) {
					var keys = Object.keys(obj),
						i = keys.length;

					// Empty array should return false
					if (i === 0) {
						return false;
					}

					while (--i >= 0) {
						if (obj[keys[i]] !== value) {
							return false;
						}
					}

					return true;
				}
			};
			ns.util.object = object;
			}(ns));

/*global window, define, ns, Node, HTMLElement */
/*jslint nomen: true, plusplus: true, bitwise: false */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Engine
 * Main class with engine of library which control communication
 * between parts of framework.
 * @class ns.engine
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Michal Szepielak <m.szepielak@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Przemyslaw Ciezkowski <p.ciezkowski@samsung.com>
 */
(function (window, document, ns) {
	
				/**
			 * @method slice Array.slice
			 * @private
			 * @static
			 * @member ns.engine
			 */
			var slice = [].slice,
				/**
				 * @property {Object} eventUtils {@link ns.event}
				 * @private
				 * @static
				 * @member ns.engine
				 */
				eventUtils = ns.event,
				objectUtils = ns.util.object,
				selectors = ns.util.selectors,
				/**
				 * @property {Object} widgetDefs Object with widgets definitions
				 * @private
				 * @static
				 * @member ns.engine
				 */
				widgetDefs = {},
				/**
				 * @property {Object} widgetBindingMap Object with widgets bindings
				 * @private
				 * @static
				 * @member ns.engine
				 */
				widgetBindingMap = {},
				location = window.location,
				/**
				 * engine mode, if true then engine only builds widgets
				 * @property {boolean} justBuild
				 * @private
				 * @static
				 * @member ns.engine
				 */
				justBuild = location.hash === "#build",
				/**
				 * @property {string} [TYPE_STRING="string"] local cache of string type name
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				TYPE_STRING = "string",
				/**
				 * @property {string} [TYPE_FUNCTION="function"] local cache of function type name
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				TYPE_FUNCTION = "function",
				/**
				 * @property {string} [DATA_BUILT="data-tau-built"] attribute informs that widget id build
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_BUILT = "data-tau-built",
				/**
				 * @property {string} [DATA_NAME="data-tau-name"] attribute contains widget name
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_NAME = "data-tau-name",
				/**
				 * @property {string} [DATA_BOUND="data-tau-bound"] attribute informs that widget id bound
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_BOUND = "data-tau-bound",
				/**
				 * @property {string} NAMES_SEPARATOR
				 * @private
				 * @static
				 * @readonly
				 */
				NAMES_SEPARATOR = ",",
				/**
				 * @property {string} [querySelectorWidgets="*[data-tau-built][data-tau-name]:not([data-tau-bound])"] query selector for all widgets which are built but not bound
				 * @private
				 * @static
				 * @member ns.engine
				 */
					// @TODO this selector is not valid ...
				querySelectorWidgets = "*[" + DATA_BUILT + "][" + DATA_NAME + "]:not([" + DATA_BOUND + "])",
				/**
				 * @method excludeBuildAndBound
				 * @private
				 * @static
				 * @member ns.engine
				 * @return {string} :not([data-tau-built*='widgetName']):not([data-tau-bound*='widgetName'])
				 */
				excludeBuiltAndBound = function (widgetType) {
					return ":not([" + DATA_BUILT + "*='" + widgetType +"']):not([" + DATA_BOUND + "*='" + widgetType +"'])";
				},

				/**
				 * Engine event types
				 * @property {Object} eventType
				 * @property {string} eventType.INIT="tauinit" INIT of framework init event
				 * @property {string} eventType.WIDGET_BOUND="widgetbound" WIDGET_BOUND of widget bound event
				 * @property {string} eventType.WIDGET_DEFINED="widgetdefined" WIDGET_DEFINED of widget built event
				 * @property {string} eventType.WIDGET_BUILT="widgetbuilt" WIDGET_BUILT of widget built event
				 * @property {string} eventType.BOUND="bound" BOUND of bound event
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				eventType = {
					INIT: "tauinit",
					WIDGET_BOUND: "widgetbound",
					WIDGET_DEFINED: "widgetdefined",
					WIDGET_BUILT: "widgetbuilt",
					BOUND: "bound"
				},
				engine,
				/**
				 * @property {Object} router Router object
				 * @private
				 * @static
				 * @member ns.engine
				 */
				router;

			/**
			 * This function prepares selector for widget' definition
			 * @method selectorChange
			 * @param {string} selectorName
			 * @return {string} new selector
			 * @member ns.engine
			 * @static
			 */
			function selectorChange (selectorName) {
				if (selectorName.match(/\[data-role=/) && !selectorName.match(/:not\(\[data-role=/)) {
					return selectorName.trim();
				}
				return selectorName.trim() + ":not([data-role='none'])";
			}

			/**
			 * Function to define widget
			 * @method defineWidget
			 * @param {string} name
			 * @param {string} selector
			 * @param {Array} methods
			 * @param {Object} widgetClass
			 * @param {string} [namespace]
			 * @param {boolean} [redefine]
			 * @param {boolean} [widgetNameToLowercase = true]
			 * @return {boolean}
			 * @member ns.engine
			 * @static
			 */
			function defineWidget(name, selector, methods, widgetClass, namespace, redefine, widgetNameToLowercase) {
				var definition;
				// Widget name is absolutely required
				if (name) {
					if (!widgetDefs[name] || redefine) {
												methods = methods || [];
						methods.push("destroy", "disable", "enable", "option", "refresh", "value");
						definition = {
							name: name,
							methods: methods,
							selector: selector || "",
							selectors: selector ? selector.split(",").map(selectorChange) : [],
							widgetClass: widgetClass || null,
							namespace: namespace || "",
							widgetNameToLowercase: widgetNameToLowercase === undefined ? true : !!widgetNameToLowercase
						};

						widgetDefs[name] = definition;
						eventUtils.trigger(document, "widgetdefined", definition, false);
						return true;
					}
									} else {
					ns.error("Widget with selector [" + selector + "] defined without a name, aborting!");
				}
				return false;
			}

			/**
			 * Get binding for element
			 * @method getBinding
			 * @static
			 * @param {HTMLElement|string} element
			 * @param {string} type widget name
			 * @return {?Object}
			 * @member ns.engine
			 */
			function getBinding(element, type) {
				var id = !element || typeof element === TYPE_STRING ? element : element.id,
					binding,
					widgetInstance,
					bindingElement,
					storedWidgetNames;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(id);
				}

				// Fetch group of widget defined for this element
				binding = widgetBindingMap[id];

				if (binding && typeof binding === "object") {
					// If name is defined it's possible to fetch it instantly
					if (type) {
						widgetInstance = binding.instances[type];
					} else {
						storedWidgetNames = Object.keys(binding.instances);
						widgetInstance = binding.instances[storedWidgetNames[0]];
					}

					// Return only it instance of the proper widget exists
					if (widgetInstance) {
						
						// Check if widget instance has that same object referenced
						if (widgetInstance.element === element) {
							return widgetInstance;
						}
					}
				}

				return null;
			}

			/**
			 * Set binding of widget
			 * @method setBinding
			 * @param {ns.widget.BaseWidget} widgetInstance
			 * @static
			 * @member ns.engine
			 */
			function setBinding(widgetInstance) {
				var id = widgetInstance.element.id,
					type = widgetInstance.name,
					widgetBinding = widgetBindingMap[id];

				
				// If the HTMLElement never had a widget declared create an empty object
				if(!widgetBinding) {
					widgetBinding = {
						elementId: id,
						element: widgetInstance.element,
						instances: {}
					};
				}

				widgetBinding.instances[type] = widgetInstance;
				widgetBindingMap[id] = widgetBinding;
			}

			/**
			 * Returns all bindings for element or id gives as parameter
			 * @method getAllBindings
			 * @param {HTMLElement|string} element
			 * @return {?Object}
			 * @static
			 * @member ns.engine
			 */
			function getAllBindings(element) {
				var id = !element || typeof element === TYPE_STRING ? element : element.id;

				return (widgetBindingMap[id] && widgetBindingMap[id].instances) || null;
			}

			/**
			 * Removes given name from attributeValue string.
			 * Names should be separated with a NAMES_SEPARATOR
			 * @param {string} name
			 * @param {string} attributeValue
			 * @private
			 * @static
			 * @return {string}
			 */
			function _removeWidgetNameFromAttribute(name, attributeValue) {
				var widgetNames,
					searchResultIndex;

				// Split attribute value by separator
				widgetNames = attributeValue.split(NAMES_SEPARATOR);
				searchResultIndex = widgetNames.indexOf(name);

				if (searchResultIndex > -1) {
					widgetNames.splice(searchResultIndex, 1);
					attributeValue = widgetNames.join(NAMES_SEPARATOR);
				}

				return attributeValue;
			}

			function _removeAllBindingAttributes(element) {
				element.removeAttribute(DATA_BUILT);
				element.removeAttribute(DATA_BOUND);
				element.removeAttribute(DATA_NAME);
			}
			/**
			 * Remove binding data attributes for element.
			 * @method _removeBindingAttributes
			 * @param {HTMLElement} element
			 * @param {string} type widget type (name)
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function _removeWidgetFromAttributes(element, type) {
				var dataBuilt,
					dataBound,
					dataName;

				// Most often case is that name is not defined
				if (!type) {
					_removeAllBindingAttributes(element);
				} else {
					dataBuilt = _removeWidgetNameFromAttribute(type, element.getAttribute(DATA_BUILT) || "");
					dataBound = _removeWidgetNameFromAttribute(type, element.getAttribute(DATA_BOUND) || "");
					dataName = _removeWidgetNameFromAttribute(type, element.getAttribute(DATA_NAME) || "");

					// Check if all attributes have at least one widget
					if (dataBuilt && dataBound && dataName) {
						element.setAttribute(DATA_BUILT, dataBuilt);
						element.setAttribute(DATA_BOUND, dataBound);
						element.setAttribute(DATA_NAME, dataName);
					} else {
						// If something is missing remove everything
						_removeAllBindingAttributes(element);
					}
				}
			}

			/**
			 * Method removes binding for single widget.
			 * @method _removeSingleBinding
			 * @param {Object} bindingGroup
			 * @param {string} type
			 * @return {boolean}
			 * @private
			 * @static
			 */
			function _removeSingleBinding(bindingGroup, type) {
				var widgetInstance = bindingGroup[type];

				if (widgetInstance){
					if (widgetInstance.element && typeof widgetInstance.element.setAttribute === TYPE_FUNCTION) {
						_removeWidgetFromAttributes(widgetInstance.element, type);
					}

					bindingGroup[type] = null;

					return true;
				}

				return false;
			}

			/**
			 * Remove binding for widget based on element.
			 * @method removeBinding
			 * @param {HTMLElement|string} element
			 * @param {string} type widget name
			 * @return {boolean}
			 * @static
			 * @member ns.engine
			 */
			function removeBinding(element, type) {
				var id = (typeof element === TYPE_STRING) ? element : element.id,
					binding = widgetBindingMap[id],
					bindingGroup,
					widgetName,
					partialSuccess,
					fullSuccess = false;

				// [NOTICE] Due to backward compatibility calling removeBinding
				// with one parameter should remove all bindings

				if (binding) {
					if (typeof element === TYPE_STRING) {
						// Search based on current document may return bad results,
						// use previously defined element if it exists
						element = binding.element;
					}

					if (element) {
						_removeWidgetFromAttributes(element, type);
					}

					bindingGroup = widgetBindingMap[id] && widgetBindingMap[id].instances;

					if (bindingGroup) {
						if (!type) {
							fullSuccess = true;

							// Iterate over group of created widgets
							for (widgetName in bindingGroup) {
								if (bindingGroup.hasOwnProperty(widgetName)) {
									partialSuccess = _removeSingleBinding(bindingGroup, widgetName);
									
									// As we iterate over keys we are sure we want to remove this element
									// NOTE: Removing property by delete is slower than assigning null value
									bindingGroup[widgetName] = null;

									fullSuccess = (fullSuccess && partialSuccess);
								}
							}

							// If the object bindingGroup is empty or every key has a null value
							if (objectUtils.hasPropertiesOfValue(bindingGroup, null)) {
								// NOTE: Removing property by delete is slower than assigning null value
								widgetBindingMap[id] = null;
							}

							return fullSuccess;
						}

						partialSuccess = _removeSingleBinding(bindingGroup, type);

						if (objectUtils.hasPropertiesOfValue(bindingGroup, null)) {
							widgetBindingMap[id] = null;
						}

						return partialSuccess;
					}
				}

				return false;
			}

			/**
			 * Removes all bindings of widgets.
			 * @method removeAllBindings
			 * @param {HTMLElement|string} element
			 * @return {boolean}
			 * @static
			 * @member ns.engine
			 */
			function removeAllBindings(element) {
				// @TODO this should be coded in the other way around, removeAll should loop through all bindings and inside call removeBinding
				// but due to backward compatibility that code should be more readable
				return removeBinding(element);
			}

			/**
			 * Load widget
			 * @method processWidget
			 * @param {HTMLElement} element base element of widget
			 * @param {Object} definition definition of widget
			 * @param {ns.widget.BaseWidget} definition.widgetClass
			 * @param {string} definition.name
			 * @param {Object} [options] options for widget
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function processWidget(element, definition, options) {
				var widgetOptions = options || {},
					createFunction = widgetOptions.create,
					Widget = definition.widgetClass,
					/**
					 * @type {ns.widget.BaseWidget} widgetInstance
					 */
					widgetInstance = Widget ? new Widget(element) : false,
					buildAttribute,
					parentEnhance = selectors.getParentsBySelectorNS(element, 'enhance=false'),
					existingBinding;

				// While processing widgets queue other widget may built this one before
				// it reaches it's turn
				existingBinding = getBinding(element, definition.name);
				if (existingBinding && existingBinding.element === element) {
					return existingBinding.element;
				}

				if (widgetInstance && !parentEnhance.length) {
										widgetInstance.configure(definition, element, options);

					// Run .create method from widget options when a [widgetName]create event is triggered
					if (typeof createFunction === TYPE_FUNCTION) {
						eventUtils.one(element, definition.name.toLowerCase() + "create", createFunction);
					}

					if (element.id) {
						widgetInstance.id = element.id;
					}

					// Check if this type of widget was build for this element before
					buildAttribute = element.getAttribute(DATA_BUILT);
					if (!buildAttribute || (buildAttribute && buildAttribute.split(NAMES_SEPARATOR).indexOf(widgetInstance.name) === -1)) {
						element = widgetInstance.build(element);
					}

					if (element) {
						widgetInstance.element = element;

						setBinding(widgetInstance);

						widgetInstance.trigger(eventType.WIDGET_BUILT, widgetInstance, false);

						if (!justBuild) {
							widgetInstance.init(element);
						}

						widgetInstance.bindEvents(element, justBuild);

						eventUtils.trigger(element, eventType.WIDGET_BOUND, widgetInstance, false);
						eventUtils.trigger(document, eventType.WIDGET_BOUND, widgetInstance);
					} else {
											}
				}
				return widgetInstance.element;
			}

			/**
			 * Destroys widget of given 'type' for given HTMLElement.
			 * [NOTICE] This method won't destroy any children widgets.
			 * @method destroyWidget
			 * @param {HTMLElement|string} element
			 * @param {string} type
			 * @static
			 * @member ns.engine
			 */
			function destroyWidget(element, type) {
				var widgetInstance;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(element);
				}

				
				// If type is not defined all widgets should be removed
				// this is for backward compatibility
				widgetInstance = getBinding(element, type);

				if (widgetInstance) {
					//Destroy widget
					widgetInstance.destroy();
					widgetInstance.trigger("widgetdestroyed");

					removeBinding(element, type);
				}
			}

			/**
			 * Calls destroy on widget (or widgets) connected with given HTMLElement
			 * Removes child widgets as well.
			 * @method destroyAllWidgets
			 * @param {HTMLElement|string} element
			 * @param {boolean} [childOnly=false] destroy only widgets on children elements
			 * @static
			 * @member ns.engine
			 */
			function destroyAllWidgets(element, childOnly) {
				var widgetName,
					widgetInstance,
					widgetGroup,
					childWidgets,
					i;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(element);
				}

				
				if (!childOnly) {
					// If type is not defined all widgets should be removed
					// this is for backward compatibility
					widgetGroup = getAllBindings(element);
					for (widgetName in widgetGroup) {
						if (widgetGroup.hasOwnProperty(widgetName)) {
							widgetInstance = widgetGroup[widgetName];

							//Destroy widget
							widgetInstance.destroy();
							widgetInstance.trigger("widgetdestroyed");
						}
					}
				}

				//Destroy child widgets, if something left.
				childWidgets = slice.call(element.querySelectorAll("[" + DATA_BOUND + "]"));
				for (i = childWidgets.length - 1; i >= 0; i -= 1) {
					if (childWidgets[i]) {
						destroyAllWidgets(childWidgets[i], false);
					}
				}

				removeAllBindings(element);
			}

			/**
			 * Load widgets from data-* definition
			 * @method processHollowWidget
			 * @param {HTMLElement} element base element of widget
			 * @param {Object} definition widget definition
			 * @param {Object} [options] options for create widget
			 * @return {HTMLElement} base element of widget
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function processHollowWidget(element, definition, options) {
				var name = element.getAttribute(DATA_NAME) || (definition && definition.name);
								definition = definition || (name && widgetDefs[name]) || {
					"name": name
				};
				return processWidget(element, definition, options);
			}

			/**
			 * Compare function for nodes on build queue
			 * @param {Object} nodeA
			 * @param {Object} nodeB
			 * @return {number}
			 * @private
			 * @static
			 */
			function compareByDepth(nodeA, nodeB) {
				var mask = Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING;

				if (nodeA.element.compareDocumentPosition(nodeB.element) & mask) {
					return 1;
				}

				return -1;
			}

			/**
			 * Processes one build queue item. Runs processHollowWidget
			 * underneath
			 * @method processBuildQueueItem
			 * @param {Object|HTMLElement} queueItem
			 * @private
			 * @static
			 */
			function processBuildQueueItem(queueItem) {
				// HTMLElement doesn't have .element property
				// widgetDefs will return undefined when called widgetDefs[undefined]
				processHollowWidget(queueItem.element || queueItem, widgetDefs[queueItem.widgetName]);
			}

			/**
			 * Build widgets on all children of context element
			 * @method createWidgets
			 * @static
			 * @param {HTMLElement} context base html for create children
			 * @member ns.engine
			 */
			function createWidgets(context) {
				var builtWithoutTemplates = slice.call(context.querySelectorAll(querySelectorWidgets)),
					normal = [],
					buildQueue = [],
					selectorKeys = Object.keys(widgetDefs),
					excludeSelector,
					i,
					j,
					len = selectorKeys.length,
					definition,
					widgetName,
					definitionSelectors;

				
				// @TODO EXPERIMENTAL WIDGETS WITHOUT TEMPLATE DEFINITION
				builtWithoutTemplates.forEach(processBuildQueueItem);

				/* NORMAL */
				for (i = 0; i < len; ++i) {
					widgetName = selectorKeys[i];
					definition = widgetDefs[widgetName];
					definitionSelectors = definition.selectors;
					if (definitionSelectors.length) {
						excludeSelector = excludeBuiltAndBound(widgetName);

						normal = slice.call(context.querySelectorAll(definitionSelectors.join(excludeSelector + ",") + excludeSelector));
						j = normal.length;

						while (--j >= 0) {
							buildQueue.push({
								element: normal[j],
								widgetName: widgetName
							});
						}
					}
				}

				// Sort queue by depth, on every DOM branch outer most element go first
				buildQueue.sort(compareByDepth);

				// Build all widgets from queue
				buildQueue.forEach(processBuildQueueItem);

				eventUtils.trigger(document, "built");
				eventUtils.trigger(document, eventType.BOUND);
							}

			/**
			 * Handler for event create
			 * @method createEventHandler
			 * @param {Event} event
			 * @static
			 * @member ns.engine
			 */
			function createEventHandler(event) {
				createWidgets(event.target);
			}

			function setViewport() {
				/**
				 * Sets viewport tag if not exists
				 */
				var documentHead = document.head,
					metaTagListLength,
					metaTagList,
					metaTag,
					i;

				metaTagList = documentHead.querySelectorAll('[name="viewport"]');
				metaTagListLength = metaTagList.length;

				if (metaTagListLength > 0) {
					// Leave the last viewport tag
					--metaTagListLength;

					// Remove duplicated tags
					for (i = 0; i < metaTagListLength; ++i) {
						// Remove meta tag from DOM
						documentHead.removeChild(metaTagList[i]);
					}
				} else {
					// Create new HTML Element
					metaTag = document.createElement('meta');

					// Set required attributes
					metaTag.setAttribute('name', 'viewport');
					metaTag.setAttribute('content', 'width=device-width, user-scalable=no');

					// Force that viewport tag will be first child of head
					if (documentHead.firstChild) {
						documentHead.insertBefore(metaTag, documentHead.firstChild);
					} else {
						documentHead.appendChild(metaTag);
					}
				}
			}

			/**
			 * Build first page
			 * @method build
			 * @static
			 * @member ns.engine
			 */
			function build() {
				if (router) {
					// @TODO: Consider passing viewport options via script tag arguments (web-ui-fw style).
					setViewport();

					eventUtils.trigger(document, "beforerouterinit", router, false);
					router.init(justBuild);
					eventUtils.trigger(document, "routerinit", router, false);
				}
			}

			/**
			 * Method to remove all listeners bound in run
			 * @method stop
			 * @static
			 * @member ns.engine
			 */
			function stop() {
				if (router) {
					router.destroy();
				}
			}
			/*
			 document.addEventListener(eventType.BOUND, function () {
			 //@TODO dump it to file for faster binding by ids
			 nsWidgetBindingMap = widgetBindingMap;
			 }, false);
			 */
			ns.widgetDefinitions = {};
			engine = {
				justBuild: location.hash === "#build",
				/**
				 * object with names of engine attributes
				 * @property {Object} dataTau
				 * @property {string} [dataTau.built="data-tau-built"] attribute inform that widget id build
				 * @property {string} [dataTau.name="data-tau-name"] attribute contains widget name
				 * @property {string} [dataTau.bound="data-tau-bound"] attribute inform that widget id bound
				 * @property {string} [dataTau.separator=","] separation string for widget names
				 * @static
				 * @member ns.engine
				 */
				dataTau: {
					built: DATA_BUILT,
					name: DATA_NAME,
					bound: DATA_BOUND,
					separator: NAMES_SEPARATOR
				},
				destroyWidget: destroyWidget,
				destroyAllWidgets: destroyAllWidgets,
				createWidgets: createWidgets,

				/**
				 * Method to get all definitions of widgets
				 * @method getDefinitions
				 * @return {Object}
				 * @static
				 * @member ns.engine
				 */
				getDefinitions: function () {
					return widgetDefs;
				},
				/**
				 * Returns definition of widget
				 * @method getWidgetDefinition
				 * @param {string} name
				 * @static
				 * @member ns.engine
				 * @returns {Object}
				 */
				getWidgetDefinition: function (name) {
					return widgetDefs[name];
				},
				defineWidget: defineWidget,
				getBinding: getBinding,
				getAllBindings: getAllBindings,
				setBinding: setBinding,
				// @TODO either rename or fix functionally because
				// this method does not only remove binding but
				// actually destroys widget
				removeBinding: removeBinding,
				removeAllBindings: removeAllBindings,

				/**
				 * Clear bindings of widgets
				 * @method _clearBindings
				 * @static
				 * @member ns.engine
				 */
				_clearBindings: function () {
					//clear and set references to the same object
					widgetBindingMap = {};
				},

				build: build,

				/**
				 * Run engine
				 * @method run
				 * @static
				 * @member ns.engine
				 */
				run: function () {
					stop();

					eventUtils.fastOn(document, "create", createEventHandler);

					eventUtils.trigger(document, eventType.INIT, {tau: ns});

					switch (document.readyState) {
					case "interactive":
					case "complete":
						build();
						break;
					default:
						eventUtils.fastOn(document, "DOMContentLoaded", build.bind(engine));
						break;
					}
				},

				/**
				 * Return router
				 * @method getRouter
				 * @return {Object}
				 * @static
				 * @member ns.engine
				 */
				getRouter: function () {
					return router;
				},

				/**
				 * Initialize router. This method should be call in file with router class definition.
				 * @method initRouter
				 * @param {Function} RouterClass Router class
				 * @static
				 * @member ns.engine
				 */
				initRouter: function (RouterClass) {
					router = new RouterClass();
				},

				/**
				 * Build instance of widget and binding events
				 * Returns error when empty element is passed
				 * @method instanceWidget
				 * @param {HTMLElement} element
				 * @param {string} name
				 * @param {Object} options
				 * @return {?Object}
				 * @static
				 * @member ns.engine
				 */
				instanceWidget: function (element, name, options) {
					var binding = getBinding(element, name),
						definition;

					if (!element) {
						ns.error("'element' cannot be empty");
						return null;
					}

					if (!binding && widgetDefs[name]) {
						definition = widgetDefs[name];
						element = processHollowWidget(element, definition, options);
						binding = getBinding(element, name);
					}
					return binding;
				},

				stop: stop,

				/**
				 * Method to change build mode
				 * @method setJustBuild
				 * @param {boolean} newJustBuild
				 * @static
				 * @member ns.engine
				 */
				setJustBuild: function (newJustBuild) {
					// Set location hash to have a consistent behavior
					if(newJustBuild){
						location.hash = "build";
					} else {
						location.hash = "";
					}

					justBuild = newJustBuild;
				},

				/**
				 * Method to get build mode
				 * @method getJustBuild
				 * @return {boolean}
				 * @static
				 * @member ns.engine
				 */
				getJustBuild: function () {
					return justBuild;
				},
				_createEventHandler : createEventHandler
			};

			engine.eventType = eventType;
			ns.engine = engine;
			}(window, window.document, ns));

/*global window, define, ns */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Anchor Highlight Utility
 * Utility enables highlight links.
 * @class ns.util.anchorHighlight
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Damian Osipiuk <d.osipiuk@samsung.com>
 * @author Konrad Lipner <k.lipner@samsung.com>
 */
(function (document, window, ns) {
	
				/* anchorHighlightController.js
			To prevent perfomance regression when scrolling,
			do not apply hover class in anchor.
			Instead, this code checks scrolling for time threshold and
			decide how to handle the color.
			When scrolling with anchor, it checks flag and decide to highlight anchor.
			While it helps to improve scroll performance,
			it lowers responsiveness of the element for 50msec.
			*/

			/**
			 * Touch start x
			 * @property {number} startX
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			var startX,
				/**
				 * Touch start y
				 * @property {number} startY
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				startY,
				/**
				 * Did page scrolled
				 * @property {boolean} didScroll
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				didScroll,
				/**
				 * Touch target element
				 * @property {HTMLElement} target
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				target,
				/**
				 * Timer id of adding activeClass delay
				 * @property {number} addActiveClassTimerID
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				addActiveClassTimerID,
				/**
				 * Object with default options
				 * @property {Object} options
				 * Treshold after which didScroll will be set
				 * @property {number} [options.scrollThreshold=5]
				 * Time to wait before adding activeClass
				 * @property {number} [options.addActiveClassDelay=10]
				 * Time to stay activeClass after touch end
				 * @property {number} [options.keepActiveClassDelay=100]
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				options = {
					scrollThreshold: 5,
					addActiveClassDelay: 10,
					keepActiveClassDelay: 100
				},
				/**
				 * Class used to mark element as active
				 * @property {string} [activeClassLI="ui-li-active"] activeClassLI
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				activeClassLI = "ui-li-active",
				/**
				 * Function invoked after touch move ends
				 * @method removeTouchMove
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				removeTouchMove,
				/**
				 * Alias for class {@link ns.util.selectors}
				 * @property {Object} selectors
				 * @member ns.util.anchorHighlight
				 * @private
				 * @static
				 */
				selectors = ns.util.selectors;


			/**
			 * Get closest highlightable element
			 * @method detectHighlightTarget
			 * @param {HTMLElement} target
			 * @return {HTMLElement}
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function detectHighlightTarget(target) {
				target = selectors.getClosestBySelector(target, 'a, label');
				return target;
			}

			/**
			 * Get closest li element
			 * @method detectLiElement
			 * @param {HTMLElement} target
			 * @return {HTMLElement}
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function detectLiElement(target) {
				target = selectors.getClosestByTag(target, 'li');
				return target;
			}

			/**
			 * Add active class to touched element
			 * @method addActiveClass
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function addActiveClass() {
				var liTarget;
				target = detectHighlightTarget(target);
				if (!didScroll && target && (target.tagName === "A" || target.tagName === "LABEL")) {
					liTarget = detectLiElement(target);
					if( liTarget ) {
						liTarget.classList.add(activeClassLI);
					}
				}
			}

			/**
			 * Get all active elements
			 * @method getActiveElements
			 * @return {Array}
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function getActiveElements() {
				return document.getElementsByClassName(activeClassLI);
			}

			/**
			 * Remove active class from active elements
			 * @method removeActiveClass
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function removeActiveClass() {
				var activeA = getActiveElements(),
					activeALength = activeA.length,
					i;
				for (i = 0; i < activeALength; i++) {
					activeA[i].classList.remove(activeClassLI);
				}
			}

			/**
			 * Function invoked during touch move
			 * @method touchmoveHandler
			 * @param {Event} event
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function touchmoveHandler(event) {
				var touch = event.touches[0];
				didScroll = didScroll ||
					(Math.abs(touch.clientX - startX) > options.scrollThreshold || Math.abs(touch.clientY - startY) > options.scrollThreshold);

				if (didScroll) {
					removeTouchMove();
					removeActiveClass();
				}
			}

			/**
			 * Function invoked after touch start
			 * @method touchstartHandler
			 * @param {Event} event
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function touchstartHandler(event) {
				var touches = event.touches,
					touch = touches[0];

				if (touches.length === 1) {
					didScroll = false;
					startX = touch.clientX;
					startY = touch.clientY;
					target = event.target;

					document.addEventListener("touchmove", touchmoveHandler, false);
					clearTimeout(addActiveClassTimerID);
					addActiveClassTimerID = setTimeout(addActiveClass, options.addActiveClassDelay);
				}
			}

			removeTouchMove = function () {
				document.removeEventListener("touchmove", touchmoveHandler, false);
			};

			/**
			 * Function invoked after touch
			 * @method touchendHandler
			 * @param {Event} event
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function touchendHandler(event) {
				if (event.touches.length === 0) {
					clearTimeout(addActiveClassTimerID);
					addActiveClassTimerID = null;
					if (!didScroll) {
						setTimeout(removeActiveClass, options.keepActiveClassDelay);
					}
					didScroll = false;
				}
			}

			/**
			 * Function invoked after visibilitychange event
			 * @method checkPageVisibility
			 * @member ns.util.anchorHighlight
			 * @private
			 * @static
			 */
			function checkPageVisibility() {
				if (document.visibilityState === "hidden") {
					removeActiveClass();
				}
			}

			/**
			 * Bind events to document
			 * @method enable
			 * @member ns.util.anchorHighlight
			 * @static
			 */
			function enable() {
				document.addEventListener("touchstart", touchstartHandler, false);
				document.addEventListener("touchend", touchendHandler, false);
				document.addEventListener("visibilitychange", checkPageVisibility, false);
				window.addEventListener("pagehide", removeActiveClass, false);
			}

			/**
			 * Unbinds events from document.
			 * @method disable
			 * @member ns.util.anchorHighlight
			 * @static
			 */
			function disable() {
				document.removeEventListener("touchstart", touchstartHandler, false);
				document.removeEventListener("touchend", touchendHandler, false);
				window.removeEventListener("pagehide", removeActiveClass, false);
			}

			enable();

			ns.util.anchorHighlight = {
				enable: enable,
				disable: disable
			};

			}(document, window, ns));

/*global window, define */
/*jslint plusplus: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Utility DOM
 * Utility object with function to DOM manipulation, CSS properties support
 * and DOM attributes support.
 *
 * # How to replace jQuery methods  by ns methods
 * ## append vs appendNodes
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).append( "<span>Test</span>" );

 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.util.DOM.appendNodes(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And
 *             <span>Test</span>
 *         </div>
 *        <div id="third">Goodbye</div>
 *     </div>
 *
 * ## replaceWith vs replaceWithNodes
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $('#second').replaceWith("<span>Test</span>");
 *
 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.util.DOM.replaceWithNodes(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <span>Test</span>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * ## before vs insertNodesBefore
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).before( "<span>Test</span>" );
 *
 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.util.DOM.insertNodesBefore(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <span>Test</span>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * ## wrapInner vs wrapInHTML
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).wrapInner( "<span class="new"></span>" );
 *
 * #### ns manipulation
 *
 *     @example
 *     var element = document.getElementById("second");
 *     ns.util.DOM.wrapInHTML(element, "<span class="new"></span>");
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">
 *             <span class="new">And</span>
 *         </div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * @class ns.util.DOM
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (ns) {
	
				ns.util.DOM = ns.util.DOM || {};
			}(ns));

/*global window, define */
/*jslint plusplus: true */
/*jshint -W069 */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, document, ns) {
	
	
			var DOM = ns.util.DOM;

			/**
			 * Returns css property for element
			 * @method getCSSProperty
			 * @param {HTMLElement} element
			 * @param {string} property
			 * @param {string|number|null} [def=null] default returned value
			 * @param {"integer"|"float"|null} [type=null] auto type casting
			 * @return {string|number|null}
			 * @member ns.util.DOM
			 * @static
			 */
			function getCSSProperty(element, property, def, type) {
				var style = window.getComputedStyle(element),
					value = null,
					result = def;
				if (style) {
					value = style.getPropertyValue(property);
					if (value) {
						switch (type) {
						case "integer":
							value = parseInt(value, 10);
							if (!isNaN(value)) {
								result = value;
							}
							break;
						case "float":
							value = parseFloat(value);
							if (!isNaN(value)) {
								result = value;
							}
							break;
						default:
							result = value;
							break;
						}
					}
				}
				return result;
			}

			/**
			 * Extracts css properties from computed css for an element.
			 * The properties values are applied to the specified
			 * properties list (dictionary)
			 * @method extractCSSProperties
			 * @param {HTMLElement} element
			 * @param {Object} properties
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [noConversion=false]
			 * @member ns.util.DOM
			 * @static
			 */
			function extractCSSProperties (element, properties, pseudoSelector, noConversion) {
				var style = window.getComputedStyle(element, pseudoSelector),
					property,
					value = null,
					utils = ns.util;

				// @TODO extractCSSProperties should rather return raw values (with units)
				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						value = style.getPropertyValue(property);
						if (utils.isNumber(value) && !noConversion) {
							if (value.match(/\./gi)) {
								properties[property] = parseFloat(value);
							} else {
								properties[property] = parseInt(value, 10);
							}
						} else {
							properties[property] = value;
						}
					}
				}
			}

			/**
			 * Returns elements height from computed style
			 * @method getElementHeight
			 * @param {HTMLElement} element
			 * if null then the "inner" value is assigned
			 * @param {"outer"|null} [type=null]
			 * @param {boolean} [includeOffset=false]
			 * @param {boolean} [includeMargin=false]
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [force=false] check even if element is hidden
			 * @return {number}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementHeight(element, type, includeOffset, includeMargin, pseudoSelector, force) {
				var height = 0,
					style,
					value,
					originalDisplay = null,
					originalVisibility = null,
					originalPosition = null,
					outer = (type && type === "outer") || false,
					offsetHeight = 0,
					property,
					props = {
						"height": 0,
						"margin-top": 0,
						"margin-bottom": 0,
						"padding-top": 0,
						"padding-bottom": 0,
						"border-top-width": 0,
						"border-bottom-width": 0,
						"box-sizing": ""
					};
				if (element) {
					style = element.style;

					if (style.display !== "none") {
						extractCSSProperties(element, props, pseudoSelector, true);
						offsetHeight = element.offsetHeight;
					} else if (force) {
						originalDisplay = style.display;
						originalVisibility = style.visibility;
						originalPosition = style.position;

						style.display = "block";
						style.visibility = "hidden";
						style.position = "relative";

						extractCSSProperties(element, props, pseudoSelector, true);
						offsetHeight = element.offsetHeight;

						style.display = originalDisplay;
						style.visibility = originalVisibility;
						style.position = originalPosition;
					}

					// We are extracting raw values to be able to check the units
					if(typeof props["height"] === "string" && props["height"].indexOf("px") === -1){
						//ignore non px values such as auto or %
						props["height"] = 0;
					}

					for (property in props) {
						if (props.hasOwnProperty(property) && property !== "box-sizing"){
							value = parseFloat(props[property]);
							if (isNaN(value)) {
								value = 0;
							}
							props[property] = value;
						}
					}

					height += props["height"] + props["padding-top"] + props["padding-bottom"];

					if (includeOffset) {
						height = offsetHeight;
					} else if (outer && props["box-sizing"] !== 'border-box') {
						height += props["border-top-width"] + props["border-bottom-width"];
					}

					if (includeMargin) {
						height += Math.max(0, props["margin-top"]) + Math.max(0, props["margin-bottom"]);
					}
				}
				return height;
			}

			/**
			 * Returns elements width from computed style
			 * @method getElementWidth
			 * @param {HTMLElement} element
			 * if null then the "inner" value is assigned
			 * @param {"outer"|null} [type=null]
			 * @param {boolean} [includeOffset=false]
			 * @param {boolean} [includeMargin=false]
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [force=false] check even if element is hidden
			 * @return {number}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementWidth(element, type, includeOffset, includeMargin, pseudoSelector, force) {
				var width = 0,
					style,
					value,
					originalDisplay = null,
					originalVisibility = null,
					originalPosition = null,
					offsetWidth = 0,
					property,
					outer = (type && type === "outer") || false,
					props = {
						"width": 0,
						"margin-left": 0,
						"margin-right": 0,
						"padding-left": 0,
						"padding-right": 0,
						"border-left-width": 0,
						"border-right-width": 0,
						"box-sizing": ""
					};

				if (element) {
					style = element.style;

					if (style.display !== "none") {
						extractCSSProperties(element, props, pseudoSelector, true);
						offsetWidth = element.offsetWidth;
					} else if (force) {
						originalDisplay = style.display;
						originalVisibility = style.visibility;
						originalPosition = style.position;

						style.display = "block";
						style.visibility = "hidden";
						style.position = "relative";

						extractCSSProperties(element, props, pseudoSelector, true);

						style.display = originalDisplay;
						style.visibility = originalVisibility;
						style.position = originalPosition;
					}

					if(typeof props["width"] === 'string' && props["width"].indexOf("px") === -1) {
						//ignore non px values such as auto or %
						props["width"] = 0;
					}
					for (property in props) {
						if (props.hasOwnProperty(property) && property !== "box-sizing"){
							value = parseFloat(props[property]);
							if (isNaN(value)) {
								value = 0;
							}
							props[property] = value;
						}
					}

					width += props["width"] + props["padding-left"] + props["padding-right"];

					if (includeOffset) {
						width = offsetWidth;
					} else if (outer && props["box-sizing"] !== 'border-box') {
						width += props["border-left-width"] + props["border-right-width"];
					}

					if (includeMargin) {
						width += Math.max(0, props["margin-left"]) + Math.max(0, props["margin-right"]);
					}
				}
				return width;
			}

			/**
			 * Returns offset of element
			 * @method getElementOffset
			 * @param {HTMLElement} element
			 * @return {Object}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementOffset(element) {
				var left = 0,
					top = 0;
				do {
					top += element.offsetTop;
					left += element.offsetLeft;
					element = element.offsetParent;
				} while (element !== null);

				return {
					top: top,
					left: left
				};
			}

			/**
			 * Check if element occupies place at view
			 * @method isOccupiedPlace
			 * @param {HTMLElement} element
			 * @return {boolean}
			 * @member ns.util.DOM
			 * @static
			 */
			function isOccupiedPlace(element) {
				return !(element.offsetWidth <= 0 && element.offsetHeight <= 0);
			}

			// assign methods to namespace
			DOM.getCSSProperty = getCSSProperty;
			DOM.extractCSSProperties = extractCSSProperties;
			DOM.getElementHeight = getElementHeight;
			DOM.getElementWidth = getElementWidth;
			DOM.getElementOffset = getElementOffset;
			DOM.isOccupiedPlace = isOccupiedPlace;

			}(window, window.document, ns));

/*global window, define */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Callback Utility
 * Class creates a callback list
 *
 * Create a callback list using the following parameters:
 *  options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 * @class ns.util.callbacks
 */
(function (window, document, ns) {
	
				ns.util.callbacks = function (orgOptions) {

				var object = ns.util.object,
					options = object.copy(orgOptions),
					/**
					 * Alias to Array.slice function
					 * @method slice
					 * @member ns.util.callbacks
					 * @private
					 */
					slice = [].slice,
					/**
					 * Last fire value (for non-forgettable lists)
					 * @property {Object} memory
					 * @member ns.util.callbacks
					 * @private
					 */
					memory,
					/**
					 * Flag to know if list was already fired
					 * @property {boolean} fired
					 * @member ns.util.callbacks
					 * @private
					 */
					fired,
					/**
					 * Flag to know if list is currently firing
					 * @property {boolean} firing
					 * @member ns.util.callbacks
					 * @private
					 */
					firing,
					/**
					 * First callback to fire (used internally by add and fireWith)
					 * @property {number} [firingStart=0]
					 * @member ns.util.callbacks
					 * @private
					 */
					firingStart,
					/**
					 * End of the loop when firing
					 * @property {number} firingLength
					 * @member ns.util.callbacks
					 * @private
					 */
					firingLength,
					/**
					 * Index of currently firing callback (modified by remove if needed)
					 * @property {number} firingIndex
					 * @member ns.util.callbacks
					 * @private
					 */
					firingIndex,
					/**
					 * Actual callback list
					 * @property {Array} list
					 * @member ns.util.callbacks
					 * @private
					 */
					list = [],
					/**
					 * Stack of fire calls for repeatable lists
					 * @property {Array} stack
					 * @member ns.util.callbacks
					 * @private
					 */
					stack = !options.once && [],
					fire,
					add,
					self = {
						/**
						 * Add a callback or a collection of callbacks to the list
						 * @method add
						 * @param {..Function} list
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						add: function () {
							if (list) {
								// First, we save the current length
								var start = list.length;
								add(arguments);
								// Do we need to add the callbacks to the
								// current firing batch?
								if (firing) {
									firingLength = list.length;
								// With memory, if we're not firing then
								// we should call right away
								} else if (memory) {
									firingStart = start;
									fire(memory);
								}
							}
							return this;
						},
						/**
						 * Remove a callback from the list
						 * @method remove
						 * @param {..Function} list
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						remove: function () {
							if (list) {
								slice.call(arguments).forEach(function (arg) {
									var index = list.indexOf(arg);
									while (index > -1) {
										list.splice(index, 1);
										// Handle firing indexes
										if (firing) {
											if (index <= firingLength) {
												firingLength--;
											}
											if (index <= firingIndex) {
												firingIndex--;
											}
										}
										index = list.indexOf(arg, index);
									}
								});
							}
							return this;
						},
						/**
						 * Check if a given callback is in the list. 
						 * If no argument is given,
						 * return whether or not list has callbacks attached.
						 * @method has
						 * @param {Funciton} fn
						 * @return {boolean}
						 * @member ns.util.callbacks
						 */
						has: function (fn) {
							return fn ? !!list && list.indexOf(fn) > -1 : !!(list && list.length);
						},
						/**
						 * Remove all callbacks from the list
						 * @method empty
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						empty: function () {
							list = [];
							firingLength = 0;
							return this;
						},
						/**
						 * Have the list do nothing anymore
						 * @method disable
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						disable: function () {
							list = stack = memory = undefined;
							return this;
						},
						/**
						 * Is it disabled?
						 * @method disabled
						 * @return {boolean}
						 * @member ns.util.callbacks
						 */
						disabled: function () {
							return !list;
						},
						/**
						 * Lock the list in its current state
						 * @method lock
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						lock: function () {
							stack = undefined;
							if (!memory) {
								self.disable();
							}
							return this;
						},
						/**
						 * Is it locked?
						 * @method locked
						 * @return {boolean} stack
						 * @member ns.util.callbacks
						 */
						locked: function () {
							return !stack;
						},
						/**
						 * Call all callbacks with the given context and
						 * arguments
						 * @method fireWith
						 * @param {Object} context
						 * @param {Array} args
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						fireWith: function (context, args) {
							if (list && (!fired || stack)) {
								args = args || [];
								args = [context, args.slice ? args.slice() : args];
								if (firing) {
									stack.push(args);
								} else {
									fire(args);
								}
							}
							return this;
						},
						/**
						 * Call all the callbacks with the given arguments
						 * @method fire
						 * @param {...*} argument
						 * @return {ns.util.callbacks} self
						 * @chainable
						 * @member ns.util.callbacks
						 */
						fire: function () {
							self.fireWith(this, arguments);
							return this;
						},
						/**
						 * To know if the callbacks have already been called at
						 * least once
						 * @method fired
						 * @return {booblean}
						 * @chainable
						 * @member ns.util.callbacks
						 */
						fired: function () {
							return !!fired;
						}
					};
				/**
				 * Adds functions to the callback list
				 * @method add
				 * @param {...*} argument
				 * @member ns.util.bezierCurve
				 * @private
				 */
				add = function (args) {
					slice.call(args).forEach(function (arg) {
						var type = typeof arg;
						if (type === "function") {
							if (!options.unique || !self.has(arg)) {
								list.push(arg);
							}
						} else if (arg && arg.length && type !== "string") {
							// Inspect recursively
							add(arg);
						}
					});
				};
				/**
				 * Fire callbacks
				 * @method fire
				 * @param {Array} data
				 * @member ns.util.bezierCurve
				 * @private
				 */
				fire = function (data) {
					memory = options.memory && data;
					fired = true;
					firingIndex = firingStart || 0;
					firingStart = 0;
					firingLength = list.length;
					firing = true;
					while (list && firingIndex < firingLength) {
						if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
							memory = false; // To prevent further calls using add
							break;
						}
						firingIndex++;
					}
					firing = false;
					if (list) {
						if (stack) {
							if (stack.length) {
								fire(stack.shift());
							}
						} else if (memory) {
							list = [];
						} else {
							self.disable();
						}
					}
				};

				return self;
			};

			}(window, window.document, ns));

/*global window, define, RegExp */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Deferred Utility
 * Class creates object which can call registered callback depend from
 * state of object..
 * @class ns.util.deferred
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */(function (window, document, ns) {
	
	
			var Deferred = function (callback) {
				var callbacks = ns.util.callbacks,
					object = ns.util.object,
					/**
					 * Register additional action for deferred object
					 * @property {Array} tuples
					 * @member ns.util.deferred
					 * @private
					 */
					tuples = [
						// action, add listener, listener list, final state
						["resolve", "done", callbacks({once: true, memory: true}), "resolved"],
						["reject", "fail", callbacks({once: true, memory: true}), "rejected"],
						["notify", "progress", callbacks({memory: true})]
					],
					state = "pending",
					deferred = {},
					promise = {
						/**
						 * Determine the current state of a Deferred object.
						 * @method state
						 * @return {"pending" | "resolved" | "rejected"} representing the current state
						 * @member ns.util.deferred
						 */
						state: function () {
							return state;
						},
						/**
						 * Add handlers to be called when the Deferred object
						 * is either resolved or rejected.
						 * @method always
						 * @param {...Function}
						 * @return {ns.util.deferred} self
						 * @member ns.util.deferred
						 */
						always: function () {
							deferred.done(arguments).fail(arguments);
							return this;
						},
						/**
						 * Add handlers to be called when the Deferred object
						 * is resolved, rejected, or still in progress.
						 * @method then
						 * @param {?Function} callback assign when done
						 * @param {?Function} callback assign when fail
						 * @param {?Function} callback assign when progress
						 * @return {Object} returns a new promise
						 * @member ns.util.deferred
						 */
						then: function () {/* fnDone, fnFail, fnProgress */
							var functions = arguments;
							return new Deferred(function (newDefer) {
								tuples.forEach(function (tuple, i) {
									var fn = (typeof functions[i] === 'function') && functions[i];
									// deferred[ done | fail | progress ] for forwarding actions to newDefer
									deferred[tuple[1]](function () {
										var returned = fn && fn.apply(this, arguments);
										if (returned && (typeof returned.promise === 'function')) {
											returned.promise()
												.done(newDefer.resolve)
												.fail(newDefer.reject)
												.progress(newDefer.notify);
										} else {
											newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
										}
									});
								});
								functions = null;
							}).promise();
						},
						/**
						 * Get a promise for this deferred. If obj is provided,
						 * the promise aspect is added to the object
						 * @method promise
						 * @param {Object} obj
						 * @return {Object} return a Promise object
						 * @member ns.util.deferred
						 */
						promise: function (obj) {
							if (obj) {
								return object.merge(obj, promise);
							}
							return promise;
						}
					};

				/**
				 * alias for promise.then, Keep pipe for back-compat
				 * @method pipe
				 * @member ns.util.deferred
				 */
				promise.pipe = promise.then;

				// Add list-specific methods

				tuples.forEach(function (tuple, i) {
					var list = tuple[2],
						stateString = tuple[3];

					// promise[ done | fail | progress ] = list.add
					promise[tuple[1]] = list.add;

					// Handle state
					if (stateString) {
						list.add(function () {
							// state = [ resolved | rejected ]
							state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
						}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
					}

					// deferred[ resolve | reject | notify ]
					deferred[tuple[0]] = function () {
						deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
						return this;
					};
					deferred[tuple[0] + "With"] = list.fireWith;
				});

				// Make the deferred a promise
				promise.promise(deferred);

				// Call given func if any
				if (callback) {
					callback.call(deferred, deferred);
				}

				// All done!
				return deferred;
			};
			ns.util.deferred = Deferred;
			}(window, window.document, ns));

/*global window, define */
/*jslint plusplus: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, document, ns) {
	
	

			var selectors = ns.util.selectors,
				DOM = ns.util.DOM,
				namespace = "namespace";

			/**
			 * Returns given attribute from element or the closest parent,
			 * which matches the selector.
			 * @method inheritAttr
			 * @member ns.util.DOM
			 * @param {HTMLElement} element
			 * @param {string} attr
			 * @param {string} selector
			 * @return {?string}
			 * @static
			 */
			DOM.inheritAttr = function (element, attr, selector) {
				var value = element.getAttribute(attr),
					parent;
				if (!value) {
					parent = selectors.getClosestBySelector(element, selector);
					if (parent) {
						return parent.getAttribute(attr);
					}
				}
				return value;
			};

			/**
			 * Returns Number from properties described in html tag
			 * @method getNumberFromAttribute
			 * @member ns.util.DOM
			 * @param {HTMLElement} element
			 * @param {string} attribute
			 * @param {string=} [type] auto type casting
			 * @param {number} [defaultValue] default returned value
			 * @static
			 * @return {number}
			 */
			DOM.getNumberFromAttribute = function (element, attribute, type, defaultValue) {
				var value = element.getAttribute(attribute),
					result = defaultValue;

				if (value) {
					if (type === "float") {
						value = parseFloat(value);
						if (value) {
							result = value;
						}
					} else {
						value = parseInt(value, 10);
						if (value) {
							result = value;
						}
					}
				}
				return result;
			};

			function getDataName(name) {
				var namespace = ns.getConfig(namespace);
				return "data-" + (namespace ? namespace + "-" : "") + name;
			}

			/**
			 * This function sets value of attribute data-{namespace}-{name} for element.
			 * If the namespace is empty, the attribute data-{name} is used.
			 * @method setNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @param {string|number|boolean} value New value
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.setNSData = function (element, name, value) {
				element.setAttribute(getDataName(name), value);
			};

			/**
			 * This function returns value of attribute data-{namespace}-{name} for element.
			 * If the namespace is empty, the attribute data-{name} is used.
			 * Method may return boolean in case of 'true' or 'false' strings as attribute value.
			 * @method getNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @member ns.util.DOM
			 * @return {?string|boolean}
			 * @static
			 */
			DOM.getNSData = function (element, name) {
				var value = element.getAttribute(getDataName(name));

				if (value === "true") {
					return true;
				}

				if (value === "false") {
					return false;
				}

				return value;
			};

			/**
			 * This function returns true if attribute data-{namespace}-{name} for element is set
			 * or false in another case. If the namespace is empty, attribute data-{name} is used.
			 * @method hasNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @member ns.util.DOM
			 * @return {boolean}
			 * @static
			 */
			DOM.hasNSData = function (element, name) {
				return element.hasAttribute(getDataName(name));
			};

			/**
			 * Get or set value on data attribute.
			 * @method nsData
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @param {?Mixed} [value]
			 * @static
			 * @member ns.util.DOM
			 */
			DOM.nsData = function (element, name, value) {
				// @TODO add support for object in value
				if (value === undefined) {
					return DOM.getNSData(element, name);
				} else {
					return DOM.setNSData(element, name, value);
				}
			};

			/**
			 * This function removes attribute data-{namespace}-{name} from element.
			 * If the namespace is empty, attribute data-{name} is used.
			 * @method removeNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.removeNSData = function (element, name) {
				element.removeAttribute(getDataName(name));
			};

			/**
			 * Returns object with all data-* attributes of element
			 * @method getData
			 * @param {HTMLElement} element Base element
			 * @member ns.util.DOM
			 * @return {Object}
			 * @static
			 */
			DOM.getData = function (element) {
				var dataPrefix = "data-",
					data = {},
					attrs = element.attributes,
					attr,
					nodeName,
					value,
					i,
					length = attrs.length;

				for (i = 0; i < length; i++) {
					attr = attrs.item(i);
					nodeName = attr.nodeName;
					if (nodeName.indexOf(dataPrefix) > -1) {
						value = attr.value;
						data[nodeName.replace(dataPrefix, "")] = value.toLowerCase() === "true" ? true : value.toLowerCase() === "false" ? false : value;
					}
				}

				return data;
			};

			/**
			 * Special function to remove attribute and property in the same time
			 * @method removeAttribute
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.removeAttribute = function (element, name) {
				element.removeAttribute(name);
				element[name] = false;
			};

			/**
			 * Special function to set attribute and property in the same time
			 * @method setAttribute
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @param {Mixed} value
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.setAttribute = function (element, name, value) {
				element[name] = value;
				element.setAttribute(name, value);
			};
			}(window, window.document, ns));

/*global window, define */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Namespace For Widgets
 * Namespace For Widgets
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @class ns.widget
 */
(function (document, ns) {
	
				var engine = ns.engine,
				widget = {
					/**
					 * Get bound widget for element
					 * @method getInstance
					 * @static
					 * @param {HTMLElement|string} element
					 * @param {string} type widget name
					 * @return {?Object}
					 * @member ns.widget
					 */
					getInstance: engine.getBinding,
					/**
					 * Returns Get all bound widget for element or id gives as parameter
					 * @method getAllInstances
					 * @param {HTMLElement|string} element
					 * @return {?Object}
					 * @static
					 * @member ns.widget
					 */
					getAllInstances: engine.getAllBindings
				};

			document.addEventListener(engine.eventType.WIDGET_DEFINED, function (evt) {
				var definition = evt.detail,
					name = definition.name;

				 ns.widget[name] = function (element, options) {
					 return engine.instanceWidget(element, name, options);
				 };

			}, true);

			/** @namespace ns.widget */
			ns.widget = widget;
			}(window.document, ns));

/*global window, define */
/*jslint nomen: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/*
 */
/**
 * #BaseWidget
 * Prototype class of widget
 *
 * ## How to invoke creation of widget from JavaScript
 *
 * To build and initialize widget in JavaScript you have to use method {@link ns.engine#instanceWidget} . First argument for method
 * is HTMLElement, which specifies the element of widget. Second parameter is name of widget to create.
 *
 * If you load jQuery before initializing tau library, you can use standard jQuery UI Widget notation.
 *
 * ### Examples
 * #### Build widget from JavaScript
 *
 *		@example
 *		var element = document.getElementById("id"),
 *			ns.engine.instanceWidget(element, "Button");
 *
 * #### Build widget from jQuery
 *
 *		@example
 *		var element = $("#id").button();
 *
 * ## How to create new widget
 *
 *		@example
 *		(function (ns) {
 *			
 *			 *					var BaseWidget = ns.widget.BaseWidget, // create alias to main objects
 *						...
 *						arrayOfElements, // example of private property, common for all instances of widget
 *						Button = function () { // create local object with widget
 *							...
 *						},
 *						prototype = new BaseWidget(); // add ns.widget.BaseWidget as prototype to widget's object, for better minification this should be assign to local variable and next variable should be assign to prototype of object
 *
 *					function closestEnabledButton(element) { // example of private method
 *						...
 *					}
 *					...
 *
 *					prototype.options = { //add default options to be read from data- attributes
 *						theme: "s",
 *						...
 *					};
 *
 *					prototype._build = function (template, element) { // method called when the widget is being built, should contain all HTML manipulation actions
 *						...
 *						return element;
 *					};
 *
 *					prototype._init = function (element) { // method called during initialization of widget, should contain all actions necessary fastOn application start
 *						...
 *						return element;
 *					};
 *
 *					prototype._bindEvents = function (element) { // method to bind all events, should contain all event bindings
 *						...
 *					};
 *
 *					prototype._enable = function (element) { // method called during invocation of enable() method
 *						...
 *					};
 *
 *					prototype._disable = function (element) { // method called during invocation of disable() method
 *						...
 *					};
 *
 *					prototype.refresh = function (element) { // example of public method
 *						...
 *					};
 *
 *					prototype._refresh = function () { // example of protected method
 *						...
 *					};
 *
 *					Button.prototype = prototype;
 *
 *					engine.defineWidget( // define widget
 *						"Button", //name of widget
 *						"[data-role='button'],button,[type='button'],[type='submit'],[type='reset']",  //widget's selector
 *						[ // public methods, here should be list all public method, without that method will not be available
 *							"enable",
 *							"disable",
 *							"refresh"
 *						],
 *						Button, // widget's object
 *						"mobile" // widget's namespace
 *					);
 *					ns.widget.Button = Button;
 *					 *		}(ns));
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Przemyslaw Ciezkowski <p.ciezkowski@samsung.com>
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Michał Szepielak <m.szepielak@samsung.com>
 * @class ns.widget.BaseWidget
 */
(function (document, ns, undefined) {
	
				/**
			 * Alias to Array.slice function
			 * @method slice
			 * @member ns.widget.BaseWidget
			 * @private
			 * @static
			 */
			var slice = [].slice,
				/**
				 * Alias to ns.engine
				 * @property {ns.engine} engine
				 * @member ns.widget.BaseWidget
				 * @private
				 * @static
				 */
				engine = ns.engine,
				engineDataTau = engine.dataTau,
				util = ns.util,
				/**
				 * Alias to {@link ns.event}
				 * @property {Object} eventUtils
				 * @member ns.widget.BaseWidget
				 * @private
				 * @static
				 */
				eventUtils = ns.event,
				/**
				 * Alias to {@link ns.util.DOM}
				 * @property {Object} domUtils
				 * @private
				 * @static
				 */
				domUtils = util.DOM,
				/**
				 * Alias to {@link ns.util.object}
				 * @property {Object} objectUtils
				 * @private
				 * @static
				 */
				objectUtils = util.object,
				BaseWidget = function () {
					return this;
				},
				prototype = {},
				classes = {
					focusPrefix: "ui-focus-",
					blurPrefix: "ui-blur-",
					up: "up",
					down: "down",
					left: "left",
					right: "right"
				},
				/**
				 * Property with string represent function type 
				 * (for better minification)
				 * @property {string} [TYPE_FUNCTION="function"]
				 * @private
				 * @static
				 * @readonly
				 */
				TYPE_FUNCTION = "function";

			/**
			 * Protected method configuring the widget
			 * @method _configure
			 * @member ns.widget.BaseWidget
			 * @protected
			 * @template
			 * @internal
			 */
			/**
			 * Configures widget object from definition.
			 *
			 * It calls such methods as #\_getCreateOptions and #\_configure.
			 * @method configure
			 * @param {Object} definition
			 * @param {string} definition.name Name of the widget
			 * @param {string} definition.selector Selector of the widget
			 * @param {HTMLElement} element Element of widget
			 * @param {Object} options Configure options
			 * @member ns.widget.BaseWidget
			 * @chainable
			 * @internal
			 */
			prototype.configure = function (definition, element, options) {
				var self = this,
					definitionName,
					definitionNamespace;
				/**
				 * Object with options for widget
				 * @property {Object} [options={}]
				 * @member ns.widget.BaseWidget
				 */
				self.options = self.options || {};
				/**
				 * Base element of widget
				 * @property {?HTMLElement} [element=null]
				 * @member ns.widget.BaseWidget
				 */
				self.element = self.element || null;
				if (definition) {
					definitionName = definition.name;
					definitionNamespace = definition.namespace;
					/**
					 * Name of the widget
					 * @property {string} name
					 * @member ns.widget.BaseWidget
					 */
					self.name = definitionName;

					/**
					 * Name of the widget (in lower case)
					 * @property {string} widgetName
					 * @member ns.widget.BaseWidget
					 */
					self.widgetName = definitionName;

					/**
					 * Namespace of widget events
					 * @property {string} widgetEventPrefix
					 * @member ns.widget.BaseWidget
					 */
					self.widgetEventPrefix = definitionName.toLowerCase();

					/**
					 * Namespace of the widget
					 * @property {string} namespace 
					 * @member ns.widget.BaseWidget
					 */
					self.namespace = definitionNamespace;

					/**
					 * Full name of the widget
					 * @property {string} widgetFullName
					 * @member ns.widget.BaseWidget
					 */
					self.widgetFullName = ((definitionNamespace ? definitionNamespace + "-" : "") + definitionName).toLowerCase();
					/**
					 * Id of widget instance
					 * @property {string} id
					 * @member ns.widget.BaseWidget
					 */
					self.id = ns.getUniqueId();

					/**
					 * Widget's selector
					 * @property {string} selector
					 * @member ns.widget.BaseWidget
					 */
					self.selector = definition.selector;
				}

				if (typeof self._configure === TYPE_FUNCTION) {
					self._configure(element);
				}

				self._getCreateOptions(element);

				objectUtils.fastMerge(self.options, options);
			};

			/**
			 * Reads data-* attributes and save to options object.
			 * @method _getCreateOptions
			 * @param {HTMLElement} element Base element of the widget
			 * @return {Object}
			 * @member ns.widget.BaseWidget
			 * @protected
			 */
			prototype._getCreateOptions = function (element) {
				var options = this.options,
					bigRegexp = /[A-Z]/g;
				if (options !== undefined) {
					Object.keys(options).forEach(function (option) {
						// Get value from data-{namespace}-{name} element's attribute
						// based on widget.options property keys
						var value = domUtils.getNSData(element, (option.replace(bigRegexp, function (c) {
							return "-" + c.toLowerCase();
						})));

						if (value !== null) {
							options[option] = value;
						}
					});
				}
				return options;
			};
			/**
			 * Protected method building the widget
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement} widget's element
			 * @member ns.widget.BaseWidget
			 * @protected
			 * @template
			 */
			/**
			 * Builds widget.
			 *
			 * It calls method #\_build.
			 *
			 * Before starting building process, the event beforecreate with
			 * proper prefix defined in variable widgetEventPrefix is triggered.
			 * @method build
			 * @param {HTMLElement} element Element of widget before building process
			 * @return {HTMLElement} Element of widget after building process
			 * @member ns.widget.BaseWidget
			 * @internal
			 */
			prototype.build = function (element) {
				var self = this,
					id,
					node,
					dataBuilt = element.getAttribute(engineDataTau.built),
					dataName = element.getAttribute(engineDataTau.name);

				eventUtils.trigger(element, self.widgetEventPrefix + "beforecreate");

				id = element.id;
				if (id) {
					self.id = id;
				} else {
					element.id = self.id;
				}

				if (typeof self._build === TYPE_FUNCTION) {
					node = self._build(element);
				} else {
					node = element;
				}

				// Append current widget name to data-tau-built and data-tau-name attributes
				dataBuilt = !dataBuilt ? self.name : dataBuilt + engineDataTau.separator + self.name;
				dataName = !dataName ? self.name : dataName + engineDataTau.separator + self.name;

				element.setAttribute(engineDataTau.built, dataBuilt);
				element.setAttribute(engineDataTau.name, dataName);

				return node;
			};

			/**
			 * Protected method initializing the widget
			 * @method _init
			 * @param {HTMLElement} element
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Initializes widget.
			 *
			 * It calls method #\_init.
			 * @method init
			 * @param {HTMLElement} element Element of widget before initialization
			 * @member ns.widget.BaseWidget
			 * @chainable
			 * @internal
			 */
			prototype.init = function (element) {
				var self = this;
				self.id = element.id;

				if (typeof self._init === TYPE_FUNCTION) {
					self._init(element);
				}

				if (element.getAttribute("disabled") || self.options.disabled === true) {
					self.disable();
				} else {
					self.enable();
				}

				return self;
			};

			/**
			 * Bind widget events attached in init mode
			 * @method _bindEvents
			 * @param {HTMLElement} element Base element of widget
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Binds widget events.
			 *
			 * It calls such methods as #\_buildBindEvents and #\_bindEvents.
			 * At the end of binding process, the event "create" with proper
			 * prefix defined in variable widgetEventPrefix is triggered.
			 * @method bindEvents
			 * @param {HTMLElement} element Base element of the widget
			 * @param {boolean} onlyBuild Inform about the type of bindings: build/init
			 * @member ns.widget.BaseWidget
			 * @chainable
			 * @internal
			 */
			prototype.bindEvents = function (element, onlyBuild) {
				var self = this,
					dataBound = element.getAttribute(engineDataTau.bound);

				if (!onlyBuild) {
					dataBound = !dataBound ? self.name : dataBound + engineDataTau.separator + self.name;
					element.setAttribute(engineDataTau.bound, dataBound);
				}
				if (typeof self._buildBindEvents === TYPE_FUNCTION) {
					self._buildBindEvents(element);
				}
				if (!onlyBuild && typeof self._bindEvents === TYPE_FUNCTION) {
					self._bindEvents(element);
				}

				self.trigger(self.widgetEventPrefix + "create", self);

				return self;
			};

			function removeAnimationClasses(element, prefix) {
				var elementClasses = element.classList;
				elementClasses.remove(prefix + classes.left);
				elementClasses.remove(prefix + classes.up);
				elementClasses.remove(prefix + classes.right);
				elementClasses.remove(prefix + classes.down);
			}

			prototype._prepareAnimation = function(eventType, direction) {
				var element = this.element;

				switch(eventType) {
					case "focus":
						removeAnimationClasses(element, classes.blurPrefix);
						removeAnimationClasses(element, classes.focusPrefix);
						element.classList.add(classes.focusPrefix + direction);
						break;
					case "blur":
						removeAnimationClasses(element, classes.focusPrefix);
						removeAnimationClasses(element, classes.blurPrefix);
						element.classList.add(classes.blurPrefix + direction);
						break;
				}
			};
			/**
			 * Focus widget's element.
			 *
			 * This function calls function focus on element and if it is known
			 * the direction of event, the proper css classes are added/removed.
			 * @method _focus
			 * @param {"up"|"down"|"left"|"right} positionFrom The direction of event.
			 * For example, if this parameter has value "down", it means that the movement
			 * comes from the top (eg. down arrow was pressed on keyboard).
			 * @member ns.widget.BaseWidget
			 */
			prototype._focus = function (positionFrom) {
				var element = this.element;

				if (typeof this._prepareAnimation === TYPE_FUNCTION) {
					this._prepareAnimation("focus", positionFrom);
				}
				this.element.focus();
			};

			/**
			 * Blur widget's element.
			 *
			 * This function calls function blur on element and if it is known
			 * the direction of event, the proper css classes are added/removed.
			 * @method _blur
			 * @param {"up"|"down"|"left"|"right} positionFrom
			 * @member ns.widget.BaseWidget
			 */
			prototype._blur = function (positionFrom) {
				var element = this.element;

				if (typeof this._prepareAnimation === TYPE_FUNCTION) {
					this._prepareAnimation("blur", positionFrom);
				}
				element.blur();
			};

			/**
			 * Protected method destroying the widget
			 * @method _destroy
			 * @template
			 * @protected
			 * @member ns.widget.BaseWidget
			 */
			/**
			 * Destroys widget.
			 *
			 * It calls method #\_destroy.
			 *
			 * At the end of destroying process, the event "destroy" with proper
			 * prefix defined in variable widgetEventPrefix is triggered and
			 * the binding set in engine is removed.
			 * @method destroy
			 * @param {HTMLElement} element Base element of the widget
			 * @member ns.widget.BaseWidget
			 */
			prototype.destroy = function (element) {
				var self = this;
				element = element || self.element;
				if (typeof self._destroy === TYPE_FUNCTION) {
					self._destroy(element);
				}
				if (self.element) {
					self.trigger(self.widgetEventPrefix + "destroy");
				}
				if (element) {
					engine.removeBinding(element, self.name);
				}
			};

			/**
			 * Protected method disabling the widget
			 * @method _disable
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @template
			 */
			/**
			 * Disables widget.
			 *
			 * It calls method #\_disable.
			 * @method disable
			 * @member ns.widget.BaseWidget
			 * @chainable
			 */
			prototype.disable = function () {
				var self = this,
					element = self.element,
					args = slice.call(arguments);

				if (typeof self._disable === TYPE_FUNCTION) {
					args.unshift(element);
					self._disable.apply(self, args);
				}
				return this;
			};

			/**
			 * Protected method enabling the widget
			 * @method _enable
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @template
			 */
			/**
			 * Enables widget.
			 *
			 * It calls method #\_enable.
			 * @method enable
			 * @member ns.widget.BaseWidget
			 * @chainable
			 */
			prototype.enable = function () {
				var self = this,
					element = self.element,
					args = slice.call(arguments);

				if (typeof self._enable === TYPE_FUNCTION) {
					args.unshift(element);
					self._enable.apply(self, args);
				}
				return this;
			};

			/**
			 * Protected method causing the widget to refresh
			 * @method _refresh
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @template
			 */
			/**
			 * Refreshes widget.
			 *
			 * It calls method #\_refresh.
			 * @method refresh
			 * @member ns.widget.BaseWidget
			 * @chainable
			 */
			prototype.refresh = function () {
				var self = this;
				if (typeof self._refresh === TYPE_FUNCTION) {
					self._refresh.apply(self, arguments);
				}
				return self;
			};


			/**
			 * Gets or sets options of the widget.
			 *
			 * This method can work in many context.
			 *
			 * If first argument is type of object them, method set values for options given in object. Keys of object are names of options and values from object are values to set.
			 *
			 * If you give only one string argument then method return value for given option.
			 *
			 * If you give two arguments and first argument will be a string then second argument will be intemperate as value to set.
			 *
			 * @method option
			 * @param {string|Object} [name] name of option
			 * @param {*} [value] value to set
			 * @member ns.widget.BaseWidget
			 * @return {*} return value of option or undefined if method is called in setter context
			 */
			prototype.option = function (/*name, value*/) {
				var self = this,
					args = slice.call(arguments),
					firstArgument = args.shift(),
					secondArgument = args.shift(),
					key,
					result,
					partResult,
					refresh = false;
				if (typeof firstArgument === "string") {
					result = self._oneOption(firstArgument, secondArgument);
					if (firstArgument !== undefined && secondArgument !== undefined) {
						refresh = result;
						result = undefined;
					}
				} else if (typeof firstArgument === "object") {
					for (key in firstArgument) {
						if (firstArgument.hasOwnProperty(key)) {
							partResult = self._oneOption(key, firstArgument[key]);
							if (key !== undefined && firstArgument[key] !== undefined) {
								refresh = refresh || partResult;
							}
						}
					}
				}
				if (refresh) {
					self.refresh();
				}
				return result;
			};

			/**
			 * Gets or sets one option of the widget.
			 *
			 * @method _oneOption
			 * @param {string} field
			 * @param {*} value
			 * @member ns.widget.BaseWidget
			 * @return {*}
			 * @protected
			 */
			prototype._oneOption = function (field, value) {
				var self = this,
					methodName,
					refresh = false;
				if (value === undefined) {
					methodName = "_get" + (field[0].toUpperCase() + field.slice(1));
					if (typeof self[methodName] === TYPE_FUNCTION) {
						return self[methodName]();
					}
					return self.options[field];
				}
				methodName = "_set" + (field[0].toUpperCase() + field.slice(1));
				if (typeof self[methodName] === TYPE_FUNCTION) {
					self[methodName](self.element, value);
				} else {
					self.options[field] = value;
					if (self.element) {
						self.element.setAttribute("data-" + (field.replace(/[A-Z]/g, function (c) {
							return "-" + c.toLowerCase();
						})), value);
						refresh = true;
					}
				}
				return refresh;
			};

			/**
			 * Returns true if widget has bounded events.
			 *
			 * This methods enables to check if the widget has bounded 
			 * events through the {@link ns.widget.BaseWidget#bindEvents} method.
			 * @method isBound
			 * @param {string} [type] Type of widget
			 * @member ns.widget.BaseWidget
			 * @internal
			 * @return {boolean} true if events are bounded
			 */
			prototype.isBound = function (type) {
				var element = this.element;
				type = type || this.name;
				return element && element.hasAttribute(engineDataTau.bound) && element.getAttribute(engineDataTau.bound).indexOf(type) > -1;
			};

			/**
			 * Returns true if widget is built.
			 *
			 * This methods enables to check if the widget was built 
			 * through the {@link ns.widget.BaseWidget#build} method.
			 * @method isBuilt
			 * @param {string} [type] Type of widget
			 * @member ns.widget.BaseWidget
			 * @internal
			 * @return {boolean} true if the widget was built
			 */
			prototype.isBuilt = function (type) {
				var element = this.element;
				type = type || this.name;
				return element && element.hasAttribute(engineDataTau.built) && element.getAttribute(engineDataTau.built).indexOf(type) > -1;
			};

			/**
			 * Protected method getting the value of widget
			 * @method _getValue
			 * @return {*}
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Protected method setting the value of widget
			 * @method _setValue
			 * @param {*} value
			 * @return {*}
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Gets or sets value of the widget.
			 *
			 * @method value
			 * @param {*} [value] New value of widget
			 * @member ns.widget.BaseWidget
			 * @return {*}
			 */
			prototype.value = function (value) {
				var self = this;
				if (value !== undefined) {
					if (typeof self._setValue === TYPE_FUNCTION) {
						return self._setValue(value);
					}
					return self;
				}
				if (typeof self._getValue === TYPE_FUNCTION) {
					return self._getValue();
				}
				return self;
			};

			/**
			 * Triggers an event on widget's element.
			 *
			 * @method trigger
			 * @param {string} eventName The name of event to trigger
			 * @param {?*} [data] additional Object to be carried with the event
			 * @param {boolean} [bubbles=true] Indicating whether the event
			 * bubbles up through the DOM or not
			 * @param {boolean} [cancelable=true] Indicating whether
			 * the event is cancelable
			 * @member ns.widget.BaseWidget
			 * @return {boolean} False, if any callback invoked preventDefault on event object
			 */
			prototype.trigger = function (eventName, data, bubbles, cancelable) {
				return eventUtils.trigger(this.element, eventName, data, bubbles, cancelable);
			};

			/**
			 * Adds event listener to widget's element.
			 * @method on
			 * @param {string} eventName The name of event
			 * @param {Function} listener Function called after event will be trigger
			 * @param {boolean} [useCapture=false] useCapture Parameter of addEventListener
			 * @member ns.widget.BaseWidget
			 */
			prototype.on = function (eventName, listener, useCapture) {
				eventUtils.on(this.element, eventName, listener, useCapture);
			};

			/**
			 * Removes event listener from  widget's element.
			 * @method off
			 * @param {string} eventName The name of event
			 * @param {Function} listener Function call after event will be trigger
			 * @param {boolean} [useCapture=false] useCapture Parameter of addEventListener
			 * @member ns.widget.BaseWidget
			 */
			prototype.off = function (eventName, listener, useCapture) {
				eventUtils.off(this.element, eventName, listener, useCapture);
			};

			BaseWidget.prototype = prototype;

			// definition
			ns.widget.BaseWidget = BaseWidget;

			}(window.document, ns));

/*global window, define */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * #Namespace For Widgets
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @class ns.widget
 */
(function (document, ns) {
	
				ns.widget.core = ns.widget.core || {};
			}(window.document, ns));

/*global window, define, ns */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * # Popup Widget
 *
 * @author Hyunkook Cho <hk0713.cho@samsung.com>
 * @class ns.widget.core.Popup
 * @extends ns.widget.Popup
 */
(function (ns) {
	
					/**
				 * Alias for {@link ns.widget.BaseWidget}
				 * @property {Function} BaseWidget
				 * @member ns.widget.core.Popup
				 * @private
				 */
			var BaseWidget = ns.widget.BaseWidget,
				/**
				 * Alias for class ns.engine
				 * @property {ns.engine} engine
				 * @member ns.widget.core.Popup
				 * @private
				 */
				engine = ns.engine,
				/**
				 * Alias for class ns.util.object
				 * @property {Object} objectUtils
				 * @member ns.widget.core.Popup
				 * @private
				 */
				objectUtils = ns.util.object,
				/**
				 * Alias for class ns.util.deferred
				 * @property {Object} UtilDeferred
				 * @member ns.widget.core.Popup
				 * @private
				 */
				UtilDeferred = ns.util.deferred,
				/**
				 * Alias for class ns.util.selectors
				 * @property {Object} utilSelector
				 * @member ns.widget.core.Popup
				 * @private
				 */
				utilSelector = ns.util.selectors,

				Popup = function () {
					var self = this,
						ui = {};

					self.selectors = selectors;
					self.options = objectUtils.merge({}, Popup.defaults);
					/**
					 * Popup state flag
					 * @property {0|1|2|3} [state=null]
					 * @member ns.widget.core.Popup
					 * @private
					 */
					self.state = states.CLOSED;

					ui.overlay = null;
					ui.header = null;
					ui.footer = null;
					ui.content = null;
					ui.container = null;
					self._ui = ui;

					// event callbacks
					self._callbacks = {};
				},
				/**
				 * Object with default options
				 * @property {Object} defaults
				 * @property {string} [options.transition="none"] Sets the default transition for the popup.
				 * @property {string} [options.positionTo="window"] Sets the element relative to which the popup will be centered.
				 * @property {boolean} [options.dismissible=true] Sets whether to close popup when a popup is open to support the back button.
				 * @property {boolean} [options.overlay=true] Sets whether to show overlay when a popup is open.
				 * @property {boolean|string} [options.header=false] Sets content of header.
				 * @property {boolean|string} [options.footer=false] Sets content of footer.
				 * @property {string} [overlayClass=""] Sets the custom class for the popup background, which covers the entire window.
				 * @property {boolean} [options.history=true] Sets whether to alter the url when a popup is open to support the back button.
				 * @member ns.widget.core.Popup
				 * @static
				 */
				defaults = {
					transition: "none",
					dismissible: true,
					overlay: true,
					header: false,
					footer: false,
					overlayClass: "",
					history: true
				},
				states = {
					DURING_OPENING: 0,
					OPENED: 1,
					DURING_CLOSING: 2,
					CLOSED: 3
				},
				CLASSES_PREFIX = "ui-popup",
				/**
				 * Dictionary for popup related css class names
				 * @property {Object} classes
				 * @member ns.widget.core.Popup
				 * @static
				 */
				classes = {
					popup: CLASSES_PREFIX,
					active: CLASSES_PREFIX + "-active",
					overlay: CLASSES_PREFIX + "-overlay",
					header: CLASSES_PREFIX + "-header",
					footer: CLASSES_PREFIX + "-footer",
					content: CLASSES_PREFIX + "-content"
				},
				selectors = {
					header: "." + classes.header,
					content: "." + classes.content,
					footer: "." + classes.footer
				},
				EVENTS_PREFIX = "popup",
				/**
				 * Dictionary for popup related selectors
				 * @property {Object} selectors
				 * @member ns.widget.core.Popup
				 * @static
				 */
				selectors = {
					header: "." + classes.header,
					content: "." + classes.content,
					footer: "." + classes.footer
				},
				/**
				 * Dictionary for popup related events
				 * @property {Object} events
				 * @member ns.widget.core.Popup
				 * @static
				 */
				events = {
					/**
					 * Triggered when the popup has been created in the DOM (via ajax or other) but before all widgets have had an opportunity to enhance the contained markup.
					 * @event popupshow
					 * @member ns.widget.core.Popup
					 */
					show: EVENTS_PREFIX + "show",
					/**
					 * Triggered on the popup after the transition animation has completed.
					 * @event popuphide
					 * @member ns.widget.core.Popup
					 */
					hide: EVENTS_PREFIX + "hide",
					/**
					 * Triggered on the popup we are transitioning to, before the actual transition animation is kicked off.
					 * @event popupbeforeshow
					 * @member ns.widget.core.Popup
					 */
					before_show: EVENTS_PREFIX + "beforeshow",
					/**
					 * Triggered on the popup we are transitioning away from, before the actual transition animation is kicked off.
					 * @event popupbeforehide
					 * @member ns.widget.core.Popup
					 */
					before_hide: EVENTS_PREFIX + "beforehide"
				},

				prototype = new BaseWidget();

			Popup.classes = classes;
			Popup.events = events;
			Popup.defaults = defaults;

			/**
			 * Build the content of popup
			 * @method _buildContent
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._buildContent = function (element) {
				var self = this,
					ui = self._ui,
					selectors = self.selectors,
					content = ui.content || element.querySelector(selectors.content),
					footer = ui.footer || element.querySelector(selectors.footer),
					elementChildren = [].slice.call(element.childNodes),
					elementChildrenLength = elementChildren.length,
					i,
					node;

				if (!content) {
					content = document.createElement("div");
					content.className = classes.content;
					for (i = 0; i < elementChildrenLength; ++i) {
						node = elementChildren[i];
						if (node !== ui.footer && node !== ui.header) {
							content.appendChild(node);
						}
					}
					element.insertBefore(content, footer);
				}
				content.classList.add(classes.content);
				ui.content = content;
			};

			/**
			 * Build the header of popup
			 * @method _buildHeader
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._buildHeader = function (element) {
				var self = this,
					ui = self._ui,
					options = self.options,
					selectors = self.selectors,
					content = ui.content || element.querySelector(selectors.content),
					header = ui.header || element.querySelector(selectors.header);
				if (!header && options.header !== false) {
					header = document.createElement("div");
					header.className = classes.header;
					if (typeof options.header !== "boolean") {
						header.innerHTML = options.header;
					}
					element.insertBefore(header, content);
				}
				if (header) {
					header.classList.add(classes.header);
				}
				ui.header = header;
			};

			/**
			 * Set the header of popup.
			 * This function is called by function "option" when the option "header" is set.
			 * @method _setHeader
			 * @param {HTMLElement} element
			 * @param {boolean|string} value
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._setHeader = function (element, value) {
				var self = this,
					ui = self._ui,
					header = ui.header;
				if (header) {
					header.parentNode.removeChild(header);
					ui.header = null;
				}
				self.options.header = value;
				self._buildHeader(ui.container);
			};

			/**
			 * Build the footer of popup
			 * @method _buildFooter
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._buildFooter = function (element) {
				var self = this,
					ui = self._ui,
					options = self.options,
					footer = ui.footer || element.querySelector(self.selectors.footer);
				if (!footer && options.footer !== false) {
					footer = document.createElement("div");
					footer.className = classes.footer;
					if (typeof options.footer !== "boolean") {
						footer.innerHTML = options.footer;
					}
					element.appendChild(footer);
				}
				if (footer) {
					footer.classList.add(classes.footer);
				}
				ui.footer = footer;
			};

			/**
			 * Set the footer of popup.
			 * This function is called by function "option" when the option "footer" is set.
			 * @method _setFooter
			 * @param {HTMLElement} element
			 * @param {boolean|string} value
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._setFooter = function (element, value) {
				var self = this,
					ui = self._ui,
					footer = ui.footer;
				if (footer) {
					footer.parentNode.removeChild(footer);
					ui.footer = null;
				}
				self.options.footer = value;
				self._buildFooter(ui.container);
			};

			/**
			 * Build structure of Popup widget
			 * @method _build
			 * @param {HTMLElement} element of popup
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.Popup
			 */
			prototype._build = function (element) {
				var self = this,
					container = self._ui.container || element;

				// build header, footer and content
				this._buildHeader(container);
				this._buildFooter(container);
				this._buildContent(container);

				// set overlay
				this._setOverlay(element, this.options.overlay);

				return element;
			};

			/**
			 * Set overlay
			 * @method _setOverlay
			 * @param {HTMLElement} element
			 * @param {boolean} enable
			 * @protected
			 * @member ns.widget.Popup
			 */
			prototype._setOverlay = function(element, enable) {
				var self = this,
					overlayClass = self.options.overlayClass,
					ui = self._ui,
					overlay = ui.overlay;

				// create overlay
				if (enable) {
					if (!overlay) {
						overlay = document.createElement("div");
						element.parentNode.insertBefore(overlay, element);
						ui.overlay = overlay;
					}
					overlay.className = classes.overlay + (overlayClass ? " " + overlayClass : "");
				} else if (overlay) {
					overlay.parentNode.removeChild(overlay);
					ui.overlay = null;
				}
			};

			/**
			 * Returns the state of the popup
			 * @method _isActive
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._isActive = function () {
				var state = this.state;
				return state === states.DURING_OPENING || state === states.OPENED;
			};

			/**
			 * Returns true if popup is already opened and visible
			 * @method _isActive
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._isOpened = function () {
				return this.state === states.OPENED;
			};

			/**
			 * Init widget
			 * @method _init
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._init = function(element) {
				var self = this,
					selectors = self.selectors,
					ui = self._ui;

				ui.header = ui.header || element.querySelector(selectors.header);
				ui.footer = ui.footer || element.querySelector(selectors.footer);
				ui.content = ui.content || element.querySelector(selectors.content);
				ui.container = element;
				// @todo - use selector from page's definition in engine
				ui.page = utilSelector.getClosestByClass(element, "ui-page") || window;
			};

			/**
			 * Set the state of the popup
			 * @method _setActive
			 * @param {boolean} active
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._setActive = function (active) {
				var self = this,
					activeClass = classes.active,
					elementClassList = self.element.classList,
					route = engine.getRouter().getRoute("popup"),
					options = self.options;

				// NOTE: popup's options object is stored in window.history at the router module,
				// and this window.history can't store DOM element object.
				if (typeof options.positionTo !== "string") {
					options.positionTo = null;
				}

				// set state of popup and add proper class
				if (active) {
					// set global variable
					route.setActive(self, options);
					// add proper class
					elementClassList.add(activeClass);
					// set state of popup 	358
					self.state = states.OPENED;
				} else {
					// no popup is opened, so set global variable on "null"
					route.setActive(null, options);
					// remove proper class
					elementClassList.remove(activeClass);
					// set state of popup
					self.state = states.CLOSED;
				}
			};

			/**
			 * Bind events
			 * @method _bindEvents
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._bindEvents = function (element) {
				var self = this;

				self._ui.page.addEventListener("pagebeforehide", self, false);
				window.addEventListener("resize", self, false);
				self._bindOverlayEvents();
			};

			/**
			 * Bind "click" event for overlay
			 * @method _bindOverlayEvents
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._bindOverlayEvents = function () {
				var overlay = this._ui.overlay;
				if (overlay) {
					overlay.addEventListener("click", this, false);
				}
			};

			/**
			 * Unbind "click" event for overlay
			 * @method _bindOverlayEvents
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._unbindOverlayEvents = function () {
				var overlay = this._ui.overlay;
				if (overlay) {
					overlay.removeEventListener("click", this, false);
				}
			};

			/**
			 * Unbind events
			 * @method _bindEvents
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._unbindEvents = function (element) {
				var self = this;
				self._ui.page.removeEventListener("pagebeforehide", self, false);
				window.removeEventListener("resize", self, false);
				self._unbindOverlayEvents();
			};

			/**
			 * Open the popup
			 * @method open
			 * @param {Object=} [options]
			 * @param {string=} [options.transition] options.transition
			 * @member ns.widget.core.Popup
			 */
			prototype.open = function (options) {
				var self = this,
					newOptions = objectUtils.merge(self.options, options);
				if (!self._isActive()) {
					if (!newOptions.dismissible) {
						engine.getRouter().lock();
					}
					self._show(newOptions);
				}
			};

			/**
			 * Close the popup
			 * @method close
			 * @param {Object=} [options]
			 * @param {string=} [options.transition]
			 * @member ns.widget.core.Popup
			 */
			prototype.close = function (options) {
				var self = this,
					newOptions = objectUtils.merge(self.options, options);

				if (self._isActive()) {
					if (!newOptions.dismissible) {
						engine.getRouter().unlock();
					}
					self._hide(newOptions);
				}
			};

			/**
			 * Show popup.
			 * @method _show
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._show = function (options) {
				var self = this,
					transitionOptions = objectUtils.merge({}, options),
					deferred;

				// change state of popup
				self.state = states.DURING_OPENING;
				// set transiton
				transitionOptions.ext = " in ";

				self.trigger(events.before_show);
				// start opening animation
				self._transition(transitionOptions, self._onShow.bind(self));
			};

			/**
			 * Show popup
			 * @method _onShow
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onShow = function() {
				var self = this,
					overlay = self._ui.overlay;
				if (overlay) {
					overlay.style.display = "block";
				}
				self._setActive(true);
				self.trigger(events.show);
			};

			/**
			 * Hide popup
			 * @method _hide
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._hide = function (options) {
				var self = this,
					isOpened = self._isOpened();

				// change state of popup
				self.state = states.DURING_CLOSING;

				self.trigger(events.before_hide);

				if (isOpened) {
					// popup is opened, so we start closing animation
					options.ext = " out ";
					self._transition(options, self._onHide.bind(self));
				} else {
					// popup is active, but not opened yet (DURING_OPENING), so
					// we stop opening animation
					self._callbacks.transitionDeferred.reject();
					self._callbacks.animationEnd();
					// and set popup as inactive
					self._onHide();
				}
			};

			/**
			 * Hide popup
			 * @method _onHide
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onHide = function() {
				var self = this,
					overlay = self._ui.overlay;
				if (overlay) {
					overlay.style.display = "";
				}
				self._setActive(false);
				self.trigger(events.hide);
			};

			/**
			 * Handle events
			 * @method handleEvent
			 * @param {Event} event
			 * @member ns.widget.core.Popup
			 */
			prototype.handleEvent = function(event) {
				var self = this;
				switch(event.type) {
					case "pagebeforehide":
						self.close({transition: "none"});
						break;
					case "resize":
						self._onResize(event);
						break;
					case "click":
						if ( event.target === self._ui.overlay ) {
							self._onClickOverlay(event);
						}
						break;
				}
			};

			/**
			 * Refresh structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._refresh = function() {
				var self = this;
				self._unbindOverlayEvents();
				self._setOverlay(self.element, self.options.overlay);
				self._bindOverlayEvents();
			};

			/**
			 * Callback function fires after clicking on overlay.
			 * @method _onClickOverlay
			 * @param {Event} event
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onClickOverlay = function(event) {
				var options = this.options;

				event.preventDefault();
				event.stopPropagation();

				if (options.dismissible) {
					this.close();
				}
			};

			/**
			 * Callback function fires on resizing
			 * @method _onResize
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onResize = function() {
				if (this._isOpened()) {
					this._refresh();
				}
			};

			function clearAnimation(self, transitionClass, deferred) {
				var element = self.element,
					elementClassList = element.classList,
					overlay = self._ui.overlay,
					animationEndCallback = self._callbacks.animationEnd;

				// remove callbacks on animation events
				element.removeEventListener("animationend", animationEndCallback, false);
				element.removeEventListener("webkitAnimationEnd", animationEndCallback, false);

				// clear classes
				transitionClass.split(" ").forEach(function (currentClass) {
					currentClass = currentClass.trim();
					if (currentClass.length > 0) {
						elementClassList.remove(currentClass);
						if (overlay) {
							overlay.classList.remove(currentClass);
						}
					}
				});
				if (deferred.state() === "pending") {
					// we resolve only pending (not rejected) deferred
					deferred.resolve();
				}
			}

			function setTransitionDeferred(self, resolve) {
				var deferred = new UtilDeferred();

				deferred.then(function() {
					if (deferred === self._callbacks.transitionDeferred) {
						resolve();
					}
				});

				self._callbacks.transitionDeferred = deferred;
				return deferred;
			}
			/**
			 * Animate popup opening/closing
			 * @method _transition
			 * @protected
			 * @param {Object} [options]
			 * @param {string=} [options.transition]
			 * @param {string=} [options.ext]
			 * @param {?Function} [resolve]
			 * @member ns.widget.core.Popup
			 */
			prototype._transition = function (options, resolve) {
				var self = this,
					transition = options.transition || self.options.transition || "none",
					transitionClass = transition + options.ext,
					element = self.element,
					overlay = self._ui.overlay,
					elementClassList = element.classList,
					deferred,
					animationEndCallback;

				deferred = setTransitionDeferred(self, resolve);

				if (transition !== "none") {
					// set animationEnd callback
					animationEndCallback = clearAnimation.bind(null, self, transitionClass, deferred);
					self._callbacks.animationEnd = animationEndCallback;

					// add animation callbacks
					element.addEventListener("animationend", animationEndCallback, false);
					element.addEventListener("webkitAnimationEnd", animationEndCallback, false);
					// add transition classes
					transitionClass.split(" ").forEach(function (currentClass) {
						currentClass = currentClass.trim();
						if (currentClass.length > 0) {
							elementClassList.add(currentClass);
							if (overlay) {
								overlay.classList.add(currentClass);
							}
						}
					});
				} else {
					window.setTimeout(deferred.resolve, 0);
				}
				return deferred;
			};

			/**
			 * Destroy popup
			 * @method _destroy
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._destroy = function() {
				var self = this,
					element = self.element;

				self._unbindEvents(element);
				self._setOverlay(element, false);
			};

			Popup.prototype = prototype;

			ns.widget.core.Popup = Popup;

			engine.defineWidget(
				"Popup",
				"[data-role='popup'], .ui-popup",
				[
					"open",
					"close",
					"reposition"
				],
				Popup,
				"core"
			);
			}(ns));

/*global window, define */
/*
* Copyright (c) 2013 - 2014 Samsung Electronics Co., Ltd
*
* Licensed under the Flora License, Version 1.1 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://floralicense.org/license/
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/*jslint nomen: true, plusplus: true */

/**
 * # Popup Widget
 * Shows a pop-up window.
 *
 * The popup widget shows in the middle of the screen a list of items in a pop-up window. It automatically optimizes the pop-up window size within the screen. The following table describes the supported popup classes.
 *
 * ## Default selectors
 * All elements with class *ui-popup* will be become popup widgets.
 *
 * The pop-up window can contain a header, content, and footer area like the page element.
 *
 * To open a pop-up window from a link, use the data-rel attribute in HTML markup as in the following code:
 *
 *      @example
 *      <a href="#popup" class="ui-btn" data-rel="popup">Open popup when clicking this element.</a>
 *
 * The following table shows examples of various types of popups.
 *
 * The popup contains header, content and footer area
 *
 * ###HTML Examples
 *
 * #### Basic popup with header, content, footer
 *
 *		@example
 *		<div class="ui-page">
 *		    <div class="ui-popup">
 *		        <div class="ui-popup-header">Power saving mode</div>
 *		        <div class="ui-popup-content">
 *		            Turning on Power
 *		            saving mode will
 *		            limit the maximum
 *		            per
 *		        </div>
 *		        <div class="ui-popup-footer">
 *		            <button id="cancel" class="ui-btn">Cancel</button>
 *		        </div>
 *		    </div>
 *		</div>
 *
 * #### Popup with 2 buttons in the footer
 *
 *      @example
 *         <div id="2btnPopup" class="ui-popup">
 *             <div class="ui-popup-header">Delete</div>
 *             <div class="ui-popup-content">
 *                 Delete the image?
 *             </div>
 *             <div class="ui-popup-footer ui-grid-col-2">
 *                 <button id="2btnPopup-cancel" class="ui-btn">Cancel</button>
 *                 <button id="2btnPopup-ok" class="ui-btn">OK</button>
 *             </div>
 *         </div>
 *
 * #### Popup with checkbox/radio
 *
 * If you want make popup with list checkbox(or radio) just include checkbox (radio) to popup and add class *ui-popup-checkbox-label* to popup element.
 *
 *		@example
 *         <div id="listBoxPopup" class="ui-popup">
 *             <div class="ui-popup-header">When?</div>
 *             <div class="ui-popup-content" style="height:243px; overflow-y:scroll">
 *                 <ul class="ui-listview">
 *                     <li>
 *                         <label for="check-1" class="ui-popup-checkbox-label">Yesterday</label>
 *                         <input type="checkbox" name="checkset" id="check-1" />
 *                     </li>
 *                     <li>
 *                         <label for="check-2" class="ui-popup-checkbox-label">Today</label>
 *                         <input type="checkbox" name="checkset" id="check-2" />
 *                     </li>
 *                     <li>
 *                         <label for="check-3" class="ui-popup-checkbox-label">Tomorrow</label>
 *                         <input type="checkbox" name="checkset" id="check-3" />
 *                     </li>
 *                 </ul>
 *                 <ul class="ui-listview">
 *                     <li>
 *                         <label for="radio-1" class="ui-popup-radio-label">Mandatory</label>
 *                         <input type="radio" name="radioset" id="radio-1" />
 *                     </li>
 *                     <li>
 *                         <label for="radio-2" class="ui-popup-radio-label">Optional</label>
 *                         <input type="radio" name="radioset" id="radio-2" />
 *                     </li>
 *                 </ul>
 *             </div>
 *             <div class="ui-popup-footer">
 *                 <button id="listBoxPopup-close" class="ui-btn">Close</button>
 *             </div>
 *         </div>
 *     </div>
 *
 * #### Popup with no header and footer
 *
 *      @example
 *         <div id="listNoTitleNoBtnPopup" class="ui-popup">
 *             <div class="ui-popup-content" style="height:294px; overflow-y:scroll">
 *                 <ul class="ui-listview">
 *                     <li><a href="">Ringtones 1</a></li>
 *                     <li><a href="">Ringtones 2</a></li>
 *                     <li><a href="">Ringtones 3</a></li>
 *                 </ul>
 *             </div>
 *         </div>
 *
 * #### Toast popup
 *
 *      @example
 *         <div id="PopupToast" class="ui-popup ui-popup-toast">
 *             <div class="ui-popup-content">Saving contacts to sim on Samsung</div>
 *         </div>
 *
 * ### Create Option popup
 *
 * Popup inherits value of option positionTo from property data-position-to set in link.
 *
 *		@example
 *		<!--definition of link, which opens popup and sets its position-->
 *		<a href="#popupOptionText" data-rel="popup"  data-position-to="origin">Text</a>
 *		<!--definition of popup, which inherites property position from link-->
 *		<div id="popupOptionText" class="ui-popup">
 *			<div class="ui-popup-content">
 *				<ul class="ui-listview">
 *				<li><a href="#">Option 1</a></li>
 *				<li><a href="#">Option 2</a></li>
 *				<li><a href="#">Option 3</a></li>
 *				<li><a href="#">Option 4</a></li>
 *				</ul>
 *			</div>
 *		</div>
 *
 * ### Opening and closing popup
 *
 * To open popup from "a" link using html markup, use the following code:
 *
 *		@example
 *      <div class="ui-page">
 *          <header class="ui-header">
 *              <h2 class="ui-title">Call menu</h2>
 *          </header>
 *          <div class="ui-content">
 *              <a href="#popup" class="ui-btn" data-rel="popup" >Open Popup</a>
 *          </div>
 *
 *          <div id="popup" class="ui-popup">
 *               <div class="ui-popup-header">Power saving mode</div>
 *                   <div class="ui-popup-content">
 *                       Turning on Power
 *                       saving mode will
 *                       limit the maximum
 *                       per
 *                   </div>
 *               <div class="ui-popup-footer">
 *               <button id="cancel" class="ui-btn">Cancel</button>
 *           </div>
 *       </div>
 *
 *  To open the popup widget from JavaScript use method *tau.openPopup(to)*
 *
 *          @example
 *          tau.openPopup("popup")
 *
 *  To close the popup widget from JavaScript use method *tau.openPopup(to)*
 *
 *          @example
 *          tau.closePopup("popup")
 *
 * To find the currently active popup, use the ui-popup-active class.
 *
 * To bind the popup to a button, use the following code:
 *
 *      @example
 *         <!--HTML code-->
 *         <div id="1btnPopup" class="ui-popup">
 *             <div class="ui-popup-header">Power saving mode</div>
 *             <div class="ui-popup-content">
 *             </div>
 *             <div class="ui-popup-footer">
 *                 <button id="1btnPopup-cancel" class="ui-btn">Cancel</button>
 *             </div>
 *         </div>
 *         <script>
 *             // Popup opens with button click
 *             var button = document.getElementById("button");
 *             button.addEventListener("click", function() {
 *                 tau.openPopup("#1btnPopup");
 *             });
 *
 *             // Popup closes with Cancel button click
 *             document.getElementById("1btnPopup-cancel").addEventListener("click", function() {
 *                 tau.closePopup();
 *             });
 *         </script>
 *
 * ## Manual constructor
 * For manual creation of popup widget you can use constructor of widget from **tau** namespace:
 *
 *		@example
 *		var popupElement = document.getElementById("popup"),
 *			popup = tau.widget.popup(buttonElement);
 *
 * Constructor has one require parameter **element** which are base **HTMLElement** to create widget. We recommend get this element by method *document.getElementById*.
 *
 * ## Options for Popup Widget
 *
 * Options for widget can be defined as _data-..._ attributes or give as parameter in constructor.
 *
 * You can change option for widget using method **option**.
 *
 * ## Methods
 *
 * To call method on widget you can use tau API:
 *
 *		@example
 *		var popupElement = document.getElementById("popup"),
 *			popup = tau.widget.popup(buttonElement);
 *
 *		popup.methodName(methodArgument1, methodArgument2, ...);
 *
 * ## Transitions
 *
 * By default, the framework doesn't apply transition. To set a custom transition effect, add the data-transition attribute to the link.
 *
 *		@example
 *		<a href="index.html" data-rel="popup" data-transition="slideup">I'll slide up</a>
 *
 * Global configuration:
 *
 *		@example
 *		gear.ui.defaults.popupTransition = "slideup";
 *
 * ### Transitions list
 *
 * - **none** Default value, no transition.
 * - **slideup** Makes the content of the pop-up slide up.
 *
 * ## Handling Popup Events
 *
 * To use popup events, use the following code:
 *
 *      @example
 *         <!--Popup html code-->
 *         <div id="popup" class="ui-popup">
 *             <div class="ui-popup-header"></div>
 *             <div class="ui-popup-content"></div>
 *         </div>
 *         </div>
 *         <script>
 *             // Use popup events
 *             var popup = document.getElementById("popup");
 *             popup.addEventListener("popupbeforecreate", function() {
 *                 // Implement code for popupbeforecreate event
 *             });
 *         </script>
 *
 * Full list of available events is in [events list section](#events-list).
 *
 * @author Hyunkook Cho <hk0713.cho@samsung.com>
 * @class ns.widget.core.Popup
 * @extends ns.widget.core.BasePopup
 */
(function (window, document, ns) {
	
	
			var Popup = ns.widget.core.Popup,

				PopupPrototype = Popup.prototype,

				engine = ns.engine,

				objectUtils = ns.util.object,

				domUtils = ns.util.DOM,

				/**
				 * Object with default options
				 * @property {Object} defaults
				 * @property {string} [options.transition="none"] Sets the default transition for the popup.
				 * @property {string} [options.positionTo="window"] Sets the element relative to which the popup will be centered.
				 * @property {boolean} [options.dismissible=true] Sets whether to close popup when a popup is open to support the back button.
				 * @property {boolean} [options.overlay=true] Sets whether to show overlay when a popup is open.
				 * @property {string} [overlayClass=""] Sets the custom class for the popup background, which covers the entire window.
				 * @property {boolean} [options.history=true] Sets whether to alter the url when a popup is open to support the back button.
				 * @property {string} [options.arrow="l,t,r,b"] Sets directions of popup's arrow by priority ("l" for left, "t" for top,
				 * "r" for right, and "b" for bottom). The first one has the highest priority, the last one - the lowest. If you set arrow="t",
				 * then arrow will be placed at the top of popup container and the whole popup will be placed under cliced element.
				 * @property {string} [options.positionTo="window"] Sets the element relative to which the popup will be centered.
				 * @property {number} [options.distance=0] Sets the extra distance in px from clicked element.
				 * @member ns.widget.core.ContextPopup
				 * @static
				 * @private
				 */
				defaults = objectUtils.merge({}, Popup.defaults, {
					arrow: "l,b,r,t",
					positionTo: "window",
					distance: 0
				}),

				ContextPopup = function () {
					var self = this,
						ui;

					Popup.call(self);

					// set options
					self.options = objectUtils.merge(self.options, defaults);

					// set ui
					ui = self._ui || {};
					ui.wrapper = null;
					ui.arrow = null;
					self._ui = ui;
				},

				/**
				 * @property {Object} classes Dictionary for popup related css class names
				 * @member ns.widget.core.Popup
				 * @static
				 */
				CLASSES_PREFIX = "ui-popup",
				classes = objectUtils.merge({}, Popup.classes, {
					wrapper: CLASSES_PREFIX + "-wrapper",
					context: "ui-ctxpopup",
					arrow: "ui-arrow",
					arrowDir: CLASSES_PREFIX + "-arrow-",
					build: "ui-build"
				}),

				/**
				 * @property {Object} events Dictionary for popup related events
				 * @member ns.widget.core.Popup
				 * @static
				 */
				events = objectUtils.merge({}, Popup.events, {
					before_position: "beforeposition"
				}),

				positionType = {
					WINDOW: "window",
					ORIGIN: "origin"
				},

				prototype = new Popup();

			ContextPopup.defaults = defaults;
			ContextPopup.classes = classes;
			ContextPopup.events = events;

			/**
			 * Build structure of Popup widget
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._build = function (element) {
				var self = this,
					ui = self._ui,
					wrapper,
					arrow,
					child = element.firstChild;

				// set class for element
				element.classList.add(classes.popup);

				// create wrapper
				wrapper = document.createElement("div");
				wrapper.classList.add(classes.wrapper);
				ui.wrapper = wrapper;
				ui.container = wrapper;

				// move all children to wrapper
				while (child) {
					wrapper.appendChild(child);
					child = element.firstChild;
				}

				// create arrow
				arrow = document.createElement("div");
				arrow.appendChild(document.createElement("span"));
				arrow.classList.add(classes.arrow);
				ui.arrow = arrow;

				// add wrapper and arrow to popup element
				element.appendChild(wrapper);
				element.appendChild(arrow);

				// build elements of popup
				PopupPrototype._build.call(self, element);

				return element;
			};

			/**
			 * Init widget
			 * @method _init
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._init = function(element) {
				var self = this,
					ui = self._ui;

				PopupPrototype._init.call(this, element);

				ui.wrapper = ui.wrapper || element.querySelector("." + classes.wrapper);
				ui.arrow = ui.arrow || element.querySelector("." + classes.arrow);

				// set container of popup elements
				ui.container = ui.wrapper;
			};

			/**
			 * Set positon and size of popup.
			 * @method _reposition
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._reposition = function(options) {
				var self = this,
					element = self.element,
					elementClassList = element.classList;

				options = objectUtils.merge({}, self.options, options);

				self.trigger(events.before_position, null, false);

				elementClassList.add(classes.build);

				// set height of content
				self._setContentHeight();
				// set position of popup
				self._placementCoords(options);

				elementClassList.remove(classes.build);

			};

			/**
			 * Find the best positon of context popup.
			 * @method findBestPosition
			 * @param {ns.widget.core.ContextPopup} self
			 * @param {HTMLElement} clickedElement
			 * @private
			 * @member ns.widget.core.ContextPopup
			 */
			function findBestPosition(self, clickedElement) {
				var options = self.options,
					arrowsPriority = options.arrow.split(","),
					element = self.element,
					windowWidth = window.innerWidth,
					windowHeight = window.innerHeight,
					popupWidth = element.offsetWidth,
					popupHeight = element.offsetHeight,
					// offset coordinates of clicked element
					clickElementRect = clickedElement.getBoundingClientRect(),
					clickElementOffsetX = clickElementRect.left,
					clickElementOffsetY = clickElementRect.top,
					// width of visible part of clicked element
					clickElementOffsetWidth = Math.min(clickElementRect.width,
							windowWidth - clickElementOffsetX),
					// height of visible part of clicked element
					clickElementOffsetHeight = Math.min(clickElementRect.height,
							windowHeight - clickElementOffsetY),
					// params for all types of popup
					// "l" - popup with arrow on the left side, "r" - right, "b" - bottom, "t" - top
					// dir - this letter is added as a suffix of class to popup's element
					// fixedPositionField - specifies which coordinate is changed for this type of popup
					// fixedPositionFactor - factor, which specifies if size should be added or subtracted
					// size - available size, which is needed for this type of popup (width or height)
					// max - maximum size of available place
					params = {
						"l": {dir: "l", fixedPositionField: "x", fixedPositionFactor: 1,
							size: popupWidth, max: clickElementOffsetX},
						"r": {dir: "r", fixedPositionField: "x", fixedPositionFactor: -1,
							size: popupWidth, max: windowWidth - clickElementOffsetX - clickElementOffsetWidth},
						"b": {dir: "b", fixedPositionField: "y", fixedPositionFactor: -1,
							size: popupHeight, max: clickElementOffsetY},
						"t": {dir: "t", fixedPositionField: "y", fixedPositionFactor: 1,
							size: popupHeight, max: windowHeight - clickElementOffsetY - clickElementOffsetHeight}
					},
					bestDirection,
					direction,
					bestOffsetInfo;

				// set value of bestDirection on the first possible type or top
				bestDirection = params[arrowsPriority[0]] || params.t;

				arrowsPriority.forEach(function(key){
					var param = params[key],
						paramMax = param.max;
					if (!direction) {
						if (param.size < paramMax) {
							direction = param;
						} else if (paramMax > bestDirection.max) {
							bestDirection = param;
						}
					}
				});

				if (!direction) {
					direction = bestDirection;
					if (direction.fixedPositionField === "x") {
						popupWidth = direction.max;
					} else {
						popupHeight = direction.max;
					}
				}

				// info about the best position without taking into account type of popup
				bestOffsetInfo = {
					x: clickElementOffsetX + clickElementOffsetWidth / 2 - popupWidth / 2,
					y: clickElementOffsetY + clickElementOffsetHeight / 2 - popupHeight / 2,
					w: popupWidth,
					h: popupHeight,
					dir: direction.dir
				};

				// check type of popup and correct value for "fixedPositionField" coordinate
				bestOffsetInfo[direction.fixedPositionField] +=
					(direction.fixedPositionField === "x" ?
						(popupWidth + clickElementOffsetWidth) * direction.fixedPositionFactor :
						(popupHeight + clickElementOffsetHeight) * direction.fixedPositionFactor)
						/ 2 + options.distance * direction.fixedPositionFactor;

				return bestOffsetInfo;
			}

			/**
			 * Find the best positon of arrow.
			 * @method adjustedPositionAndPlacementArrow
			 * @param {ns.widget.core.ContextPopup} self
			 * @param {Object} bestRectangle
			 * @param {number} x
			 * @param {number} y
			 * @private
			 * @member ns.widget.core.ContextPopup
			 */
			function adjustedPositionAndPlacementArrow(self, bestRectangle, x, y) {
				var ui = self._ui,
					wrapper = ui.wrapper,
					arrow = ui.arrow,
					popupElement = self.element,
					arrowStyle = arrow.style,
					windowWidth = window.innerWidth,
					windowHeight = window.innerHeight,
					wrapperRect = wrapper.getBoundingClientRect(),
					arrowHalfWidth = arrow.offsetWidth / 2,
					popupProperties = {
						"padding-top": 0,
						"padding-bottom": 0,
						"padding-left": 0,
						"padding-right": 0
					},
					wrapperProperties = {
						"margin-top": 0,
						"margin-bottom": 0,
						"margin-left": 0,
						"margin-right": 0,
						"padding-top": 0,
						"padding-bottom": 0,
						"padding-left": 0,
						"padding-right": 0
					},
					margins,
					params = {
						"t": {pos: x, min: "left", max: "right", posField: "x", valField: "w", styleField: "left"},
						"b": {pos: x, min: "left", max: "right", posField: "x", valField: "w", styleField: "left"},
						"l": {pos: y, min: "top", max: "bottom", posField: "y", valField: "h", styleField: "top"},
						"r": {pos: y, min: "top", max: "bottom", posField: "y", valField: "h", styleField: "top"}
					},
					param = params[bestRectangle.dir],
					surplus;

				domUtils.extractCSSProperties(popupElement, popupProperties);
				domUtils.extractCSSProperties(wrapper, wrapperProperties);
				margins	= {
					"t": popupProperties["padding-top"] + wrapperProperties["margin-top"] + wrapperProperties["padding-top"],
					"b": popupProperties["padding-bottom"] + wrapperProperties["margin-bottom"] + wrapperProperties["padding-bottom"],
					"l": popupProperties["padding-left"] + wrapperProperties["margin-left"] + wrapperProperties["padding-left"],
					"r": popupProperties["padding-right"] + wrapperProperties["margin-right"] + wrapperProperties["padding-right"]
				};

				// value of coordinates of proper edge of wrapper
				wrapperRect = {
					// x-coordinate of left edge
					left: margins.l + bestRectangle.x,
					// x-coordinate of right edge
					right: margins.l + wrapperRect.width + bestRectangle.x,
					// y-coordinate of top edge
					top: margins.t + bestRectangle.y,
					// y-coordinate of bottom edge
					bottom: wrapperRect.height + margins.t + bestRectangle.y
				};

				if (wrapperRect[param.min] > param.pos - arrowHalfWidth) {
					surplus = bestRectangle[param.posField];
					if (surplus > 0) {
						bestRectangle[param.posField] = Math.max(param.pos - arrowHalfWidth, 0);
						param.pos = bestRectangle[param.posField] + arrowHalfWidth;
					} else {
						param.pos = wrapperRect[param.min] + arrowHalfWidth;
					}
				} else if (wrapperRect[param.max] < param.pos + arrowHalfWidth) {
					surplus = (param.valField === "w" ? windowWidth : windowHeight)
						- (bestRectangle[param.posField] + bestRectangle[param.valField]);
					if (surplus > 0) {
						bestRectangle[param.posField] += Math.min(surplus, (param.pos + arrowHalfWidth) - wrapperRect[param.max]);
						param.pos = bestRectangle[param.posField] + bestRectangle[param.valField] - arrowHalfWidth;
					} else {
						param.pos = wrapperRect[param.max] - arrowHalfWidth;
					}
				}

				arrowStyle[param.styleField] = (param.pos - arrowHalfWidth - bestRectangle[param.posField]) + "px";

				return bestRectangle;
			}

			/**
			 * Set top, left and margin for popup's container.
			 * @method _placementCoordsWindow
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._placementCoordsWindow = function(element) {
				var elementStyle = element.style,
					elementWidth = element.offsetWidth,
					elementHeight = element.offsetHeight;

				elementStyle.top = (window.innerHeight - elementHeight) + "px";
				elementStyle.left = "50%";
				elementStyle.marginLeft = -(elementWidth / 2) + "px";
			};

			/**
			 * Find clicked element.
			 * @method _findClickedElement
			 * @param {number} x
			 * @param {number} y
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._findClickedElement = function(x, y) {
				return document.elementFromPoint(x, y);
			};

			/**
			 * Emulate position of event for clicked element.
			 * @method emulatePositionOfClick
			 * @param {string} bestDirection direction of arrow
			 * @param {HTMLElement} clickedElement
			 * @private
			 * @member ns.widget.core.ContextPopup
			 */
			function emulatePositionOfClick(bestDirection, clickedElement) {
				var clickedElementRect = clickedElement.getBoundingClientRect(),
					position = {};

				switch(bestDirection) {
					case "l":
						// the arrow will be on the left edge of container, so x-coordinate
						// should have value equals to the position of right edge of clicked element
						position.x = clickedElementRect.right;
						// y-coordinate should have value equals to the position of top edge of clicked
						// element plus half of its height
						position.y = clickedElementRect.top + clickedElementRect.height / 2;
						break;
					case "r":
						// the arrow will be on the right edge of container
						position.x = clickedElementRect.left;
						position.y =  clickedElementRect.top + clickedElementRect.height / 2;
						break;
					case "t":
						// the arrow will be on the top edge of container
						position.x = clickedElementRect.left + clickedElementRect.width / 2;
						position.y = clickedElementRect.bottom;
						break;
					case "b":
						// the arrow will be on the bottom edge of container
						position.x = clickedElementRect.left + clickedElementRect.width / 2;
						position.y = clickedElementRect.top;
						break;
				}
				return position;
			}

			/**
			 * Find and set the best position for popup.
			 * @method _placementCoords
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._placementCoords = function(options) {
				var self = this,
					positionTo = options.positionTo,
					x = options.x,
					y = options.y,
					element = self.element,
					elementStyle = element.style,
					elementClassList = element.classList,
					emulatedPosition,
					elementHeight,
					clickedElement,
					bestRectangle;

				if (typeof positionTo === "string") {
					if (positionTo === positionType.ORIGIN && typeof x === "number" && typeof y === "number") {
						clickedElement = self._findClickedElement(x, y);
					} else if (positionTo !== positionType.WINDOW) {
						try {
							clickedElement = document.querySelector(options.positionTo);
						} catch(e) {}
					}
				} else {
					clickedElement = positionTo;
				}

				if (clickedElement) {

					elementClassList.add(classes.context);

					elementHeight = element.offsetHeight;
					bestRectangle = findBestPosition(self, clickedElement);

					elementClassList.add(classes.arrowDir + bestRectangle.dir);

					if (typeof x !== "number" && typeof y !== "number") {
						// if we found element, which was clicked, but the coordinates of event
						// was not available, we have to count these coordinates to the center of proper edge of element.
						emulatedPosition = emulatePositionOfClick(bestRectangle.dir, clickedElement);
						x = emulatedPosition.x;
						y = emulatedPosition.y;
					}
					bestRectangle = adjustedPositionAndPlacementArrow(self, bestRectangle, x, y);

					if (elementHeight > bestRectangle.h) {
						self._setContentHeight(bestRectangle.h);
					}

					elementStyle.left = bestRectangle.x + "px";
					elementStyle.top = bestRectangle.y + "px";

				} else {
					self._placementCoordsWindow(element);
				}

			};

			/**
			 * Set height for popup's container.
			 * @method _setContentHeight
			 * @param {number} maxHeight
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._setContentHeight = function(maxHeight) {
				var self = this,
					element = self.element,
					content = self._ui.content,
					contentStyle,
					contentHeight,
					elementOffsetHeight;

				if (content) {
					contentStyle = content.style;

					if (contentStyle.height || contentStyle.minHeight) {
						contentStyle.height = "";
						contentStyle.minHeight = "";
					}

					maxHeight = maxHeight || window.innerHeight;

					contentHeight = content.offsetHeight;
					elementOffsetHeight = element.offsetHeight;

					if (elementOffsetHeight > maxHeight) {
						contentHeight -= (elementOffsetHeight - maxHeight);
						contentStyle.height = contentHeight + "px";
						contentStyle.minHeight = contentHeight + "px";
					}
				}

			};

			/**
			 * Hide popup.
			 * @method _onHide
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._onHide = function() {
				var self = this,
					ui = self._ui,
					element = self.element,
					elementClassList = element.classList,
					content = ui.content,
					arrow = ui.arrow;

				elementClassList.remove(classes.context);
				["l", "r", "b", "t"].forEach(function(key) {
					elementClassList.remove(classes.arrowDir + key);
				});

				// we remove styles for element, which are changed
				// styles for container, header and footer are left unchanged
				element.removeAttribute("style");
				arrow.removeAttribute("style");

				PopupPrototype._onHide.call(self);
			};

			/**
			 * Destroy popup.
			 * @method _destroy
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._destroy = function() {
				var self = this,
					element = self.element,
					ui = self._ui,
					wrapper = ui.wrapper;

				PopupPrototype._destroy.call(self);

				[].forEach.call(wrapper.children, function(child) {
					element.appendChild(child);
				});

				wrapper.parentNode.removeChild(wrapper);
				ui.arrow.parentNode.removeChild(ui.arrow);

				ui.wrapper = null;
				ui.arrow = null;
			};

			/**
			 * Show popup.
			 * @method _destroy
			 * @protected
			 * @member ns.widget.core.ContextPopup
			 */
			prototype._show = function(options) {
				this._reposition(options);
				PopupPrototype._show.call(this, options);
			};

			/**
			 * Set new position for popup.
			 * @method reposition
			 * @param options
			 * @param options.x
			 * @param options.y
			 * @param options.positionTo
			 * @member ns.widget.core.ContextPopup
			 */
			prototype.reposition = function(options) {
				if (this._isActive()) {
					this._reposition(options);
				}
			};

			ContextPopup.prototype = prototype;
			ns.widget.core.ContextPopup = ContextPopup;

			engine.defineWidget(
				"Popup",
				"[data-role='popup'], .ui-popup",
				[
					"open",
					"close",
					"reposition"
				],
				ContextPopup,
				"core",
				true
			);

			// @remove
			// THIS IS ONLY FOR COMPATIBILITY
			ns.widget.popup = ns.widget.Popup;

			}(window, window.document, ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */

/**
 * #Wearable Widget Reference
 * The Tizen Web UI service provides rich Tizen widgets that are optimized for the Tizen Web browser. You can use the widgets for:
 *
 * - CSS animation
 * - Rendering
 *
 * The following table displays the widgets provided by the Tizen Web UI service.
 * @class ns.widget.wearable
 * @seeMore https://developer.tizen.org/dev-guide/2.2.1/org.tizen.web.uiwidget.apireference/html/web_ui_framework.htm "Web UI Framework Reference"
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, ns) {
	
				ns.widget.wearable = ns.widget.wearable || {};
			}(window, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Button Widget
 * Shows a control that can be used to generate an action event.
 *
 * ## Default selectors
 * The button widget shows a control on the screen that you can use to generate an action event when it is pressed and released. This widget is coded with standard HTML anchor and input elements.
 *
 * Default selector for buttons is class *ui-btn*
 *
 * ### HTML Examples
 *
 * #### Standard button
 * To add a button widget to the application, use the following code:
 *
 *      @example
 *      <button type="button" class="ui-btn">Button</button>
 *      <a href="#" class="ui-btn">Button</a>
 *      <input type="button" class="ui-btn" value="Button" />
 *
 * #### Inline button
 *
 *      @example
 *      <input type="button" class="ui-btn ui-inline" value="Button" />
 *
 * #### Multiline text button
 *
 *      @example
 *      <a href="#" class="ui-btn ui-multiline ui-inline">A Button<br />Icon</a>
 *
 * ## Options
 *
 * ### Icons
 * Buttons can contains icons
 *
 * Creates an icon button in the header area is permitted but in content or footer area creating icon are not supported.
 *
 * To use menu icon in header add class *ui-more* to the button element:
 *
 *      @example
 *      <button class="ui-btn ui-more ui-icon-overflow">More Options</button>
 *
 * Samsung Gear Web UI Framework supports 3 icon css styles:
 *
 *  - ui-icon-detail
 *  - ui-icon-overflow
 *  - ui-icon-selectall
 *
 * ### Disabled
 *
 * If you want to make disabled button, add attribute *disabled* in button tag:
 *
 *      @example
 *      <button class="ui-btn" disabled="disabled">Button disabled</button>
 *
 * ### Inline
 *
 * If you want to make inline button, add class *ui-inline* to button element:
 *
 *      @example
 *      <button class="ui-btn ui-inline">Inline button</button>
 *
 * ### Multiline
 *
 * If you want to make multiline text button, add *ui-multiline* class
 *
 *      @example
 *      <button class="ui-btn ui-multiline">Multiline button</button>
 *
 * ### Color theme
 *
 *To optimize color support for the Samsung Gear, the following styles below are supported
 *
 * <table>
 *  <tr>
 *      <th>Class</th>
 *      <th>Default</th>
 *      <th>Press</th>
 *      <th>Disable</th>
 *  </tr>
 *  <tr>
 *      <td>ui-color-red</td>
 *      <td>#ce2302</td>
 *      <td>#dd654e</td>
 *      <td>#3d0a0a</td>
 *  </tr>
 *  <tr>
 *      <td>ui-color-orange</td>
 *      <td>#ed8600</td>
 *      <td>#f0aa56</td>
 *      <td>#462805</td>
 *  </tr>
 *  <tr>
 *      <td>ui-color-green</td>
 *      <td>#64a323</td>
 *      <td>#92be5e</td>
 *      <td>#1e3108</td>
 *  </tr>
 * </table>
 *
 * ### Button Group
 *
 * You can group buttons in columns or rows. The following table lists the supported button column and row classes.
 *
 * <table>
 *  <tr>
 *      <th>Class</th>
 *      <th>Description</th>
 *  </tr>
 *  <tr>
 *      <td>ui-grid-col-1</td>
 *      <td>Defines the button column width as 100% of the screen.</td>
 *  </tr>
 *  <tr>
 *      <td>ui-grid-col-2</td>
 *      <td>Defines the button column width as 50% of the screen.</td>
 *  </tr>
 *  <tr>
 *      <td>ui-grid-col-3</td>
 *      <td>Defines the button column width as 33% of the screen.</td>
 *  </tr>
 *  <tr>
 *      <td>ui-grid-row</td>
 *      <td>Arranges the buttons in a row.</td>
 *  </tr>
 * </table>
 *
 * To implement the button groups, use the following code:
 *
 * #### For columns:
 *
 *      @example
 *      <div class="ui-grid-col-3" style="height:76px">
 *          <button type="button" class="ui-btn">Button Circle</button>
 *          <a href="#" class="ui-btn ui-color-red" >A Button Circle</a>
 *          <input type="button" class="ui-btn ui-color-orange" value="Input Button Circle" />
 *      </div>
 *
 * #### For rows:
 *
 *      @example
 *      <div class="ui-grid-row">
 *          <button type="button" class="ui-btn">Button Circle</button>
 *          <a href="#" class="ui-btn ui-color-red" >A Button Circle</a>
 *          <input type="button" class="ui-btn ui-color-orange" value="Input Button Circle" />
 *      </div>
 *
 * @class ns.widget.wearable.Button
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,
				Button = function () {
				},
				prototype = new BaseWidget();

			/**
			 * Dictionary for button related events.
			 * For button, it is an empty object.
			 * @property {Object} events
			 * @member ns.widget.wearable.Button
			 * @static
			 */
			Button.events = {};

			/**
			 * Build Button
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.wearable.Button
			 */
			prototype._build = function (element) {
				return element;
			};

			prototype._init = function (element) {
				return element;
			};

			prototype._bindEvents = function (element) {
				return element;
			};

			/**
			 * Refresh structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.wearable.Button
			 */
			prototype._refresh = function () {
				return null;
			};

			/**
			 * Destroy widget
			 * @method _destroy
			 * @protected
			 * @member ns.widget.wearable.Button
			 */
			prototype._destroy = function () {
				return null;
			};

			Button.prototype = prototype;
			ns.widget.wearable.Button = Button;

			engine.defineWidget(
				"Button",
				".ui-btn",
				[],
				Button,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/*jslint nomen: true */
/**
 * # Check Box and Radio Box Widget
 * Shows a list of options where 1 or more can be selected.
 *
 * ## Default selectors
 *
 * You can use the check box and radio box widgets to create selectable list items:
 *
  * The check box widget shows on the screen a list of options where 1 or more can be selected. To add a check box widget to the application, use the following code:
 *
 *      @example
 *      <input type="checkbox" name="mycheck" id="check-test" checked="checked"/>
 *      <label for="check-test">Checkbox</label>
 *
 * The radio widget shows a list of options on the screen where only 1 option can be selected. To add a radio check box widget to the application, use the following code:
 *
 *      @example
 *      <input type="radio" name="radioset" id="radio-1" />
 *      <label for="radio-1">Radio</label>
 *
 * To add a check box or radio box to a list, use the following code:
 *
 *      @example
 *      <ul class="ui-listview">
 *          <li class="li-has-radio">
 *              <label>
 *                  Ringtones 1
 *                  <input type="radio"name="radioset" id="radio-1"checked="checked" />
 *              </label>
 *          </li>
 *          <li class="li-has-radio">
 *              <label>
 *                  Ringtones 2
 *                  <input type="radio"name="radioset" id="radio-2" />
 *              </label>
 *          </li>
 *      </ul>
 *
 * Use the following code in the *style.css* file of your application to support a wide label tap area:
 *
 *      @example
 *          .ui-listview li input[type="checkbox"],
 *          .ui-listview li input[type="radio"] {
 *              position: absolute;
 *              right: 8px;
 *              top: 0px;
 *              margin-top: 19px;
 *          }
 *          .ui-listview li.li-has-checkbox label,
 *          .ui-listview li.li-has-radio label {
 *              display: block;
 *              padding: 21px 64px 21px 16px;
 *              margin: -21px -16px -21px -16px;
 *          }
 *
 * ## JavaScript API
 *
 * Checkboxradio widget hasn't JavaScript API.
 * @class ns.widget.wearable.Checkboxradio
 */

// empty to ensure requirejs does not add anything own


/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Listview Widget
 * Shows a list view.
 *
 * The list widget is used to display, for example, navigation data, results, and data entries. The following table describes the supported list classes.
 *
 * ## Default selectors
 *
 * Default selector for listview widget is class *ui-listview*.
 *
 * To add a list widget to the application, use the following code:
 *
 * ### List with basic items
 *
 * You can add a basic list widget as follows:
 *
 *      @example
 *         <ul class="ui-listview">
 *             <li>1line</li>
 *             <li>2line</li>
 *             <li>3line</li>
 *             <li>4line</li>
 *             <li>5line</li>
 *         </ul>
 *
 * ### List with link items
 *
 * You can add a list widget with a link and press effect that allows the user to click each list item as follows:
 *
 *      @example
 *         <ul class="ui-listview">
 *             <li>
 *                 <a href="#">1line</a>
 *             </li>
 *             <li>
 *                 <a href="#">2line</a>
 *             </li>
 *             <li>
 *                 <a href="#">3line</a>
 *             </li>
 *             <li>
 *                 <a href="#">4line</a>
 *             </li>
 *             <li>
 *                 <a href="#">5line</a>
 *             </li>
 *         </ul>
 *
 * ## JavaScript API
 *
 * Listview widget hasn't JavaScript API.
 *
 * @class ns.widget.wearable.Listview
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,
				Listview = function () {
				},
				prototype = new BaseWidget();

			/**
			 * Dictionary for listview related events.
			 * For listview, it is an empty object.
			 * @property {Object} events
			 * @member ns.widget.wearable.Listview
			 * @static
			 */
			Listview.events = {};

			/**
			 * Build Listview
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.wearable.Listview
			 */
			prototype._build = function (element) {
				return element;
			};

			prototype._init = function (element) {
				return element;
			};

			prototype._bindEvents = function (element) {
				return element;
			};

			/**
			 * Refresh structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.wearable.Listview
			 */
			prototype._refresh = function () {
				return null;
			};

			/**
			 * Destroy widget
			 * @method _destroy
			 * @protected
			 * @member ns.widget.wearable.Listview
			 */
			prototype._destroy = function () {
				return null;
			};

			Listview.prototype = prototype;
			ns.widget.wearable.Listview = Listview;

			engine.defineWidget(
				"Listview",
				".ui-listview",
				[],
				Listview,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Page Widget
 * Page is main element of application's structure.
 *
 * ## Default selectors
 * In the Tizen Wearable Web UI framework the application page structure is based on a header, content and footer elements:
 *
 * - **The header** is placed at the top, and displays the page title and optionally buttons.
 * - **The content** is the section below the header, showing the main content of the page.
 * - **The footer** is abottom part of page which can display for example buttons
 *
 * The following table describes the specific information for each section.
 *
 * <table>
 *     <tr>
 *         <th>Section</th>
 *         <th>Class</th>
 *         <th>Mandatory</th>
 *         <th>Description</th>
 *     </tr>
 *     <tr>
 *         <td rowspan="2">Page</td>
 *         <td>ui-page</td>
 *         <td>Yes</td>
 *         <td>Defines the element as a page.
 *
 * The page widget is used to manage a single item in a page-based architecture.
 *
 * A page is composed of header (optional), content (mandatory), and footer (optional) elements.</td>
 *      </tr>
 *      <tr>
 *          <td>ui-page-active</td>
 *          <td>No</td>
 *          <td>If an application has a static start page, insert the ui-page-active class in the page element to speed up the application launch. The start page with the ui-page-active class can be displayed before the framework is fully loaded.
 *
 *If this class is not used, the framework inserts the class automatically to the first page of the application. However, this has a slowing effect on the application launch, because the page is displayed only after the framework is fully loaded.</td>
 *      </tr>
 *      <tr>
 *          <td>Header</td>
 *          <td>ui-header</td>
 *          <td>No</td>
 *          <td>Defines the element as a header.
 *
 * As the Tizen Wearable device screen size is small, avoid using the header element.</td>
 *      </tr>
 *      <tr>
 *          <td>Content</td>
 *          <td>ui-content</td>
 *          <td>Yes</td>
 *          <td>Defines the element as content.</td>
 *      </tr>
 *      <tr>
 *          <td>Footer</td>
 *          <td>ui-footer</td>
 *          <td>No</td>
 *          <td>Defines the element as a footer.
 *
 * The footer section is mostly used to include option buttons.</td>
 *      </tr>
 *  </table>
 *
 * All elements with class=ui-page will be become page widgets
 *
 *      @example
 *         <!--Page layout-->
 *         <div class="ui-page ui-page-active">
 *             <header class="ui-header"></header>
 *             <div class="ui-content"></div>
 *             <footer class="ui-footer"></footer>
 *         </div>
 *
 *         <!--Page layout with more button in header-->
 *         <div class="ui-page ui-page-active">
 *             <header class="ui-header ui-has-more">
 *                 <h2 class="ui-title">Call menu</h2>
 *                 <button type="button" class="ui-more ui-icon-overflow">More Options</button>
 *             </header>
 *             <div class="ui-content">Content message</div>
 *             <footer class="ui-footer">
 *                 <button type="button" class="ui-btn">Footer Button</button>
 *             </footer>
 *         </div>
 *
 * ## Manual constructor
 * For manual creation of page widget you can use constructor of widget from **tau** namespace:
 *
 *		@example
 *		var pageElement = document.getElementById("page"),
 *			page = tau.widget.page(buttonElement);
 *
 * Constructor has one require parameter **element** which are base **HTMLElement** to create widget. We recommend get this element by method *document.getElementById*.
 *
 * ## Multi-page Layout
 *
 * You can implement a template containing multiple page containers in the application index.html file.
 *
 * In the multi-page layout, the main page is defined with the ui-page-active class. If no page has the ui-page-active class, the framework automatically sets up the first page in the source order as the main page. You can improve the launch performance by explicitly defining the main page to be displayed first. If the application has to wait for the framework to set up the main page, the page is displayed with some delay only after the framework is fully loaded.
 *
 * You can link to internal pages by referring to the ID of the page. For example, to link to the page with an ID of two, the link element needs the href="#two" attribute in the code, as in the following example.
 *
 *      @example
 *         <!--Main page-->
 *         <div id="one" class="ui-page ui-page-active">
 *             <header class="ui-header"></header>
 *             <div class="ui-content"></div>
 *             <footer class="ui-footer"></footer>
 *         </div>
 *
 *         <!--Secondary page-->
 *         <div id="two" class="ui-page">
 *             <header class="ui-header"></header>
 *             <div class="ui-content"></div>
 *             <footer class="ui-footer"></footer>
 *         </div>
 *
 * To find the currently active page, use the ui-page-active class.
 *
 * ## Changing Pages
 * ### Go to page in JavaScript
 * To change page use method *tau.changePage*
 *
 *      @example
 *      tau.changePage("page-two");
 *
 * ### Back in JavaScript
 * To back to previous page use method *tau.back*
 *
 *      @example
 *      tau.back();
 *
 * ## Transitions
 *
 * When changing the active page, you can use a page transition.
 *
 * Tizen Wearable Web UI framework does not apply transitions by default. To set a custom transition effect, you must add the data-transition attribute to a link:
 *
 *      @example
 *      <a href="index.html" data-transition="slideup">I'll slide up</a>
 *
 * To set a default custom transition effect for all pages, use the pageTransition property:
 *
 *      @example
 *      tau.defaults.pageTransition = "slideup";
 *
 * ### Transitions list
 *
 *  - **none** no transition.
 *  - **slideup** Makes the content of the next page slide up, appearing to conceal the content of the previous page.
 *
 * ## Handling Page Events
 *
 * With page widget we have connected many of events.
 *
 * To handle page events, use the following code:
 *
 *      @example
 *        <div id="page" class="ui-page">
 *             <header class="ui-header"></header>
 *             <div class="ui-content"></div>
 *         </div>
 *
 *         <script>
 *             var page = document.getElementById("page");
 *             page.addEventListener("Event", function(event) {
 *                 // Your code
 *             });
 *         </script>
 *
 * To bind an event callback on the Back key, use the following code:
 *
 * Full list of available events is in [events list section](#events-list).
 *
 * To bind an event callback on the Back key, use the following code:
 *
 *      @example
 *         <script>
 *             window.addEventListener("tizenhwkey", function (event) {
 *                 if (event.keyName == "back") {
 *                     // Call window.history.back() to go to previous browser window
 *                     // Call tizen.application.getCurrentApplication().exit() to exit application
 *                     // Add script to add another behavior
 *                 }
 *             });
 *         </script>
 *
 * ## Options for Page Widget
 *
 * Page widget hasn't any options.
 *
 * ## Methods
 *
 * To call method on widget you can use tau API:
 *
 *		@example
 *		var pageElement = document.getElementById("page"),
 *			page = tau.widget.page(buttonElement);
 *
 *		page.methodName(methodArgument1, methodArgument2, ...);
 *
 * @class ns.widget.wearable.Page
 * @extends ns.widget.BaseWidget
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Damian Osipiuk <d.osipiuk@samsung.com>
 */
(function (document, ns) {
	
				/**
			 * Alias for {@link ns.widget.BaseWidget}
			 * @property {Object} BaseWidget
			 * @member ns.widget.wearable.Page
			 * @private
			 * @static
			 */
			var BaseWidget = ns.widget.BaseWidget,
				/**
				 * Alias for {@link ns.util}
				 * @property {Object} util
				 * @member ns.widget.wearable.Page
				 * @private
				 * @static
				 */
				util = ns.util,
				/**
				 * Alias for {@link ns.util.DOM}
				 * @property {Object} doms
				 * @member ns.widget.wearable.Page
				 * @private
				 * @static
				 */
				doms = util.DOM,
				/**
				 * Alias for {@link ns.engine}
				 * @property {Object} engine
				 * @member ns.widget.wearable.Page
				 * @private
				 * @static
				 */
				engine = ns.engine,

				Page = function () {
					var self = this;
					/**
					 * Callback on resize
					 * @property {?Function} contentFillAfterResizeCallback
					 * @private
					 * @member ns.widget.wearable.Page
					 */
					self.contentFillAfterResizeCallback = null;
					/**
					 * Options for widget.
					 * It is empty object, because widget Page does not have any options.
					 * @property {Object} options
					 * @member ns.widget.wearable.Page
					 */
					self.options = {};
				},
				/**
				 * Dictionary for page related event types
				 * @property {Object} EventType
				 * @member ns.widget.wearable.Page
				 * @static
				 */
				EventType = {
					/**
					 * Triggered on the page we are transitioning to,
					 * after the transition animation has completed.
					 * @event pageshow
					 * @member ns.widget.wearable.Page
					 */
					SHOW: "pageshow",
					/**
					 * Triggered on the page we are transitioning away from,
					 * after the transition animation has completed.
					 * @event pagehide
					 * @member ns.widget.wearable.Page
					 */
					HIDE: "pagehide",
					/**
					 * Triggered when the page has been created in the DOM
					 * (for example, through Ajax) but before all widgets
					 * have had an opportunity to enhance the contained markup.
					 * @event pagecreate
					 * @member ns.widget.wearable.Page
					 */
					CREATE: "pagecreate",
					/**
					 * Triggered when the page is being initialized,
					 * before most plugin auto-initialization occurs.
					 * @event pagebeforecreate
					 * @member ns.widget.wearable.Page
					 */
					BEFORE_CREATE: "pagebeforecreate",
					/**
					 * Triggered on the page we are transitioning to,
					 * before the actual transition animation is kicked off.
					 * @event pagebeforeshow
					 * @member ns.widget.wearable.Page
					 */
					BEFORE_SHOW: "pagebeforeshow",
					/**
					 * Triggered on the page we are transitioning away from,
					 * before the actual transition animation is kicked off.
					 * @event pagebeforehide
					 * @member ns.widget.wearable.Page
					 */
					BEFORE_HIDE: "pagebeforehide"
				},
				/**
				 * Dictionary for page related css class names
				 * @property {Object} classes
				 * @member ns.widget.wearable.Page
				 * @static
				 * @readonly
				 */
				classes = {
					uiPage: "ui-page",
					uiPageActive: "ui-page-active",
					uiSection: "ui-section",
					uiHeader: "ui-header",
					uiFooter: "ui-footer",
					uiContent: "ui-content",
					uiPageScroll: "ui-page-scroll"
				},
				prototype = new BaseWidget();

			Page.classes = classes;
			Page.events = EventType;

			/**
			 * Sets top-bottom css attributes for content element
			 * to allow it to fill the page dynamically
			 * @method _contentFill
			 * @member ns.widget.wearable.Page
			 */
			prototype._contentFill = function () {
				var self = this,
					element = self.element,
					screenWidth = window.innerWidth,
					screenHeight = window.innerHeight,
					contentSelector = classes.uiContent,
					headerSelector = classes.uiHeader,
					footerSelector = classes.uiFooter,
					extraHeight = 0,
					children = [].slice.call(element.children),
					childrenLength = children.length,
					elementStyle = element.style,
					i,
					node,
					contentStyle,
					marginTop,
					marginBottom,
					nodeStyle;

				elementStyle.width = screenWidth + "px";
				elementStyle.height = screenHeight + "px";

				for (i = 0; i < childrenLength; i++) {
					node = children[i];
					if (node.classList.contains(headerSelector) ||
								node.classList.contains(footerSelector)) {
						extraHeight += doms.getElementHeight(node);
					}
				}
				for (i = 0; i < childrenLength; i++) {
					node = children[i];
					nodeStyle = node.style;
					if (node.classList.contains(contentSelector)) {
						contentStyle = window.getComputedStyle(node);
						marginTop = parseFloat(contentStyle.marginTop);
						marginBottom = parseFloat(contentStyle.marginBottom);
						nodeStyle.height = (screenHeight - extraHeight - marginTop - marginBottom) + "px";
						nodeStyle.width = screenWidth + "px";
					}
				}
			};

			/**
			 * Build page
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.wearable.Page
			 */
			prototype._build = function (element) {
				element.classList.add(classes.uiPage);
				return element;
			};

			/**
			 * This method sets page active or inactive.
			 * It sets ui-overlay-... class on `body` depending on current theme.
			 * @method setActive
			 * @param {boolean} value If true, then page will be active.
			 * Otherwise, page will be inactive.
			 * @member ns.widget.wearable.Page
			 */
			prototype.setActive = function (value) {
				var elementClassList = this.element.classList;
				if (value) {
					elementClassList.add(classes.uiPageActive);
				} else {
					elementClassList.remove(classes.uiPageActive);
				}
			};

			/**
			 * Return current status of page.
			 * @method isActive
			 * @member ns.widget.wearable.Page
			 * @instance
			 */
			prototype.isActive = function () {
				return this.element.classList.contains(classes.uiPageActive);
			};

			/**
			 * Bind events to widget
			 * @method _bindEvents
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.wearable.Page
			 */
			prototype._bindEvents = function (element) {
				var self = this;
				self.contentFillAfterResizeCallback = self._contentFill.bind(self);
				window.addEventListener("resize", self.contentFillAfterResizeCallback, false);
			};

			/**
			 * Refresh widget structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.wearable.Page
			 */
			prototype._refresh = function () {
				this._contentFill();
			};

			/**
			 * Layouting page structure
			 * @method layout
			 * @member ns.widget.wearable.Page
			 */
			prototype.layout = function () {
				this._contentFill();
			};

			/**
			 * This method triggers BEFORE_SHOW event.
			 * @method onBeforeShow
			 * @member ns.widget.wearable.Page
			 */
			prototype.onBeforeShow = function () {
				this.trigger(EventType.BEFORE_SHOW);
			};

			/**
			 * This method triggers SHOW event.
			 * @method onShow
			 * @member ns.widget.wearable.Page
			 */
			prototype.onShow = function () {
				this.trigger(EventType.SHOW);
			};

			/**
			 * This method triggers BEFORE_HIDE event.
			 * @method onBeforeHide
			 * @member ns.widget.wearable.Page
			 */
			prototype.onBeforeHide = function () {
				this.trigger(EventType.BEFORE_HIDE);
			};

			/**
			 * This method triggers HIDE event.
			 * @method onHide
			 * @member ns.widget.wearable.Page
			 */
			prototype.onHide = function () {
				this.trigger(EventType.HIDE);
			};

			/**
			 * Destroy widget
			 * @method _destroy
			 * @protected
			 * @member ns.widget.wearable.Page
			 */
			prototype._destroy = function () {
				var self = this,
					element = self.element;

				element = element || self.element;
				
				window.removeEventListener("resize", self.contentFillAfterResizeCallback, false);

				// destroy widgets on children
				engine.destroyAllWidgets(element, true);
			};

			Page.prototype = prototype;

			// definition
			ns.widget.wearable.Page = Page;
			engine.defineWidget(
				"page",
				"[data-role=page],.ui-page",
				["onBeforeShow", "onShow", "onBeforeHide", "onHide", "setActive", "layout"],
				Page,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * # PageContainer Widget
 * PageContainer is a widget, which is supposed to have multiple child pages but display only one at a time.
 *
 * It allows for adding new pages, switching between them and displaying progress bars indicating loading process.
 *
 * @class ns.widget.wearable.PageContainer
 * @extends ns.widget.BaseWidget
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Krzysztof Głodowski <k.glodowski@samsung.com>
 */
(function (document, ns) {
	
				var BaseWidget = ns.widget.BaseWidget,
				Page = ns.widget.wearable.Page,
				util = ns.util,
				eventUtils = ns.event,
				DOM = util.DOM,
				engine = ns.engine,
				classes = {
					uiViewportTransitioning: "ui-viewport-transitioning",
					out: "out",
					in: "in",
					uiPreIn: "ui-pre-in",
					uiBuild: "ui-page-build"
				},
				PageContainer = function () {
					/**
					 * Active page.
					 * @property {ns.widget.wearable.Page} [activePage]
					 * @member ns.widget.wearable.PageContainer
					 */
					this.activePage = null;
				},
				EventType = {
					/**
					 * Triggered after the changePage() request
					 * has finished loading the page into the DOM and
					 * all page transition animations have completed.
					 * @event pagechange
					 * @member ns.widget.wearable.PageContainer
					 */
					PAGE_CHANGE: "pagechange"
				},
				animationend = "animationend",
				webkitAnimationEnd = "webkitAnimationEnd",
				prototype = new BaseWidget();

			/**
			 * Dictionary for PageContainer related event types.
			 * @property {Object} events
			 * @property {string} [events.PAGE_CHANGE="pagechange"]
			 * @member ns.router.route.popup
			 * @static
			 */
			PageContainer.events = EventType;

			/**
			 * Dictionary for PageContainer related css class names
			 * @property {Object} classes
			 * @member ns.widget.wearable.Page
			 * @static
			 * @readonly
			 */
			PageContainer.classes = classes;

			/**
			 * This method changes active page to specified element.
			 * @method change
			 * @param {HTMLElement} toPage The element to set
			 * @param {Object} [options] Additional options for the transition
			 * @param {string} [options.transition=none] Specifies the type of transition
			 * @param {boolean} [options.reverse=false] Specifies the direction of transition
			 * @member ns.widget.wearable.PageContainer
			 */
			prototype.change = function (toPage, options) {
				var self = this,
					fromPageWidget = self.getActivePage(),
					toPageWidget;

				options = options || {};

				// The change should be made only if no active page exists
				// or active page is changed to another one.
				if (!fromPageWidget || (fromPageWidget.element !== toPage)) {
					if (toPage.parentNode !== self.element) {
						toPage = self._include(toPage);
					}

					toPage.classList.add(classes.uiBuild);

					toPageWidget = engine.instanceWidget(toPage, "page");

					// set sizes of page for correct display
					toPageWidget.layout();

					if (ns.getConfig("autoBuildOnPageChange", false)) {
						engine.createWidgets(toPage);
					}

					if (fromPageWidget) {
						fromPageWidget.onBeforeHide();
					}
					toPageWidget.onBeforeShow();

					toPage.classList.remove(classes.uiBuild);

					options.deferred = {
						resolve: function () {
							if (fromPageWidget) {
								fromPageWidget.onHide();
								self._removeExternalPage(fromPageWidget, options);
							}
							toPageWidget.onShow();
							self.trigger(EventType.PAGE_CHANGE);
						}
					};
					self._transition(toPageWidget, fromPageWidget, options);
				}
			};

			/**
			 * This method performs transition between the old and a new page.
			 * @method _transition
			 * @param {ns.widget.wearable.Page} toPageWidget The new page
			 * @param {ns.widget.wearable.Page} fromPageWidget The page to be replaced
			 * @param {Object} [options] Additional options for the transition
			 * @param {string} [options.transition=none] The type of transition
			 * @param {boolean} [options.reverse=false] Specifies transition direction
			 * @param {Object} [options.deferred] Deferred object
			 * @member ns.widget.wearable.PageContainer
			 * @protected
			 */
			prototype._transition = function (toPageWidget, fromPageWidget, options) {
				var self = this,
					element = self.element,
					elementClassList = element.classList,
					transition = !fromPageWidget || !options.transition ? "none" : options.transition,
					deferred = options.deferred,
					reverse = "reverse",
					clearClasses = [classes.in, classes.out, classes.uiPreIn, transition],
					oldDeferredResolve,
					classlist,
					classParam,
					oneEvent;

				if (options.reverse) {
					clearClasses.push(reverse);
				}
				elementClassList.add(classes.uiViewportTransitioning);
				oldDeferredResolve = deferred.resolve;
				deferred.resolve = function () {
					var fromPageWidgetClassList = fromPageWidget && fromPageWidget.element.classList,
						toPageWidgetClassList = toPageWidget.element.classList;
					elementClassList.remove(classes.uiViewportTransitioning);
					toPageWidgetClassList.remove.apply(toPageWidgetClassList, clearClasses);
					if (fromPageWidgetClassList) {
						fromPageWidgetClassList.remove.apply(fromPageWidgetClassList, clearClasses);
					}
					self._setActivePage(toPageWidget);
					oldDeferredResolve();
				};

				if (transition !== "none") {
					oneEvent = function () {
						eventUtils.off(toPageWidget.element, [animationend, webkitAnimationEnd], oneEvent, false);
						deferred.resolve();
					};
					eventUtils.one(toPageWidget.element, [animationend, webkitAnimationEnd], oneEvent, false);

					if (fromPageWidget) {
						classParam = [];
						classParam.push(transition, classes.out);
						if (options.reverse) {
							classParam.push(reverse);
						}
						classlist = fromPageWidget.element.classList;
						classlist.add.apply(classlist ,classParam);
					}

					classlist = toPageWidget.element.classList;
					classParam = [];
					classParam.push(transition, classes.in, classes.uiPreIn);
					if (options.reverse) {
						classParam.push(reverse);
					}
					classlist.add.apply(classlist, classParam);
				} else {
					window.setTimeout(deferred.resolve, 0);
				}
			};
			/**
			 * This method adds an element as a page.
			 * @method _include
			 * @param {HTMLElement} page an element to add
			 * @member ns.widget.wearable.PageContainer
			 * @return {HTMLElement}
			 * @protected
			 */
			prototype._include = function (page) {
				var element = this.element;
				if (page.parentNode !== element) {
					page = util.importEvaluateAndAppendElement(page, element);
				}
				return page;
			};
			/**
			 * This method sets currently active page.
			 * @method _setActivePage
			 * @param {ns.widget.wearable.Page} page a widget to set as the active page
			 * @member ns.widget.wearable.PageContainer
			 * @protected
			 */
			prototype._setActivePage = function (page) {
				var self = this;
				if (self.activePage) {
					self.activePage.setActive(false);
				}
				self.activePage = page;
				page.setActive(true);
			};
			/**
			 * This method returns active page widget.
			 * @method getActivePage
			 * @member ns.widget.wearable.PageContainer
			 * @return {ns.widget.wearable.Page} Currently active page
			 */
			prototype.getActivePage = function () {
				return this.activePage;
			};

			/**
			 * This method displays a progress bar indicating loading process.
			 * @method showLoading
			 * @member ns.widget.wearable.PageContainer
			 * @return {null}
			 */
			prototype.showLoading = function () {
								return null;
			};
			/**
			 * This method hides any active progress bar.
			 * @method hideLoading
			 * @member ns.widget.wearable.PageContainer
			 * @return {null}
			 */
			prototype.hideLoading = function () {
								return null;
			};
			/**
			 * This method removes page element from the given widget and destroys it.
			 * @method _removeExternalPage
			 * @param {ns.widget.wearable.Page} fromPageWidget the widget to destroy
			 * @param {Object} [options] transition options
			 * @param {boolean} [options.reverse=false] specifies transition direction
			 * @member ns.widget.wearable.PageContainer
			 * @protected
			 */
			prototype._removeExternalPage = function ( fromPageWidget, options) {
				var fromPage = fromPageWidget.element;
				options = options || {};
				if (options.reverse && DOM.hasNSData(fromPage, "external")) {
					fromPageWidget.destroy();
					if (fromPage.parentNode) {
						fromPage.parentNode.removeChild(fromPage);
					}
				}
			};

			PageContainer.prototype = prototype;

			// definition
			ns.widget.wearable.PageContainer = PageContainer;

			engine.defineWidget(
				"pagecontainer",
				"",
				["change", "getActivePage", "showLoading", "hideLoading"],
				PageContainer,
				"wearable"
			);
			}(window.document, ns));

/*global CustomEvent, define, window, ns */
/*jslint plusplus: true, nomen: true, bitwise: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Virtual Mouse Events
 * Reimplementation of jQuery Mobile virtual mouse events.
 *
 * ##Purpose
 * It will let for users to register callbacks to the standard events like bellow,
 * without knowing if device support touch or mouse events
 * @class ns.event.vmouse
 */
/**
 * Triggered after mouse-down or touch-started.
 * @event vmousedown
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-click or touch-end when touch-move didn't occur
 * @event vclick
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-up or touch-end
 * @event vmouseup
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-move or touch-move
 * @event vmousemove
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-over or touch-start if went over coordinates
 * @event vmouseover
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-out or touch-end
 * @event vmouseout
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-cancel or touch-cancel and when scroll occur during touchmove
 * @event vmousecancel
 * @member ns.event.vmouse
 */
(function (window, document, ns) {
	
					/**
				 * Object with default options
				 * @property {Object} vmouse
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
			var vmouse,
				/**
				 * @property {Object} eventProps Contains the properties which are copied from the original event to custom v-events
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
				eventProps,
				/**
				 * Indicates if the browser support touch events
				 * @property {boolean} touchSupport
				 * @member ns.event.vmouse
				 * @static
				 **/
				touchSupport = window.hasOwnProperty("ontouchstart"),
				/**
				 * @property {boolean} didScroll The flag tell us if the scroll event was triggered
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
				didScroll,
				/**
				 * @property {Number} [startX=0] Initial data for touchstart event
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
				startX = 0,
				/**
				 * @property {Number} [startY=0] Initial data for touchstart event
				 * @member ns.event.vmouse
				 * @private
				 * @static
				**/
				startY = 0,
				touchEventProps = ["clientX", "clientY", "pageX", "pageY", "screenX", "screenY"],
				KEY_CODES = {
					enter: 13
				};

			/**
			 * Extends objects with other objects
			 * @method copyProps
			 * @param {Object} from Sets the original event
			 * @param {Object} to Sets the new event
			 * @param {Object} properties Sets the special properties for position
			 * @param {Object} propertiesNames Describe parameters which will be copied from Original to To event
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function copyProps(from, to, properties, propertiesNames) {
				var i,
					length,
					descriptor,
					property;

				for (i = 0, length = propertiesNames.length; i < length; ++i) {
					property = propertiesNames[i];
					if (isNaN(properties[property]) === false || isNaN(from[property]) === false) {
						descriptor = Object.getOwnPropertyDescriptor(to, property);
						if (!descriptor || descriptor.writable) {
							to[property] = properties[property] || from[property];
						}
					}
				}
			}

			/**
			 * Create custom event
			 * @method createEvent
			 * @param {string} newType gives a name for the new Type of event
			 * @param {Event} original Event which trigger the new event
			 * @param {Object} properties Sets the special properties for position
			 * @return {Event}
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function createEvent(newType, original, properties) {
				var evt = new CustomEvent(newType, {
						"bubbles": original.bubbles,
						"cancelable": original.cancelable,
						"detail": original.detail
					}),
					orginalType = original.type,
					changeTouches,
					touch,
					j = 0,
					len,
					prop;

				copyProps(original, evt, properties, eventProps);
				evt._originalEvent = original;

				if (orginalType.indexOf("touch") !== -1) {
					orginalType = original.touches;
					changeTouches = original.changedTouches;

					if (orginalType && orginalType.length) {
						touch = orginalType[0];
					} else {
						touch = (changeTouches && changeTouches.length) ? changeTouches[0] : null;
					}

					if (touch) {
						for (len = touchEventProps.length; j < len; j++) {
							prop = touchEventProps[j];
							evt[prop] = touch[prop];
						}
					}
				}

				return evt;
			}

			/**
			 * Dispatch Events
			 * @method fireEvent
			 * @param {string} eventName event name
			 * @param {Event} evt original event
			 * @param {Object} properties Sets the special properties for position
			 * @return {boolean}
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function fireEvent(eventName, evt, properties) {
				return evt.target.dispatchEvent(createEvent(eventName, evt, properties || {}));
			}

			eventProps = [
				"currentTarget",
				"detail",
				"button",
				"buttons",
				"clientX",
				"clientY",
				"offsetX",
				"offsetY",
				"pageX",
				"pageY",
				"screenX",
				"screenY",
				"toElement",
				"which"
			];

			vmouse = {
				/**
				 * Sets the distance of pixels after which the scroll event will be successful
				 * @property {number} [eventDistanceThreshold=10]
				 * @member ns.event.vmouse
				 * @static
				 */
				eventDistanceThreshold: 10,

				touchSupport: touchSupport
			};

			/**
			 * Handle click down
			 * @method handleDown
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleDown(evt) {
				fireEvent("vmousedown", evt);
			}

			/**
			 * Prepare position of event for keyboard events.
			 * @method preparePositionForClick
			 * @param {Event} event
			 * @return {?Object} options
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function preparePositionForClick(event) {
				var x = event.clientX,
					y = event.clientY;
				// event comes from keyboard
				if (!x && !y) {
					return preparePositionForEvent(event);
				}
			}

			/**
			 * Handle click
			 * @method handleClick
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleClick(evt) {
				fireEvent("vclick", evt, preparePositionForClick(evt));
			}

			/**
			 * Handle click up
			 * @method handleUp
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleUp(evt) {
				fireEvent("vmouseup", evt);
			}

			/**
			 * Handle click move
			 * @method handleMove
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleMove(evt) {
				fireEvent("vmousemove", evt);
			}

			/**
			 * Handle click over
			 * @method handleOver
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleOver(evt) {
				fireEvent("vmouseover", evt);
			}

			/**
			 * Handle click out
			 * @method handleOut
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleOut(evt) {
				fireEvent("vmouseout", evt);
			}

			/**
			 * Handle touch start
			 * @method handleTouchStart
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchStart(evt) {
				var touches = evt.touches,
					firstTouch;
				//if touches are registered and we have only one touch
				if (touches && touches.length === 1) {
					didScroll = false;
					firstTouch = touches[0];
					startX = firstTouch.pageX;
					startY = firstTouch.pageY;
					fireEvent("vmouseover", evt);
					fireEvent("vmousedown", evt);
				}

			}

			/**
			 * Handle touch end
			 * @method handleTouchEnd
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchEnd(evt) {
				var touches = evt.touches;
				if (touches && touches.length === 0) {
					fireEvent("vmouseup", evt);
					fireEvent("vmouseout", evt);
				}
			}

			/**
			 * Handle touch move
			 * @method handleTouchMove
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchMove(evt) {
				var over,
					firstTouch = evt.touches && evt.touches[0],
					didCancel = didScroll,
					//sets the threshold, based on which we consider if it was the touch-move event
					moveThreshold = vmouse.eventDistanceThreshold;

				/**
				 * Ignore the touch which has identifier other than 0.
				 * Only first touch has control others are ignored.
				 * Patch for webkit behaviour where touchmove event
				 * is triggered between touchend events
				 * if there is multi touch.
				 */
				if (firstTouch.identifier > 0) {
					evt.preventDefault();
					evt.stopPropagation();
					return;
				}

				didScroll = didScroll ||
				//check in both axes X,Y if the touch-move event occur
					(Math.abs(firstTouch.pageX - startX) > moveThreshold ||
					Math.abs(firstTouch.pageY - startY) > moveThreshold);

				// detect over event
				// for compatibility with mouseover because "touchenter" fires only once
				over = document.elementFromPoint(evt.pageX, evt.pageY);
				if (over) {
					fireEvent("_touchover", evt);
				}

				//if didscroll occur and wasn't canceled then trigger touchend otherwise just touchmove
				if (didScroll && !didCancel) {
					fireEvent("vmousecancel", evt);
				}
				fireEvent("vmousemove", evt);
			}

			/**
			 * Handle Scroll
			 * @method handleScroll
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleScroll(evt) {
				if (!didScroll) {
					fireEvent("vmousecancel", evt);
				}
				didScroll = true;
			}

			/**
			 * Handle touch cancel
			 * @method handleTouchCancel
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchCancel(evt) {
				fireEvent("vmousecancel", evt);
			}

			/**
			 * Handle touch cancel
			 * @method handleTouchOver
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchOver() {
				return false;
				// @TODO add callback with handleTouchOver,
			}

			/**
			 * Prepare position of event for keyboard events.
			 * @method preparePositionForEvent
			 * @param {Event} event
			 * @return {Object} properties
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function preparePositionForEvent(event) {
				var targetRect = event.target && event.target.getBoundingClientRect(),
					properties = {};
				if (targetRect) {
					properties = {
						"clientX": targetRect.left + targetRect.width / 2,
						"clientY": targetRect.top + targetRect.height / 2,
						"which": 1
					};
				}
				return properties;
			}

			/**
			 * Handle key up
			 * @method handleKeyUp
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleKeyUp(event) {
				var properties;
				if (event.keyCode === KEY_CODES.enter) {
					properties = preparePositionForEvent(event);
					fireEvent("vmouseup", event, properties);
					fireEvent("vclick", event, properties);
				}
			}

			/**
			 * Handle key down
			 * @method handleKeyDown
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleKeyDown(event) {
				if (event.keyCode === KEY_CODES.enter) {
					fireEvent("vmousedown", event, preparePositionForEvent(event));
				}
			}

			// @TODO delete touchSupport flag and attach touch and mouse listeners,
			// @TODO check if v-events are not duplicated if so then called only once

			/**
			 * Binds touch events to support virtual mouse.
			 * @method bindTouch
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.bindTouch = function () {
				document.addEventListener("touchstart", handleTouchStart, true);
				document.addEventListener("touchend", handleTouchEnd, true);
				document.addEventListener("touchmove", handleTouchMove, true);

				// @TODO add callback with handleTouchOver,
				document.addEventListener("touchenter", handleTouchOver, true);
				// for compatibility with mouseover because "touchenter" fires only once
				// @TODO add callback with handleTouchOver,
				document.addEventListener("_touchover", handleTouchOver, true);
				// document.addEventListener("touchleave", callbacks.out, true);
				document.addEventListener("touchcancel", handleTouchCancel, true);

				document.addEventListener("click", handleClick, true);
			};

			/**
			 * Binds mouse events to support virtual mouse.
			 * @method bindMouse
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.bindMouse = function () {
				document.addEventListener("mousedown", handleDown, true);

				document.addEventListener("mouseup", handleUp, true);
				document.addEventListener("mousemove", handleMove, true);
				document.addEventListener("mouseover", handleOver, true);
				document.addEventListener("mouseout", handleOut, true);

				document.addEventListener("keyup", handleKeyUp, true);
				document.addEventListener("keydown", handleKeyDown, true);
				document.addEventListener("scroll", handleScroll, true);
				document.addEventListener("click", handleClick, true);
			};

			ns.event.vmouse = vmouse;

			if (touchSupport) {
				vmouse.bindTouch();
			} else {
				vmouse.bindMouse();
			}

			}(window, window.document, ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, ns) {
	
				/** @namespace ns.widget.wearable */
			ns.widget.wearable.indexscrollbar = ns.widget.wearable.indexscrollbar || {};
			}(window, ns));

/*global define, ns, document, window */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #IndexBar widget
 * Widget creates bar with index.
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @class ns.widget.wearable.indexscrollbar.IndexBar
 */
(function (document, ns) {
	
				var utilsObject = ns.util.object,
				utilsDOM = ns.util.DOM;

			function IndexBar(element, options) {
				this.element = element;
				this.options = utilsObject.merge(options, this._options, false);
				this.container = this.options.container;

				this.indices = {
					original: this.options.index,
					merged: []
				};

				this._init();

				return this;
			}
			IndexBar.prototype = {
				_options: {
					container: null,
					offsetLeft: 0,
					index: [],
					verticalCenter: false,
					moreChar: "*",
					indexHeight: 41,
					selectedClass: "ui-state-selected",
					ulClass: null,
					maxIndexLen : 0
				},
				_init: function() {
					this.indices.original = this.options.index;
					this.indexLookupTable = [];
					this.indexElements = null;
					this.selectedIndex = -1;
					this.visiblity = "hidden";

					this._setMaxIndexLen();
					this._makeMergedIndices();
					this._drawDOM();
					this._appendToContainer();
					if(this.options.verticalCenter) {
						this._adjustVerticalCenter();
					}
					this._setIndexCellInfo();
				},

				_clear: function() {
					while(this.element.firstChild) {
						this.element.removeChild(this.element.firstChild);
					}

					this.indices.merged.length = 0;
					this.indexLookupTable.length = 0;
					this.indexElements = null;
					this.selectedIndex = -1;
					this.visiblity = null;
				},

				/**
				 * Refreshes widget.
				 * @method refresh
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				refresh: function() {
					this._clear();
					this._init();
				},

				/**
				 * Destroys widget.
				 * @method destroy
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				destroy: function() {
					this._clear();
				},

				/**
				 * Shows widget.
				 * @method show
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				show: function() {
					this.visibility = "visible";
					this.element.style.visibility = this.visibility;
				},

				/**
				 * Hides widget.
				 * @method hide
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				hide: function() {
					this.visibility = "hidden";
					this.element.style.visibility = this.visibility;
				},

				/**
				 * Get if the visibility status is shown or not
				 * @method isShown
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				isShown: function() {
					return "visible" === this.visibility;
				},

				_setMaxIndexLen: function() {
					var maxIndexLen,
						containerHeight = this.container.offsetHeight;
					maxIndexLen = Math.floor( containerHeight / this.options.indexHeight );
					if(maxIndexLen > 0 && maxIndexLen%2 === 0) {
						maxIndexLen -= 1;	// Ensure odd number
					}
					this.options.maxIndexLen = this.options.maxIndexLen > 0 ? Math.min(maxIndexLen, this.options.maxIndexLen) : maxIndexLen;
				},

				_makeMergedIndices: function() {
					var origIndices = this.indices.original,
						origIndexLen = origIndices.length,
						visibleIndexLen = Math.min(this.options.maxIndexLen, origIndexLen),
						totalLeft = origIndexLen - visibleIndexLen,
						nIndexPerItem = parseInt(totalLeft / parseInt(visibleIndexLen/2, 10), 10),
						leftItems = totalLeft % parseInt(visibleIndexLen/2, 10),
						indexItemSize = [],
						mergedIndices = [],
						i, len, position=0;

					for(i = 0, len = visibleIndexLen; i < len; i++) {
						indexItemSize[i] = 1;
						if (i % 2) {	// even number: omitter
							indexItemSize[i] += nIndexPerItem + (leftItems-- > 0 ? 1 : 0);
						}
						position +=  indexItemSize[i];
						mergedIndices.push( {
							start: position-1,
							length: indexItemSize[i]
						});
					}
					this.indices.merged = mergedIndices;
				},

				_drawDOM: function() {
					var origIndices = this.indices.original,
						indices = this.indices.merged,
						indexLen = indices.length,
					//container = this.container,
					//containerHeight = container.offsetHeight,
						indexHeight = this.options.indexHeight,
					//maxIndexLen = Math.min(this.maxIndexLen, indices.length),
						moreChar = this.options.moreChar,
						addMoreCharLineHeight = 9,
						text,
						frag,
						li,
						i,
						m;

					frag = document.createDocumentFragment();
					for(i=0; i < indexLen; i++) {
						m = indices[i];
						text = m.length === 1 ? origIndices[m.start] : moreChar;
						li = document.createElement("li");
						li.innerText = text.toUpperCase();
						li.style.height = indexHeight + "px";
						li.style.lineHeight = text === moreChar ? indexHeight + addMoreCharLineHeight + "px" : indexHeight + "px";
						frag.appendChild(li);
					}
					this.element.appendChild(frag);

					if(this.options.ulClass) {
						this.element.classList.add( this.options.ulClass );
					}
				},

				_adjustVerticalCenter: function() {
					var nItem = this.indices.merged.length,
						totalIndexLen = nItem * this.options.indexHeight,
						vPadding = parseInt((this.container.offsetHeight - totalIndexLen) / 2, 10);
					this.element.style.paddingTop = vPadding + "px";
				},

				_appendToContainer: function() {
					this.container.appendChild(this.element);
					this.element.style.left = this.options.offsetLeft + "px";
				},

				/**
				 * Sets padding top for element.
				 * @method setPaddingTop
				 * @param {number} paddingTop
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				setPaddingTop: function(paddingTop) {
					var height = this.element.clientHeight,
						oldPaddingTop = this.element.style.paddingTop,
						containerHeight = this.container.clientHeight;

					if(oldPaddingTop === "") {
						oldPaddingTop = 0;
					} else {
						oldPaddingTop = parseInt(oldPaddingTop, 10);
					}

					height = height - oldPaddingTop;

					if(height > containerHeight) {
						paddingTop -= (paddingTop + height - containerHeight);
					}
					this.element.style.paddingTop = paddingTop + "px";

					this._setIndexCellInfo();	// update index cell info
				},

				/**
				 * Returns element's offsetTop of given index.
				 * @method getOffsetTopByIndex
				 * @param {number} index
				 * @return {number}
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				getOffsetTopByIndex: function(index) {
					var cellIndex = this.indexLookupTable[index].cellIndex,
						el = this.indexElements[cellIndex],
						offsetTop = el.offsetTop;

					return offsetTop;
				},

				_setIndexCellInfo: function() {
					var element = this.element,
						mergedIndices = this.indices.merged,
						containerOffsetTop = utilsDOM.getElementOffset(this.container).top,
						listitems = this.element.querySelectorAll("LI"),
						lookupTable = [];

					[].forEach.call(listitems, function(node, idx) {
						var m = mergedIndices[idx],
							i = m.start,
							len = i + m.length,
							top = containerOffsetTop + node.offsetTop,
							height = node.offsetHeight / m.length;

						for ( ; i < len; i++ ) {
							lookupTable.push({
								cellIndex: idx,
								top: top,
								range: height
							});
							top += height;
						}
					});
					this.indexLookupTable = lookupTable;
					this.indexElements = element.children;
				},

				/**
				 * Returns index for given position.
				 * @method getIndexByPosition
				 * @param {number} posY
				 * @return {number}
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				getIndexByPosition: function(posY) {
					var table = this.indexLookupTable,
						info,
						i, len, range;

					// boundary check
					if( table[0] ) {
						info = table[0];
						if(posY < info.top) {
							return 0;
						}
					}
					if( table[table.length -1] ) {
						info = table[table.length -1];
						if(posY >= info.top + info.range) {
							return table.length - 1;
						}
					}
					for ( i=0, len=table.length; i < len; i++) {
						info = table[i];
						range = posY - info.top;
						if ( range >= 0 && range < info.range ) {
							return i;
						}
					}
					return 0;
				},

				/**
				 * Returns value for given index.
				 * @method getValueByIndex
				 * @param {number} idx
				 * @return {number}
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				getValueByIndex: function(idx) {
					if(idx < 0) { idx = 0; }
					return this.indices.original[idx];
				},

				/**
				 * Select given index
				 * @method select
				 * @param {number} idx
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				select: function(idx) {
					var cellIndex,
						eCell;

					this.clearSelected();

					if(this.selectedIndex === idx) {
						return;
					}
					this.selectedIndex = idx;

					cellIndex = this.indexLookupTable[idx].cellIndex;
					eCell = this.indexElements[cellIndex];
					eCell.classList.add(this.options.selectedClass);
				},

				/**
				 * Clears selected class.
				 * @method clearSelected
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				clearSelected: function() {
					var el = this.element,
						selectedClass = this.options.selectedClass,
						selectedElement = el.querySelectorAll("."+selectedClass);

					[].forEach.call(selectedElement, function(node) {
						node.classList.remove(selectedClass);
					});
					this.selectedIndex = -1;
				}
			};

			ns.widget.wearable.indexscrollbar.IndexBar = IndexBar;

			}(window.document, ns));

/*global define, ns, document, window */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #IndexIndicator widget
 * Class creates index indicator.
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @class ns.widget.wearable.indexscrollbar.IndexIndicator
 */
(function (document, ns) {
	
				var utilsObject = ns.util.object,
				events = ns.event;

			/**
			 * @brief block 'unexpected bouncing effect' on indexscroller indicator.
			 */
			function blockEvent (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			function IndexIndicator(element, options) {
				this.element = element;
				this.options = utilsObject.merge(options, this._options, false);
				this.value = null;

				this._init();

				return this;
			}

			IndexIndicator.prototype = {
				_options: {
					className: "ui-indexscrollbar-indicator",
					selectedClass: "ui-selected",
					container: null
				},
				_init: function() {
					var self = this,
						options = self.options,
						element = self.element;
					element.className = options.className;
					element.innerHTML = "<span></span>";
					events.on(element, ["touchstart", "touchmove"], blockEvent, false);


					// Add to DOM tree
					options.container.insertBefore(element, options.referenceElement);
					self.fitToContainer();
				},

				/**
				 * Fits size to container.
				 * @method fitToContainer
				 * @member ns.widget.wearable.indexscrollbar.IndexIndicator
				 */
				fitToContainer: function() {
					var element = this.element,
						container = this.options.container,
						containerPosition = window.getComputedStyle(container).position;

					element.style.width = container.offsetWidth + "px";
					element.style.height = container.offsetHeight + "px";

					if ( containerPosition !== "absolute" && containerPosition !== "relative" ) {
						element.style.top = container.offsetTop + "px";
						element.style.left = container.offsetLeft + "px";
					}
				},

				/**
				 * Sets value of widget.
				 * @method setValue
				 * @param {string} value
				 * @member ns.widget.wearable.indexscrollbar.IndexIndicator
				 */
				setValue: function( value ) {
					this.value = value;	// remember value
					value = value.toUpperCase();

					var selected = value.substr(value.length - 1),
						remained = value.substr(0, value.length - 1),
						inner = "<span>" + remained + "</span><span class=\"ui-selected\">" + selected + "</span>";
					this.element.firstChild.innerHTML = inner;	// Set indicator text
				},

				/**
				 * Shows widget.
				 * @method show
				 * @member ns.widget.wearable.indexscrollbar.IndexIndicator
				 */
				show: function() {
					//this.element.style.visibility="visible";
					this.element.style.display="block";
				},

				/**
				 * Hides widget.
				 * @method hide
				 * @member ns.widget.wearable.indexscrollbar.IndexIndicator
				 */
				hide: function() {
					this.element.style.display="none";
				},

				/**
				 * Destroys widget.
				 * @method destroy
				 * @member ns.widget.wearable.indexscrollbar.IndexIndicator
				 */
				destroy: function() {
					var element = this.element;

					while(element.firstChild) {
						element.removeChild(element.firstChild);
					}
					events.off(element, ["touchstart", "touchmove"], blockEvent, false);
					this.element = null;	// unreference element

				}
			};
			ns.widget.wearable.indexscrollbar.IndexIndicator = IndexIndicator;
			}(window.document, ns));

/*global define, ns, document, window */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #IndexScrollbar Widget
 * Shows an index scroll bar with indices, usually for the list.
 *
 * The index scroll bar widget shows on the screen a scrollbar with indices,
 * and fires a select event when the index characters are clicked.
 * The following table describes the supported index scroll bar APIs.
 *
 * ## Manual constructor
 * For manual creation of widget you can use constructor of widget from **tau** namespace:
 *
 *		@example
 *		var indexscrollbarElement = document.getElementById('indexscrollbar'),
 *			indexscrollbar = tau.widget.IndexScrollbar(IndexScrollbar, {index: "A,B,C"});
 *
 * Constructor has one require parameter **element** which are base **HTMLElement** to create widget.
 * We recommend get this element by method *document.getElementById*. Second parameter is **options**
 * and it is a object with options for widget.
 *
 * To add an IndexScrollbar widget to the application, use the following code:
 *
 *      @example
 *      <div id="foo" class="ui-indexscrollbar" data-index="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"></div>
 *      <script>
 *          (function() {
 *              var elem = document.getElementById("foo");
 *              tau.widget.IndexScrollbar(elem);
 *              elem.addEventListener("select", function( event ) {
 *                  var index = event.detail.index;
 *                  console.log(index);
 *              });
 *          }());
 *      </script>
 *
 * The index value can be retrieved by accessing event.detail.index property.
 *
 * In the following example, the list scrolls to the position of the list item defined using
 * the li-divider class, selected by the index scroll bar:
 *
 *      @example
 *         <div id="pageIndexScrollbar" class="ui-page">
 *             <header class="ui-header">
 *                 <h2 class="ui-title">IndexScrollbar</h2>
 *             </header>
 *             <section class="ui-content">
 *                 <div style="overflow-y:scroll;">
 *                     <div id="indexscrollbar1"
 *                          class="ui-indexscrollbar"
 *                          data-index="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z">
 *                     </div>
 *                     <ul class="ui-listview" id="list1">
 *                         <li class="li-divider">A</li>
 *                         <li>Anton</li>
 *                         <li>Arabella</li>
 *                         <li>Art</li>
 *                         <li class="li-divider">B</li>
 *                         <li>Barry</li>
 *                         <li>Bibi</li>
 *                         <li>Billy</li>
 *                         <li>Bob</li>
 *                         <li class="li-divider">D</li>
 *                         <li>Daisy</li>
 *                         <li>Derek</li>
 *                         <li>Desmond</li>
 *                     </ul>
 *                 </div>
 *             </section>
 *             <script>
 *                 (function () {
 *                     var page = document.getElementById("pageIndexScrollbar");
 *                     page.addEventListener("pagecreate", function () {
 *                         var elem = document.getElementById("indexscrollbar1"), // Index scroll bar element
 *                                 elList = document.getElementById("list1"), // List element
 *                                 elDividers = elList.getElementsByClassName("li-divider"), // List items (dividers)
 *                                 elScroller = elList.parentElement, // List's parent item (overflow-y:scroll)
 *                                 dividers = {}, // Collection of list dividers
 *                                 indices = [], // List of index
 *                                 elDivider,
 *                                 i, idx;
 *
 *                         // For all list dividers
 *                         for (i = 0; i < elDividers.length; i++) {
 *                             // Add the list divider elements to the collection
 *                             elDivider = elDividers[i];
 *                             // li element having the li-divider class
 *                             idx = elDivider.innerText;
 *                             // Get a text (index value)
 *                             dividers[idx] = elDivider;
 *                             // Remember the element
 *
 *                             // Add the index to the index list
 *                             indices.push(idx);
 *                         }
 *
 *                         // Change the data-index attribute to the indexscrollbar element
 *                         // before initializing IndexScrollbar widget
 *                         elem.setAttribute("data-index", indices.join(","));
 *
 *                         // Create index scroll bar
 *                         tau.IndexScrollbar(elem);
 *
 *                         // Bind the select callback
 *                         elem.addEventListener("select", function (ev) {
 *                             var elDivider,
 *                                     idx = ev.detail.index;
 *                             elDivider = dividers[idx];
 *                             if (elDivider) {
 *                                 // Scroll to the li-divider element
 *                                 elScroller.scrollTop = elDivider.offsetTop - elScroller.offsetTop;
 *                             }
 *                         });
 *                     });
 *                 }());
 *             </script>
 *         </div>
 *
 * The following example uses the supplementScroll argument, which shows a level 2 index scroll bar.
 * The application code must contain a level 2 index array for each level 1 index character.
 * The example shows a way to analyze list items and create a dictionary (secondIndex) for level 1
 * indices for the index scroll bar, and a dictionary (keyItem) for moving list items at runtime:
 *
 *      @example
 *         <div id="indexscrollbar2" class="ui-indexscrollbar"
 *              data-index="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z">
 *         </div>
 *         <ul class="ui-listview" id="ibar2_list2">
 *             <li>Anton</li>
 *             <li>Arabella</li>
 *             <li>Art</li>
 *             <li>Barry</li>
 *             <li>Bibi</li>
 *             <li>Billy</li>
 *             <li>Bob</li>
 *             <li>Carry</li>
 *             <li>Cibi</li>
 *             <li>Daisy</li>
 *             <li>Derek</li>
 *             <li>Desmond</li>
 *         </ul>
 *
 *         <script>
 *             (function () {
 *                 var page = document.getElementById("pageIndexScrollbar2"),
 *                         isb,
 *                         index = [],
 *                         supIndex = {},
 *                         elIndex = {};
 *                 page.addEventListener("pageshow", function () {
 *                     var elisb = document.getElementById("indexscrollbar2"),
 *                             elList = document.getElementById("ibar2_list2"), // List element
 *                             elItems = elList.children,
 *                             elScroller = elList.parentElement, // Scroller (overflow-y:hidden)
 *                             indexData = getIndexData(
 *                                     {
 *                                         array: elItems,
 *                                         getTextValue: function (array, i) {
 *                                             return array[i].innerText;
 *                                         }
 *                                     });
 *
 *                     function getIndexData(options) {
 *                         var array = options.array,
 *                                 getTextValue = options.getTextValue,
 *                                 item,
 *                                 text,
 *                                 firstIndex = [],
 *                                 secondIndex = {},
 *                                 keyItem = {},
 *                                 c1 = null,
 *                                 c2 = null,
 *                                 i;
 *
 *                         for (i = 0; i < array.length; i++) {
 *                             item = array[i];
 *                             text = getTextValue(array, i);
 *                             if (text.length > 0) {
 *                                 if (!c1 || c1 !== text[0]) {
 *                                     // New c1
 *                                     c1 = text[0];
 *                                     firstIndex.push(c1);
 *                                     keyItem[c1] = item;
 *                                     secondIndex[c1] = [];
 *                                     c2 = text[1];
 *                                     if (c2) {
 *                                         secondIndex[c1].push(c2);
 *                                     }
 *                                     else {
 *                                         c2 = '';
 *                                     }
 *                                     keyItem[c1 + c2] = item;
 *                                 }
 *                                 else {
 *                                     // Existing c1
 *                                     if (c2 !== text[1]) {
 *                                         c2 = text[1];
 *                                         secondIndex[c1].push(c2);
 *                                         keyItem[c1 + c2] = item;
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                         return {
 *                             firstIndex: firstIndex,
 *                             secondIndex: secondIndex,
 *                             keyItem: keyItem
 *                         };
 *                     }
 *
 *                     // Update the data-index attribute to the indexscrollbar element, with the index list above
 *                     elisb.setAttribute("data-index", indexData.firstIndex);
 *                     // Create IndexScrollbar
 *                     isb = new tau.IndexScrollbar(elisb, {
 *                         index: indexData.firstIndex,
 *                         supplementaryIndex: function (firstIndex) {
 *                             return indexData.secondIndex[firstIndex];
 *                         }
 *                     });
 *                     // Bind the select callback
 *                     elisb.addEventListener("select", function (ev) {
 *                         var el,
 *                             index = ev.detail.index;
 *                         el = indexData.keyItem[index];
 *                         if (el) {
 *                             // Scroll to the li-divider element
 *                             elScroller.scrollTop = el.offsetTop - elScroller.offsetTop;
 *                         }
 *                     });
 *                 });
 *                 page.addEventListener("pagehide", function () {
 *                     console.log('isb2:destroy');
 *                     isb.destroy();
 *                     index.length = 0;
 *                     supIndex = {};
 *                     elIndex = {};
 *                 });
 *             }());
 *         </script>
 *
 * ##Options for widget
 *
 * Options for widget can be defined as _data-..._ attributes or give as parameter in constructor.
 *
 * You can change option for widget using method **option**.
 *
 * ##Methods
 *
 * To call method on widget you can use tau API:
 *
 * First API is from tau namespace:
 *
 *		@example
 *		var indexscrollbarElement = document.getElementById('indexscrollbar'),
 *			indexscrollbar = tau.widget.IndexScrollbar(indexscrollbarElement);
 *
 *		indexscrollbar.methodName(methodArgument1, methodArgument2, ...);
 *
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @class ns.widget.wearable.IndexScrollbar
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var IndexScrollbar = function() {
				// Support calling without 'new' keyword
				this.element = null;
				this.indicator = null;
				this.indexBar1 = null;	// First IndexBar. Always shown.
				this.indexBar2 = null;	// 2-depth IndexBar. shown if needed.


				this.index = null;
				this.touchAreaOffsetLeft = 0;
				this.indexElements = null;
				this.selectEventTriggerTimeoutId = null;
				this.ulMarginTop = 0;

				this.eventHandlers = {};

			},
			BaseWidget = ns.widget.BaseWidget,
			/**
			 * Alias for class {@link ns.engine}
			 * @property {Object} engine
			 * @member ns.widget.wearable.IndexScrollbar
			 * @private
			 * @static
			 */
				engine = ns.engine,

			/**
			 * Alias for class {@link ns.event}
			 * @property {Object} events
			 * @member ns.widget.wearable.IndexScrollbar
			 * @private
			 * @static
			 */
				events = ns.event,
			/**
			 * Alias for class {@link ns.util.object}
			 * @property {Object} utilsObject
			 * @member ns.widget.wearable.IndexScrollbar
			 * @private
			 * @static
			 */
				utilsObject = ns.util.object,
				IndexBar = ns.widget.wearable.indexscrollbar.IndexBar,
				IndexIndicator = ns.widget.wearable.indexscrollbar.IndexIndicator,
				EventType = {
					/**
					 * Event triggered after select index by user
					 * @event select
					 * @member ns.widget.wearable.IndexScrollbar
					 */
					SELECT: "select"
				},

				POINTER_START = 'vmousedown',
				POINTER_MOVE = 'vmousemove',
				POINTER_END = 'vmouseup',

				pointerIsPressed = false,
				prototype = new BaseWidget();

			IndexScrollbar.prototype = prototype;

			utilsObject.merge(prototype, {
				widgetName: "IndexScrollbar",
				widgetClass: "ui-indexscrollbar",

				_configure: function () {
					/**
					 * All possible widget options
					 * @property {Object} options
					 * @property {string} [options.moreChar="*"] more character
					 * @property {string} [options.selectedClass="ui-state-selected"] disabled class name
					 * @property {string} [options.delimiter=","] delimiter in index
					 * @property {string|Array} [options.index=["A","B","C","D","E","F","G","H","I",
					 * "J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1"]]
					 * String with list of letters separate be delimiter or array of letters
					 * @property {boolean} [options.maxIndexLen=0]
					 * @property {boolean} [options.indexHeight=41]
					 * @property {boolean} [options.keepSelectEventDelay=50]
					 * @property {?boolean} [options.container=null]
					 * @property {?boolean} [options.supplementaryIndex=null]
					 * @property {number} [options.supplementaryIndexMargin=1]
					 * @member ns.widget.wearable.IndexScrollbar
					 */
					this.options = {
						moreChar: "*",
						selectedClass: "ui-state-selected",
						indicatorClass: "ui-indexscrollbar-indicator",
						delimiter: ",",
						index: [
							"A", "B", "C", "D", "E", "F", "G", "H",
							"I", "J", "K", "L", "M", "N", "O", "P", "Q",
							"R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1"
						],
						maxIndexLen: 0,
						indexHeight: 41,
						keepSelectEventDelay: 50,
						container: null,
						supplementaryIndex: null,
						supplementaryIndexMargin: 1
					};
				},

				/**
				 * This method builds widget.
				 * @method _build
				 * @protected
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_build: function (element) {
					return element;
				},

				/**
				 * This method inits widget.
				 * @method _init
				 * @protected
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_init: function (element) {
					var self = this,
						options = self.options;
					self._setIndex(element, options.index);
					self._setMaxIndexLen(element, options.maxIndexLen);
					self._setInitialLayout();	// This is needed for creating sub objects
					self._createSubObjects();

					self._updateLayout();

					// Mark as extended
					self._extended(true);
					return element;
				},

				/**
				 * This method refreshes widget.
				 * @method _refresh
				 * @protected
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_refresh: function () {
					if( this._isExtended() ) {
						this._unbindEvent();
						this.indicator.hide();
						this._extended( false );
					}

					this._updateLayout();
					this.indexBar1.refresh();
					this._extended( true );
				},

				/**
				 * This method destroys widget.
				 * @method _destroy
				 * @protected
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_destroy: function() {
					var self = this;
					if (self.isBound()) {
						self._unbindEvent();
						self._extended(false);
						self._destroySubObjects();
						self.indicator = null;
						self.index = null;
						self.eventHandlers = {};
					}
				},

				/**
				 * This method creates indexBar1 and indicator in the indexScrollbar
				 * @method _createSubObjects
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_createSubObjects: function() {
					var self =  this,
						options = self.options,
						element = self.element;
					// indexBar1
					self.indexBar1 = new IndexBar( document.createElement("UL"), {
						container: element,
						offsetLeft: 0,
						index: options.index,
						verticalCenter: true,
						indexHeight: options.indexHeight,
						maxIndexLen: options.maxIndexLen
					});

					// indexBar2
					if (typeof options.supplementaryIndex === "function") {
						self.indexBar2 = new IndexBar( document.createElement("UL"), {
							container: element,
							offsetLeft: -element.clientWidth - options.supplementaryIndexMargin,
							index: [],	// empty index
							indexHeight: options.indexHeight,
							ulClass: "ui-indexscrollbar-supplementary"
						});
						self.indexBar2.hide();
					}

					// indicator
					self.indicator = new IndexIndicator(document.createElement("DIV"), {
						container: self._getContainer(),
						referenceElement: self.element,
						className: options.indicatorClass
					});

				},

				/**
				 * This method destroys sub-elements: index bars and indicator.
				 * @method _destroySubObjects
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_destroySubObjects: function() {
					var subObjs = {
							iBar1: this.indexBar1,
							iBar2: this.indexBar2,
							indicator: this.indicator
						},
						subObj,
						el,
						i;
					for(i in subObjs) {
						subObj = subObjs[i];
						if(subObj) {
							el = subObj.element;
							subObj.destroy();
							el.parentNode.removeChild(el);
						}
					}
				},

				/**
				 * This method sets initial layout.
				 * @method _setInitialLayout
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_setInitialLayout: function () {
					var indexScrollbar = this.element,
						container = this._getContainer(),
						containerPosition = window.getComputedStyle(container).position,
						indexScrollbarStyle = indexScrollbar.style;

					// Set the indexScrollbar's position, if needed
					if (containerPosition !== "absolute" && containerPosition !== "relative") {
						indexScrollbarStyle.top = container.offsetTop + "px";
						indexScrollbarStyle.height = container.offsetHeight + "px";
					}
				},

				/**
				 * This method calculates maximum index length.
				 * @method _setMaxIndexLen
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_setMaxIndexLen: function(element, value) {
					var self = this,
						options = self.options,
						container = self._getContainer(),
						containerHeight = container.offsetHeight;

					if (value <= 0) {
						value = Math.floor( containerHeight / options.indexHeight );
					}
					if (value > 0 && value%2 === 0) {
						value -= 1;	// Ensure odd number
					}
					options.maxIndexLen = value;
				},

				/**
				 * This method updates layout.
				 * @method _updateLayout
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_updateLayout: function() {
					this._setInitialLayout();
					this._draw();

					this.touchAreaOffsetLeft = this.element.offsetLeft - 10;
				},

				/**
				 * This method draws additional sub-elements
				 * @method _draw
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_draw: function () {
					this.indexBar1.show();
					return this;
				},

				/**
				 * This method removes indicator.
				 * @method _removeIndicator
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_removeIndicator: function() {
					var indicator = this.indicator,
						parentElem = indicator.element.parentNode;

					parentElem.removeChild(indicator.element);
					indicator.destroy();
					this.indicator = null;
				},

				/**
				 * This method returns the receiver of event by position.
				 * @method _getEventReceiverByPosition
				 * @param {number} posX The position relative to the left edge of the document.
				 * @return {?ns.widget.wearable.indexscrollbar.IndexBar} Receiver of event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getEventReceiverByPosition: function(posX) {
					var windowWidth = window.innerWidth,
						elementWidth = this.element.clientWidth,
						receiver;

					if( this.options.supplementaryIndex ) {
						if( windowWidth - elementWidth <= posX && posX <= windowWidth) {
							receiver = this.indexBar1;
						} else {
							receiver = this.indexBar2;
						}
					} else {
						receiver = this.indexBar1;
					}
					return receiver;
				},

				/**
				 * This method updates indicator.
				 * It sets new value of indicator and triggers event "select".
				 * @method _updateIndicatorAndTriggerEvent
				 * @param {number} val The value of indicator
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_updateIndicatorAndTriggerEvent: function(val) {
					this.indicator.setValue( val );
					this.indicator.show();
					if(this.selectEventTriggerTimeoutId) {
						window.clearTimeout(this.selectEventTriggerTimeoutId);
					}
					this.selectEventTriggerTimeoutId = window.setTimeout(function() {
						this.trigger(EventType.SELECT, {index: val});
						this.selectEventTriggerTimeoutId = null;
					}.bind(this), this.options.keepSelectEventDelay);
				},

				/**
				 * This method is executed on event "touchstart"
				 * @method _onTouchStartHandler
				 * @param {Event} event Event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_onTouchStartHandler: function(event) {
					pointerIsPressed = true;
					var touches = event.touches || event._originalEvent && event._originalEvent.touches;
					if (touches && (touches.length > 1)) {
						event.preventDefault();
						event.stopPropagation();
						return;
					}
					var pos = this._getPositionFromEvent(event),
					// At touchstart, only indexbar1 is shown.
						iBar1 = this.indexBar1,
						idx = iBar1.getIndexByPosition( pos.y ),
						val = iBar1.getValueByIndex( idx );

					iBar1.select( idx );	// highlight selected value

					this._updateIndicatorAndTriggerEvent( val );
				},

				/**
				 * This method is executed on event "touchmove"
				 * @method _onTouchMoveHandler
				 * @param {Event} event Event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_onTouchMoveHandler: function(event) {
					var touches = event._originalEvent && event._originalEvent.touches;
					if (touches && (touches.length > 1) || !pointerIsPressed) {
						events.preventDefault(event);
						events.stopPropagation(event);
						return;
					}

					var pos = this._getPositionFromEvent( event ),
						iBar1 = this.indexBar1,
						iBar2 = this.indexBar2,
						idx,
						iBar,
						val;

					// Check event receiver: ibar1 or ibar2
					iBar = this._getEventReceiverByPosition( pos.x );
					if( iBar === iBar2 ) {
						iBar2.options.index = this.options.supplementaryIndex(iBar1.getValueByIndex(iBar1.selectedIndex));
						iBar2.refresh();
					}

					// get index and value from ibar1 or ibar2
					idx = iBar.getIndexByPosition( pos.y );
					val = iBar.getValueByIndex( idx );
					if(iBar === iBar2) {
						// Update val to make a concatenated string for indexIndicator
						val = iBar1.getValueByIndex(iBar1.selectedIndex) + val;
					} else if(iBar2 && !iBar2.isShown()) {
						// iBar1 is selected.
						// Set iBar2's paddingTop, only when the iBar2 isn't shown
						iBar2.setPaddingTop(iBar1.getOffsetTopByIndex(iBar1.selectedIndex));
					}

					// update ibars
					iBar.select(idx);	// highlight selected value
					iBar.show();
					if( iBar1 === iBar && iBar2 ) {
						iBar2.hide();
					}

					// update indicator
					this._updateIndicatorAndTriggerEvent( val );

					events.preventDefault(event);
					events.stopPropagation(event);
				},

				/**
				 * This method is executed on event "touchend"
				 * @method _onTouchEndHandler
				 * @param {Event} event Event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_onTouchEndHandler: function( event ) {
					var self = this,
						touches = event._originalEvent && event._originalEvent.touches;

					if (touches && (touches.length === 0) ||
							!touches) {
						pointerIsPressed = false;
					}
					self.indicator.hide();
					self.indexBar1.clearSelected();
					if(self.indexBar2) {
						self.indexBar2.clearSelected();
						self.indexBar2.hide();
					}
				},

				/**
				 * This method binds events to widget.
				 * @method _bindEvents
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_bindEvents: function() {
					this._bindResizeEvent();
					this._bindEventToTriggerSelectEvent();
				},

				/**
				 * This method unbinds events to widget.
				 * @method _unbindEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_unbindEvent: function() {
					this._unbindResizeEvent();
					this._unbindEventToTriggerSelectEvent();
				},

				/**
				 * This method binds event "resize".
				 * @method _bindResizeEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_bindResizeEvent: function() {
					this.eventHandlers.onresize = function(/* ev */) {
						this.refresh();
					}.bind(this);

					window.addEventListener( "resize", this.eventHandlers.onresize );
				},

				/**
				 * This method unbinds event "resize".
				 * @method _bindResizeEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_unbindResizeEvent: function() {
					if ( this.eventHandlers.onresize ) {
						window.removeEventListener( "resize", this.eventHandlers.onresize );
					}
				},

				/**
				 * This method binds touch events.
				 * @method _bindEventToTriggerSelectEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_bindEventToTriggerSelectEvent: function() {
					var self = this;
					self.eventHandlers.touchStart = self._onTouchStartHandler.bind(self);
					self.eventHandlers.touchEnd = self._onTouchEndHandler.bind(self);
					self.eventHandlers.touchMove = self._onTouchMoveHandler.bind(self);

					self.element.addEventListener(POINTER_START, self.eventHandlers.touchStart);
					document.addEventListener(POINTER_MOVE, self.eventHandlers.touchMove);
					document.addEventListener(POINTER_END, self.eventHandlers.touchEnd);
					document.addEventListener("touchcancel", self.eventHandlers.touchEnd);
				},

				/**
				 * This method unbinds touch events.
				 * @method _unbindEventToTriggerSelectEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_unbindEventToTriggerSelectEvent: function() {
					var self = this;
					self.element.removeEventListener(POINTER_START, self.eventHandlers.touchStart);
					document.removeEventListener(POINTER_MOVE, self.eventHandlers.touchMove);
					document.removeEventListener(POINTER_END, self.eventHandlers.touchEnd);
					document.removeEventListener("touchcancel", self.eventHandlers.touchEnd);
				},

				/**
				 * This method sets or gets data from widget.
				 * @method _data
				 * @param {string|Object} key
				 * @param {*} val
				 * @return {*} Return value of data or widget's object
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_data: function (key, val) {
					var el = this.element,
						d = el.__data,
						idx;
					if(!d) {
						d = el.__data = {};
					}
					if(typeof key === "object") {
						// Support data collection
						for(idx in key) {
							this._data(idx, key[idx]);
						}
						return this;
					} else {
						if("undefined" === typeof val) {	// Getter
							return d[key];
						} else {	// Setter
							d[key] = val;
							return this;
						}
					}
				},

				/**
				 * This method checks if element is valid element of widget IndexScrollbar.
				 * @method _isValidElement
				 * @param {HTMLElement} el
				 * @return {boolean} True, if element is valid.
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_isValidElement: function (el) {
					return el.classList.contains(this.widgetClass);
				},

				/**
				 * This method checks if widget is extended.
				 * @method _isExtended
				 * @return {boolean} True, if element is extended.
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_isExtended: function () {
					return !!this._data("extended");
				},

				/**
				 * This method sets value of "extended" to widget.
				 * @method _extended
				 * @param {boolean} flag Value for extended
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_extended: function (flag) {
					this._data("extended", flag);
					return this;
				},

				/**
				 * This method gets indices prepared from parameter
				 * or index of widget.
				 * @method _getIndex
				 * @param {string} [value] Indices to prepared
				 * @return {Array} Indices
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_setIndex: function (element, value) {
					var options = this.options;
					if (typeof value === "string") {
						value = value.split(options.delimiter);	// delimiter
					}
					options.index = value;
				},

				/**
				 * This method gets offset of element.
				 * @method _getOffset
				 * @param {HTMLElement} el Element
				 * @return {Object} Offset with "top" and "left" properties
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getOffset: function( el ) {
					var left=0, top=0 ;
					do {
						top += el.offsetTop;
						left += el.offsetLeft;
						el = el.offsetParent;
					} while (el);

					return {
						top: top,
						left: left
					};
				},

				/**
				 * This method returns container of widget.
				 * @method _getContainer
				 * @return {HTMLElement} Container
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getContainer: function() {
					return this.options.container || this.element.parentNode;
				},

				/**
				 * Returns position of event.
				 * @method _getPositionFromEvent
				 * @return {Object} Position of event with properties "x" and "y"
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getPositionFromEvent: function( ev ) {
					return ev.type.search(/^touch/) !== -1 ?
					{x: ev.touches[0].clientX, y: ev.touches[0].clientY} :
					{x: ev.clientX, y: ev.clientY};
				},

				/**
				 * Adds event listener to element of widget.
				 * @method addEventListener
				 * @param {string} type Name of event
				 * @param {Function} listener Function to be executed
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				addEventListener: function (type, listener) {
					this.element.addEventListener(type, listener);
				},

				/**
				 * Removes event listener from element of widget.
				 * @method removeEventListener
				 * @param {string} type Name of event
				 * @param {Function} listener Function to be removed
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				removeEventListener: function (type, listener) {
					this.element.removeEventListener(type, listener);
				}

			});

			// definition
			ns.widget.wearable.IndexScrollbar = IndexScrollbar;
			engine.defineWidget(
				"IndexScrollbar",
				".ui-indexscrollbar",
				[],
				IndexScrollbar,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Progress Widget
 * Shows a control that indicates the progress percentage of an on-going operation.
 *
 * The progress widget shows a control that indicates the progress percentage of an on-going operation. This widget can be scaled to fit inside a parent container.
 *
 * ## Default selectors
 *
 * This widget provide three style progress.
 *
 * ### Simple progress bar
 * If you don't implement any class, you can show default progress style
 * To add a progress widget to the application, use the following code:
 *
 *      @example
 *      <progress max="100" value="90"></progress>
 *
 * ### Infinite progress bar
 * If you implement class (*ui-progress-indeterminate*), you can show image looks like infinite move.
 *
 * To add a progress widget to the application, use the following code:
 *      @example
 *      <progress class="ui-progress-indeterminate" max="100" value="100"></progress>
 *
 * ### Progress bar with additional information
 * If you implement div tag that can choose two classes (*ui-progress-proportion* or *ui-progress-ratio*) at progress tag same level, you can show two information (proportion information is located left below and ratio information is located right below)
 *
 * To add a progress widget to the application, use the following code:
 *
 *      @example
 *      <progress max="100" value="50"></progress>
 *      <div class="ui-progress-proportion">00/20</div>
 *      <div class="ui-progress-ratio">50%</div>
 *
 * ## JavaScript API
 *
 * Progress widget hasn't JavaScript API.
 *
 * @class ns.widget.wearable.Progress
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,

				Progress = function () {
					return this;
				},
				prototype = new BaseWidget();

			Progress.events = {};

			/**
			 * Build Progress
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.wearable.Progress
			 */
			prototype._build = function (element) {
				return element;
			};

			prototype._init = function (element) {
				return element;
			};

			prototype._bindEvents = function (element) {
				return element;
			};

			/**
			 * Refresh structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.wearable.Progress
			 */
			prototype._refresh = function () {
				return null;
			};

			/**
			 * Destroy widget
			 * @method _destroy
			 * @protected
			 * @member ns.widget.wearable.Progress
			 */
			prototype._destroy = function () {
				return null;
			};

			Progress.prototype = prototype;
			ns.widget.wearable.Progress = Progress;

			engine.defineWidget(
				"Progress",
				"progress",
				[],
				Progress,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Processing Widget
 * Shows that an operation is in progress.
 *
 * The processing widget shows that an operation is in progress.
 *
 * ## Default selectors
 *
 * To add a processing widget to the application, use the following code:
 *
 *      @example
 *      <div class="ui-processing"></div>
 *      <div class="ui-processing-text">
 *          Description about progress
 *      </div>
 *
 * ## JavaScript API
 *
 * Processing widget hasn't JavaScript API.
 *
 * @class ns.widget.wearable.Progressing
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,
				Progressing = function () {
					return this;
				},
				prototype = new BaseWidget();

			Progressing.events = {};

			/**
			 * Build Progressing
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.wearable.Progressing
			 */
			prototype._build = function (element) {
				return element;
			};

			prototype._init = function (element) {
				return element;
			};

			prototype._bindEvents = function (element) {
				return element;
			};

			/**
			 * Refresh structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.wearable.Progressing
			 */
			prototype._refresh = function () {
				return null;
			};

			/**
			 * Destroy widget
			 * @method _destroy
			 * @protected
			 * @member ns.widget.wearable.Progressing
			 */
			prototype._destroy = function () {
				return null;
			};

			Progressing.prototype = prototype;
			ns.widget.wearable.Progressing = Progressing;

			engine.defineWidget(
				"Progressing",
				".ui-progress",
				[],
				Progressing,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Toggle Switch Widget
 * Shows a 2-state switch.
 *
 * The toggle switch widget shows a 2-state switch on the screen.
 *
 * ## Default selectors
 *
 * To add a toggle switch widget to the application, use the following code:
 *
 *      @example
 *      <div class="ui-switch">
 *          <div class="ui-switch-text">
 *              Toggle Switch
 *          </div>
 *          <label class="ui-toggleswitch">
 *              <input type="checkbox" class="ui-switch-input">
 *              <div class="ui-switch-activation">
 *                   <div class="ui-switch-inneroffset">
 *                       <div class="ui-switch-handler"></div>
 *                   </div>
 *              </div>
 *           </label>
 *      </div>
 *
 * ## JavaScript API
 *
 * ToggleSwitch widget hasn't JavaScript API.
 *
 * @class ns.widget.wearable.ToggleSwitch
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,

				ToggleSwitch = function () {
					/**
					 * Options for widget
					 * @property {Object} options
					 * @property {?string} [options.text=null] Shown text
					 * @member ns.widget.wearable.ToggleSwitch
					 */
					this.options = {
						text: null
					};
				},
				events = {},
				classesPrefix = "ui-switch",
				classes = {
					handler: classesPrefix + "-handler",
					inneroffset: classesPrefix + "-inneroffset",
					activation: classesPrefix + "-activation",
					input: classesPrefix + "-input",
					text: classesPrefix + "-text"
				},
				prototype = new BaseWidget();

			function getClass(name) {
				return classes[name];
			}

			function addClass(element, classId) {
				element.classList.add(getClass(classId));
			}

			function createElement(name) {
				return document.createElement(name);
			}

			/**
			 * Dictionary for ToggleSwitch related events.
			 * For ToggleSwitch, it is an empty object.
			 * @property {Object} events
			 * @member ns.widget.wearable.ToggleSwitch
			 * @static
			 */
			ToggleSwitch.events = events;

			/**
			 * Dictionary for ToggleSwitch related css class names
			 * @property {Object} classes
			 * @member ns.widget.wearable.ToggleSwitch
			 * @static
			 * @readonly
			 */
			ToggleSwitch.classes = classes;

			/**
			 * Build ToggleSwitch
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.wearable.ToggleSwitch
			 */
			prototype._build = function (element) {
				var options = this.options,
					text = options.text,
					divText,
					label = createElement("label"),
					input = createElement("input"),
					divActivation = createElement("div"),
					divInneroffset = createElement("div"),
					divHandler = createElement("div");

				if (text) {
					divText = createElement("div");
					addClass(divText, "text");
					divText.innerHTML = text;
					element.appendChild(divText);
				}
				addClass(divHandler, "handler");
				divInneroffset.appendChild(divHandler);
				addClass(divInneroffset, "inneroffset");
				divActivation.appendChild(divInneroffset);
				addClass(divActivation, "activation");
				label.classList.add("ui-toggleswitch");
				input.type = "checkbox";
				addClass(input, "input");
				label.appendChild(input);
				label.appendChild(divActivation);
				element.appendChild(label);
				return element;
			};

			ToggleSwitch.prototype = prototype;
			ns.widget.wearable.ToggleSwitch = ToggleSwitch;

			engine.defineWidget(
				"ToggleSwitch",
				".ui-switch",
				[],
				ToggleSwitch,
				"wearable"
			);
			}(window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, white: true, plusplus: true*/
/**
 *#Virtual ListView Widget
 * Shows a list view for large amounts of data.
 *
 * In the Web environment, it is challenging to display a large amount of data in a list, such as
 * displaying a contact list of over 1000 list items. It takes time to display the entire list in
 * HTML and the DOM manipulation is complex.
 *
 * The virtual list widget is used to display a list of unlimited data elements on the screen
 * for better performance. This widget provides easy access to databases to retrieve and display data.
 * It based on **result set** which is fixed size defined by developer by data-row attribute. Result
 * set should be **at least 3 times bigger** then size of clip (number of visible elements).
 *
 * To add a virtual list widget to the application follow these steps:
 *
 * ##Create widget container - list element
 *

   &lt;ul id=&quot;vlist&quot; class=&quot;ui-listview ui-virtuallistview&quot;&gt;&lt;/ul&gt;

 *
 * ##Initialize widget
 *
	// Get HTML Element reference
	var elList = document.getElementById("vlist"),
		// Set up config. All config options can be found in virtual list reference
		vListConfig = {
		dataLength: 2000,
		bufferSize: 40,
		listItemUpdater: function(elListItem, newIndex){
			// NOTE: JSON_DATA is global object with all data rows.
			var data = JSON_DATA["newIndex"];
			elListItem.innerHTML = '<span class="ui-li-text-main">' +
												data.NAME + '</span>';
			}
		};
	vlist = tau.widget.VirtualListview(elList, vListConfig);
 *
 * More config options can be found in {@link ns.widget.wearable.VirtualListview#options}
 *
 * ##Set list item update function
 *
 * List item update function is responsible to update list element depending on data row index. If you didn’t
 * pass list item update function by config option, you have to do it using following method.
 * Otherwise you will see an empty list.
 *
 *
	vlist.setListItemUpdater(function(elListItem, newIndex){
		// NOTE: JSON_DATA is global object with all data rows.
		var data = JSON_DATA["newIndex"];
		elListItem.innerHTML = '<span class="ui-li-text-main">' +
									data.NAME + '</span>';
	});
 *
 * **Attention:** Virtual List manipulates DOM elements to be more efficient. It doesn’t remove or create list
 * elements before calling list item update function. It means that, you have to take care about list element
 * and keep it clean from custom classes an attributes, because order of li elements is volatile.
 *
 * ##Draw child elements
 * If all configuration options are set, call draw method to draw child elements and make virtual list work.
 *
	vlist.draw();
 *
 * ##Destroy Virtual List
 * It’s highly recommended to destroy widgets, when they aren’t necessary. To destroy Virtual List call destroy method.
 *
	vlist.destroy();
 *
 * ##Full working code
 *
	var page = document.getElementById("pageTestVirtualList"),
		vlist,
		// Assing data.
		JSON_DATA = [
			{NAME:"Abdelnaby, Alaa", ACTIVE:"1990 - 1994", FROM:"College - Duke", TEAM_LOGO:"../test/1_raw.jpg"},
			{NAME:"Abdul-Aziz, Zaid", ACTIVE:"1968 - 1977", FROM:"College - Iowa State", TEAM_LOGO:"../test/2_raw.jpg"}
			// A lot of records.
			// These database can be found in Gear Sample Application Winset included to Tizen SDK
			];

		page.addEventListener("pageshow", function() {
			var elList = document.getElementById("vlist");

			vlist = tau.widget.VirtualListview(elList, {
					dataLength: JSON_DATA.length,
					bufferSize: 40
			});

			// Set list item updater
			vlist.setListItemUpdater(function(elListItem, newIndex) {
				//TODO: Update listitem here
				var data =  JSON_DATA[newIndex];
				elListItem.innerHTML = '<span class="ui-li-text-main">' +
											data.NAME + '</span>';
			});
			// Draw child elements
			vlist.draw();
		});
		page.addEventListener("pagehide", function() {
			// Remove all children in the vlist
			vlist.destroy();
		});
 *
 * @class ns.widget.wearable.VirtualListview
 * @since 2.2
 * @extends ns.widget.BaseWidget
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Michał Szepielak <m.szepielak@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function(document, ns) {
	
					var BaseWidget = ns.widget.BaseWidget,
						/**
						 * Alias for class {@link ns.engine}
						 * @property {Object} engine
						 * @private
						 * @static
						 * @member ns.widget.wearable.VirtualListview
						 */
						engine = ns.engine,
						// Constants definition
						/**
						 * Defines index of scroll `{@link ns.widget.wearable.VirtualListview#_scroll}.direction`
						 * @property {number} SCROLL_UP
						 * to retrive if user is scrolling up
						 * @private
						 * @static
						 * @member ns.widget.wearable.VirtualListview
						 */
						SCROLL_UP = 0,
						/**
						 * Defines index of scroll `{@link ns.widget.wearable.VirtualListview#_scroll}.direction`
						 * @property {number} SCROLL_RIGHT
						 * to retrive if user is scrolling right
						 * @private
						 * @static
						 * @member ns.widget.wearable.VirtualListview
						 */
						SCROLL_RIGHT = 1,
						/**
						 * Defines index of scroll {@link ns.widget.wearable.VirtualListview#_scroll}
						 * @property {number} SCROLL_DOWN
						 * to retrive if user is scrolling down
						 * @private
						 * @static
						 * @member ns.widget.wearable.VirtualListview
						 */
						SCROLL_DOWN = 2,
						/**
						 * Defines index of scroll {@link ns.widget.wearable.VirtualListview#_scroll}
						 * @property {number} SCROLL_LEFT
						 * to retrive if user is scrolling left
						 * @private
						 * @static
						 * @member ns.widget.wearable.VirtualListview
						 */
						SCROLL_LEFT = 3,
						/**
						 * Defines vertical scrolling orientation. It's default orientation.
						 * @property {string} VERTICAL
						 * @private
						 * @static
						 */
						VERTICAL = "y",
						/**
						 * Defines horizontal scrolling orientation.
						 * @property {string} HORIZONTAL
						 * @private
						 * @static
						 */
						HORIZONTAL = "x",
						/**
						 * Determines that scroll event should not be taken into account if scroll event accurs.
						 * @property {boolean} blockEvent
						 * @private
						 * @static
						 */
						blockEvent = false,
						/**
						 * Handle window timeout ID.
						 * @property {number} timeoutHandler
						 * @private
						 * @static
						 */
						timeoutHandler,
						/**
						 * Reference to original target object from touch event.
						 * @property {Object} origTarget
						 * @private
						 * @static
						 */
						origTarget,
						/**
						 * Number of miliseconds to determine if tap event occured.
						 * @property {number} tapholdThreshold
						 * @private
						 * @static
						 */
						tapholdThreshold = 250,
						/**
						 * Handler for touch event listener to examine tap occurance.
						 * @property {Object} tapHandlerBound
						 * @private
						 * @static
						 */
						tapHandlerBound = null,
						/**
						 * Stores last touch position to examine tap occurance.
						 * @property {Object} lastTouchPos
						 * @private
						 * @static
						 */
						lastTouchPos =	{},

						/**
						 * Local constructor function
						 * @method VirtualListview
						 * @private
						 * @member ns.widget.wearable.VirtualListview
						 */
						VirtualListview = function() {
							var self = this;
							/**
							 * VirtualListview widget's properties associated with
							 * @property {Object} ui
							 * User Interface
							 * @property {?HTMLElement} [ui.scrollview=null] Scroll element
							 * @property {?HTMLElement} [ui.spacer=null] HTML element which makes scrollbar proper size
							 * @property {number} [ui.itemSize=0] Size of list element in pixels. If scrolling is
							 * vertically it's item width in other case it"s height of item element
							 * @member ns.widget.wearable.VirtualListview
							 */
							self.ui = {
								scrollview: null,
								spacer: null,
								itemSize: 0
							};

							/**
							 * Holds information about scrolling state
							 * @property {Object} _scroll
							 * @property {Array} [_scroll.direction=[0,0,0,0]] Holds current direction of scrolling.
							 * Indexes suit to following order: [up, left, down, right]
							 * @property {number} [_scroll.lastPositionX=0] Last scroll position from top in pixels.
							 * @property {number} [_scroll.lastPositionY=0] Last scroll position from left in pixels.
							 * @property {number} [_scroll.lastJumpX=0] Difference between last and current
							 * position of horizontal scroll.
							 * @property {number} [_scroll.lastJumpY=0] Difference between last and current
							 * position of vertical scroll.
							 * @property {number} [_scroll.clipWidth=0] Width of clip - visible area for user.
							 * @property {number} [_scroll.clipHeight=0] Height of clip - visible area for user.
							 * @member ns.widget.wearable.VirtualListview
							 */
							self._scroll = {
								direction: [0, 0, 0, 0],
								lastPositionX: 0,
								lastPositionY: 0,
								lastJumpX: 0,
								lastJumpY: 0,
								clipWidth: 0,
								clipHeight: 0
							};

							/**
							 * Name of widget
							 * @property {string} name
							 * @member ns.widget.wearable.VirtualListview
							 * @static
							 */
							self.name = "VirtualListview";

							/**
							 * Current zero-based index of data set.
							 * @property {number} _currentIndex
							 * @member ns.widget.wearable.VirtualListview
							 * @protected
							 */
							self._currentIndex = 0;

							/**
							 * VirtualListview widget options.
							 * @property {Object} options
							 * @property {number} [options.bufferSize=100] Number of items of result set. The default value is 100.
							 * As the value gets higher, the loading time increases while the system performance
							 * improves. So you need to pick a value that provides the best performance
							 * without excessive loading time. It's recomended to set bufferSize at least 3 times bigger than number
							 * of visible elements.
							 * @property {number} [options.dataLength=0] Total number of items.
							 * @property {string} [options.orientation="y"] Scrolling orientation. Default vertical scrolling enabled.
							 * @property {Object} options.listItemUpdater Holds reference to method which modifies list item, depended
							 * at specified index from database. **Method should be overridden by developer using
							 * {@link ns.widget.wearable.VirtualListview#setListItemUpdater} method.** or defined as a config
							 * object. Method takes two parameters:
							 *  -  element {HTMLElement} List item to be modified
							 *  -  index {number} Index of data set
							 * @member ns.widget.wearable.VirtualListview
							 */
							self.options = {
								bufferSize: 100,
								dataLength: 0,
								orientation: VERTICAL,
								listItemUpdater: null
							};

							/**
							 * Binding for scroll event listener.
							 * @method _scrollEventBound
							 * @member ns.widget.wearable.VirtualListview
							 * @protected
							 */
							self._scrollEventBound = null;
							/**
							 * Binding for touch start event listener.
							 * @method _touchStartEventBound
							 * @member ns.widget.wearable.VirtualListview
							 * @protected
							 */
							self._touchStartEventBound = null;

							return self;
						},
						POINTER_START = 'vmousedown',
						POINTER_MOVE = 'vmousemove',
						POINTER_END = 'vmouseup',

						// Cached prototype for better minification
						prototype = new BaseWidget();

				/**
				 * Dictionary object containing commonly used wiget classes
				 * @property {Object} classes
				 * @static
				 * @readonly
				 * @member ns.widget.wearable.VirtualListview
				 */
				VirtualListview.classes = {
					uiVirtualListContainer: "ui-virtual-list-container",
					uiListviewActive: "ui-listview-active"
				};

				/**
				 * Remove highlight from items.
				 * @method _removeHighlight
				 * @param {ns.widget.wearable.VirtualListview} self Reference to VirtualListview object.
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _removeHighlight (self) {
					var children = self.element.children,
						i = children.length;
					while (--i >= 0) {
						children[i].classList.remove(VirtualListview.classes.uiListviewActive);
					}
				}

				/**
				 * Checks if tap meet the condition.
				 * @method _tapHandler
				 * @param {ns.widget.wearable.VirtualListview} self Reference to VirtualListview object.
				 * @param {Event} event Received Touch event
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _tapHandler (self, event) {
					var changedTouches = event.changedTouches ||
							(event._originalEvent &&
								event._originalEvent.changedTouches),
						eventTouch = (changedTouches && changedTouches.length) ?
							changedTouches[0] :
								event;

					if (event.type === POINTER_MOVE) {
						if (Math.abs(lastTouchPos.clientX - eventTouch.clientX) > 10 && Math.abs(lastTouchPos.clientY - eventTouch.clientY) > 10) {
							_removeHighlight(self);
							window.clearTimeout(timeoutHandler);
						}
					} else {
						_removeHighlight(self);
						window.clearTimeout(timeoutHandler);
					}

				}

				/**
				 * Adds highlight
				 * @method tapholdListener
				 * @param {ns.widget.wearable.VirtualListview} self Reference to VirtualListview object.
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function tapholdListener(self) {
					var liElement;

					liElement = origTarget.tagName === "LI" ? origTarget : origTarget.parentNode;

					origTarget.removeEventListener(POINTER_MOVE, tapHandlerBound, false);
					origTarget.removeEventListener(POINTER_END, tapHandlerBound, false);
					tapHandlerBound = null;

					_removeHighlight(self);
					liElement.classList.add(VirtualListview.classes.uiListviewActive);
					lastTouchPos = {};
				}

				/**
				 * Binds touching events to examine tap event.
				 * @method _touchStartHandler
				 * @param {ns.widget.wearable.VirtualListview} self Reference to VirtualListview object.
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _touchStartHandler (self, event) {
					var eventData;

					origTarget = event.target;

					// Clean up
					window.clearTimeout(timeoutHandler);
					origTarget.removeEventListener(POINTER_MOVE, tapHandlerBound, false);
					origTarget.removeEventListener(POINTER_END, tapHandlerBound, false);

					timeoutHandler = window.setTimeout(tapholdListener.bind(null, self), tapholdThreshold);
					eventData = (event.touches && event.touches.length) ? event.touches[0] : event;
					lastTouchPos.clientX = eventData.clientX;
					lastTouchPos.clientY = eventData.clientY;

					//Add touch listeners
					tapHandlerBound = _tapHandler.bind(null, self);
					origTarget.addEventListener(POINTER_MOVE, tapHandlerBound, false);
					origTarget.addEventListener(POINTER_END, tapHandlerBound, false);

				}


				/**
				 * Updates scroll information about position, direction and jump size.
				 * @method _updateScrollInfo
				 * @param {ns.widget.wearable.VirtualListview} self VirtualListview widget reference
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _updateScrollInfo(self) {
					var scrollInfo = self._scroll,
						scrollDirection = scrollInfo.direction,
						scrollViewElement = self.ui.scrollview,
						scrollLastPositionX = scrollInfo.lastPositionX,
						scrollLastPositionY = scrollInfo.lastPositionY,
						scrollviewPosX = scrollViewElement.scrollLeft,
						scrollviewPosY = scrollViewElement.scrollTop;

					self._refreshScrollbar();
					//Reset scroll matrix
					scrollDirection = [0, 0, 0, 0];

					//Scrolling UP
					if (scrollviewPosY < scrollLastPositionY) {
						scrollDirection[SCROLL_UP] = 1;
					}

					//Scrolling RIGHT
					if (scrollviewPosX < scrollLastPositionX) {
						scrollDirection[SCROLL_RIGHT] = 1;
					}

					//Scrolling DOWN
					if (scrollviewPosY > scrollLastPositionY) {
						scrollDirection[SCROLL_DOWN] = 1;
					}

					//Scrolling LEFT
					if (scrollviewPosX > scrollLastPositionX) {
						scrollDirection[SCROLL_LEFT] = 1;
					}

					scrollInfo.lastJumpY = Math.abs(scrollviewPosY - scrollLastPositionY);
					scrollInfo.lastJumpX = Math.abs(scrollviewPosX - scrollLastPositionX);
					scrollInfo.lastPositionX = scrollviewPosX;
					scrollInfo.lastPositionY = scrollviewPosY;
					scrollInfo.direction = scrollDirection;
					scrollInfo.clipHeight = scrollViewElement.clientHeight;
					scrollInfo.clipWidth = scrollViewElement.clientWidth;
				}

				/**
				 * Computes list element size according to scrolling orientation
				 * @method _computeElementSize
				 * @param {HTMLElement} element Element whose size should be computed
				 * @param {string} orientation Scrolling orientation
				 * @return {number} Size of element in pixels
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _computeElementSize(element, orientation) {
					// @TODO change to util method if it will work perfectly
					return parseInt(orientation === VERTICAL ? element.clientHeight : element.clientWidth, 10) + 1;
				}

				/**
				 * Scrolls and manipulates DOM element to destination index. Element at destination
				 * index is the first visible element on the screen. Destination index can
				 * be different from Virtual List's current index, because current index points
				 * to first element in the buffer.
				 * @member ns.widget.wearable.VirtualListview
				 * @param {ns.widget.wearable.VirtualListview} self VirtualListview widget reference
				 * @param {number} toIndex Destination index.
				 * @method _orderElementsByIndex
				 * @private
				 * @static
				 */
				function _orderElementsByIndex(self, toIndex) {
					var element = self.element,
						options = self.options,
						scrollInfo = self._scroll,
						scrollClipSize = 0,
						dataLength = options.dataLength,
						indexCorrection = 0,
						bufferedElements = 0,
						avgListItemSize = 0,
						bufferSize = options.bufferSize,
						i,
						offset = 0,
						index,
						isLastBuffer = false;

					//Get size of scroll clip depended on scroll direction
					scrollClipSize = options.orientation === VERTICAL ? scrollInfo.clipHeight : scrollInfo.clipWidth;

					//Compute average list item size
					avgListItemSize = _computeElementSize(element, options.orientation) / bufferSize;

					//Compute average number of elements in each buffer (before and after clip)
					bufferedElements = Math.floor((bufferSize - Math.floor(scrollClipSize / avgListItemSize)) / 2);

					if (toIndex - bufferedElements <= 0) {
						index = 0;
						indexCorrection = 0;
					} else {
						index = toIndex - bufferedElements;
					}

					if (index + bufferSize >= dataLength) {
						index = dataLength - bufferSize;
						isLastBuffer = true;
					}
					indexCorrection = toIndex - index;

					self._loadData(index);
					blockEvent = true;
					offset = index * avgListItemSize;
					if (options.orientation === VERTICAL) {
						if (isLastBuffer) {
							offset = self.ui.spacer.clientHeight;
						}
						element.style.top = offset + "px";
					} else {
						if (isLastBuffer) {
							offset = self.ui.spacer.clientWidth;
						}
						element.style.left = offset + "px";
					}

					for (i = 0; i < indexCorrection; i += 1) {
						offset += _computeElementSize(element.children[i], options.orientation);
					}

					if (options.orientation === VERTICAL) {
						self.ui.scrollview.scrollTop = offset;
					} else {
						self.ui.scrollview.scrollLeft = offset;
					}
					blockEvent = false;
					self._currentIndex = index;
				}

				/**
				 * Orders elements. Controls resultset visibility and does DOM manipulation. This
				 * method is used during normal scrolling.
				 * @method _orderElements
				 * @param {ns.widget.wearable.VirtualListview} self VirtualListview widget reference
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _orderElements(self) {
					var element = self.element,
						scrollInfo = self._scroll,
						options = self.options,
						elementStyle = element.style,
						//Current index of data, first element of resultset
						currentIndex = self._currentIndex,
						//Number of items in resultset
						bufferSize = parseInt(options.bufferSize, 10),
						//Total number of items
						dataLength = options.dataLength,
						//Array of scroll direction
						scrollDirection = scrollInfo.direction,
						scrollClipWidth = scrollInfo.clipWidth,
						scrollClipHeight = scrollInfo.clipHeight,
						scrollLastPositionY = scrollInfo.lastPositionY,
						scrollLastPositionX = scrollInfo.lastPositionX,
						elementPositionTop = parseInt(elementStyle.top, 10) || 0,
						elementPositionLeft = parseInt(elementStyle.left, 10) || 0,
						elementsToLoad = 0,
						bufferToLoad = 0,
						elementsLeftToLoad = 0,
						temporaryElement = null,
						avgListItemSize = 0,
						resultsetSize = 0,
						childrenNodes,
						i = 0,
						jump = 0,
						hiddenPart = 0,
						direction,
						newPosition;

					childrenNodes = element.children;
					for (i = childrenNodes.length - 1; i > 0; i -= 1) {
						if (options.orientation === VERTICAL) {
							resultsetSize += childrenNodes[i].clientHeight;
						} else {
							resultsetSize += childrenNodes[i].clientWidth;
						}
					}

					//Compute average list item size
					avgListItemSize = _computeElementSize(element, options.orientation) / bufferSize;

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling DOWN
					if (scrollDirection[SCROLL_DOWN]) {
						hiddenPart = scrollLastPositionY - elementPositionTop;
						elementsLeftToLoad = dataLength - currentIndex - bufferSize;
					}

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling UP
					if (scrollDirection[SCROLL_UP]) {
						hiddenPart = (elementPositionTop + resultsetSize) - (scrollLastPositionY + scrollClipHeight);
						elementsLeftToLoad = currentIndex;
					}

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling RIGHT
					if (scrollDirection[SCROLL_RIGHT]) {
						hiddenPart = scrollLastPositionX - elementPositionLeft;
						elementsLeftToLoad = dataLength - currentIndex - bufferSize;
					}

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling LEFT
					if (scrollDirection[SCROLL_LEFT]) {
						hiddenPart = (elementPositionLeft + resultsetSize) - (scrollLastPositionX - scrollClipWidth);
						elementsLeftToLoad = currentIndex;
					}

					//manipulate DOM only, when at least 2/3 of result set is hidden
					//NOTE: Result Set should be at least 3x bigger then clip size
					if (hiddenPart > 0 && (resultsetSize / hiddenPart) <= 1.5) {

						//Left half of hidden elements still hidden/cached
						elementsToLoad = Math.floor(hiddenPart / avgListItemSize) - Math.floor((bufferSize - scrollClipHeight / avgListItemSize) / 2);
						elementsToLoad = elementsLeftToLoad < elementsToLoad ? elementsLeftToLoad : elementsToLoad;
						bufferToLoad = Math.floor(elementsToLoad / bufferSize);
						elementsToLoad = elementsToLoad % bufferSize;

						// Scrolling more then buffer
						if (bufferToLoad > 0) {
							if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
								direction = 1;
							}

							if (scrollDirection[SCROLL_UP] || scrollDirection[SCROLL_LEFT]) {
								direction = -1;
							}

							// Load data to buffer according to jumped index
							self._loadData(currentIndex + direction * bufferToLoad * bufferSize);

							// Refresh current index after buffer jump
							currentIndex = self._currentIndex;

							jump += direction * bufferToLoad * bufferSize * avgListItemSize;
						}

						if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
							//Switch currentIndex to last
							currentIndex = currentIndex + bufferSize - 1;
						}
						for (i = elementsToLoad; i > 0; i -= 1) {
							if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
								temporaryElement = element.appendChild(element.firstElementChild);
								++currentIndex;

								//Updates list item using template
								self._updateListItem(temporaryElement, currentIndex);
								jump += temporaryElement.clientHeight;
							}

							if (scrollDirection[SCROLL_UP] || scrollDirection[SCROLL_LEFT]) {
								temporaryElement = element.insertBefore(element.lastElementChild, element.firstElementChild);
								--currentIndex;

								//Updates list item using template
								self._updateListItem(temporaryElement, currentIndex);
								jump -= temporaryElement.clientHeight;
							}
						}
						if (scrollDirection[SCROLL_UP] || scrollDirection[SCROLL_DOWN]) {
							newPosition = elementPositionTop + jump;

							if (newPosition < 0 || currentIndex <= 0) {
								newPosition = 0;
								currentIndex = 0;
							}

							if (currentIndex >= (dataLength - 1)) {
								newPosition = self.ui.spacer.clientHeight;
							}

							elementStyle.top = newPosition + "px";
						}

						if (scrollDirection[SCROLL_LEFT] || scrollDirection[SCROLL_RIGHT]) {
							newPosition = elementPositionLeft + jump;

							if (newPosition < 0 || currentIndex <= 0) {
								newPosition = 0;
							}

							if (currentIndex >= (dataLength - 1)) {
								newPosition = self.ui.spacer.clientWidth;
							}

							elementStyle.left = newPosition + "px";
						}

						if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
							//Switch currentIndex to first
							currentIndex = currentIndex - bufferSize + 1;
						}
						//Save current index
						self._currentIndex = currentIndex;
					}
				}

				/**
				 * Check if scrolling position is changed and updates list if it needed.
				 * @method _updateList
				 * @param {ns.widget.wearable.VirtualListview} self VirtualListview widget reference
				 * @member ns.widget.wearable.VirtualListview
				 * @private
				 * @static
				 */
				function _updateList(self) {
					var _scroll = self._scroll;
					_updateScrollInfo.call(null, self);
					if (_scroll.lastJumpY > 0 || _scroll.lastJumpX > 0) {
						if (!blockEvent) {
							_orderElements(self);
						}
					}
				}

				/**
				 * Updates list item using user defined listItemUpdater function.
				 * @method _updateListItem
				 * @param {HTMLElement} element List element to update
				 * @param {number} index Data row index
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._updateListItem = function (element, index) {
					this.options.listItemUpdater(element, index);
				};

				/**
				 * Build widget structure
				 * @method _build
				 * @param {HTMLElement} element Widget's element
				 * @return {HTMLElement} Element on which built is widget
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._build = function(element) {
					var classes = VirtualListview.classes;

					element.classList.add(classes.uiVirtualListContainer);
					return element;
				};


				/**
				 * Initialize widget on an element.
				 * @method _init
				 * @param {HTMLElement} element Widget's element
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._init = function(element) {
					var self = this,
						ui = self.ui,
						options = self.options,
						orientation,
						scrollview,
						scrollviewStyle,
						spacer,
						spacerStyle;

					//Set orientation, default vertical scrolling is allowed
					orientation = options.orientation.toLowerCase() === HORIZONTAL ? HORIZONTAL : VERTICAL;

					//Get scrollview instance
					scrollview = element.parentElement;
					scrollviewStyle = scrollview.style;

					// Prepare spacer (element which makes scrollbar proper size)
					spacer = document.createElement("div");
					spacerStyle = spacer.style;
					spacerStyle.display = "block";
					spacerStyle.position = "static";
					scrollview.appendChild(spacer);

					//Prepare element
					element.style.position = "relative";

					if (orientation === HORIZONTAL) {
						// @TODO check if whiteSpace: nowrap is better for vertical listes
						spacerStyle.float = "left";
						scrollviewStyle.overflowX = "scroll";
						scrollviewStyle.overflowY = "hidden";
					} else {
						scrollviewStyle.overflowX = "hidden";
						scrollviewStyle.overflowY = "scroll";
					}

					if (options.dataLength < options.bufferSize) {
						options.bufferSize = options.dataLength;
					}

					if (options.bufferSize < 1) {
						options.bufferSize = 1;
					}

					// Assign variables to members
					ui.spacer = spacer;
					ui.scrollview = scrollview;
					self.element = element;
					options.orientation = orientation;
				};

				/**
				 * Builds Virtual List structure
				 * @method _buildList
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._buildList = function() {
					var listItem,
						list = this.element,
						numberOfItems = this.options.bufferSize,
						documentFragment = document.createDocumentFragment(),
						touchStartEventBound = _touchStartHandler.bind(null, this),
						orientation = this.options.orientation,
						i;

					for (i = 0; i < numberOfItems; ++i) {
						listItem = document.createElement("li");

						if (orientation === HORIZONTAL) {
							// TODO: check if whiteSpace: nowrap is better for vertical listes
							// NOTE: after rebuild this condition check possible duplication from _init method
							listItem.style.float = "left";
						}

						this._updateListItem(listItem, i);
						documentFragment.appendChild(listItem);
						listItem.addEventListener(POINTER_START, touchStartEventBound, false);
					}

					list.appendChild(documentFragment);
					this._touchStartEventBound = touchStartEventBound;
					this._refresh();
				};

				/**
				 * Refresh list
				 * @method _refresh
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._refresh = function() {
					//Set default value of variable create
					this._refreshScrollbar();
				};

				/**
				 * Loads data from specified index to result set.
				 * @method _loadData
				 * @param {number} index Index of first row
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._loadData = function(index) {
					var self = this,
						children = self.element.firstElementChild;

					if (self._currentIndex !== index) {
						self._currentIndex = index;
						do {
							self._updateListItem(children, index);
							++index;
							children = children.nextElementSibling;
						} while (children);
					}
				};

				/**
				 * Sets proper scrollbar size: height (vertical), width (horizontal)
				 * @method _refreshScrollbar
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._refreshScrollbar = function() {
					var self = this,
						element = self.element,
						options = self.options,
						ui = self.ui,
						spacerStyle = ui.spacer.style,
						bufferSizePx;

					if (options.orientation === VERTICAL) {
						//Note: element.clientHeight is variable
						bufferSizePx = parseFloat(element.clientHeight) || 0;
						spacerStyle.height = (bufferSizePx / options.bufferSize * options.dataLength - bufferSizePx) + "px";
					} else {
						//Note: element.clientWidth is variable
						bufferSizePx = parseFloat(element.clientWidth) || 0;
						spacerStyle.width = (bufferSizePx / options.bufferSize * (options.dataLength - 1) - 4 / 3 * bufferSizePx) + "px";
					}
				};

				/**
				 * Binds VirtualListview events
				 * @method _bindEvents
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._bindEvents = function() {
					var scrollEventBound = _updateList.bind(null, this),
						scrollviewClip = this.ui.scrollview;

					if (scrollviewClip) {
						scrollviewClip.addEventListener("scroll", scrollEventBound, false);
						this._scrollEventBound = scrollEventBound;
					}
				};

				/**
				 * Cleans widget's resources
				 * @method _destroy
				 * @member ns.widget.wearable.VirtualListview
				 * @protected
				 */
				prototype._destroy = function() {
					var self = this,
						scrollviewClip = self.ui.scrollview,
						uiSpacer = self.ui.spacer,
						element = self.element,
						elementStyle = element.style,
						listItem;

					// Restore start position
					elementStyle.position = "static";
					if (self.options.orientation === VERTICAL) {
						elementStyle.top = "auto";
					} else {
						elementStyle.left = "auto";
					}

					if (scrollviewClip) {
						scrollviewClip.removeEventListener("scroll", self._scrollEventBound, false);
					}

					//Remove spacer element
					if (uiSpacer.parentNode) {
						uiSpacer.parentNode.removeChild(uiSpacer);
					}

					//Remove li elements.
					while (element.firstElementChild) {
						listItem = element.firstElementChild;
						listItem.removeEventListener(POINTER_START, self._touchStartEventBound, false);
						element.removeChild(listItem);
					}

				};

				/**
				 * This method scrolls list to defined position in pixels.
				 * @method scrollTo
				 * @param {number} position Scroll position expressed in pixels.
				 * @member ns.widget.wearable.VirtualListview
				 */
				prototype.scrollTo = function(position) {
					this.ui.scrollview.scrollTop = position;
				};

				/**
				 * This method scrolls list to defined index.
				 * @method scrollToIndex
				 * @param {number} index Scroll Destination index.
				 * @member ns.widget.wearable.VirtualListview
				 */
				prototype.scrollToIndex = function(index) {
					if (index < 0) {
						index = 0;
					}
					if (index >= this.options.dataLength) {
						index = this.options.dataLength - 1;
					}
					_updateScrollInfo(this);
					_orderElementsByIndex(this, index);
				};

				/**
				 * This method builds widget and trigger event "draw".
				 * @method draw
				 * @member ns.widget.wearable.VirtualListview
				 */
				prototype.draw = function() {
					this._buildList();
					this.trigger("draw");
				};

				/**
				 * This method sets list item updater function.
				 * To learn how to create list item updater function please
				 * visit Virtual List User Guide.
				 * @method setListItemUpdater
				 * @param {Object} updateFunction Function reference.
				 * @member ns.widget.wearable.VirtualListview
				 */
				prototype.setListItemUpdater = function(updateFunction) {
					this.options.listItemUpdater = updateFunction;
				};

				// Assign prototype
				VirtualListview.prototype = prototype;

				// definition
				ns.widget.wearable.VirtualListview = VirtualListview;

				engine.defineWidget(
						"VirtualListview",
						"",
						["draw", "setListItemUpdater", "scrollTo", "scrollToIndex"],
						VirtualListview,
						"wearable"
						);
				}(window.document, ns));

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Gesture Namespace
 * Core object enables multi gesture support.
 *
 * @class ns.event.gesture
 */
(function ( ns, window, undefined ) {
	
	
			var Gesture = function( elem, options ) {
				return new ns.event.gesture.Instance( elem, options );
			};

			/**
			 * Default values for Gesture feature
			 * @property {Object} defaults
			 * @property {boolean} [defaults.triggerEvent=false]
			 * @property {number} [defaults.updateVelocityInterval=16]
			 * Interval in which Gesture recalculates current velocity in ms
			 * @property {number} [defaults.estimatedPointerTimeDifference=15]
			 * pause time threshold.. tune the number to up if it is slow
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.defaults = {
				triggerEvent: false,
				updateVelocityInterval: 16,
				estimatedPointerTimeDifference: 15
			};

			/**
			 * Dictionary of orientation
			 * @property {Object} Orientation
			 * @property {1} Orientation.VERTICAL vertical orientation
			 * @property {2} Orientation.HORIZONTAL horizontal orientation
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.Orientation = {
				VERTICAL: "vertical",
				HORIZONTAL: "horizontal"
			};

			/**
			 * Dictionary of direction
			 * @property {Object} Direction
			 * @property {1} Direction.UP up
			 * @property {2} Direction.DOWN down
			 * @property {3} Direction.LEFT left
			 * @property {4} Direction.RIGHT right
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.Direction = {
				UP: "up",
				DOWN: "down",
				LEFT: "left",
				RIGHT: "right"
			};

			/**
			 * Dictionary of gesture events state
			 * @property {Object} Event
			 * @property {"start"} Event.START start
			 * @property {"move"} Event.MOVE move
			 * @property {"end"} Event.END end
			 * @property {"cancel"} Event.CANCEL cancel
			 * @property {"blocked"} Event.BLOCKED blocked
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.Event = {
				START: "start",
				MOVE: "move",
				END: "end",
				CANCEL: "cancel",
				BLOCKED: "blocked"
			};

			/**
			 * Dictionary of gesture events flags
			 * @property {Object} Result
			 * @property {number} [Result.PENDING=1] is pending
			 * @property {number} [Result.RUNNING=2] is running
			 * @property {number} [Result.FINISHED=4] is finished
			 * @property {number} [Result.BLOCK=8] is blocked
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.Result = {
				PENDING: 1,
				RUNNING: 2,
				FINISHED: 4,
				BLOCK: 8
			};

			/**
			 * Create plugin namespace.
			 * @property {Object} plugin
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.plugin = {};

			/**
			 * Create object of Detector
			 * @method createDetector
			 * @param {string} gesture
			 * @param {HTMLElement} eventSender
			 * @param {Object} options
			 * @return {ns.event.gesture.Gesture}
			 * @member ns.event.gesture
			 * @static
			 */
			Gesture.createDetector = function( gesture, eventSender, options ) {
				if ( !Gesture.plugin[gesture] ) {
					throw gesture + " gesture is not supported";
				}
				return new Gesture.plugin[gesture]( eventSender, options );
			};

			ns.event.gesture = Gesture;
			} ( ns, window ) );

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Gesture Utilities
 * Contains helper function to gesture support.
 * @class ns.event.gesture.utils
 */
(function (ns, Math, undefined) {
	
	
				/**
				 * Local alias for {@link ns.event.gesture}
				 * @property {Object}
				 * @member ns.event.gesture.utils
				 * @private
				 * @static
				 */
			var Gesture = ns.event.gesture;

			Gesture.utils = {

				/**
				 * Get center from array of touches
				 * @method getCenter
				 * @param {Event[]} touches description
				 * @member ns.event.gesture.utils
				 * @return {Object} position
				 * @return {number} return.clientX position X
				 * @return {number} return.clientY position Y
				 */
				getCenter: function (touches) {
					var valuesX = [], valuesY = [];

					[].forEach.call(touches, function(touch) {
						// I prefer clientX because it ignore the scrolling position
						valuesX.push(!isNaN(touch.clientX) ? touch.clientX : touch.pageX);
						valuesY.push(!isNaN(touch.clientY) ? touch.clientY : touch.pageY);
					});

					return {
						clientX: (Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2,
						clientY: (Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2
					};
				},

				/**
				 * Get velocity
				 * @method getVelocity
				 * @param {number} delta_time Delta of time
				 * @param {number} delta_x Position change on x axis
				 * @param {number} delta_y Position change on y axis
				 * @return {Object} velocity
				 * @return {number} return.x velocity on X axis
				 * @return {number} return.y velocity on Y axis
				 * @member ns.event.gesture.utils
				 */
				getVelocity: function (delta_time, delta_x, delta_y) {
					return {
						x: Math.abs(delta_x / delta_time) || 0,
						y: Math.abs(delta_y / delta_time) || 0
					};
				},

				/**
				 * Get angel between position of two touches
				 * @method getAngle
				 * @param {Event} touch1 first touch
				 * @param {Event} touch2 second touch
				 * @return {number} angel (deg)
				 * @member ns.event.gesture.utils
				 */
				getAngle: function (touch1, touch2) {
					var y = touch2.clientY - touch1.clientY,
						x = touch2.clientX - touch1.clientX;
					return Math.atan2(y, x) * 180 / Math.PI;
				},

				/**
				 * Get direction indicated by position of two touches
				 * @method getDirectiqon
				 * @param {Event} touch1 first touch
				 * @param {Event} touch2 second touch
				 * @return {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN}
				 * @member ns.event.gesture.utils
				 */
				getDirection: function (touch1, touch2) {
					var x = Math.abs(touch1.clientX - touch2.clientX),
						y = Math.abs(touch1.clientY - touch2.clientY);

					if (x >= y) {
						return touch1.clientX - touch2.clientX > 0 ? Gesture.Direction.LEFT : Gesture.Direction.RIGHT;
					}
					return touch1.clientY - touch2.clientY > 0 ? Gesture.Direction.UP : Gesture.Direction.DOWN;
				},

				/**
				 * Get distance indicated by position of two touches
				 * @method getDistance
				 * @param {Event} touch1 first touch
				 * @param {Event} touch2 second touch
				 * @return {number} distance
				 * @member ns.event.gesture.utils
				 */
				getDistance: function (touch1, touch2) {
					var x = touch2.clientX - touch1.clientX,
						y = touch2.clientY - touch1.clientY;
					return Math.sqrt((x * x) + (y * y));
				},

				/**
				 * Get scale indicated by position of the first and the last touch
				 * @method getScale
				 * @param {Event} start start touch
				 * @param {Event} end end touch
				 * @return {number} scale
				 * @member ns.event.gesture.utils
				 */
				getScale: function (start, end) {
					// need two fingers...
					if (start.length >= 2 && end.length >= 2) {
						return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
					}
					return 1;
				},

				/**
				 * Get value of rotation indicated by position
				 * of the first and the last touch
				 * @method getRotation
				 * @param {Event} start start touch
				 * @param {Event} end end touch
				 * @return {number} angle (deg)
				 * @member ns.event.gesture.utils
				 */
				getRotation: function (start, end) {
					// need two fingers
					if (start.length >= 2 && end.length >= 2) {
						return this.getAngle(end[1], end[0]) -
							this.getAngle(start[1], start[0]);
					}
					return 0;
				},

				/**
				 * Check if the direction is vertical
				 * @method isVertical
				 * @param {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} direction start touch
				 * @return {boolean}
				 * @member ns.event.gesture.utils
				 */
				isVertical: function (direction) {
					return direction === Gesture.Direction.UP || direction === Gesture.Direction.DOWN;
				},

				/**
				 * Check if the direction is horizontal
				 * @method isHorizontal
				 * @param {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} direction start touch
				 * @return {boolean}
				 * @member ns.event.gesture.utils
				 */
				isHorizontal: function (direction) {
					return direction === Gesture.Direction.LEFT || direction === Gesture.Direction.RIGHT;
				},

				/**
				 * Check if the direction is horizontal
				 * @method getOrientation
				 * @param {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} direction
				 * @return {boolean}
				 * @member ns.event.gesture.utils
				 */
				getOrientation: function (direction) {
					return this.isVertical(direction) ? Gesture.Orientation.VERTICAL : Gesture.Orientation.HORIZONTAL;
				}
			};
			} (ns, window.Math));

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Gesture.Detector class
 * Base class for create detectors in gestures.
 *
 * @class ns.event.gesture.Detector
 */
( function ( ns, window, undefined ) {
	
					/**
				 * Local alias for {@link ns.event.gesture}
				 * @property {Object}
				 * @member ns.event.gesture.Manager
				 * @private
				 * @static
				 */
			var Gesture = ns.event.gesture,
				/**
				 * Alias for method {@link ns.util.object.merge}
				 * @property {Function} objectMerge
				 * @member ns.event.gesture.Detector
				 * @private
				 * @static
				 */
				objectMerge = ns.util.object.merge,

				Detector = function( strategy, sender ) {
					this.sender = sender;
					this.strategy = strategy.create();
					this.name = this.strategy.name;
					this.index = this.strategy.index || 100;
					this.options = this.strategy.options || {};
				};

			/**
			 * Start of gesture detection of given type
			 * @method detect
			 * @param {string} gestureEvent
			 * @return {Object}
			 * @member ns.event.gesture.Detector
			 */
			Detector.prototype.detect = function( gestureEvent ) {
				return this.strategy.handler( gestureEvent, this.sender, this.strategy.options );
			};

			Detector.Sender = {
				sendEvent: function(/* eventName, detail */) {}
			};

			/**
			 * Create plugin namespace.
			 * @property {Object} plugin
			 * @member ns.event.gesture.Detector
			 */
			Detector.plugin = {};

			/**
			 * Methods creates plugin
			 * @method create
			 * @param {Object} gestureHandler
			 * @return {ns.event.gesture.Detector} gestureHandler
			 * @member ns.event.gesture.Detector.plugin
			 */
			Detector.plugin.create = function( gestureHandler ) {

				if ( !gestureHandler.types ) {
					gestureHandler.types = [ gestureHandler.name ];
				}

				var detector = Detector.plugin[ gestureHandler.name ] = function( options ) {
					this.options = objectMerge({}, gestureHandler.defaults, options);
				};

				detector.prototype.create = function() {
					return objectMerge({
						options: this.options
					}, gestureHandler);
				};

				return detector;
			};

			// definition
			Gesture.Detector = Detector;

			} ( ns, window ));

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Gesture.Manager class
 * Main class controls all gestures.
 * @class ns.event.gesture.Manager
 */
( function ( ns, window, document) {
	
	
				/**
				 * Local alias for {@link ns.event.gesture}
				 * @property {Object}
				 * @member ns.event.gesture.Manager
				 * @private
				 * @static
				 */
			var Gesture = ns.event.gesture,

				/**
				 * Alias for method {@link ns.util.object.merge}
				 * @property {Function} objectMerge
				 * @member ns.event.gesture.Manager
				 * @private
				 * @static
				 */
				objectMerge = ns.util.object.merge,

				/**
				 * Device has touchable interface
				 * @property {boolean} TOUCH_DEVICE
				 * @member ns.event.gesture.Manager
				 * @private
				 * @static
				 */
				TOUCH_DEVICE = "ontouchstart" in window;

			Gesture.Manager = (function() {
				var instance = null,

				isReadyDetecting = false,
				blockMouseEvent = false,

				Manager = function() {

					this.instances = [];
					this.gestureDetectors = [];
					this.runningDetectors = [];
					this.detectorRequestedBlock = null;

					this.unregisterBlockList = [];

					this.gestureEvents = null;
					this.velocity = null;
				};

				Manager.prototype = {
					/**
					 * Bind start events
					 * @method _bindStartEvents
					 * @param {ns.event.gesture.Instance} instance gesture instance
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_bindStartEvents: function( instance ) {
						var element = instance.getElement();
						if ( TOUCH_DEVICE ) {
							element.addEventListener( "touchstart", this);
						}

						element.addEventListener( "mousedown", this);
					},

					/**
					 * Bind move, end and cancel events
					 * @method _bindEvents
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_bindEvents: function( ) {
						if ( TOUCH_DEVICE ) {
							document.addEventListener( "touchmove", this);
							document.addEventListener( "touchend", this);
							document.addEventListener( "touchcancel", this);
						}

						document.addEventListener( "mousemove", this);
						document.addEventListener( "mouseup", this);
					},

					/**
					 * Unbind start events
					 * @method _unbindStartEvents
					 * @param {ns.event.gesture.Instance} instance gesture instance
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_unbindStartEvents: function( instance ) {
						var element = instance.getElement();
						if ( TOUCH_DEVICE ) {
							element.removeEventListener( "touchstart", this);
						}

						element.removeEventListener( "mousedown", this);
					},

					/**
					 * Unbind move, end and cancel events
					 * @method _bindEvents
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_unbindEvents: function() {
						if ( TOUCH_DEVICE ) {
							document.removeEventListener( "touchmove", this);
							document.removeEventListener( "touchend", this);
							document.removeEventListener( "touchcancel", this);
						}

						document.removeEventListener( "mousemove", this);
						document.removeEventListener( "mouseup", this);
					},

					/**
					 * Handle event
					 * @method handleEvent
					 * @param {Event} event
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					/* jshint -W086 */
					handleEvent: function( event ) {
						var eventType = event.type.toLowerCase();

						if ( eventType.match(/touch/) ) {
							blockMouseEvent = true;
						}

						if ( eventType.match(/mouse/) &&
							( blockMouseEvent || event.which !== 1 ) ) {
							return;
						}

						switch ( event.type ) {
							case "mousedown":
							case "touchstart":
								this._start( event );
								break;
							case "mousemove":
							case "touchmove":
								this._move( event );
								break;
							case "mouseup":
							case "touchend":
								this._end( event );
								break;
							case "touchcancel":
								this._cancel( event );
								break;
						}
					},

					/**
					 * Handler for gesture start
					 * @method _start
					 * @param {Event} event
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_start: function( event ) {
						var elem = event.currentTarget,
							startEvent, detectors = [];

						if ( !isReadyDetecting ) {
							this._resetDetecting();
							this._bindEvents();

							startEvent = this._createDefaultEventData( Gesture.Event.START, event );

							this.gestureEvents = {
								start: startEvent,
								last: startEvent
							};

							this.velocity = {
								event: startEvent,
								x: 0,
								y: 0
							};
						}

						isReadyDetecting = true;

						startEvent = objectMerge(startEvent, this._createGestureEvent(Gesture.Event.START, event));

						this.instances.forEach(function( instance ) {
							if ( instance.getElement() === elem ) {
								detectors = detectors.concat( instance.getGestureDetectors() );
							}
						}, this);

						detectors.sort(function(a, b) {
							if(a.index < b.index) {
								return -1;
							} else if(a.index > b.index) {
								return 1;
							}
							return 0;
						});

						this.gestureDetectors = this.gestureDetectors.concat( detectors );

						this._detect(detectors, startEvent);
					},

					/**
					 * Handler for gesture move
					 * @method _move
					 * @param {Event} event
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_move: function( event ) {
						if ( !isReadyDetecting ) {
							return;
						}

						event = this._createGestureEvent(Gesture.Event.MOVE, event);
						this._detect(this.gestureDetectors, event);

						this.gestureEvents.last = event;
					},

					/**
					 * Handler for gesture end
					 * @method _end
					 * @param {Event} event
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_end: function( event ) {

						event = objectMerge(
							{},
							this.gestureEvents.last,
							this._createDefaultEventData(Gesture.Event.END, event)
						);

						if ( event.pointers.length > 0 ) {
							return;
						}

						this._detect(this.gestureDetectors, event);

						this.unregisterBlockList.forEach(function( instance ) {
							this.unregist( instance );
						}, this);

						this._resetDetecting();
						blockMouseEvent = false;
					},

					/**
					 * Handler for gesture cancel
					 * @method _cancel
					 * @param {Event} event
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_cancel: function( event ) {

						event = objectMerge(
							{},
							this.gestureEvents.last,
							this._createDefaultEventData(Gesture.Event.CANCEL, event)
						);

						this._detect(this.gestureDetectors, event);

						this.unregisterBlockList.forEach(function( instance ) {
							this.unregist( instance );
						}, this);

						this._resetDetecting();
						blockMouseEvent = false;
					},

					/**
					 * Detect gesture
					 * @method _detect
					 * @param {Event} event
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_detect: function( detectors, event ) {
						var finishedDetectors = [];

						detectors.forEach(function( detector ) {
							var result;

							if ( this.detectorRequestedBlock ) {
								return;
							}

							result = detector.detect( event );
							if ( result & Gesture.Result.RUNNING ) {
								if ( this.runningDetectors.indexOf( detector ) < 0 ) {
									this.runningDetectors.push( detector );
								}
							}

							if ( result & Gesture.Result.FINISHED ) {
								finishedDetectors.push( detector );
							}

							if ( result & Gesture.Result.BLOCK ) {
								this.detectorRequestedBlock = detector;
							}

						}, this);

						// remove finished detectors.
						finishedDetectors.forEach(function( detector ) {
							var idx;

							idx = this.gestureDetectors.indexOf( detector );
							if ( idx > -1 ) {
								this.gestureDetectors.splice(idx, 1);
							}

							idx = this.runningDetectors.indexOf( detector );
							if ( idx > -1 ) {
								this.runningDetectors.splice(idx, 1);
							}
						}, this);

						// remove all detectors except the detector that return block result
						if ( this.detectorRequestedBlock ) {
							// send to cancel event.
							this.runningDetectors.forEach(function( detector ) {
								var cancelEvent = objectMerge({}, event, {
									eventType: Gesture.Event.BLOCKED
								});
								detector.detect( cancelEvent );
							});
							this.runningDetectors.length = 0;

							// remove all detectors.
							this.gestureDetectors.length = 0;
							if ( finishedDetectors.indexOf( this.detectorRequestedBlock ) < 0 ) {
								this.gestureDetectors.push( this.detectorRequestedBlock );
							}
						}
					},

					/**
					 * Reset of gesture manager detector
					 * @method _resetDetecting
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_resetDetecting: function() {
						isReadyDetecting = false;

						this.gestureDetectors.length = 0;
						this.runningDetectors.length = 0;
						this.detectorRequestedBlock = null;

						this.gestureEvents = null;
						this.velocity = null;

						this._unbindEvents();
					},

					/**
					 * Create default event data
					 * @method _createDefaultEventData
					 * @param {string} type event type
					 * @param {Event} event source event
					 * @return {Object} default event data
					 * @return {string} return.eventType
					 * @return {number} return.timeStamp
					 * @return {Touch} return.pointer
					 * @return {TouchList} return.pointers
					 * @return {Event} return.srcEvent
					 * @return {Function} return.preventDefault
					 * @return {Function} return.stopPropagation
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_createDefaultEventData: function( type, event ) {
						var pointers = event.touches ?
								event.touches :
									event.type === "mouseup" ? [] : ( event.identifier=1 && [event] ),
							pointer = pointers[0],
							timeStamp = new Date().getTime();

						return {
							eventType: type,
							timeStamp: timeStamp,
							pointer: pointer,
							pointers: pointers,

							srcEvent: event,
							preventDefault: function() {
								this.srcEvent.preventDefault();
							},
							stopPropagation: function() {
								this.srcEvent.stopPropagation();
							}
						};
					},

					/**
					 * Create gesture event
					 * @method _createGestureEvent
					 * @param {string} type event type
					 * @param {Event} event source event
					 * @return {Object} gesture event consist from Event class and additional properties
					 * @return {number} return.deltaTime
					 * @return {number} return.deltaX
					 * @return {number} return.deltaY
					 * @return {number} return.velocityX
					 * @return {number} return.velocityY
					 * @return {number} return.estimatedX
					 * @return {number} return.estimatedY
					 * @return {number} return.estimatedDeltaX
					 * @return {number} return.estimatedDeltaY
					 * @return {number} return.distance
					 * @return {number} return.angle
					 * @return {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} return.direction
					 * @return {number} return.scale
					 * @return {number} return.rotation (deg)
					 * @return {Event} return.startEvent
					 * @return {Event} return.lastEvent
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_createGestureEvent: function( type, event ) {
						var ev = this._createDefaultEventData( type, event ),
							startEvent = this.gestureEvents.start,
							lastEvent = this.gestureEvents.last,
							velocityEvent = this.velocity.event,
							delta = {
								time: ev.timeStamp - startEvent.timeStamp,
								x: ev.pointer.clientX - startEvent.pointer.clientX,
								y: ev.pointer.clientY - startEvent.pointer.clientY
							},
							deltaFromLast = {
								x: ev.pointer.clientX - lastEvent.pointer.clientX,
								y: ev.pointer.clientY - lastEvent.pointer.clientY
							},
							velocity = this.velocity,
							timeDifference = Gesture.defaults.estimatedPointerTimeDifference, /* pause time threshold.util. tune the number to up if it is slow */
							estimated;

						// reset start event for multi touch
						if( startEvent && ev.pointers.length !== startEvent.pointers.length ) {
							startEvent.pointers = [];
							[].forEach.call(ev.pointers, function( pointer ) {
								startEvent.pointers.push( objectMerge({}, pointer) );
							});
						}

						if ( ev.timeStamp - velocityEvent.timeStamp > Gesture.defaults.updateVelocityInterval ) {
							velocity = Gesture.utils.getVelocity(
									ev.timeStamp - velocityEvent.timeStamp,
									ev.pointer.clientX - velocityEvent.pointer.clientX,
									ev.pointer.clientY - velocityEvent.pointer.clientY
							);

							objectMerge(this.velocity, velocity, {
								event: ev
							});
						}

						estimated = {
							x: Math.round( ev.pointer.clientX + ( timeDifference * velocity.x * (deltaFromLast.x < 0 ? -1 : 1) ) ),
							y: Math.round( ev.pointer.clientY + ( timeDifference * velocity.y * (deltaFromLast.y < 0 ? -1 : 1) ) )
						};

						// Prevent that point goes back even though direction is not changed.
						if ( (deltaFromLast.x < 0 && estimated.x > lastEvent.estimatedX) ||
							(deltaFromLast.x > 0 && estimated.x < lastEvent.estimatedX) ) {
							estimated.x = lastEvent.estimatedX;
						}

						if ( (deltaFromLast.y < 0 && estimated.y > lastEvent.estimatedY) ||
							(deltaFromLast.y > 0 && estimated.y < lastEvent.estimatedY) ) {
							estimated.y = lastEvent.estimatedY;
						}

						objectMerge(ev, {
							deltaTime: delta.time,
							deltaX: delta.x,
							deltaY: delta.y,

							velocityX: velocity.x,
							velocityY: velocity.y,

							estimatedX: estimated.x,
							estimatedY: estimated.y,
							estimatedDeltaX: estimated.x - startEvent.pointer.clientX,
							estimatedDeltaY: estimated.y - startEvent.pointer.clientY,

							distance: Gesture.utils.getDistance(startEvent.pointer, ev.pointer),

							angle: Gesture.utils.getAngle(startEvent.pointer, ev.pointer),

							direction: Gesture.utils.getDirection(startEvent.pointer, ev.pointer),

							scale: Gesture.utils.getScale(startEvent.pointers, ev.pointers),
							rotation: Gesture.utils.getRotation(startEvent.pointers, ev.pointers),

							startEvent: startEvent,
							lastEvent: lastEvent
						});

						return ev;
					},

					/**
					 * Register instance of gesture
					 * @method register
					 * @param {ns.event.gesture.Instance} instance gesture instance
					 * @member ns.event.gesture.Manager
					 */
					register: function( instance ) {
						var idx = this.instances.indexOf( instance );
						if ( idx < 0 ) {
							this.instances.push( instance );
							this._bindStartEvents( instance );
						}
					},

					/**
					 * Unregister instance of gesture
					 * @method unregister
					 * @param {ns.event.gesture.Instance} instance gesture instance
					 * @member ns.event.gesture.Manager
					 */
					unregister: function( instance ) {
						var idx;

						if ( !!this.gestureDetectors.length ) {
							this.unregisterBlockList.push( instance );
							return;
						}

						idx = this.instances.indexOf( instance );
						if ( idx > -1 ) {
							this.instances.splice( idx, 1 );
							this._unbindStartEvents( instance );
						}

						if ( !this.instances.length ) {
							this._destroy();
						}
					},

					/**
					 * Destroy instance of Manager
					 * @method _destroy
					 * @member ns.event.gesture.Manager
					 * @protected
					 */
					_destroy: function() {
						this._resetDetecting();

						this.instances.length = 0;
						this.unregisterBlockList.length = 0;

						blockMouseEvent = false;
						instance = null;
					}

				};

				return {
					getInstance: function() {
						return instance ? instance : ( instance = new Manager() );
					}
				};
			})();
			} ( ns, window, window.document ) );

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Gesture.Instance class
 * Creates instance of gesture manager on element.
 * @class ns.event.gesture.Instance
 */
( function ( ns, window, undefined ) {
	
					/**
				 * Local alias for {@link ns.event.gesture}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
			var Gesture = ns.event.gesture,
				/**
				 * Local alias for {@link ns.event.gesture.Detector}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				Detector = ns.event.gesture.Detector,
				/**
				 * Local alias for {@link ns.event.gesture.Manager}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				Manager = ns.event.gesture.Manager,
				/**
				 * Local alias for {@link ns.event}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				events = ns.event,
				/**
				 * Alias for method {@link ns.util.object.merge}
				 * @property {Function} merge
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				merge = ns.util.object.merge;

			Gesture.Instance = function( element, options ) {

				this.element = element;
				this.eventDetectors = [];

				this.options = merge({}, Gesture.defaults, options);
				this.gestureManager = null;

				this._init();
			};

			Gesture.Instance.prototype = {
				/**
				 * Initialize gesture instance
				 * @method _init
				 * @member ns.event.gesture.Instance
				 * @protected
				 */
				_init: function() {
					this.gestureManager = Manager.getInstance();
					this.eventSender = merge({}, Detector.Sender, {
						sendEvent: this.trigger.bind(this)
					});
				},

				/**
				 * Find gesture detector
				 * @method _findGestureDetector
				 * @param {string} gesture gesture
				 * @member ns.event.gesture.Instance
				 * @protected
				 */
				_findGestureDetector: function( gesture ) {
					var detectors = Detector.plugin,
						detector, name;
					for ( name in detectors ) {
						if ( detectors.hasOwnProperty( name ) ) {
							detector = detectors[ name ];
							if ( detector.prototype.types.indexOf( gesture ) > -1 ) {
								return detector;
							}
						}
					}
				},

				/**
				 * Set options
				 * @method setOptions
				 * @param {Object} options options
				 * @chainable
				 * @member ns.event.gesture.Instance
				 */
				setOptions: function( options ) {
					merge(this.options, options);
					return this;
				},

				/**
				 * Add detector
				 * @method addDetector
				 * @param {Object} detectorStrategy strategy
				 * @chainable
				 * @member ns.event.gesture.Instance
				 */
				addDetector: function( detectorStrategy ) {
					var detector = new Detector( detectorStrategy, this.eventSender ),
						alreadyHasDetector = !!this.eventDetectors.length;

					this.eventDetectors.push(detector);

					if ( !!this.eventDetectors.length && !alreadyHasDetector ) {
						this.gestureManager.register(this);
					}

					return this;
				},

				/**
				 * Remove detector
				 * @method removeDetector
				 * @param {Object} detectorStrategy strategy
				 * @chainable
				 * @member ns.event.gesture.Instance
				 */
				removeDetector: function( detectorStrategy ) {
					var idx = this.eventDetectors.indexOf( detectorStrategy );

					if ( idx > -1 ) {
						this.eventDetectors.splice(idx, 1);
					}

					if ( !this.eventDetectors.length ) {
						this.gestureManager.unregister(this);
					}

					return this;
				},

				/**
				 * Triggers the gesture event
				 * @method trigger
				 * @param {string} gesture gesture name
				 * @param {Object} eventInfo data provided to event object
				 * @member ns.event.gesture.Instance
				 */
				trigger: function( gesture, eventInfo ) {
					events.trigger(this.element, gesture, eventInfo);
				},

				/**
				 * Get HTML element assigned to gesture event instance
				 * @method getElement
				 * @member ns.event.gesture.Instance
				 */
				getElement: function() {
					return this.element;
				},

				/**
				 * Get gesture event detectors assigned to instance
				 * @method getGestureDetectors
				 * @member ns.event.gesture.Instance
				 */
				getGestureDetectors: function() {
					return this.eventDetectors;
				},

				/**
				 * Destroy instance
				 * @method destroy
				 * @member ns.event.gesture.Instance
				 */
				destroy: function( ) {
					this.element = null;
					this.eventHandlers = {};
					this.gestureManager = null;
					this.eventSender = null;
					this.eventDetectors.length = 0;
				}
			};
			} ( ns, window ) );

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * # Gesture Plugin: drag
 * Plugin enables drag event.
 *
 * @class ns.event.gesture.Drag
 */
( function ( ns, window, undefined ) {
	
	
				/**
				 * Local alias for {@link ns.event.gesture}
				 * @property {Object}
				 * @member ns.event.gesture.Drag
				 * @private
				 * @static
				 */
			var Gesture = ns.event.gesture,
				/**
				 * Local alias for {@link ns.event.gesture.Detector}
				 * @property {Object}
				 * @member ns.event.gesture.Drag
				 * @private
				 * @static
				 */
				Detector = ns.event.gesture.Detector,
				/**
				 * Alias for method {@link ns.util.object.merge}
				 * @property {Function} merge
				 * @member ns.event.gesture.Drag
				 * @private
				 * @static
				 */
				merge = ns.util.object.merge,

				// TODO UA test will move to support.
				tizenBrowser = !!window.navigator.userAgent.match(/tizen/i);

			ns.event.gesture.Drag = Detector.plugin.create({

				/**
				 * Gesture name
				 * @property {string} [name="drag"]
				 * @member ns.event.gesture.Drag
				 */
				name: "drag",

				/**
				 * Gesture Index
				 * @property {number} [index=400]
				 * @member ns.event.gesture.Drag
				 */
				index: 500,

				/**
				 * Array of posible drag events
				 * @property {string[]} types
				 * @member ns.event.gesture.Drag
				 */
				types: ["drag", "dragstart", "dragend", "dragcancel"],

				/**
				 * Default values for drag gesture
				 * @property {Object} defaults
				 * @property {boolean} [defaults.blockHorizontal=false]
				 * @property {boolean} [defaults.blockVertical=false]
				 * @property {number} [defaults.threshold=10]
				 * @property {number} [defaults.angleThreshold=20]
				 * @property {number} [defaults.delay=0]
				 * @member ns.event.gesture.Drag
				 */
				defaults: {
					blockHorizontal: false,
					blockVertical: false,
					threshold: 10,
					angleThreshold: 20,
					delay: 0
				},

				/**
				 * Triggered
				 * @property {boolean} [triggerd=false]
				 * @member ns.event.gesture.Drag
				 */
				triggerd: false,

				/**
				 * Handler for drag gesture
				 * @method handler
				 * @param {Event} gestureEvent gesture event
				 * @param {Object} sender event's sender
				 * @param {Object} options options
				 * @return {ns.event.gesture.Result.PENDING|ns.event.gesture.Result.END|ns.event.gesture.Result.FINISHED|ns.event.gesture.Result.BLOCK}
				 * @member ns.event.gesture.Drag
				 */
				handler: function( gestureEvent, sender, options ) {
					var ge = gestureEvent,
						threshold = options.threshold,
						angleThreshold = options.angleThreshold,
						result = Gesture.Result.PENDING,
						event = {
							drag: this.types[0],
							start: this.types[1],
							end: this.types[2],
							cancel: this.types[3]
						},
						direction = ge.direction,
						angle = Math.abs(ge.angle);

					if ( !this.triggerd && ge.eventType === Gesture.Event.MOVE ) {
						if ( Math.abs(ge.deltaX) < threshold && Math.abs(ge.deltaY) < threshold ) {
							if ( !tizenBrowser ) {
								ge.preventDefault();
							}
							return Gesture.Result.PENDING;
						}

						if ( options.delay && ge.deltaTime < options.delay ) {
							if ( !tizenBrowser ) {
								ge.preventDefault();
							}
							return Gesture.Result.PENDING;
						}

						if ( options.blockHorizontal && Gesture.utils.isHorizontal( ge.direction ) ||
							options.blockVertical && Gesture.utils.isVertical( ge.direction ) ) {
							return Gesture.Result.FINISHED;
						}

						if ( options.blockHorizontal && ( angle < 90 - angleThreshold || angle > 90 + angleThreshold ) ) {
							return Gesture.Result.FINISHED;
						}

						if ( options.blockVertical && ( angle > 0 + angleThreshold && angle < 180 - angleThreshold ) ) {
							return Gesture.Result.FINISHED;
						}

						this.fixedStartPointX = 0;
						this.fixedStartPointY = 0;
						if ( Gesture.utils.isHorizontal( ge.direction ) ) {
							this.fixedStartPointX = ( ge.deltaX < 0 ? 1 : -1 ) * threshold;
						} else {
							this.fixedStartPointY = ( ge.deltaY < 0 ? 1 : -1 ) * threshold;
						}
					}

					if ( options.blockHorizontal ) {
						direction = ge.deltaY < 0 ? Gesture.Direction.UP : Gesture.Direction.DOWN;
					}

					if ( options.blockVertical ) {
						direction = ge.deltaX < 0 ? Gesture.Direction.LEFT : Gesture.Direction.RIGHT;
					}

					ge = merge({}, ge, {
						deltaX: ge.deltaX + this.fixedStartPointX,
						deltaY: ge.deltaY + this.fixedStartPointY,
						estimatedDeltaX: ge.estimatedDeltaX + this.fixedStartPointX,
						estimatedDeltaY: ge.estimatedDeltaY + this.fixedStartPointY,

						direction: direction
					});

					switch( ge.eventType ) {
						case Gesture.Event.START:
							this.triggerd = false;
							break;
						case Gesture.Event.MOVE:

							result = Gesture.Result.RUNNING;
							if ( !this.triggerd ) {
								sender.sendEvent( event.start, ge );
							}
							sender.sendEvent( event.drag, ge );
							ge.preventDefault();
							this.triggerd = true;
							break;

						case Gesture.Event.BLOCKED:
						case Gesture.Event.END:

							result = Gesture.Result.FINISHED;
							if ( this.triggerd ) {
								sender.sendEvent( event.end, ge );
								ge.preventDefault();
								this.triggerd = false;
							}
							break;

						case Gesture.Event.CANCEL:

							result = Gesture.Result.FINISHED;
							if ( this.triggerd ) {
								sender.sendEvent( event.cancel, ge );
								ge.preventDefault();
								this.triggerd = false;
							}
							break;

					}

					return result;
				}
			});
			} ( ns, window ) );

/*global ns, window, define */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Gesture Plugin: swipe
 * Plugin enables swipe event.
 *
 * @class ns.event.gesture.Swipe
 */
( function ( ns, window, undefined ) {
	
    
				/**
				 * Local alias for {@link ns.event.gesture}
				 * @property {Object}
				 * @member ns.event.gesture.Swipe
				 * @private
				 * @static
				 */
			var Gesture = ns.event.gesture,
				/**
				 * Local alias for {@link ns.event.gesture.Detector}
				 * @property {Object}
				 * @member ns.event.gesture.Swipe
				 * @private
				 * @static
				 */
				Detector = ns.event.gesture.Detector;

			ns.event.gesture.Swipe = Detector.plugin.create({
				/**
				 * Gesture name
				 * @property {string} [name="swipe"]
				 * @member ns.event.gesture.Swipe
				 */
				name: "swipe",

				/**
				 * Gesture Index
				 * @property {number} [index=400]
				 * @member ns.event.gesture.Swipe
				 */
				index: 400,

				/**
				 * Default values for swipe gesture
				 * @property {Object} defaults
				 * @property {number} [defaults.timeThreshold=400]
				 * @property {number} [defaults.velocity=0.6]
				 * @property {ns.event.gesture.HORIZONTAL|ns.event.gesture.VERTICAL} [defaults.orientation=ns.event.gesture.HORIZONTAL]
				 * @member ns.event.gesture.Swipe
				 */
				defaults: {
					timeThreshold: 400,
					velocity: 0.6,
					orientation: Gesture.Orientation.HORIZONTAL
				},

				/**
				 * Handler for swipe gesture
				 * @method handler
				 * @param {Event} gestureEvent gesture event
				 * @param {Object} sender event's sender
				 * @param {Object} options options
				 * @return {ns.event.gesture.Result.PENDING|ns.event.gesture.Result.END|ns.event.gesture.Result.FINISHED|ns.event.gesture.Result.BLOCK}
				 * @member ns.event.gesture.Swipe
				 */
				handler: function( gestureEvent, sender, options ) {
					var ge = gestureEvent,
						result = Gesture.Result.PENDING;

					if ( ge.eventType !== Gesture.Event.END ) {
						return result;
					}

					if ( ( ge.deltaTime > options.timeThreshold ) ||
						( options.orientation !== Gesture.utils.getOrientation( ge.direction ) ) ) {
						result = Gesture.Result.FINISHED;
						return result;
					}

					if( ge.velocityX > options.velocity || ge.velocityY > options.velocity ) {
						sender.sendEvent( this.name, gestureEvent );
						result = Gesture.Result.FINISHED | Gesture.Result.BLOCK;
					}

					return result;
				}
			});
			} ( ns, window ) );

/*global window, define, CustomEvent */
/*jslint nomen: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @class ns.event.gesture
 */
(function (ns) {
	
				var instances = [],
				gesture = ns.event.gesture || {};

			/**
			 * Find instance by element
			 * @method findInstance
			 * @param {HTMLElement} element
			 * @return {ns.event.gesture.Instance}
			 * @member ns.event
			 * @static
			 * @private
			 */
			function findInstance(element) {
				var instance;
				instances.forEach(function(item) {
					if (item.element === element) {
						instance = item.instance;
					}
				});
				return instance;
			}

			/**
			 * Remove instance from instances by element
			 * @method removeInstance
			 * @param {HTMLElement} element
			 * @member ns.event
			 * @static
			 * @private
			 */
			function removeInstance(element) {
				instances.forEach(function(item, key) {
					if (item.element === element) {
						instances.splice(key, 1);
					}
				});
			}

			/**
			 * Enable gesture handlingo on given HTML element or object
			 * @method enableGesture
			 * @param {HTMLElement} element
			 * @param {...Object} [gesture] Gesture object {@link ns.event.gesture}
			 * @member ns.event
			 */
			ns.event.enableGesture = function() {
				var element = arguments[0],
					gestureInstance = findInstance( element ),
					length = arguments.length,
					i = 1;

				if ( !gestureInstance ) {
					gestureInstance = new gesture.Instance(element);
					instances.push({element: element, instance: gestureInstance});
				}

				for ( ; i < length; i++ ) {
					gestureInstance.addDetector( arguments[i] );
				}
			};

			/**
			 * Disable gesture handling from given HTML element or object
			 * @method disableGesture
			 * @param {HTMLElement} element
			 * @param {...Object} [gesture] Gesture object {@link ns.event.gesture}
			 * @member ns.event
			 */
			ns.event.disableGesture = function() {
				var element = arguments[0],
					gestureInstance = findInstance( element ),
					length = arguments.length,
					i = 1;

				if ( !gestureInstance ) {
					return;
				}

				if ( length > 1 ) {
					gestureInstance.removeDetector( arguments[i] );
				} else {
					gestureInstance.destroy();
					removeInstance( element );
				}
			};

			ns.event.gesture = gesture;
			}(ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Scroller namespace
 * Namespace contains classes and objects connected with scroller widget.
 * @class ns.widget.wearable.scroller
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, ns) {
	
				ns.widget.wearable.scroller = ns.widget.wearable.scroller || {};
			}(window, ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * #Effect namespace
 * Namespace with effects for scroller widget.
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @class ns.widget.wearable.scroller.effect
 */
(function (window, ns) {
	
				ns.widget.wearable.scroller.effect = ns.widget.wearable.scroller.effect || {};
			}(window, ns));

/*global window, define, Event, console, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * # Bouncing effect
 * Bouncing effect for scroller widget.
 * @class ns.widget.wearable.scroller.effect.Bouncing
 * @since 2.3
 */
(function (document, ns) {
	
				// scroller.start event trigger when user try to move scroller
			var Bouncing = function (scrollerElement, options) {
					this.orientation = null;
					this.maxValue = null;

					this.container = null;
					this.minEffectElement = null;
					this.maxEffectElement = null;
				/**
				 * target element for bouncing effect
				 * @property {HTMLElement} targetElement
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
					this.targetElement = null;

					this.isShow = false;
					this.isDrag = false;
					this.isShowAnimating = false;
					this.isHideAnimating = false;

					this._create(scrollerElement, options);
				};

			Bouncing.prototype = {
				options: {
					className: "ui-scrollbar-bouncing-effect",
					duration: 500
				},

				_create: function (scrollerElement, options) {
					this.container = scrollerElement;

					this.orientation = options.orientation;
					this.maxValue = this._getValue( options.maxScrollX, options.maxScrollY );

					this._initLayout();
				},

				_initLayout: function() {
					var minElement = this.minEffectElement = document.createElement("DIV"),
						maxElement = this.maxEffectElement = document.createElement("DIV"),
						className = this.options.className;

					if ( this.orientation === ns.widget.wearable.scroller.Scroller.Orientation.HORIZONTAL ) {
						minElement.className = className + " ui-left";
						maxElement.className = className + " ui-right";
					} else {
						minElement.className = className + " ui-top";
						maxElement.className = className + " ui-bottom";
					}

					this.container.appendChild( minElement );
					this.container.appendChild( maxElement );

					minElement.addEventListener("webkitAnimationEnd", this);
					maxElement.addEventListener("webkitAnimationEnd", this);
				},

				/**
				 * ...
				 * @method drag
				 * @param x
				 * @param y
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
				drag: function( x, y ) {
					this.isDrag = true;
					this._checkAndShow( x, y );
				},

				/**
				 * ...
				 * @method dragEnd
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
				dragEnd: function() {
					if ( this.isShow && !this.isShowAnimating && !this.isHideAnimating ) {
						this._beginHide();
					}

					this.isDrag = false;
				},

				/**
				 * Shows effect.
				 * @method show
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
				show: function() {
					if ( this.targetElement ) {
						this.isShow = true;
						this._beginShow();
					}
				},

				/**
				 * Hides effect.
				 * @method hide
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
				hide: function() {
					if ( this.isShow ) {
						this.minEffectElement.style.display = "none";
						this.maxEffectElement.style.display = "none";
						this.targetElement.classList.remove("ui-hide");
						this.targetElement.classList.remove("ui-show");
					}
					this.isShow = false;
					this.isShowAnimating = false;
					this.isHideAnimating = false;
					this.targetElement = null;
				},

				_checkAndShow: function( x, y ) {
					var val = this._getValue(x, y);
					if ( !this.isShow ) {
						if ( val >= 0 ) {
							this.targetElement = this.minEffectElement;
							this.show();
						} else if ( val <= this.maxValue ) {
							this.targetElement = this.maxEffectElement;
							this.show();
						}

					} else if ( this.isShow && !this.isDrag && !this.isShowAnimating && !this.isHideAnimating ) {
						this._beginHide();
					}
				},

				_getValue: function(x, y) {
					return this.orientation === ns.widget.wearable.scroller.Scroller.Orientation.HORIZONTAL ? x : y;
				},

				_beginShow: function() {
					if ( !this.targetElement || this.isShowAnimating ) {
						return;
					}

					this.targetElement.style.display = "block";

					this.targetElement.classList.remove("ui-hide");
					this.targetElement.classList.add("ui-show");

					this.isShowAnimating = true;
					this.isHideAnimating = false;
				},

				_finishShow: function() {
					this.isShowAnimating = false;
					if ( !this.isDrag ) {
						this.targetElement.classList.remove("ui-show");
						this._beginHide();
					}
				},

				_beginHide: function() {
					if ( this.isHideAnimating ) {
						return;
					}

					this.targetElement.classList.remove("ui-show");
					this.targetElement.classList.add("ui-hide");

					this.isHideAnimating = true;
					this.isShowAnimating = false;
				},

				_finishHide: function() {
					this.isHideAnimating = false;
					this.targetElement.classList.remove("ui-hide");
					this.hide();
					this._checkAndShow();
				},

				/**
				 * Supports events.
				 * @method handleEvent
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
				handleEvent: function( event ) {
					if (event.type === "webkitAnimationEnd") {
						if ( this.isShowAnimating ) {
							this._finishShow();
						} else if ( this.isHideAnimating ) {
							this._finishHide();
						}
					}
				},

				/**
				 * Destroys effect.
				 * @method destroy
				 * @member ns.widget.wearable.scroller.effect.Bouncing
				 */
				destroy: function() {
					this.minEffectElement.removeEventListener("webkitAnimationEnd", this);
					this.maxEffectElement.removeEventListener("webkitAnimationEnd", this);

					this.container.removeChild( this.minEffectElement );
					this.container.removeChild( this.maxEffectElement );

					this.container = null;
					this.minEffectElement = null;
					this.maxEffectElement = null;
					this.targetElement = null;

					this.isShow = null;
					this.orientation = null;
					this.maxValue = null;
				}
			};

			ns.widget.wearable.scroller.effect.Bouncing = Bouncing;
			}(window.document, ns));

/*global window, define, Event, console, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * # Scroller Widget
 * Widget creates scroller on content.
 * @class ns.widget.wearable.scroller.Scroller
 * @since 2.3
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				// scroller.start event trigger when user try to move scroller
			var BaseWidget = ns.widget.BaseWidget,
				Gesture = ns.event.gesture,
				engine = ns.engine,
				utilsObject = ns.util.object,
				utilsEvents = ns.event,
				eventTrigger = utilsEvents.trigger,
				prototype = new BaseWidget(),
				EffectBouncing = ns.widget.wearable.scroller.effect.Bouncing,
				eventType = {
					/**
					 * event trigger when scroller start
					 * @event scrollstart
					 */
					START: "scrollstart",
					/**
					 * event trigger when scroller move
					 * @event scrollmove
					 */
					MOVE: "scrollmove",
					/**
					 * event trigger when scroller end
					 * @event scrollend
					 */
					END: "scrollend",
					/**
					 * event trigger when scroll is cancel
					 * @event scrollcancel
					 */
					CANCEL: "scrollcancel"
				},

				/*
				 * this option is related operation of scroll bar.
				 * the value is true, scroll bar is shown during touching screen even if content doesn't scroll.
				 * the value is false, scroll bar disappear when there is no movement of the scroll bar.
				 */
				_keepShowingScrollbarOnTouch = false,

				Scroller = function () {
				};

			Scroller.Orientation = {
				VERTICAL: "vertical",
				HORIZONTAL: "horizontal"
			};

			prototype._build = function (element) {
				if (element.children.length !== 1) {
					throw "scroller has only one child.";
				}

				this.scroller = element.children[0];
				this.scrollerStyle = this.scroller.style;

				this.bouncingEffect = null;
				this.scrollbar = null;

				this.width = 0;
				this.height = 0;

				this.scrollerWidth = 0;
				this.scrollerHeight = 0;
				this.scrollerOffsetX = 0;
				this.scrollerOffsetY = 0;

				this.maxScrollX = 0;
				this.maxScrollY = 0;

				this.startScrollerOffsetX = 0;
				this.startScrollerOffsetY = 0;

				this.orientation = null;

				this.enabled = true;
				this.scrolled = false;
				this.dragging = false;
				this.scrollCanceled = false;

				return element;
			};

			prototype._configure = function () {
				/**
				 * @property {Object} options Options for widget
				 * @property {number} [options.scrollDelay=0]
				 * @property {number} [options.threshold=10]
				 * @property {""|"bar"|"tab"} [options.scrollbar=""]
				 * @property {boolean} [options.useBouncingEffect=false]
				 * @property {"vertical"|"horizontal"} [options.orientation="vertical"]
				 * @member ns.widget.wearable.Scroller
				 */
				this.options = utilsObject.merge({}, this.options, {
					scrollDelay: 0,
					threshold: 10,
					scrollbar: "",
					useBouncingEffect: false,
					orientation: "vertical"	// vertical or horizontal,
				});
			};

			prototype._init = function () {
				this.width = this.element.offsetWidth;
				this.height = this.element.offsetHeight;

				this.scrollerWidth = this.scroller.offsetWidth;
				this.scrollerHeight = this.scroller.offsetHeight;

				this.maxScrollX = this.width - this.scrollerWidth;
				this.maxScrollY = this.height - this.scrollerHeight;

				this.orientation = this.options.orientation === "horizontal" ? Scroller.Orientation.HORIZONTAL : Scroller.Orientation.VERTICAL;

				this.scrolled = false;
				this.touching = true;
				this.scrollCanceled = false;

				if ( this.orientation === Scroller.Orientation.HORIZONTAL ) {
					this.maxScrollY = 0;
				} else {
					this.maxScrollX = 0;
				}

				this._initLayout();
				this._initScrollbar();
				this._initBouncingEffect();
			};

			prototype._initLayout = function () {
				var elementStyle = this.element.style,
					scrollerStyle = this.scroller.style;

				elementStyle.overflow = "hidden";
				elementStyle.position = "relative";

				scrollerStyle.position = "absolute";
				scrollerStyle.top = "0px";
				scrollerStyle.left = "0px";
				scrollerStyle.width = this.scrollerWidth + "px";
				scrollerStyle.height = this.scrollerHeight + "px";
			};

			prototype._initScrollbar = function () {
				var type = this.options.scrollbar,
					scrollbarType;

				if ( type ) {
					scrollbarType = ns.widget.wearable.scroller.scrollbar.type[type];
					if ( scrollbarType ) {
						this.scrollbar = engine.instanceWidget(this.element, "ScrollBar", {
							type: scrollbarType,
							orientation: this.orientation
						});
					}
				}
			};

			prototype._initBouncingEffect = function () {
				var o = this.options;
				if ( o.useBouncingEffect ) {
					this.bouncingEffect = new EffectBouncing(this.element, {
						maxScrollX: this.maxScrollX,
						maxScrollY: this.maxScrollY,
						orientation: this.orientation
					});
				}
			};

			prototype._resetLayout = function () {
				var elementStyle = this.element.style,
					scrollerStyle = this.scrollerStyle;

				elementStyle.overflow = "";
				elementStyle.position = "";

				elementStyle.overflow = "hidden";
				elementStyle.position = "relative";

				if (scrollerStyle) {
					scrollerStyle.position = "";
					scrollerStyle.top = "";
					scrollerStyle.left = "";
					scrollerStyle.width = "";
					scrollerStyle.height = "";

					scrollerStyle["-webkit-transform"] = "";
					scrollerStyle["-webkit-transition"] = "";
				}
			};

			prototype._bindEvents = function () {
				ns.event.enableGesture(
					this.scroller,

					new ns.event.gesture.Drag({
						threshold: this.options.threshold,
						delay: this.options.scrollDelay,
						blockVertical: this.orientation === Scroller.Orientation.HORIZONTAL,
						blockHorizontal: this.orientation === Scroller.Orientation.VERTICAL
					})
				);

				utilsEvents.on( this.scroller, "drag dragstart dragend dragcancel", this );
				window.addEventListener("resize", this);
			};

			prototype._unbindEvents = function () {
				if (this.scroller) {
					ns.event.disableGesture( this.scroller );
					utilsEvents.off( this.scroller, "drag dragstart dragend dragcancel", this );
					window.removeEventListener("resize", this);
				}
			};

			/* jshint -W086 */
			prototype.handleEvent = function (event) {
				switch (event.type) {
					case "dragstart":
						this._start( event );
						break;
					case "drag":
						this._move( event );
						break;
					case "dragend":
						this._end( event );
						break;
					case "dragcancel":
						this.cancel( event );
						break;
					case "resize":
						this.refresh();
						break;
				}
			};

			/**
			 * Set options for widget.
			 * @method setOptions
			 * @param {Object} options
			 * @member ns.widget.wearable.scroller.Scroller
			 */
			prototype.setOptions = function (options) {
				var name;
				for ( name in options ) {
					if ( options.hasOwnProperty(name) && !!options[name] ) {
						this.options[name] = options[name];
					}
				}
			};

			prototype._refresh = function () {
				this._clear();
				this._unbindEvents();
				this._init();
				this._bindEvents();
			};

			/**
			 * Scrolls to new position.
			 * @method scrollTo
			 * @param x
			 * @param y
			 * @param duration
			 * @member ns.widget.wearable.scroller.Scroller
			 */
			prototype.scrollTo = function (x, y, duration) {
				this._translate(x, y, duration);
				this._translateScrollbar(x, y, duration);
			};

			prototype._translate = function (x, y, duration) {
				var translate,
					transition,
					scrollerStyle = this.scrollerStyle;

				if ( !duration ) {
					transition = "none";
				} else {
					transition = "-webkit-transform " + duration / 1000 + "s ease-out";
				}
				translate = "translate3d(" + x + "px," + y + "px, 0)";

				scrollerStyle["-webkit-transform"] = translate;
				scrollerStyle["-webkit-transition"] = transition;

				this.scrollerOffsetX = window.parseInt(x, 10);
				this.scrollerOffsetY = window.parseInt(y, 10);
			};

			prototype._translateScrollbar = function (x, y, duration, autoHidden) {
				if (!this.scrollbar) {
					return;
				}

				this.scrollbar.translate(this.orientation === Scroller.Orientation.HORIZONTAL ? -x : -y, duration, autoHidden);
			};

			prototype._start = function(/* e */) {
				this.scrolled = false;
				this.dragging = true;
				this.scrollCanceled = false;
				this.startScrollerOffsetX = this.scrollerOffsetX;
				this.startScrollerOffsetY = this.scrollerOffsetY;
			};

			prototype._move = function (e, pos) {
				var newX = this.startScrollerOffsetX,
					newY = this.startScrollerOffsetY,
					autoHide = !_keepShowingScrollbarOnTouch;

				if ( !this.enabled || this.scrollCanceled || !this.dragging ) {
					return;
				}

				if ( this.orientation === Scroller.Orientation.HORIZONTAL ) {
					newX += e.detail.estimatedDeltaX;
				} else {
					newY += e.detail.estimatedDeltaY;
				}

				if ( newX > 0 || newX < this.maxScrollX ) {
					newX = newX > 0 ? 0 : this.maxScrollX;
				}
				if ( newY > 0 || newY < this.maxScrollY ) {
					newY = newY > 0 ? 0 : this.maxScrollY;
				}

				if ( newX !== this.scrollerOffsetX || newY !== this.scrollerOffsetY ) {
					if ( !this.scrolled ) {
						this._fireEvent( eventType.START );
					}
					this.scrolled = true;

					this._translate( newX, newY );
					this._translateScrollbar( newX, newY, 0, autoHide );
					// TODO to dispatch move event is too expansive. it is better to use callback.
					this._fireEvent( eventType.MOVE );

					if ( this.bouncingEffect ) {
						this.bouncingEffect.hide();
					}
				} else {
					if ( this.bouncingEffect ) {
						this.bouncingEffect.drag( newX, newY );
					}
					this._translateScrollbar( newX, newY, 0, autoHide );
				}
			};

			prototype._end = function (/* e */) {
				if ( !this.dragging ) {
					return;
				}

				// bouncing effect
				if ( this.bouncingEffect ) {
					this.bouncingEffect.dragEnd();
				}

				if ( this.scrollbar ) {
					this.scrollbar.end();
				}

				this._endScroll();
				this.dragging = false;
			};

			prototype._endScroll = function () {
				if (this.scrolled) {
					this._fireEvent(eventType.END);
				}

				this.scrolled = false;
			};

			/**
			 * Cancels scroll.
			 * @method cancel
			 * @member ns.widget.wearable.scroller.Scroller
			 */
			prototype.cancel = function () {
				this.scrollCanceled = true;

				if ( this.scrolled ) {
					this._translate( this.startScrollerOffsetX, this.startScrollerOffsetY );
					this._translateScrollbar( this.startScrollerOffsetX, this.startScrollerOffsetY );
					this._fireEvent( eventType.CANCEL );
				}

				if ( this.scrollbar ) {
					this.scrollbar.end();
				}

				this.scrolled = false;
				this.dragging = false;
			};

			prototype._fireEvent = function (eventName, detail) {
				eventTrigger( this.element, eventName, detail );
			};

			prototype._clear = function () {
				this.scrolled = false;
				this.scrollCanceled = false;

				this._resetLayout();
				this._clearScrollbar();
				this._clearBouncingEffect();
			};

			prototype._clearScrollbar = function () {
				if ( this.scrollbar ) {
					this.scrollbar.destroy();
				}
				this.scrollbar = null;
			};

			prototype._clearBouncingEffect = function () {
				if (this.bouncingEffect) {
					this.bouncingEffect.destroy();
				}
				this.bouncingEffect = null;
			};

			prototype._disable = function () {
				this.enabled = false;
			};

			prototype._enable = function () {
				this.enabled = true;
			};

			prototype._destroy = function () {
				this._clear();
				this._unbindEvents();
				this.scrollerStyle = null;
				this.scroller = null;
			};

			Scroller.prototype = prototype;

			ns.widget.wearable.scroller.Scroller = Scroller;

			engine.defineWidget(
				"Scroller",
				".scroller",
				["scrollTo", "cancel"],
				Scroller
			);
			}(window.document, ns));

/*global window, define, Event, console */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #TabIndicator Widget
 * Widget create tabs indicator.
 * @class ns.widget.wearable.TabIndicator
 * @since 2.3
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var engine = ns.engine,
				object = ns.util.object,
				TabIndicator = function() {
				this.tabSize = 0;
				this.activeIndex = 0;
				this.width = 0;
			};

			TabIndicator.EventType = {
				/**
				 * Triggered when tab is changing
				 * @event tabchange
				 * @member ns.widget.wearable.TabIndicator
				 */
				change: "tabchange"
			};

			TabIndicator.prototype = new ns.widget.BaseWidget();

			object.fastMerge(TabIndicator.prototype, {
				_init: function(element) {
					var o = this.options;

					this.width = element.offsetWidth;
					element.classList.add( o.wrapperClass );
				},

				_configure: function( ) {
					/**
					 * @property {Object} options Options for widget
					 * @property {number} [options.margin=2]
					 * @property {boolean} [options.triggerEvent=false]
					 * @property {string} [options.wrapperClass="ui-tab-indicator]
					 * @property {string} [options.itemClass="ui-tab-item"]
					 * @property {string} [options.activeClass="ui-tab-active"]
					 * @member ns.widget.wearable.TabIndicator
					 */
					this.options = {
						margin: 4,
						triggerEvent: false,
						wrapperClass: "ui-tab-indicator",
						itemClass: "ui-tab-item",
						activeClass: "ui-tab-active"
					};
				},

				_createIndicator: function() {
					var o = this.options,
						activeIndex = this.activeIndex,
						wrap = document.createDocumentFragment(),
						widthTable = [],
						margin = o.margin,
						i = 0,
						len = this.tabSize,
						width = this.width-margin*(len-1),
						std = Math.floor(width / len),
						remain = width % len,
						span, offset=0;

					for (i=0; i < len; i++) {
						widthTable[i] = std;
					}

					for ( i= Math.floor((len-remain)/2); remain > 0; i++, remain-- ) {
						widthTable[i] += 1;
					}

					for (i=0; i < len; i++) {
						span = document.createElement("span");
						span.classList.add( o.itemClass );
						span.style.width = widthTable[i] + "px";
						span.style.left = offset + "px";
						offset += widthTable[i] + margin;

						if ( i === activeIndex ) {
							span.classList.add( o.activeClass );
						}
						wrap.appendChild(span);
					}

					this.element.appendChild( wrap );
				},

				_removeIndicator: function() {
					this.element.innerHTML = "";
				},

				_fireEvent: function(eventName, detail) {
					ns.fireEvent( this.element, eventName, detail );
				},

				_refresh: function() {
					this._removeIndicator();
					this._createIndicator();
				},

				/**
				 * @method setActive
				 * @param position
				 * @member ns.widget.wearable.TabIndicator
				 */
				setActive: function ( position ) {
					var o = this.options,
						nodes = this.element.children;

					this.activeIndex = position;

					[].forEach.call(nodes, function( element ) {
						element.classList.remove( o.activeClass );
					});

					if ( position < nodes.length ) {
						nodes[position].classList.add( o.activeClass );

						if ( o.triggerEvent ) {
							this._fireEvent(TabIndicator.EventType.change, {
								active: position
							});
						}
					}
				},

				/**
				 * @method setSize
				 * @param size
				 * @member ns.widget.wearable.TabIndicator
				 */
				setSize: function( size ) {
					var needRefresh = this.tabSize !== size;

					this.tabSize = size;
					if ( needRefresh ) {
						this.refresh();
					}
				},

				_destroy: function() {
					var o = this.options;

					this._removeIndicator();

					this.element.classList.remove( o.wrapperClass );
				}
			});

			ns.widget.wearable.TabIndicator = TabIndicator;

			engine.defineWidget(
				"TabIndicator",
				".ui-tab",
				["setActive", "setSize"],
				TabIndicator
			);
			}(window.document, ns));

/*global window, define, Event, console */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * # SectionChanger Widget
 * Shows a control that you can use to scroll through multiple *section*
 * elements.
 *
 * The section changer widget provides an application architecture, which has
 * multiple sections on a page and enables scrolling through the *section* elements.
 *
 * ## Manual constructor
 *
 *      @example
 *         <div id="hasSectionchangerPage" class="ui-page">
 *             <header class="ui-header">
 *                 <h2 class="ui-title">SectionChanger</h2>
 *             </header>
 *             <div id="sectionchanger" class="ui-content">
 *                 <!--Section changer has only one child-->
 *                 <div>
 *                     <section>
 *                         <h3>LEFT1 PAGE</h3>
 *                     </section>
 *                     <section class="ui-section-active">
 *                         <h3>MAIN PAGE</h3>
 *                     </section>
 *                     <section>
 *                         <h3>RIGHT1 PAGE</h3>
 *                     </section>
 *                 </div>
 *             </div>
 *         </div>
 *         <script>
 *             (function () {
 *                 var page = document.getElementById("hasSectionchangerPage"),
 *                     element = document.getElementById("sectionchanger"),
 *                     sectionChanger;
 *
 *                 page.addEventListener("pageshow", function () {
 *                     // Create the SectionChanger object
 *                     sectionChanger = new tau.SectionChanger(element, {
 *                         circular: true,
 *                         orientation: "horizontal",
 *                         useBouncingEffect: true
 *                     });
 *                 });
 *
 *                 page.addEventListener("pagehide", function () {
 *                     // Release the object
 *                     sectionChanger.destroy();
 *                 });
 *             })();
 *         </script>
 *
 * ## Handling Events
 *
 * To handle section changer events, use the following code:
 *
 *      @example
 *         <script>
 *             (function () {
 *                 var changer = document.getElementById("sectionchanger");
 *                 changer.addEventListener("sectionchange", function (event) {
 *                     console.debug(event.detail.active + " section is active.");
 *                 });
 *             })();
 *         </script>
 *
 * @class ns.widget.wearable.SectionChanger
 * @since 2.2
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var Scroller = ns.widget.wearable.scroller.Scroller,
				Gesture = ns.event.gesture,
				engine = ns.engine,
				utilsObject = ns.util.object,
				utilsEvents = ns.event,
				eventType = {
					/**
					 * Triggered when the section is changed.
					 * @event sectionchange
					 * @member ns.widget.wearable.SectionChanger
					 */
					CHANGE: "sectionchange"
				};

			function SectionChanger() {
				this.options = {};
			}

			utilsObject.inherit(SectionChanger, Scroller, {
				_build: function (element) {

					this.tabIndicatorElement = null;
					this.tabIndicator = null;

					this.sections = null;
					this.sectionPositions = [];

					this.activeIndex = 0;
					this.beforeIndex = 0;

					this._super(element);
					return element;
				},

				_configure : function () {
					this._super();
					/**
					 * Options for widget
					 * @property {Object} options
					 * @property {"horizontal"|"vertical"} [options.orientation="horizontal"] Sets the section changer orientation:
					 * @property {boolean} [options.circular=false] Presents the sections in a circular scroll fashion.
					 * @property {boolean} [options.useBouncingEffect=false] Shows a scroll end effect on the scroll edge.
					 * @property {string} [options.items="section"] Defines the section element selector.
					 * @property {string} [options.activeClass="ui-section-active"] Specifies the CSS classes which define the active section element. Add the specified class (ui-section-active) to a *section* element to indicate which section must be shown first. By default, the first section is shown first.
					 * @member ns.widget.wearable.SectionChanger
					 */
					var options = this.options;
					options.items = "section";
					options.activeClass = "ui-section-active";
					options.circular = false;
					options.animate = true;
					options.animateDuration = 100;
					options.orientation = "horizontal";
					options.changeThreshold = -1;
					options.useTab = false;
				},

				_init: function (element) {
					var o = this.options,
						sectionLength, i, className;

					if (o.scrollbar === "tab") {
						o.scrollbar = false;
						o.useTab = true;
					}

					this.sections = typeof o.items === "string" ?
						this.scroller.querySelectorAll(o.items) :
						o.items;

					sectionLength = this.sections.length;

					if (o.circular && sectionLength < 3) {
						throw "if you use circular option, you must have at least three sections.";
					}

					if (this.activeIndex >= sectionLength) {
						this.activeIndex = sectionLength - 1;
					}

					for (i = 0; i < sectionLength; i++) {
						className = this.sections[i].className;
						if (className && className.indexOf(o.activeClass) > -1) {
							this.activeIndex = i;
						}

						this.sectionPositions[i] = i;
					}

					this.setActiveSection(this.activeIndex);

					this._prepareLayout();
					this._super();
					this._repositionSections(true);

					// set corret options values.
					if (!o.animate) {
						o.animateDuration = 0;
					}
					if (o.changeThreshold < 0) {
						o.changeThreshold = this.width / 2;
					}

					if (this.enabled && sectionLength > 1) {
						this.enable();
					} else {
						this.disable();
					}
					return element;
				},

				_prepareLayout: function () {
					var o = this.options,
						sectionLength = this.sections.length,
						width = this.element.offsetWidth,
						height = this.element.offsetHeight,
						orientation = o.orientation === "horizontal" ? Scroller.Orientation.HORIZONTAL : Scroller.Orientation.VERTICAL,
						scrollerStyle = this.scroller.style,
						tabHeight;

					if (o.useTab) {
						this._initTabIndicator();
						tabHeight = this.tabIndicatorElement.offsetHeight;
						this.element.style.height = (height - tabHeight) + "px";
						height -= tabHeight;
					}

					if (orientation === Scroller.Orientation.HORIZONTAL) {
						scrollerStyle.width = width * sectionLength + "px"; //set Scroller width
						scrollerStyle.height = height + "px"; //set Scroller width
					} else {
						scrollerStyle.width = width + "px"; //set Scroller width
						scrollerStyle.height = height * sectionLength + "px"; //set Scroller width
					}
				},

				_initLayout: function () {
					var sectionStyle = this.sections.style,
						width = this.width,
						height = this.height,
						i, sectionLength, top, left;

					//section element has absolute position
					for (i = 0, sectionLength = this.sections.length; i < sectionLength; i++) {
						//Each section set initialize left position
						sectionStyle = this.sections[i].style;

						sectionStyle.position = "absolute";
						sectionStyle.width = width + "px";
						sectionStyle.height = height + "px";
						if (this.orientation === Scroller.Orientation.HORIZONTAL) {
							top = 0;
							left = width * i;
						} else {
							top = height * i;
							left = 0;
						}

						sectionStyle.top = top + "px";
						sectionStyle.left = left + "px";
					}

					this._super();
				},

				_initBouncingEffect: function () {
					var o = this.options;
					if (!o.circular) {
						this._super();
					}
				},

				_translateScrollbar: function (x, y, duration, autoHidden) {
					var standard = this.orientation === Scroller.Orientation.HORIZONTAL ? this.width : this.height,
						preOffset = this.sectionPositions[this.activeIndex] * standard,
						offset = this.activeIndex * standard,
						fixedOffset = offset - preOffset;

					if (!this.scrollbar) {
						return;
					}

					if (this.orientation === Scroller.Orientation.HORIZONTAL) {
						offset = -x + fixedOffset;
					} else {
						offset = -y + fixedOffset;
					}

					this.scrollbar.translate(offset, duration, autoHidden);
				},

				_translateScrollbarWithPageIndex: function (pageIndex, duration) {
					var standard = this.orientation === Scroller.Orientation.HORIZONTAL ? this.width : this.height,
						offset = pageIndex * standard;

					if (!this.scrollbar) {
						return;
					}

					this.scrollbar.translate(offset, duration);
				},

				_initTabIndicator: function () {
					var elem = this.tabIndicatorElement = document.createElement("div");
					this.element.parentNode.insertBefore(elem, this.element);

					this.tabIndicator = new engine.instanceWidget(elem, "TabIndicator");
					this.tabIndicator.setSize(this.sections.length);
					this.tabIndicator.setActive(this.activeIndex);
					this.tabIndicatorHandler = function (e) {
						this.tabIndicator.setActive(e.detail.active);
					}.bind(this);
					this.element.addEventListener(eventType.CHANGE, this.tabIndicatorHandler, false);
				},

				_clearTabIndicator: function () {
					if (this.tabIndicator) {
						this.element.parentNode.removeChild(this.tabIndicatorElement);
						this.element.removeEventListener(eventType.CHANGE, this.tabIndicatorHandler, false);
						this.tabIndicator.destroy();
						this.tabIndicator = null;
						this.tabIndicatorElement = null;
						this.tabIndicatorHandler = null;
					}
				},

				_resetLayout: function () {
					var //scrollerStyle = this.scroller.style,
						sectionStyle = this.sections.style,
						i, sectionLength;

					//scrollerStyle.width = "";
					//scrollerStyle.height = "";
					//this.scroller || this.scroller._resetLayout();

					for (i = 0, sectionLength = this.sections.length; i < sectionLength; i++) {
						sectionStyle = this.sections[i].style;

						sectionStyle.position = "";
						sectionStyle.width = "";
						sectionStyle.height = "";
						sectionStyle.top = "";
						sectionStyle.left = "";
					}

					this._super();
				},

				_bindEvents: function () {
					this._super();

					ns.event.enableGesture(
						this.scroller,

						new ns.event.gesture.Swipe({
							orientation: this.orientation === Scroller.Orientation.HORIZONTAL ?
								Gesture.Orientation.HORIZONTAL :
								Gesture.Orientation.VERTICAL
						})
					);

					utilsEvents.on(this.scroller, "swipe webkitTransitionEnd", this);
				},

				_unbindEvents: function () {
					this._super();

					if (this.scroller) {
						ns.event.disableGesture(this.scroller);
						utilsEvents.off(this.scroller, "swipe webkitTransitionEnd", this);
					}
				},

				/**
				 * This method manages events.
				 * @method handleEvent
				 * @returns {Event} event
				 * @member ns.widget.wearable.SectionChanger
				 */
				handleEvent: function (event) {
					this._super(event);

					switch (event.type) {
						case "swipe":
							this._swipe(event);
							break;
						case "webkitTransitionEnd":
							this._endScroll();
							break;
					}
				},

				_notifyChanagedSection: function (index) {
					var activeClass = this.options.activeClass,
						sectionLength = this.sections.length,
						i=0, section;

					for (i=0; i < sectionLength; i++) {
						section = this.sections[i];
						section.classList.remove(activeClass);
						if (i === this.activeIndex) {
							section.classList.add(activeClass);
						}
					}

					this._fireEvent(eventType.CHANGE, {
						active: index
					});
				},

				/**
				 * Changes the currently active section element.
				 * @method setActiveSection
				 * @param {number} index
				 * @param {number} duration For smooth scrolling,
				 * the duration parameter must be in milliseconds.
				 * @member ns.widget.wearable.SectionChanger
				 */
				setActiveSection: function (index, duration) {
					var position = this.sectionPositions[ index ],
						scrollbarDuration = duration,
						oldActiveIndex = this.activeIndex,
						newX=0,
						newY=0;

					if (this.orientation === Scroller.Orientation.HORIZONTAL) {
						newX = -this.width * position;
					} else {
						newY = -this.height * position;
					}

					if (this.beforeIndex - index > 1 || this.beforeIndex - index < -1) {
						scrollbarDuration = 0;
					}

					this.activeIndex = index;
					this.beforeIndex = this.activeIndex;

					if (newX !== this.scrollerOffsetX || newY !== this.scrollerOffsetY) {
						this._translate(newX, newY, duration);
						this._translateScrollbarWithPageIndex(index, scrollbarDuration);
					} else {
						this._endScroll();
					}

					// notify changed section.
					if (this.activeIndex !== oldActiveIndex) {
						this._notifyChanagedSection(this.activeIndex);
					}
				},

				/**
				 * Gets the currently active section element's index.
				 * @method getActiveSectionIndex
				 * @returns {number}
				 * @member ns.widget.wearable.SectionChanger
				 */
				getActiveSectionIndex: function () {
					return this.activeIndex;
				},

				_start: function (e) {
					this._super(e);

					this.beforeIndex = this.activeIndex;
				},

				_move: function (e) {
					var changeThreshold = this.options.changeThreshold,
						delta = this.orientation === Scroller.Orientation.HORIZONTAL ? e.detail.deltaX : e.detail.deltaY,
						oldActiveIndex = this.activeIndex;

					this._super(e);

					if (!this.scrolled) {
						return;
					}

					if (delta > changeThreshold) {
						this.activeIndex = this._calculateIndex(this.beforeIndex - 1);
					} else if (delta < -changeThreshold) {
						this.activeIndex = this._calculateIndex(this.beforeIndex + 1);
					} else {
						this.activeIndex = this.beforeIndex;
					}

					// notify changed section.
					if (this.activeIndex !== oldActiveIndex) {
						this._notifyChanagedSection(this.activeIndex);
					}
				},

				_end: function (/* e */) {
					if ( this.scrollbar ) {
						this.scrollbar.end();
					}

					if (!this.enabled || this.scrollCanceled || !this.dragging) {
						return;
					}

					// bouncing effect
					if (this.bouncingEffect) {
						this.bouncingEffect.dragEnd();
					}

					this.setActiveSection(this.activeIndex, this.options.animateDuration);
					this.dragging = false;
				},

				_swipe: function (e) {
					var offset = e.detail.direction === Gesture.Direction.UP || e.detail.direction === Gesture.Direction.LEFT ? 1 : -1,
						newIndex = this._calculateIndex(this.beforeIndex + offset);

					if (!this.enabled || this.scrollCanceled || !this.dragging) {
						return;
					}

					// bouncing effect
					if (this.bouncingEffect) {
						this.bouncingEffect.dragEnd();
					}

					if (this.activeIndex !== newIndex) {
						this.activeIndex = newIndex;
						this._notifyChanagedSection(newIndex);
					}

					this.setActiveSection(newIndex, this.options.animateDuration);
					this.dragging = false;
				},

				_endScroll: function () {
					if (!this.enabled || !this.scrolled || this.scrollCanceled) {
						return;
					}

					this._repositionSections();
					this._super();
				},

				_repositionSections: function (init) {
					// if developer set circular option is true, this method used when webkitTransitionEnd event fired
					var sectionLength = this.sections.length,
						curPosition = this.sectionPositions[this.activeIndex],
						centerPosition = window.parseInt(sectionLength/2, 10),
						circular = this.options.circular,
						i, sectionStyle, sIdx, top, left, newX, newY;

					if (this.orientation === Scroller.Orientation.HORIZONTAL) {
						newX = -(this.width * (circular ? centerPosition : this.activeIndex));
						newY = 0;
					} else {
						newX = 0;
						newY = -(this.height * (circular ? centerPosition : this.activeIndex));
					}

					this._translateScrollbarWithPageIndex(this.activeIndex);

					if (init || (curPosition === 0 || curPosition === sectionLength - 1)) {

						this._translate(newX, newY);

						if (circular) {
							for (i = 0; i < sectionLength; i++) {
								sIdx = (sectionLength + this.activeIndex - centerPosition + i) % sectionLength;
								sectionStyle = this.sections[ sIdx ].style;

								this.sectionPositions[sIdx] = i;

								if (this.orientation === Scroller.Orientation.HORIZONTAL) {
									top = 0;
									left = this.width * i;
								} else {
									top = this.height * i;
									left = 0;
								}

								sectionStyle.top = top + "px";
								sectionStyle.left = left + "px";
							}
						}
					}
				},

				_calculateIndex: function (newIndex) {
					var sectionLength = this.sections.length;

					if (this.options.circular) {
						newIndex = (sectionLength + newIndex) % sectionLength;
					} else {
						newIndex = newIndex < 0 ? 0 : (newIndex > sectionLength - 1 ? sectionLength - 1 : newIndex);
					}

					return newIndex;
				},

				_clear: function () {
					this._clearTabIndicator();
					this._super();
					this.sectionPositions.length = 0;
				}
			});

			ns.widget.wearable.SectionChanger = SectionChanger;

			engine.defineWidget(
				"SectionChanger",
				".scroller",
				["getActiveSectionIndex", "setActiveSection"],
				SectionChanger
			);
			}(window.document, ns));

/*global window, define */
/*jslint nomen: true, plusplus: true */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #VirtualGrid Widget
 * Widget creates special grid which can contain big number of items.
 *
 * @class ns.widget.wearable.VirtualGrid
 * @since 2.3
 * @extends ns.widget.wearable.VirtualListview
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, document, ns) {
	
				/**
			 * Alias for {@link ns.widget.wearable.VirtualListview}
			 * @property {Object} VirtualList
			 * @member ns.widget.wearable.VirtualGrid
			 * @private
			 * @static
			 */
			var VirtualList = ns.widget.wearable.VirtualListview,
				/**
				 * Alias for class {@link ns.engine}
				 * @property {Object} engine
				 * @member ns.widget.wearable.VirtualGrid
				 * @private
				 * @static
				 */
				engine = ns.engine,
				/**
				 * Alias for class {@link ns.util.DOM}
				 * @property {Object} DOM
				 * @member ns.widget.wearable.VirtualGrid
				 * @private
				 * @static
				 */
				DOM = ns.util.DOM,
				/**
				 * Constans for horizontal virtual grid
				 * @property {string} HORIZONTAL="x"
				 * @private
				 * @member ns.widget.wearable.VirtualGrid
				 * @static
				 */
				HORIZONTAL = "x",
				/**
				 * Constans for vertical virtual grid
				 * @property {string} VERTICAL="y"
				 * @private
				 * @member ns.widget.wearable.VirtualGrid
				 * @static
				 */
				VERTICAL = "y",
				/**
				 * Alias for class VirtualGrid
				 * @method VirtualGrid
				 * @member ns.widget.wearable.VirtualGrid
				 * @private
				 * @static
				 */
				VirtualGrid = function () {
					/**
					 * Object with default options
					 * @property {Object} options
					 * @property {number} [options.bufferSize=100] Element count in buffer
					 * @property {number} [options.dataLength=0] Element count in list
					 * @property {"x"|"y"} [options.orientation="y"] Orientation : horizontal ("x"), vertical ("y")
					 * @member ns.widget.wearable.VirtualGrid
					 */
					this.options = {
						bufferSize: 100,
						dataLength: 0,
						orientation: VERTICAL,
						/**
						 * Method which modifies list item, depended at specified index from database.
						 * @method options.listItemUpdater
						 * @param {HTMLElement} element List item to be modified.
						 * @param {number} index Index of data set.
						 * @member ns.widget.wearable.VirtualGrid
						 */
						listItemUpdater: function () {
							return null;
						}
					};
					return this;
				},

				prototype = new VirtualList(),
				/**
				 * Alias for VirtualList prototype
				 * @property {Object} VirtualListPrototype
				 * @member ns.widget.wearable.VirtualGrid
				 * @private
				 * @static
				 */
				VirtualListPrototype = VirtualList.prototype,
				/**
				 * Alias for {@link ns.widget.wearable.VirtualListview#draw VirtualList.draw}
				 * @method parent_draw
				 * @member ns.widget.wearable.VirtualGrid
				 * @private
				 * @static
				 */
				parent_draw = VirtualListPrototype.draw,
				/**
				 * Alias for {@link ns.widget.wearable.VirtualListview#_refreshScrollbar VirtualList.\_refreshScrollbar}
				 * @method parent_refreshScrollbar
				 * @member ns.widget.wearable.VirtualGrid
				 * @private
				 * @static
				 */
				parent_refreshScrollbar = VirtualListPrototype._refreshScrollbar;

			/**
			 * This method draws item.
			 * @method draw
			 * @member ns.widget.wearable.VirtualGrid
			 */
			prototype.draw = function () {
				var self = this,
					element = self.element,
					ui = self.ui,
					newDiv = null,
					newDivStyle = null;

				if (self.options.orientation === HORIZONTAL) {
					newDiv = document.createElement("div");
					newDivStyle = newDiv.style;
					element.parentNode.appendChild(newDiv);
					newDiv.appendChild(element);
					newDiv.appendChild(ui.spacer);
					newDivStyle.width = "10000px";
					newDivStyle.height = "100%";
					ui.container = newDiv;
				}
				self._initListItem();
				parent_draw.call(self);
			};

			/**
			 * Sets proper scrollbar size: width (horizontal)
			 * @method _refreshScrollbar
			 * @protected
			 * @member ns.widget.wearable.VirtualGrid
			 */
			prototype._refreshScrollbar = function () {
				var width = 0,
					ui = this.ui;
				parent_refreshScrollbar.call(this);
				if (ui.container) {
					width = this.element.clientWidth + ui.spacer.clientWidth;
					ui.container.style.width = width + "px";
				}
			};

			/**
			 * Initializes list item
			 * @method _initListItem
			 * @protected
			 * @member ns.widget.wearable.VirtualGrid
			 */
			prototype._initListItem = function () {
				var self = this,
					thisElement = self.element,
					element = document.createElement("div"),
					rowElement = document.createElement("div"),
					elementStyle = element.style,
					orientation = self.options.orientation,
					thisElementStyle = thisElement.style,
					rowElementStyle = rowElement.style;

				elementStyle.overflow = "hidden";
				rowElement.style.overflow = "hidden";
				thisElement.appendChild(rowElement);
				rowElement.appendChild(element);
				self.options.listItemUpdater(element, 0);

				if (orientation === VERTICAL) {
					thisElementStyle.overflowY = "auto";
					thisElementStyle.overflowX = "hidden";
					rowElementStyle.overflow = "hidden";
					element.style.float = "left";
					self._cellSize = DOM.getElementWidth(element);
					self._columnsCount = Math.floor(DOM.getElementWidth(thisElement) / self._cellSize);
				} else {
					thisElementStyle.overflowX = "auto";
					thisElementStyle.overflowY = "hidden";
					rowElementStyle.overflow = "hidden";
					rowElementStyle.float = "left";
					thisElementStyle.height = "100%";
					rowElementStyle.height = "100%";
					self._cellSize = DOM.getElementHeight(element);
					self._columnsCount = Math.floor(DOM.getElementHeight(thisElement) / self._cellSize);
				}
				thisElement.removeChild(rowElement);
				self.options.originalDataLength = self.options.dataLength;
				self.options.dataLength /= self._columnsCount;
			};

			/**
			 * Updates list item with data using defined template
			 * @method _updateListItem
			 * @param {HTMLElement} element List element to update
			 * @param {number} index Data row index
			 * @protected
			 * @member ns.widget.wearable.VirtualGrid
			 */
			prototype._updateListItem = function (element, index) {
				var elementI,
					i,
					count,
					elementStyle = element.style,
					options = this.options,
					elementIStyle,
					size;
				element.innerHTML = "";
				elementStyle.overflow = "hidden";
				elementStyle.position = "relative";
				if (options.orientation === HORIZONTAL) {
					elementStyle.height = "100%";
				}
				count = this._columnsCount;
				size = (100 / count);
				for (i = 0; i < count; i++) {
					elementI = document.createElement("div");
					elementIStyle = elementI.style;
					elementIStyle.overflow = "hidden";

					if (options.orientation === VERTICAL) {
						elementI.style.float = "left";
						elementI.style.width = size + "%";
					} else {
						elementI.style.height = size + "%";
					}

					if (count * index + i < options.originalDataLength) {
						this.options.listItemUpdater(elementI, count * index + i);
					}
					element.appendChild(elementI);
				}
			};

			VirtualGrid.prototype = prototype;

			ns.widget.wearable.VirtualGrid = VirtualGrid;

			engine.defineWidget(
				"VirtualGrid",
				".ui-virtualgrid",
				[],
				VirtualGrid
			);

			}(window, window.document, ns));

/*global window, define, Event, console */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * # Swipe List
 * Shows a list where you can swipe horizontally through a list item to perform a specific task.
 *
 * The swipe list widget shows on the screen a list where you can swipe horizontally through a list item to activate a specific feature or perform a specific task. For example, you can swipe a contact in a contact list to call them or to open a message editor in order to write them a message.
 *
 * The following table describes the supported swipe list options.
 *
 *      @example
 *         <div class="ui-content">
 *             <!--List items that can be swiped-->
 *             <ul class="ui-listview ui-swipelist-list">
 *                 <li>Andrew</li>
 *                 <li>Bill</li>
 *                 <li>Christina</li>
 *                 <li>Daniel</li>
 *                 <li>Edward</li>
 *                 <li>Peter</li>
 *                 <li>Sam</li>
 *                 <li>Tom</li>
 *             </ul>
 *             <!--Swipe actions-->
 *             <div class="ui-swipelist">
 *                 <div class="ui-swipelist-left">
 *                     <div class="ui-swipelist-icon"></div>
 *                     <div class="ui-swipelist-text">Calling</div>
 *                 </div>
 *                 <div class="ui-swipelist-right">
 *                     <div class="ui-swipelist-icon"></div>
 *                     <div class="ui-swipelist-text">Message</div>
 *                 </div>
 *             </div>
 *         </div>
 *         <script>
 *             (function () {
 *                 var page = document.getElementById("swipelist"),
 *                         listElement = page.getElementsByClassName("ui-swipelist-list", "ul")[0],
 *                         swipeList;
 *                 page.addEventListener("pageshow", function () {
 *                     // Make swipe list object
 *                     var options = {
 *                         left: true,
 *                         right: true
 *                     };
 *                     swipeList = new tau.widget.SwipeList(listElement, options);
 *                 });
 *                 page.addEventListener("pagehide", function () {
 *                     // Release object
 *                     swipeList.destroy();
 *                 });
 *             })();
 *         </script>
 * @class ns.widget.wearable.SwipeList
 * @since 2.2
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				var Gesture = ns.event.gesture,
				utilsEvents = ns.event,
				engine = ns.engine,
				dom = ns.util.DOM,
				selectors = ns.util.selectors,

				eventType = {
					/**
					 * Triggered when a left-to-right swipe is completed.
					 * @event swipelist.left
					 * @member ns.widget.wearable.SwipeList
					 */
					LEFT: "swipelist.left",
					/**
					 * Triggered when a right-to-left swipe is completed.
					 * @event swipelist.right
					 * @member ns.widget.wearable.SwipeList
					 */
					RIGHT: "swipelist.right"
				},

				SwipeList = function () {
					/**
					 * SwipeList's container.
					 * @property {?HTMLElement} [container=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.container = null;

					/**
					 * SwipeList's element.
					 * @property {?HTMLElement} [swipeElement=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.swipeElement = null;
					/**
					 * Left element of widget.
					 * @property {?HTMLElement} [swipeLeftElement=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.swipeLeftElement = null;
					/**
					 * Right element of widget.
					 * @property {?HTMLElement} [swipeRightElement=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.swipeRightElement = null;

					/**
					 * Style of SwipeList's element.
					 * @property {?Object} [swipeElementStyle=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.swipeElementStyle = null;
					/**
					 * Style of left element of widget.
					 * @property {?Object} [swipeLeftElementStyle=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.swipeLeftElementStyle = null;
					/**
					 * Style of right element of widget.
					 * @property {?Object} [swipeRightElementStyle=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.swipeRightElementStyle = null;

					/**
					 * Active element of widget.
					 * @property {?HTMLElement} [activeElement=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.activeElement = null;
					/**
					 * Target of swipe event.
					 * @property {?HTMLElement} [activeTarget=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.activeTarget = null;

					/**
					 * Function calls on destroying.
					 * @property {?Function} [resetLayoutCallback=null]
					 * @member ns.widget.wearable.SwipeList
					 */
					this.resetLayoutCallback = null;
					this.options = {};

					this._interval = 0;

					this._cancelled = false;
					this._dragging = false;
					this._animating = false;

				},
				prototype = new ns.widget.BaseWidget(),

				blockEvent = function(event) {
					event.preventDefault();
				};

			prototype._configure = function () {

				/**
				 * Options for widget
				 * @property {Object} options
				 * @property {boolean} [options.left=false] Set to true to allow swiping from left to right.
				 * @property {boolean} [options.right=false] Set to true to allow swiping from right to left.
				 * @property {number} [options.threshold=10] Define the threshold (in pixels) for the minimum swipe movement which allows the swipe action to appear.
				 * @property {number} [options.animationThreshold=150] Define the threshold (in pixels) for the minimum swipe movement that allows a swipe animation (with a color change) to be shown. The animation threshold is usually the threshold for the next operation after the swipe.
				 * @property {number} [options.animationDuration=200] Define the swipe list animation duration. Do not change the default value, since it has been defined to show a complete color change.
				 * @property {number} [options.animationInterval=8] Define the swipe list animation interval. The animation is called with the requestAnimationFrame() method once every 1/60 seconds. The interval determines how many coordinates the animation proceeds between each call. The animation ends when the coordinates reach the value defined as animationDuration. This option basically allows you to control the speed of the animation.
				 * @property {string} [options.ltrStartColor=""] Define the start color for the left-to-right swipe.
				 * @property {string} [options.ltrEndColor=""] Define the end color for the left-to-right swipe.
				 * @property {string} [options.rtlStartColor=""] Define the start color for the right-to-left swipe.
				 * @property {string} [options.rtlEndColor=""] Define the end color for the right-to-left swipe.
				 * @property {?HTMLElement} [options.container=null] Define container of widget.
				 * @property {string} [options.swipeTarget="li"] Selector for swipe list
				 * @property {string} [options.swipeElement=".ui-swipelist"] Selector for swipe list container
				 * @property {string} [options.swipeLeftElement=".ui-swipelist-left"] Selector for swipe left container
				 * @property {string} [options.swipeRightElement=".ui-swipelist-right"] Selector for swipe right container
				 * @member ns.widget.wearable.SwipeList
				 */
				this.options = {
					threshold: 10,
					animationThreshold: 150,
					animationDuration: 200,
					animationInterval: 8,

					container: null,

					swipeTarget: "li",
					swipeElement: ".ui-swipelist",
					swipeLeftElement: ".ui-swipelist-left",
					swipeRightElement: ".ui-swipelist-right",

					ltrStartColor: "",
					ltrEndColor: "",
					rtlStartColor: "",
					rtlEndColor: ""
				};
			};

			prototype._init = function (element) {
				var page = selectors.getClosestBySelector(element, "." + ns.widget.wearable.Page.classes.uiPage),
					options = this.options,
					swipeLeftElementBg,
					swipeRightElementBg,
					rgbStringRgExp = /rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)/g;

				if (options.container) {
					this.container = page.querySelector(options.container);
				} else {
					this.container = this._findScrollableElement(this.element);
				}

				this.container.style.position = "relative";

				this.swipeElement = page.querySelector(options.swipeElement);
				this.swipeLeftElement = options.swipeLeftElement ? page.querySelector(options.swipeLeftElement) : undefined;
				this.swipeRightElement = options.swipeRightElement ? page.querySelector(options.swipeRightElement) : undefined;

				if (this.swipeElement) {
					this.swipeElementStyle = this.swipeElement.style;
					this.swipeElementStyle.display = "none";
					this.swipeElementStyle.background = "transparent";
					this.swipeElementStyle.width = this.container.offsetWidth + "px";
					this.swipeElementStyle.height = this.container.offsetHeight + "px";
				}

				if (this.swipeLeftElement) {
					this.swipeLeftElementStyle = this.swipeLeftElement.style;
					this.swipeLeftElementStyle.display = "none";
					// Get background-color value for swipe left element
					swipeLeftElementBg = this.swipeLeftElement ? dom.getCSSProperty(this.swipeLeftElement, "background-image").match(rgbStringRgExp) : undefined;
				}

				if (this.swipeRightElement) {
					this.swipeRightElementStyle = this.swipeRightElement.style;
					this.swipeRightElementStyle.display = "none";
					// Get background-color value for swipe right element
					swipeRightElementBg = this.swipeRightElement ? dom.getCSSProperty(this.swipeRightElement, "background-image").match(rgbStringRgExp) : undefined;
				}

				
				// Set start/end color: If user set color as option, that color will be used. If not, css based color of swipe will be used.
				options.ltrStartColor = options.ltrStartColor || swipeLeftElementBg[0];
				options.ltrEndColor = options.ltrEndColor || swipeLeftElementBg[1];
				options.rtlStartColor = options.rtlStartColor || swipeRightElementBg[0];
				options.rtlEndColor = options.rtlEndColor || swipeRightElementBg[1];

				this.resetLayoutCallback = null;
				if (this.swipeElement.parentNode !== this.container) {
					this.resetLayoutCallback = (function (parent, nextSibling, element) {
						return function () {
							try {
								if (nextSibling) {
									parent.insertBefore(element, nextSibling);
								} else {
									parent.appendChild(element);
								}
							} catch (e) {
								element.parentNode.removeChild(element);
							}
						};
					}(this.swipeElement.parentNode, this.swipeElement.nextElementSibling, this.swipeElement));
					this.container.appendChild(this.swipeElement);
				}
			};

			prototype._reset = function () {
				this.container.style.position = "";

				this.swipeElementStyle.display = "";
				this.swipeElementStyle.background = "";
				this.swipeElementStyle.width = "";
				this.swipeElementStyle.height = "";

				this.swipeLeftElementStyle.display = "";
				this.swipeLeftElementStyle.background = "";

				this.swipeRightElementStyle.display = "";
				this.swipeRightElementStyle.background = "";

				if (this.resetLayoutCallback) {
					this.resetLayoutCallback();
				}
				this._unbindEvents();
			};

			prototype._bindEvents = function () {

				ns.event.enableGesture(
					this.element,

					new Gesture.Drag({
						threshold: this.options.threshold,
						blockVertical: true
					}),

					new Gesture.Swipe({
						orientation: Gesture.Orientation.HORIZONTAL
					})
				);

				utilsEvents.on(this.element, "drag dragstart dragend dragcancel swipe", this);
				utilsEvents.on(document, "scroll touchcancel", this);
				utilsEvents.on(this.swipeElement, "touchstart touchmove touchend", blockEvent, false);
			};

			prototype._unbindEvents = function () {
				ns.event.disableGesture(this.element);

				utilsEvents.off(this.element, "drag dragstart dragend dragcancel swipe", this);
				utilsEvents.off(document, "scroll touchcancel", this);
				utilsEvents.off(this.swipeElement, "touchstart touchmove touchend", blockEvent, false);
			};

			prototype.handleEvent = function (event) {
				switch (event.type) {
					case "dragstart":
						this._start(event);
						break;
					case "drag":
						this._move(event);
						break;
					case "dragend":
						this._end(event);
						break;
					case "swipe":
						this._swipe(event);
						break;
					case "dragcancel":
					case "scroll":
						this._cancel();
						break;
				}
			};

			prototype._translate = function (activeElementStyle, translateX, anim) {
				var deltaX = translateX / window.innerWidth * 100,
					self = this,
					fromColor, toColor, prefix;

				if (this.swipeLeftElement && translateX >= 0) {
					// left
					fromColor = self.options.ltrStartColor;
					toColor = self.options.ltrEndColor;
					prefix = "left";
				} else if (this.swipeRightElement && translateX < 0) {
					fromColor = self.options.rtlStartColor;
					toColor = self.options.rtlEndColor;
					prefix = "right";
					deltaX = Math.abs(deltaX);
				}

				(function animate() {
					activeElementStyle.background = "-webkit-linear-gradient(" + prefix + ", " + fromColor + " 0%, " + toColor + " " + deltaX + "%)";
					if (anim && deltaX < self.options.animationDuration) {
						self._animating = true;
						deltaX += self.options.animationInterval;
						window.webkitRequestAnimationFrame(animate);
					} else if (anim && deltaX >= self.options.animationDuration) {
						self._animating = false;
						self._transitionEnd();
					}
				}());
			};

			prototype._findScrollableElement = function (elem) {
				while ((elem.scrollHeight <= elem.offsetHeight) && (elem.scrollWidth <= elem.offsetWidth)) {
					elem = elem.parentNode;
				}
				return elem;
			};

			prototype._findSwipeTarget = function (element) {
				var selector = this.options.swipeTarget;

				while (element && element.webkitMatchesSelector && !element.webkitMatchesSelector(selector)) {
					element = element.parentNode;
				}
				return element;
			};

			prototype._fireEvent = function (eventName, detail) {
				var target = this.activeTarget || this.listElement;
				utilsEvents.trigger(target, eventName, detail);
			};

			prototype._start = function (e) {
				var gesture = e.detail,
					containerTop, width, height, top;

				this._dragging = false;
				this._cancelled = false;

				this.activeTarget = this._findSwipeTarget(gesture.srcEvent.target);

				if (this.activeTarget) {

					width = this.activeTarget.offsetWidth;
					height = this.activeTarget.offsetHeight;
					containerTop = this.container.scrollTop;
					top = this.activeTarget.offsetTop - containerTop;

					this.swipeElementStyle.top = containerTop + "px";

					if (this.swipeLeftElementStyle) {
						this.swipeLeftElementStyle.width = width + "px";
						this.swipeLeftElementStyle.height = height + "px";
						this.swipeLeftElementStyle.top = top + "px";
					}
					if (this.swipeRightElementStyle) {
						this.swipeRightElementStyle.width = width + "px";
						this.swipeRightElementStyle.height = height + "px";
						this.swipeRightElementStyle.top = top + "px";
					}

					this._dragging = true;
				}
			};

			prototype._move = function (e) {
				var gesture = e.detail,
					translateX = gesture.estimatedDeltaX,
					activeElementStyle;

				if (!this._dragging || this._cancelled) {
					return;
				}

				if (this.swipeLeftElement && (gesture.direction === Gesture.Direction.RIGHT) && translateX >= 0) {
					if (this.swipeRightElementStyle) {
						this.swipeRightElementStyle.display = "none";
					}
					this.activeElement = this.swipeLeftElement;
					activeElementStyle = this.swipeLeftElementStyle;

				} else if (this.swipeRightElement && (gesture.direction === Gesture.Direction.LEFT) && translateX < 0) {
					if (this.swipeLeftElementStyle) {
						this.swipeLeftElementStyle.display = "none";
					}
					this.activeElement = this.swipeRightElement;
					activeElementStyle = this.swipeRightElementStyle;
				}

				if (!activeElementStyle) {
					return;
				}

				activeElementStyle.display = "block";
				this.swipeElementStyle.display = "block"; // wrapper element

				this._translate(activeElementStyle, translateX, false);
			};

			prototype._end = function (e) {
				var gesture = e.detail;

				if (!this._dragging || this._cancelled) {
					return;
				}

				if (this.swipeLeftElement && (gesture.estimatedDeltaX > this.options.animationThreshold)) {
					this._fire(eventType.LEFT, e);
				} else if (this.swipeRightElement && (gesture.estimatedDeltaX < -this.options.animationThreshold)) {
					this._fire(eventType.RIGHT, e);
				} else {
					this._hide();
				}

				this._dragging = false;
			};

			prototype._swipe = function (e) {
				var gesture = e.detail;

				if (!this._dragging || this._cancelled) {
					return;
				}

				if (this.swipeLeftElement && (gesture.direction === Gesture.Direction.RIGHT)) {
					this._fire(eventType.LEFT, e);
				} else if (this.swipeRightElement && (gesture.direction === Gesture.Direction.LEFT)) {
					this._fire(eventType.RIGHT, e);
				} else {
					this._hide();
				}

				this._dragging = false;
			};

			prototype._fire = function (type, e) {
				var gesture = e.detail;

				if (type === eventType.LEFT) {
					this._translate(this.swipeLeftElementStyle, gesture.estimatedDeltaX, true);
				} else if (type === eventType.RIGHT) {
					this._translate(this.swipeRightElementStyle, gesture.estimatedDeltaX, true);
				}
			};

			prototype._transitionEnd = function () {
				this._hide();

				if (this.activeElement === this.swipeLeftElement) {
					this._fireEvent(eventType.LEFT);
				} else if (this.activeElement === this.swipeRightElement) {
					this._fireEvent(eventType.RIGHT);
				}
			};

			prototype._cancel = function () {
				this._dragging = false;
				this._cancelled = true;
				this._hide();
			};

			prototype._hide = function () {
				if (this.swipeElementStyle) {
					this.swipeElementStyle.display = "none";
				}

				if (this.activeElement) {
					this.activeElement.style.display = "none";
				}
			};

			prototype._destroy = function () {
				this._reset();

				this.element = null;
				this.container = null;
				this.swipeElement = null;
				this.swipeLeftElement = null;
				this.swipeRightElement = null;

				this.swipeElementStyle = null;
				this.swipeLeftElementStyle = null;
				this.swipeRightElementStyle = null;

				this.activeElement = null;
				this.activeTarget = null;

				this.startX = null;
				this.options = null;
				this.gesture = null;

				this._cancelled = null;
				this._dragging = null;
				this._animating = null;
			};

			SwipeList.prototype = prototype;

			ns.widget.wearable.SwipeList = SwipeList;

			engine.defineWidget(
				"SwipeList",
				".ui-swipe",
				[],
				SwipeList
			);
			}(window.document, ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * #Scrollbar namespace
 * Namespace with scrollbar for scroller widget.
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @class ns.widget.wearable.scroller.scrollbar
 */
(function (window, ns) {
	
				ns.widget.wearable.scroller.scrollbar = ns.widget.wearable.scroller.scrollbar || {};
			}(window, ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * #type namespace
 * Namespace with types of scroll bars..
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @class ns.widget.wearable.scroller.scrollbar.type
 */
(function (window, ns) {
	
				/** @namespace ns.widget.wearable */
			ns.widget.wearable.scroller.scrollbar.type = ns.widget.wearable.scroller.scrollbar.type || {};
			}(window, ns));

/*global window, define, Event, console, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #Type Interface
 * Interface for types used in scroll bar widget.
 * @class ns.widget.wearable.scroller.scrollbar.type.interface
 */
(function (document, ns) {
	
				// scroller.start event trigger when user try to move scroller

			ns.widget.wearable.scroller.scrollbar.type.interface = {
				/**
				 * Inserts elements end decorate.
				 * @method insertAndDecorate
				 * @param options
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.interface
				 */
				insertAndDecorate: function (/* options */) {
				},
				/**
				 * Removes element.
				 * @method remove
				 * @param options
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.interface
				 */
				remove: function (/* options */) {
				},
				/**
				 * ...
				 * @method start
				 * @param scrollbarElement
				 * @param barElement
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.interface
				 */
				start: function (/* scrollbarElement, barElement */) {
				},
				/**
				 * ...
				 * @method end
				 * @param scrollbarElement
				 * @param barElement
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.interface
				 */
				end: function (/* scrollbarElement, barElement */) {
				},
				/**
				 * ...
				 * @method offset
				 * @param orientation
				 * @param offset
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.interface
				 */
				offset: function (/* orientation, offset  */) {
				}
			};
			}(window.document, ns));

/*global window, define, Event, console, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #Bar Type
 * Bar type support for scroll bar widget.
 * @class ns.widget.wearable.scroller.scrollbar.type.bar
 * @extends ns.widget.wearable.scroller.scrollbar.type.interface
 */
(function (document, ns) {
	
				// scroller.start event trigger when user try to move scroller
			var utilsObject = ns.util.object,
				type = ns.widget.wearable.scroller.scrollbar.type,
				typeInterface = type.interface,
				Scroller = ns.widget.wearable.scroller.Scroller;

			type.bar = utilsObject.merge({}, typeInterface, {
				options: {
					wrapperClass: "ui-scrollbar-bar-type",
					barClass: "ui-scrollbar-indicator",
					orientationClass: "ui-scrollbar-",
					margin: 2,
					animationDuration: 500
				},

				/**
				 *
				 * @method insertAndDecorate
				 * @param data
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.bar
				 */
				insertAndDecorate: function( data ) {
					var scrollbarElement = data.wrapper,
						barElement = data.bar,
						container = data.container,
						clip = data.clip,
						orientation = data.orientation,
						margin = this.options.margin,
						clipSize = orientation === Scroller.Orientation.VERTICAL ? clip.offsetHeight : clip.offsetWidth,
						containerSize = orientation === Scroller.Orientation.VERTICAL ? container.offsetHeight : container.offsetWidth,
						orientationClass = this.options.orientationClass + (orientation === Scroller.Orientation.VERTICAL ? "vertical" : "horizontal"),
						barStyle = barElement.style;

					this.containerSize = containerSize;
					this.maxScrollOffset = clipSize - containerSize;
					this.scrollZoomRate = containerSize / clipSize;
					this.barSize = window.parseInt( containerSize / (clipSize/containerSize) ) - ( margin * 2 );

					scrollbarElement.className = this.options.wrapperClass + " " + orientationClass;
					barElement.className = this.options.barClass;

					if ( orientation === Scroller.Orientation.VERTICAL ) {
						barStyle.height = this.barSize + "px";
						barStyle.top = "0px";
					} else {
						barStyle.width = this.barSize + "px";
						barStyle.left = "0px";
					}

					container.appendChild(scrollbarElement);
				},

				/**
				 * @method insertAndDecorate
				 * @param data
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.bar
				 */
				remove: function (data) {
					var scrollbarElement = data.wrapper,
						container = data.container;

					if ( container && scrollbarElement) {
						container.removeChild(scrollbarElement);
					}
				},

				/**
				 * @method offset
				 * @param orientation
				 * @param offset
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.bar
				 */
				offset: function( orientation, offset ) {
					var x, y;

					offset = offset !== this.maxScrollOffset ?
						offset * this.scrollZoomRate :
						this.containerSize - this.barSize - this.options.margin * 2;

					if ( orientation === Scroller.Orientation.VERTICAL ) {
						x = 0;
						y = offset;
					} else {
						x = offset;
						y = 0;
					}

					return {
						x: x,
						y: y
					};
				},

				/**
				 * @method start
				 * @param scrollbarElement
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.bar
				 */
				start: function( scrollbarElement/*, barElement */) {
					var style = scrollbarElement.style,
						duration = this.options.animationDuration;
					style["-webkit-transition"] = "opacity " + duration / 1000 + "s ease";
					style.opacity = 1;
				},

				/**
				 * @method end
				 * @param scrollbarElement
				 * @static
				 * @member ns.widget.wearable.scroller.scrollbar.type.bar
				 */
				end: function( scrollbarElement/*, barElement */) {
					var style = scrollbarElement.style,
						duration = this.options.animationDuration;
					style["-webkit-transition"] = "opacity " + duration / 1000 + "s ease";
					style.opacity = 0;
				}
			});

			}(window.document, ns));

/*global window, define, Event, console, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #Scroll Bar Widget
 * Widget creates scroll bar.
 * @class ns.widget.wearable.scroller.scrollbar.ScrollBar
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	
				// scroller.start event trigger when user try to move scroller
			var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,
				prototype = new BaseWidget(),
				utilsObject = ns.util.object,
				selectors = ns.util.selectors,
				scrollbarType = ns.widget.wearable.scroller.scrollbar.type,

				Scroller = ns.widget.wearable.scroller.Scroller,
				ScrollerScrollBar = function () {

					this.wrapper = null;
					this.barElement = null;

					this.container = null;
					this.clip = null;

					this.options = {};
					this.type = null;

					this.maxScroll = null;
					this.started = false;
					this.displayDelayTimeoutId = null;

					this.lastScrollPosition = 0;
				};

			prototype._build = function (scrollElement) {
				this.container = scrollElement;
				this.clip = scrollElement.children[0];
				return scrollElement;
			};

			prototype._configure = function () {
				/**
				 * @property {Object} options Options for widget
				 * @property {boolean} [options.type=false]
				 * @property {number} [options.displayDelay=700]
				 * @property {"vertical"|"horizontal"} [options.orientation="vertical"]
				 * @member ns.widget.wearable.scroller.scrollbar.ScrollBar
				 */
				this.options = utilsObject.merge({}, this.options, {
					type: false,
					displayDelay: 700,
					orientation: Scroller.Orientation.VERTICAL
				});
			};

			prototype._init = function () {
				this.type = this.options.type;

				if ( !this.type ) {
					return;
				}
				this._createScrollbar();
			};

			prototype._bindEvents = function() {
				document.addEventListener("visibilitychange", this);
			};

			prototype._createScrollbar = function () {
				var orientation = this.options.orientation,
					wrapper = document.createElement("DIV"),
					bar = document.createElement("span");

				wrapper.appendChild(bar);

				this.type.insertAndDecorate({
					orientation: orientation,
					wrapper: wrapper,
					bar: bar,
					container: this.container,
					clip: this.clip
				});

				this.wrapper = wrapper;
				this.barElement = bar;
			};

			prototype._removeScrollbar = function () {
				this.type.remove({
					orientation: this.options.orientation,
					wrapper: this.wrapper,
					bar: this.barElement,
					container: this.container,
					clip: this.clip
				});

				this.wrapper = null;
				this.barElement = null;
			};

			prototype._refresh = function () {
				var self = this;
				self._clear();
				self._init();
				self.translate(self.lastScrollPosition);
			};

			/**
			 * Translates widget.
			 * @method translate
			 * @param offset
			 * @param duration
			 * @member ns.widget.wearable.scroller.scrollbar.ScrollBar
			 */
			prototype.translate = function (offset, duration, autoHidden) {
				var orientation = this.options.orientation,
					translate,
					transition,
					barStyle,
					endDelay;

				if ( !this.wrapper || !this.type || this.lastScrollPosition === offset ) {
					return;
				}

				autoHidden = autoHidden !== false;

				this.lastScrollPosition = offset;

				offset = this.type.offset( orientation, offset );

				barStyle = this.barElement.style;
				if ( !duration ) {
					transition = "none";
				} else {
					transition = "-webkit-transform " + duration / 1000 + "s ease-out";
				}

				translate = "translate3d(" + offset.x + "px," + offset.y + "px, 0)";

				barStyle["-webkit-transform"] = translate;
				barStyle["-webkit-transition"] = transition;

				if ( !this.started ) {
					this._start();
				}

				if ( this.displayDelayTimeoutId !== null ) {
					window.clearTimeout( this.displayDelayTimeoutId );
					this.displayDelayTimeoutId = null;
				}

				if ( autoHidden ) {
					endDelay = ( duration || 0 ) + this.options.displayDelay;
					this.displayDelayTimeoutId = window.setTimeout(this._end.bind(this), endDelay);
				}
			};

			prototype.end = function () {
				if ( !this.displayDelayTimeoutId ) {
					this.displayDelayTimeoutId = window.setTimeout(this._end.bind(this), this.options.displayDelay);
				}
			};

			prototype._start = function () {
				this.type.start(this.wrapper, this.barElement);
				this.started = true;
			};

			prototype._end = function () {
				this.started = false;
				this.displayDelayTimeoutId = null;

				if ( this.type ) {
					this.type.end(this.wrapper, this.barElement);
				}
			};

			/**
			 * Supports events.
			 * @method handleEvent
			 * @param event
			 * @member ns.widget.wearable.scroller.scrollbar.ScrollBar
			 */
			prototype.handleEvent = function(event) {
				var page;

				switch(event.type) {
				case "visibilitychange":
					page = selectors.getClosestBySelector(this.container, "." + ns.widget.wearable.Page.classes.uiPage);
					if (document.visibilityState === "visible" && page === ns.activePage) {
						this.refresh();
					}
					break;
				}
			};

			prototype._clear = function () {
				this._removeScrollbar();

				this.started = false;
				this.type = null;
				this.barElement = null;
				this.displayDelayTimeoutId = null;
			};

			prototype._destroy = function () {
				this._clear();
				document.removeEventListener("visibilitychange", this);

				this.options = null;
				this.container = null;
				this.clip = null;
			};

			ScrollerScrollBar.prototype = prototype;

			ns.widget.wearable.scroller.scrollbar.ScrollBar = ScrollerScrollBar;

			engine.defineWidget(
				"ScrollBar",
				"",
				["translate"],
				ScrollerScrollBar
			);
			}(window.document, ns));

/*global window, define, ns */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Router
 * Namespace for routers
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @class ns.router
 */
(function (ns) {
	
				ns.router = ns.router || {};
			}(ns));

/*global window, define, ns */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Route Namespace
 * Object contains rules for router.
 *
 * @class ns.router.route
 */
/*
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (ns) {
	
				ns.router.route = ns.router.route || {};
			}(ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #History
 * Object controls history changes.
 *
 * @class ns.router.history
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, ns) {
	
				var historyVolatileMode,
				object = ns.util.object,
				historyUid = 0,
				historyActiveIndex = 0,
				windowHistory = window.history,
				history = {
					/**
					 * Property contains active state in history.
					 * @property {Object} activeState
					 * @static
					 * @member ns.router.history
					 */
					activeState : null,

					/**
					 * This method replaces or pushes state to history.
					 * @method replace
					 * @param {Object} state The state object
					 * @param {string} stateTitle The title of state
					 * @param {string} url The new history entry's URL
					 * @static
					 * @member ns.router.history
					 */
					replace: function (state, stateTitle, url) {
						var newState = object.merge({}, state, {
								uid: historyVolatileMode ? historyActiveIndex : ++historyUid,
								stateUrl: url,
								stateTitle: stateTitle
							});
						windowHistory[historyVolatileMode ? "replaceState" : "pushState"](newState, stateTitle, url);
						history.setActive(newState);
					},

					/**
					 * This method moves backward through history.
					 * @method back
					 * @static
					 * @member ns.router.history
					 */
					back: function () {
						windowHistory.back();
					},

					/**
					 * This method sets active state.
					 * @method setActive
					 * @param {Object} state Activated state
					 * @static
					 * @member ns.router.history
					 */
					setActive: function (state) {
						if (state) {
							history.activeState = state;
							historyActiveIndex = state.uid;

							if (state.volatileRecord) {
								history.enableVolatileRecord();
								return;
							}
						}

						history.disableVolatileMode();
					},

					/**
					 * This method returns "back" if state is in history or "forward" if it is new state.
					 * @method getDirection
					 * @param {Object} state Checked state
					 * @return {"back"|"forward"}
					 * @static
					 * @member ns.router.history
					 */
					getDirection: function (state) {
						if (state) {
							return state.uid < historyActiveIndex ? "back" : "forward";
						}
						return "back";
					},

					/**
					 * This method sets volatile mode to true.
					 * @method enableVolatileRecord
					 * @static
					 * @member ns.router.history
					 */
					enableVolatileRecord: function () {
						historyVolatileMode = true;
					},

					/**
					 * This method sets volatile mode to false.
					 * @method disableVolatileMode
					 * @static
					 * @member ns.router.history
					 */
					disableVolatileMode: function () {
						historyVolatileMode = false;
					}
				};
			ns.router.history = history;
			}(window, ns));

/*global window, define, RegExp */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Path Utility
 * Object helps work with paths.
 * @class ns.util.path
 * @static
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, document, ns) {
	
					/**
				* Local alias for ns.engine
				* @property {Object} engine Alias for {@link ns.engine}
				* @member ns.util.path
				* @static
				* @private
				*/
			var engine = ns.engine,
				/**
				* Local alias for ns.util.object
				* @property {Object} utilsObject Alias for {@link ns.util.object}
				* @member ns.util.path
				* @static
				* @private
				*/
				utilsObject = ns.util.object,
				/**
				* Local alias for ns.util.selectors
				* @property {Object} utilsSelectors Alias for {@link ns.util.selectors}
				* @member ns.util.path
				* @static
				* @private
				*/
				utilsSelectors = ns.util.selectors,
				/**
				* Local alias for ns.util.DOM
				* @property {Object} utilsDOM Alias for {@link ns.util.DOM}
				* @member ns.util.path
				* @static
				* @private
				*/
				utilsDOM = ns.util.DOM,
				/**
				* Cache for document base element
				* @member ns.util.path
				* @property {HTMLBaseElement} base
				* @static
				* @private
				*/
				base,
				/**
				 * location object
				 * @property {Object} location
				 * @static
				 * @private
				 * @member ns.util.path
				 */
				location = {},
				path = {
					/**
					 * href part for mark state
					 * @property {string} [uiStateKey="&ui-state"]
					 * @static
					 * @member ns.util.path
					 */
					uiStateKey: "&ui-state",

					// This scary looking regular expression parses an absolute URL or its relative
					// variants (protocol, site, document, query, and hash), into the various
					// components (protocol, host, path, query, fragment, etc that make up the
					// URL as well as some other commonly used sub-parts. When used with RegExp.exec()
					// or String.match, it parses the URL into a results array that looks like this:
					//
					//	[0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
					//	[1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
					//	[2]: http://jblas:password@mycompany.com:8080/mail/inbox
					//	[3]: http://jblas:password@mycompany.com:8080
					//	[4]: http:
					//	[5]: //
					//	[6]: jblas:password@mycompany.com:8080
					//	[7]: jblas:password
					//	[8]: jblas
					//	[9]: password
					//	[10]: mycompany.com:8080
					//	[11]: mycompany.com
					//	[12]: 8080
					//	[13]: /mail/inbox
					//	[14]: /mail/
					//	[15]: inbox
					//	[16]: ?msg=1234&type=unread
					//	[17]: #msg-content
					//
					/**
					* @property {RegExp} urlParseRE Regular expression for parse URL
					* @member ns.util.path
					* @static
					*/
					urlParseRE: /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,

					/**
					* Abstraction to address xss (Issue #4787) by removing the authority in
					* browsers that auto decode it. All references to location.href should be
					* replaced with a call to this method so that it can be dealt with properly here
					* @method getLocation
					* @param {string|Object} url
					* @return {string}
					* @member ns.util.path
					*/
					getLocation: function (url) {
						var uri = this.parseUrl(url || window.location.href),
							hash = uri.hash;
						// mimic the browser with an empty string when the hash is empty
						hash = hash === "#" ? "" : hash;
						location = uri;
						// Make sure to parse the url or the location object for the hash because using location.hash
						// is autodecoded in firefox, the rest of the url should be from the object (location unless
						// we're testing) to avoid the inclusion of the authority
						return uri.protocol + "//" + uri.host + uri.pathname + uri.search + hash;
					},

					/**
					* Return the original document url
					* @method getDocumentUrl
					* @member ns.util.path
					* @param {boolean} [asParsedObject=false]
					* @return {string|Object}
					* @static
					*/
					getDocumentUrl: function (asParsedObject) {
						return asParsedObject ? utilsObject.copy(path.documentUrl) : path.documentUrl.href;
					},

					/**
					* Parse a location into a structure
					* @method parseLocation
					* @return {Object}
					* @member ns.util.path
					*/
					parseLocation: function () {
						return this.parseUrl(this.getLocation());
					},

					/**
					* Parse a URL into a structure that allows easy access to
					* all of the URL components by name.
					* If we're passed an object, we'll assume that it is
					* a parsed url object and just return it back to the caller.
					* @method parseUrl
					* @member ns.util.path
					* @param {string|Object} url
					* @return {Object} uri record
					* @return {string} return.href
					* @return {string} return.hrefNoHash
					* @return {string} return.hrefNoSearch
					* @return {string} return.domain
					* @return {string} return.protocol
					* @return {string} return.doubleSlash
					* @return {string} return.authority
					* @return {string} return.username
					* @return {string} return.password
					* @return {string} return.host
					* @return {string} return.hostname
					* @return {string} return.port
					* @return {string} return.pathname
					* @return {string} return.directory
					* @return {string} return.filename
					* @return {string} return.search
					* @return {string} return.hash
					* @static
					*/
					parseUrl: function (url) {
						var matches;
						if (typeof url === "object") {
							return url;
						}

						matches = path.urlParseRE.exec(url || "") || [];

							// Create an object that allows the caller to access the sub-matches
							// by name. Note that IE returns an empty string instead of undefined,
							// like all other browsers do, so we normalize everything so its consistent
							// no matter what browser we're running on.
						return {
							href:		matches[0] || "",
							hrefNoHash:   matches[1] || "",
							hrefNoSearch: matches[2] || "",
							domain:	matches[3] || "",
							protocol:	matches[4] || "",
							doubleSlash:  matches[5] || "",
							authority:	matches[6] || "",
							username:	matches[8] || "",
							password:	matches[9] || "",
							host:		matches[10] || "",
							hostname:	matches[11] || "",
							port:		matches[12] || "",
							pathname:	matches[13] || "",
							directory:	matches[14] || "",
							filename:	matches[15] || "",
							search:	matches[16] || "",
							hash:		matches[17] || ""
						};
					},

					/**
					* Turn relPath into an asbolute path. absPath is
					* an optional absolute path which describes what
					* relPath is relative to.
					* @method makePathAbsolute
					* @member ns.util.path
					* @param {string} relPath
					* @param {string} [absPath=""]
					* @return {string}
					* @static
					*/
					makePathAbsolute: function (relPath, absPath) {
						var absStack,
							relStack,
							directory,
							i;
						if (relPath && relPath.charAt(0) === "/") {
							return relPath;
						}

						relPath = relPath || "";
						absPath = absPath ? absPath.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "";

						absStack = absPath ? absPath.split("/") : [];
						relStack = relPath.split("/");
						for (i = 0; i < relStack.length; i++) {
							directory = relStack[i];
							switch (directory) {
							case ".":
								break;
							case "..":
								if (absStack.length) {
									absStack.pop();
								}
								break;
							default:
								absStack.push(directory);
								break;
							}
						}
						return "/" + absStack.join("/");
					},

					/**
					* Returns true if both urls have the same domain.
					* @method isSameDomain
					* @member ns.util.path
					* @param {string|Object} absUrl1
					* @param {string|Object} absUrl2
					* @return {boolean}
					* @static
					*/
					isSameDomain: function (absUrl1, absUrl2) {
						return path.parseUrl(absUrl1).domain === path.parseUrl(absUrl2).domain;
					},

					/**
					* Returns true for any relative variant.
					* @method isRelativeUrl
					* @member ns.util.path
					* @param {string|Object} url
					* @return {boolean}
					* @static
					*/
					isRelativeUrl: function (url) {
						// All relative Url variants have one thing in common, no protocol.
						return path.parseUrl(url).protocol === "";
					},

					/**
					 * Returns true for an absolute url.
					 * @method isAbsoluteUrl
					 * @member ns.util.path
					 * @param {string} url
					 * @return {boolean}
					 * @static
					 */
					isAbsoluteUrl: function (url) {
						return path.parseUrl(url).protocol !== "";
					},

					/**
					* Turn the specified realtive URL into an absolute one. This function
					* can handle all relative variants (protocol, site, document, query, fragment).
					* @method makeUrlAbsolute
					* @member ns.util.path
					* @param {string} relUrl
					* @param {string} absUrl
					* @return {string}
					* @static
					*/
					makeUrlAbsolute: function (relUrl, absUrl) {
						if (!path.isRelativeUrl(relUrl)) {
							return relUrl;
						}

						var relObj = path.parseUrl(relUrl),
							absObj = path.parseUrl(absUrl),
							protocol = relObj.protocol || absObj.protocol,
							doubleSlash = relObj.protocol ? relObj.doubleSlash : (relObj.doubleSlash || absObj.doubleSlash),
							authority = relObj.authority || absObj.authority,
							hasPath = relObj.pathname !== "",
							pathname = path.makePathAbsolute(relObj.pathname || absObj.filename, absObj.pathname),
							search = relObj.search || (!hasPath && absObj.search) || "",
							hash = relObj.hash;

						return protocol + doubleSlash + authority + pathname + search + hash;
					},

					/**
					* Add search (aka query) params to the specified url.
					* @method addSearchParams
					* @member ns.util.path
					* @param {string|Object} url
					* @param {Object|string} params
					* @return {string}
					*/
					addSearchParams: function (url, params) {
						var urlObject = path.parseUrl(url),
							paramsString = (typeof params === "object") ? this.getAsURIParameters(params) : params,
							searchChar = urlObject.search || "?";
						return urlObject.hrefNoSearch + searchChar + (searchChar.charAt(searchChar.length - 1) === "?" ? "" : "&") + paramsString + (urlObject.hash || "");
					},

					/**
					 * Add search params to the specified url with hash
					 * @method addHashSearchParams
					 * @member ns.util.path
					 * @param {string|Object} url
					 * @param {Object|string} params
					 * @returns {string}
					 */
					addHashSearchParams: function (url, params) {
						var urlObject = path.parseUrl(url),
							paramsString = (typeof params === "object") ? path.getAsURIParameters(params) : params,
							hash = urlObject.hash,
							searchChar = hash ? (hash.indexOf("?") < 0 ? hash + "?" : hash + "&") : "#?";
						return urlObject.hrefNoHash + searchChar + (searchChar.charAt(searchChar.length - 1) === "?" ? "" : "&") + paramsString;
					},

					/**
					* Convert absolute Url to data Url
					* - for embedded pages strips hash and paramters
					* - for the same domain as document base remove domain
					* otherwise returns decoded absolute Url
					* @method convertUrlToDataUrl
					* @member ns.util.path
					* @param {string} absUrl
					* @param {string} dialogHashKey
					* @param {Object} documentBase uri structure
					* @return {string}
					* @static
					*/
					convertUrlToDataUrl: function (absUrl, dialogHashKey, documentBase) {
						var urlObject = path.parseUrl(absUrl);

						if (path.isEmbeddedPage(urlObject, dialogHashKey)) {
							// For embedded pages, remove the dialog hash key as in getFilePath(),
							// otherwise the Data Url won't match the id of the embedded Page.
							return urlObject.hash.replace(/^#|\?.*$/g, "");
						}
						documentBase = documentBase || path.documentBase;
						if (path.isSameDomain(urlObject, documentBase)) {
							return urlObject.hrefNoHash.replace(documentBase.domain, "");
						}

						return window.decodeURIComponent(absUrl);
					},

					/**
					* Get path from current hash, or from a file path
					* @method get
					* @member ns.util.path
					* @param {string} newPath
					* @return {string}
					*/
					get: function (newPath) {
						if (newPath === undefined) {
							newPath = this.parseLocation().hash;
						}
						return this.stripHash(newPath).replace(/[^\/]*\.[^\/*]+$/, '');
					},

					/**
					* Test if a given url (string) is a path
					* NOTE might be exceptionally naive
					* @method isPath
					* @member ns.util.path
					* @param {string} url
					* @return {boolean}
					* @static
					*/
					isPath: function (url) {
						return (/\//).test(url);
					},

					/**
					* Return a url path with the window's location protocol/hostname/pathname removed
					* @method clean
					* @member ns.util.path
					* @param {string} url
					* @param {Object} documentBase  uri structure
					* @return {string}
					* @static
					*/
					clean: function (url, documentBase) {
						return url.replace(documentBase.domain, "");
					},

					/**
					* Just return the url without an initial #
					* @method stripHash
					* @member ns.util.path
					* @param {string} url
					* @return {string}
					* @static
					*/
					stripHash: function (url) {
						return url.replace(/^#/, "");
					},

					/**
					* Return the url without an query params
					* @method stripQueryParams
					* @member ns.util.path
					* @param {string} url
					* @return {string}
					* @static
					*/
					stripQueryParams: function (url) {
						return url.replace(/\?.*$/, "");
					},

					/**
					* Validation proper hash
					* @method isHashValid
					* @member ns.util.path
					* @param {string} hash
					* @static
					*/
					isHashValid: function (hash) {
						return (/^#[^#]+$/).test(hash);
					},

					/**
					* Check whether a url is referencing the same domain, or an external domain or different protocol
					* could be mailto, etc
					* @method isExternal
					* @member ns.util.path
					* @param {string|Object} url
					* @param {Object} documentUrl uri object
					* @return {boolean}
					* @static
					*/
					isExternal: function (url, documentUrl) {
						var urlObject = path.parseUrl(url);
						return urlObject.protocol && urlObject.domain !== documentUrl.domain ? true : false;
					},

					/**
					* Check if the url has protocol
					* @method hasProtocol
					* @member ns.util.path
					* @param {string} url
					* @return {boolean}
					* @static
					*/
					hasProtocol: function (url) {
						return (/^(:?\w+:)/).test(url);
					},

					/**
					 * Check if the url refers to embedded content
					 * @method isEmbedded
					 * @member ns.util.path
					 * @param {string} url
					 * @returns {boolean}
					 * @static
					 */
					isEmbedded: function (url) {
						var urlObject = path.parseUrl(url);

						if (urlObject.protocol !== "") {
							return (!path.isPath(urlObject.hash) && !!urlObject.hash && (urlObject.hrefNoHash === path.parseLocation().hrefNoHash));
						}
						return (/^#/).test(urlObject.href);
					},

					/**
					* Get the url as it would look squashed on to the current resolution url
					* @method squash
					* @member ns.util.path
					* @param {string} url
					* @param {string} [resolutionUrl=undefined]
					* @return {string}
					*/
					squash: function (url, resolutionUrl) {
						var href,
							cleanedUrl,
							search,
							stateIndex,
							isPath = this.isPath(url),
							uri = this.parseUrl(url),
							preservedHash = uri.hash,
							uiState = "";

						// produce a url against which we can resole the provided path
						resolutionUrl = resolutionUrl || (path.isPath(url) ? path.getLocation() : path.getDocumentUrl());

						// If the url is anything but a simple string, remove any preceding hash
						// eg #foo/bar -> foo/bar
						//	#foo -> #foo
						cleanedUrl = isPath ? path.stripHash(url) : url;

						// If the url is a full url with a hash check if the parsed hash is a path
						// if it is, strip the #, and use it otherwise continue without change
						cleanedUrl = path.isPath(uri.hash) ? path.stripHash(uri.hash) : cleanedUrl;

						// Split the UI State keys off the href
						stateIndex = cleanedUrl.indexOf(this.uiStateKey);

						// store the ui state keys for use
						if (stateIndex > -1) {
							uiState = cleanedUrl.slice(stateIndex);
							cleanedUrl = cleanedUrl.slice(0, stateIndex);
						}

						// make the cleanedUrl absolute relative to the resolution url
						href = path.makeUrlAbsolute(cleanedUrl, resolutionUrl);

						// grab the search from the resolved url since parsing from
						// the passed url may not yield the correct result
						search = this.parseUrl(href).search;

						// @TODO all this crap is terrible, clean it up
						if (isPath) {
							// reject the hash if it's a path or it's just a dialog key
							if (path.isPath(preservedHash) || preservedHash.replace("#", "").indexOf(this.uiStateKey) === 0) {
								preservedHash = "";
							}

							// Append the UI State keys where it exists and it's been removed
							// from the url
							if (uiState && preservedHash.indexOf(this.uiStateKey) === -1) {
								preservedHash += uiState;
							}

							// make sure that pound is on the front of the hash
							if (preservedHash.indexOf("#") === -1 && preservedHash !== "") {
								preservedHash = "#" + preservedHash;
							}

							// reconstruct each of the pieces with the new search string and hash
							href = path.parseUrl(href);
							href = href.protocol + "//" + href.host + href.pathname + search + preservedHash;
						} else {
							href += href.indexOf("#") > -1 ? uiState : "#" + uiState;
						}

						return href;
					},

					/**
					* Check if the hash is preservable
					* @method isPreservableHash
					* @member ns.util.path
					* @param {string} hash
					* @return {boolean}
					*/
					isPreservableHash: function (hash) {
						return hash.replace("#", "").indexOf(this.uiStateKey) === 0;
					},

					/**
					* Escape weird characters in the hash if it is to be used as a selector
					* @method hashToSelector
					* @member ns.util.path
					* @param {string} hash
					* @return {string}
					* @static
					*/
					hashToSelector: function (hash) {
						var hasHash = (hash.substring(0, 1) === "#");
						if (hasHash) {
							hash = hash.substring(1);
						}
						return (hasHash ? "#" : "") + hash.replace(new RegExp('([!"#$%&\'()*+,./:;<=>?@[\\]^`{|}~])', 'g'), "\\$1");
					},

					/**
					* Check if the specified url refers to the first page in the main application document.
					* @method isFirstPageUrl
					* @member ns.util.path
					* @param {string} url
					* @param {Object} documentBase uri structure
					* @param {boolean} documentBaseDiffers
					* @param {Object} documentUrl uri structure
					* @return {boolean}
					* @static
					*/
					isFirstPageUrl: function (url, documentBase, documentBaseDiffers, documentUrl) {
						var urlStructure,
							samePath,
							firstPage,
							firstPageId,
							hash;

						documentBase = documentBase === undefined ? path.documentBase : documentBase;
						documentBaseDiffers = documentBaseDiffers === undefined ? path.documentBaseDiffers : documentBaseDiffers;
						documentUrl = documentUrl === undefined ? path.documentUrl : documentUrl;

						// We only deal with absolute paths.
						urlStructure = path.parseUrl(path.makeUrlAbsolute(url, documentBase));

						// Does the url have the same path as the document?
						samePath = urlStructure.hrefNoHash === documentUrl.hrefNoHash || (documentBaseDiffers && urlStructure.hrefNoHash === documentBase.hrefNoHash);

						// Get the first page element.
						firstPage = engine.getRouter().firstPage;

						// Get the id of the first page element if it has one.
						firstPageId = firstPage ? firstPage.id : undefined;
						hash = urlStructure.hash;

						// The url refers to the first page if the path matches the document and
						// it either has no hash value, or the hash is exactly equal to the id of the
						// first page element.
						return samePath && (!hash || hash === "#" || (firstPageId && hash.replace(/^#/, "") === firstPageId));
					},

					/**
					* Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
					* requests if the document doing the request was loaded via the file:// protocol.
					* This is usually to allow the application to "phone home" and fetch app specific
					* data. We normally let the browser handle external/cross-domain urls, but if the
					* allowCrossDomainPages option is true, we will allow cross-domain http/https
					* requests to go through our page loading logic.
					* @method isPermittedCrossDomainRequest
					* @member ns.util.path
					* @param {Object} docUrl
					* @param {string} reqUrl
					* @return {boolean}
					* @static
					*/
					isPermittedCrossDomainRequest: function (docUrl, reqUrl) {
						return ns.getConfig('allowCrossDomainPages', false) &&
							docUrl.protocol === "file:" &&
							reqUrl.search(/^https?:/) !== -1;
					},

					/**
					* Convert a object data to URI parameters
					* @method getAsURIParameters
					* @member ns.util.path
					* @param {Object} data
					* @return {string}
					* @static
					*/
					getAsURIParameters: function (data) {
						var url = '',
							key;
						for (key in data) {
							if (data.hasOwnProperty(key)) {
								url += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
							}
						}
						return url.substring(0, url.length - 1);
					},

					/**
					* Document Url
					* @member ns.util.path
					* @property {string|null} documentUrl
					*/
					documentUrl: null,

					/**
					* The document base differs
					* @member ns.util.path
					* @property {boolean} documentBaseDiffers
					*/
					documentBaseDiffers: false,

					/**
					* Set location hash to path
					* @method set
					* @member ns.util.path
					* @param {string} path
					* @static
					*/
					set: function (path) {
						location.hash = path;
					},

					/**
					* Return the substring of a filepath before the sub-page key,
					* for making a server request
					* @method getFilePath
					* @member ns.util.path
					* @param {string} path
					* @param {string} dialogHashKey
					* @return {string}
					* @static
					*/
					getFilePath: function (path, dialogHashKey) {
						var splitkey = '&' + ns.getConfig('subPageUrlKey', '');
						return path && path.split(splitkey)[0].split(dialogHashKey)[0];
					},

					/**
					* Remove the preceding hash, any query params, and dialog notations
					* @method cleanHash
					* @member ns.util.path
					* @param {string} hash
					* @param {string} dialogHashKey
					* @return {string}
					* @static
					*/
					cleanHash: function (hash, dialogHashKey) {
						return path.stripHash(hash.replace(/\?.*$/, "").replace(dialogHashKey, ""));
					},

					/**
					* Check if url refers to the embedded page
					* @method isEmbeddedPage
					* @member ns.util.path
					* @param {string} url
					* @param {boolean} allowEmbeddedOnlyBaseDoc
					* @return {boolean}
					* @static
					*/
					isEmbeddedPage: function (url, allowEmbeddedOnlyBaseDoc) {
						var urlObject = path.parseUrl(url);

						//if the path is absolute, then we need to compare the url against
						//both the documentUrl and the documentBase. The main reason for this
						//is that links embedded within external documents will refer to the
						//application document, whereas links embedded within the application
						//document will be resolved against the document base.
						if (urlObject.protocol !== "") {
							return (urlObject.hash &&
									( allowEmbeddedOnlyBaseDoc ?
											urlObject.hrefNoHash === path.documentUrl.hrefNoHash :
											urlObject.hrefNoHash === path.parseLocation().hrefNoHash ));
						}
						return (/^#/).test(urlObject.href);
					}
				};

			path.documentUrl = path.parseLocation();

			base = document.querySelector('base');

			/**
			* The document base URL for the purposes of resolving relative URLs,
			* and the name of the default browsing context for the purposes of
			* following hyperlinks
			* @member ns.util.path
			* @property {Object} documentBase uri structure
			* @static
			*/
			path.documentBase = base ? path.parseUrl(path.makeUrlAbsolute(base.getAttribute("href"), path.documentUrl.href)) : path.documentUrl;

			path.documentBaseDiffers = (path.documentUrl.hrefNoHash !== path.documentBase.hrefNoHash);

			/**
			* Get document base
			* @method getDocumentBase
			* @member ns.util.path
			* @param {boolean} [asParsedObject=false]
			* @return {string|Object}
			* @static
			*/
			path.getDocumentBase = function (asParsedObject) {
				return asParsedObject ? utilsObject.copy(path.documentBase) : path.documentBase.href;
			};

			/**
			* Find the closest page and extract out its url
			* @method getClosestBaseUrl
			* @member ns.util.path
			* @param {HTMLElement} element
			* @param {string} selector
			* @return {string}
			* @static
			*/
			path.getClosestBaseUrl = function (element, selector) {
				// Find the closest page and extract out its url.
				var url = utilsDOM.getNSData(utilsSelectors.getClosestBySelector(element, selector), "url"),
					baseUrl = path.documentBase.hrefNoHash;

				if (!ns.getConfig('dynamicBaseEnabled', true) || !url || !path.isPath(url)) {
					url = baseUrl;
				}

				return path.makeUrlAbsolute(url, baseUrl);
			};

			ns.util.path = path;
			}(window, window.document, ns));

/*global window, define, XMLHttpRequest */
/*jslint nomen: true */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Router
 * Main class to navigate between pages and popups in profile Wearable.
 *
 * @class ns.router.Router
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function (window, document, ns) {
	
					/**
				 * Local alias for ns.util
				 * @property {Object} util Alias for {@link ns.util}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
			var util = ns.util,
				/**
				 * Local alias for ns.event
				 * @property {Object} eventUtils Alias for {@link ns.event}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				eventUtils = ns.event,
				/**
				 * Alias for {@link ns.util.DOM}
				 * @property {Object} DOM
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				DOM = util.DOM,
				/**
				 * Local alias for ns.util.path
				 * @property {Object} path Alias for {@link ns.util.path}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				path = util.path,
				/**
				 * Local alias for ns.util.selectors
				 * @property {Object} selectors Alias for {@link ns.util.selectors}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				selectors = util.selectors,
				/**
				 * Local alias for ns.util.object
				 * @property {Object} object Alias for {@link ns.util.object}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				object = util.object,
				/**
				 * Local alias for ns.engine
				 * @property {Object} engine Alias for {@link ns.engine}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				engine = ns.engine,
				/**
				 * Local alias for ns.router.wearable
				 * @property {Object} routerMicro Alias for namespace ns.router.wearable
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				routerMicro = ns.router,
				/**
				 * Local alias for ns.router.wearable.history
				 * @property {Object} history Alias for {@link ns.router.wearable.history}
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				history = routerMicro.history,
				/**
				 * Local alias for ns.router.wearable.route
				 * @property {Object} route Alias for namespace ns.router.wearable.route
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				route = routerMicro.route,
				/**
				 * Local alias for document body element
				 * @property {HTMLElement} body
				 * @member ns.router.Router
				 * @static
				 * @private
				 */
				body = document.body,
				/**
				 * Alias to Array.slice method
				 * @method slice
				 * @member ns.router.Router
				 * @private
				 * @static
				 */
				slice = [].slice,

				/**
				 * Router locking flag
				 * @property {boolean} [_isLock]
				 * @member ns.router.Router
				 * @private
				 */
				_isLock = false,

				Page = ns.widget.wearable.Page,

				Router = function () {
					var self = this;

					/**
					 * Element of the page opened as first.
					 * @property {?HTMLElement} [firstPage]
					 * @member ns.router.Router
					 */
					self.firstPage = null;
					/**
					 * The container of widget.
					 * @property {?ns.widget.wearable.PageContainer} [container]
					 * @member ns.router.Router
					 */
					self.container = null;
					/**
					 * Settings for last open method
					 * @property {Object} [settings]
					 * @member ns.router.Router
					 */
					self.settings = {};
				};

			/**
			 * Default values for router
			 * @property {Object} defaults
			 * @property {boolean} [defaults.fromHashChange = false] Sets if will be changed after hashchange.
			 * @property {boolean} [defaults.reverse = false] Sets the direction of change.
			 * @property {boolean} [defaults.showLoadMsg = true] Sets if message will be shown during loading.
			 * @property {number} [defaults.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @property {boolean} [defaults.volatileRecord = false] Sets if the current history entry will be modified or a new one will be created.
			 * @member ns.router.Router
			 */
			Router.prototype.defaults = {
				fromHashChange: false,
				reverse: false,
				showLoadMsg: true,
				loadMsgDelay: 0,
				volatileRecord: false
			};

			/**
			 * Find the closest link for element
			 * @method findClosestLink
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @private
			 * @static
			 * @member ns.router.Router
			 */
			function findClosestLink(element) {
				while (element) {
					if (element.nodeType === Node.ELEMENT_NODE && element.nodeName && element.nodeName === "A") {
						break;
					}
					element = element.parentNode;
				}
				return element;
			}

			/**
			 * Handle event link click
			 * @method linkClickHandler
			 * @param {ns.router.Router} router
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.router.Router
			 */
			function linkClickHandler(router, event) {
				var link = findClosestLink(event.target),
					href,
					useDefaultUrlHandling,
					options;

				if (link && event.which === 1) {
					href = link.getAttribute("href");
					useDefaultUrlHandling = (link.getAttribute("rel") === "external") || link.hasAttribute("target");
					if (!useDefaultUrlHandling) {
						options = DOM.getData(link);
						options.link = link.id;
						router.open(href, options, event);
						eventUtils.preventDefault(event);
					}
				}
			}

			/**
			 * Handle event for pop state
			 * @method popStateHandler
			 * @param {ns.router.Router} router
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.router.Router
			 */
			function popStateHandler(router, event) {
				var state = event.state,
					prevState = history.activeState,
					rules = routerMicro.route,
					ruleKey,
					options,
					to,
					url,
					isContinue = true,
					reverse,
					transition;

				if (_isLock) {
					history.disableVolatileMode();
					history.replace(prevState, prevState.stateTitle, prevState.stateUrl);
					return;
				}

				if (state) {
					to = state.url;
					reverse = history.getDirection(state) === "back";
					transition = reverse ? ((prevState && prevState.transition) || "none") : state.transition;
					options = object.merge({}, state, {
						reverse: reverse,
						transition: transition,
						fromHashChange: true
					});

					url = path.getLocation();

					for (ruleKey in rules) {
						if (rules.hasOwnProperty(ruleKey) && rules[ruleKey].onHashChange(url, options)) {
							isContinue = false;
						}
					}

					history.setActive(state);

					if (isContinue) {
						router.open(to, options);
					}
				}
			}

			/**
			 * Change page to page given in parameter "to".
			 * @method open
			 * @param {string|HTMLElement} to Id of page or file url or HTMLElement of page
			 * @param {Object} [options]
			 * @param {"page"|"popup"|"external"} [options.rel = "page"] Represents kind of link as "page" or "popup" or "external" for linking to another domain.
			 * @param {string} [options.transition = "none"] Sets the animation used during change of page.
			 * @param {boolean} [options.reverse = false] Sets the direction of change.
			 * @param {boolean} [options.fromHashChange = false] Sets if will be changed after hashchange.
			 * @param {boolean} [options.showLoadMsg = true] Sets if message will be shown during loading.
			 * @param {number} [options.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @param {boolean} [options.volatileRecord = false] Sets if the current history entry will be modified or a new one will be created.
			 * @param {boolean} [options.dataUrl] Sets if page has url attribute.
			 * @param {?string} [options.container = null] It is used in RoutePopup as selector for container.
			 * @member ns.router.Router
			 */
			Router.prototype.open = function (to, options, event) {
				var rel = ((options && options.rel) || "page"),
					rule = route[rel],
					deferred = {},
					filter,
					self = this;

				if (_isLock) {
					return;
				}

				if (rel === "back") {
					history.back();
					return;
				}

				if (rule) {
					options = object.merge(
						{
							rel: rel
						},
						this.defaults,
						rule.option(),
						options
					);
					filter = rule.filter;
					deferred.resolve = function (options, content) {
						rule.open(content, options, event);
					};
					deferred.reject = function (options) {
						eventUtils.trigger(self.container.element, "changefailed", options);
					};
					if (typeof to === "string") {
						if (to.replace(/[#|\s]/g, "")) {
							this._loadUrl(to, options, rule, deferred);
						}
					} else {
						if (to && selectors.matchesSelector(to, filter)) {
							deferred.resolve(options, to);
						} else {
							deferred.reject(options);
						}
					}
				} else {
					throw new Error("Not defined router rule [" + rel + "]");
				}
			};

			/**
			 * Method initializes page container and builds the first page if flag autoInitializePage is set.
			 * @method init
			 * @param {boolean} justBuild
			 * @member ns.router.Router
			 */
			Router.prototype.init = function (justBuild) {
				var page,
					containerElement,
					container,
					firstPage,
					pages,
					activePages,
					location = window.location,
					PageClasses = Page.classes,
					uiPageClass = PageClasses.uiPage,
					uiPageActiveClass = PageClasses.uiPageActive,
					self = this;

				body = document.body;
				containerElement = ns.getConfig("pageContainer") || body;
				pages = slice.call(containerElement.querySelectorAll("." + uiPageClass));
				self.justBuild = justBuild;

				if (ns.getConfig("autoInitializePage", true)) {
					firstPage = containerElement.querySelector("." + uiPageActiveClass);
					if (!firstPage) {
						firstPage = pages[0];
					}

					if (firstPage) {
						activePages = containerElement.querySelectorAll("." + uiPageActiveClass);
						slice.call(activePages).forEach(function (page) {
							page.classList.remove("." + uiPageActiveClass);
						});
						containerElement = firstPage.parentNode;
					}

					if (justBuild) {
												//engine.createWidgets(containerElement, true);
						container = engine.instanceWidget(containerElement, "pagecontainer");
						if (firstPage) {
							self.register(container, firstPage);
						}
						return;
					}

					if (location.hash) {
						//simple check to determine if we should show firstPage or other
						page = document.getElementById(location.hash.replace("#", ""));
						if (page && selectors.matchesSelector(page, "." + uiPageClass)) {
							firstPage = page;
						}
					}
				}

				pages.forEach(function (page) {
					if (!DOM.getNSData(page, "url")) {
						DOM.setNSData(page, "url", page.id || location.pathname + location.search);
					}
				});

				container = engine.instanceWidget(containerElement, "pagecontainer");
				self.register(container, firstPage);
			};

			/**
			 * Method removes all events listners set by router.
			 * @method destroy
			 * @member ns.router.Router
			 */
			Router.prototype.destroy = function () {
				var self = this;
				window.removeEventListener("popstate", self.popStateHandler, false);
				if (body) {
					body.removeEventListener("pagebeforechange", this.pagebeforechangeHandler, false);
					body.removeEventListener("vclick", self.linkClickHandler, false);
				}
			};

			/**
			 * Method sets container.
			 * @method setContainer
			 * @param {ns.widget.wearable.PageContainer} container
			 * @member ns.router.Router
			 */
			Router.prototype.setContainer = function (container) {
				this.container = container;
			};

			/**
			 * Method returns container.
			 * @method getContainer
			 * @return {ns.widget.wearable.PageContainer} container of widget
			 * @member ns.router.Router
			 */
			Router.prototype.getContainer = function () {
				return this.container;
			};

			/**
			 * Method returns ths first page.
			 * @method getFirstPage
			 * @return {HTMLElement} the first page
			 * @member ns.router.Router
			 */
			Router.prototype.getFirstPage = function () {
				return this.firstPage;
			};

			/**
			 * Method registers page container and the first page.
			 * @method register
			 * @param {ns.widget.wearable.PageContainer} container
			 * @param {HTMLElement} firstPage
			 * @member ns.router.Router
			 */
			Router.prototype.register = function (container, firstPage) {
				var self = this;
				self.container = container;
				self.firstPage = firstPage;

				self.linkClickHandler = linkClickHandler.bind(null, self);
				self.popStateHandler = popStateHandler.bind(null, self);

				document.addEventListener("vclick", self.linkClickHandler, false);
				window.addEventListener("popstate", self.popStateHandler, false);

				history.enableVolatileRecord();
				if (firstPage) {
					self.open(firstPage, { transition: "none" });
				}
			};

			/**
			 * Method opens popup.
			 * @method openPopup
			 * @param {HTMLElement|string} to Id or HTMLElement of popup.
			 * @param {Object} [options]
			 * @param {string} [options.transition = "none"] Sets the animation used during change of page.
			 * @param {boolean} [options.reverse = false] Sets the direction of change.
			 * @param {boolean} [options.fromHashChange = false] Sets if will be changed after hashchange.
			 * @param {boolean} [options.showLoadMsg = true] Sets if message will be shown during loading.
			 * @param {number} [options.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @param {boolean} [options.volatileRecord = false] Sets if the current history entry will be modified or a new one will be created.
			 * @param {boolean} [options.dataUrl] Sets if page has url attribute.
			 * @param {?string} [options.container = null] It is used in RoutePopup as selector for container.
			 * @member ns.router.Router
			 */
			Router.prototype.openPopup = function (to, options) {
				this.open(to, object.fastMerge({rel: "popup"}, options));
			};

			/**
			 * Method closes popup.
			 * @method closePopup
			 * @param {Object} options
			 * @param {string=} [options.transition]
			 * @param {string=} [options.ext= in ui-pre-in] options.ext
			 * @member ns.router.Router
			 */
			Router.prototype.closePopup = function (options) {
				var popupRoute = this.getRoute("popup");

				if (popupRoute) {
					popupRoute.close(null, options);
				}
			};

			Router.prototype.lock = function () {
				_isLock = true;
			};

			Router.prototype.unlock = function () {
				_isLock = false;
			};

			/**
			 * Load content from url
			 * @method _loadUrl
			 * @param {string} url
			 * @param {Object} options
			 * @param {"page"|"popup"|"external"} [options.rel = "page"] Represents kind of link as "page" or "popup" or "external" for linking to another domain.
			 * @param {string} [options.transition = "none"] Sets the animation used during change of page.
			 * @param {boolean} [options.reverse = false] Sets the direction of change.
			 * @param {boolean} [options.fromHashChange = false] Sets if will be changed after hashchange.
			 * @param {boolean} [options.showLoadMsg = true] Sets if message will be shown during loading.
			 * @param {number} [options.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @param {boolean} [options.volatileRecord = false] Sets if the current history entry will be modified or a new one will be created.
			 * @param {boolean} [options.dataUrl] Sets if page has url attribute.
			 * @param {?string} [options.container = null] It is used in RoutePopup as selector for container.
			 * @param {string} [options.absUrl] Absolute Url for content used by deferred object.
			 * @param {Object} rule
			 * @param {Object} deferred
			 * @param {Function} deferred.reject
			 * @param {Function} deferred.resolve
			 * @member ns.router.Router
			 * @protected
			 */
			Router.prototype._loadUrl = function (url, options, rule, deferred) {
				var absUrl = path.makeUrlAbsolute(url, path.getLocation()),
					content,
					request,
					detail = {},
					self = this;

				content = rule.find(absUrl);

				if (!content && path.isEmbedded(absUrl)) {
					deferred.reject(detail);
					return;
				}
				// If the content we are interested in is already in the DOM,
				// and the caller did not indicate that we should force a
				// reload of the file, we are done. Resolve the deferrred so that
				// users can bind to .done on the promise
				if (content) {
					detail = object.fastMerge({absUrl: absUrl}, options);
					deferred.resolve(detail, content);
					return;
				}

				if (options.showLoadMsg) {
					self._showLoading(options.loadMsgDelay);
				}

				// Load the new content.
				request = new XMLHttpRequest();
				request.responseType = "document";
				request.overrideMimeType("text/html");
				request.open("GET", absUrl);
				request.addEventListener("error", self._loadError.bind(self, absUrl, options, deferred));
				request.addEventListener("load", function (event) {
					var request = event.target;
					if (request.readyState === 4) {
						if (request.status === 200 || (request.status === 0 && request.responseXML)) {
							self._loadSuccess(absUrl, options, rule, deferred, request.responseXML);
						} else {
							self._loadError(absUrl, options, deferred);
						}
					}
				});
				request.send();
			};

			/**
			 * Error handler for loading content by AJAX
			 * @method _loadError
			 * @param {string} absUrl
			 * @param {Object} options
			 * @param {"page"|"popup"|"external"} [options.rel = "page"] Represents kind of link as "page" or "popup" or "external" for linking to another domain.
			 * @param {string} [options.transition = "none"] Sets the animation used during change of page.
			 * @param {boolean} [options.reverse = false] Sets the direction of change.
			 * @param {boolean} [options.fromHashChange = false] Sets if will be changed after hashchange.
			 * @param {boolean} [options.showLoadMsg = true] Sets if message will be shown during loading.
			 * @param {number} [options.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @param {boolean} [options.volatileRecord = false] Sets if the current history entry will be modified or a new one will be created.
			 * @param {boolean} [options.dataUrl] Sets if page has url attribute.
			 * @param {?string} [options.container = null] It is used in RoutePopup as selector for container.
			 * @param {string} [options.absUrl] Absolute Url for content used by deferred object.
			 * @param {Object} deferred
			 * @param {Function} deferred.reject
			 * @member ns.router.Router
			 * @protected
			 */
			Router.prototype._loadError = function (absUrl, options, deferred) {
				var detail = object.fastMerge({url: absUrl}, options),
					self = this;
				// Remove loading message.
				if (options.showLoadMsg) {
					self._showError(absUrl);
				}

				eventUtils.trigger(self.container.element, "loadfailed", detail);
				deferred.reject(detail);
			};

			// TODO it would be nice to split this up more but everything appears to be "one off"
			//	or require ordering such that other bits are sprinkled in between parts that
			//	could be abstracted out as a group
			/**
			 * Success handler for loading content by AJAX
			 * @method _loadSuccess
			 * @param {string} absUrl
			 * @param {Object} options
			 * @param {"page"|"popup"|"external"} [options.rel = "page"] Represents kind of link as "page" or "popup" or "external" for linking to another domain.
			 * @param {string} [options.transition = "none"] Sets the animation used during change of page.
			 * @param {boolean} [options.reverse = false] Sets the direction of change.
			 * @param {boolean} [options.fromHashChange = false] Sets if will be changed after hashchange.
			 * @param {boolean} [options.showLoadMsg = true] Sets if message will be shown during loading.
			 * @param {number} [options.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @param {boolean} [options.volatileRecord = false] Sets if the current history entry will be modified or a new one will be created.
			 * @param {boolean} [options.dataUrl] Sets if page has url attribute.
			 * @param {?string} [options.container = null] It is used in RoutePopup as selector for container.
			 * @param {string} [options.absUrl] Absolute Url for content used by deferred object.
			 * @param {Object} rule
			 * @param {Object} deferred
			 * @param {Function} deferred.reject
			 * @param {Function} deferred.resolve
			 * @param {string} html
			 * @member ns.router.Router
			 * @protected
			 */
			Router.prototype._loadSuccess = function (absUrl, options, rule, deferred, html) {
				var detail = object.fastMerge({url: absUrl}, options),
					content = rule.parse(html, absUrl);

				// Remove loading message.
				if (options.showLoadMsg) {
					this._hideLoading();
				}

				if (content) {
					deferred.resolve(detail, content);
				} else {
					deferred.reject(detail);
				}
			};

			// TODO the first page should be a property set during _create using the logic
			//	that currently resides in init
			/**
			 * Get initial content
			 * @method _getInitialContent
			 * @member ns.router.Router
			 * @return {HTMLElement} the first page
			 * @protected
			 */
			Router.prototype._getInitialContent = function () {
				return this.firstPage;
			};

			/**
			 * Show the loading indicator
			 * @method _showLoading
			 * @param {number} delay
			 * @member ns.router.Router
			 * @protected
			 */
			Router.prototype._showLoading = function (delay) {
				this.container.showLoading(delay);
			};

			/**
			 * Report an error loading
			 * @method _showError
			 * @param {string} absUrl
			 * @member ns.router.Router
			 * @protected
			 */
			Router.prototype._showError = function (absUrl) {
				ns.error("load error, file: ", absUrl);
			};

			/**
			 * Hide the loading indicator
			 * @method _hideLoading
			 * @member ns.router.Router
			 * @protected
			 */
			Router.prototype._hideLoading = function () {
				this.container.hideLoading();
			};

			/**
			 * Returns true if popup is active.
			 * @method hasActivePopup
			 * @return {boolean}
			 * @member ns.router.Router
			 */
			Router.prototype.hasActivePopup = function () {
				var popup = this.getRoute("popup");
				return popup && popup.hasActive();
			};

			/**
			 * This function returns proper route.
			 * @method getRoute
			 * @param {string} Type of route
			 * @return {?ns.router.route.interface}
			 * @member ns.router.Router
			 */
			Router.prototype.getRoute = function (type) {
				return route[type];
			};

			routerMicro.Router = Router;

			engine.initRouter(Router);
			}(window, window.document, ns));

/*global window, define */
/*jslint nomen: true */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Route Page
 * Support class for router to control changing pages in profile Wearable.
 * @class ns.router.route.page
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (document, ns) {
	
				var util = ns.util,
				path = util.path,
				DOM = util.DOM,
				object = util.object,
				utilSelector = util.selectors,
				history = ns.router.history,
				engine = ns.engine,
				Page = ns.widget.wearable.Page,
				baseElement,
				slice = [].slice,
				routePage = {},
				head;

			/**
			 * Tries to find a page element matching id and filter (selector).
			 * Adds data url attribute to found page, sets page = null when nothing found
			 * @method findPageAndSetDataUrl
			 * @param {string} id Id of searching element
			 * @param {string} filter Query selector for searching page
			 * @return {?HTMLElement}
			 * @private
			 * @static
			 * @member ns.router.route.page
			 */
			function findPageAndSetDataUrl(id, filter) {
				var page = document.getElementById(id);

				if (page && utilSelector.matchesSelector(page, filter)) {
					DOM.setNSData(page, "url", id);
				} else {
					// if we matched any element, but it doesn't match our filter
					// reset page to null
					page = null;
				}
				// @TODO ... else
				// probably there is a need for running onHashChange while going back to a history entry
				// without state, eg. manually entered #fragment. This may not be a problem on target device
				return page;
			}

			/**
			 * Property containing default properties
			 * @property {Object} defaults
			 * @property {string} defaults.transition="none"
			 * @static
			 * @member ns.router.route.page
			 */
			routePage.defaults = {
				transition: "none"
			};

			/**
			 * Property defining selector for filtering only page elements
			 * @property {string} filter
			 * @member ns.router.route.page
			 * @static
			 */
			routePage.filter = "." + Page.classes.uiPage;

			/**
			 * Returns default route options used inside Router.
			 * @method option
			 * @static
			 * @member ns.router.route.page
			 * @return {Object} default route options
			 */
			routePage.option = function () {
				var defaults = object.merge({}, routePage.defaults);
				defaults.transition = ns.getConfig('pageTransition', defaults.transition);
				return defaults;
			};

			/**
			 * This method changes page. It sets history and opens page passed as a parameter.
			 * @method open
			 * @param {HTMLElement|string} toPage The page which will be opened.
			 * @param {Object} [options]
			 * @param {boolean} [options.fromHashChange] Sets if call was made on hash change.
			 * @param {string} [options.dataUrl] Sets if page has url attribute.
			 * @member ns.router.route.page
			 */
			routePage.open = function (toPage, options) {
				var pageTitle = document.title,
					url,
					state = {},
					router = engine.getRouter();

				if (toPage === router.firstPage && !options.dataUrl) {
					url = path.documentUrl.hrefNoHash;
				} else {
					url = DOM.getNSData(toPage, "url");
				}

				pageTitle = DOM.getNSData(toPage, "title") || utilSelector.getChildrenBySelector(toPage, ".ui-header > .ui-title").textContent || pageTitle;
				if (!DOM.getNSData(toPage, "title")) {
					DOM.setNSData(toPage, "title", pageTitle);
				}

				if (url && !options.fromHashChange) {
					if (!path.isPath(url) && url.indexOf("#") < 0) {
						url = path.makeUrlAbsolute("#" + url, path.documentUrl.hrefNoHash);
					}

					state = object.merge(
						{},
						options,
						{
							url: url
						}
					);

					history.replace(state, pageTitle, url);
				}

				// write base element
				this._setBase(url);

				//set page title
				document.title = pageTitle;
				router.container.change(toPage, options);
			};

			/**
			 * This method determines target page to open.
			 * @method find
			 * @param {string} absUrl Absolute path to opened page
			 * @member ns.router.route.page
			 * @return {?HTMLElement} Element of page to open.
			 */
			routePage.find = function (absUrl) {
				var self = this,
					router = engine.getRouter(),
					dataUrl = self._createDataUrl(absUrl),
					initialContent = router.getFirstPage(),
					pageContainer = router.getContainer(),
					page,
					selector = "[data-url='" + dataUrl + "']",
					filterRegexp = /,/gm;

				if (/#/.test(absUrl) && path.isPath(dataUrl)) {
					return null;
				}

				// Check to see if the page already exists in the DOM.
				// NOTE do _not_ use the :jqmData pseudo selector because parenthesis
				//      are a valid url char and it breaks on the first occurence
				// prepare selector for new page
				selector += self.filter.replace(filterRegexp, ",[data-url='" + dataUrl + "']");
				page = pageContainer.element.querySelector(selector);

				// If we failed to find the page, check to see if the url is a
				// reference to an embedded page. If so, it may have been dynamically
				// injected by a developer, in which case it would be lacking a
				// data-url attribute and in need of enhancement.
				if (!page && dataUrl && !path.isPath(dataUrl)) {
					page = findPageAndSetDataUrl(dataUrl, self.filter);
				}

				// If we failed to find a page in the DOM, check the URL to see if it
				// refers to the first page in the application. Also check to make sure
				// our cached-first-page is actually in the DOM. Some user deployed
				// apps are pruning the first page from the DOM for various reasons.
				// We check for this case here because we don't want a first-page with
				// an id falling through to the non-existent embedded page error case.
				if (!page &&
						path.isFirstPageUrl(dataUrl) &&
						initialContent &&
						initialContent.parentNode) {
					page = initialContent;
				}

				return page;
			};

			/**
			 * This method parses HTML and runs scripts from parsed code.
			 * Fetched external scripts if required.
			 * Sets document base to parsed document absolute path.
			 * @method parse
			 * @param {string} html HTML code to parse
			 * @param {string} absUrl Absolute url for parsed page
			 * @member ns.router.route.page
			 * @return {?HTMLElement} Element of page in parsed document.
			 */
			routePage.parse = function (html, absUrl) {
				var self = this,
					page,
					dataUrl = self._createDataUrl(absUrl);

				// write base element
				// @TODO shouldn't base be set if a page was found?
				self._setBase(absUrl);

				// Finding matching page inside created element
				page = html.querySelector(self.filter);

				// If a page exists...
				if (page) {
					// TODO tagging a page with external to make sure that embedded pages aren't
					// removed by the various page handling code is bad. Having page handling code
					// in many places is bad. Solutions post 1.0
					DOM.setNSData(page, "url", dataUrl);
					DOM.setNSData(page, "external", true);
				}
				return page;
			};

			/**
			 * This method handles hash change, **currently does nothing**.
			 * @method onHashChange
			 * @static
			 * @member ns.router.route.page
			 * @return {null}
			 */
			routePage.onHashChange = function (/* url, options */) {
				return null;
			};

			/**
			 * This method creates data url from absolute url given as argument.
			 * @method _createDataUrl
			 * @param {string} absoluteUrl
			 * @protected
			 * @static
			 * @member ns.router.route.page
			 * @return {string}
			 */
			routePage._createDataUrl = function (absoluteUrl) {
				return path.convertUrlToDataUrl(absoluteUrl, true);
			};

			/**
			 * On open fail, currently never used
			 * @method onOpenFailed
			 * @member ns.router.route.page
			 */
			routePage.onOpenFailed = function (/* options */) {
				this._setBase(path.parseLocation().hrefNoSearch);
			};

			/**
			 * This method returns base element from document head.
			 * If no base element is found, one is created based on current location.
			 * @method _getBaseElement
			 * @protected
			 * @static
			 * @member ns.router.route.page
			 * @return {HTMLElement}
			 */
			routePage._getBaseElement = function () {
				// Fetch document head if never cached before
				if (!head) {
					head = document.querySelector("head");
				}
				// Find base element
				if (!baseElement) {
					baseElement = document.querySelector("base");
					if (!baseElement) {
						baseElement = document.createElement("base");
						baseElement.href = path.documentBase.hrefNoHash;
						head.appendChild(baseElement);
					}
				}
				return baseElement;
			};

			/**
			 * Sets document base to url given as argument
			 * @method _setBase
			 * @param {string} url
			 * @protected
			 * @member ns.router.route.page
			 */
			routePage._setBase = function (url) {
				var base = this._getBaseElement(),
					baseHref = base.href;

				if (path.isPath(url)) {
					url = path.makeUrlAbsolute(url, path.documentBase);
					if (path.parseUrl(baseHref).hrefNoSearch !== path.parseUrl(url).hrefNoSearch) {
						base.href = url;
						path.documentBase = path.parseUrl(path.makeUrlAbsolute(url, path.documentUrl.href));
					}
				}
			};

			ns.router.route.page = routePage;

			}(window.document, ns));

/*global window, define */
/*jslint nomen: true */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Route Popup
 * Support class for router to control changing pupups in profile Wearable.
 * @class ns.router.route.popup
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Damian Osipiuk <d.osipiuk@samsung.com>
 */
(function (window, document, ns) {
	
				var
			/**
			 * @property {Object} Popup Alias for {@link ns.widget.Popup}
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			Popup = ns.widget.core.Popup,

			routePopup = {
				/**
				 * Object with default options
				 * @property {Object} defaults
				 * @property {string} [defaults.transition='none'] Sets the animation used during change of popup.
				 * @property {?HTMLElement} [defaults.container=null] Sets container of element.
				 * @property {boolean} [defaults.volatileRecord=true] Sets if the current history entry will be modified or a new one will be created.
				 * @member ns.router.route.popup
				 * @static
				 */
				defaults: {
					transition: 'none',
					container: null,
					volatileRecord: true
				},
				/**
				 * Popup Element Selector
				 * @property {string} filter
				 * @member ns.router.route.popup
				 * @static
				 */
				filter: "." + Popup.classes.popup,
				/**
				 * Storage variable for active popup
				 * @property {?HTMLElement} activePopup
				 * @member ns.router.route.popup
				 * @static
				 */
				activePopup: null,
				/**
				 * Dictionary for popup related event types
				 * @property {Object} events
				 * @property {string} [events.POPUP_HIDE='popuphide']
				 * @member ns.router.route.popup
				 * @static
				 */
				events: {
					POPUP_HIDE: "popuphide"
				}
			},
			/**
			 * Alias for {@link ns.engine}
			 * @property {Object} engine
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			engine = ns.engine,
			/**
			 * Alias for {@link ns.util.path}
			 * @property {Object} path
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			path = ns.util.path,
			/**
			 * Alias for {@link ns.util.selectors}
			 * @property {Object} utilSelector
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			utilSelector = ns.util.selectors,
			/**
			 * Alias for {@link ns.router.history}
			 * @property {Object} history
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			history = ns.router.history,
			/**
			 * Alias for {@link ns.util.DOM}
			 * @property {Object} DOM
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			DOM = ns.util.DOM,
			/**
			 * Alias for array slice method
			 * @method slice
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			slice = [].slice,
			/**
			 * Alias for Object utils
			 * @method slice
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			object = ns.util.object,
			/**
			 * Popup's hash added to url
			 * @property {string} popupHashKey
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			popupHashKey = "popup=true",
			/**
			 * Regexp for popup's hash
			 * @property {RegExp} popupHashKeyReg
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			popupHashKeyReg = /([&|\?]popup=true)/;

			/**
			 * Tries to find a popup element matching id and filter (selector).
			 * Adds data url attribute to found page, sets page = null when nothing found.
			 * @method findPopupAndSetDataUrl
			 * @param {string} id
			 * @param {string} filter
			 * @return {HTMLElement}
			 * @member ns.router.route.popup
			 * @private
			 * @static
			 */
			function findPopupAndSetDataUrl(id, filter) {
				var popup = document.getElementById(path.hashToSelector(id));

				if (popup && utilSelector.matchesSelector(popup, filter)) {
					DOM.setNSData(popup, 'url', id);
				} else {
					// if we matched any element, but it doesn't match our filter
					// reset page to null
					popup = null;
				}
				// @TODO ... else
				// probably there is a need for running onHashChange while going back to a history entry
				// without state, eg. manually entered #fragment. This may not be a problem on target device
				return popup;
			}

			/**
			 * This method returns default options for popup router.
			 * @method option
			 * @return {Object}
			 * @member ns.router.route.popup
			 * @static
			 */
			routePopup.option = function () {
				var defaults = object.merge({}, routePopup.defaults);
				defaults.transition = ns.getConfig('popupTransition', defaults.transition);
				return defaults;
			};

			/**
			 * This method sets active popup and manages history.
			 * @method setActive
			 * @param {?ns.widget.wearable.popup} activePopup
			 * @param {Object} options
			 * @member ns.router.route.popup
			 * @static
			 */
			routePopup.setActive = function (activePopup, options) {
				var url,
					pathLocation = path.getLocation(),
					documentUrl = pathLocation.replace(popupHashKeyReg, "");

				this.activePopup = activePopup;

				if (activePopup) {
					// If popup is being opened, the new state is added to history.
					if (options && !options.fromHashChange && options.history) {
						url = path.addHashSearchParams(documentUrl, popupHashKey);
						history.replace(options, "", url);
					}
				} else if (pathLocation !== documentUrl) {
					// If popup is being closed, the history.back() is called
					// but only if url has special hash.
					// Url is changed after opening animation and in some cases,
					// the popup is closed before this animation and then the history.back
					// could cause undesirable change of page.
					history.back();
				}
			};

			/**
			 * This method opens popup if no other popup is opened.
			 * It also changes history to show that popup is opened.
			 * If there is already active popup, it will be closed.
			 * @method open
			 * @param {HTMLElement|string} toPopup
			 * @param {Object} options
			 * @param {"page"|"popup"|"external"} [options.rel = 'popup'] Represents kind of link as 'page' or 'popup' or 'external' for linking to another domain.
			 * @param {string} [options.transition = 'none'] Sets the animation used during change of popup.
			 * @param {boolean} [options.reverse = false] Sets the direction of change.
			 * @param {boolean} [options.fromHashChange = false] Sets if will be changed after hashchange.
			 * @param {boolean} [options.showLoadMsg = true] Sets if message will be shown during loading.
			 * @param {number} [options.loadMsgDelay = 0] Sets delay time for the show message during loading.
			 * @param {boolean} [options.dataUrl] Sets if page has url attribute.
			 * @param {string} [options.container = null] Selector for container.
			 * @param {boolean} [options.volatileRecord=true] Sets if the current history entry will be modified or a new one will be created.
			 * @param {Event} event
			 * @member ns.router.route.popup
			 * @static
			 */
			routePopup.open = function (toPopup, options, event) {
				var popup,
					router = engine.getRouter(),
					events = routePopup.events,
					removePopup = function () {
						document.removeEventListener(events.POPUP_HIDE, removePopup, false);
						toPopup.parentNode.removeChild(toPopup);
						routePopup.activePopup = null;
					},
					openPopup = function () {
						var positionTo = options["position-to"];
						// add such option only if it exists
						if (positionTo) {
							options.positionTo = positionTo;
						}
						if (event && event.touches) {
							options.x = event.touches[0].clientX;
							options.y = event.touches[0].clientY;
						} else if (event){
							options.x = event.clientX;
							options.y = event.clientY;
						}

						document.removeEventListener(events.POPUP_HIDE, openPopup, false);
						popup = engine.instanceWidget(toPopup, "Popup", options);
						popup.open(options);
						routePopup.activePopup = popup;
					},
					activePage = router.container.getActivePage(),
					container;

				if (DOM.getNSData(toPopup, "external") === true) {
					container = options.container ? activePage.element.querySelector(options.container) : activePage.element;
					container.appendChild(toPopup);
					document.addEventListener(routePopup.events.POPUP_HIDE, removePopup, false);
				}

				if (routePopup.hasActive()) {
					document.addEventListener(routePopup.events.POPUP_HIDE, openPopup, false);
					routePopup.close();
				} else {
					openPopup();
				}
			};

			/**
			 * This method closes active popup.
			 * @method close
			 * @param {ns.widget.wearable.Popup} [activePopup]
			 * @param {string=} [options.transition]
			 * @param {string=} [options.ext= in ui-pre-in] options.ext
			 * @param {Object} options
			 * @member ns.router.route.popup
			 * @protected
			 * @static
			 */
			routePopup.close = function (activePopup, options) {
				activePopup = activePopup || this.activePopup;

				if (activePopup) {
					// Close and clean up
					activePopup.close(options || {});
				}
			};

			/**
			 * This method handles hash change.
			 * It closes active popup.
			 * @method onHashChange
			 * @param {string} url
			 * @param {object} options
			 * @return {boolean}
			 * @member ns.router.route.popup
			 * @static
			 */
			routePopup.onHashChange = function (url, options) {
				var activePopup = this.activePopup;

				if (activePopup) {
					routePopup.close(activePopup, options);
					// Default routing setting cause to rewrite further window history
					// even if popup has been closed
					// To prevent this onHashChange after closing popup we need to change
					// disable volatile mode to allow pushing new history elements
					return true;
				}
				return false;
			};

			/**
			 * On open fail, currently never used
			 * @method onOpenFailed
			 * @member ns.router.route.popup
			 * @return {null}
			 * @static
			 */
			routePopup.onOpenFailed = function (/* options */) {
				return null;
			};

			/**
			 * This method finds popup by data-url.
			 * @method find
			 * @param {string} absUrl Absolute path to opened popup
			 * @return {HTMLElement} Element of popup
			 * @member ns.router.route.popup
			 */
			routePopup.find = function (absUrl) {
				var self = this,
					dataUrl = self._createDataUrl(absUrl),
					activePage = engine.getRouter().getContainer().getActivePage(),
					popup;

				popup = activePage.element.querySelector("[data-url='" + dataUrl + "']" + self.filter);

				if (!popup && dataUrl && !path.isPath(dataUrl)) {
					popup = findPopupAndSetDataUrl(dataUrl, self.filter);
				}

				return popup;
			};

			/**
			 * This method parses HTML and runs scripts from parsed code.
			 * Fetched external scripts if required.
			 * @method parse
			 * @param {string} html HTML code to parse
			 * @param {string} absUrl Absolute url for parsed popup
			 * @return {HTMLElement}
			 * @member ns.router.route.popup
			 */
			routePopup.parse = function (html, absUrl) {
				var self = this,
					popup,
					dataUrl = self._createDataUrl(absUrl);

				popup = html.querySelector(self.filter);

				if (popup) {
					// TODO tagging a popup with external to make sure that embedded popups aren't
					// removed by the various popup handling code is bad. Having popup handling code
					// in many places is bad. Solutions post 1.0
					DOM.setNSData(popup, "url", dataUrl);
					DOM.setNSData(popup, "external", true);
				}

				return popup;
			};

			/**
			 * Convert url to data-url
			 * @method _createDataUrl
			 * @param {string} absoluteUrl
			 * @return {string}
			 * @member ns.router.route.popup
			 * @protected
			 * @static
			 */
			routePopup._createDataUrl = function (absoluteUrl) {
				return path.convertUrlToDataUrl(absoluteUrl);
			};

			/**
			 * Return true if active popup exists.
			 * @method hasActive
			 * @return {boolean}
			 * @member ns.router.route.popup
			 * @static
			 */
			routePopup.hasActive = function () {
				return !!this.activePopup;
			};

			/**
			 * Returns active popup.
			 * @method getActive
			 * @return {?ns.widget.wearable.Popup}
			 * @member ns.router.route.popup
			 * @static
			 */
			routePopup.getActive = function () {
				return this.activePopup;
			};

			ns.router.route.popup = routePopup;

			}(window, window.document, ns));

/*global window, define */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint plusplus: true, nomen: true */
/**
 * @class tau.navigator
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
//  * @TODO add support of $.mobile.buttonMarkup.hoverDelay
(function (document, ns) {
	
	
			document.addEventListener("beforerouterinit", function () {
				ns.setConfig('autoInitializePage', ns.autoInitializePage);
			}, false);

			document.addEventListener("routerinit", function (evt) {
				var router = evt.detail,
					history = ns.router.history,
					navigator,
					back = history.back.bind(router),
					rule = ns.router.route,
					classes = ns.widget.wearable.Page.classes,
					pageActiveClass = classes.uiPageActive;
				/**
				 * @method changePage
				 * @inheritdoc ns.router.Router#open
				 * @member tau
				 */
				ns.changePage = router.open.bind(router);
				document.addEventListener('pageshow', function () {
					/**
					 * Current active page
					 * @property {HTMLElement} activePage
					 * @member tau
					 */
					ns.activePage = document.querySelector('.' + pageActiveClass);
				});
				/**
				 * First page element
				 * @inheritdoc ns.router.Router#firstPage
				 * @property {HTMLElement} firstPage
				 * @member tau
				 */
				ns.firstPage = router.getFirstPage();
				/**
				 * @inheritdoc ns.router.history#back
				 * @method back
				 * @member tau
				 */
				ns.back = back;
				/**
				 * @inheritdoc ns.router.Router#init
				 * @method initializePage
				 * @member tau
				 */
				ns.initializePage = router.init.bind(router);
				/**
				 * Page Container widget
				 * @property {HTMLElement} pageContainer
				 * @inheritdoc ns.router.Router#container
				 * @member tau
				 */
				ns.pageContainer = router.container;
				/**
				 * @method openPopup
				 * @inheritdoc ns.router.Router#openPopup
				 * @member tau
				 */
				ns.openPopup = function(to, options) {
					var htmlElementTo;
					if (to && to.length !== undefined && typeof to === 'object') {
						htmlElementTo = to[0];
					} else {
						htmlElementTo = to;
					}
					router.openPopup(htmlElementTo, options);
				};
				/**
				 * @method closePopup
				 * @inheritdoc ns.router.Router#closePopup
				 * @member tau
				 */
				ns.closePopup = router.closePopup.bind(router);

			}, false);

			}(window.document, ns));

(function (ns) {
	
	
			var engine = ns.engine;

			ns.IndexScrollbar = function (element, options) {
				ns.warn("tau.IndexScrollbar is deprecated. you have to use tau.widget.IndexScrollbar.");
				return engine.instanceWidget(element, "IndexScrollbar", options);
			};

			ns.SectionChanger = function (element, options) {
				ns.warn("tau.SectionChanger is deprecated. you have to use tau.widget.SectionChanger.");
				return engine.instanceWidget(element, "SectionChanger", options);
			};

			ns.SwipeList = function (element, options) {
				ns.warn("tau.SwipeList is deprecated. you have to use tau.widget.SwipeList.");
				return engine.instanceWidget(element, "SwipeList", options);
			};

			ns.VirtualListview = function (element, options) {
				ns.warn("tau.VirtualListview is deprecated. you have to use tau.widget.VirtualListview.");
				return engine.instanceWidget(element, "VirtualListview", options);
			};

			}(ns));
/*global define, window */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (ns) {
	
				if (ns.getConfig("autorun", true) === true) {
				ns.engine.run();
			}
			}(ns));

/*global define */

}(window, window.document));
