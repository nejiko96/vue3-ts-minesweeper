const bl=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}};bl();function va(e,t){const n=Object.create(null),r=e.split(",");for(let a=0;a<r.length;a++)n[r[a]]=!0;return t?a=>!!n[a.toLowerCase()]:a=>!!n[a]}const yl="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",_l=va(yl);function vo(e){return!!e||e===""}function ba(e){if(D(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],a=le(r)?El(r):ba(r);if(a)for(const i in a)t[i]=a[i]}return t}else{if(le(e))return e;if(oe(e))return e}}const xl=/;(?![^(]*\))/g,wl=/:(.+)/;function El(e){const t={};return e.split(xl).forEach(n=>{if(n){const r=n.split(wl);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function tr(e){let t="";if(le(e))t=e;else if(D(e))for(let n=0;n<e.length;n++){const r=tr(e[n]);r&&(t+=r+" ")}else if(oe(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function kl(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=nr(e[r],t[r]);return n}function nr(e,t){if(e===t)return!0;let n=fi(e),r=fi(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=un(e),r=un(t),n||r)return e===t;if(n=D(e),r=D(t),n||r)return n&&r?kl(e,t):!1;if(n=oe(e),r=oe(t),n||r){if(!n||!r)return!1;const a=Object.keys(e).length,i=Object.keys(t).length;if(a!==i)return!1;for(const o in e){const s=e.hasOwnProperty(o),l=t.hasOwnProperty(o);if(s&&!l||!s&&l||!nr(e[o],t[o]))return!1}}return String(e)===String(t)}function Ol(e,t){return e.findIndex(n=>nr(n,t))}const at=e=>le(e)?e:e==null?"":D(e)||oe(e)&&(e.toString===_o||!$(e.toString))?JSON.stringify(e,bo,2):String(e),bo=(e,t)=>t&&t.__v_isRef?bo(e,t.value):Ut(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,a])=>(n[`${r} =>`]=a,n),{})}:ar(t)?{[`Set(${t.size})`]:[...t.values()]}:oe(t)&&!D(t)&&!xo(t)?String(t):t,X={},jt=[],Se=()=>{},Al=()=>!1,Cl=/^on[^a-z]/,rr=e=>Cl.test(e),ya=e=>e.startsWith("onUpdate:"),me=Object.assign,_a=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Nl=Object.prototype.hasOwnProperty,B=(e,t)=>Nl.call(e,t),D=Array.isArray,Ut=e=>yn(e)==="[object Map]",ar=e=>yn(e)==="[object Set]",fi=e=>yn(e)==="[object Date]",$=e=>typeof e=="function",le=e=>typeof e=="string",un=e=>typeof e=="symbol",oe=e=>e!==null&&typeof e=="object",yo=e=>oe(e)&&$(e.then)&&$(e.catch),_o=Object.prototype.toString,yn=e=>_o.call(e),Il=e=>yn(e).slice(8,-1),xo=e=>yn(e)==="[object Object]",xa=e=>le(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Sn=va(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ir=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Pl=/-(\w)/g,ze=ir(e=>e.replace(Pl,(t,n)=>n?n.toUpperCase():"")),Ml=/\B([A-Z])/g,Wt=ir(e=>e.replace(Ml,"-$1").toLowerCase()),or=ir(e=>e.charAt(0).toUpperCase()+e.slice(1)),Ir=ir(e=>e?`on${or(e)}`:""),dn=(e,t)=>!Object.is(e,t),Tn=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Un=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},Hn=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ci;const Sl=()=>ci||(ci=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let Le;class wo{constructor(t=!1){this.active=!0,this.effects=[],this.cleanups=[],!t&&Le&&(this.parent=Le,this.index=(Le.scopes||(Le.scopes=[])).push(this)-1)}run(t){if(this.active){const n=Le;try{return Le=this,t()}finally{Le=n}}}on(){Le=this}off(){Le=this.parent}stop(t){if(this.active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(this.parent&&!t){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.active=!1}}}function Eo(e){return new wo(e)}function Tl(e,t=Le){t&&t.active&&t.effects.push(e)}const wa=e=>{const t=new Set(e);return t.w=0,t.n=0,t},ko=e=>(e.w&dt)>0,Oo=e=>(e.n&dt)>0,Dl=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=dt},Rl=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const a=t[r];ko(a)&&!Oo(a)?a.delete(e):t[n++]=a,a.w&=~dt,a.n&=~dt}t.length=n}},jr=new WeakMap;let en=0,dt=1;const Ur=30;let Ce;const kt=Symbol(""),Hr=Symbol("");class Ea{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Tl(this,r)}run(){if(!this.active)return this.fn();let t=Ce,n=ft;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=Ce,Ce=this,ft=!0,dt=1<<++en,en<=Ur?Dl(this):ui(this),this.fn()}finally{en<=Ur&&Rl(this),dt=1<<--en,Ce=this.parent,ft=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Ce===this?this.deferStop=!0:this.active&&(ui(this),this.onStop&&this.onStop(),this.active=!1)}}function ui(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let ft=!0;const Ao=[];function Vt(){Ao.push(ft),ft=!1}function Gt(){const e=Ao.pop();ft=e===void 0?!0:e}function xe(e,t,n){if(ft&&Ce){let r=jr.get(e);r||jr.set(e,r=new Map);let a=r.get(n);a||r.set(n,a=wa()),Co(a)}}function Co(e,t){let n=!1;en<=Ur?Oo(e)||(e.n|=dt,n=!ko(e)):n=!e.has(Ce),n&&(e.add(Ce),Ce.deps.push(e))}function Ye(e,t,n,r,a,i){const o=jr.get(e);if(!o)return;let s=[];if(t==="clear")s=[...o.values()];else if(n==="length"&&D(e))o.forEach((l,c)=>{(c==="length"||c>=r)&&s.push(l)});else switch(n!==void 0&&s.push(o.get(n)),t){case"add":D(e)?xa(n)&&s.push(o.get("length")):(s.push(o.get(kt)),Ut(e)&&s.push(o.get(Hr)));break;case"delete":D(e)||(s.push(o.get(kt)),Ut(e)&&s.push(o.get(Hr)));break;case"set":Ut(e)&&s.push(o.get(kt));break}if(s.length===1)s[0]&&Br(s[0]);else{const l=[];for(const c of s)c&&l.push(...c);Br(wa(l))}}function Br(e,t){const n=D(e)?e:[...e];for(const r of n)r.computed&&di(r);for(const r of n)r.computed||di(r)}function di(e,t){(e!==Ce||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Ll=va("__proto__,__v_isRef,__isVue"),No=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(un)),Fl=ka(),$l=ka(!1,!0),zl=ka(!0),mi=jl();function jl(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=Y(this);for(let i=0,o=this.length;i<o;i++)xe(r,"get",i+"");const a=r[t](...n);return a===-1||a===!1?r[t](...n.map(Y)):a}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Vt();const r=Y(this)[t].apply(this,n);return Gt(),r}}),e}function ka(e=!1,t=!1){return function(r,a,i){if(a==="__v_isReactive")return!e;if(a==="__v_isReadonly")return e;if(a==="__v_isShallow")return t;if(a==="__v_raw"&&i===(e?t?nf:To:t?So:Mo).get(r))return r;const o=D(r);if(!e&&o&&B(mi,a))return Reflect.get(mi,a,i);const s=Reflect.get(r,a,i);return(un(a)?No.has(a):Ll(a))||(e||xe(r,"get",a),t)?s:q(s)?o&&xa(a)?s:s.value:oe(s)?e?Do(s):lr(s):s}}const Ul=Io(),Hl=Io(!0);function Io(e=!1){return function(n,r,a,i){let o=n[r];if(mn(o)&&q(o)&&!q(a))return!1;if(!e&&!mn(a)&&(Kr(a)||(a=Y(a),o=Y(o)),!D(n)&&q(o)&&!q(a)))return o.value=a,!0;const s=D(n)&&xa(r)?Number(r)<n.length:B(n,r),l=Reflect.set(n,r,a,i);return n===Y(i)&&(s?dn(a,o)&&Ye(n,"set",r,a):Ye(n,"add",r,a)),l}}function Bl(e,t){const n=B(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Ye(e,"delete",t,void 0),r}function Kl(e,t){const n=Reflect.has(e,t);return(!un(t)||!No.has(t))&&xe(e,"has",t),n}function Yl(e){return xe(e,"iterate",D(e)?"length":kt),Reflect.ownKeys(e)}const Po={get:Fl,set:Ul,deleteProperty:Bl,has:Kl,ownKeys:Yl},Wl={get:zl,set(e,t){return!0},deleteProperty(e,t){return!0}},Vl=me({},Po,{get:$l,set:Hl}),Oa=e=>e,sr=e=>Reflect.getPrototypeOf(e);function On(e,t,n=!1,r=!1){e=e.__v_raw;const a=Y(e),i=Y(t);n||(t!==i&&xe(a,"get",t),xe(a,"get",i));const{has:o}=sr(a),s=r?Oa:n?Na:hn;if(o.call(a,t))return s(e.get(t));if(o.call(a,i))return s(e.get(i));e!==a&&e.get(t)}function An(e,t=!1){const n=this.__v_raw,r=Y(n),a=Y(e);return t||(e!==a&&xe(r,"has",e),xe(r,"has",a)),e===a?n.has(e):n.has(e)||n.has(a)}function Cn(e,t=!1){return e=e.__v_raw,!t&&xe(Y(e),"iterate",kt),Reflect.get(e,"size",e)}function hi(e){e=Y(e);const t=Y(this);return sr(t).has.call(t,e)||(t.add(e),Ye(t,"add",e,e)),this}function pi(e,t){t=Y(t);const n=Y(this),{has:r,get:a}=sr(n);let i=r.call(n,e);i||(e=Y(e),i=r.call(n,e));const o=a.call(n,e);return n.set(e,t),i?dn(t,o)&&Ye(n,"set",e,t):Ye(n,"add",e,t),this}function gi(e){const t=Y(this),{has:n,get:r}=sr(t);let a=n.call(t,e);a||(e=Y(e),a=n.call(t,e)),r&&r.call(t,e);const i=t.delete(e);return a&&Ye(t,"delete",e,void 0),i}function vi(){const e=Y(this),t=e.size!==0,n=e.clear();return t&&Ye(e,"clear",void 0,void 0),n}function Nn(e,t){return function(r,a){const i=this,o=i.__v_raw,s=Y(o),l=t?Oa:e?Na:hn;return!e&&xe(s,"iterate",kt),o.forEach((c,u)=>r.call(a,l(c),l(u),i))}}function In(e,t,n){return function(...r){const a=this.__v_raw,i=Y(a),o=Ut(i),s=e==="entries"||e===Symbol.iterator&&o,l=e==="keys"&&o,c=a[e](...r),u=n?Oa:t?Na:hn;return!t&&xe(i,"iterate",l?Hr:kt),{next(){const{value:m,done:p}=c.next();return p?{value:m,done:p}:{value:s?[u(m[0]),u(m[1])]:u(m),done:p}},[Symbol.iterator](){return this}}}}function tt(e){return function(...t){return e==="delete"?!1:this}}function Gl(){const e={get(i){return On(this,i)},get size(){return Cn(this)},has:An,add:hi,set:pi,delete:gi,clear:vi,forEach:Nn(!1,!1)},t={get(i){return On(this,i,!1,!0)},get size(){return Cn(this)},has:An,add:hi,set:pi,delete:gi,clear:vi,forEach:Nn(!1,!0)},n={get(i){return On(this,i,!0)},get size(){return Cn(this,!0)},has(i){return An.call(this,i,!0)},add:tt("add"),set:tt("set"),delete:tt("delete"),clear:tt("clear"),forEach:Nn(!0,!1)},r={get(i){return On(this,i,!0,!0)},get size(){return Cn(this,!0)},has(i){return An.call(this,i,!0)},add:tt("add"),set:tt("set"),delete:tt("delete"),clear:tt("clear"),forEach:Nn(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{e[i]=In(i,!1,!1),n[i]=In(i,!0,!1),t[i]=In(i,!1,!0),r[i]=In(i,!0,!0)}),[e,n,t,r]}const[Xl,ql,Jl,Zl]=Gl();function Aa(e,t){const n=t?e?Zl:Jl:e?ql:Xl;return(r,a,i)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?r:Reflect.get(B(n,a)&&a in r?n:r,a,i)}const Ql={get:Aa(!1,!1)},ef={get:Aa(!1,!0)},tf={get:Aa(!0,!1)},Mo=new WeakMap,So=new WeakMap,To=new WeakMap,nf=new WeakMap;function rf(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function af(e){return e.__v_skip||!Object.isExtensible(e)?0:rf(Il(e))}function lr(e){return mn(e)?e:Ca(e,!1,Po,Ql,Mo)}function of(e){return Ca(e,!1,Vl,ef,So)}function Do(e){return Ca(e,!0,Wl,tf,To)}function Ca(e,t,n,r,a){if(!oe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=a.get(e);if(i)return i;const o=af(e);if(o===0)return e;const s=new Proxy(e,o===2?r:n);return a.set(e,s),s}function ct(e){return mn(e)?ct(e.__v_raw):!!(e&&e.__v_isReactive)}function mn(e){return!!(e&&e.__v_isReadonly)}function Kr(e){return!!(e&&e.__v_isShallow)}function Ro(e){return ct(e)||mn(e)}function Y(e){const t=e&&e.__v_raw;return t?Y(t):e}function Bt(e){return Un(e,"__v_skip",!0),e}const hn=e=>oe(e)?lr(e):e,Na=e=>oe(e)?Do(e):e;function Lo(e){ft&&Ce&&(e=Y(e),Co(e.dep||(e.dep=wa())))}function Fo(e,t){e=Y(e),e.dep&&Br(e.dep)}function q(e){return!!(e&&e.__v_isRef===!0)}function _n(e){return sf(e,!1)}function sf(e,t){return q(e)?e:new lf(e,t)}class lf{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:Y(t),this._value=n?t:hn(t)}get value(){return Lo(this),this._value}set value(t){t=this.__v_isShallow?t:Y(t),dn(t,this._rawValue)&&(this._rawValue=t,this._value=this.__v_isShallow?t:hn(t),Fo(this))}}function ie(e){return q(e)?e.value:e}const ff={get:(e,t,n)=>ie(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const a=e[t];return q(a)&&!q(n)?(a.value=n,!0):Reflect.set(e,t,n,r)}};function $o(e){return ct(e)?e:new Proxy(e,ff)}function cf(e){const t=D(e)?new Array(e.length):{};for(const n in e)t[n]=df(e,n);return t}class uf{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}}function df(e,t,n){const r=e[t];return q(r)?r:new uf(e,t,n)}class mf{constructor(t,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this._dirty=!0,this.effect=new Ea(t,()=>{this._dirty||(this._dirty=!0,Fo(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const t=Y(this);return Lo(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function hf(e,t,n=!1){let r,a;const i=$(e);return i?(r=e,a=Se):(r=e.get,a=e.set),new mf(r,a,i||!a,n)}function ut(e,t,n,r){let a;try{a=r?e(...r):e()}catch(i){fr(i,t,n)}return a}function Te(e,t,n,r){if($(e)){const i=ut(e,t,n,r);return i&&yo(i)&&i.catch(o=>{fr(o,t,n)}),i}const a=[];for(let i=0;i<e.length;i++)a.push(Te(e[i],t,n,r));return a}function fr(e,t,n,r=!0){const a=t?t.vnode:null;if(t){let i=t.parent;const o=t.proxy,s=n;for(;i;){const c=i.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](e,o,s)===!1)return}i=i.parent}const l=t.appContext.config.errorHandler;if(l){ut(l,null,10,[e,o,s]);return}}pf(e,n,a,r)}function pf(e,t,n,r=!0){console.error(e)}let Bn=!1,Yr=!1;const ye=[];let Be=0;const rn=[];let tn=null,Lt=0;const an=[];let it=null,Ft=0;const zo=Promise.resolve();let Ia=null,Wr=null;function jo(e){const t=Ia||zo;return e?t.then(this?e.bind(this):e):t}function gf(e){let t=Be+1,n=ye.length;for(;t<n;){const r=t+n>>>1;pn(ye[r])<e?t=r+1:n=r}return t}function Uo(e){(!ye.length||!ye.includes(e,Bn&&e.allowRecurse?Be+1:Be))&&e!==Wr&&(e.id==null?ye.push(e):ye.splice(gf(e.id),0,e),Ho())}function Ho(){!Bn&&!Yr&&(Yr=!0,Ia=zo.then(Yo))}function vf(e){const t=ye.indexOf(e);t>Be&&ye.splice(t,1)}function Bo(e,t,n,r){D(e)?n.push(...e):(!t||!t.includes(e,e.allowRecurse?r+1:r))&&n.push(e),Ho()}function bf(e){Bo(e,tn,rn,Lt)}function yf(e){Bo(e,it,an,Ft)}function cr(e,t=null){if(rn.length){for(Wr=t,tn=[...new Set(rn)],rn.length=0,Lt=0;Lt<tn.length;Lt++)tn[Lt]();tn=null,Lt=0,Wr=null,cr(e,t)}}function Ko(e){if(cr(),an.length){const t=[...new Set(an)];if(an.length=0,it){it.push(...t);return}for(it=t,it.sort((n,r)=>pn(n)-pn(r)),Ft=0;Ft<it.length;Ft++)it[Ft]();it=null,Ft=0}}const pn=e=>e.id==null?1/0:e.id;function Yo(e){Yr=!1,Bn=!0,cr(e),ye.sort((n,r)=>pn(n)-pn(r));const t=Se;try{for(Be=0;Be<ye.length;Be++){const n=ye[Be];n&&n.active!==!1&&ut(n,null,14)}}finally{Be=0,ye.length=0,Ko(),Bn=!1,Ia=null,(ye.length||rn.length||an.length)&&Yo(e)}}function _f(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||X;let a=n;const i=t.startsWith("update:"),o=i&&t.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:m,trim:p}=r[u]||X;p&&(a=n.map(_=>_.trim())),m&&(a=n.map(Hn))}let s,l=r[s=Ir(t)]||r[s=Ir(ze(t))];!l&&i&&(l=r[s=Ir(Wt(t))]),l&&Te(l,e,6,a);const c=r[s+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[s])return;e.emitted[s]=!0,Te(c,e,6,a)}}function Wo(e,t,n=!1){const r=t.emitsCache,a=r.get(e);if(a!==void 0)return a;const i=e.emits;let o={},s=!1;if(!$(e)){const l=c=>{const u=Wo(c,t,!0);u&&(s=!0,me(o,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!s?(r.set(e,null),null):(D(i)?i.forEach(l=>o[l]=null):me(o,i),r.set(e,o),o)}function ur(e,t){return!e||!rr(t)?!1:(t=t.slice(2).replace(/Once$/,""),B(e,t[0].toLowerCase()+t.slice(1))||B(e,Wt(t))||B(e,t))}let ke=null,dr=null;function Kn(e){const t=ke;return ke=e,dr=e&&e.type.__scopeId||null,t}function Vo(e){dr=e}function Go(){dr=null}function xf(e,t=ke,n){if(!t||e._n)return e;const r=(...a)=>{r._d&&Ni(-1);const i=Kn(t),o=e(...a);return Kn(i),r._d&&Ni(1),o};return r._n=!0,r._c=!0,r._d=!0,r}function Pr(e){const{type:t,vnode:n,proxy:r,withProxy:a,props:i,propsOptions:[o],slots:s,attrs:l,emit:c,render:u,renderCache:m,data:p,setupState:_,ctx:N,inheritAttrs:F}=e;let T,y;const A=Kn(e);try{if(n.shapeFlag&4){const j=a||r;T=Fe(u.call(j,j,m,i,_,p,N)),y=l}else{const j=t;T=Fe(j.length>1?j(i,{attrs:l,slots:s,emit:c}):j(i,null)),y=t.props?l:wf(l)}}catch(j){on.length=0,fr(j,e,1),T=ne(At)}let R=T;if(y&&F!==!1){const j=Object.keys(y),{shapeFlag:z}=R;j.length&&z&7&&(o&&j.some(ya)&&(y=Ef(y,o)),R=Kt(R,y))}return n.dirs&&(R=Kt(R),R.dirs=R.dirs?R.dirs.concat(n.dirs):n.dirs),n.transition&&(R.transition=n.transition),T=R,Kn(A),T}const wf=e=>{let t;for(const n in e)(n==="class"||n==="style"||rr(n))&&((t||(t={}))[n]=e[n]);return t},Ef=(e,t)=>{const n={};for(const r in e)(!ya(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function kf(e,t,n){const{props:r,children:a,component:i}=e,{props:o,children:s,patchFlag:l}=t,c=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?bi(r,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let m=0;m<u.length;m++){const p=u[m];if(o[p]!==r[p]&&!ur(c,p))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?bi(r,o,c):!0:!!o;return!1}function bi(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(t[i]!==e[i]&&!ur(n,i))return!0}return!1}function Of({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const Af=e=>e.__isSuspense;function Cf(e,t){t&&t.pendingBranch?D(e)?t.effects.push(...e):t.effects.push(e):yf(e)}function Nf(e,t){if(se){let n=se.provides;const r=se.parent&&se.parent.provides;r===n&&(n=se.provides=Object.create(r)),n[e]=t}}function Dn(e,t,n=!1){const r=se||ke;if(r){const a=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(a&&e in a)return a[e];if(arguments.length>1)return n&&$(t)?t.call(r.proxy):t}}function If(e,t){return Pa(e,null,{flush:"post"})}const yi={};function Ke(e,t,n){return Pa(e,t,n)}function Pa(e,t,{immediate:n,deep:r,flush:a,onTrack:i,onTrigger:o}=X){const s=se;let l,c=!1,u=!1;if(q(e)?(l=()=>e.value,c=Kr(e)):ct(e)?(l=()=>e,r=!0):D(e)?(u=!0,c=e.some(y=>ct(y)||Kr(y)),l=()=>e.map(y=>{if(q(y))return y.value;if(ct(y))return xt(y);if($(y))return ut(y,s,2)})):$(e)?t?l=()=>ut(e,s,2):l=()=>{if(!(s&&s.isUnmounted))return m&&m(),Te(e,s,3,[p])}:l=Se,t&&r){const y=l;l=()=>xt(y())}let m,p=y=>{m=T.onStop=()=>{ut(y,s,4)}};if(vn)return p=Se,t?n&&Te(t,s,3,[l(),u?[]:void 0,p]):l(),Se;let _=u?[]:yi;const N=()=>{if(!!T.active)if(t){const y=T.run();(r||c||(u?y.some((A,R)=>dn(A,_[R])):dn(y,_)))&&(m&&m(),Te(t,s,3,[y,_===yi?void 0:_,p]),_=y)}else T.run()};N.allowRecurse=!!t;let F;a==="sync"?F=N:a==="post"?F=()=>ge(N,s&&s.suspense):F=()=>bf(N);const T=new Ea(l,F);return t?n?N():_=T.run():a==="post"?ge(T.run.bind(T),s&&s.suspense):T.run(),()=>{T.stop(),s&&s.scope&&_a(s.scope.effects,T)}}function Pf(e,t,n){const r=this.proxy,a=le(e)?e.includes(".")?Xo(r,e):()=>r[e]:e.bind(r,r);let i;$(t)?i=t:(i=t.handler,n=t);const o=se;Yt(this);const s=Pa(a,i.bind(r),n);return o?Yt(o):Ot(),s}function Xo(e,t){const n=t.split(".");return()=>{let r=e;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function xt(e,t){if(!oe(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),q(e))xt(e.value,t);else if(D(e))for(let n=0;n<e.length;n++)xt(e[n],t);else if(ar(e)||Ut(e))e.forEach(n=>{xt(n,t)});else if(xo(e))for(const n in e)xt(e[n],t);return e}function Xe(e){return $(e)?{setup:e,name:e.name}:e}const Rn=e=>!!e.type.__asyncLoader,qo=e=>e.type.__isKeepAlive;function Mf(e,t){Jo(e,"a",t)}function Sf(e,t){Jo(e,"da",t)}function Jo(e,t,n=se){const r=e.__wdc||(e.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(mr(t,r,n),n){let a=n.parent;for(;a&&a.parent;)qo(a.parent.vnode)&&Tf(r,t,n,a),a=a.parent}}function Tf(e,t,n,r){const a=mr(t,e,r,!0);hr(()=>{_a(r[t],a)},n)}function mr(e,t,n=se,r=!1){if(n){const a=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{if(n.isUnmounted)return;Vt(),Yt(n);const s=Te(t,n,e,o);return Ot(),Gt(),s});return r?a.unshift(i):a.push(i),i}}const qe=e=>(t,n=se)=>(!vn||e==="sp")&&mr(e,t,n),Df=qe("bm"),Ma=qe("m"),Rf=qe("bu"),Lf=qe("u"),Ff=qe("bum"),hr=qe("um"),$f=qe("sp"),zf=qe("rtg"),jf=qe("rtc");function Uf(e,t=se){mr("ec",e,t)}function Tt(e,t){const n=ke;if(n===null)return e;const r=gr(n)||n.proxy,a=e.dirs||(e.dirs=[]);for(let i=0;i<t.length;i++){let[o,s,l,c=X]=t[i];$(o)&&(o={mounted:o,updated:o}),o.deep&&xt(s),a.push({dir:o,instance:r,value:s,oldValue:void 0,arg:l,modifiers:c})}return e}function gt(e,t,n,r){const a=e.dirs,i=t&&t.dirs;for(let o=0;o<a.length;o++){const s=a[o];i&&(s.oldValue=i[o].value);let l=s.dir[r];l&&(Vt(),Te(l,n,8,[e.el,s,e,t]),Gt())}}const Zo="components";function Qo(e,t){return Bf(Zo,e,!0,t)||e}const Hf=Symbol();function Bf(e,t,n=!0,r=!1){const a=ke||se;if(a){const i=a.type;if(e===Zo){const s=bc(i,!1);if(s&&(s===t||s===ze(t)||s===or(ze(t))))return i}const o=_i(a[e]||i[e],t)||_i(a.appContext[e],t);return!o&&r?i:o}}function _i(e,t){return e&&(e[t]||e[ze(t)]||e[or(ze(t))])}function xi(e,t,n,r){let a;const i=n&&n[r];if(D(e)||le(e)){a=new Array(e.length);for(let o=0,s=e.length;o<s;o++)a[o]=t(e[o],o,void 0,i&&i[o])}else if(typeof e=="number"){a=new Array(e);for(let o=0;o<e;o++)a[o]=t(o+1,o,void 0,i&&i[o])}else if(oe(e))if(e[Symbol.iterator])a=Array.from(e,(o,s)=>t(o,s,void 0,i&&i[s]));else{const o=Object.keys(e);a=new Array(o.length);for(let s=0,l=o.length;s<l;s++){const c=o[s];a[s]=t(e[c],c,s,i&&i[s])}}else a=[];return n&&(n[r]=a),a}const Vr=e=>e?us(e)?gr(e)||e.proxy:Vr(e.parent):null,Yn=me(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Vr(e.parent),$root:e=>Vr(e.root),$emit:e=>e.emit,$options:e=>ts(e),$forceUpdate:e=>e.f||(e.f=()=>Uo(e.update)),$nextTick:e=>e.n||(e.n=jo.bind(e.proxy)),$watch:e=>Pf.bind(e)}),Kf={get({_:e},t){const{ctx:n,setupState:r,data:a,props:i,accessCache:o,type:s,appContext:l}=e;let c;if(t[0]!=="$"){const _=o[t];if(_!==void 0)switch(_){case 1:return r[t];case 2:return a[t];case 4:return n[t];case 3:return i[t]}else{if(r!==X&&B(r,t))return o[t]=1,r[t];if(a!==X&&B(a,t))return o[t]=2,a[t];if((c=e.propsOptions[0])&&B(c,t))return o[t]=3,i[t];if(n!==X&&B(n,t))return o[t]=4,n[t];Gr&&(o[t]=0)}}const u=Yn[t];let m,p;if(u)return t==="$attrs"&&xe(e,"get",t),u(e);if((m=s.__cssModules)&&(m=m[t]))return m;if(n!==X&&B(n,t))return o[t]=4,n[t];if(p=l.config.globalProperties,B(p,t))return p[t]},set({_:e},t,n){const{data:r,setupState:a,ctx:i}=e;return a!==X&&B(a,t)?(a[t]=n,!0):r!==X&&B(r,t)?(r[t]=n,!0):B(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:a,propsOptions:i}},o){let s;return!!n[o]||e!==X&&B(e,o)||t!==X&&B(t,o)||(s=i[0])&&B(s,o)||B(r,o)||B(Yn,o)||B(a.config.globalProperties,o)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:B(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};let Gr=!0;function Yf(e){const t=ts(e),n=e.proxy,r=e.ctx;Gr=!1,t.beforeCreate&&wi(t.beforeCreate,e,"bc");const{data:a,computed:i,methods:o,watch:s,provide:l,inject:c,created:u,beforeMount:m,mounted:p,beforeUpdate:_,updated:N,activated:F,deactivated:T,beforeDestroy:y,beforeUnmount:A,destroyed:R,unmounted:j,render:z,renderTracked:ae,renderTriggered:U,errorCaptured:H,serverPrefetch:te,expose:Oe,inheritAttrs:Ee,components:pt,directives:It,filters:Qe}=t;if(c&&Wf(c,r,null,e.appContext.config.unwrapInjectedRef),o)for(const re in o){const Z=o[re];$(Z)&&(r[re]=Z.bind(n))}if(a){const re=a.call(n,n);oe(re)&&(e.data=lr(re))}if(Gr=!0,i)for(const re in i){const Z=i[re],je=$(Z)?Z.bind(n,n):$(Z.get)?Z.get.bind(n,n):Se,Ar=!$(Z)&&$(Z.set)?Z.set.bind(n):Se,qt=J({get:je,set:Ar});Object.defineProperty(r,re,{enumerable:!0,configurable:!0,get:()=>qt.value,set:Pt=>qt.value=Pt})}if(s)for(const re in s)es(s[re],r,n,re);if(l){const re=$(l)?l.call(n):l;Reflect.ownKeys(re).forEach(Z=>{Nf(Z,re[Z])})}u&&wi(u,e,"c");function he(re,Z){D(Z)?Z.forEach(je=>re(je.bind(n))):Z&&re(Z.bind(n))}if(he(Df,m),he(Ma,p),he(Rf,_),he(Lf,N),he(Mf,F),he(Sf,T),he(Uf,H),he(jf,ae),he(zf,U),he(Ff,A),he(hr,j),he($f,te),D(Oe))if(Oe.length){const re=e.exposed||(e.exposed={});Oe.forEach(Z=>{Object.defineProperty(re,Z,{get:()=>n[Z],set:je=>n[Z]=je})})}else e.exposed||(e.exposed={});z&&e.render===Se&&(e.render=z),Ee!=null&&(e.inheritAttrs=Ee),pt&&(e.components=pt),It&&(e.directives=It)}function Wf(e,t,n=Se,r=!1){D(e)&&(e=Xr(e));for(const a in e){const i=e[a];let o;oe(i)?"default"in i?o=Dn(i.from||a,i.default,!0):o=Dn(i.from||a):o=Dn(i),q(o)&&r?Object.defineProperty(t,a,{enumerable:!0,configurable:!0,get:()=>o.value,set:s=>o.value=s}):t[a]=o}}function wi(e,t,n){Te(D(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function es(e,t,n,r){const a=r.includes(".")?Xo(n,r):()=>n[r];if(le(e)){const i=t[e];$(i)&&Ke(a,i)}else if($(e))Ke(a,e.bind(n));else if(oe(e))if(D(e))e.forEach(i=>es(i,t,n,r));else{const i=$(e.handler)?e.handler.bind(n):t[e.handler];$(i)&&Ke(a,i,e)}}function ts(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,s=i.get(t);let l;return s?l=s:!a.length&&!n&&!r?l=t:(l={},a.length&&a.forEach(c=>Wn(l,c,o,!0)),Wn(l,t,o)),i.set(t,l),l}function Wn(e,t,n,r=!1){const{mixins:a,extends:i}=t;i&&Wn(e,i,n,!0),a&&a.forEach(o=>Wn(e,o,n,!0));for(const o in t)if(!(r&&o==="expose")){const s=Vf[o]||n&&n[o];e[o]=s?s(e[o],t[o]):t[o]}return e}const Vf={data:Ei,props:bt,emits:bt,methods:bt,computed:bt,beforeCreate:ue,created:ue,beforeMount:ue,mounted:ue,beforeUpdate:ue,updated:ue,beforeDestroy:ue,beforeUnmount:ue,destroyed:ue,unmounted:ue,activated:ue,deactivated:ue,errorCaptured:ue,serverPrefetch:ue,components:bt,directives:bt,watch:Xf,provide:Ei,inject:Gf};function Ei(e,t){return t?e?function(){return me($(e)?e.call(this,this):e,$(t)?t.call(this,this):t)}:t:e}function Gf(e,t){return bt(Xr(e),Xr(t))}function Xr(e){if(D(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ue(e,t){return e?[...new Set([].concat(e,t))]:t}function bt(e,t){return e?me(me(Object.create(null),e),t):t}function Xf(e,t){if(!e)return t;if(!t)return e;const n=me(Object.create(null),e);for(const r in t)n[r]=ue(e[r],t[r]);return n}function qf(e,t,n,r=!1){const a={},i={};Un(i,pr,1),e.propsDefaults=Object.create(null),ns(e,t,a,i);for(const o in e.propsOptions[0])o in a||(a[o]=void 0);n?e.props=r?a:of(a):e.type.props?e.props=a:e.props=i,e.attrs=i}function Jf(e,t,n,r){const{props:a,attrs:i,vnode:{patchFlag:o}}=e,s=Y(a),[l]=e.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=e.vnode.dynamicProps;for(let m=0;m<u.length;m++){let p=u[m];if(ur(e.emitsOptions,p))continue;const _=t[p];if(l)if(B(i,p))_!==i[p]&&(i[p]=_,c=!0);else{const N=ze(p);a[N]=qr(l,s,N,_,e,!1)}else _!==i[p]&&(i[p]=_,c=!0)}}}else{ns(e,t,a,i)&&(c=!0);let u;for(const m in s)(!t||!B(t,m)&&((u=Wt(m))===m||!B(t,u)))&&(l?n&&(n[m]!==void 0||n[u]!==void 0)&&(a[m]=qr(l,s,m,void 0,e,!0)):delete a[m]);if(i!==s)for(const m in i)(!t||!B(t,m)&&!0)&&(delete i[m],c=!0)}c&&Ye(e,"set","$attrs")}function ns(e,t,n,r){const[a,i]=e.propsOptions;let o=!1,s;if(t)for(let l in t){if(Sn(l))continue;const c=t[l];let u;a&&B(a,u=ze(l))?!i||!i.includes(u)?n[u]=c:(s||(s={}))[u]=c:ur(e.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(i){const l=Y(n),c=s||X;for(let u=0;u<i.length;u++){const m=i[u];n[m]=qr(a,l,m,c[m],e,!B(c,m))}}return o}function qr(e,t,n,r,a,i){const o=e[n];if(o!=null){const s=B(o,"default");if(s&&r===void 0){const l=o.default;if(o.type!==Function&&$(l)){const{propsDefaults:c}=a;n in c?r=c[n]:(Yt(a),r=c[n]=l.call(null,t),Ot())}else r=l}o[0]&&(i&&!s?r=!1:o[1]&&(r===""||r===Wt(n))&&(r=!0))}return r}function rs(e,t,n=!1){const r=t.propsCache,a=r.get(e);if(a)return a;const i=e.props,o={},s=[];let l=!1;if(!$(e)){const u=m=>{l=!0;const[p,_]=rs(m,t,!0);me(o,p),_&&s.push(..._)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!l)return r.set(e,jt),jt;if(D(i))for(let u=0;u<i.length;u++){const m=ze(i[u]);ki(m)&&(o[m]=X)}else if(i)for(const u in i){const m=ze(u);if(ki(m)){const p=i[u],_=o[m]=D(p)||$(p)?{type:p}:p;if(_){const N=Ci(Boolean,_.type),F=Ci(String,_.type);_[0]=N>-1,_[1]=F<0||N<F,(N>-1||B(_,"default"))&&s.push(m)}}}const c=[o,s];return r.set(e,c),c}function ki(e){return e[0]!=="$"}function Oi(e){const t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:e===null?"null":""}function Ai(e,t){return Oi(e)===Oi(t)}function Ci(e,t){return D(t)?t.findIndex(n=>Ai(n,e)):$(t)&&Ai(t,e)?0:-1}const as=e=>e[0]==="_"||e==="$stable",Sa=e=>D(e)?e.map(Fe):[Fe(e)],Zf=(e,t,n)=>{if(t._n)return t;const r=xf((...a)=>Sa(t(...a)),n);return r._c=!1,r},is=(e,t,n)=>{const r=e._ctx;for(const a in e){if(as(a))continue;const i=e[a];if($(i))t[a]=Zf(a,i,r);else if(i!=null){const o=Sa(i);t[a]=()=>o}}},os=(e,t)=>{const n=Sa(t);e.slots.default=()=>n},Qf=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=Y(t),Un(t,"_",n)):is(t,e.slots={})}else e.slots={},t&&os(e,t);Un(e.slots,pr,1)},ec=(e,t,n)=>{const{vnode:r,slots:a}=e;let i=!0,o=X;if(r.shapeFlag&32){const s=t._;s?n&&s===1?i=!1:(me(a,t),!n&&s===1&&delete a._):(i=!t.$stable,is(t,a)),o=t}else t&&(os(e,t),o={default:1});if(i)for(const s in a)!as(s)&&!(s in o)&&delete a[s]};function ss(){return{app:null,config:{isNativeTag:Al,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let tc=0;function nc(e,t){return function(r,a=null){$(r)||(r=Object.assign({},r)),a!=null&&!oe(a)&&(a=null);const i=ss(),o=new Set;let s=!1;const l=i.app={_uid:tc++,_component:r,_props:a,_container:null,_context:i,_instance:null,version:_c,get config(){return i.config},set config(c){},use(c,...u){return o.has(c)||(c&&$(c.install)?(o.add(c),c.install(l,...u)):$(c)&&(o.add(c),c(l,...u))),l},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),l},component(c,u){return u?(i.components[c]=u,l):i.components[c]},directive(c,u){return u?(i.directives[c]=u,l):i.directives[c]},mount(c,u,m){if(!s){const p=ne(r,a);return p.appContext=i,u&&t?t(p,c):e(p,c,m),s=!0,l._container=c,c.__vue_app__=l,gr(p.component)||p.component.proxy}},unmount(){s&&(e(null,l._container),delete l._container.__vue_app__)},provide(c,u){return i.provides[c]=u,l}};return l}}function Jr(e,t,n,r,a=!1){if(D(e)){e.forEach((p,_)=>Jr(p,t&&(D(t)?t[_]:t),n,r,a));return}if(Rn(r)&&!a)return;const i=r.shapeFlag&4?gr(r.component)||r.component.proxy:r.el,o=a?null:i,{i:s,r:l}=e,c=t&&t.r,u=s.refs===X?s.refs={}:s.refs,m=s.setupState;if(c!=null&&c!==l&&(le(c)?(u[c]=null,B(m,c)&&(m[c]=null)):q(c)&&(c.value=null)),$(l))ut(l,s,12,[o,u]);else{const p=le(l),_=q(l);if(p||_){const N=()=>{if(e.f){const F=p?u[l]:l.value;a?D(F)&&_a(F,i):D(F)?F.includes(i)||F.push(i):p?(u[l]=[i],B(m,l)&&(m[l]=u[l])):(l.value=[i],e.k&&(u[e.k]=l.value))}else p?(u[l]=o,B(m,l)&&(m[l]=o)):_&&(l.value=o,e.k&&(u[e.k]=o))};o?(N.id=-1,ge(N,n)):N()}}}const ge=Cf;function rc(e){return ac(e)}function ac(e,t){const n=Sl();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:o,createText:s,createComment:l,setText:c,setElementText:u,parentNode:m,nextSibling:p,setScopeId:_=Se,cloneNode:N,insertStaticContent:F}=e,T=(f,d,h,v=null,g=null,w=null,k=!1,x=null,E=!!d.dynamicChildren)=>{if(f===d)return;f&&!Zt(f,d)&&(v=kn(f),et(f,g,w,!0),f=null),d.patchFlag===-2&&(E=!1,d.dynamicChildren=null);const{type:b,ref:P,shapeFlag:C}=d;switch(b){case Ta:y(f,d,h,v);break;case At:A(f,d,h,v);break;case Ln:f==null&&R(d,h,v,k);break;case de:It(f,d,h,v,g,w,k,x,E);break;default:C&1?ae(f,d,h,v,g,w,k,x,E):C&6?Qe(f,d,h,v,g,w,k,x,E):(C&64||C&128)&&b.process(f,d,h,v,g,w,k,x,E,Mt)}P!=null&&g&&Jr(P,f&&f.ref,w,d||f,!d)},y=(f,d,h,v)=>{if(f==null)r(d.el=s(d.children),h,v);else{const g=d.el=f.el;d.children!==f.children&&c(g,d.children)}},A=(f,d,h,v)=>{f==null?r(d.el=l(d.children||""),h,v):d.el=f.el},R=(f,d,h,v)=>{[f.el,f.anchor]=F(f.children,d,h,v,f.el,f.anchor)},j=({el:f,anchor:d},h,v)=>{let g;for(;f&&f!==d;)g=p(f),r(f,h,v),f=g;r(d,h,v)},z=({el:f,anchor:d})=>{let h;for(;f&&f!==d;)h=p(f),a(f),f=h;a(d)},ae=(f,d,h,v,g,w,k,x,E)=>{k=k||d.type==="svg",f==null?U(d,h,v,g,w,k,x,E):Oe(f,d,g,w,k,x,E)},U=(f,d,h,v,g,w,k,x)=>{let E,b;const{type:P,props:C,shapeFlag:M,transition:L,patchFlag:K,dirs:V}=f;if(f.el&&N!==void 0&&K===-1)E=f.el=N(f.el);else{if(E=f.el=o(f.type,w,C&&C.is,C),M&8?u(E,f.children):M&16&&te(f.children,E,null,v,g,w&&P!=="foreignObject",k,x),V&&gt(f,null,v,"created"),C){for(const Q in C)Q!=="value"&&!Sn(Q)&&i(E,Q,null,C[Q],w,f.children,v,g,Ue);"value"in C&&i(E,"value",null,C.value),(b=C.onVnodeBeforeMount)&&Re(b,v,f)}H(E,f,f.scopeId,k,v)}V&&gt(f,null,v,"beforeMount");const G=(!g||g&&!g.pendingBranch)&&L&&!L.persisted;G&&L.beforeEnter(E),r(E,d,h),((b=C&&C.onVnodeMounted)||G||V)&&ge(()=>{b&&Re(b,v,f),G&&L.enter(E),V&&gt(f,null,v,"mounted")},g)},H=(f,d,h,v,g)=>{if(h&&_(f,h),v)for(let w=0;w<v.length;w++)_(f,v[w]);if(g){let w=g.subTree;if(d===w){const k=g.vnode;H(f,k,k.scopeId,k.slotScopeIds,g.parent)}}},te=(f,d,h,v,g,w,k,x,E=0)=>{for(let b=E;b<f.length;b++){const P=f[b]=x?ot(f[b]):Fe(f[b]);T(null,P,d,h,v,g,w,k,x)}},Oe=(f,d,h,v,g,w,k)=>{const x=d.el=f.el;let{patchFlag:E,dynamicChildren:b,dirs:P}=d;E|=f.patchFlag&16;const C=f.props||X,M=d.props||X;let L;h&&vt(h,!1),(L=M.onVnodeBeforeUpdate)&&Re(L,h,d,f),P&&gt(d,f,h,"beforeUpdate"),h&&vt(h,!0);const K=g&&d.type!=="foreignObject";if(b?Ee(f.dynamicChildren,b,x,h,v,K,w):k||je(f,d,x,null,h,v,K,w,!1),E>0){if(E&16)pt(x,d,C,M,h,v,g);else if(E&2&&C.class!==M.class&&i(x,"class",null,M.class,g),E&4&&i(x,"style",C.style,M.style,g),E&8){const V=d.dynamicProps;for(let G=0;G<V.length;G++){const Q=V[G],Ae=C[Q],St=M[Q];(St!==Ae||Q==="value")&&i(x,Q,Ae,St,g,f.children,h,v,Ue)}}E&1&&f.children!==d.children&&u(x,d.children)}else!k&&b==null&&pt(x,d,C,M,h,v,g);((L=M.onVnodeUpdated)||P)&&ge(()=>{L&&Re(L,h,d,f),P&&gt(d,f,h,"updated")},v)},Ee=(f,d,h,v,g,w,k)=>{for(let x=0;x<d.length;x++){const E=f[x],b=d[x],P=E.el&&(E.type===de||!Zt(E,b)||E.shapeFlag&70)?m(E.el):h;T(E,b,P,null,v,g,w,k,!0)}},pt=(f,d,h,v,g,w,k)=>{if(h!==v){for(const x in v){if(Sn(x))continue;const E=v[x],b=h[x];E!==b&&x!=="value"&&i(f,x,b,E,k,d.children,g,w,Ue)}if(h!==X)for(const x in h)!Sn(x)&&!(x in v)&&i(f,x,h[x],null,k,d.children,g,w,Ue);"value"in v&&i(f,"value",h.value,v.value)}},It=(f,d,h,v,g,w,k,x,E)=>{const b=d.el=f?f.el:s(""),P=d.anchor=f?f.anchor:s("");let{patchFlag:C,dynamicChildren:M,slotScopeIds:L}=d;L&&(x=x?x.concat(L):L),f==null?(r(b,h,v),r(P,h,v),te(d.children,h,P,g,w,k,x,E)):C>0&&C&64&&M&&f.dynamicChildren?(Ee(f.dynamicChildren,M,h,g,w,k,x),(d.key!=null||g&&d===g.subTree)&&ls(f,d,!0)):je(f,d,h,P,g,w,k,x,E)},Qe=(f,d,h,v,g,w,k,x,E)=>{d.slotScopeIds=x,f==null?d.shapeFlag&512?g.ctx.activate(d,h,v,k,E):ce(d,h,v,g,w,k,E):he(f,d,E)},ce=(f,d,h,v,g,w,k)=>{const x=f.component=mc(f,v,g);if(qo(f)&&(x.ctx.renderer=Mt),hc(x),x.asyncDep){if(g&&g.registerDep(x,re),!f.el){const E=x.subTree=ne(At);A(null,E,d,h)}return}re(x,f,d,h,g,w,k)},he=(f,d,h)=>{const v=d.component=f.component;if(kf(f,d,h))if(v.asyncDep&&!v.asyncResolved){Z(v,d,h);return}else v.next=d,vf(v.update),v.update();else d.el=f.el,v.vnode=d},re=(f,d,h,v,g,w,k)=>{const x=()=>{if(f.isMounted){let{next:P,bu:C,u:M,parent:L,vnode:K}=f,V=P,G;vt(f,!1),P?(P.el=K.el,Z(f,P,k)):P=K,C&&Tn(C),(G=P.props&&P.props.onVnodeBeforeUpdate)&&Re(G,L,P,K),vt(f,!0);const Q=Pr(f),Ae=f.subTree;f.subTree=Q,T(Ae,Q,m(Ae.el),kn(Ae),f,g,w),P.el=Q.el,V===null&&Of(f,Q.el),M&&ge(M,g),(G=P.props&&P.props.onVnodeUpdated)&&ge(()=>Re(G,L,P,K),g)}else{let P;const{el:C,props:M}=d,{bm:L,m:K,parent:V}=f,G=Rn(d);if(vt(f,!1),L&&Tn(L),!G&&(P=M&&M.onVnodeBeforeMount)&&Re(P,V,d),vt(f,!0),C&&Nr){const Q=()=>{f.subTree=Pr(f),Nr(C,f.subTree,f,g,null)};G?d.type.__asyncLoader().then(()=>!f.isUnmounted&&Q()):Q()}else{const Q=f.subTree=Pr(f);T(null,Q,h,v,f,g,w),d.el=Q.el}if(K&&ge(K,g),!G&&(P=M&&M.onVnodeMounted)){const Q=d;ge(()=>Re(P,V,Q),g)}(d.shapeFlag&256||V&&Rn(V.vnode)&&V.vnode.shapeFlag&256)&&f.a&&ge(f.a,g),f.isMounted=!0,d=h=v=null}},E=f.effect=new Ea(x,()=>Uo(b),f.scope),b=f.update=()=>E.run();b.id=f.uid,vt(f,!0),b()},Z=(f,d,h)=>{d.component=f;const v=f.vnode.props;f.vnode=d,f.next=null,Jf(f,d.props,v,h),ec(f,d.children,h),Vt(),cr(void 0,f.update),Gt()},je=(f,d,h,v,g,w,k,x,E=!1)=>{const b=f&&f.children,P=f?f.shapeFlag:0,C=d.children,{patchFlag:M,shapeFlag:L}=d;if(M>0){if(M&128){qt(b,C,h,v,g,w,k,x,E);return}else if(M&256){Ar(b,C,h,v,g,w,k,x,E);return}}L&8?(P&16&&Ue(b,g,w),C!==b&&u(h,C)):P&16?L&16?qt(b,C,h,v,g,w,k,x,E):Ue(b,g,w,!0):(P&8&&u(h,""),L&16&&te(C,h,v,g,w,k,x,E))},Ar=(f,d,h,v,g,w,k,x,E)=>{f=f||jt,d=d||jt;const b=f.length,P=d.length,C=Math.min(b,P);let M;for(M=0;M<C;M++){const L=d[M]=E?ot(d[M]):Fe(d[M]);T(f[M],L,h,null,g,w,k,x,E)}b>P?Ue(f,g,w,!0,!1,C):te(d,h,v,g,w,k,x,E,C)},qt=(f,d,h,v,g,w,k,x,E)=>{let b=0;const P=d.length;let C=f.length-1,M=P-1;for(;b<=C&&b<=M;){const L=f[b],K=d[b]=E?ot(d[b]):Fe(d[b]);if(Zt(L,K))T(L,K,h,null,g,w,k,x,E);else break;b++}for(;b<=C&&b<=M;){const L=f[C],K=d[M]=E?ot(d[M]):Fe(d[M]);if(Zt(L,K))T(L,K,h,null,g,w,k,x,E);else break;C--,M--}if(b>C){if(b<=M){const L=M+1,K=L<P?d[L].el:v;for(;b<=M;)T(null,d[b]=E?ot(d[b]):Fe(d[b]),h,K,g,w,k,x,E),b++}}else if(b>M)for(;b<=C;)et(f[b],g,w,!0),b++;else{const L=b,K=b,V=new Map;for(b=K;b<=M;b++){const be=d[b]=E?ot(d[b]):Fe(d[b]);be.key!=null&&V.set(be.key,b)}let G,Q=0;const Ae=M-K+1;let St=!1,oi=0;const Jt=new Array(Ae);for(b=0;b<Ae;b++)Jt[b]=0;for(b=L;b<=C;b++){const be=f[b];if(Q>=Ae){et(be,g,w,!0);continue}let De;if(be.key!=null)De=V.get(be.key);else for(G=K;G<=M;G++)if(Jt[G-K]===0&&Zt(be,d[G])){De=G;break}De===void 0?et(be,g,w,!0):(Jt[De-K]=b+1,De>=oi?oi=De:St=!0,T(be,d[De],h,null,g,w,k,x,E),Q++)}const si=St?ic(Jt):jt;for(G=si.length-1,b=Ae-1;b>=0;b--){const be=K+b,De=d[be],li=be+1<P?d[be+1].el:v;Jt[b]===0?T(null,De,h,li,g,w,k,x,E):St&&(G<0||b!==si[G]?Pt(De,h,li,2):G--)}}},Pt=(f,d,h,v,g=null)=>{const{el:w,type:k,transition:x,children:E,shapeFlag:b}=f;if(b&6){Pt(f.component.subTree,d,h,v);return}if(b&128){f.suspense.move(d,h,v);return}if(b&64){k.move(f,d,h,Mt);return}if(k===de){r(w,d,h);for(let C=0;C<E.length;C++)Pt(E[C],d,h,v);r(f.anchor,d,h);return}if(k===Ln){j(f,d,h);return}if(v!==2&&b&1&&x)if(v===0)x.beforeEnter(w),r(w,d,h),ge(()=>x.enter(w),g);else{const{leave:C,delayLeave:M,afterLeave:L}=x,K=()=>r(w,d,h),V=()=>{C(w,()=>{K(),L&&L()})};M?M(w,K,V):V()}else r(w,d,h)},et=(f,d,h,v=!1,g=!1)=>{const{type:w,props:k,ref:x,children:E,dynamicChildren:b,shapeFlag:P,patchFlag:C,dirs:M}=f;if(x!=null&&Jr(x,null,h,f,!0),P&256){d.ctx.deactivate(f);return}const L=P&1&&M,K=!Rn(f);let V;if(K&&(V=k&&k.onVnodeBeforeUnmount)&&Re(V,d,f),P&6)vl(f.component,h,v);else{if(P&128){f.suspense.unmount(h,v);return}L&&gt(f,null,d,"beforeUnmount"),P&64?f.type.remove(f,d,h,g,Mt,v):b&&(w!==de||C>0&&C&64)?Ue(b,d,h,!1,!0):(w===de&&C&384||!g&&P&16)&&Ue(E,d,h),v&&ai(f)}(K&&(V=k&&k.onVnodeUnmounted)||L)&&ge(()=>{V&&Re(V,d,f),L&&gt(f,null,d,"unmounted")},h)},ai=f=>{const{type:d,el:h,anchor:v,transition:g}=f;if(d===de){gl(h,v);return}if(d===Ln){z(f);return}const w=()=>{a(h),g&&!g.persisted&&g.afterLeave&&g.afterLeave()};if(f.shapeFlag&1&&g&&!g.persisted){const{leave:k,delayLeave:x}=g,E=()=>k(h,w);x?x(f.el,w,E):E()}else w()},gl=(f,d)=>{let h;for(;f!==d;)h=p(f),a(f),f=h;a(d)},vl=(f,d,h)=>{const{bum:v,scope:g,update:w,subTree:k,um:x}=f;v&&Tn(v),g.stop(),w&&(w.active=!1,et(k,f,d,h)),x&&ge(x,d),ge(()=>{f.isUnmounted=!0},d),d&&d.pendingBranch&&!d.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===d.pendingId&&(d.deps--,d.deps===0&&d.resolve())},Ue=(f,d,h,v=!1,g=!1,w=0)=>{for(let k=w;k<f.length;k++)et(f[k],d,h,v,g)},kn=f=>f.shapeFlag&6?kn(f.component.subTree):f.shapeFlag&128?f.suspense.next():p(f.anchor||f.el),ii=(f,d,h)=>{f==null?d._vnode&&et(d._vnode,null,null,!0):T(d._vnode||null,f,d,null,null,null,h),Ko(),d._vnode=f},Mt={p:T,um:et,m:Pt,r:ai,mt:ce,mc:te,pc:je,pbc:Ee,n:kn,o:e};let Cr,Nr;return t&&([Cr,Nr]=t(Mt)),{render:ii,hydrate:Cr,createApp:nc(ii,Cr)}}function vt({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function ls(e,t,n=!1){const r=e.children,a=t.children;if(D(r)&&D(a))for(let i=0;i<r.length;i++){const o=r[i];let s=a[i];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[i]=ot(a[i]),s.el=o.el),n||ls(o,s))}}function ic(e){const t=e.slice(),n=[0];let r,a,i,o,s;const l=e.length;for(r=0;r<l;r++){const c=e[r];if(c!==0){if(a=n[n.length-1],e[a]<c){t[r]=a,n.push(r);continue}for(i=0,o=n.length-1;i<o;)s=i+o>>1,e[n[s]]<c?i=s+1:o=s;c<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}const oc=e=>e.__isTeleport,de=Symbol(void 0),Ta=Symbol(void 0),At=Symbol(void 0),Ln=Symbol(void 0),on=[];let Pe=null;function ve(e=!1){on.push(Pe=e?null:[])}function sc(){on.pop(),Pe=on[on.length-1]||null}let gn=1;function Ni(e){gn+=e}function fs(e){return e.dynamicChildren=gn>0?Pe||jt:null,sc(),gn>0&&Pe&&Pe.push(e),e}function Ne(e,t,n,r,a,i){return fs(I(e,t,n,r,a,i,!0))}function Da(e,t,n,r,a){return fs(ne(e,t,n,r,a,!0))}function Zr(e){return e?e.__v_isVNode===!0:!1}function Zt(e,t){return e.type===t.type&&e.key===t.key}const pr="__vInternal",cs=({key:e})=>e!=null?e:null,Fn=({ref:e,ref_key:t,ref_for:n})=>e!=null?le(e)||q(e)||$(e)?{i:ke,r:e,k:t,f:!!n}:e:null;function I(e,t=null,n=null,r=0,a=null,i=e===de?0:1,o=!1,s=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&cs(t),ref:t&&Fn(t),scopeId:dr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null};return s?(La(l,n),i&128&&e.normalize(l)):n&&(l.shapeFlag|=le(n)?8:16),gn>0&&!o&&Pe&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Pe.push(l),l}const ne=lc;function lc(e,t=null,n=null,r=0,a=null,i=!1){if((!e||e===Hf)&&(e=At),Zr(e)){const s=Kt(e,t,!0);return n&&La(s,n),gn>0&&!i&&Pe&&(s.shapeFlag&6?Pe[Pe.indexOf(e)]=s:Pe.push(s)),s.patchFlag|=-2,s}if(yc(e)&&(e=e.__vccOpts),t){t=fc(t);let{class:s,style:l}=t;s&&!le(s)&&(t.class=tr(s)),oe(l)&&(Ro(l)&&!D(l)&&(l=me({},l)),t.style=ba(l))}const o=le(e)?1:Af(e)?128:oc(e)?64:oe(e)?4:$(e)?2:0;return I(e,t,n,r,a,o,i,!0)}function fc(e){return e?Ro(e)||pr in e?me({},e):e:null}function Kt(e,t,n=!1){const{props:r,ref:a,patchFlag:i,children:o}=e,s=t?cc(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:s,key:s&&cs(s),ref:t&&t.ref?n&&a?D(a)?a.concat(Fn(t)):[a,Fn(t)]:Fn(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==de?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Kt(e.ssContent),ssFallback:e.ssFallback&&Kt(e.ssFallback),el:e.el,anchor:e.anchor}}function st(e=" ",t=0){return ne(Ta,null,e,t)}function Ra(e="",t=!1){return t?(ve(),Da(At,null,e)):ne(At,null,e)}function Fe(e){return e==null||typeof e=="boolean"?ne(At):D(e)?ne(de,null,e.slice()):typeof e=="object"?ot(e):ne(Ta,null,String(e))}function ot(e){return e.el===null||e.memo?e:Kt(e)}function La(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(D(t))n=16;else if(typeof t=="object")if(r&65){const a=t.default;a&&(a._c&&(a._d=!1),La(e,a()),a._c&&(a._d=!0));return}else{n=32;const a=t._;!a&&!(pr in t)?t._ctx=ke:a===3&&ke&&(ke.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else $(t)?(t={default:t,_ctx:ke},n=32):(t=String(t),r&64?(n=16,t=[st(t)]):n=8);e.children=t,e.shapeFlag|=n}function cc(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const a in r)if(a==="class")t.class!==r.class&&(t.class=tr([t.class,r.class]));else if(a==="style")t.style=ba([t.style,r.style]);else if(rr(a)){const i=t[a],o=r[a];o&&i!==o&&!(D(i)&&i.includes(o))&&(t[a]=i?[].concat(i,o):o)}else a!==""&&(t[a]=r[a])}return t}function Re(e,t,n,r=null){Te(e,t,7,[n,r])}const uc=ss();let dc=0;function mc(e,t,n){const r=e.type,a=(t?t.appContext:e.appContext)||uc,i={uid:dc++,vnode:e,type:r,parent:t,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new wo(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rs(r,a),emitsOptions:Wo(r,a),emit:null,emitted:null,propsDefaults:X,inheritAttrs:r.inheritAttrs,ctx:X,data:X,props:X,attrs:X,slots:X,refs:X,setupState:X,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=_f.bind(null,i),e.ce&&e.ce(i),i}let se=null;const Fa=()=>se||ke,Yt=e=>{se=e,e.scope.on()},Ot=()=>{se&&se.scope.off(),se=null};function us(e){return e.vnode.shapeFlag&4}let vn=!1;function hc(e,t=!1){vn=t;const{props:n,children:r}=e.vnode,a=us(e);qf(e,n,a,t),Qf(e,r);const i=a?pc(e,t):void 0;return vn=!1,i}function pc(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Bt(new Proxy(e.ctx,Kf));const{setup:r}=n;if(r){const a=e.setupContext=r.length>1?vc(e):null;Yt(e),Vt();const i=ut(r,e,0,[e.props,a]);if(Gt(),Ot(),yo(i)){if(i.then(Ot,Ot),t)return i.then(o=>{Ii(e,o,t)}).catch(o=>{fr(o,e,0)});e.asyncDep=i}else Ii(e,i,t)}else ds(e,t)}function Ii(e,t,n){$(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:oe(t)&&(e.setupState=$o(t)),ds(e,n)}let Pi;function ds(e,t,n){const r=e.type;if(!e.render){if(!t&&Pi&&!r.render){const a=r.template;if(a){const{isCustomElement:i,compilerOptions:o}=e.appContext.config,{delimiters:s,compilerOptions:l}=r,c=me(me({isCustomElement:i,delimiters:s},o),l);r.render=Pi(a,c)}}e.render=r.render||Se}Yt(e),Vt(),Yf(e),Gt(),Ot()}function gc(e){return new Proxy(e.attrs,{get(t,n){return xe(e,"get","$attrs"),t[n]}})}function vc(e){const t=r=>{e.exposed=r||{}};let n;return{get attrs(){return n||(n=gc(e))},slots:e.slots,emit:e.emit,expose:t}}function gr(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy($o(Bt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Yn)return Yn[n](e)}}))}function bc(e,t=!0){return $(e)?e.displayName||e.name:e.name||t&&e.__name}function yc(e){return $(e)&&"__vccOpts"in e}const J=(e,t)=>hf(e,t,vn);function ms(e,t,n){const r=arguments.length;return r===2?oe(t)&&!D(t)?Zr(t)?ne(e,null,[t]):ne(e,t):ne(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Zr(n)&&(n=[n]),ne(e,t,n))}const _c="3.2.37",xc="http://www.w3.org/2000/svg",yt=typeof document<"u"?document:null,Mi=yt&&yt.createElement("template"),wc={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const a=t?yt.createElementNS(xc,e):yt.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:e=>yt.createTextNode(e),createComment:e=>yt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>yt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},cloneNode(e){const t=e.cloneNode(!0);return"_value"in e&&(t._value=e._value),t},insertStaticContent(e,t,n,r,a,i){const o=n?n.previousSibling:t.lastChild;if(a&&(a===i||a.nextSibling))for(;t.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{Mi.innerHTML=r?`<svg>${e}</svg>`:e;const s=Mi.content;if(r){const l=s.firstChild;for(;l.firstChild;)s.appendChild(l.firstChild);s.removeChild(l)}t.insertBefore(s,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function Ec(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function kc(e,t,n){const r=e.style,a=le(n);if(n&&!a){for(const i in n)Qr(r,i,n[i]);if(t&&!le(t))for(const i in t)n[i]==null&&Qr(r,i,"")}else{const i=r.display;a?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=i)}}const Si=/\s*!important$/;function Qr(e,t,n){if(D(n))n.forEach(r=>Qr(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Oc(e,t);Si.test(n)?e.setProperty(Wt(r),n.replace(Si,""),"important"):e[r]=n}}const Ti=["Webkit","Moz","ms"],Mr={};function Oc(e,t){const n=Mr[t];if(n)return n;let r=ze(t);if(r!=="filter"&&r in e)return Mr[t]=r;r=or(r);for(let a=0;a<Ti.length;a++){const i=Ti[a]+r;if(i in e)return Mr[t]=i}return t}const Di="http://www.w3.org/1999/xlink";function Ac(e,t,n,r,a){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(Di,t.slice(6,t.length)):e.setAttributeNS(Di,t,n);else{const i=_l(t);n==null||i&&!vo(n)?e.removeAttribute(t):e.setAttribute(t,i?"":n)}}function Cc(e,t,n,r,a,i,o){if(t==="innerHTML"||t==="textContent"){r&&o(r,a,i),e[t]=n==null?"":n;return}if(t==="value"&&e.tagName!=="PROGRESS"&&!e.tagName.includes("-")){e._value=n;const l=n==null?"":n;(e.value!==l||e.tagName==="OPTION")&&(e.value=l),n==null&&e.removeAttribute(t);return}let s=!1;if(n===""||n==null){const l=typeof e[t];l==="boolean"?n=vo(n):n==null&&l==="string"?(n="",s=!0):l==="number"&&(n=0,s=!0)}try{e[t]=n}catch{}s&&e.removeAttribute(t)}const[hs,Nc]=(()=>{let e=Date.now,t=!1;if(typeof window<"u"){Date.now()>document.createEvent("Event").timeStamp&&(e=performance.now.bind(performance));const n=navigator.userAgent.match(/firefox\/(\d+)/i);t=!!(n&&Number(n[1])<=53)}return[e,t]})();let ea=0;const Ic=Promise.resolve(),Pc=()=>{ea=0},Mc=()=>ea||(Ic.then(Pc),ea=hs());function _t(e,t,n,r){e.addEventListener(t,n,r)}function Sc(e,t,n,r){e.removeEventListener(t,n,r)}function Tc(e,t,n,r,a=null){const i=e._vei||(e._vei={}),o=i[t];if(r&&o)o.value=r;else{const[s,l]=Dc(t);if(r){const c=i[t]=Rc(r,a);_t(e,s,c,l)}else o&&(Sc(e,s,o,l),i[t]=void 0)}}const Ri=/(?:Once|Passive|Capture)$/;function Dc(e){let t;if(Ri.test(e)){t={};let n;for(;n=e.match(Ri);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[Wt(e.slice(2)),t]}function Rc(e,t){const n=r=>{const a=r.timeStamp||hs();(Nc||a>=n.attached-1)&&Te(Lc(r,n.value),t,5,[r])};return n.value=e,n.attached=Mc(),n}function Lc(e,t){if(D(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>a=>!a._stopped&&r&&r(a))}else return t}const Li=/^on[a-z]/,Fc=(e,t,n,r,a=!1,i,o,s,l)=>{t==="class"?Ec(e,r,a):t==="style"?kc(e,n,r):rr(t)?ya(t)||Tc(e,t,n,r,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):$c(e,t,r,a))?Cc(e,t,r,i,o,s,l):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Ac(e,t,r,a))};function $c(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&Li.test(t)&&$(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||Li.test(t)&&le(n)?!1:t in e}function zc(e){const t=Fa();if(!t)return;const n=()=>ta(t.subTree,e(t.proxy));If(n),Ma(()=>{const r=new MutationObserver(n);r.observe(t.subTree.el.parentNode,{childList:!0}),hr(()=>r.disconnect())})}function ta(e,t){if(e.shapeFlag&128){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{ta(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)Fi(e.el,t);else if(e.type===de)e.children.forEach(n=>ta(n,t));else if(e.type===Ln){let{el:n,anchor:r}=e;for(;n&&(Fi(n,t),n!==r);)n=n.nextSibling}}function Fi(e,t){if(e.nodeType===1){const n=e.style;for(const r in t)n.setProperty(`--${r}`,t[r])}}const Vn=e=>{const t=e.props["onUpdate:modelValue"]||!1;return D(t)?n=>Tn(t,n):t};function jc(e){e.target.composing=!0}function $i(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Sr={created(e,{modifiers:{lazy:t,trim:n,number:r}},a){e._assign=Vn(a);const i=r||a.props&&a.props.type==="number";_t(e,t?"change":"input",o=>{if(o.target.composing)return;let s=e.value;n&&(s=s.trim()),i&&(s=Hn(s)),e._assign(s)}),n&&_t(e,"change",()=>{e.value=e.value.trim()}),t||(_t(e,"compositionstart",jc),_t(e,"compositionend",$i),_t(e,"change",$i))},mounted(e,{value:t}){e.value=t==null?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:r,number:a}},i){if(e._assign=Vn(i),e.composing||document.activeElement===e&&e.type!=="range"&&(n||r&&e.value.trim()===t||(a||e.type==="number")&&Hn(e.value)===t))return;const o=t==null?"":t;e.value!==o&&(e.value=o)}},Tr={deep:!0,created(e,{value:t,modifiers:{number:n}},r){const a=ar(t);_t(e,"change",()=>{const i=Array.prototype.filter.call(e.options,o=>o.selected).map(o=>n?Hn(Gn(o)):Gn(o));e._assign(e.multiple?a?new Set(i):i:i[0])}),e._assign=Vn(r)},mounted(e,{value:t}){zi(e,t)},beforeUpdate(e,t,n){e._assign=Vn(n)},updated(e,{value:t}){zi(e,t)}};function zi(e,t){const n=e.multiple;if(!(n&&!D(t)&&!ar(t))){for(let r=0,a=e.options.length;r<a;r++){const i=e.options[r],o=Gn(i);if(n)D(t)?i.selected=Ol(t,o)>-1:i.selected=t.has(o);else if(nr(Gn(i),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Gn(e){return"_value"in e?e._value:e.value}const Uc=["ctrl","shift","alt","meta"],Hc={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Uc.some(n=>e[`${n}Key`]&&!t.includes(n))},ps=(e,t)=>(n,...r)=>{for(let a=0;a<t.length;a++){const i=Hc[t[a]];if(i&&i(n,t))return}return e(n,...r)},Bc=me({patchProp:Fc},wc);let ji;function Kc(){return ji||(ji=rc(Bc))}const Yc=(...e)=>{const t=Kc().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=Wc(r);if(!a)return;const i=t._component;!$(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,a instanceof SVGElement);return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},t};function Wc(e){return le(e)?document.querySelector(e):e}var Vc=!1;/*!
  * pinia v2.0.17
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */let gs;const vr=e=>gs=e,vs=Symbol();function na(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var sn;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(sn||(sn={}));function Gc(){const e=Eo(!0),t=e.run(()=>_n({}));let n=[],r=[];const a=Bt({install(i){vr(a),a._a=i,i.provide(vs,a),i.config.globalProperties.$pinia=a,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!Vc?r.push(i):n.push(i),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return a}const bs=()=>{};function Ui(e,t,n,r=bs){e.push(t);const a=()=>{const i=e.indexOf(t);i>-1&&(e.splice(i,1),r())};return!n&&Fa()&&hr(a),a}function Dt(e,...t){e.slice().forEach(n=>{n(...t)})}function ra(e,t){for(const n in t){if(!t.hasOwnProperty(n))continue;const r=t[n],a=e[n];na(a)&&na(r)&&e.hasOwnProperty(n)&&!q(r)&&!ct(r)?e[n]=ra(a,r):e[n]=r}return e}const Xc=Symbol();function qc(e){return!na(e)||!e.hasOwnProperty(Xc)}const{assign:He}=Object;function Jc(e){return!!(q(e)&&e.effect)}function Zc(e,t,n,r){const{state:a,actions:i,getters:o}=t,s=n.state.value[e];let l;function c(){s||(n.state.value[e]=a?a():{});const u=cf(n.state.value[e]);return He(u,i,Object.keys(o||{}).reduce((m,p)=>(m[p]=Bt(J(()=>{vr(n);const _=n._s.get(e);return o[p].call(_,_)})),m),{}))}return l=ys(e,c,t,n,r,!0),l.$reset=function(){const m=a?a():{};this.$patch(p=>{He(p,m)})},l}function ys(e,t,n={},r,a,i){let o;const s=He({actions:{}},n),l={deep:!0};let c,u,m=Bt([]),p=Bt([]),_;const N=r.state.value[e];!i&&!N&&(r.state.value[e]={}),_n({});let F;function T(U){let H;c=u=!1,typeof U=="function"?(U(r.state.value[e]),H={type:sn.patchFunction,storeId:e,events:_}):(ra(r.state.value[e],U),H={type:sn.patchObject,payload:U,storeId:e,events:_});const te=F=Symbol();jo().then(()=>{F===te&&(c=!0)}),u=!0,Dt(m,H,r.state.value[e])}const y=bs;function A(){o.stop(),m=[],p=[],r._s.delete(e)}function R(U,H){return function(){vr(r);const te=Array.from(arguments),Oe=[],Ee=[];function pt(ce){Oe.push(ce)}function It(ce){Ee.push(ce)}Dt(p,{args:te,name:U,store:z,after:pt,onError:It});let Qe;try{Qe=H.apply(this&&this.$id===e?this:z,te)}catch(ce){throw Dt(Ee,ce),ce}return Qe instanceof Promise?Qe.then(ce=>(Dt(Oe,ce),ce)).catch(ce=>(Dt(Ee,ce),Promise.reject(ce))):(Dt(Oe,Qe),Qe)}}const j={_p:r,$id:e,$onAction:Ui.bind(null,p),$patch:T,$reset:y,$subscribe(U,H={}){const te=Ui(m,U,H.detached,()=>Oe()),Oe=o.run(()=>Ke(()=>r.state.value[e],Ee=>{(H.flush==="sync"?u:c)&&U({storeId:e,type:sn.direct,events:_},Ee)},He({},l,H)));return te},$dispose:A},z=lr(He({},j));r._s.set(e,z);const ae=r._e.run(()=>(o=Eo(),o.run(()=>t())));for(const U in ae){const H=ae[U];if(q(H)&&!Jc(H)||ct(H))i||(N&&qc(H)&&(q(H)?H.value=N[U]:ra(H,N[U])),r.state.value[e][U]=H);else if(typeof H=="function"){const te=R(U,H);ae[U]=te,s.actions[U]=H}}return He(z,ae),He(Y(z),ae),Object.defineProperty(z,"$state",{get:()=>r.state.value[e],set:U=>{T(H=>{He(H,U)})}}),r._p.forEach(U=>{He(z,o.run(()=>U({store:z,app:r._a,pinia:r,options:s})))}),N&&i&&n.hydrate&&n.hydrate(z.$state,N),c=!0,u=!0,z}function _s(e,t,n){let r,a;const i=typeof t=="function";typeof e=="string"?(r=e,a=i?n:t):(a=e,r=e.id);function o(s,l){const c=Fa();return s=s||c&&Dn(vs),s&&vr(s),s=gs,s._s.has(r)||(i?ys(r,t,a,s):Zc(r,a,s)),s._s.get(r)}return o.$id=r,o}/*!
 * Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */function Hi(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Hi(Object(n),!0).forEach(function(r){tu(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Hi(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Xn(e){return Xn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Xn(e)}function Qc(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Bi(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function eu(e,t,n){return t&&Bi(e.prototype,t),n&&Bi(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function tu(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $a(e,t){return ru(e)||iu(e,t)||xs(e,t)||su()}function br(e){return nu(e)||au(e)||xs(e)||ou()}function nu(e){if(Array.isArray(e))return aa(e)}function ru(e){if(Array.isArray(e))return e}function au(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function iu(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,o,s;try{for(n=n.call(e);!(a=(o=n.next()).done)&&(r.push(o.value),!(t&&r.length===t));a=!0);}catch(l){i=!0,s=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw s}}return r}}function xs(e,t){if(!!e){if(typeof e=="string")return aa(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return aa(e,t)}}function aa(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ou(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function su(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ki=function(){},za={},ws={},Es=null,ks={mark:Ki,measure:Ki};try{typeof window<"u"&&(za=window),typeof document<"u"&&(ws=document),typeof MutationObserver<"u"&&(Es=MutationObserver),typeof performance<"u"&&(ks=performance)}catch{}var lu=za.navigator||{},Yi=lu.userAgent,Wi=Yi===void 0?"":Yi,mt=za,ee=ws,Vi=Es,Pn=ks;mt.document;var Je=!!ee.documentElement&&!!ee.head&&typeof ee.addEventListener=="function"&&typeof ee.createElement=="function",Os=~Wi.indexOf("MSIE")||~Wi.indexOf("Trident/"),We="___FONT_AWESOME___",ia=16,As="fa",Cs="svg-inline--fa",Ct="data-fa-i2svg",oa="data-fa-pseudo-element",fu="data-fa-pseudo-element-pending",ja="data-prefix",Ua="data-icon",Gi="fontawesome-i2svg",cu="async",uu=["HTML","HEAD","STYLE","SCRIPT"],Ns=function(){try{return!0}catch{return!1}}(),Ha={fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit",fa:"solid"},qn={solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"},Is={fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},du={"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},mu=/fa[srltdbk]?[\-\ ]/,Ps="fa-layers-text",hu=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i,pu={900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},Ms=[1,2,3,4,5,6,7,8,9,10],gu=Ms.concat([11,12,13,14,15,16,17,18,19,20]),vu=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],wt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},bu=[].concat(br(Object.keys(qn)),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",wt.GROUP,wt.SWAP_OPACITY,wt.PRIMARY,wt.SECONDARY]).concat(Ms.map(function(e){return"".concat(e,"x")})).concat(gu.map(function(e){return"w-".concat(e)})),Ss=mt.FontAwesomeConfig||{};function yu(e){var t=ee.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function _u(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(ee&&typeof ee.querySelector=="function"){var xu=[["data-family-prefix","familyPrefix"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];xu.forEach(function(e){var t=$a(e,2),n=t[0],r=t[1],a=_u(yu(n));a!=null&&(Ss[r]=a)})}var wu={familyPrefix:As,styleDefault:"solid",replacementClass:Cs,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},ln=O(O({},wu),Ss);ln.autoReplaceSvg||(ln.observeMutations=!1);var S={};Object.keys(ln).forEach(function(e){Object.defineProperty(S,e,{enumerable:!0,set:function(n){ln[e]=n,$n.forEach(function(r){return r(S)})},get:function(){return ln[e]}})});mt.FontAwesomeConfig=S;var $n=[];function Eu(e){return $n.push(e),function(){$n.splice($n.indexOf(e),1)}}var nt=ia,$e={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ku(e){if(!(!e||!Je)){var t=ee.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=ee.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return ee.head.insertBefore(t,r),e}}var Ou="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function bn(){for(var e=12,t="";e-- >0;)t+=Ou[Math.random()*62|0];return t}function Xt(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Ba(e){return e.classList?Xt(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Ts(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Au(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(Ts(e[n]),'" ')},"").trim()}function yr(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function Ka(e){return e.size!==$e.size||e.x!==$e.x||e.y!==$e.y||e.rotate!==$e.rotate||e.flipX||e.flipY}function Cu(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:c}}function Nu(e){var t=e.transform,n=e.width,r=n===void 0?ia:n,a=e.height,i=a===void 0?ia:a,o=e.startCentered,s=o===void 0?!1:o,l="";return s&&Os?l+="translate(".concat(t.x/nt-r/2,"em, ").concat(t.y/nt-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(t.x/nt,"em), calc(-50% + ").concat(t.y/nt,"em)) "):l+="translate(".concat(t.x/nt,"em, ").concat(t.y/nt,"em) "),l+="scale(".concat(t.size/nt*(t.flipX?-1:1),", ").concat(t.size/nt*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var Iu=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Ds(){var e=As,t=Cs,n=S.familyPrefix,r=S.replacementClass,a=Iu;if(n!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");a=a.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(r))}return a}var Xi=!1;function Dr(){S.autoAddCss&&!Xi&&(ku(Ds()),Xi=!0)}var Pu={mixout:function(){return{dom:{css:Ds,insertCss:Dr}}},hooks:function(){return{beforeDOMElementCreation:function(){Dr()},beforeI2svg:function(){Dr()}}}},Ve=mt||{};Ve[We]||(Ve[We]={});Ve[We].styles||(Ve[We].styles={});Ve[We].hooks||(Ve[We].hooks={});Ve[We].shims||(Ve[We].shims=[]);var Me=Ve[We],Rs=[],Mu=function e(){ee.removeEventListener("DOMContentLoaded",e),Jn=1,Rs.map(function(t){return t()})},Jn=!1;Je&&(Jn=(ee.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(ee.readyState),Jn||ee.addEventListener("DOMContentLoaded",Mu));function Su(e){!Je||(Jn?setTimeout(e,0):Rs.push(e))}function xn(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,a=e.children,i=a===void 0?[]:a;return typeof e=="string"?Ts(e):"<".concat(t," ").concat(Au(r),">").concat(i.map(xn).join(""),"</").concat(t,">")}function qi(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Tu=function(t,n){return function(r,a,i,o){return t.call(n,r,a,i,o)}},Rr=function(t,n,r,a){var i=Object.keys(t),o=i.length,s=a!==void 0?Tu(n,a):n,l,c,u;for(r===void 0?(l=1,u=t[i[0]]):(l=0,u=r);l<o;l++)c=i[l],u=s(u,t[c],c,t);return u};function Du(e){for(var t=[],n=0,r=e.length;n<r;){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=e.charCodeAt(n++);(i&64512)==56320?t.push(((a&1023)<<10)+(i&1023)+65536):(t.push(a),n--)}else t.push(a)}return t}function sa(e){var t=Du(e);return t.length===1?t[0].toString(16):null}function Ru(e,t){var n=e.length,r=e.charCodeAt(t),a;return r>=55296&&r<=56319&&n>t+1&&(a=e.charCodeAt(t+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Ji(e){return Object.keys(e).reduce(function(t,n){var r=e[n],a=!!r.icon;return a?t[r.iconName]=r.icon:t[n]=r,t},{})}function la(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Ji(t);typeof Me.hooks.addPack=="function"&&!a?Me.hooks.addPack(e,Ji(t)):Me.styles[e]=O(O({},Me.styles[e]||{}),i),e==="fas"&&la("fa",t)}var fn=Me.styles,Lu=Me.shims,Fu=Object.values(Is),Ya=null,Ls={},Fs={},$s={},zs={},js={},$u=Object.keys(Ha);function zu(e){return~bu.indexOf(e)}function ju(e,t){var n=t.split("-"),r=n[0],a=n.slice(1).join("-");return r===e&&a!==""&&!zu(a)?a:null}var Us=function(){var t=function(i){return Rr(fn,function(o,s,l){return o[l]=Rr(s,i,{}),o},{})};Ls=t(function(a,i,o){if(i[3]&&(a[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){a[l.toString(16)]=o})}return a}),Fs=t(function(a,i,o){if(a[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){a[l]=o})}return a}),js=t(function(a,i,o){var s=i[2];return a[o]=o,s.forEach(function(l){a[l]=o}),a});var n="far"in fn||S.autoFetchSvg,r=Rr(Lu,function(a,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:l}),a},{names:{},unicodes:{}});$s=r.names,zs=r.unicodes,Ya=_r(S.styleDefault)};Eu(function(e){Ya=_r(e.styleDefault)});Us();function Wa(e,t){return(Ls[e]||{})[t]}function Uu(e,t){return(Fs[e]||{})[t]}function $t(e,t){return(js[e]||{})[t]}function Hs(e){return $s[e]||{prefix:null,iconName:null}}function Hu(e){var t=zs[e],n=Wa("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function ht(){return Ya}var Va=function(){return{prefix:null,iconName:null,rest:[]}};function _r(e){var t=Ha[e],n=qn[e]||qn[t],r=e in Me.styles?e:null;return n||r||null}function xr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.skipLookups,r=n===void 0?!1:n,a=null,i=e.reduce(function(o,s){var l=ju(S.familyPrefix,s);if(fn[s]?(s=Fu.includes(s)?du[s]:s,a=s,o.prefix=s):$u.indexOf(s)>-1?(a=s,o.prefix=_r(s)):l?o.iconName=l:s!==S.replacementClass&&o.rest.push(s),!r&&o.prefix&&o.iconName){var c=a==="fa"?Hs(o.iconName):{},u=$t(o.prefix,o.iconName);c.prefix&&(a=null),o.iconName=c.iconName||u||o.iconName,o.prefix=c.prefix||o.prefix,o.prefix==="far"&&!fn.far&&fn.fas&&!S.autoFetchSvg&&(o.prefix="fas")}return o},Va());return(i.prefix==="fa"||a==="fa")&&(i.prefix=ht()||"fas"),i}var Bu=function(){function e(){Qc(this,e),this.definitions={}}return eu(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var o=a.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=O(O({},n.definitions[s]||{}),o[s]),la(s,o[s]);var l=Is[s];l&&la(l,o[s]),Us()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var o=a[i],s=o.prefix,l=o.iconName,c=o.icon,u=c[2];n[s]||(n[s]={}),u.length>0&&u.forEach(function(m){typeof m=="string"&&(n[s][m]=c)}),n[s][l]=c}),n}}]),e}(),Zi=[],zt={},Ht={},Ku=Object.keys(Ht);function Yu(e,t){var n=t.mixoutsTo;return Zi=e,zt={},Object.keys(Ht).forEach(function(r){Ku.indexOf(r)===-1&&delete Ht[r]}),Zi.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(o){typeof a[o]=="function"&&(n[o]=a[o]),Xn(a[o])==="object"&&Object.keys(a[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){zt[o]||(zt[o]=[]),zt[o].push(i[o])})}r.provides&&r.provides(Ht)}),n}function fa(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=zt[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function Nt(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=zt[e]||[];a.forEach(function(i){i.apply(null,n)})}function Ge(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Ht[e]?Ht[e].apply(null,t):void 0}function ca(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||ht();if(!!t)return t=$t(n,t)||t,qi(Bs.definitions,n,t)||qi(Me.styles,n,t)}var Bs=new Bu,Wu=function(){S.autoReplaceSvg=!1,S.observeMutations=!1,Nt("noAuto")},Vu={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Je?(Nt("beforeI2svg",t),Ge("pseudoElements2svg",t),Ge("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;S.autoReplaceSvg===!1&&(S.autoReplaceSvg=!0),S.observeMutations=!0,Su(function(){Xu({autoReplaceSvgRoot:n}),Nt("watch",t)})}},Gu={icon:function(t){if(t===null)return null;if(Xn(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:$t(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=_r(t[0]);return{prefix:r,iconName:$t(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(S.familyPrefix,"-"))>-1||t.match(mu))){var a=xr(t.split(" "),{skipLookups:!0});return{prefix:a.prefix||ht(),iconName:$t(a.prefix,a.iconName)||a.iconName}}if(typeof t=="string"){var i=ht();return{prefix:i,iconName:$t(i,t)||t}}}},we={noAuto:Wu,config:S,dom:Vu,parse:Gu,library:Bs,findIconDefinition:ca,toHtml:xn},Xu=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?ee:n;(Object.keys(Me.styles).length>0||S.autoFetchSvg)&&Je&&S.autoReplaceSvg&&we.dom.i2svg({node:r})};function wr(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return xn(r)})}}),Object.defineProperty(e,"node",{get:function(){if(!!Je){var r=ee.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function qu(e){var t=e.children,n=e.main,r=e.mask,a=e.attributes,i=e.styles,o=e.transform;if(Ka(o)&&n.found&&!r.found){var s=n.width,l=n.height,c={x:s/l/2,y:.5};a.style=yr(O(O({},i),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:a,children:t}]}function Ju(e){var t=e.prefix,n=e.iconName,r=e.children,a=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(S.familyPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:O(O({},a),{},{id:o}),children:r}]}]}function Ga(e){var t=e.icons,n=t.main,r=t.mask,a=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.title,c=e.maskId,u=e.titleId,m=e.extra,p=e.watchable,_=p===void 0?!1:p,N=r.found?r:n,F=N.width,T=N.height,y=a==="fak",A=[S.replacementClass,i?"".concat(S.familyPrefix,"-").concat(i):""].filter(function(te){return m.classes.indexOf(te)===-1}).filter(function(te){return te!==""||!!te}).concat(m.classes).join(" "),R={children:[],attributes:O(O({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:A,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(F," ").concat(T)})},j=y&&!~m.classes.indexOf("fa-fw")?{width:"".concat(F/T*16*.0625,"em")}:{};_&&(R.attributes[Ct]=""),l&&(R.children.push({tag:"title",attributes:{id:R.attributes["aria-labelledby"]||"title-".concat(u||bn())},children:[l]}),delete R.attributes.title);var z=O(O({},R),{},{prefix:a,iconName:i,main:n,mask:r,maskId:c,transform:o,symbol:s,styles:O(O({},j),m.styles)}),ae=r.found&&n.found?Ge("generateAbstractMask",z)||{children:[],attributes:{}}:Ge("generateAbstractIcon",z)||{children:[],attributes:{}},U=ae.children,H=ae.attributes;return z.children=U,z.attributes=H,s?Ju(z):qu(z)}function Qi(e){var t=e.content,n=e.width,r=e.height,a=e.transform,i=e.title,o=e.extra,s=e.watchable,l=s===void 0?!1:s,c=O(O(O({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(c[Ct]="");var u=O({},o.styles);Ka(a)&&(u.transform=Nu({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var m=yr(u);m.length>0&&(c.style=m);var p=[];return p.push({tag:"span",attributes:c,children:[t]}),i&&p.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),p}function Zu(e){var t=e.content,n=e.title,r=e.extra,a=O(O(O({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=yr(r.styles);i.length>0&&(a.style=i);var o=[];return o.push({tag:"span",attributes:a,children:[t]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var Lr=Me.styles;function ua(e){var t=e[0],n=e[1],r=e.slice(4),a=$a(r,1),i=a[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(S.familyPrefix,"-").concat(wt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(S.familyPrefix,"-").concat(wt.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(S.familyPrefix,"-").concat(wt.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:n,icon:o}}var Qu={found:!1,width:512,height:512};function ed(e,t){!Ns&&!S.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function da(e,t){var n=t;return t==="fa"&&S.styleDefault!==null&&(t=ht()),new Promise(function(r,a){if(Ge("missingIconAbstract"),n==="fa"){var i=Hs(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Lr[t]&&Lr[t][e]){var o=Lr[t][e];return r(ua(o))}ed(e,t),r(O(O({},Qu),{},{icon:S.showMissingIcons&&e?Ge("missingIconAbstract")||{}:{}}))})}var eo=function(){},ma=S.measurePerformance&&Pn&&Pn.mark&&Pn.measure?Pn:{mark:eo,measure:eo},nn='FA "6.1.2"',td=function(t){return ma.mark("".concat(nn," ").concat(t," begins")),function(){return Ks(t)}},Ks=function(t){ma.mark("".concat(nn," ").concat(t," ends")),ma.measure("".concat(nn," ").concat(t),"".concat(nn," ").concat(t," begins"),"".concat(nn," ").concat(t," ends"))},Xa={begin:td,end:Ks},zn=function(){};function to(e){var t=e.getAttribute?e.getAttribute(Ct):null;return typeof t=="string"}function nd(e){var t=e.getAttribute?e.getAttribute(ja):null,n=e.getAttribute?e.getAttribute(Ua):null;return t&&n}function rd(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(S.replacementClass)}function ad(){if(S.autoReplaceSvg===!0)return jn.replace;var e=jn[S.autoReplaceSvg];return e||jn.replace}function id(e){return ee.createElementNS("http://www.w3.org/2000/svg",e)}function od(e){return ee.createElement(e)}function Ys(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?id:od:n;if(typeof e=="string")return ee.createTextNode(e);var a=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){a.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){a.appendChild(Ys(o,{ceFn:r}))}),a}function sd(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var jn={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(a){n.parentNode.insertBefore(Ys(a),n)}),n.getAttribute(Ct)===null&&S.keepOriginalSource){var r=ee.createComment(sd(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~Ba(n).indexOf(S.replacementClass))return jn.replace(t);var a=new RegExp("".concat(S.familyPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===S.replacementClass||l.match(a)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return xn(s)}).join(`
`);n.setAttribute(Ct,""),n.innerHTML=o}};function no(e){e()}function Ws(e,t){var n=typeof t=="function"?t:zn;if(e.length===0)n();else{var r=no;S.mutateApproach===cu&&(r=mt.requestAnimationFrame||no),r(function(){var a=ad(),i=Xa.begin("mutate");e.map(a),i(),n()})}}var qa=!1;function Vs(){qa=!0}function ha(){qa=!1}var Zn=null;function ro(e){if(!!Vi&&!!S.observeMutations){var t=e.treeCallback,n=t===void 0?zn:t,r=e.nodeCallback,a=r===void 0?zn:r,i=e.pseudoElementsCallback,o=i===void 0?zn:i,s=e.observeMutationsRoot,l=s===void 0?ee:s;Zn=new Vi(function(c){if(!qa){var u=ht();Xt(c).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!to(m.addedNodes[0])&&(S.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&S.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&to(m.target)&&~vu.indexOf(m.attributeName))if(m.attributeName==="class"&&nd(m.target)){var p=xr(Ba(m.target)),_=p.prefix,N=p.iconName;m.target.setAttribute(ja,_||u),N&&m.target.setAttribute(Ua,N)}else rd(m.target)&&a(m.target)})}}),Je&&Zn.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ld(){!Zn||Zn.disconnect()}function fd(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,a){var i=a.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),n}function cd(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",a=xr(Ba(e));return a.prefix||(a.prefix=ht()),t&&n&&(a.prefix=t,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=Uu(a.prefix,e.innerText)||Wa(a.prefix,sa(e.innerText))),!a.iconName&&S.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=e.firstChild.data)),a}function ud(e){var t=Xt(e.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return S.autoA11y&&(n?t["aria-labelledby"]="".concat(S.replacementClass,"-title-").concat(r||bn()):(t["aria-hidden"]="true",t.focusable="false")),t}function dd(){return{iconName:null,title:null,titleId:null,prefix:null,transform:$e,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ao(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=cd(e),r=n.iconName,a=n.prefix,i=n.rest,o=ud(e),s=fa("parseNodeAttributes",{},e),l=t.styleParser?fd(e):[];return O({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:$e,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var md=Me.styles;function Gs(e){var t=S.autoReplaceSvg==="nest"?ao(e,{styleParser:!1}):ao(e);return~t.extra.classes.indexOf(Ps)?Ge("generateLayersText",e,t):Ge("generateSvgReplacementMutation",e,t)}function io(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Je)return Promise.resolve();var n=ee.documentElement.classList,r=function(m){return n.add("".concat(Gi,"-").concat(m))},a=function(m){return n.remove("".concat(Gi,"-").concat(m))},i=S.autoFetchSvg?Object.keys(Ha):Object.keys(md);i.includes("fa")||i.push("fa");var o=[".".concat(Ps,":not([").concat(Ct,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(Ct,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Xt(e.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),a("complete");else return Promise.resolve();var l=Xa.begin("onTree"),c=s.reduce(function(u,m){try{var p=Gs(m);p&&u.push(p)}catch(_){Ns||_.name==="MissingIcon"&&console.error(_)}return u},[]);return new Promise(function(u,m){Promise.all(c).then(function(p){Ws(p,function(){r("active"),r("complete"),a("pending"),typeof t=="function"&&t(),l(),u()})}).catch(function(p){l(),m(p)})})}function hd(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Gs(e).then(function(n){n&&Ws([n],t)})}function pd(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:ca(t||{}),a=n.mask;return a&&(a=(a||{}).icon?a:ca(a||{})),e(r,O(O({},n),{},{mask:a}))}}var gd=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?$e:r,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,c=n.maskId,u=c===void 0?null:c,m=n.title,p=m===void 0?null:m,_=n.titleId,N=_===void 0?null:_,F=n.classes,T=F===void 0?[]:F,y=n.attributes,A=y===void 0?{}:y,R=n.styles,j=R===void 0?{}:R;if(!!t){var z=t.prefix,ae=t.iconName,U=t.icon;return wr(O({type:"icon"},t),function(){return Nt("beforeDOMElementCreation",{iconDefinition:t,params:n}),S.autoA11y&&(p?A["aria-labelledby"]="".concat(S.replacementClass,"-title-").concat(N||bn()):(A["aria-hidden"]="true",A.focusable="false")),Ga({icons:{main:ua(U),mask:l?ua(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:z,iconName:ae,transform:O(O({},$e),a),symbol:o,title:p,maskId:u,titleId:N,extra:{attributes:A,styles:j,classes:T}})})}},vd={mixout:function(){return{icon:pd(gd)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=io,n.nodeCallback=hd,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,a=r===void 0?ee:r,i=n.callback,o=i===void 0?function(){}:i;return io(a,o)},t.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,o=r.titleId,s=r.prefix,l=r.transform,c=r.symbol,u=r.mask,m=r.maskId,p=r.extra;return new Promise(function(_,N){Promise.all([da(a,s),u.iconName?da(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(F){var T=$a(F,2),y=T[0],A=T[1];_([n,Ga({icons:{main:y,mask:A},prefix:s,iconName:a,transform:l,symbol:c,maskId:m,title:i,titleId:o,extra:p,watchable:!0})])}).catch(N)})},t.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.transform,s=n.styles,l=yr(s);l.length>0&&(a.style=l);var c;return Ka(o)&&(c=Ge("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(c||i.icon),{children:r,attributes:a}}}},bd={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return wr({type:"layer"},function(){Nt("beforeDOMElementCreation",{assembler:n,params:r});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(S.familyPrefix,"-layers")].concat(br(i)).join(" ")},children:o}]})}}}},yd={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,o=r.classes,s=o===void 0?[]:o,l=r.attributes,c=l===void 0?{}:l,u=r.styles,m=u===void 0?{}:u;return wr({type:"counter",content:n},function(){return Nt("beforeDOMElementCreation",{content:n,params:r}),Zu({content:n.toString(),title:i,extra:{attributes:c,styles:m,classes:["".concat(S.familyPrefix,"-layers-counter")].concat(br(s))}})})}}}},_d={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?$e:a,o=r.title,s=o===void 0?null:o,l=r.classes,c=l===void 0?[]:l,u=r.attributes,m=u===void 0?{}:u,p=r.styles,_=p===void 0?{}:p;return wr({type:"text",content:n},function(){return Nt("beforeDOMElementCreation",{content:n,params:r}),Qi({content:n,transform:O(O({},$e),i),title:s,extra:{attributes:m,styles:_,classes:["".concat(S.familyPrefix,"-layers-text")].concat(br(c))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var a=r.title,i=r.transform,o=r.extra,s=null,l=null;if(Os){var c=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();s=u.width/c,l=u.height/c}return S.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,Qi({content:n.innerHTML,width:s,height:l,transform:i,title:a,extra:o,watchable:!0})])}}},xd=new RegExp('"',"ug"),oo=[1105920,1112319];function wd(e){var t=e.replace(xd,""),n=Ru(t,0),r=n>=oo[0]&&n<=oo[1],a=t.length===2?t[0]===t[1]:!1;return{value:sa(a?t[0]:t),isSecondary:r||a}}function so(e,t){var n="".concat(fu).concat(t.replace(":","-"));return new Promise(function(r,a){if(e.getAttribute(n)!==null)return r();var i=Xt(e.children),o=i.filter(function(ae){return ae.getAttribute(oa)===t})[0],s=mt.getComputedStyle(e,t),l=s.getPropertyValue("font-family").match(hu),c=s.getPropertyValue("font-weight"),u=s.getPropertyValue("content");if(o&&!l)return e.removeChild(o),r();if(l&&u!=="none"&&u!==""){var m=s.getPropertyValue("content"),p=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?qn[l[2].toLowerCase()]:pu[c],_=wd(m),N=_.value,F=_.isSecondary,T=l[0].startsWith("FontAwesome"),y=Wa(p,N),A=y;if(T){var R=Hu(N);R.iconName&&R.prefix&&(y=R.iconName,p=R.prefix)}if(y&&!F&&(!o||o.getAttribute(ja)!==p||o.getAttribute(Ua)!==A)){e.setAttribute(n,A),o&&e.removeChild(o);var j=dd(),z=j.extra;z.attributes[oa]=t,da(y,p).then(function(ae){var U=Ga(O(O({},j),{},{icons:{main:ae,mask:Va()},prefix:p,iconName:A,extra:z,watchable:!0})),H=ee.createElement("svg");t==="::before"?e.insertBefore(H,e.firstChild):e.appendChild(H),H.outerHTML=U.map(function(te){return xn(te)}).join(`
`),e.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Ed(e){return Promise.all([so(e,"::before"),so(e,"::after")])}function kd(e){return e.parentNode!==document.head&&!~uu.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(oa)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function lo(e){if(!!Je)return new Promise(function(t,n){var r=Xt(e.querySelectorAll("*")).filter(kd).map(Ed),a=Xa.begin("searchPseudoElements");Vs(),Promise.all(r).then(function(){a(),ha(),t()}).catch(function(){a(),ha(),n()})})}var Od={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=lo,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?ee:r;S.searchPseudoElements&&lo(a)}}},fo=!1,Ad={mixout:function(){return{dom:{unwatch:function(){Vs(),fo=!0}}}},hooks:function(){return{bootstrap:function(){ro(fa("mutationObserverCallbacks",{}))},noAuto:function(){ld()},watch:function(n){var r=n.observeMutationsRoot;fo?ha():ro(fa("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},co=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},n)},Cd={mixout:function(){return{parse:{transform:function(n){return co(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=co(a)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(l," ").concat(c," ").concat(u)},p={transform:"translate(".concat(o/2*-1," -256)")},_={outer:s,inner:m,path:p};return{tag:"g",attributes:O({},_.outer),children:[{tag:"g",attributes:O({},_.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:O(O({},r.icon.attributes),_.path)}]}]}}}},Fr={x:0,y:0,width:"100%",height:"100%"};function uo(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Nd(e){return e.tag==="g"?e.children:[e]}var Id={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?xr(a.split(" ").map(function(o){return o.trim()})):Va();return i.prefix||(i.prefix=ht()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,c=i.width,u=i.icon,m=o.width,p=o.icon,_=Cu({transform:l,containerWidth:m,iconWidth:c}),N={tag:"rect",attributes:O(O({},Fr),{},{fill:"white"})},F=u.children?{children:u.children.map(uo)}:{},T={tag:"g",attributes:O({},_.inner),children:[uo(O({tag:u.tag,attributes:O(O({},u.attributes),_.path)},F))]},y={tag:"g",attributes:O({},_.outer),children:[T]},A="mask-".concat(s||bn()),R="clip-".concat(s||bn()),j={tag:"mask",attributes:O(O({},Fr),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[N,y]},z={tag:"defs",children:[{tag:"clipPath",attributes:{id:R},children:Nd(p)},j]};return r.push(z,{tag:"rect",attributes:O({fill:"currentColor","clip-path":"url(#".concat(R,")"),mask:"url(#".concat(A,")")},Fr)}),{children:r,attributes:a}}}},Pd={provides:function(t){var n=!1;mt.matchMedia&&(n=mt.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:O(O({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=O(O({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:O(O({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:O(O({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:O(O({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:O(O({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:O(O({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:O(O({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:O(O({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Md={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},Sd=[Pu,vd,bd,yd,_d,Od,Ad,Cd,Id,Pd,Md];Yu(Sd,{mixoutsTo:we});we.noAuto;var Xs=we.config,Er=we.library;we.dom;var Qn=we.parse;we.findIconDefinition;we.toHtml;var Td=we.icon;we.layer;var Dd=we.text;we.counter;function mo(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function Ie(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?mo(Object(n),!0).forEach(function(r){pe(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):mo(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function er(e){return er=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},er(e)}function pe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Rd(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,i;for(i=0;i<r.length;i++)a=r[i],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Ld(e,t){if(e==null)return{};var n=Rd(e,t),r,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}function pa(e){return Fd(e)||$d(e)||zd(e)||jd()}function Fd(e){if(Array.isArray(e))return ga(e)}function $d(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function zd(e,t){if(!!e){if(typeof e=="string")return ga(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ga(e,t)}}function ga(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function jd(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ud=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},qs={exports:{}};(function(e){(function(t){var n=function(y,A,R){if(!c(A)||m(A)||p(A)||_(A)||l(A))return A;var j,z=0,ae=0;if(u(A))for(j=[],ae=A.length;z<ae;z++)j.push(n(y,A[z],R));else{j={};for(var U in A)Object.prototype.hasOwnProperty.call(A,U)&&(j[y(U,R)]=n(y,A[U],R))}return j},r=function(y,A){A=A||{};var R=A.separator||"_",j=A.split||/(?=[A-Z])/;return y.split(j).join(R)},a=function(y){return N(y)?y:(y=y.replace(/[\-_\s]+(.)?/g,function(A,R){return R?R.toUpperCase():""}),y.substr(0,1).toLowerCase()+y.substr(1))},i=function(y){var A=a(y);return A.substr(0,1).toUpperCase()+A.substr(1)},o=function(y,A){return r(y,A).toLowerCase()},s=Object.prototype.toString,l=function(y){return typeof y=="function"},c=function(y){return y===Object(y)},u=function(y){return s.call(y)=="[object Array]"},m=function(y){return s.call(y)=="[object Date]"},p=function(y){return s.call(y)=="[object RegExp]"},_=function(y){return s.call(y)=="[object Boolean]"},N=function(y){return y=y-0,y===y},F=function(y,A){var R=A&&"process"in A?A.process:A;return typeof R!="function"?y:function(j,z){return R(j,y,z)}},T={camelize:a,decamelize:o,pascalize:i,depascalize:o,camelizeKeys:function(y,A){return n(F(a,A),y)},decamelizeKeys:function(y,A){return n(F(o,A),y,A)},pascalizeKeys:function(y,A){return n(F(i,A),y)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=T:t.humps=T})(Ud)})(qs);var Hd=qs.exports,Bd=["class","style"];function Kd(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var r=n.indexOf(":"),a=Hd.camelize(n.slice(0,r)),i=n.slice(r+1).trim();return t[a]=i,t},{})}function Yd(e){return e.split(/\s+/).reduce(function(t,n){return t[n]=!0,t},{})}function Ja(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(l){return Ja(l)}),a=Object.keys(e.attributes||{}).reduce(function(l,c){var u=e.attributes[c];switch(c){case"class":l.class=Yd(u);break;case"style":l.style=Kd(u);break;default:l.attrs[c]=u}return l},{attrs:{},class:{},style:{}});n.class;var i=n.style,o=i===void 0?{}:i,s=Ld(n,Bd);return ms(e.tag,Ie(Ie(Ie({},t),{},{class:a.class,style:Ie(Ie({},a.style),o)},a.attrs),s),r)}var Js=!1;try{Js=!0}catch{}function Wd(){if(!Js&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function cn(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?pe({},e,t):{}}function Vd(e){var t,n=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},pe(t,"fa-".concat(e.size),e.size!==null),pe(t,"fa-rotate-".concat(e.rotation),e.rotation!==null),pe(t,"fa-pull-".concat(e.pull),e.pull!==null),pe(t,"fa-swap-opacity",e.swapOpacity),pe(t,"fa-bounce",e.bounce),pe(t,"fa-shake",e.shake),pe(t,"fa-beat",e.beat),pe(t,"fa-fade",e.fade),pe(t,"fa-beat-fade",e.beatFade),pe(t,"fa-flash",e.flash),pe(t,"fa-spin-pulse",e.spinPulse),pe(t,"fa-spin-reverse",e.spinReverse),t);return Object.keys(n).map(function(r){return n[r]?r:null}).filter(function(r){return r})}function ho(e){if(e&&er(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(Qn.icon)return Qn.icon(e);if(e===null)return null;if(er(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var Gd=Xe({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(t,n){var r=n.attrs,a=J(function(){return ho(t.icon)}),i=J(function(){return cn("classes",Vd(t))}),o=J(function(){return cn("transform",typeof t.transform=="string"?Qn.transform(t.transform):t.transform)}),s=J(function(){return cn("mask",ho(t.mask))}),l=J(function(){return Td(a.value,Ie(Ie(Ie(Ie({},i.value),o.value),s.value),{},{symbol:t.symbol,title:t.title}))});Ke(l,function(u){if(!u)return Wd("Could not find one or more icon(s)",a.value,s.value)},{immediate:!0});var c=J(function(){return l.value?Ja(l.value.abstract[0],{},r):null});return function(){return c.value}}});Xe({name:"FontAwesomeLayers",props:{fixedWidth:{type:Boolean,default:!1}},setup:function(t,n){var r=n.slots,a=Xs.familyPrefix,i=J(function(){return["".concat(a,"-layers")].concat(pa(t.fixedWidth?["".concat(a,"-fw")]:[]))});return function(){return ms("div",{class:i.value},r.default?r.default():[])}}});Xe({name:"FontAwesomeLayersText",props:{value:{type:[String,Number],default:""},transform:{type:[String,Object],default:null},counter:{type:Boolean,default:!1},position:{type:String,default:null,validator:function(t){return["bottom-left","bottom-right","top-left","top-right"].indexOf(t)>-1}}},setup:function(t,n){var r=n.attrs,a=Xs.familyPrefix,i=J(function(){return cn("classes",[].concat(pa(t.counter?["".concat(a,"-layers-counter")]:[]),pa(t.position?["".concat(a,"-layers-").concat(t.position)]:[])))}),o=J(function(){return cn("transform",typeof t.transform=="string"?Qn.transform(t.transform):t.transform)}),s=J(function(){var c=Dd(t.value.toString(),Ie(Ie({},o.value),i.value)),u=c.abstract;return t.counter&&(u[0].attributes.class=u[0].attributes.class.replace("fa-layers-text","")),u[0]}),l=J(function(){return Ja(s.value,{},r)});return function(){return l.value}}});/*!
 * Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */var Xd={prefix:"fas",iconName:"angle-down",icon:[384,512,[8964],"f107","M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"]},qd={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"]},Jd={prefix:"fas",iconName:"xmark",icon:[320,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"]};/*!
 * Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */var Zd={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]};const Zs=_s("settings",{state:()=>({lang:"en",theme:{name:"green",size:32},board:{level:"easy"}}),getters:{},actions:{changeLang(e){this.lang=e},changeTheme(e,t){this.theme={name:e,size:t}},changeLevel(e){this.board.level=e},changeWidth(e){this.board.width=e},changeHeight(e){this.board.height=e},changeMines(e){this.board.mines=e}}}),_e={READY:1,RUNNING:2,CLEARED:4,GAMEOVER:8},Qs={..._e,ENABLED:_e.READY|_e.RUNNING},lt={READY:"ready",RUNNING:"running",STOPPED:"stopped"},Qd={en:{remain1:"",remain2:"mines",timer1:"time: ",timer2:"",retry:"Retry",cleared:"Cleared!"},ja:{remain1:"\u3042\u3068",remain2:"\u500B",timer1:"",timer2:"\u79D2\u7D4C\u904E",retry:"\u3082\u3046\u4E00\u56DE\uFF1F",cleared:"\u30AF\u30EA\u30A2\uFF01"}},em=e=>Qd[e],Et=()=>{},tm=(e,t)=>Array.from({length:e},(n,r)=>t(r)),nm=(e,t,n)=>Array.from({length:t},(r,a)=>Array.from({length:e},(i,o)=>n(a,o))),$r=e=>Number.isNaN(parseInt(e,10))?void 0:Number(e),rm={HIDDEN:1,MINE:2,MARKED:4,OPEN_EXPLODED:8,HID_PRESSED:256,HID_PENDING:512},W={...rm,MAIN:7,OPEN_HINT:240},rt={HIDDEN:0,MARKED:1,PENDING:2,PRESSED:3,OPEN:3,MINE:12,EXPLOSION:13,MISTAKE:14},fe={NONE:0,OPENED:1,EXPLODED:2,MARKED:4,UNMARKED:8},am=()=>W.HIDDEN,im=e=>e|W.MINE,kr=e=>e|W.HID_PRESSED,wn=e=>e&~W.HID_PRESSED,om=e=>e&W.HIDDEN?e&W.MARKED?[e&~W.MARKED|W.HID_PENDING,fe.UNMARKED]:e&W.HID_PENDING?[e&~W.HID_PENDING,fe.NONE]:[e|W.MARKED,fe.MARKED]:[e,fe.NONE],sm=e=>e&~W.HID_PENDING|W.MARKED,el=(e,t=!0)=>{if(!(e&W.HIDDEN))return[e,fe.NONE];if(e&W.MARKED&&t)return[e,fe.NONE];let n=e&~W.HIDDEN;return n&W.MINE?(t&&(n|=W.OPEN_EXPLODED),[n,fe.EXPLODED]):[n,fe.OPENED]},lm=(e,t)=>e&~W.OPEN_HINT|t<<4,tl=e=>e&W.MAIN?-1:(e&W.OPEN_HINT)>>4,fm=e=>(e&W.HIDDEN)>0,cm=e=>e&W.MARKED?(e&W.MAIN)===W.MARKED?rt.MISTAKE:rt.MARKED:e&W.HIDDEN?e&W.HID_PRESSED?rt.PRESSED:e&W.HID_PENDING?rt.PENDING:rt.HIDDEN:e&W.MINE?e&W.OPEN_EXPLODED?rt.EXPLOSION:rt.MINE:rt.OPEN+tl(e),um={min:9,max:30,default:9},dm={min:9,max:24,default:9},mm=e=>{const t=10+(e/45|0);return{min:10,max:Math.floor(e*.94-8.45),default:Math.round(e*t*.001)*10}},zr=(e,t)=>e===void 0?t.default:Math.min(Math.max(e,t.min),t.max),hm=e=>{const t=zr(e.width,um),n=zr(e.height,dm),r=zr(e.mines,mm(t*n));return{width:t,height:n,mines:r}},pm={easy:{width:9,height:9,mines:10},medium:{width:16,height:16,mines:40},hard:{width:30,height:16,mines:99}},gm=e=>e.level==="custom"?hm(e):pm[e.level],Ze=e=>(e.status&Qs.ENABLED)>0,Za=(e,t,n)=>fm(e.grid[t][n]),nl=(e,t,n,r)=>r.map(([a,i])=>[t+a,n+i]).filter(([a,i])=>e.grid[a]&&e.grid[a][i]),rl=(e,t,n)=>nl(e,t,n,[[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]]),En=(e,t,n)=>nl(e,t,n,[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]]),vm=(e,t,n)=>{e.minePos={};const r=e.width;let a=r*e.height;const i=tm(a,s=>s),o=En(e,t,n).map(([s,l])=>s*r+l).reverse();for(let s=0;s<o.length&&a>0;s++){const l=o[s];a-=1,[i[l],i[a]]=[i[a],i[l]]}for(let s=0;s<e.mines&&a>0;s++){const l=Math.floor(Math.random()*a),c=i[l],[u,m]=[c/r|0,c%r];e.grid[u][m]=im(e.grid[u][m]);const p=[u,m];e.minePos[p.toString()]=p,a-=1,[i[l],i[a]]=[i[a],i[l]]}},bm=(e,t,n)=>{vm(e,t,n),e.status=_e.RUNNING},ym=(e,t,n)=>{const[r,a]=om(e.grid[t][n]);if(e.grid[t][n]=r,a===fe.NONE)return;const i=[t,n],o=i.toString();a===fe.MARKED&&(e.markPos[o]=i),a===fe.UNMARKED&&delete e.markPos[o]},_m=(e,t,n)=>{const r=rl(e,t,n),a=r.filter(i=>e.minePos[i.toString()]).length;return e.grid[t][n]=lm(e.grid[t][n],a),a>0?[]:r},Qa=(e,t,n)=>{const[r,a]=el(e.grid[t][n]);return e.grid[t][n]=r,a===fe.OPENED&&(e.countDown-=1,_m(e,t,n).forEach(([i,o])=>Qa(e,i,o))),a},xm=(e,t,n)=>{const r=tl(e.grid[t][n]);if(r<0)return fe.NONE;const a=rl(e,t,n);return a.filter(o=>e.markPos[o.toString()]).length!==r?fe.NONE:a.map(([o,s])=>Qa(e,o,s)).reduce((o,s)=>o|s,fe.NONE)},al=e=>{e.status=_e.CLEARED,Object.entries(e.minePos).forEach(([t,n])=>{const[r,a]=n;e.markPos[t]=n,e.grid[r][a]=sm(e.grid[r][a])})},il=e=>{e.status=_e.GAMEOVER;const t={...e.minePos,...e.markPos};Object.values(t).forEach(([n,r])=>{[e.grid[n][r]]=el(e.grid[n][r],!1)})},ol=({width:e,height:t,mines:n})=>({status:_e.READY,grid:nm(e,t,am),minePos:{},markPos:{},countDown:e*t-n}),ei=e=>{const t=gm(e);return{...t,...ol(t)}},sl=(e,t)=>{Object.assign(e,ei(t))},ll=e=>{Object.assign(e,ol(e))},fl=(e,t,n)=>{!Ze(e)||(e.grid[t][n]=kr(e.grid[t][n]))},wm=(e,t,n)=>{!Ze(e)||(e.grid[t][n]=kr(e.grid[t][n]))},Em=(e,t,n)=>{!Ze(e)||(e.grid[t][n]=wn(e.grid[t][n]))},cl=(e,t,n)=>{if(!Ze(e))return;e.grid[t][n]=wn(e.grid[t][n]),e.status===_e.READY&&bm(e,t,n),Qa(e,t,n)===fe.EXPLODED?il(e):e.countDown<=0&&al(e)},ul=(e,t,n)=>{!Ze(e)||(e.grid[t][n]=wn(e.grid[t][n]),ym(e,t,n))},km=Et,Om=Et,Am=Et,dl=(e,t,n)=>{!Ze(e)||En(e,t,n).forEach(([r,a])=>{e.grid[r][a]=kr(e.grid[r][a])})},Cm=(e,t,n)=>{!Ze(e)||En(e,t,n).forEach(([r,a])=>{e.grid[r][a]=kr(e.grid[r][a])})},Nm=(e,t,n)=>{!Ze(e)||En(e,t,n).forEach(([r,a])=>{e.grid[r][a]=wn(e.grid[r][a])})},ti=(e,t,n)=>{if(!Ze(e))return;En(e,t,n).forEach(([a,i])=>{e.grid[a][i]=wn(e.grid[a][i])}),xm(e,t,n)&fe.EXPLODED?il(e):e.countDown<=0&&al(e)},ml=(e,t,n)=>{Za(e,t,n)?fl(e,t,n):dl(e,t,n)},hl=(e,t,n)=>{Za(e,t,n)?cl(e,t,n):ti(e,t,n)},pl=(e,t,n)=>{Za(e,t,n)?ul(e,t,n):ti(e,t,n)},Im=Object.freeze(Object.defineProperty({__proto__:null,initAll:ei,resetAll:sl,resetBoard:ll,handleLeftMouseDown:fl,handleLeftMouseOver:wm,handleLeftMouseOut:Em,handleLeftMouseUp:cl,handleRightMouseDown:ul,handleRightMouseOver:km,handleRightMouseOut:Om,handleRightMouseUp:Am,handleBothMouseDown:dl,handleBothMouseOver:Cm,handleBothMouseOut:Nm,handleBothMouseUp:ti,handleTouchStart:ml,handleTouchEnd:hl,handleLongPress:pl},Symbol.toStringTag,{value:"Module"})),Mn={MOUSE_DOWN:0,MOUSE_UP:1,MOUSE_OVER:2,MOUSE_OUT:3},po={LEFT:0,RIGHT:2},go={LEFT:1,RIGHT:2},Pm={[po.LEFT]:go.LEFT,[po.RIGHT]:go.RIGHT},Mm=e=>[[Et,e.handleLeftMouseDown,e.handleRightMouseDown,e.handleBothMouseDown],[Et,e.handleLeftMouseUp,e.handleRightMouseUp,e.handleBothMouseUp],[Et,e.handleLeftMouseOver,e.handleRightMouseOver,e.handleBothMouseOver],[Et,e.handleLeftMouseOut,e.handleRightMouseOut,e.handleBothMouseOut]],Sm=e=>({dispatch:Mm(e),initState(){return{pressed:0}},handleMouseDown(t,n,r,a){t.pressed|=Pm[n],this.dispatch[Mn.MOUSE_DOWN][t.pressed](t,r,a)},handleMouseUp(t,n,r){if(t.pressed===0)return;const a=t.pressed;t.pressed=0,this.dispatch[Mn.MOUSE_UP][a](t,n,r)},handleMouseOver(t,n,r){t.pressed!==0&&this.dispatch[Mn.MOUSE_OVER][t.pressed](t,n,r)},handleMouseOut(t,n,r){t.pressed!==0&&this.dispatch[Mn.MOUSE_OUT][t.pressed](t,n,r)}}),Qt=Sm(Im),ni=_s("game",{state:()=>({theme:{name:"green",size:32},...ei({level:"easy"}),...Qt.initState(),touch:!1}),getters:{remain:e=>e.mines-Object.keys(e.markPos).length},actions:{changeTheme(e){this.theme=e},changeSize(e){sl(this,e)},restart(){ll(this)},mouseDown({button:e,row:t,col:n}){Qt.handleMouseDown(this,e,t,n)},mouseUp({row:e,col:t}){Qt.handleMouseUp(this,e,t)},mouseOver({row:e,col:t}){Qt.handleMouseOver(this,e,t)},mouseOut({row:e,col:t}){Qt.handleMouseOut(this,e,t)},touchStart({row:e,col:t}){this.touch=!0,ml(this,e,t)},touchEnd({row:e,col:t}){this.touch=!1,hl(this,e,t)},longPress({row:e,col:t}){this.touch=!1,pl(this,e,t)}}}),Tm={ms:1,s:1e3},Dm=Xe({__name:"MsTimer",props:{interval:null,limit:null,mode:null},setup(e){const t=e,n=_n(0),r=J(()=>t.mode!==lt.RUNNING||t.limit<=0||n.value<t.limit?t.mode:lt.STOPPED),a=J(()=>{const o=/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec(t.interval.trim())||[],s=o[1]&&parseFloat(o[1])||1e3,l=o[2]&&Tm[o[2]]||1;return s*l}),i={intervalId:0,start(o,s){this.intervalId=window.setInterval(o,s)},stop(){this.intervalId>0&&(window.clearInterval(this.intervalId),this.intervalId=0)}};return Ke(()=>r.value,()=>{i.stop(),r.value===lt.READY?n.value=0:r.value===lt.RUNNING&&i.start(()=>{n.value+=1},a.value)}),(o,s)=>(ve(),Ne("span",null,at(n.value),1))}}),Rm=["onTouchstart"],Rt={},Lm=Xe({__name:"MsCell",props:{row:null,col:null,value:null},setup(e){const t=e;zc(_=>({a2b3bdba:ie(i)}));const n=ni(),r=_n(!1),a=J(()=>{const{name:_,size:N}=n.theme;return`${_}-${N}`.toLowerCase()}),i=J(()=>{const{size:_}=n.theme;Rt[_]||(Rt[_]={});const N=t.value;if(Rt[_][N]===void 0){const F=cm(N),T=-_*(F%3),y=-_*(F/3|0);Rt[_][N]=`${T}px ${y}px`}return Rt[_][N]}),o={timeoutId:0,start(_,N){this.timeoutId=window.setTimeout(_,N)},stop(){this.timeoutId>0&&(window.clearTimeout(this.timeoutId),this.timeoutId=0)}},s=_=>{n.mouseDown({button:_.button,...t})},l=()=>n.mouseUp(t),c=()=>n.mouseOver(t),u=()=>n.mouseOut(t),m=()=>{n.touchStart(t),r.value=!0},p=()=>{!r.value||(r.value=!1,n.touchEnd(t))};return Ke(()=>r.value,()=>{o.stop(),r.value&&o.start(()=>{r.value=!1,n.longPress(t)},300)}),(_,N)=>(ve(),Ne("span",{class:tr(["cell value",ie(a)]),onMousedown:s,onMouseup:l,onMouseover:c,onMouseout:u,onTouchstart:ps(m,["prevent"]),onTouchend:p},null,42,Rm))}});const ri=(e,t)=>{const n=e.__vccOpts||e;for(const[r,a]of t)n[r]=a;return n},Fm=ri(Lm,[["__scopeId","data-v-7f24b7e5"]]),$m=e=>(Vo("data-v-b2c6a2fa"),e=e(),Go(),e),zm={class:"board"},jm={class:"cells"},Um=$m(()=>I("br",null,null,-1)),Hm={key:0,class:"cells-overlay"},Bm=Xe({__name:"MsBoard",setup(e){const t=ni(),n=J(()=>(t.status&Qs.ENABLED)>0&&t.touch);return(r,a)=>(ve(),Ne("div",zm,[I("div",jm,[(ve(!0),Ne(de,null,xi(ie(t).grid,(i,o)=>(ve(),Ne(de,{key:o},[(ve(!0),Ne(de,null,xi(i,(s,l)=>(ve(),Da(Fm,{key:`${o}_${l}`,row:o,col:l,value:s},null,8,["row","col","value"]))),128)),Um],64))),128))]),ie(n)?(ve(),Ne("div",Hm)):Ra("",!0)]))}});const Km=ri(Bm,[["__scopeId","data-v-b2c6a2fa"]]),Or=e=>(Vo("data-v-7c8be18c"),e=e(),Go(),e),Ym={class:"text-box"},Wm=Or(()=>I("span",{class:"space"},null,-1)),Vm=Or(()=>I("span",{class:"space"},null,-1)),Gm=Or(()=>I("br",null,null,-1)),Xm=Or(()=>I("p",null,null,-1)),qm={[_e.READY]:lt.READY,[_e.RUNNING]:lt.RUNNING,[_e.CLEARED]:lt.STOPPED,[_e.GAMEOVER]:lt.STOPPED},Jm=Xe({__name:"MsGame",props:{settings:null},setup(e){const t=e,n=ni(),r=J(()=>em(t.settings.lang)),a=J(()=>qm[n.status]),i=J(()=>n.status===_e.CLEARED?r.value.cleared:""),o=()=>n.restart();return Ma(()=>{n.changeTheme(t.settings.theme),n.changeSize(t.settings.board)}),Ke(()=>t.settings.theme,()=>{n.changeTheme(t.settings.theme)},{deep:!0}),Ke(()=>t.settings.board,()=>{n.changeSize(t.settings.board)},{deep:!0}),(s,l)=>(ve(),Ne("div",{class:"container",onContextmenu:l[0]||(l[0]=ps(()=>{},["prevent"]))},[st(at(ie(r).remain1)+" ",1),I("span",Ym,at(ie(n).remain),1),st(" "+at(ie(r).remain2)+" ",1),Wm,st(" "+at(ie(r).timer1)+" ",1),ne(Dm,{class:"text-box",interval:"1s",limit:999,mode:ie(a)},null,8,["mode"]),st(" "+at(ie(r).timer2)+" ",1),Vm,st(" "+at(ie(i))+" ",1),Gm,ne(Km),Xm,I("button",{class:"bg-gray-400 hover:bg-gray-300 text-black rounded px-4 py-2",type:"button",onClick:o},at(ie(r).retry),1)],32))}});const Zm=ri(Jm,[["__scopeId","data-v-7c8be18c"]]),Qm={id:"drawer-right",class:"--fixed absolute right-0 top-16 w-80 h-screen z-40 p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-transform transform-none",tabindex:"-1","aria-labelledby":"drawer-right-label","aria-modal":"true",role:"dialog"},eh={id:"drawer-right-label",class:"inline-flex items-center mb-4 text-base font-semibold"},th=st(" Settings "),nh=I("span",{class:"sr-only"},"Close menu",-1),rh={class:"w-full"},ah={class:"w-full px-3 mb-6"},ih=I("label",{class:"block tracking-wide text-sm font-semibold mb-2",for:"lang"}," Language ",-1),oh={class:"relative"},sh=I("option",{value:"en"}," English ",-1),lh=I("option",{value:"ja"}," \u65E5\u672C\u8A9E ",-1),fh=[sh,lh],ch={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"},uh={class:"w-full px-3 mb-6"},dh=I("label",{class:"block tracking-wide text-sm font-semibold mb-2",for:"theme"}," Theme ",-1),mh={class:"relative"},hh=I("option",{value:"green_32"}," green(32px) ",-1),ph=I("option",{value:"MS_32"}," MS(32px) ",-1),gh=I("option",{value:"green_16"}," green(16px) ",-1),vh=I("option",{value:"MS_16"}," MS(16px) ",-1),bh=[hh,ph,gh,vh],yh={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"},_h={class:"w-full px-3 mb-6"},xh=I("label",{class:"block tracking-wide text-sm font-semibold mb-2",for:"level"}," Level ",-1),wh={class:"relative"},Eh=I("option",{value:"easy"}," Easy ",-1),kh=I("option",{value:"medium"}," Medium ",-1),Oh=I("option",{value:"hard"}," Hard ",-1),Ah=I("option",{value:"custom"}," Custom ",-1),Ch=[Eh,kh,Oh,Ah],Nh={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"},Ih={class:"w-full px-3 mb-6"},Ph=I("label",{class:"block tracking-wide text-sm font-semibold mb-2",for:"width"}," Width ",-1),Mh={class:"w-full px-3 mb-6"},Sh=I("label",{class:"block tracking-wide text-sm font-semibold mb-2",for:"height"}," Height ",-1),Th={class:"w-full px-3 mb-6"},Dh=I("label",{class:"block tracking-wide text-sm font-semibold mb-2",for:"mines"}," Mines ",-1),Rh=Xe({__name:"MsSettings",emits:["close"],setup(e,{emit:t}){const n=Zs(),r=J({get:()=>n.lang,set:c=>n.changeLang(c)}),a=J({get:()=>`${n.theme.name}_${n.theme.size}`,set:c=>{const[u,m]=c.split("_");n.changeTheme(u,Number(m))}}),i=J({get:()=>n.board.level,set:c=>n.changeLevel(c)}),o=J({get:()=>{var c,u;return(u=(c=n.board.width)==null?void 0:c.toString())!=null?u:""},set:c=>{n.changeWidth($r(c))}}),s=J({get:()=>{var c,u;return(u=(c=n.board.height)==null?void 0:c.toString())!=null?u:""},set:c=>n.changeHeight($r(c))}),l=J({get:()=>{var c,u;return(u=(c=n.board.mines)==null?void 0:c.toString())!=null?u:""},set:c=>n.changeMines($r(c))});return(c,u)=>{const m=Qo("fa");return ve(),Ne("div",Qm,[I("span",eh,[ne(m,{icon:"fa-gear"}),th]),I("button",{type:"button","aria-controls":"drawer-right",class:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center",onClick:u[0]||(u[0]=p=>t("close"))},[ne(m,{icon:"fa-xmark",size:"lg"}),nh]),I("form",rh,[I("div",ah,[ih,I("div",oh,[Tt(I("select",{id:"lang","onUpdate:modelValue":u[1]||(u[1]=p=>q(r)?r.value=p:null),class:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"},fh,512),[[Tr,ie(r)]]),I("div",ch,[ne(m,{icon:"fa-angle-down",size:"xs"})])])]),I("div",uh,[dh,I("div",mh,[Tt(I("select",{id:"theme","onUpdate:modelValue":u[2]||(u[2]=p=>q(a)?a.value=p:null),class:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"},bh,512),[[Tr,ie(a)]]),I("div",yh,[ne(m,{icon:"fa-angle-down",size:"xs"})])])]),I("div",_h,[xh,I("div",wh,[Tt(I("select",{id:"level","onUpdate:modelValue":u[3]||(u[3]=p=>q(i)?i.value=p:null),class:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"},Ch,512),[[Tr,ie(i)]]),I("div",Nh,[ne(m,{icon:"fa-angle-down",size:"xs"})])])]),ie(i)==="custom"?(ve(),Ne(de,{key:0},[I("div",Ih,[Ph,Tt(I("input",{id:"width","onUpdate:modelValue":u[4]||(u[4]=p=>q(o)?o.value=p:null),class:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"number",placeholder:"9 - 30"},null,512),[[Sr,ie(o)]])]),I("div",Mh,[Sh,Tt(I("input",{id:"height","onUpdate:modelValue":u[5]||(u[5]=p=>q(s)?s.value=p:null),class:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"number",placeholder:"9 - 24"},null,512),[[Sr,ie(s)]])]),I("div",Th,[Dh,Tt(I("input",{id:"mines","onUpdate:modelValue":u[6]||(u[6]=p=>q(l)?l.value=p:null),class:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",type:"number",placeholder:"10 - 999"},null,512),[[Sr,ie(l)]])])],64)):Ra("",!0)])])}}}),Lh={class:"bg-teal-500 text-white"},Fh={class:"container mx-auto px-2 py-4 h-16"},$h={class:"flex justify-between items-center"},zh=I("span",{class:"text-xl font-semibold"}," Vue3 + TypeScript minesweeper demo page ",-1),jh={href:"https://github.com/nejiko96/vue3-ts-minesweeper",target:"_blank",title:"View source on GitHub","aria-label":"View source on GitHub"},Uh={class:""},Hh={class:"relative"},Bh=st(" Settings "),Kh=Xe({__name:"App",setup(e){const t=Zs(),n=_n(!1);return(r,a)=>{const i=Qo("fa");return ve(),Ne(de,null,[I("header",Lh,[I("nav",Fh,[I("div",$h,[zh,I("a",jh,[ne(i,{icon:"fa-brands fa-github",size:"2xl"})])])])]),I("main",Uh,[I("div",Hh,[ne(Zm,{settings:ie(t)},null,8,["settings"]),I("button",{class:"text-white bg-teal-500 hover:bg-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 absolute top-2.5 right-2.5",type:"button","aria-controls":"drawer-right",onClick:a[0]||(a[0]=o=>n.value=!0)},[ne(i,{icon:"fa-gear"}),Bh])]),n.value?(ve(),Da(Rh,{key:0,onClose:a[1]||(a[1]=o=>n.value=!1)})):Ra("",!0)])],64)}}});Er.add(Xd);Er.add(qd);Er.add(Zd);Er.add(Jd);Yc(Kh).component("fa",Gd).use(Gc()).mount("#app");
