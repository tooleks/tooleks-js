/*! Copyright (C) 2018 Oleksandr Tolochko. */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tooleks=t():e.tooleks=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=10)}([function(e,t,r){"use strict";e.exports=function(e,t){try{return e()}catch(e){return t}}},function(e,t,r){"use strict";const s=r(0);e.exports=s},function(e,t,r){"use strict";function s(e){if("string"!=typeof e)throw new TypeError('The "from" parameter should be a string.')}function n(e){if("string"!=typeof e)throw new TypeError('The "to" parameter should be a string.')}e.exports=class{constructor(){this._resolvers={}}getResolvers(){return this._resolvers}registerResolver(e,t,r){return s(e),n(t),function(e){if("function"!=typeof e)throw new TypeError('The "resolver" parameter should be a function.')}(r),void 0===this._resolvers[e]&&(this._resolvers[e]={}),this._resolvers[e][t]=r,this}removeResolver(e,t){return s(e),n(t),this.hasResolver(e,t)&&delete this._resolvers[e][t],this}_assertResolver(e,t){if(void 0===this.getResolvers()[e])throw new Error(`Resolver for "${e}" not found.`);if(void 0===this.getResolvers()[e][t])throw new Error(`Resolver for "${t}" not found.`)}hasResolver(e,t){s(e),n(t);try{return this._assertResolver(e,t),!0}catch(e){return!1}}map(e,t,r){return s(t),n(r),this._assertResolver(t,r),(0,this.getResolvers()[t][r])(e)}}},function(e,t,r){"use strict";const s=r(2);e.exports=s},function(e,t,r){"use strict";function s(e){if("string"!=typeof e)throw new TypeError('The "eventName" parameter should be a string.')}e.exports=class{constructor(){this._events={}}emit(e,t){s(e);const r=this._events[e];void 0!==r&&r.forEach(e=>e(t))}on(e,t){return s(e),function(e){if("function"!=typeof e)throw new TypeError('The "listener" parameter should be a function.')}(t),void 0===this._events[e]&&(this._events[e]=[]),this._events[e].push(t),()=>{this._events[e]=this._events[e].filter(e=>e!==t)}}}},function(e,t,r){"use strict";const s=r(4);e.exports=s},function(e,t,r){"use strict";function s(e){if("string"!=typeof e)throw new TypeError('The "identifier" parameter should be a string.')}e.exports=class{constructor(){this._bindings={}}_createInstance(e){const t=this._resolveDependencies(e.parameters.dependencies);return new e.type(...t)}_resolveDependencies(e){return e.map(e=>{if("string"==typeof e)return this.get(e);if("function"==typeof e)return e();throw new TypeError("Invalid dependency type.")})}has(e){return s(e),Object.prototype.hasOwnProperty.call(this._bindings,e)}get(e){if(s(e),!this.has(e))throw new Error(`The "${e}" binding not found.`);const t=this._bindings[e];if(t.parameters.singleton&&void 0!==t.instance)return t.instance;const r=this._createInstance(t);return t.parameters.singleton&&(t.instance=r),r}registerBinding(e,t,{dependencies:r=[],singleton:n=!1}={}){if(s(e),function(e){if("function"!=typeof e)throw new TypeError('The "type" parameter should be a function.')}(t),function(e){if(!Array.isArray(e))throw new TypeError('The "dependencies" parameter should be an array.');e.forEach(e=>{if("string"!=typeof e&&"function"!=typeof e)throw new TypeError('The "dependencies" parameter should be an array of strings or functions.')})}(r),function(e){if("boolean"!=typeof e)throw new TypeError('The "singleton" parameter should be a boolean.')}(n),t.length!==r.length)throw new Error(`Invalid number of dependencies were specified for ${e}.`);return this._bindings[e]={type:t,parameters:{dependencies:r,singleton:n}},this}removeBinding(e){return s(e),this.has(e)&&delete this._bindings[e],this}}},function(e,t,r){"use strict";const s=r(6);e.exports=s},function(e,t,r){"use strict";function s(e){if("function"!=typeof e)throw new TypeError('The "listener" parameter should be a function.')}e.exports=class{constructor(){this._resolved=!1,this._rejected=!1,this._resolveListeners=[],this._rejectListeners=[]}_callListener(e){e(this._defferedValue)}_isResolved(){return this._resolved}_isRejected(){return this._rejected}_isResolvedOrRejected(){return this._isResolved()||this._isRejected()}resolve(e){this._isResolvedOrRejected()||(this._defferedValue=e,this._resolved=!0,this._resolveListeners.forEach(e=>this._callListener(e)),this._resolveListeners=[])}reject(e){this._isResolvedOrRejected()||(this._defferedValue=e,this._rejected=!0,this._rejectListeners.forEach(e=>this._callListener(e)),this._rejectListeners=[])}onResolve(e){s(e),this._isResolved()?this._callListener(e):this._resolveListeners.push(e)}onReject(e){s(e),this._isRejected()?this._callListener(e):this._rejectListeners.push(e)}promisify(){return new Promise((e,t)=>{this.onResolve(e),this.onReject(t)})}}},function(e,t,r){"use strict";const s=r(8);e.exports=s},function(e,t,r){"use strict";const s=r(9),n=r(7),o=r(5),i=r(3),c=r(1);e.exports=Object.freeze({Defer:s,DependencyContainer:n,EventEmitter:o,Mapper:i,optional:c})}])});