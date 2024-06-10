var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
(function() {
  "use strict";
  /**
  * @vue/shared v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  function makeMap(str, expectsLowerCase) {
    const set2 = new Set(str.split(","));
    return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const isPromise$1 = (val) => {
    return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction((str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  });
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  const toNumber = (val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject$1(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject$1(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length)
      return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b)
      return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject$1(a);
    bValidType = isObject$1(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (val && val.__v_isRef) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i) => {
            entries[stringifySymbol(key, i) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i = "") => {
    var _a;
    return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
  };
  /**
  * @vue/reactivity v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this._active = false;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function recordEffectScope(effect2, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect2);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  let activeEffect;
  class ReactiveEffect {
    constructor(fn, trigger2, scheduler, scope) {
      this.fn = fn;
      this.trigger = trigger2;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this._dirtyLevel = 2;
      this._trackId = 0;
      this._runnings = 0;
      this._shouldSchedule = false;
      this._depsLength = 0;
      recordEffectScope(this, scope);
    }
    get dirty() {
      if (this._dirtyLevel === 1) {
        pauseTracking();
        for (let i = 0; i < this._depsLength; i++) {
          const dep = this.deps[i];
          if (dep.computed) {
            triggerComputed(dep.computed);
            if (this._dirtyLevel >= 2) {
              break;
            }
          }
        }
        if (this._dirtyLevel < 2) {
          this._dirtyLevel = 0;
        }
        resetTracking();
      }
      return this._dirtyLevel >= 2;
    }
    set dirty(v) {
      this._dirtyLevel = v ? 2 : 0;
    }
    run() {
      this._dirtyLevel = 0;
      if (!this.active) {
        return this.fn();
      }
      let lastShouldTrack = shouldTrack;
      let lastEffect = activeEffect;
      try {
        shouldTrack = true;
        activeEffect = this;
        this._runnings++;
        preCleanupEffect(this);
        return this.fn();
      } finally {
        postCleanupEffect(this);
        this._runnings--;
        activeEffect = lastEffect;
        shouldTrack = lastShouldTrack;
      }
    }
    stop() {
      var _a;
      if (this.active) {
        preCleanupEffect(this);
        postCleanupEffect(this);
        (_a = this.onStop) == null ? void 0 : _a.call(this);
        this.active = false;
      }
    }
  }
  function triggerComputed(computed2) {
    return computed2.value;
  }
  function preCleanupEffect(effect2) {
    effect2._trackId++;
    effect2._depsLength = 0;
  }
  function postCleanupEffect(effect2) {
    if (effect2.deps && effect2.deps.length > effect2._depsLength) {
      for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
        cleanupDepEffect(effect2.deps[i], effect2);
      }
      effect2.deps.length = effect2._depsLength;
    }
  }
  function cleanupDepEffect(dep, effect2) {
    const trackId = dep.get(effect2);
    if (trackId !== void 0 && effect2._trackId !== trackId) {
      dep.delete(effect2);
      if (dep.size === 0) {
        dep.cleanup();
      }
    }
  }
  let shouldTrack = true;
  let pauseScheduleStack = 0;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function pauseScheduling() {
    pauseScheduleStack++;
  }
  function resetScheduling() {
    pauseScheduleStack--;
    while (!pauseScheduleStack && queueEffectSchedulers.length) {
      queueEffectSchedulers.shift()();
    }
  }
  function trackEffect(effect2, dep, debuggerEventExtraInfo) {
    if (dep.get(effect2) !== effect2._trackId) {
      dep.set(effect2, effect2._trackId);
      const oldDep = effect2.deps[effect2._depsLength];
      if (oldDep !== dep) {
        if (oldDep) {
          cleanupDepEffect(oldDep, effect2);
        }
        effect2.deps[effect2._depsLength++] = dep;
      } else {
        effect2._depsLength++;
      }
    }
  }
  const queueEffectSchedulers = [];
  function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
    pauseScheduling();
    for (const effect2 of dep.keys()) {
      if (effect2._dirtyLevel < dirtyLevel && dep.get(effect2) === effect2._trackId) {
        const lastDirtyLevel = effect2._dirtyLevel;
        effect2._dirtyLevel = dirtyLevel;
        if (lastDirtyLevel === 0) {
          effect2._shouldSchedule = true;
          effect2.trigger();
        }
      }
    }
    scheduleEffects(dep);
    resetScheduling();
  }
  function scheduleEffects(dep) {
    for (const effect2 of dep.keys()) {
      if (effect2.scheduler && effect2._shouldSchedule && (!effect2._runnings || effect2.allowRecurse) && dep.get(effect2) === effect2._trackId) {
        effect2._shouldSchedule = false;
        queueEffectSchedulers.push(effect2.scheduler);
      }
    }
  }
  const createDep = (cleanup, computed2) => {
    const dep = /* @__PURE__ */ new Map();
    dep.cleanup = cleanup;
    dep.computed = computed2;
    return dep;
  };
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = Symbol("");
  const MAP_KEY_ITERATE_KEY = Symbol("");
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
      }
      trackEffect(
        activeEffect,
        dep
      );
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray(target)) {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    pauseScheduling();
    for (const dep of deps) {
      if (dep) {
        triggerEffects(
          dep,
          2
        );
      }
    }
    resetScheduling();
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        pauseScheduling();
        const res = toRaw(this)[key].apply(this, args);
        resetScheduling();
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function hasOwnProperty(key) {
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _shallow = false) {
      this._isReadonly = _isReadonly;
      this._shallow = _shallow;
    }
    get(target, key, receiver) {
      const isReadonly2 = this._isReadonly, shallow = this._shallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return shallow;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the reciever is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject$1(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(shallow = false) {
      super(false, shallow);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._shallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          if (isOldValueReadonly) {
            return false;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(shallow = false) {
      super(true, shallow);
    }
    set(target, key) {
      return true;
    }
    deleteProperty(target, key) {
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
    true
  );
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged(key, rawKey)) {
        track(rawTarget, "get", key);
      }
      track(rawTarget, "get", rawKey);
    }
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged(key, rawKey)) {
        track(rawTarget, "has", key);
      }
      track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow2) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get(this, key);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(
        method,
        false,
        false
      );
      readonlyInstrumentations2[method] = createIterableMethod(
        method,
        true,
        false
      );
      shallowInstrumentations2[method] = createIterableMethod(
        method,
        false,
        true
      );
      shallowReadonlyInstrumentations2[method] = createIterableMethod(
        method,
        true,
        true
      );
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  const [
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations
  ] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$1(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this["__v_isReadonly"] = false;
      this.effect = new ReactiveEffect(
        () => getter(this._value),
        () => triggerRefValue(this, 1),
        () => this.dep && scheduleEffects(this.dep)
      );
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      if (!self2._cacheable || self2.effect.dirty) {
        if (hasChanged(self2._value, self2._value = self2.effect.run())) {
          triggerRefValue(self2, 2);
        }
      }
      trackRefValue(self2);
      if (self2.effect._dirtyLevel >= 1) {
        triggerRefValue(self2, 1);
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
    // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(v) {
      this.effect.dirty = v;
    }
    // #endregion
  }
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }
  function trackRefValue(ref2) {
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      trackEffect(
        activeEffect,
        ref2.dep || (ref2.dep = createDep(
          () => ref2.dep = void 0,
          ref2 instanceof ComputedRefImpl ? ref2 : void 0
        ))
      );
    }
  }
  function triggerRefValue(ref2, dirtyLevel = 2, newVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      triggerEffects(
        dep,
        dirtyLevel
      );
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  /**
  * @vue/runtime-core v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  function warn$1(msg, ...args) {
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
          msg + args.join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
      vnode.component,
      vnode.type,
      isRoot
    )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise$1(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(
          appErrorHandler,
          null,
          10,
          [err, exposedInstance, errorInfo]
        );
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    {
      console.error(err);
    }
  }
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.pre) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!queue.length || !queue.includes(
      job,
      isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
    )) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (!activePostFlushCbs || !activePostFlushCbs.includes(
        cb,
        cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
      )) {
        pendingPostFlushCbs.push(cb);
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.pre) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        cb();
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId(a) - getId(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  const comparator = (a, b) => {
    const diff = getId(a) - getId(b);
    if (diff === 0) {
      if (a.pre && !b.pre)
        return -1;
      if (b.pre && !a.pre)
        return 1;
    }
    return diff;
  };
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    queue.sort(comparator);
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (false)
            ;
          callWithErrorHandling(job, null, 14);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs();
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted)
      return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
      const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
      if (trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject$1(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject$1(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      props,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render,
      renderCache,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    let result;
    let fallthroughAttrs;
    const prev = setCurrentRenderingInstance(instance);
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = false ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(
              `Property '${String(
                key
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render.call(
            thisProxy,
            proxyToUse,
            renderCache,
            props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (false)
          ;
        result = normalizeVNode(
          render2.length > 1 ? render2(
            props,
            false ? {
              get attrs() {
                markAttrsAccessed();
                return attrs;
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render2(
            props,
            null
            /* we know it doesn't need it */
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      root.transition = vnode.transition;
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.el = vnode.el;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  const COMPONENTS = "components";
  function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
  }
  const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
  function resolveDynamicComponent(component) {
    if (isString(component)) {
      return resolveAsset(COMPONENTS, component, false) || component;
    } else {
      return component || NULL_DYNAMIC_COMPONENT;
    }
  }
  function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
      const Component = instance.type;
      if (type === COMPONENTS) {
        const selfName = getComponentName(
          Component,
          false
        );
        if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
          return Component;
        }
      }
      const res = (
        // local registration
        // check instance[type] first which is resolved for options API
        resolve(instance[type] || Component[type], name) || // global registration
        resolve(instance.appContext[type], name)
      );
      if (!res && maybeSelfReference) {
        return Component;
      }
      return res;
    }
  }
  function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const ssrContextKey = Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      return ctx;
    }
  };
  const INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, {
    immediate,
    deep,
    flush,
    once,
    onTrack,
    onTrigger
  } = EMPTY_OBJ) {
    if (cb && once) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        unwatch();
      };
    }
    const instance = currentInstance;
    const reactiveGetter = (source2) => deep === true ? source2 : (
      // for deep: false, only traverse root-level properties
      traverse(source2, deep === false ? 1 : void 0)
    );
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else
          ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(source, instance, 2);
      } else {
        getter = () => {
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(
            source,
            instance,
            3,
            [onCleanup]
          );
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onCleanup = (fn) => {
      cleanup = effect2.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
        cleanup = effect2.onStop = void 0;
      };
    };
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onCleanup
        ]);
      }
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else {
        return NOOP;
      }
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!effect2.active || !effect2.dirty) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect2.run();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      job.pre = true;
      if (instance)
        job.id = instance.uid;
      scheduler = () => queueJob(job);
    }
    const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
    const scope = getCurrentScope();
    const unwatch = () => {
      effect2.stop();
      if (scope) {
        remove(scope.effects, effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect2.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(
        effect2.run.bind(effect2),
        instance && instance.suspense
      );
    } else {
      effect2.run();
    }
    if (ssrCleanup)
      ssrCleanup.push(unwatch);
    return unwatch;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, depth, currentDepth = 0, seen) {
    if (!isObject$1(value) || value["__v_skip"]) {
      return value;
    }
    if (depth && depth > 0) {
      if (currentDepth >= depth) {
        return value;
      }
      currentDepth++;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, depth, currentDepth, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, currentDepth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, currentDepth, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], depth, currentDepth, seen);
      }
    }
    return value;
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      return vnode;
    }
    const instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  const leaveCbKey = Symbol("_leaveCb");
  const enterCbKey$1 = Symbol("_enterCb");
  function useTransitionState() {
    const state2 = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state2.isMounted = true;
    });
    onBeforeUnmount(() => {
      state2.isUnmounting = true;
    });
    return state2;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionPropsValidators = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  };
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: BaseTransitionPropsValidators,
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state2 = useTransitionState();
      let prevTransitionKey;
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        let child = children[0];
        if (children.length > 1) {
          for (const c of children) {
            if (c.type !== Comment) {
              child = c;
              break;
            }
          }
        }
        const rawProps = toRaw(props);
        const { mode } = rawProps;
        if (state2.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getKeepAliveChild(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        const enterHooks = resolveTransitionHooks(
          innerChild,
          rawProps,
          state2,
          instance
        );
        setTransitionHooks(innerChild, enterHooks);
        const oldChild = instance.subTree;
        const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
        let transitionKeyChanged = false;
        const { getTransitionKey } = innerChild.type;
        if (getTransitionKey) {
          const key = getTransitionKey();
          if (prevTransitionKey === void 0) {
            prevTransitionKey = key;
          } else if (key !== prevTransitionKey) {
            prevTransitionKey = key;
            transitionKeyChanged = true;
          }
        }
        if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
          const leavingHooks = resolveTransitionHooks(
            oldInnerChild,
            rawProps,
            state2,
            instance
          );
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in") {
            state2.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state2.isLeaving = false;
              if (instance.update.active !== false) {
                instance.effect.dirty = true;
                instance.update();
              }
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(
                state2,
                oldInnerChild
              );
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el[leaveCbKey] = () => {
                earlyRemove();
                el[leaveCbKey] = void 0;
                delete enterHooks.delayedLeave;
              };
              enterHooks.delayedLeave = delayedLeave;
            };
          }
        }
        return child;
      };
    }
  };
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state2, vnode) {
    const { leavingVNodes } = state2;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state2, instance) {
    const {
      appear,
      mode,
      persisted = false,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onEnterCancelled,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      onLeaveCancelled,
      onBeforeAppear,
      onAppear,
      onAfterAppear,
      onAppearCancelled
    } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state2, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(
        hook,
        instance,
        9,
        args
      );
    };
    const callAsyncHook = (hook, args) => {
      const done = args[1];
      callHook2(hook, args);
      if (isArray(hook)) {
        if (hook.every((hook2) => hook2.length <= 1))
          done();
      } else if (hook.length <= 1) {
        done();
      }
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state2.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el[leaveCbKey]) {
          el[leaveCbKey](
            true
            /* cancelled */
          );
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
          leavingVNode.el[leaveCbKey]();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state2.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el[enterCbKey$1] = (cancelled) => {
          if (called)
            return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el[enterCbKey$1] = void 0;
        };
        if (hook) {
          callAsyncHook(hook, [el, done]);
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el[enterCbKey$1]) {
          el[enterCbKey$1](
            true
            /* cancelled */
          );
        }
        if (state2.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        const done = el[leaveCbKey] = (cancelled) => {
          if (called)
            return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el[leaveCbKey] = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        return resolveTransitionHooks(vnode2, props, state2, instance);
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode) ? (
      // #7121 ensure get the child component subtree in case
      // it's been replaced during HMR
      vnode.children ? vnode.children[0] : void 0
    ) : vnode;
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
      if (child.type === Fragment) {
        if (child.patchFlag & 128)
          keyedFragmentCount++;
        ret = ret.concat(
          getTransitionRawChildren(child.children, keepComment, key)
        );
      } else if (keepComment || child.type !== Comment) {
        ret.push(key != null ? cloneVNode(child, { key }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i = 0; i < ret.length; i++) {
        ret[i].patchFlag = -2;
      }
    }
    return ret;
  }
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  const KeepAliveImpl = {
    name: `KeepAlive`,
    // Marker for special handling inside the renderer. We are not using a ===
    // check directly on KeepAlive in the renderer, because importing it directly
    // would prevent it from being tree-shaken.
    __isKeepAlive: true,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number]
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const sharedContext = instance.ctx;
      if (!sharedContext.renderer) {
        return () => {
          const children = slots.default && slots.default();
          return children && children.length === 1 ? children[0] : children;
        };
      }
      const cache = /* @__PURE__ */ new Map();
      const keys = /* @__PURE__ */ new Set();
      let current = null;
      const parentSuspense = instance.suspense;
      const {
        renderer: {
          p: patch,
          m: move,
          um: _unmount,
          o: { createElement }
        }
      } = sharedContext;
      const storageContainer = createElement("div");
      sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
        const instance2 = vnode.component;
        move(vnode, container, anchor, 0, parentSuspense);
        patch(
          instance2.vnode,
          vnode,
          container,
          anchor,
          instance2,
          parentSuspense,
          namespace,
          vnode.slotScopeIds,
          optimized
        );
        queuePostRenderEffect(() => {
          instance2.isDeactivated = false;
          if (instance2.a) {
            invokeArrayFns(instance2.a);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance2.parent, vnode);
          }
        }, parentSuspense);
      };
      sharedContext.deactivate = (vnode) => {
        const instance2 = vnode.component;
        move(vnode, storageContainer, null, 1, parentSuspense);
        queuePostRenderEffect(() => {
          if (instance2.da) {
            invokeArrayFns(instance2.da);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance2.parent, vnode);
          }
          instance2.isDeactivated = true;
        }, parentSuspense);
      };
      function unmount(vnode) {
        resetShapeFlag(vnode);
        _unmount(vnode, instance, parentSuspense, true);
      }
      function pruneCache(filter) {
        cache.forEach((vnode, key) => {
          const name = getComponentName(vnode.type);
          if (name && (!filter || !filter(name))) {
            pruneCacheEntry(key);
          }
        });
      }
      function pruneCacheEntry(key) {
        const cached = cache.get(key);
        if (!current || !isSameVNodeType(cached, current)) {
          unmount(cached);
        } else if (current) {
          resetShapeFlag(current);
        }
        cache.delete(key);
        keys.delete(key);
      }
      watch(
        () => [props.include, props.exclude],
        ([include, exclude]) => {
          include && pruneCache((name) => matches(include, name));
          exclude && pruneCache((name) => !matches(exclude, name));
        },
        // prune post-render after `current` has been updated
        { flush: "post", deep: true }
      );
      let pendingCacheKey = null;
      const cacheSubtree = () => {
        if (pendingCacheKey != null) {
          cache.set(pendingCacheKey, getInnerChild(instance.subTree));
        }
      };
      onMounted(cacheSubtree);
      onUpdated(cacheSubtree);
      onBeforeUnmount(() => {
        cache.forEach((cached) => {
          const { subTree, suspense } = instance;
          const vnode = getInnerChild(subTree);
          if (cached.type === vnode.type && cached.key === vnode.key) {
            resetShapeFlag(vnode);
            const da = vnode.component.da;
            da && queuePostRenderEffect(da, suspense);
            return;
          }
          unmount(cached);
        });
      });
      return () => {
        pendingCacheKey = null;
        if (!slots.default) {
          return null;
        }
        const children = slots.default();
        const rawVNode = children[0];
        if (children.length > 1) {
          current = null;
          return children;
        } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
          current = null;
          return rawVNode;
        }
        let vnode = getInnerChild(rawVNode);
        const comp = vnode.type;
        const name = getComponentName(
          isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
        );
        const { include, exclude, max } = props;
        if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
          current = vnode;
          return rawVNode;
        }
        const key = vnode.key == null ? comp : vnode.key;
        const cachedVNode = cache.get(key);
        if (vnode.el) {
          vnode = cloneVNode(vnode);
          if (rawVNode.shapeFlag & 128) {
            rawVNode.ssContent = vnode;
          }
        }
        pendingCacheKey = key;
        if (cachedVNode) {
          vnode.el = cachedVNode.el;
          vnode.component = cachedVNode.component;
          if (vnode.transition) {
            setTransitionHooks(vnode, vnode.transition);
          }
          vnode.shapeFlag |= 512;
          keys.delete(key);
          keys.add(key);
        } else {
          keys.add(key);
          if (max && keys.size > parseInt(max, 10)) {
            pruneCacheEntry(keys.values().next().value);
          }
        }
        vnode.shapeFlag |= 256;
        current = vnode;
        return isSuspense(rawVNode.type) ? rawVNode : vnode;
      };
    }
  };
  const KeepAlive = KeepAliveImpl;
  function matches(pattern, name) {
    if (isArray(pattern)) {
      return pattern.some((p2) => matches(p2, name));
    } else if (isString(pattern)) {
      return pattern.split(",").includes(name);
    } else if (isRegExp(pattern)) {
      return pattern.test(name);
    }
    return false;
  }
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function resetShapeFlag(vnode) {
    vnode.shapeFlag &= ~256;
    vnode.shapeFlag &= ~512;
  }
  function getInnerChild(vnode) {
    return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => (
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
  );
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook("bu");
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook("bum");
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook("sp");
  const onRenderTriggered = createHook(
    "rtg"
  );
  const onRenderTracked = createHook(
    "rtc"
  );
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache && cache[index];
    if (isArray(source) || isString(source)) {
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
      }
    } else if (typeof source === "number") {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
      }
    } else if (isObject$1(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i) => renderItem(item, i, void 0, cached && cached[i])
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached && cached[i]);
        }
      }
    } else {
      ret = [];
    }
    if (cache) {
      cache[index] = ret;
    }
    return ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
      if (name !== "default")
        props.name = name;
      return createVNode("slot", props, fallback && fallback());
    }
    let slot = slots[name];
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(
      Fragment,
      {
        key: props.key || // slot content array of a dynamic conditional slot may have a branch
        // key attached in the `createSlots` helper, respect that
        validSlotContent && validSlotContent.key || `_${name}`
      },
      validSlotContent || (fallback ? fallback() : []),
      validSlotContent && slots._ === 1 ? 64 : -2
    );
    if (!noSlotted && rendered.scopeId) {
      rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode(child))
        return true;
      if (child.type === Comment)
        return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  const getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => i.props,
      $attrs: (i) => i.attrs,
      $slots: (i) => i.slots,
      $refs: (i) => i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => {
        i.effect.dirty = true;
        queueJob(i.update);
      }),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const hasSetupBinding = (state2, key) => state2 !== EMPTY_OBJ && !state2.__isScriptSetup && hasOwn(state2, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
        ) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance, "get", key);
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else
        ;
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, propsOptions }
    }, key) {
      let normalizedProps;
      return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      if (!isObject$1(data))
        ;
      else {
        instance.data = reactive(data);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject$1(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    }
  }
  function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject$1(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else
      ;
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject$1(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose")
        ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(
        isFunction(to) ? to.call(this, this) : to,
        isFunction(from) ? from.call(this, this) : from
      );
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject$1(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      let isMounted = false;
      const app2 = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin))
            ;
          else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app2, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app2, ...options);
          } else
            ;
          return app2;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app2;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app2;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app2;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app2._container = rootContainer;
            rootContainer.__vue_app__ = app2;
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          }
        },
        unmount() {
          if (isMounted) {
            render(null, app2._container);
            delete app2._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app2;
        },
        runWithContext(fn) {
          currentApp = app2;
          try {
            return fn();
          } finally {
            currentApp = null;
          }
        }
      };
      return app2;
    };
  }
  let currentApp = null;
  function provide(key, value) {
    if (!currentInstance)
      ;
    else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance || currentApp) {
      const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else
        ;
    }
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance,
          !hasOwn(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys)
          needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject$1(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[
              0
              /* shouldCast */
            ] = booleanIndex > -1;
            prop[
              1
              /* shouldCastTrue */
            ] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject$1(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    }
    return false;
  }
  function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
    return match ? match[2] : ctor === null ? "null" : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  const isInternalKey = (key) => key[0] === "_" || key === "$stable";
  const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (false)
        ;
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(
          children,
          instance.slots = {}
        );
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach(
        (r, i) => setRef(
          r,
          oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref3) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref3);
      const _isRef = isRef(ref3);
      const isVFor = rawRef.f;
      if (_isString || _isRef) {
        const doSet = () => {
          if (isVFor) {
            const existing = _isString ? hasOwn(setupState, ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (hasOwn(setupState, ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  ref3.value = [refValue];
                  if (rawRef.k)
                    refs[rawRef.k] = ref3.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (hasOwn(setupState, ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            ref3.value = value;
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else
            ;
        };
        if (isUnmount || isVFor) {
          doSet();
        } else {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        }
      }
    }
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis();
    target.__VUE__ = true;
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else
            ;
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(
              el,
              key,
              null,
              props[key],
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(
            el,
            n2,
            oldProps,
            newProps,
            parentComponent,
            parentSuspense,
            namespace
          );
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(
                  el,
                  key,
                  prev,
                  next,
                  namespace,
                  n1.children,
                  parentComponent,
                  parentSuspense,
                  unmountChildren
                );
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          namespace
        );
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el,
                key,
                oldProps[key],
                null,
                namespace,
                vnode.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(
              el,
              key,
              prev,
              next,
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.effect.dirty = true;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              instance.subTree = renderComponentRoot(instance);
              hydrateNode(
                el,
                instance.subTree,
                instance,
                parentSuspense,
                null
              );
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(
                // note: we are moving the render call into an async callback,
                // which means it won't track dependencies - but it's ok because
                // a server-rendered async wrapper is already in resolved state
                // and it will never need to change.
                () => !instance.isUnmounted && hydrateSubTree()
              );
            } else {
              hydrateSubTree();
            }
          } else {
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                if (!instance.isUnmounted) {
                  componentUpdateFn();
                }
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
        }
      };
      const effect2 = instance.effect = new ReactiveEffect(
        componentUpdateFn,
        NOOP,
        () => queueJob(update),
        instance.scope
        // track it in component's effect scope
      );
      const update = instance.update = () => {
        if (effect2.dirty) {
          effect2.run();
        }
      };
      update.id = instance.uid;
      toggleRecurse(instance, true);
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(
          c1[i],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(
              null,
              c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++)
          newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => hostInsert(el, container, anchor);
          const performLeave = () => {
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs
      } = vnode;
      if (ref3 != null) {
        setRef(ref3, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            optimized,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const { bum, scope, update, subTree, um } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    let isFlushing2 = false;
    const render = (vnode, container, namespace) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      if (!isFlushing2) {
        isFlushing2 = true;
        flushPreFlushCbs();
        flushPostFlushCbs();
        isFlushing2 = false;
      }
      container._vnode = vnode;
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(
        internals
      );
    }
    return {
      render,
      hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, update }, allowed) {
    effect2.allowRecurse = update.allowRecurse = allowed;
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  const isTeleport = (type) => type.__isTeleport;
  const Fragment = Symbol.for("v-fgt");
  const Text = Symbol.for("v-txt");
  const Comment = Symbol.for("v-cmt");
  const Static = Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag |= -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject$1(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    const { props, ref: ref3, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createStaticVNode(content, numberOfNodes) {
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key]))
        setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1)
          setters.forEach((set2) => set2(v));
        else
          setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          instance.props,
          setupContext
        ]
      );
      resetTracking();
      reset();
      if (isPromise$1(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject$1(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else
      ;
    finishComponentSetup(instance, isSSR);
  }
  let compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(
            extend(
              {
                isCustomElement,
                delimiters
              },
              compilerOptions
            ),
            componentCompilerOptions
          );
          Component.render = compile(template, finalCompilerOptions);
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  function getAttrsProxy(instance) {
    return instance.attrsProxy || (instance.attrsProxy = new Proxy(
      instance.attrs,
      {
        get(target, key) {
          track(instance, "get", "$attrs");
          return target[key];
        }
      }
    ));
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        get attrs() {
          return getAttrsProxy(instance);
        },
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(
        instance.components || instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  };
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  const version = "3.4.15";
  /**
  * @vue/runtime-dom v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const TRANSITION = "transition";
  const ANIMATION = "animation";
  const vtcKey = Symbol("_vtc");
  const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
  Transition.displayName = "Transition";
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend(
    {},
    BaseTransitionPropsValidators,
    DOMTransitionPropsValidators
  );
  const callHook = (hook, args = []) => {
    if (isArray(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  const hasExplicitCallback = (hook) => {
    return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const {
      name = "v",
      type,
      duration,
      enterFromClass = `${name}-enter-from`,
      enterActiveClass = `${name}-enter-active`,
      enterToClass = `${name}-enter-to`,
      appearFromClass = enterFromClass,
      appearActiveClass = enterActiveClass,
      appearToClass = enterToClass,
      leaveFromClass = `${name}-leave-from`,
      leaveActiveClass = `${name}-leave-active`,
      leaveToClass = `${name}-leave-to`
    } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const {
      onBeforeEnter,
      onEnter,
      onEnterCancelled,
      onLeave,
      onLeaveCancelled,
      onBeforeAppear = onBeforeEnter,
      onAppear = onEnter,
      onAppearCancelled = onEnterCancelled
    } = baseProps;
    const finishEnter = (el, isAppear, done) => {
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el, done) => {
      el._isLeaving = false;
      removeTransitionClass(el, leaveFromClass);
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve2 = () => finishEnter(el, isAppear, done);
        callHook(hook, [el, resolve2]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve2);
          }
        });
      };
    };
    return extend(baseProps, {
      onBeforeEnter(el) {
        callHook(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        el._isLeaving = true;
        const resolve2 = () => finishLeave(el, done);
        addTransitionClass(el, leaveFromClass);
        forceReflow();
        addTransitionClass(el, leaveActiveClass);
        nextFrame(() => {
          if (!el._isLeaving) {
            return;
          }
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve2);
          }
        });
        callHook(onLeave, [el, resolve2]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false);
        callHook(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true);
        callHook(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook(onLeaveCancelled, [el]);
      }
    });
  }
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject$1(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n = NumberOf(duration);
      return [n, n];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    return res;
  }
  function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
    (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
  }
  function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el[vtcKey] = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  let endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el._endId) {
        resolve2();
      }
    };
    if (explicitTimeout) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve2();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e) => {
      if (e.target === el && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = (key) => (styles[key] || "").split(", ");
    const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
    const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
    const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
      getStyleProperties(`${TRANSITION}Property`).toString()
    );
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
  }
  function toMs(s) {
    if (s === "auto")
      return 0;
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow() {
    return document.body.offsetHeight;
  }
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  const vShowOldKey = Symbol("_vod");
  const vShow = {
    beforeMount(el, { value }, { transition }) {
      el[vShowOldKey] = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue)
        return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el[vShowOldKey] : "none";
  }
  const CSS_VAR_TEXT = Symbol("");
  function patchStyle(el, prev, next) {
    const style = el.style;
    const currentDisplay = style.display;
    const isCssString = isString(next);
    if (next && !isCssString) {
      if (prev && !isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
      for (const key in next) {
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOldKey in el) {
      style.display = currentDisplay;
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null)
        val = "";
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean = isSpecialBooleanAttr(key);
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      el._value = value;
      const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
      const newValue = value == null ? "" : value;
      if (oldValue !== newValue) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
    needRemove && el.removeAttribute(key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance,
        5,
        [e]
      );
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  const patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(
        el,
        key,
        nextValue,
        prevChildren,
        parentComponent,
        parentSuspense,
        unmountChildren
      );
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  const positionMap = /* @__PURE__ */ new WeakMap();
  const newPositionMap = /* @__PURE__ */ new WeakMap();
  const moveCbKey = Symbol("_moveCb");
  const enterCbKey = Symbol("_enterCb");
  const TransitionGroupImpl = {
    name: "TransitionGroup",
    props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
      tag: String,
      moveClass: String
    }),
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state2 = useTransitionState();
      let prevChildren;
      let children;
      onUpdated(() => {
        if (!prevChildren.length) {
          return;
        }
        const moveClass = props.moveClass || `${props.name || "v"}-move`;
        if (!hasCSSTransform(
          prevChildren[0].el,
          instance.vnode.el,
          moveClass
        )) {
          return;
        }
        prevChildren.forEach(callPendingCbs);
        prevChildren.forEach(recordPosition);
        const movedChildren = prevChildren.filter(applyTranslation);
        forceReflow();
        movedChildren.forEach((c) => {
          const el = c.el;
          const style = el.style;
          addTransitionClass(el, moveClass);
          style.transform = style.webkitTransform = style.transitionDuration = "";
          const cb = el[moveCbKey] = (e) => {
            if (e && e.target !== el) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener("transitionend", cb);
              el[moveCbKey] = null;
              removeTransitionClass(el, moveClass);
            }
          };
          el.addEventListener("transitionend", cb);
        });
      });
      return () => {
        const rawProps = toRaw(props);
        const cssTransitionProps = resolveTransitionProps(rawProps);
        let tag = rawProps.tag || Fragment;
        prevChildren = children;
        children = slots.default ? getTransitionRawChildren(slots.default()) : [];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.key != null) {
            setTransitionHooks(
              child,
              resolveTransitionHooks(child, cssTransitionProps, state2, instance)
            );
          }
        }
        if (prevChildren) {
          for (let i = 0; i < prevChildren.length; i++) {
            const child = prevChildren[i];
            setTransitionHooks(
              child,
              resolveTransitionHooks(child, cssTransitionProps, state2, instance)
            );
            positionMap.set(child, child.el.getBoundingClientRect());
          }
        }
        return createVNode(tag, null, children);
      };
    }
  };
  const removeMode = (props) => delete props.mode;
  /* @__PURE__ */ removeMode(TransitionGroupImpl.props);
  const TransitionGroup = TransitionGroupImpl;
  function callPendingCbs(c) {
    const el = c.el;
    if (el[moveCbKey]) {
      el[moveCbKey]();
    }
    if (el[enterCbKey]) {
      el[enterCbKey]();
    }
  }
  function recordPosition(c) {
    newPositionMap.set(c, c.el.getBoundingClientRect());
  }
  function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
      const s = c.el.style;
      s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
      s.transitionDuration = "0s";
      return c;
    }
  }
  function hasCSSTransform(el, root, moveClass) {
    const clone = el.cloneNode();
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.forEach((cls) => {
        cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
      });
    }
    moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
    clone.style.display = "none";
    const container = root.nodeType === 1 ? root : root.parentNode;
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
  }
  const getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  const assignKey = Symbol("_assign");
  const vModelText = {
    created(el, { modifiers: { lazy, trim, number } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      const castToNumber = number || vnode.props && vnode.props.type === "number";
      addEventListener(el, lazy ? "change" : "input", (e) => {
        if (e.target.composing)
          return;
        let domValue = el.value;
        if (trim) {
          domValue = domValue.trim();
        }
        if (castToNumber) {
          domValue = looseToNumber(domValue);
        }
        el[assignKey](domValue);
      });
      if (trim) {
        addEventListener(el, "change", () => {
          el.value = el.value.trim();
        });
      }
      if (!lazy) {
        addEventListener(el, "compositionstart", onCompositionStart);
        addEventListener(el, "compositionend", onCompositionEnd);
        addEventListener(el, "change", onCompositionEnd);
      }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el, { value }) {
      el.value = value == null ? "" : value;
    },
    beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      if (el.composing)
        return;
      const elValue = number || el.type === "number" ? looseToNumber(el.value) : el.value;
      const newValue = value == null ? "" : value;
      if (elValue === newValue) {
        return;
      }
      if (document.activeElement === el && el.type !== "range") {
        if (lazy) {
          return;
        }
        if (trim && el.value.trim() === newValue) {
          return;
        }
      }
      el.value = newValue;
    }
  };
  const vModelSelect = {
    // <select multiple> value need to be deep traversed
    deep: true,
    created(el, { value, modifiers: { number } }, vnode) {
      const isSetModel = isSet(value);
      addEventListener(el, "change", () => {
        const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
          (o) => number ? looseToNumber(getValue(o)) : getValue(o)
        );
        el[assignKey](
          el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
        );
        el._assigning = true;
        nextTick(() => {
          el._assigning = false;
        });
      });
      el[assignKey] = getModelAssigner(vnode);
    },
    // set value in mounted & updated because <select> relies on its children
    // <option>s.
    mounted(el, { value, oldValue, modifiers: { number } }) {
      setSelected(el, value, oldValue, number);
    },
    beforeUpdate(el, _binding, vnode) {
      el[assignKey] = getModelAssigner(vnode);
    },
    updated(el, { value, oldValue, modifiers: { number } }) {
      if (!el._assigning) {
        setSelected(el, value, oldValue, number);
      }
    }
  };
  function setSelected(el, value, oldValue, number) {
    const isMultiple = el.multiple;
    const isArrayValue = isArray(value);
    if (isMultiple && !isArrayValue && !isSet(value)) {
      return;
    }
    if (isArrayValue && looseEqual(value, oldValue)) {
      return;
    }
    for (let i = 0, l = el.options.length; i < l; i++) {
      const option = el.options[i];
      const optionValue = getValue(option);
      if (isMultiple) {
        if (isArrayValue) {
          const optionType = typeof optionValue;
          if (optionType === "string" || optionType === "number") {
            option.selected = value.includes(
              number ? looseToNumber(optionValue) : optionValue
            );
          } else {
            option.selected = looseIndexOf(value, optionValue) > -1;
          }
        } else {
          option.selected = value.has(optionValue);
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i)
            el.selectedIndex = i;
          return;
        }
      }
    }
    if (!isMultiple && el.selectedIndex !== -1) {
      el.selectedIndex = -1;
    }
  }
  function getValue(el) {
    return "_value" in el ? el._value : el.value;
  }
  const systemModifiers = ["ctrl", "shift", "alt", "meta"];
  const modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
  };
  const withModifiers = (fn, modifiers) => {
    const cache = fn._withMods || (fn._withMods = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
      for (let i = 0; i < modifiers.length; i++) {
        const guard = modifierGuards[modifiers[i]];
        if (guard && guard(event, modifiers))
          return;
      }
      return fn(event, ...args);
    });
  };
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app2 = ensureRenderer().createApp(...args);
    const { mount } = app2;
    app2.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app2._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app2;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve2) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve: resolve2
                });
              });
            };
          }
        }
      });
    }
    setRealTarget(target) {
      return __async(this, null, function* () {
        this.target = target;
        for (const item of this.onQueue) {
          this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
          item.resolve(yield this.target[item.method](...item.args));
        }
      });
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state2 = store2.state;
    installModule(store2, state2, [], store2._modules.root, true);
    resetStoreState(store2, state2, hot);
  }
  function resetStoreState(store2, state2, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = reactive({
      data: state2
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && false) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store22) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store22.state,
        // root state
        store22.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    watch(function() {
      return store2._state.data;
    }, function() {
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state2, path) {
    return path.reduce(function(state22, key) {
      return state22[key];
    }, state2);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app2, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app: app2,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state2) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state2;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state2) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state2;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state2) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state2;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters2, path) {
    getters2 = path === "root" ? getters2 : getters2[path];
    var gettersKeys = Object.keys(getters2);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters2);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters2) {
    var result = {};
    Object.keys(getters2).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p2) {
          if (!target[p2]) {
            target[p2] = {
              _custom: {
                value: {},
                display: p2,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p2]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters2[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters2[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names2 = path.split("/").filter(function(n) {
      return n;
    });
    return names2.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names2.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get2(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update2([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update2(path, targetModule, newModule) {
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          return;
        }
        update2(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch2 = ref.dispatch;
    var commit2 = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch2.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit2.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state2 = this._modules.root.state;
    installModule(this, state2, [], this._modules.root);
    resetStoreState(this, state2);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app2, injectKey) {
    app2.provide(injectKey || storeKey, this);
    app2.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : false;
    if (useDevtools) {
      addDevtools(app2, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve2, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
        }
        resolve2(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e) {
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    return watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state2) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state2;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  var mapGetters = normalizeNamespace(function(namespace, getters2) {
    var res = {};
    normalizeMap(getters2).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      val = namespace + val;
      res[key] = function mappedGetter() {
        if (namespace && !getModuleByNamespace(this.$store, "mapGetters", namespace)) {
          return;
        }
        return this.$store.getters[val];
      };
      res[key].vuex = true;
    });
    return res;
  });
  var mapActions = normalizeNamespace(function(namespace, actions2) {
    var res = {};
    normalizeMap(actions2).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      res[key] = function mappedAction() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var dispatch2 = this.$store.dispatch;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, "mapActions", namespace);
          if (!module) {
            return;
          }
          dispatch2 = module.context.dispatch;
        }
        return typeof val === "function" ? val.apply(this, [dispatch2].concat(args)) : dispatch2.apply(this.$store, [val].concat(args));
      };
    });
    return res;
  });
  function normalizeMap(map) {
    if (!isValidMap(map)) {
      return [];
    }
    return Array.isArray(map) ? map.map(function(key) {
      return { key, val: key };
    }) : Object.keys(map).map(function(key) {
      return { key, val: map[key] };
    });
  }
  function isValidMap(map) {
    return Array.isArray(map) || isObject(map);
  }
  function normalizeNamespace(fn) {
    return function(namespace, map) {
      if (typeof namespace !== "string") {
        map = namespace;
        namespace = "";
      } else if (namespace.charAt(namespace.length - 1) !== "/") {
        namespace += "/";
      }
      return fn(namespace, map);
    };
  }
  function getModuleByNamespace(store2, helper, namespace) {
    var module = store2._modulesNamespaceMap[namespace];
    return module;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  let $ = jQuery;
  const _sfc_main$m = {
    methods: {
      showPageOptions(event) {
        event.preventDefault();
        var params = {}, options = window.ZnPbData.page_options;
        params.modal_ajax_hook = "znpb_get_page_options";
        params.modal_backdrop_class = "zn-modal-transparent";
        params.modal_ajax_params = {
          page_options: options,
          post_id: window.ZnPbData.postId
        };
        params.modal_title = "Page options";
        params.modal_on_close = function(e) {
          this.save_page_options(e.modal);
          $.page_builder.show_editor();
        }.bind(this);
        params.modal_on_ajax_load = function(e) {
          e.modal.find(".zn-modal-form");
          $.page_builder.isolate_scroll(e.modal);
        };
        new $.ZnModal(params);
      },
      // This will save the page options to the pb factory
      save_page_options(scope) {
        var form = scope.find(".zn-modal-form").first();
        window.ZnPbData.page_options = $.page_builder.get_form_values(form);
      }
    }
  };
  const _hoisted_1$h = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "dashicons dashicons-admin-generic" },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_2$e = [
    _hoisted_1$h
  ];
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("a", {
      class: "zn_pb_icon",
      href: "#",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.showPageOptions && $options.showPageOptions(...args)),
      "data-tooltip": "Page options"
    }, _hoisted_2$e);
  }
  const pageOptions = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
  const _sfc_main$l = {
    methods: __spreadProps(__spreadValues({}, mapActions(["showEditor", "setActiveTab"])), {
      filterElementsBySearch(event) {
        let keyword = event.target.value;
        this.$store.dispatch("setActiveCategory", "");
        if (keyword.length >= 3) {
          this.showEditor();
          this.setActiveTab("znb-tab-elements");
          this.$store.dispatch("filterElementsBySearch", keyword);
        } else {
          this.$store.dispatch("filterElementsBySearch", "");
        }
      }
    })
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", null, [
      createBaseVNode(
        "input",
        {
          class: "zn_pb_search",
          onKeyup: _cache[0] || (_cache[0] = (...args) => $options.filterElementsBySearch && $options.filterElementsBySearch(...args)),
          type: "search",
          placeholder: "Search for an element",
          autofocus: ""
        },
        null,
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const searchInput = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
  const _sfc_main$k = {
    name: "znb-editor-header",
    computed: __spreadProps(__spreadValues({}, mapGetters(["activeTab", "registeredTabs"])), {
      visibilityButton: function() {
        return this.$store.getters.isEditorVisible ? "dashicons-arrow-down-alt2" : "dashicons-arrow-up-alt2";
      }
    }),
    data: function() {
      return {};
    },
    methods: __spreadProps(__spreadValues({}, mapActions(["toggleEditor", "showEditor", "setActiveTab"])), {
      toggleTab(tab) {
        this.showEditor();
        this.setActiveTab(tab);
      },
      publishPage(event) {
        var fw = jQuery.page_builder;
        fw.hide_editor();
        fw.show_page_loading(true);
        var JsonData = fw.build_map(jQuery(".zn_pb_wrapper > .zn_pb_section"));
        var data = {
          action: "znpb_publish_page",
          template: JSON.stringify(JsonData),
          post_id: window.ZnPbData.postId,
          security: ZnAjax.security,
          page_options: window.ZnPbData.page_options
        };
        jQuery.post(ZnAjax.ajaxurl, data, function(response) {
          if (response) {
            new jQuery.ZnModalMessage("Page saved succesfully !");
            fw.hide_page_loading(true);
          } else {
            fw.hide_page_loading(true);
            new jQuery.ZnModalMessage("There was a problem saving the page !");
          }
        });
      },
      savePageOnCTRLS(event) {
        jQuery.page_builder;
        if ((event.ctrlKey || event.metaKey) && !event.altKey) {
          switch (String.fromCharCode(event.which).toLowerCase()) {
            case "s":
              event.preventDefault();
              this.publishPage();
              break;
          }
        }
      }
    }),
    components: {
      "znb-page-options": pageOptions,
      "znb-elements-search": searchInput
    },
    created: function() {
      document.addEventListener("keydown", this.savePageOnCTRLS);
    },
    destroyed: function() {
      document.removeEventListener("keydown", this.savePageOnCTRLS);
    }
  };
  const _hoisted_1$g = { class: "znpbEditorHeader clearfix" };
  const _hoisted_2$d = { class: "zn_fpb_buttons zn_left" };
  const _hoisted_3$b = { id: "klpb-toolbar" };
  const _hoisted_4$9 = ["onClick"];
  const _hoisted_5$3 = /* @__PURE__ */ createBaseVNode(
    "a",
    {
      class: "zn_pb_icon zn_pb_help_icon",
      href: "http://docs.kallyas.net/",
      target: "_blank",
      "data-tooltip": "Access Documentation"
    },
    [
      /* @__PURE__ */ createBaseVNode("span", { class: "dashicons dashicons-editor-help" })
    ],
    -1
    /* HOISTED */
  );
  const _hoisted_6$2 = { class: "zn_fpb_buttons zn_right" };
  const _hoisted_7$2 = { class: "zn_pb_editor_right_action" };
  const _hoisted_8$2 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zn_publish_loading" },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_9$2 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zn_publish_text" },
    "PUBLISH",
    -1
    /* HOISTED */
  );
  const _hoisted_10$2 = [
    _hoisted_8$2,
    _hoisted_9$2
  ];
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_znb_page_options = resolveComponent("znb-page-options");
    const _component_znb_elements_search = resolveComponent("znb-elements-search");
    return openBlock(), createElementBlock("div", _hoisted_1$g, [
      createBaseVNode("div", _hoisted_2$d, [
        createBaseVNode("span", _hoisted_3$b, [
          createBaseVNode("a", {
            class: "zn_pb_icon zn_pb_close_panel",
            href: "#",
            onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.toggleEditor && _ctx.toggleEditor(...args), ["prevent"]))
          }, [
            createBaseVNode(
              "span",
              {
                class: normalizeClass(["dashicons", $options.visibilityButton])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          createVNode(_component_znb_page_options)
        ]),
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.registeredTabs, (tab) => {
            return openBlock(), createElementBlock("a", {
              href: "#",
              onClick: withModifiers(($event) => $options.toggleTab(tab.tabComponent), ["prevent"]),
              class: normalizeClass([{ "zn-pb-active-tab": _ctx.activeTab === tab.tabComponent }, "zn_pb_add_el"])
            }, toDisplayString(tab.tabTitle), 11, _hoisted_4$9);
          }),
          256
          /* UNKEYED_FRAGMENT */
        )),
        _hoisted_5$3
      ]),
      createBaseVNode("div", _hoisted_6$2, [
        createBaseVNode("div", _hoisted_7$2, [
          createVNode(_component_znb_elements_search)
        ]),
        createBaseVNode("a", {
          class: "zn_publish",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.publishPage && $options.publishPage(...args), ["prevent"])),
          href: "#"
        }, _hoisted_10$2)
      ])
    ]);
  }
  const headerComponent = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
  const _sfc_main$j = {
    data: function() {
      return {
        //Set the starting mouse position to a min variable
        startY: 0,
        startEditorHeight: 0
      };
    },
    computed: __spreadValues({}, mapGetters(["editorHeight", "isEditorResizing"])),
    methods: {
      startEditorDrag(event) {
        event.preventDefault();
        this.startEditorHeight = this.editorHeight;
        this.startY = event.clientY;
        this.$store.dispatch("setEditorResizing", true);
        window.addEventListener("mousemove", this.resizeEditor);
        window.addEventListener("mouseup", this.disableEditorDrag);
      },
      disableEditorDrag(context) {
        this.allowDragging = false;
        this.$store.dispatch("setEditorResizing", false);
        window.removeEventListener("mousemove", this.resizeEditor);
        window.removeEventListener("mouseup", this.disableEditorDrag);
      },
      resizeEditor(event) {
        let newHeight = this.startEditorHeight + this.startY - event.clientY;
        let windowTopLimit = 200;
        let windowHeight = window.jQuery(window).height();
        let windowBounds = windowHeight - windowTopLimit;
        newHeight = Math.max(0, newHeight);
        newHeight = Math.min(windowBounds, newHeight);
        this.$store.dispatch("changeHeight", newHeight);
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock(
      "div",
      {
        class: "znpbEditorDragbar",
        onMousedown: _cache[0] || (_cache[0] = (...args) => $options.startEditorDrag && $options.startEditorDrag(...args))
      },
      null,
      32
      /* NEED_HYDRATION */
    );
  }
  const dragBar = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
  const draggableOptions = {
    methods: __spreadProps(__spreadValues({}, mapActions(["showEditor", "hideEditor"])), {
      get_draggable_options: function() {
        let fw = jQuery.page_builder;
        var self2 = this;
        return {
          revert: true,
          containment: "document",
          iframeFix: true,
          cursorAt: { top: 0 },
          appendTo: "body",
          connectToSortable: this.element.level == "2" ? ".zn_pb_wrapper .zn_columns_container" : ".zn_pb_wrapper .zn_sortable_content, .zn_pb_wrapper",
          helper: "clone",
          start: function(a, b) {
            self2.hideEditor();
            fw.body.addClass("zn_dragg_enabled");
          },
          stop: function() {
            self2.showEditor();
            fw.body.removeClass("zn_dragg_enabled");
          },
          zIndex: 1e3
        };
      }
    })
  };
  const draggableElement = {
    mounted: function() {
      jQuery.page_builder;
      jQuery(this.$el).draggable(this.get_draggable_options());
      document.addEventListener("mouseup", this.documentOnMouseUp);
    },
    beforeDestroy: function() {
      jQuery(this.$el).draggable("destroy");
      document.removeEventListener("mouseup", this.documentOnMouseUp);
    },
    methods: {
      onMouseDown(event) {
        jQuery(event.currentTarget);
        var self2 = this;
        if (this.element.level == "2") {
          jQuery(".zn_sortable_content").sortable("disable");
        } else {
          jQuery(".zn_columns_container").sortable("disable");
        }
        jQuery(".ui-sortable").each(function() {
          if (jQuery(this).data("droplevel") >= self2.element.level) {
            jQuery(this).sortable("disable");
          } else {
            jQuery(this).addClass("zn_drop_allowed");
          }
        });
      },
      onMouseUp(event) {
        var fw = jQuery.page_builder;
        fw.body.removeClass("zn_dragg_enabled");
      },
      documentOnMouseUp() {
        jQuery(".ui-sortable-disabled").sortable("enable");
        jQuery(".zn_drop_allowed").removeClass(".zn_drop_allowed");
      }
    }
  };
  const _sfc_main$i = {
    props: ["element"],
    mixins: [draggableOptions, draggableElement]
  };
  const _hoisted_1$f = ["data-object", "data-widget"];
  const _hoisted_2$c = ["src"];
  const _hoisted_3$a = { class: "zn_pb_el_title" };
  const _hoisted_4$8 = { class: "zn_pb_el_category" };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", {
      class: "zn_pb_element",
      "data-object": $props.element.class,
      onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
      onMouseup: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
      "data-widget": $props.element.widget_id
    }, [
      createBaseVNode("img", {
        class: "zn_pb_el_icon",
        src: $props.element.icon
      }, null, 8, _hoisted_2$c),
      createBaseVNode(
        "div",
        _hoisted_3$a,
        toDisplayString($props.element.name),
        1
        /* TEXT */
      ),
      createBaseVNode(
        "div",
        _hoisted_4$8,
        toDisplayString($props.element.category),
        1
        /* TEXT */
      )
    ], 40, _hoisted_1$f);
  }
  const singleElement = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
  const _sfc_main$h = {
    computed: __spreadValues({}, mapGetters([
      "elementCategories",
      "visibleElements",
      "activeCategory",
      "filterElementsByLevel"
    ])),
    data: function() {
      return {};
    },
    components: {
      "znb-elements-single": singleElement
    },
    methods: {
      filterElementsByCategory(category, event) {
        event.preventDefault();
        this.$store.dispatch("filterElementsByCategory", category.filter);
      },
      filterNoContent(event) {
        if (event.target.matches(".zn_pb_no_content")) {
          if (event.target.hasAttribute("data-droplevel")) {
            let elementDropLevel = event.target.getAttribute("data-droplevel");
            this.$store.dispatch(
              "filterElementsByLevel",
              parseInt(elementDropLevel)
            );
          }
        }
      }
    },
    created: function() {
      window.addEventListener("click", this.filterNoContent);
    }
  };
  const _hoisted_1$e = { class: "zn_pb_tab" };
  const _hoisted_2$b = { class: "znpbElementsSidebar zn-sidebar-scroll" };
  const _hoisted_3$9 = { class: "znpbElementsSidebarCategoryList" };
  const _hoisted_4$7 = ["onClick"];
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_znb_elements_single = resolveComponent("znb-elements-single");
    return openBlock(), createElementBlock("div", _hoisted_1$e, [
      createBaseVNode("div", _hoisted_2$b, [
        createBaseVNode("ul", _hoisted_3$9, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.elementCategories, (category) => {
              return openBlock(), createElementBlock("li", null, [
                createBaseVNode("a", {
                  href: "#",
                  onClick: ($event) => $options.filterElementsByCategory(category, $event),
                  class: normalizeClass({ zn_pb_selected: _ctx.activeCategory == category.filter })
                }, toDisplayString(category.name), 11, _hoisted_4$7)
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ]),
      createVNode(TransitionGroup, {
        name: "pb_element",
        tag: "div",
        class: "zn_pb_elements zn_pb_tab_content",
        id: "znpb_editor_elements"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.visibleElements, (element) => {
              return openBlock(), createElementBlock("div", {
                key: element.id,
                class: "pb_element"
              }, [
                createCommentVNode(" TODO: Switch from visibleElements to a computed propery that shows the element. It is needed for transitions "),
                createVNode(_component_znb_elements_single, { element }, null, 8, ["element"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const elementsTabContent = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
  const _sfc_main$g = {
    props: ["element", "single"],
    mixins: [draggableOptions, draggableElement],
    data: function() {
      return {
        isOptionsVisible: false
      };
    },
    methods: {
      exportElement(event) {
        var that = this, fw = jQuery.page_builder;
        let template_name = this.element.name;
        var data = {
          action: "znpb_export_indv_template",
          template_name,
          level: that.element.level,
          isSingle: that.single,
          security: ZnAjax.security
        };
        fw.show_page_loading(true);
        jQuery.post(ZnAjax.ajaxurl, data, function(response) {
          if (response.success === true) {
            window.showed_message = true;
            location.href = ZnAjax.ajaxurl + "?action=znpb_download_export&file_name=" + template_name + "&nonce=" + ZnAjax.security;
          } else if (response.message.length > 0) {
            new jQuery.ZnModalMessage(response.mesage);
          } else {
            new jQuery.ZnModalMessage(
              "There was a problem exporting the template !"
            );
          }
          fw.hide_page_loading(true);
        });
      },
      deleteElement(event) {
        var that = this, fw = jQuery.page_builder;
        var data = {
          action: "zn_delete_template",
          template_name: that.element.name,
          isSingle: that.single,
          // TODO: normalize nonces
          security: ZnAjax.security,
          post_id: window.ZnPbData.postId
        };
        var callback = function() {
          fw.show_page_loading(true);
          jQuery.post(ZnAjax.ajaxurl, data, function(response) {
            if (response.success === true) {
              new jQuery.ZnModalMessage(response.message);
              fw.hide_page_loading(true);
              if (that.single) {
                that.$store.dispatch("removeSingleElement", that.element);
              } else {
                that.$store.dispatch("removeTemplate", that.element);
              }
            } else {
              fw.hide_page_loading(true);
              new jQuery.ZnModalMessage(
                "There was a problem saving the template !"
              );
            }
          });
        };
        new jQuery.ZnModalConfirm(
          "Are you sure you want to delete this template ?",
          "No",
          "Yes",
          callback
        );
      }
    }
  };
  const _hoisted_1$d = ["data-is_single", "data-template"];
  const _hoisted_2$a = { class: "zn_pb_template" };
  const _hoisted_3$8 = /* @__PURE__ */ createBaseVNode(
    "img",
    {
      class: "zn_pb_el_icon",
      src: "https://demo.kallyas.net/wp-content/themes/kallyas/framework/zion-builder/assets/img/default_icon.png"
    },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_4$6 = { class: "zn_pb_el_title" };
  const _hoisted_5$2 = { class: "zn_pb_tpl_subactions-panel" };
  const _hoisted_6$1 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "dashicons dashicons-upload" },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_7$1 = [
    _hoisted_6$1
  ];
  const _hoisted_8$1 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "dashicons dashicons-trash" },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_9$1 = [
    _hoisted_8$1
  ];
  const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zn_pb_tpl_actions-text-btn" },
    "DRAG TO PAGE",
    -1
    /* HOISTED */
  );
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", {
      class: "znbSingleTemplate zn_pb_element",
      "data-is_single": $props.single,
      "data-template": $props.element.name,
      onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
      onMouseup: _cache[4] || (_cache[4] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args))
    }, [
      createBaseVNode("div", _hoisted_2$a, [
        createCommentVNode(" TODO: ADD DEFAULT ICON FROM PHP "),
        _hoisted_3$8,
        createBaseVNode(
          "div",
          _hoisted_4$6,
          toDisplayString($props.element.name),
          1
          /* TEXT */
        ),
        createBaseVNode(
          "div",
          {
            class: normalizeClass(["zn_pb_tpl_actions", { "zn_pb_tpl_subactions-panel--panelOpen": _ctx.isOptionsVisible }])
          },
          [
            createBaseVNode("span", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isOptionsVisible = !_ctx.isOptionsVisible),
              class: "zn_pb_tpl_subactions-trig"
            }, "···"),
            withDirectives(createBaseVNode(
              "div",
              _hoisted_5$2,
              [
                createBaseVNode("a", {
                  onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.exportElement && $options.exportElement(...args), ["prevent"])),
                  href: "#",
                  class: "zn_pb_export_indv_template zn_pb_tpl_actions-btn tooltip-bottom",
                  "data-tooltip": "EXPORT"
                }, _hoisted_7$1),
                createBaseVNode("a", {
                  onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $options.deleteElement && $options.deleteElement(...args), ["prevent"])),
                  href: "#",
                  class: "zn_pb_delete_saved_el zn_pb_tpl_actions-btn tooltip-bottom",
                  "data-tooltip": "DELETE"
                }, _hoisted_9$1)
              ],
              512
              /* NEED_PATCH */
            ), [
              [vShow, _ctx.isOptionsVisible]
            ]),
            _hoisted_10$1
          ],
          2
          /* CLASS */
        )
      ])
    ], 40, _hoisted_1$d);
  }
  const singleTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
  const _sfc_main$f = {
    name: "templateImporter",
    data: () => {
      return {
        isFileUploading: false,
        uploadProgress: ""
      };
    },
    props: {
      single: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      importFile(event) {
        var that = this, fileData = event.target.files[0];
        this.isFileUploading = true;
        var data = new FormData();
        data.append("file", fileData);
        data.append("action", "zn_import_template");
        data.append("isSingle", this.single);
        data.append("security", ZnAjax.security);
        jQuery.ajax({
          url: ZnAjax.ajaxurl,
          // point to server-side PHP script
          dataType: "json",
          // what to expect back from the PHP script, if anything
          cache: false,
          contentType: false,
          processData: false,
          data,
          type: "post",
          xhr: function() {
            var xhr = jQuery.ajaxSettings.xhr(), hasOnProgress = "onprogress" in xhr;
            if (!hasOnProgress) {
              return;
            }
            if (xhr instanceof window.XMLHttpRequest) {
              xhr.addEventListener("progress", this.progress, false);
            }
            if (xhr.upload) {
              xhr.upload.addEventListener("progress", this.progress, false);
            }
            return xhr;
          },
          progress: function(e) {
            if (e.lengthComputable) {
              var pct = parseInt(e.loaded / e.total * 100);
              that.uploadProgress = pct;
            } else {
              console.warn("Content Length not reported!");
            }
          },
          success: function(response) {
            if (response.success) {
              new jQuery.ZnModalMessage(response.data.message);
              that.$emit("file-upload-success", response.data);
            } else {
              new jQuery.ZnModalMessage(
                "There was a problem importing the template !"
              );
              that.$emit("file-upload-error", response.data);
            }
          },
          error: function(error) {
            console.log("ERROR: " + error);
          },
          complete: function() {
            that.uploadProgress = "";
            that.isFileUploading = false;
          }
        });
      }
    }
  };
  const _hoisted_1$c = { class: "zn_pb_template zn_pb_uploadtpl" };
  const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode(
    "svg",
    {
      width: "100px",
      height: "100px",
      viewBox: "0 0 100 100",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    [
      /* @__PURE__ */ createBaseVNode("path", {
        d: "M61.6702128,62.6293333 L39.3297872,62.6293333 C38.6691489,62.6293333 38.1329787,62.0917333 38.1329787,61.4293333 L38.1329787,46.5189333 C38.1329787,45.856 38.6691489,45.3189333 39.3297872,45.3189333 L44.3164894,45.3189333 C44.9771277,45.3189333 45.5132979,45.856 45.5132979,46.5189333 C45.5132979,47.1813333 44.9771277,47.7189333 44.3164894,47.7189333 L40.5265957,47.7189333 L40.5265957,60.2293333 L60.4734043,60.2293333 L60.4734043,47.7189333 L56.6835106,47.7189333 C56.0228723,47.7189333 55.4867021,47.1813333 55.4867021,46.5189333 C55.4867021,45.856 56.0228723,45.3189333 56.6835106,45.3189333 L61.6702128,45.3189333 C62.3308511,45.3189333 62.8670213,45.856 62.8670213,46.5189333 L62.8670213,61.4293333 C62.8670213,62.0917333 62.3308511,62.6293333 61.6702128,62.6293333 Z M55.3851064,53.5018667 L51.3478723,57.5498667 C51.2914894,57.6064 51.2271277,57.6581333 51.1606383,57.7018667 C51.1005319,57.7418667 51.0361702,57.7770667 50.9696809,57.8064 C50.9260638,57.8250667 50.8867021,57.8373333 50.8430851,57.8501333 C50.8074468,57.8624 50.7680851,57.8752 50.7308511,57.8773333 C50.7180851,57.8810667 50.7058511,57.8853333 50.6909574,57.8853333 C50.6308511,57.8981333 50.5664894,57.9018667 50.5042553,57.9018667 C50.4441489,57.9018667 50.3835106,57.8981333 50.3255319,57.8853333 C50.3090426,57.8853333 50.2941489,57.8810667 50.2776596,57.8773333 C50.2425532,57.8730667 50.2090426,57.8645333 50.1739362,57.8522667 C50.0904255,57.8272 50.0095745,57.7957333 49.9351064,57.7562667 C49.8702128,57.7210667 49.8079787,57.6773333 49.7521277,57.6293333 C49.7207447,57.6064 49.687766,57.5770667 49.6606383,57.5498667 L45.6234043,53.5018667 C45.1558511,53.0330667 45.1558511,52.2752 45.6234043,51.8064 C46.0909574,51.3376 46.8473404,51.3376 47.3148936,51.8064 L49.3095745,53.8021333 L49.3095745,40.5706667 C49.3095745,39.9104 49.843617,39.3706667 50.506383,39.3706667 C51.1648936,39.3706667 51.7031915,39.9104 51.7031915,40.5706667 L51.7031915,53.8021333 L53.693617,51.8064 C54.1611702,51.3376 54.9212766,51.3376 55.3888298,51.8064 C55.8505319,52.2752 55.8505319,53.0352 55.3851064,53.5018667 Z",
        fill: "#757780"
      }),
      /* @__PURE__ */ createBaseVNode("rect", {
        stroke: "#979797",
        "stroke-width": "3",
        x: "3",
        y: "3",
        width: "94",
        height: "94",
        rx: "8"
      })
    ],
    -1
    /* HOISTED */
  );
  const _hoisted_3$7 = /* @__PURE__ */ createBaseVNode(
    "div",
    { class: "zn_pb_el_title" },
    "IMPORT TEMPLATE",
    -1
    /* HOISTED */
  );
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", _hoisted_1$c, [
      createBaseVNode(
        "label",
        {
          class: normalizeClass([{ "is-uploading": _ctx.isFileUploading }, "zn_pb_el_icon zn_pb_el_uploadicon js-znpb_upload_template"]),
          for: "znpb_upload_input"
        },
        [
          _hoisted_2$9,
          createBaseVNode(
            "span",
            {
              class: normalizeClass([{ "is-flashing": _ctx.isFileUploading }, "zn_pb_el_uploadicon-progress"])
            },
            toDisplayString(_ctx.uploadProgress),
            3
            /* TEXT, CLASS */
          )
        ],
        2
        /* CLASS */
      ),
      createBaseVNode(
        "input",
        {
          id: "znpb_upload_input",
          onChange: _cache[0] || (_cache[0] = (...args) => $options.importFile && $options.importFile(...args)),
          class: "znpb_upload_input",
          type: "file",
          name: "znpb_template_upload_input"
        },
        null,
        32
        /* NEED_HYDRATION */
      ),
      _hoisted_3$7
    ]);
  }
  const templateImporter = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
  const _sfc_main$e = {
    computed: __spreadValues({}, mapGetters(["allTemplates"])),
    data: function() {
      return {
        isOptionsVisible: false,
        templateSaveName: "",
        hasError: false,
        // For template import
        uploadProgress: ""
      };
    },
    components: {
      "znb-templates-single": singleTemplate,
      templateImporter
    },
    methods: {
      checkInputEmpty() {
        if (this.templateSaveName.length == 0) {
          this.hasError = true;
          return false;
        }
        this.hasError = false;
        return true;
      },
      saveTemplate(event) {
        var that = this, fw = jQuery.page_builder;
        if (!this.checkInputEmpty()) {
          return;
        }
        fw.show_page_loading(true);
        var JsonData = fw.build_map(
          jQuery(".zn_pb_wrapper > .zn_pb_section"),
          true
        );
        var data = {
          action: "zn_save_template",
          template_name: that.templateSaveName,
          template: JSON.stringify(JsonData),
          page_options: window.ZnPbData.page_options,
          post_id: window.ZnPbData.postId,
          // TODO: normalize nonces
          security: ZnAjax.security
        };
        jQuery.post(ZnAjax.ajaxurl, data, function(response) {
          if (response.message) {
            new jQuery.ZnModalMessage(response.message);
            that.$store.dispatch("addTemplate", {
              name: that.templateSaveName,
              level: 1
            });
            fw.hide_page_loading(true);
          } else {
            fw.hide_page_loading(true);
            new jQuery.ZnModalMessage(
              "There was a problem saving the template !"
            );
          }
          that.templateSaveName = "";
        });
      },
      exportTemplate() {
        var fw = jQuery.page_builder;
        let template_name = this.templateSaveName;
        if (!this.checkInputEmpty()) {
          return;
        }
        fw.show_page_loading(true);
        var JsonData = fw.build_map(
          jQuery(".zn_pb_wrapper > .zn_pb_section"),
          true
        );
        var data = {
          action: "zn_export_template",
          template_name,
          template: JSON.stringify(JsonData),
          page_options: window.ZnPbData.page_options,
          security: ZnAjax.security
        };
        jQuery.post(ZnAjax.ajaxurl, data, function(response) {
          fw.hide_page_loading(true);
          if (response.success === true) {
            window.showed_message = true;
            location.href = ZnAjax.ajaxurl + "?action=znpb_download_export&file_name=" + template_name + "&nonce=" + ZnAjax.security;
          } else {
            new jQuery.ZnModalMessage(
              "There was a problem exporting the template: " + response.data
            );
            console.error("Error: ", response.data);
          }
        });
      },
      clearPageElements() {
        jQuery.page_builder;
        var that = this, current_layout = jQuery(".zn_pb_wrapper"), all_elements = current_layout.find(".zn_pb_el_container"), reordered = all_elements.get().reverse(), callback = function() {
          if (jQuery(reordered).length > 0) {
            jQuery(reordered).each(function(el) {
              var element_container = jQuery(this).parent();
              jQuery(this).remove();
              if (element_container.children().length < 1) {
                element_container.addClass("zn_pb_no_content");
              }
              if (element_container.has(".ui-sortable")) {
                element_container.sortable("refreshPositions");
                element_container.sortable("refresh");
              }
            });
          }
          that.isOptionsVisible = false;
        };
        new jQuery.ZnModalConfirm(
          "Are you sure you want to remove all the elements on this page?",
          "No",
          "Yes",
          callback
        );
      },
      fileUploadSuccess(response) {
        console.log(response);
        this.$store.dispatch("addTemplate", {
          name: response.name,
          level: response.level,
          isSingle: response.isSingle
        });
      }
    }
  };
  const _hoisted_1$b = {
    id: "zn_pb_templates",
    class: "zn_pb_templates zn_pb_tab"
  };
  const _hoisted_2$8 = { class: "znpbElementsSidebar" };
  const _hoisted_3$6 = { class: "zn_pb_sidebar_more" };
  const _hoisted_4$5 = { class: "zn_pb_sidebar_more-panel" };
  const _hoisted_5$1 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "dashicons dashicons-trash" },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_6 = { class: "zn_pb_sidebar_btn-wrapper" };
  const _hoisted_7 = { class: "zn_pb_sidebar-inner zn-sidebar-scroll" };
  const _hoisted_8 = { class: "zn_pb_sidebar-content" };
  const _hoisted_9 = /* @__PURE__ */ createBaseVNode(
    "h4",
    { class: "zn_pb_sidebar-content-title" },
    [
      /* @__PURE__ */ createTextVNode("Save / Export"),
      /* @__PURE__ */ createBaseVNode("br"),
      /* @__PURE__ */ createTextVNode("Template")
    ],
    -1
    /* HOISTED */
  );
  const _hoisted_10 = { class: "zn_pb_templates_container zn_pb_tab_content" };
  const _hoisted_11 = { class: "znbTemplatesWrapper" };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_template_importer = resolveComponent("template-importer");
    const _component_znb_templates_single = resolveComponent("znb-templates-single");
    return openBlock(), createElementBlock("div", _hoisted_1$b, [
      createBaseVNode("div", _hoisted_2$8, [
        createBaseVNode("div", _hoisted_3$6, [
          createBaseVNode("span", {
            class: "zn_pb_sidebar_more-trig",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isOptionsVisible = !_ctx.isOptionsVisible)
          }, "···"),
          createVNode(Transition, {
            name: "grow",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode(
                "div",
                _hoisted_4$5,
                [
                  createBaseVNode("a", {
                    href: "#",
                    onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.clearPageElements && $options.clearPageElements(...args), ["prevent"]))
                  }, [
                    _hoisted_5$1,
                    createTextVNode(" CLEAR PAGE ELEMENTS")
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vShow, _ctx.isOptionsVisible]
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("span", {
            class: "zn_pb_sidebar_btn zn_pb_save_template",
            onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $options.saveTemplate && $options.saveTemplate(...args), ["prevent"]))
          }, "SAVE"),
          createBaseVNode("span", {
            class: "zn_pb_sidebar_btn zn_pb_export_template",
            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => $options.exportTemplate && $options.exportTemplate(...args), ["prevent"]))
          }, "EXPORT")
        ]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            _hoisted_9,
            withDirectives(createBaseVNode(
              "input",
              {
                type: "text",
                class: normalizeClass([{ zn_error: _ctx.hasError }, "znpb-template-name-input zn_pb_sidebar-content-input"]),
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.templateSaveName = $event),
                placeholder: "Template name"
              },
              null,
              2
              /* CLASS */
            ), [
              [vModelText, _ctx.templateSaveName]
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_10, [
        createBaseVNode("div", _hoisted_11, [
          createVNode(_component_template_importer, { onFileUploadSuccess: $options.fileUploadSuccess }, null, 8, ["onFileUploadSuccess"]),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.allTemplates, (element) => {
              return openBlock(), createBlock(_component_znb_templates_single, {
                key: element.name,
                element,
                single: false
              }, null, 8, ["element"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const templatesTabContent = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
  const _sfc_main$d = {
    computed: __spreadValues({}, mapGetters(["allSavedElements"])),
    data: function() {
      return {
        // For template import
        templateFile: null,
        isFileUploading: false,
        uploadProgress: ""
      };
    },
    components: {
      "znb-templates-single": singleTemplate,
      templateImporter
    },
    methods: {
      fileUploadSuccess(response) {
        this.$store.dispatch("addSavedElement", {
          name: response.name,
          level: response.level
        });
      }
    }
  };
  const _hoisted_1$a = {
    id: "zn_pb_el_templates",
    class: "zn_pb_el_templates zn_pb_tab"
  };
  const _hoisted_2$7 = /* @__PURE__ */ createStaticVNode('<div class="znpbElementsSidebar"><div class="zn_pb_sidebar-inner zn-sidebar-scroll"><div class="zn_pb_sidebar-content"><h4 class="zn_pb_sidebar-content-title">Saved elements</h4><div class="zn_pb_sidebar-content-desc"><p>Here you will find all your saved elements. If you want to add a saved element to your page, just dragg it into your desired location.</p></div></div></div></div>', 1);
  const _hoisted_3$5 = { class: "zn_pb_templates_container zn_pb_tab_content" };
  const _hoisted_4$4 = { class: "znbTemplatesWrapper" };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_template_importer = resolveComponent("template-importer");
    const _component_znb_templates_single = resolveComponent("znb-templates-single");
    return openBlock(), createElementBlock("div", _hoisted_1$a, [
      _hoisted_2$7,
      createBaseVNode("div", _hoisted_3$5, [
        createBaseVNode("div", _hoisted_4$4, [
          createVNode(_component_template_importer, {
            onFileUploadSuccess: $options.fileUploadSuccess,
            single: true
          }, null, 8, ["onFileUploadSuccess"]),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.allSavedElements, (element) => {
              return openBlock(), createBlock(_component_znb_templates_single, {
                key: element.name,
                element,
                single: true
              }, null, 8, ["element"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const savedElementsTabContent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
  const _sfc_main$c = {
    props: ["icon"],
    data: function() {
      return {
        isPopOverVisible: false
      };
    },
    computed: {
      buttonClasses() {
        let classes = [];
        if (typeof this.icon !== "undefined") {
          classes.push("zn_pb_icon");
          classes.push(this.icon);
        }
        if (this.isPopOverVisible) {
          classes.push("zion-inline-editor-button--active");
        }
        return classes.join(" ");
      }
    }
  };
  const _hoisted_1$9 = { class: "zion-inline-editorPopoverWrapper" };
  const _hoisted_2$6 = {
    key: 0,
    class: "zion-inline-editor-container zion-inline-editor-dropdown zion-inline-editor-dropdown--popover zion-inline-editor-dropdown__arrow--bottom"
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", _hoisted_1$9, [
      createBaseVNode(
        "button",
        {
          class: normalizeClass(["zion-inline-editor-button", $options.buttonClasses]),
          name: "Text Align",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.isPopOverVisible = !_ctx.isPopOverVisible, ["prevent"]))
        },
        null,
        2
        /* CLASS */
      ),
      createVNode(Transition, { name: "bar-show" }, {
        default: withCtx(() => [
          _ctx.isPopOverVisible ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
            renderSlot(_ctx.$slots, "default")
          ])) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      })
    ]);
  }
  const popOver = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
  const _sfc_main$b = {
    props: ["icon", "buttontext", "direction"],
    data: function() {
      return {
        isPanelvisibile: false
      };
    },
    computed: {
      buttonClasses() {
        let classes = [];
        if (typeof this.icon !== "undefined") {
          classes.push("zn_pb_icon");
          classes.push(this.icon);
        }
        if (this.isPanelvisibile) {
          classes.push("zion-inline-editor-button--active");
        }
        return classes.join(" ");
      },
      classes() {
        let classes = [];
        if (typeof this.direction !== "undefined") {
          classes.push("zion-inline-editor-dropdown--panel--direction-row");
        }
        return classes.join(" ");
      }
    },
    methods: {
      togglePanel() {
        if (this.isPanelvisibile) {
          this.hide_panel();
        } else {
          this.show_panel();
        }
      },
      show_panel() {
        this.isPanelvisibile = true;
        this.$emit("open-panel", this);
      },
      hide_panel() {
        this.isPanelvisibile = false;
        this.$emit("close-panel", this);
      },
      getPanelVisibility() {
        return this.isPanelvisibile;
      }
    }
  };
  const _hoisted_1$8 = { class: "zion-inline-editor-panel-wrapper" };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", _hoisted_1$8, [
      createBaseVNode(
        "button",
        {
          class: normalizeClass(["zion-inline-editor-button", $options.buttonClasses]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.togglePanel())
        },
        toDisplayString($props.buttontext),
        3
        /* TEXT, CLASS */
      ),
      createVNode(Transition, { name: "panel-show" }, {
        default: withCtx(() => [
          _ctx.isPanelvisibile ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([$options.classes, "zion-inline-editor-container zion-inline-editor-dropdown zion-inline-editor-dropdown--panel"])
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      })
    ]);
  }
  const panel = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  /*!
   * vue-range-slider v0.6.0
   * https://github.com/ktsn/vue-range-slider
   *
   * @license
   * Copyright (c) 2016-2018 katashin
   * Released under the MIT license
   * https://github.com/ktsn/vue-range-slider/blob/master/LICENSE
   */
  var DocumentEventHelper = {
    created: function created() {
      if (typeof document === "undefined")
        return;
      forEachListener(this, function(key, listener) {
        on(document, key, listener);
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof document === "undefined")
        return;
      forEachListener(this, function(key, listener) {
        off(document, key, listener);
      });
    }
  };
  var isBrowser = typeof window !== "undefined";
  var hasPassive = isBrowser && function() {
    var supported2 = false;
    try {
      var desc = {
        get: function get2() {
          supported2 = true;
        }
      };
      var opts = Object.defineProperty({}, "passive", desc);
      window.addEventListener("test", null, opts);
      window.removeEventListener("test", null, opts);
    } catch (e) {
      supported2 = false;
    }
    return supported2;
  }();
  function forEachListener(vm, f) {
    var events = vm.$options.events;
    Object.keys(events).forEach(function(key) {
      f(key, function(event) {
        return events[key].call(vm, event);
      });
    });
  }
  function on(el, name, fn) {
    var options = hasPassive ? { passive: false } : void 0;
    el.addEventListener(name, fn, options);
  }
  function off(el, name, fn) {
    var options = hasPassive ? { passive: false } : void 0;
    el.removeEventListener(name, fn, options);
  }
  function relativeMouseOffset(offset, base) {
    var bounds = base.getBoundingClientRect();
    return {
      left: offset.clientX - bounds.left,
      top: offset.clientY - bounds.top
    };
  }
  function round(value, min, max, step) {
    if (value <= min) {
      return min;
    }
    var roundedMax = Math.floor((max - min) / step) * step + min;
    if (value >= roundedMax) {
      return roundedMax;
    }
    var normalize = (value - min) / step;
    var decimal = Math.floor(normalize);
    var fraction = normalize - decimal;
    if (fraction === 0)
      return value;
    if (fraction < 0.5) {
      return step * decimal + min;
    } else {
      return step * (decimal + 1) + min;
    }
  }
  var DragHelper = {
    mixins: [DocumentEventHelper],
    props: {
      disabled: Boolean
    },
    data: function data() {
      return {
        isDrag: false
      };
    },
    events: {
      mousedown: function mousedown(event) {
        return this.dragStart(event, this.offsetByMouse);
      },
      mousemove: function mousemove(event) {
        return this.dragMove(event, this.offsetByMouse);
      },
      mouseup: function mouseup(event) {
        return this.dragEnd(event, this.offsetByMouse);
      },
      touchstart: function touchstart(event) {
        return this.dragStart(event, this.offsetByTouch);
      },
      touchmove: function touchmove(event) {
        return this.dragMove(event, this.offsetByTouch);
      },
      touchend: function touchend(event) {
        return this.dragEnd(event, this.offsetByTouch);
      },
      touchcancel: function touchcancel(event) {
        return this.dragEnd(event, this.offsetByTouch);
      }
    },
    methods: {
      isInTarget: function isInTarget(el) {
        if (!el)
          return false;
        if (el === this.$el) {
          return true;
        } else {
          return this.isInTarget(el.parentElement);
        }
      },
      offsetByMouse: function offsetByMouse(event) {
        return relativeMouseOffset(event, this.$el);
      },
      offsetByTouch: function offsetByTouch(event) {
        var touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0];
        return relativeMouseOffset(touch, this.$el);
      },
      dragStart: function dragStart(event, f) {
        if (this.disabled || event.button !== void 0 && event.button !== 0 || !this.isInTarget(event.target)) {
          return;
        }
        event.preventDefault();
        this.isDrag = true;
        this.$emit("dragstart", event, f(event), this.$el);
      },
      dragMove: function dragMove(event, f) {
        if (!this.isDrag)
          return;
        event.preventDefault();
        this.$emit("drag", event, f(event), this.$el);
      },
      dragEnd: function dragEnd(event, f) {
        if (!this.isDrag)
          return;
        event.preventDefault();
        this.isDrag = false;
        this.$emit("dragend", event, f(event), this.$el);
      }
    },
    render: function render() {
      return this.$slots.default && this.$slots.default[0];
    }
  };
  var RangeSlider = {
    render: function render() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("span", { staticClass: "range-slider", class: { disabled: _vm.disabled } }, [_c("drag-helper", { attrs: { "disabled": _vm.disabled }, on: { "dragstart": _vm.dragStart, "drag": _vm.drag, "dragend": _vm.dragEnd } }, [_c("span", { ref: "inner", staticClass: "range-slider-inner" }, [_c("input", { staticClass: "range-slider-hidden", attrs: { "type": "text", "name": _vm.name, "disabled": _vm.disabled }, domProps: { "value": _vm.actualValue } }), _vm._v(" "), _c("span", { staticClass: "range-slider-rail" }), _vm._v(" "), _c("span", { staticClass: "range-slider-fill", style: { width: _vm.valuePercent + "%" } }), _vm._v(" "), _c("span", { ref: "knob", staticClass: "range-slider-knob", style: { left: _vm.valuePercent + "%" } }, [_vm._t("knob")], 2)])])], 1);
    },
    staticRenderFns: [],
    props: {
      name: String,
      value: [String, Number],
      disabled: {
        type: Boolean,
        default: false
      },
      min: {
        type: [String, Number],
        default: 0
      },
      max: {
        type: [String, Number],
        default: 100
      },
      step: {
        type: [String, Number],
        default: 1
      }
    },
    data: function data() {
      return {
        actualValue: null,
        dragStartValue: null
      };
    },
    created: function created() {
      var min = this._min, max = this._max;
      var defaultValue = Number(this.value);
      if (this.value == null || isNaN(defaultValue)) {
        if (min > max) {
          defaultValue = min;
        } else {
          defaultValue = (min + max) / 2;
        }
      }
      this.actualValue = this.round(defaultValue);
    },
    computed: {
      _min: function _min() {
        return Number(this.min);
      },
      _max: function _max() {
        return Number(this.max);
      },
      _step: function _step() {
        return Number(this.step);
      },
      valuePercent: function valuePercent() {
        return (this.actualValue - this._min) / (this._max - this._min) * 100;
      }
    },
    watch: {
      value: function value(newValue) {
        var value2 = Number(newValue);
        if (newValue != null && !isNaN(value2)) {
          this.actualValue = this.round(value2);
        }
      },
      min: function min() {
        this.actualValue = this.round(this.actualValue);
      },
      max: function max() {
        this.actualValue = this.round(this.actualValue);
      }
    },
    methods: {
      dragStart: function dragStart(event, offset) {
        this.dragStartValue = this.actualValue;
        if (event.target === this.$refs.knob) {
          return;
        }
        this.drag(event, offset);
      },
      drag: function drag(event, offset) {
        var offsetWidth = this.$refs.inner.offsetWidth;
        this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));
        this.emitInput(this.actualValue);
      },
      dragEnd: function dragEnd(event, offset) {
        var offsetWidth = this.$refs.inner.offsetWidth;
        this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));
        if (this.dragStartValue !== this.actualValue) {
          this.emitChange(this.actualValue);
        }
      },
      emitInput: function emitInput(value) {
        this.$emit("input", value);
      },
      emitChange: function emitChange(value) {
        this.$emit("change", value);
      },
      valueFromBounds: function valueFromBounds(point, width) {
        return point / width * (this._max - this._min) + this._min;
      },
      round: function round$$1(value) {
        return round(value, this._min, this._max, this._step);
      }
    },
    components: {
      DragHelper
    }
  };
  var vueRangeSlider_cjs = RangeSlider;
  const RangeSlider$1 = /* @__PURE__ */ getDefaultExportFromCjs(vueRangeSlider_cjs);
  const _sfc_main$a = {
    data() {
      return {
        sliderValue: 16
      };
    },
    components: {
      RangeSlider: RangeSlider$1
    },
    beforeMount: function() {
      tinymce.activeEditor.on("NodeChange", this.onNodeChange);
      this.getFontSize(tinymce.activeEditor.selection.getNode());
    },
    beforeDestroy() {
      tinymce.activeEditor.off("NodeChange", this.onNodeChange);
    },
    methods: {
      onNodeChange(node) {
        this.getFontSize(node.element);
      },
      getFontSize(node) {
        let fontSize2 = window.getComputedStyle(node).getPropertyValue("font-size");
        this.sliderValue = parseFloat(fontSize2);
      }
    },
    watch: {
      sliderValue: function(value) {
        tinymce.activeEditor.formatter.apply("fontsize", { value: value + "px" });
      }
    }
  };
  const _hoisted_1$7 = { class: "zion-inline-editor-sliderArea" };
  const _hoisted_2$5 = { class: "zion-inline-editor-sliderArea--value" };
  const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zion-inline-editor-sliderArea--smallValue" },
    "A",
    -1
    /* HOISTED */
  );
  const _hoisted_4$3 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zion-inline-editor-sliderArea--bigValue" },
    "A",
    -1
    /* HOISTED */
  );
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_range_slider = resolveComponent("range-slider");
    return openBlock(), createElementBlock("div", _hoisted_1$7, [
      createBaseVNode(
        "span",
        _hoisted_2$5,
        toDisplayString($data.sliderValue),
        1
        /* TEXT */
      ),
      _hoisted_3$4,
      createVNode(_component_range_slider, {
        class: "zion-inline-editor-sliderArea--slider",
        min: "0",
        max: "100",
        step: "1",
        modelValue: $data.sliderValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.sliderValue = $event)
      }, null, 8, ["modelValue"]),
      _hoisted_4$3
    ]);
  }
  const fontSize = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
  const _sfc_main$9 = {
    data() {
      return {
        sliderValue: 16
      };
    },
    components: {
      RangeSlider: RangeSlider$1
    },
    beforeMount: function() {
      tinymce.activeEditor.on("NodeChange", this.onNodeChange);
      this.getLineHeight(tinymce.activeEditor.selection.getNode());
    },
    beforeDestroy() {
      tinymce.activeEditor.off("NodeChange", this.onNodeChange);
    },
    methods: {
      onNodeChange(node) {
        this.getLineHeight(node.element);
      },
      getLineHeight(node) {
        let lineHeight2 = window.getComputedStyle(node).getPropertyValue("line-height");
        this.sliderValue = parseFloat(lineHeight2);
      }
    },
    watch: {
      sliderValue: function(value) {
        tinymce.activeEditor.formatter.apply("lineheight", { value: value + "px" });
      }
    }
  };
  const _hoisted_1$6 = { class: "zion-inline-editor-sliderArea" };
  const _hoisted_2$4 = { class: "zion-inline-editor-sliderArea--value" };
  const _hoisted_3$3 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zion-inline-editor-sliderArea--smallValue" },
    "-",
    -1
    /* HOISTED */
  );
  const _hoisted_4$2 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zion-inline-editor-sliderArea--bigValue" },
    "+",
    -1
    /* HOISTED */
  );
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_range_slider = resolveComponent("range-slider");
    return openBlock(), createElementBlock("div", _hoisted_1$6, [
      createBaseVNode(
        "span",
        _hoisted_2$4,
        toDisplayString($data.sliderValue),
        1
        /* TEXT */
      ),
      _hoisted_3$3,
      createVNode(_component_range_slider, {
        class: "zion-inline-editor-sliderArea--slider",
        min: "0",
        max: "100",
        step: "1",
        modelValue: $data.sliderValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.sliderValue = $event)
      }, null, 8, ["modelValue"]),
      _hoisted_4$2
    ]);
  }
  const lineHeight = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
  const _sfc_main$8 = {
    data() {
      return {
        sliderValue: 16
      };
    },
    components: {
      RangeSlider: RangeSlider$1
    },
    beforeMount: function() {
      tinymce.activeEditor.on("NodeChange", this.onNodeChange);
      this.getLetterSpacing(tinymce.activeEditor.selection.getNode());
    },
    beforeDestroy() {
      tinymce.activeEditor.off("NodeChange", this.onNodeChange);
    },
    methods: {
      onNodeChange(node) {
        this.getLetterSpacing(node.element);
      },
      getLetterSpacing(node) {
        let letterSpacing2 = window.getComputedStyle(node).getPropertyValue("letter-spacing");
        this.sliderValue = isNaN(parseFloat(letterSpacing2)) ? 0 : parseFloat(letterSpacing2);
      }
    },
    watch: {
      sliderValue: function(value) {
        tinymce.activeEditor.formatter.apply("letterspacing", { value: value + "px" });
      }
    }
  };
  const _hoisted_1$5 = { class: "zion-inline-editor-sliderArea" };
  const _hoisted_2$3 = { class: "zion-inline-editor-sliderArea--value" };
  const _hoisted_3$2 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zion-inline-editor-sliderArea--smallValue" },
    "-",
    -1
    /* HOISTED */
  );
  const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "zion-inline-editor-sliderArea--bigValue" },
    "+",
    -1
    /* HOISTED */
  );
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_range_slider = resolveComponent("range-slider");
    return openBlock(), createElementBlock("div", _hoisted_1$5, [
      createBaseVNode(
        "span",
        _hoisted_2$3,
        toDisplayString($data.sliderValue),
        1
        /* TEXT */
      ),
      _hoisted_3$2,
      createVNode(_component_range_slider, {
        class: "zion-inline-editor-sliderArea--slider",
        min: "0",
        max: "100",
        step: "1",
        modelValue: $data.sliderValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.sliderValue = $event)
      }, null, 8, ["modelValue"]),
      _hoisted_4$1
    ]);
  }
  const letterSpacing = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
  const _sfc_main$7 = {
    props: ["formatter", "icon", "buttontext", "value"],
    data: function() {
      return {
        isActive: null
      };
    },
    computed: {
      classses() {
        let classes = [];
        if (typeof this.icon !== "undefined") {
          classes.push("zn_pb_icon");
          classes.push(this.icon);
        }
        if (this.isActive) {
          classes.push("zion-inline-editor-button--active");
        }
        return classes.join(" ");
      }
    },
    beforeMount: function() {
      var self2 = this;
      tinymce.activeEditor.formatter.formatChanged(this.formatter, function(state2, args) {
        self2.isActive = state2;
      });
      this.isActive = this.hasFormat(this.formatter);
    },
    methods: {
      // Apply button style
      setTextStyle(styleType, event) {
        tinymce.activeEditor.formatter.toggle(styleType);
      },
      // Check if the selection has a specific style applied
      hasFormat(styleType) {
        return tinymce.activeEditor.formatter.match(styleType);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock(
      "button",
      {
        class: normalizeClass(["zion-inline-editor-button", $options.classses]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.setTextStyle($props.formatter))
      },
      toDisplayString($props.buttontext),
      3
      /* TEXT, CLASS */
    );
  }
  const buttonComponent = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
  const _sfc_main$6 = {
    props: ["direction"],
    data: function() {
      return {
        panels: [],
        active_panel: ""
      };
    },
    components: {
      "zion-inline-editor-font-size": fontSize,
      "zion-inline-editor-line-height": lineHeight,
      "zion-inline-editor-letter-spacing": letterSpacing,
      "zion-inline-editor-panel": panel,
      "zion-inline-editor-button": buttonComponent
    },
    created() {
      this.panels = this.$children;
    },
    methods: {
      closeOtherPanels: function(clickedPanel) {
        this.panels.forEach((element) => {
          if (element !== clickedPanel) {
            element.hide_panel();
          }
        });
      }
    }
  };
  const _hoisted_1$4 = { class: "zion-inline-editor-container" };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_zion_inline_editor_font_size = resolveComponent("zion-inline-editor-font-size");
    const _component_zion_inline_editor_panel = resolveComponent("zion-inline-editor-panel");
    const _component_zion_inline_editor_button = resolveComponent("zion-inline-editor-button");
    const _component_zion_inline_editor_line_height = resolveComponent("zion-inline-editor-line-height");
    const _component_zion_inline_editor_letter_spacing = resolveComponent("zion-inline-editor-letter-spacing");
    return openBlock(), createElementBlock("div", _hoisted_1$4, [
      createCommentVNode(" TODO: find an icon for this "),
      createVNode(_component_zion_inline_editor_panel, {
        icon: "znpb_icon-text-height",
        onOpenPanel: $options.closeOtherPanels
      }, {
        default: withCtx(() => [
          createVNode(_component_zion_inline_editor_font_size)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onOpenPanel"]),
      createVNode(_component_zion_inline_editor_panel, {
        buttontext: "H1",
        direction: "row",
        onOpenPanel: $options.closeOtherPanels
      }, {
        default: withCtx(() => [
          createVNode(_component_zion_inline_editor_button, {
            formatter: "h1",
            buttontext: "H1"
          }),
          createVNode(_component_zion_inline_editor_button, {
            formatter: "h2",
            buttontext: "H2"
          }),
          createVNode(_component_zion_inline_editor_button, {
            formatter: "h3",
            buttontext: "H3"
          }),
          createVNode(_component_zion_inline_editor_button, {
            formatter: "h4",
            buttontext: "H4"
          }),
          createVNode(_component_zion_inline_editor_button, {
            formatter: "h5",
            buttontext: "H5"
          }),
          createVNode(_component_zion_inline_editor_button, {
            formatter: "h6",
            buttontext: "H6"
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onOpenPanel"]),
      createVNode(_component_zion_inline_editor_panel, {
        icon: "znpb_icon-resize-vertical",
        onOpenPanel: $options.closeOtherPanels
      }, {
        default: withCtx(() => [
          createVNode(_component_zion_inline_editor_line_height)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onOpenPanel"]),
      createVNode(_component_zion_inline_editor_panel, {
        icon: "znpb_icon-resize-horizontal",
        onOpenPanel: $options.closeOtherPanels
      }, {
        default: withCtx(() => [
          createVNode(_component_zion_inline_editor_letter_spacing)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onOpenPanel"])
    ]);
  }
  const group = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
  const _sfc_main$5 = {
    data: function() {
      return {
        fontsList: window.ZnPbData.fonts_list,
        activeFont: null
      };
    },
    beforeMount: function() {
      var self2 = this;
      tinymce.activeEditor.formatter.formatChanged("fontname", function(state2, args) {
        self2.activeFont = args.node.style["fontFamily"];
      }, true);
      this.activeFont = this.getFont();
    },
    methods: {
      isActive(fontName) {
        return this.activeFont == fontName ? "zion-inline-editor__font-list-item--active" : "";
      },
      changeFont(fontName, event) {
        this.activeFont = fontName;
        tinymce.activeEditor.formatter.toggle("fontname", {
          value: fontName
        });
      },
      getCurrentFont() {
        var fontFamily;
        tinymce.activeEditor.dom.getParents(tinymce.activeEditor.selection.getStart(), function(elm) {
          var value;
          if (value = elm.style["fontFamily"]) {
            fontFamily = value;
          }
        });
        return fontFamily;
      },
      // Check if the selection has a specific style applied
      hasFormat(fontFamily) {
        return tinymce.activeEditor.formatter.match("", {
          value: fontFamily
        });
      },
      getFont() {
        return tinymce.activeEditor.formatter.get("fontFamily");
      }
    }
  };
  const _hoisted_1$3 = { class: "zion-inline-editor-container zion-inline-editor__font-panel" };
  const _hoisted_2$2 = { class: "zion-inline-editor__font-list" };
  const _hoisted_3$1 = ["onClick"];
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("div", _hoisted_1$3, [
      createBaseVNode("ul", _hoisted_2$2, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.fontsList, (fontName) => {
            return openBlock(), createElementBlock("li", {
              onClick: ($event) => $options.changeFont(fontName, $event)
            }, [
              createBaseVNode(
                "button",
                {
                  class: normalizeClass(["zion-inline-editor__font-list-item", { "zion-inline-editor__font-list-item--active": $options.isActive(fontName) }])
                },
                toDisplayString(fontName),
                3
                /* TEXT, CLASS */
              )
            ], 8, _hoisted_3$1);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const fontList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
  var vueColor_min = { exports: {} };
  (function(module, exports) {
    !function(e, t) {
      module.exports = t();
    }("undefined" != typeof self ? self : commonjsGlobal, function() {
      return function(e) {
        function t(r) {
          if (n[r])
            return n[r].exports;
          var i = n[r] = { i: r, l: false, exports: {} };
          return e[r].call(i.exports, i, i.exports, t), i.l = true, i.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e2, n2, r) {
          t.o(e2, n2) || Object.defineProperty(e2, n2, { configurable: false, enumerable: true, get: r });
        }, t.n = function(e2) {
          var n2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return t.d(n2, "a", n2), n2;
        }, t.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, t.p = "", t(t.s = 60);
      }([function(e, t) {
        function n(e2, t2) {
          var n2 = e2[1] || "", i = e2[3];
          if (!i)
            return n2;
          if (t2 && "function" == typeof btoa) {
            var o = r(i);
            return [n2].concat(i.sources.map(function(e3) {
              return "/*# sourceURL=" + i.sourceRoot + e3 + " */";
            })).concat([o]).join("\n");
          }
          return [n2].join("\n");
        }
        function r(e2) {
          return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e2)))) + " */";
        }
        e.exports = function(e2) {
          var t2 = [];
          return t2.toString = function() {
            return this.map(function(t3) {
              var r2 = n(t3, e2);
              return t3[2] ? "@media " + t3[2] + "{" + r2 + "}" : r2;
            }).join("");
          }, t2.i = function(e3, n2) {
            "string" == typeof e3 && (e3 = [[null, e3, ""]]);
            for (var r2 = {}, i = 0; i < this.length; i++) {
              var o = this[i][0];
              "number" == typeof o && (r2[o] = true);
            }
            for (i = 0; i < e3.length; i++) {
              var a = e3[i];
              "number" == typeof a[0] && r2[a[0]] || (n2 && !a[2] ? a[2] = n2 : n2 && (a[2] = "(" + a[2] + ") and (" + n2 + ")"), t2.push(a));
            }
          }, t2;
        };
      }, function(e, t, n) {
        function r(e2) {
          for (var t2 = 0; t2 < e2.length; t2++) {
            var n2 = e2[t2], r2 = u[n2.id];
            if (r2) {
              r2.refs++;
              for (var i2 = 0; i2 < r2.parts.length; i2++)
                r2.parts[i2](n2.parts[i2]);
              for (; i2 < n2.parts.length; i2++)
                r2.parts.push(o(n2.parts[i2]));
              r2.parts.length > n2.parts.length && (r2.parts.length = n2.parts.length);
            } else {
              for (var a2 = [], i2 = 0; i2 < n2.parts.length; i2++)
                a2.push(o(n2.parts[i2]));
              u[n2.id] = { id: n2.id, refs: 1, parts: a2 };
            }
          }
        }
        function i() {
          var e2 = document.createElement("style");
          return e2.type = "text/css", f.appendChild(e2), e2;
        }
        function o(e2) {
          var t2, n2, r2 = document.querySelector("style[" + b + '~="' + e2.id + '"]');
          if (r2) {
            if (p2)
              return v;
            r2.parentNode.removeChild(r2);
          }
          if (x) {
            var o2 = h2++;
            r2 = d || (d = i()), t2 = a.bind(null, r2, o2, false), n2 = a.bind(null, r2, o2, true);
          } else
            r2 = i(), t2 = s.bind(null, r2), n2 = function() {
              r2.parentNode.removeChild(r2);
            };
          return t2(e2), function(r3) {
            if (r3) {
              if (r3.css === e2.css && r3.media === e2.media && r3.sourceMap === e2.sourceMap)
                return;
              t2(e2 = r3);
            } else
              n2();
          };
        }
        function a(e2, t2, n2, r2) {
          var i2 = n2 ? "" : r2.css;
          if (e2.styleSheet)
            e2.styleSheet.cssText = m(t2, i2);
          else {
            var o2 = document.createTextNode(i2), a2 = e2.childNodes;
            a2[t2] && e2.removeChild(a2[t2]), a2.length ? e2.insertBefore(o2, a2[t2]) : e2.appendChild(o2);
          }
        }
        function s(e2, t2) {
          var n2 = t2.css, r2 = t2.media, i2 = t2.sourceMap;
          if (r2 && e2.setAttribute("media", r2), g.ssrId && e2.setAttribute(b, t2.id), i2 && (n2 += "\n/*# sourceURL=" + i2.sources[0] + " */", n2 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i2)))) + " */"), e2.styleSheet)
            e2.styleSheet.cssText = n2;
          else {
            for (; e2.firstChild; )
              e2.removeChild(e2.firstChild);
            e2.appendChild(document.createTextNode(n2));
          }
        }
        var c = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !c)
          throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var l = n(64), u = {}, f = c && (document.head || document.getElementsByTagName("head")[0]), d = null, h2 = 0, p2 = false, v = function() {
        }, g = null, b = "data-vue-ssr-id", x = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        e.exports = function(e2, t2, n2, i2) {
          p2 = n2, g = i2 || {};
          var o2 = l(e2, t2);
          return r(o2), function(t3) {
            for (var n3 = [], i3 = 0; i3 < o2.length; i3++) {
              var a2 = o2[i3], s2 = u[a2.id];
              s2.refs--, n3.push(s2);
            }
            t3 ? (o2 = l(e2, t3), r(o2)) : o2 = [];
            for (var i3 = 0; i3 < n3.length; i3++) {
              var s2 = n3[i3];
              if (0 === s2.refs) {
                for (var c2 = 0; c2 < s2.parts.length; c2++)
                  s2.parts[c2]();
                delete u[s2.id];
              }
            }
          };
        };
        var m = /* @__PURE__ */ function() {
          var e2 = [];
          return function(t2, n2) {
            return e2[t2] = n2, e2.filter(Boolean).join("\n");
          };
        }();
      }, function(e, t) {
        e.exports = function(e2, t2, n, r, i, o) {
          var a, s = e2 = e2 || {}, c = typeof e2.default;
          "object" !== c && "function" !== c || (a = e2, s = e2.default);
          var l = "function" == typeof s ? s.options : s;
          t2 && (l.render = t2.render, l.staticRenderFns = t2.staticRenderFns, l._compiled = true), n && (l.functional = true), i && (l._scopeId = i);
          var u;
          if (o ? (u = function(e3) {
            e3 = e3 || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e3 || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e3 = __VUE_SSR_CONTEXT__), r && r.call(this, e3), e3 && e3._registeredComponents && e3._registeredComponents.add(o);
          }, l._ssrRegister = u) : r && (u = r), u) {
            var f = l.functional, d = f ? l.render : l.beforeCreate;
            f ? (l._injectStyles = u, l.render = function(e3, t3) {
              return u.call(t3), d(e3, t3);
            }) : l.beforeCreate = d ? [].concat(d, u) : [u];
          }
          return { esModule: a, exports: s, options: l };
        };
      }, function(e, t, n) {
        function r(e2, t2) {
          var n2, r2 = e2 && e2.a;
          !(n2 = e2 && e2.hsl ? (0, o.default)(e2.hsl) : e2 && e2.hex && e2.hex.length > 0 ? (0, o.default)(e2.hex) : e2 && e2.hsv ? (0, o.default)(e2.hsv) : e2 && e2.rgba ? (0, o.default)(e2.rgba) : e2 && e2.rgb ? (0, o.default)(e2.rgb) : (0, o.default)(e2)) || void 0 !== n2._a && null !== n2._a || n2.setAlpha(r2 || 1);
          var i2 = n2.toHsl(), a = n2.toHsv();
          return 0 === i2.s && (a.h = i2.h = e2.h || e2.hsl && e2.hsl.h || t2 || 0), { hsl: i2, hex: n2.toHexString().toUpperCase(), hex8: n2.toHex8String().toUpperCase(), rgba: n2.toRgb(), hsv: a, oldHue: e2.h || t2 || i2.h, source: e2.source, a: e2.a || n2.getAlpha() };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(65), o = function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }(i);
        t.default = { props: ["value"], data: function() {
          return { val: r(this.value) };
        }, computed: { colors: { get: function() {
          return this.val;
        }, set: function(e2) {
          this.val = e2, this.$emit("input", e2);
        } } }, watch: { value: function(e2) {
          this.val = r(e2);
        } }, methods: { colorChange: function(e2, t2) {
          this.oldHue = this.colors.hsl.h, this.colors = r(e2, t2 || this.oldHue);
        }, isValidHex: function(e2) {
          return (0, o.default)(e2).isValid();
        }, simpleCheckForValidColor: function(e2) {
          for (var t2 = ["r", "g", "b", "a", "h", "s", "l", "v"], n2 = 0, r2 = 0, i2 = 0; i2 < t2.length; i2++) {
            var o2 = t2[i2];
            e2[o2] && (n2++, isNaN(e2[o2]) || r2++);
          }
          if (n2 === r2)
            return e2;
        }, paletteUpperCase: function(e2) {
          return e2.map(function(e3) {
            return e3.toUpperCase();
          });
        }, isTransparent: function(e2) {
          return 0 === (0, o.default)(e2).getAlpha();
        } } };
      }, function(e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n);
      }, function(e, t, n) {
        function r(e2) {
          n(66);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(36), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(68), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/common/EditableInput.vue", t.default = f.exports;
      }, function(e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function(e2, t2) {
          return n.call(e2, t2);
        };
      }, function(e, t, n) {
        var r = n(8), i = n(18);
        e.exports = n(9) ? function(e2, t2, n2) {
          return r.f(e2, t2, i(1, n2));
        } : function(e2, t2, n2) {
          return e2[t2] = n2, e2;
        };
      }, function(e, t, n) {
        var r = n(16), i = n(42), o = n(25), a = Object.defineProperty;
        t.f = n(9) ? Object.defineProperty : function(e2, t2, n2) {
          if (r(e2), t2 = o(t2, true), r(n2), i)
            try {
              return a(e2, t2, n2);
            } catch (e3) {
            }
          if ("get" in n2 || "set" in n2)
            throw TypeError("Accessors not supported!");
          return "value" in n2 && (e2[t2] = n2.value), e2;
        };
      }, function(e, t, n) {
        e.exports = !n(17)(function() {
          return 7 != Object.defineProperty({}, "a", { get: function() {
            return 7;
          } }).a;
        });
      }, function(e, t, n) {
        var r = n(90), i = n(24);
        e.exports = function(e2) {
          return r(i(e2));
        };
      }, function(e, t, n) {
        var r = n(29)("wks"), i = n(19), o = n(4).Symbol, a = "function" == typeof o;
        (e.exports = function(e2) {
          return r[e2] || (r[e2] = a && o[e2] || (a ? o : i)("Symbol." + e2));
        }).store = r;
      }, function(e, t) {
        e.exports = function(e2) {
          return "object" == typeof e2 ? null !== e2 : "function" == typeof e2;
        };
      }, function(e, t, n) {
        function r(e2) {
          n(111);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(51), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(113), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/common/Hue.vue", t.default = f.exports;
      }, function(e, t) {
        e.exports = true;
      }, function(e, t) {
        var n = e.exports = { version: "2.6.11" };
        "number" == typeof __e && (__e = n);
      }, function(e, t, n) {
        var r = n(12);
        e.exports = function(e2) {
          if (!r(e2))
            throw TypeError(e2 + " is not an object!");
          return e2;
        };
      }, function(e, t) {
        e.exports = function(e2) {
          try {
            return !!e2();
          } catch (e3) {
            return true;
          }
        };
      }, function(e, t) {
        e.exports = function(e2, t2) {
          return { enumerable: !(1 & e2), configurable: !(2 & e2), writable: !(4 & e2), value: t2 };
        };
      }, function(e, t) {
        var n = 0, r = Math.random();
        e.exports = function(e2) {
          return "Symbol(".concat(void 0 === e2 ? "" : e2, ")_", (++n + r).toString(36));
        };
      }, function(e, t, n) {
        function r(e2) {
          n(123);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(54), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(127), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/common/Saturation.vue", t.default = f.exports;
      }, function(e, t, n) {
        function r(e2) {
          n(128);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(55), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(133), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/common/Alpha.vue", t.default = f.exports;
      }, function(e, t, n) {
        function r(e2) {
          n(130);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(56), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(132), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/common/Checkboard.vue", t.default = f.exports;
      }, function(e, t) {
        var n = Math.ceil, r = Math.floor;
        e.exports = function(e2) {
          return isNaN(e2 = +e2) ? 0 : (e2 > 0 ? r : n)(e2);
        };
      }, function(e, t) {
        e.exports = function(e2) {
          if (void 0 == e2)
            throw TypeError("Can't call method on  " + e2);
          return e2;
        };
      }, function(e, t, n) {
        var r = n(12);
        e.exports = function(e2, t2) {
          if (!r(e2))
            return e2;
          var n2, i;
          if (t2 && "function" == typeof (n2 = e2.toString) && !r(i = n2.call(e2)))
            return i;
          if ("function" == typeof (n2 = e2.valueOf) && !r(i = n2.call(e2)))
            return i;
          if (!t2 && "function" == typeof (n2 = e2.toString) && !r(i = n2.call(e2)))
            return i;
          throw TypeError("Can't convert object to primitive value");
        };
      }, function(e, t) {
        e.exports = {};
      }, function(e, t, n) {
        var r = n(46), i = n(30);
        e.exports = Object.keys || function(e2) {
          return r(e2, i);
        };
      }, function(e, t, n) {
        var r = n(29)("keys"), i = n(19);
        e.exports = function(e2) {
          return r[e2] || (r[e2] = i(e2));
        };
      }, function(e, t, n) {
        var r = n(15), i = n(4), o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
        (e.exports = function(e2, t2) {
          return o[e2] || (o[e2] = void 0 !== t2 ? t2 : {});
        })("versions", []).push({ version: r.version, mode: n(14) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });
      }, function(e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
      }, function(e, t, n) {
        var r = n(8).f, i = n(6), o = n(11)("toStringTag");
        e.exports = function(e2, t2, n2) {
          e2 && !i(e2 = n2 ? e2 : e2.prototype, o) && r(e2, o, { configurable: true, value: t2 });
        };
      }, function(e, t, n) {
        t.f = n(11);
      }, function(e, t, n) {
        var r = n(4), i = n(15), o = n(14), a = n(32), s = n(8).f;
        e.exports = function(e2) {
          var t2 = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
          "_" == e2.charAt(0) || e2 in t2 || s(t2, e2, { value: a.f(e2) });
        };
      }, function(e, t) {
        t.f = {}.propertyIsEnumerable;
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(3), o = r(i), a = n(5), s = r(a), c = ["#4D4D4D", "#999999", "#FFFFFF", "#F44E3B", "#FE9200", "#FCDC00", "#DBDF00", "#A4DD00", "#68CCCA", "#73D8FF", "#AEA1FF", "#FDA1FF", "#333333", "#808080", "#CCCCCC", "#D33115", "#E27300", "#FCC400", "#B0BC00", "#68BC00", "#16A5A5", "#009CE0", "#7B64FF", "#FA28FF", "#000000", "#666666", "#B3B3B3", "#9F0500", "#C45100", "#FB9E00", "#808900", "#194D33", "#0C797D", "#0062B1", "#653294", "#AB149E"];
        t.default = { name: "Compact", mixins: [o.default], props: { palette: { type: Array, default: function() {
          return c;
        } } }, components: { "ed-in": s.default }, computed: { pick: function() {
          return this.colors.hex.toUpperCase();
        } }, methods: { handlerClick: function(e2) {
          this.colorChange({ hex: e2, source: "hex" });
        } } };
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = { name: "editableInput", props: { label: String, labelText: String, desc: String, value: [String, Number], max: Number, min: Number, arrowOffset: { type: Number, default: 1 } }, computed: { val: { get: function() {
          return this.value;
        }, set: function(e2) {
          if (!(void 0 !== this.max && +e2 > this.max))
            return e2;
          this.$refs.input.value = this.max;
        } }, labelId: function() {
          return "input__label__" + this.label + "__" + Math.random().toString().slice(2, 5);
        }, labelSpanText: function() {
          return this.labelText || this.label;
        } }, methods: { update: function(e2) {
          this.handleChange(e2.target.value);
        }, handleChange: function(e2) {
          var t2 = {};
          t2[this.label] = e2, void 0 === t2.hex && void 0 === t2["#"] ? this.$emit("change", t2) : e2.length > 5 && this.$emit("change", t2);
        }, handleKeyDown: function(e2) {
          var t2 = this.val, n2 = Number(t2);
          if (n2) {
            var r = this.arrowOffset || 1;
            38 === e2.keyCode && (t2 = n2 + r, this.handleChange(t2), e2.preventDefault()), 40 === e2.keyCode && (t2 = n2 - r, this.handleChange(t2), e2.preventDefault());
          }
        } } };
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = n(3), i = function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }(r), o = ["#FFFFFF", "#F2F2F2", "#E6E6E6", "#D9D9D9", "#CCCCCC", "#BFBFBF", "#B3B3B3", "#A6A6A6", "#999999", "#8C8C8C", "#808080", "#737373", "#666666", "#595959", "#4D4D4D", "#404040", "#333333", "#262626", "#0D0D0D", "#000000"];
        t.default = { name: "Grayscale", mixins: [i.default], props: { palette: { type: Array, default: function() {
          return o;
        } } }, components: {}, computed: { pick: function() {
          return this.colors.hex.toUpperCase();
        } }, methods: { handlerClick: function(e2) {
          this.colorChange({ hex: e2, source: "hex" });
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(5), o = r(i), a = n(3), s = r(a);
        t.default = { name: "Material", mixins: [s.default], components: { "ed-in": o.default }, methods: { onChange: function(e2) {
          e2 && (e2.hex ? this.isValidHex(e2.hex) && this.colorChange({ hex: e2.hex, source: "hex" }) : (e2.r || e2.g || e2.b) && this.colorChange({ r: e2.r || this.colors.rgba.r, g: e2.g || this.colors.rgba.g, b: e2.b || this.colors.rgba.b, a: e2.a || this.colors.rgba.a, source: "rgba" }));
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(81), o = r(i), a = n(3), s = r(a), c = n(13), l = r(c);
        t.default = { name: "Slider", mixins: [s.default], props: { swatches: { type: Array, default: function() {
          return [{ s: 0.5, l: 0.8 }, { s: 0.5, l: 0.65 }, { s: 0.5, l: 0.5 }, { s: 0.5, l: 0.35 }, { s: 0.5, l: 0.2 }];
        } } }, components: { hue: l.default }, computed: { normalizedSwatches: function() {
          return this.swatches.map(function(e2) {
            return "object" !== (void 0 === e2 ? "undefined" : (0, o.default)(e2)) ? { s: 0.5, l: e2 } : e2;
          });
        } }, methods: { isActive: function(e2, t2) {
          var n2 = this.colors.hsl;
          return 1 === n2.l && 1 === e2.l || (0 === n2.l && 0 === e2.l || Math.abs(n2.l - e2.l) < 0.01 && Math.abs(n2.s - e2.s) < 0.01);
        }, hueChange: function(e2) {
          this.colorChange(e2);
        }, handleSwClick: function(e2, t2) {
          this.colorChange({ h: this.colors.hsl.h, s: t2.s, l: t2.l, source: "hsl" });
        } } };
      }, function(e, t, n) {
        var r = n(14), i = n(41), o = n(44), a = n(7), s = n(26), c = n(88), l = n(31), u = n(95), f = n(11)("iterator"), d = !([].keys && "next" in [].keys()), h2 = function() {
          return this;
        };
        e.exports = function(e2, t2, n2, p2, v, g, b) {
          c(n2, t2, p2);
          var x, m, _, w = function(e3) {
            if (!d && e3 in F)
              return F[e3];
            switch (e3) {
              case "keys":
              case "values":
                return function() {
                  return new n2(this, e3);
                };
            }
            return function() {
              return new n2(this, e3);
            };
          }, y = t2 + " Iterator", C = "values" == v, k = false, F = e2.prototype, S = F[f] || F["@@iterator"] || v && F[v], A = S || w(v), O = v ? C ? w("entries") : A : void 0, E = "Array" == t2 ? F.entries || S : S;
          if (E && (_ = u(E.call(new e2()))) !== Object.prototype && _.next && (l(_, y, true), r || "function" == typeof _[f] || a(_, f, h2)), C && S && "values" !== S.name && (k = true, A = function() {
            return S.call(this);
          }), r && !b || !d && !k && F[f] || a(F, f, A), s[t2] = A, s[y] = h2, v)
            if (x = { values: C ? A : w("values"), keys: g ? A : w("keys"), entries: O }, b)
              for (m in x)
                m in F || o(F, m, x[m]);
            else
              i(i.P + i.F * (d || k), t2, x);
          return x;
        };
      }, function(e, t, n) {
        var r = n(4), i = n(15), o = n(86), a = n(7), s = n(6), c = function(e2, t2, n2) {
          var l, u, f, d = e2 & c.F, h2 = e2 & c.G, p2 = e2 & c.S, v = e2 & c.P, g = e2 & c.B, b = e2 & c.W, x = h2 ? i : i[t2] || (i[t2] = {}), m = x.prototype, _ = h2 ? r : p2 ? r[t2] : (r[t2] || {}).prototype;
          h2 && (n2 = t2);
          for (l in n2)
            (u = !d && _ && void 0 !== _[l]) && s(x, l) || (f = u ? _[l] : n2[l], x[l] = h2 && "function" != typeof _[l] ? n2[l] : g && u ? o(f, r) : b && _[l] == f ? function(e3) {
              var t3 = function(t4, n3, r2) {
                if (this instanceof e3) {
                  switch (arguments.length) {
                    case 0:
                      return new e3();
                    case 1:
                      return new e3(t4);
                    case 2:
                      return new e3(t4, n3);
                  }
                  return new e3(t4, n3, r2);
                }
                return e3.apply(this, arguments);
              };
              return t3.prototype = e3.prototype, t3;
            }(f) : v && "function" == typeof f ? o(Function.call, f) : f, v && ((x.virtual || (x.virtual = {}))[l] = f, e2 & c.R && m && !m[l] && a(m, l, f)));
        };
        c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
      }, function(e, t, n) {
        e.exports = !n(9) && !n(17)(function() {
          return 7 != Object.defineProperty(n(43)("div"), "a", { get: function() {
            return 7;
          } }).a;
        });
      }, function(e, t, n) {
        var r = n(12), i = n(4).document, o = r(i) && r(i.createElement);
        e.exports = function(e2) {
          return o ? i.createElement(e2) : {};
        };
      }, function(e, t, n) {
        e.exports = n(7);
      }, function(e, t, n) {
        var r = n(16), i = n(89), o = n(30), a = n(28)("IE_PROTO"), s = function() {
        }, c = function() {
          var e2, t2 = n(43)("iframe"), r2 = o.length;
          for (t2.style.display = "none", n(94).appendChild(t2), t2.src = "javascript:", e2 = t2.contentWindow.document, e2.open(), e2.write("<script>document.F=Object<\/script>"), e2.close(), c = e2.F; r2--; )
            delete c.prototype[o[r2]];
          return c();
        };
        e.exports = Object.create || function(e2, t2) {
          var n2;
          return null !== e2 ? (s.prototype = r(e2), n2 = new s(), s.prototype = null, n2[a] = e2) : n2 = c(), void 0 === t2 ? n2 : i(n2, t2);
        };
      }, function(e, t, n) {
        var r = n(6), i = n(10), o = n(91)(false), a = n(28)("IE_PROTO");
        e.exports = function(e2, t2) {
          var n2, s = i(e2), c = 0, l = [];
          for (n2 in s)
            n2 != a && r(s, n2) && l.push(n2);
          for (; t2.length > c; )
            r(s, n2 = t2[c++]) && (~o(l, n2) || l.push(n2));
          return l;
        };
      }, function(e, t) {
        var n = {}.toString;
        e.exports = function(e2) {
          return n.call(e2).slice(8, -1);
        };
      }, function(e, t, n) {
        var r = n(24);
        e.exports = function(e2) {
          return Object(r(e2));
        };
      }, function(e, t) {
        t.f = Object.getOwnPropertySymbols;
      }, function(e, t, n) {
        var r = n(46), i = n(30).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames || function(e2) {
          return r(e2, i);
        };
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = { name: "Hue", props: { value: Object, direction: { type: String, default: "horizontal" } }, data: function() {
          return { oldHue: 0, pullDirection: "" };
        }, computed: { colors: function() {
          var e2 = this.value.hsl.h;
          return 0 !== e2 && e2 - this.oldHue > 0 && (this.pullDirection = "right"), 0 !== e2 && e2 - this.oldHue < 0 && (this.pullDirection = "left"), this.oldHue = e2, this.value;
        }, directionClass: function() {
          return { "vc-hue--horizontal": "horizontal" === this.direction, "vc-hue--vertical": "vertical" === this.direction };
        }, pointerTop: function() {
          return "vertical" === this.direction ? 0 === this.colors.hsl.h && "right" === this.pullDirection ? 0 : -100 * this.colors.hsl.h / 360 + 100 + "%" : 0;
        }, pointerLeft: function() {
          return "vertical" === this.direction ? 0 : 0 === this.colors.hsl.h && "right" === this.pullDirection ? "100%" : 100 * this.colors.hsl.h / 360 + "%";
        } }, methods: { handleChange: function(e2, t2) {
          !t2 && e2.preventDefault();
          var n2 = this.$refs.container;
          if (n2) {
            var r, i, o = n2.clientWidth, a = n2.clientHeight, s = n2.getBoundingClientRect().left + window.pageXOffset, c = n2.getBoundingClientRect().top + window.pageYOffset, l = e2.pageX || (e2.touches ? e2.touches[0].pageX : 0), u = e2.pageY || (e2.touches ? e2.touches[0].pageY : 0), f = l - s, d = u - c;
            "vertical" === this.direction ? (d < 0 ? r = 360 : d > a ? r = 0 : (i = -100 * d / a + 100, r = 360 * i / 100), this.colors.hsl.h !== r && this.$emit("change", { h: r, s: this.colors.hsl.s, l: this.colors.hsl.l, a: this.colors.hsl.a, source: "hsl" })) : (f < 0 ? r = 0 : f > o ? r = 360 : (i = 100 * f / o, r = 360 * i / 100), this.colors.hsl.h !== r && this.$emit("change", { h: r, s: this.colors.hsl.s, l: this.colors.hsl.l, a: this.colors.hsl.a, source: "hsl" }));
          }
        }, handleMouseDown: function(e2) {
          this.handleChange(e2, true), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
        }, handleMouseUp: function(e2) {
          this.unbindEventListeners();
        }, unbindEventListeners: function() {
          window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp);
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(118), o = r(i), a = n(3), s = r(a), c = ["red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "blueGrey", "black"], l = ["900", "700", "500", "300", "100"], u = function() {
          var e2 = [];
          return c.forEach(function(t2) {
            var n2 = [];
            "black" === t2.toLowerCase() || "white" === t2.toLowerCase() ? n2 = n2.concat(["#000000", "#FFFFFF"]) : l.forEach(function(e3) {
              var r2 = o.default[t2][e3];
              n2.push(r2.toUpperCase());
            }), e2.push(n2);
          }), e2;
        }();
        t.default = { name: "Swatches", mixins: [s.default], props: { palette: { type: Array, default: function() {
          return u;
        } } }, computed: { pick: function() {
          return this.colors.hex;
        } }, methods: { equal: function(e2) {
          return e2.toLowerCase() === this.colors.hex.toLowerCase();
        }, handlerClick: function(e2) {
          this.colorChange({ hex: e2, source: "hex" });
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(3), o = r(i), a = n(5), s = r(a), c = n(20), l = r(c), u = n(13), f = r(u), d = n(21), h2 = r(d);
        t.default = { name: "Photoshop", mixins: [o.default], props: { head: { type: String, default: "Color Picker" }, disableFields: { type: Boolean, default: false }, hasResetButton: { type: Boolean, default: false }, acceptLabel: { type: String, default: "OK" }, cancelLabel: { type: String, default: "Cancel" }, resetLabel: { type: String, default: "Reset" }, newLabel: { type: String, default: "new" }, currentLabel: { type: String, default: "current" } }, components: { saturation: l.default, hue: f.default, alpha: h2.default, "ed-in": s.default }, data: function() {
          return { currentColor: "#FFF" };
        }, computed: { hsv: function() {
          var e2 = this.colors.hsv;
          return { h: e2.h.toFixed(), s: (100 * e2.s).toFixed(), v: (100 * e2.v).toFixed() };
        }, hex: function() {
          var e2 = this.colors.hex;
          return e2 && e2.replace("#", "");
        } }, created: function() {
          this.currentColor = this.colors.hex;
        }, methods: { childChange: function(e2) {
          this.colorChange(e2);
        }, inputChange: function(e2) {
          e2 && (e2["#"] ? this.isValidHex(e2["#"]) && this.colorChange({ hex: e2["#"], source: "hex" }) : e2.r || e2.g || e2.b || e2.a ? this.colorChange({ r: e2.r || this.colors.rgba.r, g: e2.g || this.colors.rgba.g, b: e2.b || this.colors.rgba.b, a: e2.a || this.colors.rgba.a, source: "rgba" }) : (e2.h || e2.s || e2.v) && this.colorChange({ h: e2.h || this.colors.hsv.h, s: e2.s / 100 || this.colors.hsv.s, v: e2.v / 100 || this.colors.hsv.v, source: "hsv" }));
        }, clickCurrentColor: function() {
          this.colorChange({ hex: this.currentColor, source: "hex" });
        }, handleAccept: function() {
          this.$emit("ok");
        }, handleCancel: function() {
          this.$emit("cancel");
        }, handleReset: function() {
          this.$emit("reset");
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(125), o = r(i), a = n(126), s = r(a);
        t.default = { name: "Saturation", props: { value: Object }, computed: { colors: function() {
          return this.value;
        }, bgColor: function() {
          return "hsl(" + this.colors.hsv.h + ", 100%, 50%)";
        }, pointerTop: function() {
          return -100 * this.colors.hsv.v + 1 + 100 + "%";
        }, pointerLeft: function() {
          return 100 * this.colors.hsv.s + "%";
        } }, methods: { throttle: (0, s.default)(function(e2, t2) {
          e2(t2);
        }, 20, { leading: true, trailing: false }), handleChange: function(e2, t2) {
          !t2 && e2.preventDefault();
          var n2 = this.$refs.container;
          if (n2) {
            var r2 = n2.clientWidth, i2 = n2.clientHeight, a2 = n2.getBoundingClientRect().left + window.pageXOffset, s2 = n2.getBoundingClientRect().top + window.pageYOffset, c = e2.pageX || (e2.touches ? e2.touches[0].pageX : 0), l = e2.pageY || (e2.touches ? e2.touches[0].pageY : 0), u = (0, o.default)(c - a2, 0, r2), f = (0, o.default)(l - s2, 0, i2), d = u / r2, h2 = (0, o.default)(-f / i2 + 1, 0, 1);
            this.throttle(this.onChange, { h: this.colors.hsv.h, s: d, v: h2, a: this.colors.hsv.a, source: "hsva" });
          }
        }, onChange: function(e2) {
          this.$emit("change", e2);
        }, handleMouseDown: function(e2) {
          window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
        }, handleMouseUp: function(e2) {
          this.unbindEventListeners();
        }, unbindEventListeners: function() {
          window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp);
        } } };
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = n(22), i = function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }(r);
        t.default = { name: "Alpha", props: { value: Object, onChange: Function }, components: { checkboard: i.default }, computed: { colors: function() {
          return this.value;
        }, gradientColor: function() {
          var e2 = this.colors.rgba, t2 = [e2.r, e2.g, e2.b].join(",");
          return "linear-gradient(to right, rgba(" + t2 + ", 0) 0%, rgba(" + t2 + ", 1) 100%)";
        } }, methods: { handleChange: function(e2, t2) {
          !t2 && e2.preventDefault();
          var n2 = this.$refs.container;
          if (n2) {
            var r2, i2 = n2.clientWidth, o = n2.getBoundingClientRect().left + window.pageXOffset, a = e2.pageX || (e2.touches ? e2.touches[0].pageX : 0), s = a - o;
            r2 = s < 0 ? 0 : s > i2 ? 1 : Math.round(100 * s / i2) / 100, this.colors.a !== r2 && this.$emit("change", { h: this.colors.hsl.h, s: this.colors.hsl.s, l: this.colors.hsl.l, a: r2, source: "rgba" });
          }
        }, handleMouseDown: function(e2) {
          this.handleChange(e2, true), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
        }, handleMouseUp: function() {
          this.unbindEventListeners();
        }, unbindEventListeners: function() {
          window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp);
        } } };
      }, function(e, t, n) {
        function r(e2, t2, n2) {
          if ("undefined" == typeof document)
            return null;
          var r2 = document.createElement("canvas");
          r2.width = r2.height = 2 * n2;
          var i2 = r2.getContext("2d");
          return i2 ? (i2.fillStyle = e2, i2.fillRect(0, 0, r2.width, r2.height), i2.fillStyle = t2, i2.fillRect(0, 0, n2, n2), i2.translate(n2, n2), i2.fillRect(0, 0, n2, n2), r2.toDataURL()) : null;
        }
        function i(e2, t2, n2) {
          var i2 = e2 + "," + t2 + "," + n2;
          if (o[i2])
            return o[i2];
          var a = r(e2, t2, n2);
          return o[i2] = a, a;
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var o = {};
        t.default = { name: "Checkboard", props: { size: { type: [Number, String], default: 8 }, white: { type: String, default: "#fff" }, grey: { type: String, default: "#e6e6e6" } }, computed: { bgStyle: function() {
          return { "background-image": "url(" + i(this.white, this.grey, this.size) + ")" };
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(3), o = r(i), a = n(5), s = r(a), c = n(20), l = r(c), u = n(13), f = r(u), d = n(21), h2 = r(d), p2 = n(22), v = r(p2), g = ["#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF", "rgba(0,0,0,0)"];
        t.default = { name: "Sketch", mixins: [o.default], components: { saturation: l.default, hue: f.default, alpha: h2.default, "ed-in": s.default, checkboard: v.default }, props: { presetColors: { type: Array, default: function() {
          return g;
        } }, disableAlpha: { type: Boolean, default: false }, disableFields: { type: Boolean, default: false } }, computed: { hex: function() {
          var e2 = void 0;
          return e2 = this.colors.a < 1 ? this.colors.hex8 : this.colors.hex, e2.replace("#", "");
        }, activeColor: function() {
          var e2 = this.colors.rgba;
          return "rgba(" + [e2.r, e2.g, e2.b, e2.a].join(",") + ")";
        } }, methods: { handlePreset: function(e2) {
          this.colorChange({ hex: e2, source: "hex" });
        }, childChange: function(e2) {
          this.colorChange(e2);
        }, inputChange: function(e2) {
          e2 && (e2.hex ? this.isValidHex(e2.hex) && this.colorChange({ hex: e2.hex, source: "hex" }) : (e2.r || e2.g || e2.b || e2.a) && this.colorChange({ r: e2.r || this.colors.rgba.r, g: e2.g || this.colors.rgba.g, b: e2.b || this.colors.rgba.b, a: e2.a || this.colors.rgba.a, source: "rgba" }));
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(3), o = r(i), a = n(5), s = r(a), c = n(20), l = r(c), u = n(13), f = r(u), d = n(21), h2 = r(d), p2 = n(22), v = r(p2);
        t.default = { name: "Chrome", mixins: [o.default], props: { disableAlpha: { type: Boolean, default: false }, disableFields: { type: Boolean, default: false } }, components: { saturation: l.default, hue: f.default, alpha: h2.default, "ed-in": s.default, checkboard: v.default }, data: function() {
          return { fieldsIndex: 0, highlight: false };
        }, computed: { hsl: function() {
          var e2 = this.colors.hsl, t2 = e2.h, n2 = e2.s, r2 = e2.l;
          return { h: t2.toFixed(), s: (100 * n2).toFixed() + "%", l: (100 * r2).toFixed() + "%" };
        }, activeColor: function() {
          var e2 = this.colors.rgba;
          return "rgba(" + [e2.r, e2.g, e2.b, e2.a].join(",") + ")";
        }, hasAlpha: function() {
          return this.colors.a < 1;
        } }, methods: { childChange: function(e2) {
          this.colorChange(e2);
        }, inputChange: function(e2) {
          if (e2) {
            if (e2.hex)
              this.isValidHex(e2.hex) && this.colorChange({ hex: e2.hex, source: "hex" });
            else if (e2.r || e2.g || e2.b || e2.a)
              this.colorChange({ r: e2.r || this.colors.rgba.r, g: e2.g || this.colors.rgba.g, b: e2.b || this.colors.rgba.b, a: e2.a || this.colors.rgba.a, source: "rgba" });
            else if (e2.h || e2.s || e2.l) {
              var t2 = e2.s ? e2.s.replace("%", "") / 100 : this.colors.hsl.s, n2 = e2.l ? e2.l.replace("%", "") / 100 : this.colors.hsl.l;
              this.colorChange({ h: e2.h || this.colors.hsl.h, s: t2, l: n2, source: "hsl" });
            }
          }
        }, toggleViews: function() {
          if (this.fieldsIndex >= 2)
            return void (this.fieldsIndex = 0);
          this.fieldsIndex++;
        }, showHighlight: function() {
          this.highlight = true;
        }, hideHighlight: function() {
          this.highlight = false;
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(5), o = r(i), a = n(3), s = r(a), c = ["#FF6900", "#FCB900", "#7BDCB5", "#00D084", "#8ED1FC", "#0693E3", "#ABB8C3", "#EB144C", "#F78DA7", "#9900EF"];
        t.default = { name: "Twitter", mixins: [s.default], components: { editableInput: o.default }, props: { width: { type: [String, Number], default: 276 }, defaultColors: { type: Array, default: function() {
          return c;
        } }, triangle: { default: "top-left", validator: function(e2) {
          return ["hide", "top-left", "top-right"].includes(e2);
        } } }, computed: { hsv: function() {
          var e2 = this.colors.hsv;
          return { h: e2.h.toFixed(), s: (100 * e2.s).toFixed(), v: (100 * e2.v).toFixed() };
        }, hex: function() {
          var e2 = this.colors.hex;
          return e2 && e2.replace("#", "");
        } }, methods: { equal: function(e2) {
          return e2.toLowerCase() === this.colors.hex.toLowerCase();
        }, handlerClick: function(e2) {
          this.colorChange({ hex: e2, source: "hex" });
        }, inputChange: function(e2) {
          e2 && (e2["#"] ? this.isValidHex(e2["#"]) && this.colorChange({ hex: e2["#"], source: "hex" }) : e2.r || e2.g || e2.b || e2.a ? this.colorChange({ r: e2.r || this.colors.rgba.r, g: e2.g || this.colors.rgba.g, b: e2.b || this.colors.rgba.b, a: e2.a || this.colors.rgba.a, source: "rgba" }) : (e2.h || e2.s || e2.v) && this.colorChange({ h: e2.h || this.colors.hsv.h, s: e2.s / 100 || this.colors.hsv.s, v: e2.v / 100 || this.colors.hsv.v, source: "hsv" }));
        } } };
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        var i = n(61), o = r(i), a = n(70), s = r(a), c = n(74), l = r(c), u = n(78), f = r(u), d = n(115), h2 = r(d), p2 = n(120), v = r(p2), g = n(135), b = r(g), x = n(139), m = r(x), _ = n(143), w = r(_), y = n(21), C = r(y), k = n(22), F = r(k), S = n(5), A = r(S), O = n(13), E = r(O), M = n(20), j = r(M), L = n(3), P = r(L), R = { version: "2.8.1", Compact: o.default, Grayscale: s.default, Twitter: w.default, Material: l.default, Slider: f.default, Swatches: h2.default, Photoshop: v.default, Sketch: b.default, Chrome: m.default, Alpha: C.default, Checkboard: F.default, EditableInput: A.default, Hue: E.default, Saturation: j.default, ColorMixin: P.default };
        e.exports = R;
      }, function(e, t, n) {
        function r(e2) {
          n(62);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(35), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(69), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Compact.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(63);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("6ce8a5a8", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-compact {\n  padding-top: 5px;\n  padding-left: 5px;\n  width: 245px;\n  border-radius: 2px;\n  box-sizing: border-box;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-compact-colors {\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-compact-color-item {\n  list-style: none;\n  width: 15px;\n  height: 15px;\n  float: left;\n  margin-right: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  cursor: pointer;\n}\n.vc-compact-color-item--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-compact-color-item--white .vc-compact-dot {\n  background: #000;\n}\n.vc-compact-dot {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  bottom: 5px;\n  left: 5px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n", ""]);
      }, function(e, t) {
        e.exports = function(e2, t2) {
          for (var n = [], r = {}, i = 0; i < t2.length; i++) {
            var o = t2[i], a = o[0], s = o[1], c = o[2], l = o[3], u = { id: e2 + ":" + i, css: s, media: c, sourceMap: l };
            r[a] ? r[a].parts.push(u) : n.push(r[a] = { id: a, parts: [u] });
          }
          return n;
        };
      }, function(e, t, n) {
        var r;
        !function(i) {
          function o(e2, t2) {
            if (e2 = e2 || "", t2 = t2 || {}, e2 instanceof o)
              return e2;
            if (!(this instanceof o))
              return new o(e2, t2);
            var n2 = a(e2);
            this._originalInput = e2, this._r = n2.r, this._g = n2.g, this._b = n2.b, this._a = n2.a, this._roundA = G(100 * this._a) / 100, this._format = t2.format || n2.format, this._gradientType = t2.gradientType, this._r < 1 && (this._r = G(this._r)), this._g < 1 && (this._g = G(this._g)), this._b < 1 && (this._b = G(this._b)), this._ok = n2.ok, this._tc_id = U++;
          }
          function a(e2) {
            var t2 = { r: 0, g: 0, b: 0 }, n2 = 1, r2 = null, i2 = null, o2 = null, a2 = false, c2 = false;
            return "string" == typeof e2 && (e2 = N(e2)), "object" == typeof e2 && (H(e2.r) && H(e2.g) && H(e2.b) ? (t2 = s(e2.r, e2.g, e2.b), a2 = true, c2 = "%" === String(e2.r).substr(-1) ? "prgb" : "rgb") : H(e2.h) && H(e2.s) && H(e2.v) ? (r2 = D(e2.s), i2 = D(e2.v), t2 = f(e2.h, r2, i2), a2 = true, c2 = "hsv") : H(e2.h) && H(e2.s) && H(e2.l) && (r2 = D(e2.s), o2 = D(e2.l), t2 = l(e2.h, r2, o2), a2 = true, c2 = "hsl"), e2.hasOwnProperty("a") && (n2 = e2.a)), n2 = O(n2), { ok: a2, format: e2.format || c2, r: V(255, q(t2.r, 0)), g: V(255, q(t2.g, 0)), b: V(255, q(t2.b, 0)), a: n2 };
          }
          function s(e2, t2, n2) {
            return { r: 255 * E(e2, 255), g: 255 * E(t2, 255), b: 255 * E(n2, 255) };
          }
          function c(e2, t2, n2) {
            e2 = E(e2, 255), t2 = E(t2, 255), n2 = E(n2, 255);
            var r2, i2, o2 = q(e2, t2, n2), a2 = V(e2, t2, n2), s2 = (o2 + a2) / 2;
            if (o2 == a2)
              r2 = i2 = 0;
            else {
              var c2 = o2 - a2;
              switch (i2 = s2 > 0.5 ? c2 / (2 - o2 - a2) : c2 / (o2 + a2), o2) {
                case e2:
                  r2 = (t2 - n2) / c2 + (t2 < n2 ? 6 : 0);
                  break;
                case t2:
                  r2 = (n2 - e2) / c2 + 2;
                  break;
                case n2:
                  r2 = (e2 - t2) / c2 + 4;
              }
              r2 /= 6;
            }
            return { h: r2, s: i2, l: s2 };
          }
          function l(e2, t2, n2) {
            function r2(e3, t3, n3) {
              return n3 < 0 && (n3 += 1), n3 > 1 && (n3 -= 1), n3 < 1 / 6 ? e3 + 6 * (t3 - e3) * n3 : n3 < 0.5 ? t3 : n3 < 2 / 3 ? e3 + (t3 - e3) * (2 / 3 - n3) * 6 : e3;
            }
            var i2, o2, a2;
            if (e2 = E(e2, 360), t2 = E(t2, 100), n2 = E(n2, 100), 0 === t2)
              i2 = o2 = a2 = n2;
            else {
              var s2 = n2 < 0.5 ? n2 * (1 + t2) : n2 + t2 - n2 * t2, c2 = 2 * n2 - s2;
              i2 = r2(c2, s2, e2 + 1 / 3), o2 = r2(c2, s2, e2), a2 = r2(c2, s2, e2 - 1 / 3);
            }
            return { r: 255 * i2, g: 255 * o2, b: 255 * a2 };
          }
          function u(e2, t2, n2) {
            e2 = E(e2, 255), t2 = E(t2, 255), n2 = E(n2, 255);
            var r2, i2, o2 = q(e2, t2, n2), a2 = V(e2, t2, n2), s2 = o2, c2 = o2 - a2;
            if (i2 = 0 === o2 ? 0 : c2 / o2, o2 == a2)
              r2 = 0;
            else {
              switch (o2) {
                case e2:
                  r2 = (t2 - n2) / c2 + (t2 < n2 ? 6 : 0);
                  break;
                case t2:
                  r2 = (n2 - e2) / c2 + 2;
                  break;
                case n2:
                  r2 = (e2 - t2) / c2 + 4;
              }
              r2 /= 6;
            }
            return { h: r2, s: i2, v: s2 };
          }
          function f(e2, t2, n2) {
            e2 = 6 * E(e2, 360), t2 = E(t2, 100), n2 = E(n2, 100);
            var r2 = i.floor(e2), o2 = e2 - r2, a2 = n2 * (1 - t2), s2 = n2 * (1 - o2 * t2), c2 = n2 * (1 - (1 - o2) * t2), l2 = r2 % 6;
            return { r: 255 * [n2, s2, a2, a2, c2, n2][l2], g: 255 * [c2, n2, n2, s2, a2, a2][l2], b: 255 * [a2, a2, c2, n2, n2, s2][l2] };
          }
          function d(e2, t2, n2, r2) {
            var i2 = [R(G(e2).toString(16)), R(G(t2).toString(16)), R(G(n2).toString(16))];
            return r2 && i2[0].charAt(0) == i2[0].charAt(1) && i2[1].charAt(0) == i2[1].charAt(1) && i2[2].charAt(0) == i2[2].charAt(1) ? i2[0].charAt(0) + i2[1].charAt(0) + i2[2].charAt(0) : i2.join("");
          }
          function h2(e2, t2, n2, r2, i2) {
            var o2 = [R(G(e2).toString(16)), R(G(t2).toString(16)), R(G(n2).toString(16)), R(B(r2))];
            return i2 && o2[0].charAt(0) == o2[0].charAt(1) && o2[1].charAt(0) == o2[1].charAt(1) && o2[2].charAt(0) == o2[2].charAt(1) && o2[3].charAt(0) == o2[3].charAt(1) ? o2[0].charAt(0) + o2[1].charAt(0) + o2[2].charAt(0) + o2[3].charAt(0) : o2.join("");
          }
          function p2(e2, t2, n2, r2) {
            return [R(B(r2)), R(G(e2).toString(16)), R(G(t2).toString(16)), R(G(n2).toString(16))].join("");
          }
          function v(e2, t2) {
            t2 = 0 === t2 ? 0 : t2 || 10;
            var n2 = o(e2).toHsl();
            return n2.s -= t2 / 100, n2.s = M(n2.s), o(n2);
          }
          function g(e2, t2) {
            t2 = 0 === t2 ? 0 : t2 || 10;
            var n2 = o(e2).toHsl();
            return n2.s += t2 / 100, n2.s = M(n2.s), o(n2);
          }
          function b(e2) {
            return o(e2).desaturate(100);
          }
          function x(e2, t2) {
            t2 = 0 === t2 ? 0 : t2 || 10;
            var n2 = o(e2).toHsl();
            return n2.l += t2 / 100, n2.l = M(n2.l), o(n2);
          }
          function m(e2, t2) {
            t2 = 0 === t2 ? 0 : t2 || 10;
            var n2 = o(e2).toRgb();
            return n2.r = q(0, V(255, n2.r - G(-t2 / 100 * 255))), n2.g = q(0, V(255, n2.g - G(-t2 / 100 * 255))), n2.b = q(0, V(255, n2.b - G(-t2 / 100 * 255))), o(n2);
          }
          function _(e2, t2) {
            t2 = 0 === t2 ? 0 : t2 || 10;
            var n2 = o(e2).toHsl();
            return n2.l -= t2 / 100, n2.l = M(n2.l), o(n2);
          }
          function w(e2, t2) {
            var n2 = o(e2).toHsl(), r2 = (n2.h + t2) % 360;
            return n2.h = r2 < 0 ? 360 + r2 : r2, o(n2);
          }
          function y(e2) {
            var t2 = o(e2).toHsl();
            return t2.h = (t2.h + 180) % 360, o(t2);
          }
          function C(e2) {
            var t2 = o(e2).toHsl(), n2 = t2.h;
            return [o(e2), o({ h: (n2 + 120) % 360, s: t2.s, l: t2.l }), o({ h: (n2 + 240) % 360, s: t2.s, l: t2.l })];
          }
          function k(e2) {
            var t2 = o(e2).toHsl(), n2 = t2.h;
            return [o(e2), o({ h: (n2 + 90) % 360, s: t2.s, l: t2.l }), o({ h: (n2 + 180) % 360, s: t2.s, l: t2.l }), o({ h: (n2 + 270) % 360, s: t2.s, l: t2.l })];
          }
          function F(e2) {
            var t2 = o(e2).toHsl(), n2 = t2.h;
            return [o(e2), o({ h: (n2 + 72) % 360, s: t2.s, l: t2.l }), o({ h: (n2 + 216) % 360, s: t2.s, l: t2.l })];
          }
          function S(e2, t2, n2) {
            t2 = t2 || 6, n2 = n2 || 30;
            var r2 = o(e2).toHsl(), i2 = 360 / n2, a2 = [o(e2)];
            for (r2.h = (r2.h - (i2 * t2 >> 1) + 720) % 360; --t2; )
              r2.h = (r2.h + i2) % 360, a2.push(o(r2));
            return a2;
          }
          function A(e2, t2) {
            t2 = t2 || 6;
            for (var n2 = o(e2).toHsv(), r2 = n2.h, i2 = n2.s, a2 = n2.v, s2 = [], c2 = 1 / t2; t2--; )
              s2.push(o({ h: r2, s: i2, v: a2 })), a2 = (a2 + c2) % 1;
            return s2;
          }
          function O(e2) {
            return e2 = parseFloat(e2), (isNaN(e2) || e2 < 0 || e2 > 1) && (e2 = 1), e2;
          }
          function E(e2, t2) {
            L(e2) && (e2 = "100%");
            var n2 = P(e2);
            return e2 = V(t2, q(0, parseFloat(e2))), n2 && (e2 = parseInt(e2 * t2, 10) / 100), i.abs(e2 - t2) < 1e-6 ? 1 : e2 % t2 / parseFloat(t2);
          }
          function M(e2) {
            return V(1, q(0, e2));
          }
          function j(e2) {
            return parseInt(e2, 16);
          }
          function L(e2) {
            return "string" == typeof e2 && -1 != e2.indexOf(".") && 1 === parseFloat(e2);
          }
          function P(e2) {
            return "string" == typeof e2 && -1 != e2.indexOf("%");
          }
          function R(e2) {
            return 1 == e2.length ? "0" + e2 : "" + e2;
          }
          function D(e2) {
            return e2 <= 1 && (e2 = 100 * e2 + "%"), e2;
          }
          function B(e2) {
            return i.round(255 * parseFloat(e2)).toString(16);
          }
          function T(e2) {
            return j(e2) / 255;
          }
          function H(e2) {
            return !!J.CSS_UNIT.exec(e2);
          }
          function N(e2) {
            e2 = e2.replace(I, "").replace($2, "").toLowerCase();
            var t2 = false;
            if (W[e2])
              e2 = W[e2], t2 = true;
            else if ("transparent" == e2)
              return { r: 0, g: 0, b: 0, a: 0, format: "name" };
            var n2;
            return (n2 = J.rgb.exec(e2)) ? { r: n2[1], g: n2[2], b: n2[3] } : (n2 = J.rgba.exec(e2)) ? { r: n2[1], g: n2[2], b: n2[3], a: n2[4] } : (n2 = J.hsl.exec(e2)) ? { h: n2[1], s: n2[2], l: n2[3] } : (n2 = J.hsla.exec(e2)) ? { h: n2[1], s: n2[2], l: n2[3], a: n2[4] } : (n2 = J.hsv.exec(e2)) ? { h: n2[1], s: n2[2], v: n2[3] } : (n2 = J.hsva.exec(e2)) ? { h: n2[1], s: n2[2], v: n2[3], a: n2[4] } : (n2 = J.hex8.exec(e2)) ? { r: j(n2[1]), g: j(n2[2]), b: j(n2[3]), a: T(n2[4]), format: t2 ? "name" : "hex8" } : (n2 = J.hex6.exec(e2)) ? { r: j(n2[1]), g: j(n2[2]), b: j(n2[3]), format: t2 ? "name" : "hex" } : (n2 = J.hex4.exec(e2)) ? { r: j(n2[1] + "" + n2[1]), g: j(n2[2] + "" + n2[2]), b: j(n2[3] + "" + n2[3]), a: T(n2[4] + "" + n2[4]), format: t2 ? "name" : "hex8" } : !!(n2 = J.hex3.exec(e2)) && { r: j(n2[1] + "" + n2[1]), g: j(n2[2] + "" + n2[2]), b: j(n2[3] + "" + n2[3]), format: t2 ? "name" : "hex" };
          }
          function z(e2) {
            var t2, n2;
            return e2 = e2 || { level: "AA", size: "small" }, t2 = (e2.level || "AA").toUpperCase(), n2 = (e2.size || "small").toLowerCase(), "AA" !== t2 && "AAA" !== t2 && (t2 = "AA"), "small" !== n2 && "large" !== n2 && (n2 = "small"), { level: t2, size: n2 };
          }
          var I = /^\s+/, $2 = /\s+$/, U = 0, G = i.round, V = i.min, q = i.max, X = i.random;
          o.prototype = { isDark: function() {
            return this.getBrightness() < 128;
          }, isLight: function() {
            return !this.isDark();
          }, isValid: function() {
            return this._ok;
          }, getOriginalInput: function() {
            return this._originalInput;
          }, getFormat: function() {
            return this._format;
          }, getAlpha: function() {
            return this._a;
          }, getBrightness: function() {
            var e2 = this.toRgb();
            return (299 * e2.r + 587 * e2.g + 114 * e2.b) / 1e3;
          }, getLuminance: function() {
            var e2, t2, n2, r2, o2, a2, s2 = this.toRgb();
            return e2 = s2.r / 255, t2 = s2.g / 255, n2 = s2.b / 255, r2 = e2 <= 0.03928 ? e2 / 12.92 : i.pow((e2 + 0.055) / 1.055, 2.4), o2 = t2 <= 0.03928 ? t2 / 12.92 : i.pow((t2 + 0.055) / 1.055, 2.4), a2 = n2 <= 0.03928 ? n2 / 12.92 : i.pow((n2 + 0.055) / 1.055, 2.4), 0.2126 * r2 + 0.7152 * o2 + 0.0722 * a2;
          }, setAlpha: function(e2) {
            return this._a = O(e2), this._roundA = G(100 * this._a) / 100, this;
          }, toHsv: function() {
            var e2 = u(this._r, this._g, this._b);
            return { h: 360 * e2.h, s: e2.s, v: e2.v, a: this._a };
          }, toHsvString: function() {
            var e2 = u(this._r, this._g, this._b), t2 = G(360 * e2.h), n2 = G(100 * e2.s), r2 = G(100 * e2.v);
            return 1 == this._a ? "hsv(" + t2 + ", " + n2 + "%, " + r2 + "%)" : "hsva(" + t2 + ", " + n2 + "%, " + r2 + "%, " + this._roundA + ")";
          }, toHsl: function() {
            var e2 = c(this._r, this._g, this._b);
            return { h: 360 * e2.h, s: e2.s, l: e2.l, a: this._a };
          }, toHslString: function() {
            var e2 = c(this._r, this._g, this._b), t2 = G(360 * e2.h), n2 = G(100 * e2.s), r2 = G(100 * e2.l);
            return 1 == this._a ? "hsl(" + t2 + ", " + n2 + "%, " + r2 + "%)" : "hsla(" + t2 + ", " + n2 + "%, " + r2 + "%, " + this._roundA + ")";
          }, toHex: function(e2) {
            return d(this._r, this._g, this._b, e2);
          }, toHexString: function(e2) {
            return "#" + this.toHex(e2);
          }, toHex8: function(e2) {
            return h2(this._r, this._g, this._b, this._a, e2);
          }, toHex8String: function(e2) {
            return "#" + this.toHex8(e2);
          }, toRgb: function() {
            return { r: G(this._r), g: G(this._g), b: G(this._b), a: this._a };
          }, toRgbString: function() {
            return 1 == this._a ? "rgb(" + G(this._r) + ", " + G(this._g) + ", " + G(this._b) + ")" : "rgba(" + G(this._r) + ", " + G(this._g) + ", " + G(this._b) + ", " + this._roundA + ")";
          }, toPercentageRgb: function() {
            return { r: G(100 * E(this._r, 255)) + "%", g: G(100 * E(this._g, 255)) + "%", b: G(100 * E(this._b, 255)) + "%", a: this._a };
          }, toPercentageRgbString: function() {
            return 1 == this._a ? "rgb(" + G(100 * E(this._r, 255)) + "%, " + G(100 * E(this._g, 255)) + "%, " + G(100 * E(this._b, 255)) + "%)" : "rgba(" + G(100 * E(this._r, 255)) + "%, " + G(100 * E(this._g, 255)) + "%, " + G(100 * E(this._b, 255)) + "%, " + this._roundA + ")";
          }, toName: function() {
            return 0 === this._a ? "transparent" : !(this._a < 1) && (Y[d(this._r, this._g, this._b, true)] || false);
          }, toFilter: function(e2) {
            var t2 = "#" + p2(this._r, this._g, this._b, this._a), n2 = t2, r2 = this._gradientType ? "GradientType = 1, " : "";
            if (e2) {
              var i2 = o(e2);
              n2 = "#" + p2(i2._r, i2._g, i2._b, i2._a);
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + r2 + "startColorstr=" + t2 + ",endColorstr=" + n2 + ")";
          }, toString: function(e2) {
            var t2 = !!e2;
            e2 = e2 || this._format;
            var n2 = false, r2 = this._a < 1 && this._a >= 0;
            return t2 || !r2 || "hex" !== e2 && "hex6" !== e2 && "hex3" !== e2 && "hex4" !== e2 && "hex8" !== e2 && "name" !== e2 ? ("rgb" === e2 && (n2 = this.toRgbString()), "prgb" === e2 && (n2 = this.toPercentageRgbString()), "hex" !== e2 && "hex6" !== e2 || (n2 = this.toHexString()), "hex3" === e2 && (n2 = this.toHexString(true)), "hex4" === e2 && (n2 = this.toHex8String(true)), "hex8" === e2 && (n2 = this.toHex8String()), "name" === e2 && (n2 = this.toName()), "hsl" === e2 && (n2 = this.toHslString()), "hsv" === e2 && (n2 = this.toHsvString()), n2 || this.toHexString()) : "name" === e2 && 0 === this._a ? this.toName() : this.toRgbString();
          }, clone: function() {
            return o(this.toString());
          }, _applyModification: function(e2, t2) {
            var n2 = e2.apply(null, [this].concat([].slice.call(t2)));
            return this._r = n2._r, this._g = n2._g, this._b = n2._b, this.setAlpha(n2._a), this;
          }, lighten: function() {
            return this._applyModification(x, arguments);
          }, brighten: function() {
            return this._applyModification(m, arguments);
          }, darken: function() {
            return this._applyModification(_, arguments);
          }, desaturate: function() {
            return this._applyModification(v, arguments);
          }, saturate: function() {
            return this._applyModification(g, arguments);
          }, greyscale: function() {
            return this._applyModification(b, arguments);
          }, spin: function() {
            return this._applyModification(w, arguments);
          }, _applyCombination: function(e2, t2) {
            return e2.apply(null, [this].concat([].slice.call(t2)));
          }, analogous: function() {
            return this._applyCombination(S, arguments);
          }, complement: function() {
            return this._applyCombination(y, arguments);
          }, monochromatic: function() {
            return this._applyCombination(A, arguments);
          }, splitcomplement: function() {
            return this._applyCombination(F, arguments);
          }, triad: function() {
            return this._applyCombination(C, arguments);
          }, tetrad: function() {
            return this._applyCombination(k, arguments);
          } }, o.fromRatio = function(e2, t2) {
            if ("object" == typeof e2) {
              var n2 = {};
              for (var r2 in e2)
                e2.hasOwnProperty(r2) && (n2[r2] = "a" === r2 ? e2[r2] : D(e2[r2]));
              e2 = n2;
            }
            return o(e2, t2);
          }, o.equals = function(e2, t2) {
            return !(!e2 || !t2) && o(e2).toRgbString() == o(t2).toRgbString();
          }, o.random = function() {
            return o.fromRatio({ r: X(), g: X(), b: X() });
          }, o.mix = function(e2, t2, n2) {
            n2 = 0 === n2 ? 0 : n2 || 50;
            var r2 = o(e2).toRgb(), i2 = o(t2).toRgb(), a2 = n2 / 100;
            return o({ r: (i2.r - r2.r) * a2 + r2.r, g: (i2.g - r2.g) * a2 + r2.g, b: (i2.b - r2.b) * a2 + r2.b, a: (i2.a - r2.a) * a2 + r2.a });
          }, o.readability = function(e2, t2) {
            var n2 = o(e2), r2 = o(t2);
            return (i.max(n2.getLuminance(), r2.getLuminance()) + 0.05) / (i.min(n2.getLuminance(), r2.getLuminance()) + 0.05);
          }, o.isReadable = function(e2, t2, n2) {
            var r2, i2, a2 = o.readability(e2, t2);
            switch (i2 = false, r2 = z(n2), r2.level + r2.size) {
              case "AAsmall":
              case "AAAlarge":
                i2 = a2 >= 4.5;
                break;
              case "AAlarge":
                i2 = a2 >= 3;
                break;
              case "AAAsmall":
                i2 = a2 >= 7;
            }
            return i2;
          }, o.mostReadable = function(e2, t2, n2) {
            var r2, i2, a2, s2, c2 = null, l2 = 0;
            n2 = n2 || {}, i2 = n2.includeFallbackColors, a2 = n2.level, s2 = n2.size;
            for (var u2 = 0; u2 < t2.length; u2++)
              (r2 = o.readability(e2, t2[u2])) > l2 && (l2 = r2, c2 = o(t2[u2]));
            return o.isReadable(e2, c2, { level: a2, size: s2 }) || !i2 ? c2 : (n2.includeFallbackColors = false, o.mostReadable(e2, ["#fff", "#000"], n2));
          };
          var W = o.names = { aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "0ff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000", blanchedalmond: "ffebcd", blue: "00f", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", burntsienna: "ea7e5d", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "0ff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "f0f", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "789", lightslategrey: "789", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "0f0", limegreen: "32cd32", linen: "faf0e6", magenta: "f0f", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", rebeccapurple: "663399", red: "f00", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "fff", whitesmoke: "f5f5f5", yellow: "ff0", yellowgreen: "9acd32" }, Y = o.hexNames = function(e2) {
            var t2 = {};
            for (var n2 in e2)
              e2.hasOwnProperty(n2) && (t2[e2[n2]] = n2);
            return t2;
          }(W), J = function() {
            var e2 = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)", t2 = "[\\s|\\(]+(" + e2 + ")[,|\\s]+(" + e2 + ")[,|\\s]+(" + e2 + ")\\s*\\)?", n2 = "[\\s|\\(]+(" + e2 + ")[,|\\s]+(" + e2 + ")[,|\\s]+(" + e2 + ")[,|\\s]+(" + e2 + ")\\s*\\)?";
            return { CSS_UNIT: new RegExp(e2), rgb: new RegExp("rgb" + t2), rgba: new RegExp("rgba" + n2), hsl: new RegExp("hsl" + t2), hsla: new RegExp("hsla" + n2), hsv: new RegExp("hsv" + t2), hsva: new RegExp("hsva" + n2), hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ };
          }();
          void 0 !== e && e.exports ? e.exports = o : void 0 !== (r = function() {
            return o;
          }.call(t, n, t, e)) && (e.exports = r);
        }(Math);
      }, function(e, t, n) {
        var r = n(67);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("0f73e73c", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-editable-input" }, [n2("input", { directives: [{ name: "model", rawName: "v-model", value: e2.val, expression: "val" }], ref: "input", staticClass: "vc-input__input", attrs: { "aria-labelledby": e2.labelId }, domProps: { value: e2.val }, on: { keydown: e2.handleKeyDown, input: [function(t3) {
            t3.target.composing || (e2.val = t3.target.value);
          }, e2.update] } }), e2._v(" "), n2("span", { staticClass: "vc-input__label", attrs: { for: e2.label, id: e2.labelId } }, [e2._v(e2._s(e2.labelSpanText))]), e2._v(" "), n2("span", { staticClass: "vc-input__desc" }, [e2._v(e2._s(e2.desc))])]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-compact", attrs: { role: "application", "aria-label": "Compact color picker" } }, [n2("ul", { staticClass: "vc-compact-colors", attrs: { role: "listbox" } }, e2._l(e2.paletteUpperCase(e2.palette), function(t3) {
            return n2("li", { key: t3, staticClass: "vc-compact-color-item", class: { "vc-compact-color-item--white": "#FFFFFF" === t3 }, style: { background: t3 }, attrs: { role: "option", "aria-label": "color:" + t3, "aria-selected": t3 === e2.pick }, on: { click: function(n3) {
              return e2.handlerClick(t3);
            } } }, [n2("div", { directives: [{ name: "show", rawName: "v-show", value: t3 === e2.pick, expression: "c === pick" }], staticClass: "vc-compact-dot" })]);
          }), 0)]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(71);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(37), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(73), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Grayscale.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(72);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("21ddbb74", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-grayscale {\n  width: 125px;\n  border-radius: 2px;\n  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-grayscale-colors {\n  border-radius: 2px;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-grayscale-color-item {\n  list-style: none;\n  width: 25px;\n  height: 25px;\n  float: left;\n  position: relative;\n  cursor: pointer;\n}\n.vc-grayscale-color-item--white .vc-grayscale-dot {\n  background: #000;\n}\n.vc-grayscale-dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 6px;\n  height: 6px;\n  margin: -3px 0 0 -2px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-grayscale", attrs: { role: "application", "aria-label": "Grayscale color picker" } }, [n2("ul", { staticClass: "vc-grayscale-colors", attrs: { role: "listbox" } }, e2._l(e2.paletteUpperCase(e2.palette), function(t3) {
            return n2("li", { key: t3, staticClass: "vc-grayscale-color-item", class: { "vc-grayscale-color-item--white": "#FFFFFF" == t3 }, style: { background: t3 }, attrs: { role: "option", "aria-label": "Color:" + t3, "aria-selected": t3 === e2.pick }, on: { click: function(n3) {
              return e2.handlerClick(t3);
            } } }, [n2("div", { directives: [{ name: "show", rawName: "v-show", value: t3 === e2.pick, expression: "c === pick" }], staticClass: "vc-grayscale-dot" })]);
          }), 0)]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(75);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(38), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(77), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Material.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(76);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("1ff3af73", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, '\n.vc-material {\n  width: 98px;\n  height: 98px;\n  padding: 16px;\n  font-family: "Roboto";\n  position: relative;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-material .vc-input__input {\n  width: 100%;\n  margin-top: 12px;\n  font-size: 15px;\n  color: #333;\n  height: 30px;\n}\n.vc-material .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 11px;\n  color: #999;\n  text-transform: capitalize;\n}\n.vc-material-hex {\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n}\n.vc-material-split {\n  display: flex;\n  margin-right: -10px;\n  padding-top: 11px;\n}\n.vc-material-third {\n  flex: 1;\n  padding-right: 10px;\n}\n', ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-material", attrs: { role: "application", "aria-label": "Material color picker" } }, [n2("ed-in", { staticClass: "vc-material-hex", style: { borderColor: e2.colors.hex }, attrs: { label: "hex" }, on: { change: e2.onChange }, model: { value: e2.colors.hex, callback: function(t3) {
            e2.$set(e2.colors, "hex", t3);
          }, expression: "colors.hex" } }), e2._v(" "), n2("div", { staticClass: "vc-material-split" }, [n2("div", { staticClass: "vc-material-third" }, [n2("ed-in", { attrs: { label: "r" }, on: { change: e2.onChange }, model: { value: e2.colors.rgba.r, callback: function(t3) {
            e2.$set(e2.colors.rgba, "r", t3);
          }, expression: "colors.rgba.r" } })], 1), e2._v(" "), n2("div", { staticClass: "vc-material-third" }, [n2("ed-in", { attrs: { label: "g" }, on: { change: e2.onChange }, model: { value: e2.colors.rgba.g, callback: function(t3) {
            e2.$set(e2.colors.rgba, "g", t3);
          }, expression: "colors.rgba.g" } })], 1), e2._v(" "), n2("div", { staticClass: "vc-material-third" }, [n2("ed-in", { attrs: { label: "b" }, on: { change: e2.onChange }, model: { value: e2.colors.rgba.b, callback: function(t3) {
            e2.$set(e2.colors.rgba, "b", t3);
          }, expression: "colors.rgba.b" } })], 1)])], 1);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(79);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(39), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(114), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Slider.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(80);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("7982aa43", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-slider {\n  position: relative;\n  width: 410px;\n}\n.vc-slider-hue-warp {\n  height: 12px;\n  position: relative;\n}\n.vc-slider-hue-warp .vc-hue-picker {\n  width: 14px;\n  height: 14px;\n  border-radius: 6px;\n  transform: translate(-7px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-slider-swatches {\n  display: flex;\n  margin-top: 20px;\n}\n.vc-slider-swatch {\n  margin-right: 1px;\n  flex: 1;\n  width: 20%;\n}\n.vc-slider-swatch:first-child {\n  margin-right: 1px;\n}\n.vc-slider-swatch:first-child .vc-slider-swatch-picker {\n  border-radius: 2px 0px 0px 2px;\n}\n.vc-slider-swatch:last-child {\n  margin-right: 0;\n}\n.vc-slider-swatch:last-child .vc-slider-swatch-picker {\n  border-radius: 0px 2px 2px 0px;\n}\n.vc-slider-swatch-picker {\n  cursor: pointer;\n  height: 12px;\n}\n.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {\n  transform: scaleY(1.8);\n  border-radius: 3.6px/2px;\n}\n.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 0.6px #ddd;\n}\n", ""]);
      }, function(e, t, n) {
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        t.__esModule = true;
        var i = n(82), o = r(i), a = n(100), s = r(a), c = "function" == typeof s.default && "symbol" == typeof o.default ? function(e2) {
          return typeof e2;
        } : function(e2) {
          return e2 && "function" == typeof s.default && e2.constructor === s.default && e2 !== s.default.prototype ? "symbol" : typeof e2;
        };
        t.default = "function" == typeof s.default && "symbol" === c(o.default) ? function(e2) {
          return void 0 === e2 ? "undefined" : c(e2);
        } : function(e2) {
          return e2 && "function" == typeof s.default && e2.constructor === s.default && e2 !== s.default.prototype ? "symbol" : void 0 === e2 ? "undefined" : c(e2);
        };
      }, function(e, t, n) {
        e.exports = { default: n(83), __esModule: true };
      }, function(e, t, n) {
        n(84), n(96), e.exports = n(32).f("iterator");
      }, function(e, t, n) {
        var r = n(85)(true);
        n(40)(String, "String", function(e2) {
          this._t = String(e2), this._i = 0;
        }, function() {
          var e2, t2 = this._t, n2 = this._i;
          return n2 >= t2.length ? { value: void 0, done: true } : (e2 = r(t2, n2), this._i += e2.length, { value: e2, done: false });
        });
      }, function(e, t, n) {
        var r = n(23), i = n(24);
        e.exports = function(e2) {
          return function(t2, n2) {
            var o, a, s = String(i(t2)), c = r(n2), l = s.length;
            return c < 0 || c >= l ? e2 ? "" : void 0 : (o = s.charCodeAt(c), o < 55296 || o > 56319 || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e2 ? s.charAt(c) : o : e2 ? s.slice(c, c + 2) : a - 56320 + (o - 55296 << 10) + 65536);
          };
        };
      }, function(e, t, n) {
        var r = n(87);
        e.exports = function(e2, t2, n2) {
          if (r(e2), void 0 === t2)
            return e2;
          switch (n2) {
            case 1:
              return function(n3) {
                return e2.call(t2, n3);
              };
            case 2:
              return function(n3, r2) {
                return e2.call(t2, n3, r2);
              };
            case 3:
              return function(n3, r2, i) {
                return e2.call(t2, n3, r2, i);
              };
          }
          return function() {
            return e2.apply(t2, arguments);
          };
        };
      }, function(e, t) {
        e.exports = function(e2) {
          if ("function" != typeof e2)
            throw TypeError(e2 + " is not a function!");
          return e2;
        };
      }, function(e, t, n) {
        var r = n(45), i = n(18), o = n(31), a = {};
        n(7)(a, n(11)("iterator"), function() {
          return this;
        }), e.exports = function(e2, t2, n2) {
          e2.prototype = r(a, { next: i(1, n2) }), o(e2, t2 + " Iterator");
        };
      }, function(e, t, n) {
        var r = n(8), i = n(16), o = n(27);
        e.exports = n(9) ? Object.defineProperties : function(e2, t2) {
          i(e2);
          for (var n2, a = o(t2), s = a.length, c = 0; s > c; )
            r.f(e2, n2 = a[c++], t2[n2]);
          return e2;
        };
      }, function(e, t, n) {
        var r = n(47);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e2) {
          return "String" == r(e2) ? e2.split("") : Object(e2);
        };
      }, function(e, t, n) {
        var r = n(10), i = n(92), o = n(93);
        e.exports = function(e2) {
          return function(t2, n2, a) {
            var s, c = r(t2), l = i(c.length), u = o(a, l);
            if (e2 && n2 != n2) {
              for (; l > u; )
                if ((s = c[u++]) != s)
                  return true;
            } else
              for (; l > u; u++)
                if ((e2 || u in c) && c[u] === n2)
                  return e2 || u || 0;
            return !e2 && -1;
          };
        };
      }, function(e, t, n) {
        var r = n(23), i = Math.min;
        e.exports = function(e2) {
          return e2 > 0 ? i(r(e2), 9007199254740991) : 0;
        };
      }, function(e, t, n) {
        var r = n(23), i = Math.max, o = Math.min;
        e.exports = function(e2, t2) {
          return e2 = r(e2), e2 < 0 ? i(e2 + t2, 0) : o(e2, t2);
        };
      }, function(e, t, n) {
        var r = n(4).document;
        e.exports = r && r.documentElement;
      }, function(e, t, n) {
        var r = n(6), i = n(48), o = n(28)("IE_PROTO"), a = Object.prototype;
        e.exports = Object.getPrototypeOf || function(e2) {
          return e2 = i(e2), r(e2, o) ? e2[o] : "function" == typeof e2.constructor && e2 instanceof e2.constructor ? e2.constructor.prototype : e2 instanceof Object ? a : null;
        };
      }, function(e, t, n) {
        n(97);
        for (var r = n(4), i = n(7), o = n(26), a = n(11)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
          var l = s[c], u = r[l], f = u && u.prototype;
          f && !f[a] && i(f, a, l), o[l] = o.Array;
        }
      }, function(e, t, n) {
        var r = n(98), i = n(99), o = n(26), a = n(10);
        e.exports = n(40)(Array, "Array", function(e2, t2) {
          this._t = a(e2), this._i = 0, this._k = t2;
        }, function() {
          var e2 = this._t, t2 = this._k, n2 = this._i++;
          return !e2 || n2 >= e2.length ? (this._t = void 0, i(1)) : "keys" == t2 ? i(0, n2) : "values" == t2 ? i(0, e2[n2]) : i(0, [n2, e2[n2]]);
        }, "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries");
      }, function(e, t) {
        e.exports = function() {
        };
      }, function(e, t) {
        e.exports = function(e2, t2) {
          return { value: t2, done: !!e2 };
        };
      }, function(e, t, n) {
        e.exports = { default: n(101), __esModule: true };
      }, function(e, t, n) {
        n(102), n(108), n(109), n(110), e.exports = n(15).Symbol;
      }, function(e, t, n) {
        var r = n(4), i = n(6), o = n(9), a = n(41), s = n(44), c = n(103).KEY, l = n(17), u = n(29), f = n(31), d = n(19), h2 = n(11), p2 = n(32), v = n(33), g = n(104), b = n(105), x = n(16), m = n(12), _ = n(48), w = n(10), y = n(25), C = n(18), k = n(45), F = n(106), S = n(107), A = n(49), O = n(8), E = n(27), M = S.f, j = O.f, L = F.f, P = r.Symbol, R = r.JSON, D = R && R.stringify, B = h2("_hidden"), T = h2("toPrimitive"), H = {}.propertyIsEnumerable, N = u("symbol-registry"), z = u("symbols"), I = u("op-symbols"), $2 = Object.prototype, U = "function" == typeof P && !!A.f, G = r.QObject, V = !G || !G.prototype || !G.prototype.findChild, q = o && l(function() {
          return 7 != k(j({}, "a", { get: function() {
            return j(this, "a", { value: 7 }).a;
          } })).a;
        }) ? function(e2, t2, n2) {
          var r2 = M($2, t2);
          r2 && delete $2[t2], j(e2, t2, n2), r2 && e2 !== $2 && j($2, t2, r2);
        } : j, X = function(e2) {
          var t2 = z[e2] = k(P.prototype);
          return t2._k = e2, t2;
        }, W = U && "symbol" == typeof P.iterator ? function(e2) {
          return "symbol" == typeof e2;
        } : function(e2) {
          return e2 instanceof P;
        }, Y = function(e2, t2, n2) {
          return e2 === $2 && Y(I, t2, n2), x(e2), t2 = y(t2, true), x(n2), i(z, t2) ? (n2.enumerable ? (i(e2, B) && e2[B][t2] && (e2[B][t2] = false), n2 = k(n2, { enumerable: C(0, false) })) : (i(e2, B) || j(e2, B, C(1, {})), e2[B][t2] = true), q(e2, t2, n2)) : j(e2, t2, n2);
        }, J = function(e2, t2) {
          x(e2);
          for (var n2, r2 = g(t2 = w(t2)), i2 = 0, o2 = r2.length; o2 > i2; )
            Y(e2, n2 = r2[i2++], t2[n2]);
          return e2;
        }, K = function(e2, t2) {
          return void 0 === t2 ? k(e2) : J(k(e2), t2);
        }, Z = function(e2) {
          var t2 = H.call(this, e2 = y(e2, true));
          return !(this === $2 && i(z, e2) && !i(I, e2)) && (!(t2 || !i(this, e2) || !i(z, e2) || i(this, B) && this[B][e2]) || t2);
        }, Q = function(e2, t2) {
          if (e2 = w(e2), t2 = y(t2, true), e2 !== $2 || !i(z, t2) || i(I, t2)) {
            var n2 = M(e2, t2);
            return !n2 || !i(z, t2) || i(e2, B) && e2[B][t2] || (n2.enumerable = true), n2;
          }
        }, ee = function(e2) {
          for (var t2, n2 = L(w(e2)), r2 = [], o2 = 0; n2.length > o2; )
            i(z, t2 = n2[o2++]) || t2 == B || t2 == c || r2.push(t2);
          return r2;
        }, te = function(e2) {
          for (var t2, n2 = e2 === $2, r2 = L(n2 ? I : w(e2)), o2 = [], a2 = 0; r2.length > a2; )
            !i(z, t2 = r2[a2++]) || n2 && !i($2, t2) || o2.push(z[t2]);
          return o2;
        };
        U || (P = function() {
          if (this instanceof P)
            throw TypeError("Symbol is not a constructor!");
          var e2 = d(arguments.length > 0 ? arguments[0] : void 0), t2 = function(n2) {
            this === $2 && t2.call(I, n2), i(this, B) && i(this[B], e2) && (this[B][e2] = false), q(this, e2, C(1, n2));
          };
          return o && V && q($2, e2, { configurable: true, set: t2 }), X(e2);
        }, s(P.prototype, "toString", function() {
          return this._k;
        }), S.f = Q, O.f = Y, n(50).f = F.f = ee, n(34).f = Z, A.f = te, o && !n(14) && s($2, "propertyIsEnumerable", Z, true), p2.f = function(e2) {
          return X(h2(e2));
        }), a(a.G + a.W + a.F * !U, { Symbol: P });
        for (var ne = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), re = 0; ne.length > re; )
          h2(ne[re++]);
        for (var ie = E(h2.store), oe = 0; ie.length > oe; )
          v(ie[oe++]);
        a(a.S + a.F * !U, "Symbol", { for: function(e2) {
          return i(N, e2 += "") ? N[e2] : N[e2] = P(e2);
        }, keyFor: function(e2) {
          if (!W(e2))
            throw TypeError(e2 + " is not a symbol!");
          for (var t2 in N)
            if (N[t2] === e2)
              return t2;
        }, useSetter: function() {
          V = true;
        }, useSimple: function() {
          V = false;
        } }), a(a.S + a.F * !U, "Object", { create: K, defineProperty: Y, defineProperties: J, getOwnPropertyDescriptor: Q, getOwnPropertyNames: ee, getOwnPropertySymbols: te });
        var ae = l(function() {
          A.f(1);
        });
        a(a.S + a.F * ae, "Object", { getOwnPropertySymbols: function(e2) {
          return A.f(_(e2));
        } }), R && a(a.S + a.F * (!U || l(function() {
          var e2 = P();
          return "[null]" != D([e2]) || "{}" != D({ a: e2 }) || "{}" != D(Object(e2));
        })), "JSON", { stringify: function(e2) {
          for (var t2, n2, r2 = [e2], i2 = 1; arguments.length > i2; )
            r2.push(arguments[i2++]);
          if (n2 = t2 = r2[1], (m(t2) || void 0 !== e2) && !W(e2))
            return b(t2) || (t2 = function(e3, t3) {
              if ("function" == typeof n2 && (t3 = n2.call(this, e3, t3)), !W(t3))
                return t3;
            }), r2[1] = t2, D.apply(R, r2);
        } }), P.prototype[T] || n(7)(P.prototype, T, P.prototype.valueOf), f(P, "Symbol"), f(Math, "Math", true), f(r.JSON, "JSON", true);
      }, function(e, t, n) {
        var r = n(19)("meta"), i = n(12), o = n(6), a = n(8).f, s = 0, c = Object.isExtensible || function() {
          return true;
        }, l = !n(17)(function() {
          return c(Object.preventExtensions({}));
        }), u = function(e2) {
          a(e2, r, { value: { i: "O" + ++s, w: {} } });
        }, f = function(e2, t2) {
          if (!i(e2))
            return "symbol" == typeof e2 ? e2 : ("string" == typeof e2 ? "S" : "P") + e2;
          if (!o(e2, r)) {
            if (!c(e2))
              return "F";
            if (!t2)
              return "E";
            u(e2);
          }
          return e2[r].i;
        }, d = function(e2, t2) {
          if (!o(e2, r)) {
            if (!c(e2))
              return true;
            if (!t2)
              return false;
            u(e2);
          }
          return e2[r].w;
        }, h2 = function(e2) {
          return l && p2.NEED && c(e2) && !o(e2, r) && u(e2), e2;
        }, p2 = e.exports = { KEY: r, NEED: false, fastKey: f, getWeak: d, onFreeze: h2 };
      }, function(e, t, n) {
        var r = n(27), i = n(49), o = n(34);
        e.exports = function(e2) {
          var t2 = r(e2), n2 = i.f;
          if (n2)
            for (var a, s = n2(e2), c = o.f, l = 0; s.length > l; )
              c.call(e2, a = s[l++]) && t2.push(a);
          return t2;
        };
      }, function(e, t, n) {
        var r = n(47);
        e.exports = Array.isArray || function(e2) {
          return "Array" == r(e2);
        };
      }, function(e, t, n) {
        var r = n(10), i = n(50).f, o = {}.toString, a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], s = function(e2) {
          try {
            return i(e2);
          } catch (e3) {
            return a.slice();
          }
        };
        e.exports.f = function(e2) {
          return a && "[object Window]" == o.call(e2) ? s(e2) : i(r(e2));
        };
      }, function(e, t, n) {
        var r = n(34), i = n(18), o = n(10), a = n(25), s = n(6), c = n(42), l = Object.getOwnPropertyDescriptor;
        t.f = n(9) ? l : function(e2, t2) {
          if (e2 = o(e2), t2 = a(t2, true), c)
            try {
              return l(e2, t2);
            } catch (e3) {
            }
          if (s(e2, t2))
            return i(!r.f.call(e2, t2), e2[t2]);
        };
      }, function(e, t) {
      }, function(e, t, n) {
        n(33)("asyncIterator");
      }, function(e, t, n) {
        n(33)("observable");
      }, function(e, t, n) {
        var r = n(112);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("7c5f1a1c", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px) ;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { class: ["vc-hue", e2.directionClass] }, [n2("div", { ref: "container", staticClass: "vc-hue-container", attrs: { role: "slider", "aria-valuenow": e2.colors.hsl.h, "aria-valuemin": "0", "aria-valuemax": "360" }, on: { mousedown: e2.handleMouseDown, touchmove: e2.handleChange, touchstart: e2.handleChange } }, [n2("div", { staticClass: "vc-hue-pointer", style: { top: e2.pointerTop, left: e2.pointerLeft }, attrs: { role: "presentation" } }, [n2("div", { staticClass: "vc-hue-picker" })])])]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-slider", attrs: { role: "application", "aria-label": "Slider color picker" } }, [n2("div", { staticClass: "vc-slider-hue-warp" }, [n2("hue", { on: { change: e2.hueChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1), e2._v(" "), n2("div", { staticClass: "vc-slider-swatches", attrs: { role: "group" } }, e2._l(e2.normalizedSwatches, function(t3, r2) {
            return n2("div", { key: r2, staticClass: "vc-slider-swatch", attrs: { "data-index": r2, "aria-label": "color:" + e2.colors.hex, role: "button" }, on: { click: function(n3) {
              return e2.handleSwClick(r2, t3);
            } } }, [n2("div", { staticClass: "vc-slider-swatch-picker", class: { "vc-slider-swatch-picker--active": e2.isActive(t3, r2), "vc-slider-swatch-picker--white": 1 === t3.l }, style: { background: "hsl(" + e2.colors.hsl.h + ", " + 100 * t3.s + "%, " + 100 * t3.l + "%)" } })]);
          }), 0)]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(116);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(52), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(119), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Swatches.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(117);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("10f839a2", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-swatches {\n  width: 320px;\n  height: 240px;\n  overflow-y: scroll;\n  background-color: #fff;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n}\n.vc-swatches-box {\n  padding: 16px 0 6px 16px;\n  overflow: hidden;\n}\n.vc-swatches-color-group {\n  padding-bottom: 10px;\n  width: 40px;\n  float: left;\n  margin-right: 10px;\n}\n.vc-swatches-color-it {\n  box-sizing: border-box;\n  width: 40px;\n  height: 24px;\n  cursor: pointer;\n  background: #880e4f;\n  margin-bottom: 1px;\n  overflow: hidden;\n  -ms-border-radius: 2px 2px 0 0;\n  -moz-border-radius: 2px 2px 0 0;\n  -o-border-radius: 2px 2px 0 0;\n  -webkit-border-radius: 2px 2px 0 0;\n  border-radius: 2px 2px 0 0;\n}\n.vc-swatches-color--white {\n  border: 1px solid #DDD;\n}\n.vc-swatches-pick {\n  fill: rgb(255, 255, 255);\n  margin-left: 8px;\n  display: block;\n}\n.vc-swatches-color--white .vc-swatches-pick {\n  fill: rgb(51, 51, 51);\n}\n", ""]);
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), n.d(t, "red", function() {
          return r;
        }), n.d(t, "pink", function() {
          return i;
        }), n.d(t, "purple", function() {
          return o;
        }), n.d(t, "deepPurple", function() {
          return a;
        }), n.d(t, "indigo", function() {
          return s;
        }), n.d(t, "blue", function() {
          return c;
        }), n.d(t, "lightBlue", function() {
          return l;
        }), n.d(t, "cyan", function() {
          return u;
        }), n.d(t, "teal", function() {
          return f;
        }), n.d(t, "green", function() {
          return d;
        }), n.d(t, "lightGreen", function() {
          return h2;
        }), n.d(t, "lime", function() {
          return p2;
        }), n.d(t, "yellow", function() {
          return v;
        }), n.d(t, "amber", function() {
          return g;
        }), n.d(t, "orange", function() {
          return b;
        }), n.d(t, "deepOrange", function() {
          return x;
        }), n.d(t, "brown", function() {
          return m;
        }), n.d(t, "grey", function() {
          return _;
        }), n.d(t, "blueGrey", function() {
          return w;
        }), n.d(t, "darkText", function() {
          return y;
        }), n.d(t, "lightText", function() {
          return C;
        }), n.d(t, "darkIcons", function() {
          return k;
        }), n.d(t, "lightIcons", function() {
          return F;
        }), n.d(t, "white", function() {
          return S;
        }), n.d(t, "black", function() {
          return A;
        });
        var r = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, i = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, o = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, a = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, s = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, c = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, l = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, u = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, f = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, d = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, h2 = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, p2 = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, v = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, g = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, b = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, x = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, m = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, _ = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, w = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, y = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, C = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, k = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, F = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, S = "#ffffff", A = "#000000";
        t.default = { red: r, pink: i, purple: o, deepPurple: a, indigo: s, blue: c, lightBlue: l, cyan: u, teal: f, green: d, lightGreen: h2, lime: p2, yellow: v, amber: g, orange: b, deepOrange: x, brown: m, grey: _, blueGrey: w, darkText: y, lightText: C, darkIcons: k, lightIcons: F, white: S, black: A };
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-swatches", attrs: { role: "application", "aria-label": "Swatches color picker", "data-pick": e2.pick } }, [n2("div", { staticClass: "vc-swatches-box", attrs: { role: "listbox" } }, e2._l(e2.palette, function(t3, r2) {
            return n2("div", { key: r2, staticClass: "vc-swatches-color-group" }, e2._l(t3, function(t4) {
              return n2("div", { key: t4, class: ["vc-swatches-color-it", { "vc-swatches-color--white": "#FFFFFF" === t4 }], style: { background: t4 }, attrs: { role: "option", "aria-label": "Color:" + t4, "aria-selected": e2.equal(t4), "data-color": t4 }, on: { click: function(n3) {
                return e2.handlerClick(t4);
              } } }, [n2("div", { directives: [{ name: "show", rawName: "v-show", value: e2.equal(t4), expression: "equal(c)" }], staticClass: "vc-swatches-pick" }, [n2("svg", { staticStyle: { width: "24px", height: "24px" }, attrs: { viewBox: "0 0 24 24" } }, [n2("path", { attrs: { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" } })])])]);
            }), 0);
          }), 0)]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(121);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(53), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(134), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Photoshop.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(122);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("080365d4", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, '\n.vc-photoshop {\n  background: #DCDCDC;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15);\n  box-sizing: initial;\n  width: 513px;\n  font-family: Roboto;\n}\n.vc-photoshop__disable-fields {\n  width: 390px;\n}\n.vc-ps-head {\n  background-image: linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%);\n  border-bottom: 1px solid #B1B1B1;\n  box-shadow: inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02);\n  height: 23px;\n  line-height: 24px;\n  border-radius: 4px 4px 0 0;\n  font-size: 13px;\n  color: #4D4D4D;\n  text-align: center;\n}\n.vc-ps-body {\n  padding: 15px;\n  display: flex;\n}\n.vc-ps-saturation-wrap {\n  width: 256px;\n  height: 256px;\n  position: relative;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n  overflow: hidden;\n}\n.vc-ps-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-ps-hue-wrap {\n  position: relative;\n  height: 256px;\n  width: 19px;\n  margin-left: 10px;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n}\n.vc-ps-hue-pointer {\n  position: relative;\n}\n.vc-ps-hue-pointer--left,\n.vc-ps-hue-pointer--right {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 5px 0 5px 8px;\n  border-color: transparent transparent transparent #555;\n}\n.vc-ps-hue-pointer--left:after,\n.vc-ps-hue-pointer--right:after {\n  content: "";\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 4px 0 4px 6px;\n  border-color: transparent transparent transparent #fff;\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  transform: translate(-8px, -5px);\n}\n.vc-ps-hue-pointer--left {\n  transform: translate(-13px, -4px);\n}\n.vc-ps-hue-pointer--right {\n  transform: translate(20px, -4px) rotate(180deg);\n}\n.vc-ps-controls {\n  width: 180px;\n  margin-left: 10px;\n  display: flex;\n}\n.vc-ps-controls__disable-fields {\n  width: auto;\n}\n.vc-ps-actions {\n  margin-left: 20px;\n  flex: 1;\n}\n.vc-ps-ac-btn {\n  cursor: pointer;\n  background-image: linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%);\n  border: 1px solid #878787;\n  border-radius: 2px;\n  height: 20px;\n  box-shadow: 0 1px 0 0 #EAEAEA;\n  font-size: 14px;\n  color: #000;\n  line-height: 20px;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.vc-ps-previews {\n  width: 60px;\n}\n.vc-ps-previews__swatches {\n  border: 1px solid #B3B3B3;\n  border-bottom: 1px solid #F0F0F0;\n  margin-bottom: 2px;\n  margin-top: 1px;\n}\n.vc-ps-previews__pr-color {\n  height: 34px;\n  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;\n}\n.vc-ps-previews__label {\n  font-size: 14px;\n  color: #000;\n  text-align: center;\n}\n.vc-ps-fields {\n  padding-top: 5px;\n  padding-bottom: 9px;\n  width: 80px;\n  position: relative;\n}\n.vc-ps-fields .vc-input__input {\n  margin-left: 40%;\n  width: 40%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 5px;\n  font-size: 13px;\n  padding-left: 3px;\n  margin-right: 10px;\n}\n.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {\n  top: 0;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n  position: absolute;\n}\n.vc-ps-fields .vc-input__label {\n  left: 0;\n  width: 34px;\n}\n.vc-ps-fields .vc-input__desc {\n  right: 0;\n  width: 0;\n}\n.vc-ps-fields__divider {\n  height: 5px;\n}\n.vc-ps-fields__hex .vc-input__input {\n  margin-left: 20%;\n  width: 80%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 6px;\n  font-size: 13px;\n  padding-left: 3px;\n}\n.vc-ps-fields__hex .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 14px;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n}\n', ""]);
      }, function(e, t, n) {
        var r = n(124);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("b5380e52", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n", ""]);
      }, function(e, t) {
        function n(e2, t2, n2) {
          return t2 < n2 ? e2 < t2 ? t2 : e2 > n2 ? n2 : e2 : e2 < n2 ? n2 : e2 > t2 ? t2 : e2;
        }
        e.exports = n;
      }, function(e, t) {
        function n(e2, t2, n2) {
          function r2(t3) {
            var n3 = v2, r3 = g2;
            return v2 = g2 = void 0, k = t3, x2 = e2.apply(r3, n3);
          }
          function o2(e3) {
            return k = e3, m2 = setTimeout(u2, t2), F ? r2(e3) : x2;
          }
          function a2(e3) {
            var n3 = e3 - _2, r3 = e3 - k, i2 = t2 - n3;
            return S ? y(i2, b2 - r3) : i2;
          }
          function l2(e3) {
            var n3 = e3 - _2, r3 = e3 - k;
            return void 0 === _2 || n3 >= t2 || n3 < 0 || S && r3 >= b2;
          }
          function u2() {
            var e3 = C();
            if (l2(e3))
              return f2(e3);
            m2 = setTimeout(u2, a2(e3));
          }
          function f2(e3) {
            return m2 = void 0, A && v2 ? r2(e3) : (v2 = g2 = void 0, x2);
          }
          function d2() {
            void 0 !== m2 && clearTimeout(m2), k = 0, v2 = _2 = g2 = m2 = void 0;
          }
          function h3() {
            return void 0 === m2 ? x2 : f2(C());
          }
          function p3() {
            var e3 = C(), n3 = l2(e3);
            if (v2 = arguments, g2 = this, _2 = e3, n3) {
              if (void 0 === m2)
                return o2(_2);
              if (S)
                return m2 = setTimeout(u2, t2), r2(_2);
            }
            return void 0 === m2 && (m2 = setTimeout(u2, t2)), x2;
          }
          var v2, g2, b2, x2, m2, _2, k = 0, F = false, S = false, A = true;
          if ("function" != typeof e2)
            throw new TypeError(c);
          return t2 = s(t2) || 0, i(n2) && (F = !!n2.leading, S = "maxWait" in n2, b2 = S ? w(s(n2.maxWait) || 0, t2) : b2, A = "trailing" in n2 ? !!n2.trailing : A), p3.cancel = d2, p3.flush = h3, p3;
        }
        function r(e2, t2, r2) {
          var o2 = true, a2 = true;
          if ("function" != typeof e2)
            throw new TypeError(c);
          return i(r2) && (o2 = "leading" in r2 ? !!r2.leading : o2, a2 = "trailing" in r2 ? !!r2.trailing : a2), n(e2, t2, { leading: o2, maxWait: t2, trailing: a2 });
        }
        function i(e2) {
          var t2 = typeof e2;
          return !!e2 && ("object" == t2 || "function" == t2);
        }
        function o(e2) {
          return !!e2 && "object" == typeof e2;
        }
        function a(e2) {
          return "symbol" == typeof e2 || o(e2) && _.call(e2) == u;
        }
        function s(e2) {
          if ("number" == typeof e2)
            return e2;
          if (a(e2))
            return l;
          if (i(e2)) {
            var t2 = "function" == typeof e2.valueOf ? e2.valueOf() : e2;
            e2 = i(t2) ? t2 + "" : t2;
          }
          if ("string" != typeof e2)
            return 0 === e2 ? e2 : +e2;
          e2 = e2.replace(f, "");
          var n2 = h2.test(e2);
          return n2 || p2.test(e2) ? v(e2.slice(2), n2 ? 2 : 8) : d.test(e2) ? l : +e2;
        }
        var c = "Expected a function", l = NaN, u = "[object Symbol]", f = /^\s+|\s+$/g, d = /^[-+]0x[0-9a-f]+$/i, h2 = /^0b[01]+$/i, p2 = /^0o[0-7]+$/i, v = parseInt, g = "object" == typeof commonjsGlobal && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, b = "object" == typeof self && self && self.Object === Object && self, x = g || b || Function("return this")(), m = Object.prototype, _ = m.toString, w = Math.max, y = Math.min, C = function() {
          return x.Date.now();
        };
        e.exports = r;
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { ref: "container", staticClass: "vc-saturation", style: { background: e2.bgColor }, on: { mousedown: e2.handleMouseDown, touchmove: e2.handleChange, touchstart: e2.handleChange } }, [n2("div", { staticClass: "vc-saturation--white" }), e2._v(" "), n2("div", { staticClass: "vc-saturation--black" }), e2._v(" "), n2("div", { staticClass: "vc-saturation-pointer", style: { top: e2.pointerTop, left: e2.pointerLeft } }, [n2("div", { staticClass: "vc-saturation-circle" })])]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        var r = n(129);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("4dc1b086", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n", ""]);
      }, function(e, t, n) {
        var r = n(131);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("7e15c05b", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement;
          return (e2._self._c || t2)("div", { staticClass: "vc-checkerboard", style: e2.bgStyle });
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-alpha" }, [n2("div", { staticClass: "vc-alpha-checkboard-wrap" }, [n2("checkboard")], 1), e2._v(" "), n2("div", { staticClass: "vc-alpha-gradient", style: { background: e2.gradientColor } }), e2._v(" "), n2("div", { ref: "container", staticClass: "vc-alpha-container", on: { mousedown: e2.handleMouseDown, touchmove: e2.handleChange, touchstart: e2.handleChange } }, [n2("div", { staticClass: "vc-alpha-pointer", style: { left: 100 * e2.colors.a + "%" } }, [n2("div", { staticClass: "vc-alpha-picker" })])])]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { class: ["vc-photoshop", e2.disableFields ? "vc-photoshop__disable-fields" : ""], attrs: { role: "application", "aria-label": "PhotoShop color picker" } }, [n2("div", { staticClass: "vc-ps-head", attrs: { role: "heading" } }, [e2._v(e2._s(e2.head))]), e2._v(" "), n2("div", { staticClass: "vc-ps-body" }, [n2("div", { staticClass: "vc-ps-saturation-wrap" }, [n2("saturation", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1), e2._v(" "), n2("div", { staticClass: "vc-ps-hue-wrap" }, [n2("hue", { attrs: { direction: "vertical" }, on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } }, [n2("div", { staticClass: "vc-ps-hue-pointer" }, [n2("i", { staticClass: "vc-ps-hue-pointer--left" }), n2("i", { staticClass: "vc-ps-hue-pointer--right" })])])], 1), e2._v(" "), n2("div", { class: ["vc-ps-controls", e2.disableFields ? "vc-ps-controls__disable-fields" : ""] }, [n2("div", { staticClass: "vc-ps-previews" }, [n2("div", { staticClass: "vc-ps-previews__label" }, [e2._v(e2._s(e2.newLabel))]), e2._v(" "), n2("div", { staticClass: "vc-ps-previews__swatches" }, [n2("div", { staticClass: "vc-ps-previews__pr-color", style: { background: e2.colors.hex }, attrs: { "aria-label": "New color is " + e2.colors.hex } }), e2._v(" "), n2("div", { staticClass: "vc-ps-previews__pr-color", style: { background: e2.currentColor }, attrs: { "aria-label": "Current color is " + e2.currentColor }, on: { click: e2.clickCurrentColor } })]), e2._v(" "), n2("div", { staticClass: "vc-ps-previews__label" }, [e2._v(e2._s(e2.currentLabel))])]), e2._v(" "), e2.disableFields ? e2._e() : n2("div", { staticClass: "vc-ps-actions" }, [n2("div", { staticClass: "vc-ps-ac-btn", attrs: { role: "button", "aria-label": e2.acceptLabel }, on: { click: e2.handleAccept } }, [e2._v(e2._s(e2.acceptLabel))]), e2._v(" "), n2("div", { staticClass: "vc-ps-ac-btn", attrs: { role: "button", "aria-label": e2.cancelLabel }, on: { click: e2.handleCancel } }, [e2._v(e2._s(e2.cancelLabel))]), e2._v(" "), n2("div", { staticClass: "vc-ps-fields" }, [n2("ed-in", { attrs: { label: "h", desc: "°", value: e2.hsv.h }, on: { change: e2.inputChange } }), e2._v(" "), n2("ed-in", { attrs: { label: "s", desc: "%", value: e2.hsv.s, max: 100 }, on: { change: e2.inputChange } }), e2._v(" "), n2("ed-in", { attrs: { label: "v", desc: "%", value: e2.hsv.v, max: 100 }, on: { change: e2.inputChange } }), e2._v(" "), n2("div", { staticClass: "vc-ps-fields__divider" }), e2._v(" "), n2("ed-in", { attrs: { label: "r", value: e2.colors.rgba.r }, on: { change: e2.inputChange } }), e2._v(" "), n2("ed-in", { attrs: { label: "g", value: e2.colors.rgba.g }, on: { change: e2.inputChange } }), e2._v(" "), n2("ed-in", { attrs: { label: "b", value: e2.colors.rgba.b }, on: { change: e2.inputChange } }), e2._v(" "), n2("div", { staticClass: "vc-ps-fields__divider" }), e2._v(" "), n2("ed-in", { staticClass: "vc-ps-fields__hex", attrs: { label: "#", value: e2.hex }, on: { change: e2.inputChange } })], 1), e2._v(" "), e2.hasResetButton ? n2("div", { staticClass: "vc-ps-ac-btn", attrs: { "aria-label": "reset" }, on: { click: e2.handleReset } }, [e2._v(e2._s(e2.resetLabel))]) : e2._e()])])])]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(136);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(57), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(138), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Sketch.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(137);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("612c6604", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-sketch {\n  position: relative;\n  width: 200px;\n  padding: 10px 10px 0;\n  box-sizing: initial;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n.vc-sketch-saturation-wrap {\n  width: 100%;\n  padding-bottom: 75%;\n  position: relative;\n  overflow: hidden;\n}\n.vc-sketch-controls {\n  display: flex;\n}\n.vc-sketch-sliders {\n  padding: 4px 0;\n  flex: 1;\n}\n.vc-sketch-sliders .vc-hue,\n.vc-sketch-sliders .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-sketch-hue-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-sketch-alpha-wrap {\n  position: relative;\n  height: 10px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n.vc-sketch-color-wrap {\n  width: 24px;\n  height: 24px;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border-radius: 3px;\n}\n.vc-sketch-active-color {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\n  z-index: 2;\n}\n.vc-sketch-color-wrap .vc-checkerboard {\n  background-size: auto;\n}\n.vc-sketch-field {\n  display: flex;\n  padding-top: 4px;\n}\n.vc-sketch-field .vc-input__input {\n  width: 90%;\n  padding: 4px 0 3px 10%;\n  border: none;\n  box-shadow: inset 0 0 0 1px #ccc;\n  font-size: 10px;\n}\n.vc-sketch-field .vc-input__label {\n  display: block;\n  text-align: center;\n  font-size: 11px;\n  color: #222;\n  padding-top: 3px;\n  padding-bottom: 4px;\n  text-transform: capitalize;\n}\n.vc-sketch-field--single {\n  flex: 1;\n  padding-left: 6px;\n}\n.vc-sketch-field--double {\n  flex: 2;\n}\n.vc-sketch-presets {\n  margin-right: -10px;\n  margin-left: -10px;\n  padding-left: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #eee;\n}\n.vc-sketch-presets-color {\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n  margin: 0 10px 10px 0;\n  vertical-align: top;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n.vc-sketch-presets-color .vc-checkerboard {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n  border-radius: 3px;\n}\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\n  height: 10px;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { class: ["vc-sketch", e2.disableAlpha ? "vc-sketch__disable-alpha" : ""], attrs: { role: "application", "aria-label": "Sketch color picker" } }, [n2("div", { staticClass: "vc-sketch-saturation-wrap" }, [n2("saturation", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1), e2._v(" "), n2("div", { staticClass: "vc-sketch-controls" }, [n2("div", { staticClass: "vc-sketch-sliders" }, [n2("div", { staticClass: "vc-sketch-hue-wrap" }, [n2("hue", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1), e2._v(" "), e2.disableAlpha ? e2._e() : n2("div", { staticClass: "vc-sketch-alpha-wrap" }, [n2("alpha", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1)]), e2._v(" "), n2("div", { staticClass: "vc-sketch-color-wrap" }, [n2("div", { staticClass: "vc-sketch-active-color", style: { background: e2.activeColor }, attrs: { "aria-label": "Current color is " + e2.activeColor } }), e2._v(" "), n2("checkboard")], 1)]), e2._v(" "), e2.disableFields ? e2._e() : n2("div", { staticClass: "vc-sketch-field" }, [n2("div", { staticClass: "vc-sketch-field--double" }, [n2("ed-in", { attrs: { label: "hex", value: e2.hex }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-sketch-field--single" }, [n2("ed-in", { attrs: { label: "r", value: e2.colors.rgba.r }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-sketch-field--single" }, [n2("ed-in", { attrs: { label: "g", value: e2.colors.rgba.g }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-sketch-field--single" }, [n2("ed-in", { attrs: { label: "b", value: e2.colors.rgba.b }, on: { change: e2.inputChange } })], 1), e2._v(" "), e2.disableAlpha ? e2._e() : n2("div", { staticClass: "vc-sketch-field--single" }, [n2("ed-in", { attrs: { label: "a", value: e2.colors.a, "arrow-offset": 0.01, max: 1 }, on: { change: e2.inputChange } })], 1)]), e2._v(" "), n2("div", { staticClass: "vc-sketch-presets", attrs: { role: "group", "aria-label": "A color preset, pick one to set as current color" } }, [e2._l(e2.presetColors, function(t3) {
            return [e2.isTransparent(t3) ? n2("div", { key: t3, staticClass: "vc-sketch-presets-color", attrs: { "aria-label": "Color:" + t3 }, on: { click: function(n3) {
              return e2.handlePreset(t3);
            } } }, [n2("checkboard")], 1) : n2("div", { key: t3, staticClass: "vc-sketch-presets-color", style: { background: t3 }, attrs: { "aria-label": "Color:" + t3 }, on: { click: function(n3) {
              return e2.handlePreset(t3);
            } } })];
          })], 2)]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(140);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(58), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(142), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Chrome.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(141);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("1cd16048", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { class: ["vc-chrome", e2.disableAlpha ? "vc-chrome__disable-alpha" : ""], attrs: { role: "application", "aria-label": "Chrome color picker" } }, [n2("div", { staticClass: "vc-chrome-saturation-wrap" }, [n2("saturation", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1), e2._v(" "), n2("div", { staticClass: "vc-chrome-body" }, [n2("div", { staticClass: "vc-chrome-controls" }, [n2("div", { staticClass: "vc-chrome-color-wrap" }, [n2("div", { staticClass: "vc-chrome-active-color", style: { background: e2.activeColor }, attrs: { "aria-label": "current color is " + e2.colors.hex } }), e2._v(" "), e2.disableAlpha ? e2._e() : n2("checkboard")], 1), e2._v(" "), n2("div", { staticClass: "vc-chrome-sliders" }, [n2("div", { staticClass: "vc-chrome-hue-wrap" }, [n2("hue", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1), e2._v(" "), e2.disableAlpha ? e2._e() : n2("div", { staticClass: "vc-chrome-alpha-wrap" }, [n2("alpha", { on: { change: e2.childChange }, model: { value: e2.colors, callback: function(t3) {
            e2.colors = t3;
          }, expression: "colors" } })], 1)])]), e2._v(" "), e2.disableFields ? e2._e() : n2("div", { staticClass: "vc-chrome-fields-wrap" }, [n2("div", { directives: [{ name: "show", rawName: "v-show", value: 0 === e2.fieldsIndex, expression: "fieldsIndex === 0" }], staticClass: "vc-chrome-fields" }, [n2("div", { staticClass: "vc-chrome-field" }, [e2.hasAlpha ? e2._e() : n2("ed-in", { attrs: { label: "hex", value: e2.colors.hex }, on: { change: e2.inputChange } }), e2._v(" "), e2.hasAlpha ? n2("ed-in", { attrs: { label: "hex", value: e2.colors.hex8 }, on: { change: e2.inputChange } }) : e2._e()], 1)]), e2._v(" "), n2("div", { directives: [{ name: "show", rawName: "v-show", value: 1 === e2.fieldsIndex, expression: "fieldsIndex === 1" }], staticClass: "vc-chrome-fields" }, [n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "r", value: e2.colors.rgba.r }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "g", value: e2.colors.rgba.g }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "b", value: e2.colors.rgba.b }, on: { change: e2.inputChange } })], 1), e2._v(" "), e2.disableAlpha ? e2._e() : n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "a", value: e2.colors.a, "arrow-offset": 0.01, max: 1 }, on: { change: e2.inputChange } })], 1)]), e2._v(" "), n2("div", { directives: [{ name: "show", rawName: "v-show", value: 2 === e2.fieldsIndex, expression: "fieldsIndex === 2" }], staticClass: "vc-chrome-fields" }, [n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "h", value: e2.hsl.h }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "s", value: e2.hsl.s }, on: { change: e2.inputChange } })], 1), e2._v(" "), n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "l", value: e2.hsl.l }, on: { change: e2.inputChange } })], 1), e2._v(" "), e2.disableAlpha ? e2._e() : n2("div", { staticClass: "vc-chrome-field" }, [n2("ed-in", { attrs: { label: "a", value: e2.colors.a, "arrow-offset": 0.01, max: 1 }, on: { change: e2.inputChange } })], 1)]), e2._v(" "), n2("div", { staticClass: "vc-chrome-toggle-btn", attrs: { role: "button", "aria-label": "Change another color definition" }, on: { click: e2.toggleViews } }, [n2("div", { staticClass: "vc-chrome-toggle-icon" }, [n2("svg", { staticStyle: { width: "24px", height: "24px" }, attrs: { viewBox: "0 0 24 24" }, on: { mouseover: e2.showHighlight, mouseenter: e2.showHighlight, mouseout: e2.hideHighlight } }, [n2("path", { attrs: { fill: "#333", d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" } })])]), e2._v(" "), n2("div", { directives: [{ name: "show", rawName: "v-show", value: e2.highlight, expression: "highlight" }], staticClass: "vc-chrome-toggle-icon-highlight" })])])])]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }, function(e, t, n) {
        function r(e2) {
          n(144);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var i = n(59), o = n.n(i);
        for (var a in i)
          "default" !== a && function(e2) {
            n.d(t, e2, function() {
              return i[e2];
            });
          }(a);
        var s = n(146), l = n(2), u = r, f = l(o.a, s.a, false, u, null, null);
        f.options.__file = "src/components/Twitter.vue", t.default = f.exports;
      }, function(e, t, n) {
        var r = n(145);
        "string" == typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
        n(1)("669a48a5", r, false, {});
      }, function(e, t, n) {
        t = e.exports = n(0)(false), t.push([e.i, "\n.vc-twitter {\n  background: #fff;\n  border: 0 solid rgba(0,0,0,0.25);\n  box-shadow: 0 1px 4px rgba(0,0,0,0.25);\n  border-radius: 4px;\n  position: relative;\n}\n.vc-twitter-triangle {\n  width: 0px;\n  height: 0px;\n  border-style: solid;\n  border-width: 0 9px 10px 9px;\n  border-color: transparent transparent #fff transparent;\n  position: absolute;\n}\n.vc-twitter-triangle-shadow {\n  width: 0px;\n  height: 0px;\n  border-style: solid;\n  border-width: 0 9px 10px 9px;\n  border-color: transparent transparent rgba(0, 0, 0, .1) transparent;\n  position: absolute;\n}\n.vc-twitter-body {\n  padding: 15px 9px 9px 15px;\n}\n.vc-twitter .vc-editable-input {\n  position: relative;\n}\n.vc-twitter .vc-editable-input input {\n  width: 100px;\n  font-size: 14px;\n  color: #666;\n  border: 0px;\n  outline: none;\n  height: 28px;\n  box-shadow: inset 0 0 0 1px #F0F0F0;\n  box-sizing: content-box;\n  border-radius: 0 4px 4px 0;\n  float: left;\n  padding: 1px;\n  padding-left: 8px;\n}\n.vc-twitter .vc-editable-input span {\n  display: none;\n}\n.vc-twitter-hash {\n  background: #F0F0F0;\n  height: 30px;\n  width: 30px;\n  border-radius: 4px 0 0 4px;\n  float: left;\n  color: #98A1A4;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.vc-twitter-swatch {\n  width: 30px;\n  height: 30px;\n  float: left;\n  border-radius: 4px;\n  margin: 0 6px 6px 0;\n  cursor: pointer;\n  position: relative;\n  outline: none;\n}\n.vc-twitter-clear {\n  clear: both;\n}\n.vc-twitter-hide-triangle .vc-twitter-triangle {\n  display: none;\n}\n.vc-twitter-hide-triangle .vc-twitter-triangle-shadow {\n  display: none;\n}\n.vc-twitter-top-left-triangle .vc-twitter-triangle{\n  top: -10px;\n  left: 12px;\n}\n.vc-twitter-top-left-triangle .vc-twitter-triangle-shadow{\n  top: -11px;\n  left: 12px;\n}\n.vc-twitter-top-right-triangle .vc-twitter-triangle{\n  top: -10px;\n  right: 12px;\n}\n.vc-twitter-top-right-triangle .vc-twitter-triangle-shadow{\n  top: -11px;\n  right: 12px;\n}\n", ""]);
      }, function(e, t, n) {
        var r = function() {
          var e2 = this, t2 = e2.$createElement, n2 = e2._self._c || t2;
          return n2("div", { staticClass: "vc-twitter", class: { "vc-twitter-hide-triangle ": "hide" === e2.triangle, "vc-twitter-top-left-triangle ": "top-left" === e2.triangle, "vc-twitter-top-right-triangle ": "top-right" === e2.triangle }, style: { width: "number" == typeof e2.width ? e2.width + "px" : e2.width } }, [n2("div", { staticClass: "vc-twitter-triangle-shadow" }), e2._v(" "), n2("div", { staticClass: "vc-twitter-triangle" }), e2._v(" "), n2("div", { staticClass: "vc-twitter-body" }, [e2._l(e2.defaultColors, function(t3, r2) {
            return n2("span", { key: r2, staticClass: "vc-twitter-swatch", style: { background: t3, boxShadow: "0 0 4px " + (e2.equal(t3) ? t3 : "transparent") }, on: { click: function(n3) {
              return e2.handlerClick(t3);
            } } });
          }), e2._v(" "), n2("div", { staticClass: "vc-twitter-hash" }, [e2._v("#")]), e2._v(" "), n2("editable-input", { attrs: { label: "#", value: e2.hex }, on: { change: e2.inputChange } }), e2._v(" "), n2("div", { staticClass: "vc-twitter-clear" })], 2)]);
        }, i = [];
        r._withStripped = true;
        var o = { render: r, staticRenderFns: i };
        t.a = o;
      }]);
    });
  })(vueColor_min);
  var vueColor_minExports = vueColor_min.exports;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  var trimLeft = /^\s+/;
  var trimRight = /\s+$/;
  function tinycolor(color, opts) {
    color = color ? color : "";
    opts = opts || {};
    if (color instanceof tinycolor) {
      return color;
    }
    if (!(this instanceof tinycolor)) {
      return new tinycolor(color, opts);
    }
    var rgb = inputToRGB(color);
    this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;
    if (this._r < 1)
      this._r = Math.round(this._r);
    if (this._g < 1)
      this._g = Math.round(this._g);
    if (this._b < 1)
      this._b = Math.round(this._b);
    this._ok = rgb.ok;
  }
  tinycolor.prototype = {
    isDark: function isDark() {
      return this.getBrightness() < 128;
    },
    isLight: function isLight() {
      return !this.isDark();
    },
    isValid: function isValid() {
      return this._ok;
    },
    getOriginalInput: function getOriginalInput() {
      return this._originalInput;
    },
    getFormat: function getFormat() {
      return this._format;
    },
    getAlpha: function getAlpha() {
      return this._a;
    },
    getBrightness: function getBrightness() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    },
    getLuminance: function getLuminance() {
      var rgb = this.toRgb();
      var RsRGB, GsRGB, BsRGB, R, G, B;
      RsRGB = rgb.r / 255;
      GsRGB = rgb.g / 255;
      BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928)
        R = RsRGB / 12.92;
      else
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      if (GsRGB <= 0.03928)
        G = GsRGB / 12.92;
      else
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      if (BsRGB <= 0.03928)
        B = BsRGB / 12.92;
      else
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    },
    setAlpha: function setAlpha(value) {
      this._a = boundAlpha(value);
      this._roundA = Math.round(100 * this._a) / 100;
      return this;
    },
    toHsv: function toHsv() {
      var hsv = rgbToHsv(this._r, this._g, this._b);
      return {
        h: hsv.h * 360,
        s: hsv.s,
        v: hsv.v,
        a: this._a
      };
    },
    toHsvString: function toHsvString() {
      var hsv = rgbToHsv(this._r, this._g, this._b);
      var h2 = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
      return this._a == 1 ? "hsv(" + h2 + ", " + s + "%, " + v + "%)" : "hsva(" + h2 + ", " + s + "%, " + v + "%, " + this._roundA + ")";
    },
    toHsl: function toHsl() {
      var hsl = rgbToHsl(this._r, this._g, this._b);
      return {
        h: hsl.h * 360,
        s: hsl.s,
        l: hsl.l,
        a: this._a
      };
    },
    toHslString: function toHslString() {
      var hsl = rgbToHsl(this._r, this._g, this._b);
      var h2 = Math.round(hsl.h * 360), s = Math.round(hsl.s * 100), l = Math.round(hsl.l * 100);
      return this._a == 1 ? "hsl(" + h2 + ", " + s + "%, " + l + "%)" : "hsla(" + h2 + ", " + s + "%, " + l + "%, " + this._roundA + ")";
    },
    toHex: function toHex(allow3Char) {
      return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function toHexString(allow3Char) {
      return "#" + this.toHex(allow3Char);
    },
    toHex8: function toHex8(allow4Char) {
      return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function toHex8String(allow4Char) {
      return "#" + this.toHex8(allow4Char);
    },
    toRgb: function toRgb() {
      return {
        r: Math.round(this._r),
        g: Math.round(this._g),
        b: Math.round(this._b),
        a: this._a
      };
    },
    toRgbString: function toRgbString() {
      return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function toPercentageRgb() {
      return {
        r: Math.round(bound01(this._r, 255) * 100) + "%",
        g: Math.round(bound01(this._g, 255) * 100) + "%",
        b: Math.round(bound01(this._b, 255) * 100) + "%",
        a: this._a
      };
    },
    toPercentageRgbString: function toPercentageRgbString() {
      return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function toName() {
      if (this._a === 0) {
        return "transparent";
      }
      if (this._a < 1) {
        return false;
      }
      return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function toFilter(secondColor) {
      var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
      var secondHex8String = hex8String;
      var gradientType = this._gradientType ? "GradientType = 1, " : "";
      if (secondColor) {
        var s = tinycolor(secondColor);
        secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
      }
      return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
    },
    toString: function toString(format) {
      var formatSet = !!format;
      format = format || this._format;
      var formattedString = false;
      var hasAlpha = this._a < 1 && this._a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
      if (needsAlphaFormat) {
        if (format === "name" && this._a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }
      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format === "name") {
        formattedString = this.toName();
      }
      if (format === "hsl") {
        formattedString = this.toHslString();
      }
      if (format === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    },
    clone: function clone() {
      return tinycolor(this.toString());
    },
    _applyModification: function _applyModification(fn, args) {
      var color = fn.apply(null, [this].concat([].slice.call(args)));
      this._r = color._r;
      this._g = color._g;
      this._b = color._b;
      this.setAlpha(color._a);
      return this;
    },
    lighten: function lighten() {
      return this._applyModification(_lighten, arguments);
    },
    brighten: function brighten() {
      return this._applyModification(_brighten, arguments);
    },
    darken: function darken() {
      return this._applyModification(_darken, arguments);
    },
    desaturate: function desaturate() {
      return this._applyModification(_desaturate, arguments);
    },
    saturate: function saturate() {
      return this._applyModification(_saturate, arguments);
    },
    greyscale: function greyscale() {
      return this._applyModification(_greyscale, arguments);
    },
    spin: function spin() {
      return this._applyModification(_spin, arguments);
    },
    _applyCombination: function _applyCombination(fn, args) {
      return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function analogous() {
      return this._applyCombination(_analogous, arguments);
    },
    complement: function complement() {
      return this._applyCombination(_complement, arguments);
    },
    monochromatic: function monochromatic() {
      return this._applyCombination(_monochromatic, arguments);
    },
    splitcomplement: function splitcomplement() {
      return this._applyCombination(_splitcomplement, arguments);
    },
    // Disabled until https://github.com/bgrins/TinyColor/issues/254
    // polyad: function (number) {
    //   return this._applyCombination(polyad, [number]);
    // },
    triad: function triad() {
      return this._applyCombination(polyad, [3]);
    },
    tetrad: function tetrad() {
      return this._applyCombination(polyad, [4]);
    }
  };
  tinycolor.fromRatio = function(color, opts) {
    if (_typeof(color) == "object") {
      var newColor = {};
      for (var i in color) {
        if (color.hasOwnProperty(i)) {
          if (i === "a") {
            newColor[i] = color[i];
          } else {
            newColor[i] = convertToPercentage(color[i]);
          }
        }
      }
      color = newColor;
    }
    return tinycolor(color, opts);
  };
  function inputToRGB(color) {
    var rgb = {
      r: 0,
      g: 0,
      b: 0
    };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color == "string") {
      color = stringInputToObject(color);
    }
    if (_typeof(color) == "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l);
        ok = true;
        format = "hsl";
      }
      if (color.hasOwnProperty("a")) {
        a = color.a;
      }
    }
    a = boundAlpha(a);
    return {
      ok,
      format: color.format || format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a
    };
  }
  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  }
  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h2, s, l = (max + min) / 2;
    if (max == min) {
      h2 = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h2 = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h2 = (b - r) / d + 2;
          break;
        case b:
          h2 = (r - g) / d + 4;
          break;
      }
      h2 /= 6;
    }
    return {
      h: h2,
      s,
      l
    };
  }
  function hslToRgb(h2, s, l) {
    var r, g, b;
    h2 = bound01(h2, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    function hue2rgb(p3, q2, t) {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p3 + (q2 - p3) * 6 * t;
      if (t < 1 / 2)
        return q2;
      if (t < 2 / 3)
        return p3 + (q2 - p3) * (2 / 3 - t) * 6;
      return p3;
    }
    if (s === 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p2 = 2 * l - q;
      r = hue2rgb(p2, q, h2 + 1 / 3);
      g = hue2rgb(p2, q, h2);
      b = hue2rgb(p2, q, h2 - 1 / 3);
    }
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  }
  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h2, s, v = max;
    var d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max == min) {
      h2 = 0;
    } else {
      switch (max) {
        case r:
          h2 = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h2 = (b - r) / d + 2;
          break;
        case b:
          h2 = (r - g) / d + 4;
          break;
      }
      h2 /= 6;
    }
    return {
      h: h2,
      s,
      v
    };
  }
  function hsvToRgb(h2, s, v) {
    h2 = bound01(h2, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h2), f = h2 - i, p2 = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p2, p2, t, v][mod], g = [t, v, v, q, p2, p2][mod], b = [p2, p2, t, v, v, q][mod];
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  }
  function rgbToHex(r, g, b, allow3Char) {
    var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToArgbHex(r, g, b, a) {
    var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
    return hex.join("");
  }
  tinycolor.equals = function(color1, color2) {
    if (!color1 || !color2)
      return false;
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
  };
  tinycolor.random = function() {
    return tinycolor.fromRatio({
      r: Math.random(),
      g: Math.random(),
      b: Math.random()
    });
  };
  function _desaturate(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
  }
  function _saturate(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
  }
  function _greyscale(color) {
    return tinycolor(color).desaturate(100);
  }
  function _lighten(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
  }
  function _brighten(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var rgb = tinycolor(color).toRgb();
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
    return tinycolor(rgb);
  }
  function _darken(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
  }
  function _spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
  }
  function _complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
  }
  function polyad(color, number) {
    if (isNaN(number) || number <= 0) {
      throw new Error("Argument to polyad must be a positive number");
    }
    var hsl = tinycolor(color).toHsl();
    var result = [tinycolor(color)];
    var step = 360 / number;
    for (var i = 1; i < number; i++) {
      result.push(tinycolor({
        h: (hsl.h + i * step) % 360,
        s: hsl.s,
        l: hsl.l
      }));
    }
    return result;
  }
  function _splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h2 = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h2 + 72) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h2 + 216) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }
  function _analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;
    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];
    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(tinycolor(hsl));
    }
    return ret;
  }
  function _monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h2 = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;
    while (results--) {
      ret.push(tinycolor({
        h: h2,
        s,
        v
      }));
      v = (v + modification) % 1;
    }
    return ret;
  }
  tinycolor.mix = function(color1, color2, amount) {
    amount = amount === 0 ? 0 : amount || 50;
    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();
    var p2 = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
      g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
      b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
      a: (rgb2.a - rgb1.a) * p2 + rgb1.a
    };
    return tinycolor(rgba);
  };
  tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
  };
  tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;
    out = false;
    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
      case "AAsmall":
      case "AAAlarge":
        out = readability >= 4.5;
        break;
      case "AAlarge":
        out = readability >= 3;
        break;
      case "AAAsmall":
        out = readability >= 7;
        break;
    }
    return out;
  };
  tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size2;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors;
    level = args.level;
    size2 = args.size;
    for (var i = 0; i < colorList.length; i++) {
      readability = tinycolor.readability(baseColor, colorList[i]);
      if (readability > bestScore) {
        bestScore = readability;
        bestColor = tinycolor(colorList[i]);
      }
    }
    if (tinycolor.isReadable(baseColor, bestColor, {
      level,
      size: size2
    }) || !includeFallbackColors) {
      return bestColor;
    } else {
      args.includeFallbackColors = false;
      return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
    }
  };
  var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
  };
  var hexNames = tinycolor.hexNames = flip(names);
  function flip(o) {
    var flipped = {};
    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        flipped[o[i]] = i;
      }
    }
    return flipped;
  }
  function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }
    return a;
  }
  function bound01(n, max) {
    if (isOnePointZero(n))
      n = "100%";
    var processPercent = isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));
    if (processPercent) {
      n = parseInt(n * max, 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
      return 1;
    }
    return n % max / parseFloat(max);
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
  }
  function isPercentage(n) {
    return typeof n === "string" && n.indexOf("%") != -1;
  }
  function pad2(c) {
    return c.length == 1 ? "0" + c : "" + c;
  }
  function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }
    return n;
  }
  function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
  }
  function convertHexToDecimal(h2) {
    return parseIntFromHex(h2) / 255;
  }
  var matchers = function() {
    var CSS_INTEGER = "[-\\+]?\\d+%?";
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }();
  function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
  }
  function stringInputToObject(color) {
    color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
    var named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color == "transparent") {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        format: "name"
      };
    }
    var match;
    if (match = matchers.rgb.exec(color)) {
      return {
        r: match[1],
        g: match[2],
        b: match[3]
      };
    }
    if (match = matchers.rgba.exec(color)) {
      return {
        r: match[1],
        g: match[2],
        b: match[3],
        a: match[4]
      };
    }
    if (match = matchers.hsl.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        l: match[3]
      };
    }
    if (match = matchers.hsla.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        l: match[3],
        a: match[4]
      };
    }
    if (match = matchers.hsv.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        v: match[3]
      };
    }
    if (match = matchers.hsva.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        v: match[3],
        a: match[4]
      };
    }
    if (match = matchers.hex8.exec(color)) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        a: convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }
    if (match = matchers.hex6.exec(color)) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }
    if (match = matchers.hex4.exec(color)) {
      return {
        r: parseIntFromHex(match[1] + "" + match[1]),
        g: parseIntFromHex(match[2] + "" + match[2]),
        b: parseIntFromHex(match[3] + "" + match[3]),
        a: convertHexToDecimal(match[4] + "" + match[4]),
        format: named ? "name" : "hex8"
      };
    }
    if (match = matchers.hex3.exec(color)) {
      return {
        r: parseIntFromHex(match[1] + "" + match[1]),
        g: parseIntFromHex(match[2] + "" + match[2]),
        b: parseIntFromHex(match[3] + "" + match[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  function validateWCAG2Parms(parms) {
    var level, size2;
    parms = parms || {
      level: "AA",
      size: "small"
    };
    level = (parms.level || "AA").toUpperCase();
    size2 = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
      level = "AA";
    }
    if (size2 !== "small" && size2 !== "large") {
      size2 = "small";
    }
    return {
      level,
      size: size2
    };
  }
  const _sfc_main$4 = {
    data() {
      return {
        isPanelvisibile: false,
        colors: {
          hex: "#194d33",
          hsl: {
            h: 150,
            s: 0.5,
            l: 0.2,
            a: 1
          },
          rgba: {
            r: 25,
            g: 77,
            b: 51,
            a: 1
          },
          a: 1
        },
        justChangedNode: false
      };
    },
    computed: {
      buttonClass: function() {
        let color = tinycolor(this.colors.rgba);
        return {
          "background-color": color.toRgbString()
        };
      }
    },
    watch: {
      colors: function(newColors) {
        if (this.justChangedNode) {
          this.justChangedNode = false;
          return;
        }
        let color = tinycolor(newColors.rgba);
        tinymce.activeEditor.formatter.apply("forecolor", { value: color.toRgbString() });
        this.justChangedNode = true;
      }
    },
    components: {
      "chrome-picker": vueColor_minExports.Chrome,
      "zion-inline-editor-panel": panel
    },
    beforeMount: function() {
      tinymce.activeEditor.on("NodeChange", this.setActiveColor);
      this.setActiveColor();
    },
    beforeDestroy() {
      tinymce.activeEditor.off("NodeChange", this.setActiveColor);
    },
    methods: {
      setActiveColor() {
        if (this.justChangedNode) {
          this.justChangedNode = false;
          return;
        }
        let obj = this.colors;
        let activeColor = tinymce.activeEditor.queryCommandValue("ForeColor");
        let color = tinycolor(activeColor);
        obj.rgba = color.toRgb();
        obj.hex = color.toHex();
        obj.hsl = color.toHsl();
        this.colors = Object.assign({}, obj);
        this.justChangedNode = true;
      }
    }
  };
  const _hoisted_1$2 = { class: "zion-inline-editor-panel-wrapper" };
  const _hoisted_2$1 = {
    key: 0,
    class: "zion-inline-editor-container zion-inline-editor-dropdown zion-inline-editor-dropdown--panel"
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_chrome_picker = resolveComponent("chrome-picker");
    return openBlock(), createElementBlock("div", _hoisted_1$2, [
      createBaseVNode("button", {
        class: "zion-inline-editor-button",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $data.isPanelvisibile = !$data.isPanelvisibile, ["prevent"]))
      }, [
        createBaseVNode(
          "span",
          {
            class: "zion-inline-editor-color-picker-button",
            style: normalizeStyle($options.buttonClass)
          },
          null,
          4
          /* STYLE */
        )
      ]),
      createVNode(Transition, { name: "panel-show" }, {
        default: withCtx(() => [
          $data.isPanelvisibile ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            createVNode(_component_chrome_picker, {
              modelValue: $data.colors,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.colors = $event)
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const colorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
  const _sfc_main$3 = {
    props: ["formatter", "icon", "buttontext"],
    data: function() {
      return {
        isActive: null
      };
    },
    components: {
      "zion-inline-editor-panel": panel
    },
    computed: {
      classses() {
        let classes = [];
        if (typeof this.icon !== "undefined") {
          classes.push("zn_pb_icon");
          classes.push(this.icon);
        }
        if (this.isActive) {
          classes.push("zion-inline-editor-button--active");
        }
        return classes.join(" ");
      }
    },
    beforeMount: function() {
      var self2 = this;
      tinymce.activeEditor.formatter.formatChanged(this.formatter, function(state2) {
        self2.isActive = state2;
      });
      this.isActive = this.hasFormat(this.formatter);
    },
    methods: {
      // Apply button style
      setTextStyle(styleType, event) {
        tinymce.activeEditor.formatter.toggle(styleType);
      },
      // Check if the selection has a specific style applied
      hasFormat(styleType) {
        return tinymce.activeEditor.formatter.match(styleType);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_zion_inline_editor_panel = resolveComponent("zion-inline-editor-panel");
    return openBlock(), createBlock(_component_zion_inline_editor_panel, { icon: "zn_pb_icon znpb_icon-link" }, {
      default: withCtx(() => [
        createBaseVNode(
          "button",
          {
            class: normalizeClass(["zion-inline-editor-button znpb_icon-link", $options.classses]),
            onClick: _cache[0] || (_cache[0] = ($event) => $options.setTextStyle($props.formatter))
          },
          toDisplayString($props.buttontext),
          3
          /* TEXT, CLASS */
        )
      ]),
      _: 1
      /* STABLE */
    });
  }
  const link = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
  const _sfc_main$2 = {
    props: ["formatter", "icon", "buttontext", "value"],
    data: function() {
      return {
        isActive: null
      };
    },
    computed: {
      classses() {
        let classes = [];
        if (this.isActive) {
          classes.push("zion-inline-editor-button--active");
        }
        return classes.join(" ");
      }
    },
    beforeMount: function() {
      tinymce.activeEditor.onNodeChange.add(this.hasFormat);
    },
    methods: {
      // Apply button style
      setTextStyle(event) {
        tinymce.activeEditor.formatter.apply("fontweight", { value: this.value });
      },
      // Check if the selection has a specific style applied
      hasFormat() {
        this.isActive = tinymce.activeEditor.formatter.match("fontweight", { value: this.value });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock(
      "button",
      {
        class: normalizeClass(["zion-inline-editor-button", $options.classses]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.setTextStyle && $options.setTextStyle(...args))
      },
      toDisplayString($props.value),
      3
      /* TEXT, CLASS */
    );
  }
  const fontWeight = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  const _sfc_main$1 = {
    data: function() {
      let data = {
        //Visibility Variables
        isinlineEditorVisible: false,
        isLinkPanelVisible: false,
        //This is for the link panel component (after you press the link btn)
        //??
        isButtonClick: false,
        //TinyMCE Components
        activeEditor: null,
        activeElement: null,
        activeEditorOptionId: null,
        //Link config
        linkTarget: "_self",
        linkUrl: "",
        //Font weights
        fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        //Inline Editor position on page
        position: {
          offsetY: 75,
          offsetX: 0,
          posX: 0,
          posY: 0
        },
        //Out of bounds variables
        dragButtonOnScreen: true
        //False if the editor drag button is out of the browser window
      };
      return data;
    },
    components: {
      "zion-inline-editor-popover": popOver,
      "zion-inline-editor-panel": panel,
      "zion-inline-editor-group": group,
      "zion-inline-editor-font-list": fontList,
      "zion-inline-editor-button": buttonComponent,
      "zion-inline-editor-color-picker": colorPicker,
      "zion-inline-editor-link": link,
      "zion-inline-editor-font-weight": fontWeight
    },
    computed: {
      //This is the initial bar position setter (through a style element)
      barStyles: function() {
        let styles = {
          top: this.position.posY - this.position.offsetY + "px",
          left: this.position.posX - this.position.offsetX + "px"
        };
        return styles;
      },
      //Check if the bar is loaded on screen
      isActiveBar: function() {
        return this.isinlineEditorVisible || this.isLinkPanelVisible;
      }
    },
    methods: __spreadProps(__spreadValues({}, mapActions(["hideEditor"])), {
      onMouseDown(event) {
        this.isButtonClick = true;
      },
      onMouseUp(event) {
        this.isButtonClick = false;
      },
      startDrag(event) {
        window.addEventListener("mouseup", this.stopDrag);
        document.getElementsByClassName("zion-inline-editor-dropdown__arrow--bottom")[0].style.transition = "none";
        let mouseCoordsX, mouseCoordsY;
        let barPosition = this.position;
        let initialOffsetX = this.position.offsetX;
        let initialOffsetY = this.position.offsetY;
        let mouseInitCoordsX = window.event.pageX;
        let mouseInitCoordsY = window.event.pageY;
        function findAndUpdateMouseCoords(mouseEvent) {
          if (mouseEvent) {
            mouseCoordsX = mouseEvent.pageX;
            mouseCoordsY = mouseEvent.pageY;
          } else {
            mouseCoordsX = window.event.pageX;
            mouseCoordsY = window.event.pageY;
          }
          if (mouseCoordsX - mouseInitCoordsX) {
            barPosition.offsetX = initialOffsetX - (mouseCoordsX - mouseInitCoordsX);
          }
          if (mouseCoordsY - mouseInitCoordsY) {
            barPosition.offsetY = initialOffsetY - (mouseCoordsY - mouseInitCoordsY);
          }
        }
        window.onmousemove = findAndUpdateMouseCoords;
      },
      stopDrag(event) {
        document.getElementsByClassName("zion-inline-editor-dropdown__arrow--bottom")[0].style.transition = "all .5s";
        window.onmousemove = null;
        this.checkDragButtonOnScreen();
        window.removeEventListener("mouseup", this.stopDrag);
      },
      getInlineEditorRect() {
        return this.$el.getBoundingClientRect();
      },
      getPositionByMouseLocation(mouseLocationX) {
        let inlineEditorRect = this.getInlineEditorRect();
        return { x: mouseLocationX - inlineEditorRect.width / 2 };
      },
      isDragButtonOutOfBounds() {
        let inlineEditorPosition = this.getInlineEditorRect();
        return inlineEditorPosition.x < 40;
      },
      checkDragButtonOnScreen() {
        this.dragButtonOnScreen = !this.isDragButtonOutOfBounds();
      },
      checkDragButtonOnScreenByMouseLocation(mouseLocationX) {
        let inlineEditorPosition = this.getPositionByMouseLocation(mouseLocationX);
        this.dragButtonOnScreen = inlineEditorPosition.x > 40;
      },
      toggleLinkPanel(event) {
        this.isinlineEditorVisible = !this.isinlineEditorVisible;
        this.isLinkPanelVisible = !this.isLinkPanelVisible;
        let node = tinymce.activeEditor.selection.getStart(), link2 = tinymce.activeEditor.dom.getParent(node, "a[href]");
        if (link2) {
          this.linkTarget = link2.target || "_self";
          this.linkUrl = link2.href;
        }
      },
      addLink() {
        if (this.linkUrl.length > 0) {
          tinymce.activeEditor.formatter.apply("link", {
            href: this.linkUrl,
            target: this.linkTarget
          });
        } else {
          tinymce.activeEditor.formatter.remove("link");
        }
        this.toggleLinkPanel();
      },
      unlink() {
        tinymce.activeEditor.execCommand("Unlink");
        this.linkTarget = "_self";
        this.linkUrl = "";
        this.toggleLinkPanel();
      },
      init() {
        if (typeof tinymce === "undefined") {
          return;
        }
        jQuery(document).on("ZnBeforeElementRemove", this.disableTinyMce);
        jQuery(document).on("ZnNewContent", this.enableTinyMce);
        document.addEventListener("keydown", this.hideEditorOnEscapeKey);
        var self2 = this;
        var initPosition = {
          offsetY: 75,
          offsetX: 0,
          posX: 0,
          posY: 0
        };
        this.initTinyMCE(".znhg-editable-area");
        jQuery(".zn_pb_wrapper ").on("mousedown", ".znhg-editable-area", function(event) {
          self2.activeEditor = event.currentTarget.id;
          self2.activeElement = event.currentTarget;
          self2.activeEditorOptionId = event.currentTarget.getAttribute("data-optionid");
          self2.position.offsetY = initPosition.offsetY;
          self2.position.offsetX = initPosition.offsetX;
        });
        jQuery(".zn_pb_wrapper ").on("mouseup", ".znhg-editable-area", function(event) {
          if (!self2.isActiveBar) {
            self2.isinlineEditorVisible = true;
            self2.hideEditor();
          }
          self2.position = Object.assign({}, self2.position, {
            posX: event.pageX,
            posY: event.pageY
          });
          self2.$nextTick(function() {
            self2.checkDragButtonOnScreenByMouseLocation(self2.position.posX);
          });
        });
        jQuery(".zn_pb_wrapper").on("blur", ".znhg-editable-area", function(event) {
          if (!self2.isButtonClick) {
            self2.saveContent();
            self2.isinlineEditorVisible = false;
          }
          self2.isButtonClick = false;
        });
        jQuery(window).on("mousedown", function(event) {
          if (jQuery(event.target).is(".zion-inline-editor") || jQuery(event.target).closest(".zion-inline-editor").length > 0) {
            return true;
          }
          if (jQuery(event.target).is(".znhg-editable-area") || jQuery(event.target).closest(".znhg-editable-area").length > 0) {
            return true;
          }
          if (self2.isActiveBar) {
            if (!self2.isButtonClick) {
              self2.saveContent();
              self2.isinlineEditorVisible = false;
            }
            self2.isButtonClick = false;
          }
        });
      },
      saveContent() {
        let editor2 = tinymce.get(this.activeEditor), editorContent = null;
        if (editor2) {
          editorContent = editor2.getContent();
          window.klpb.app.set_element_option(this.activeEditorOptionId, editorContent, this.activeElement);
        }
      },
      initTinyMCE(selector, target) {
        let config = {
          selector,
          entity_encoding: "raw",
          toolbar: false,
          menubar: false,
          selection_toolbar: false,
          inline: true,
          target,
          object_resizing: false,
          formats: {
            lineheight: { inline: "span", classes: "zn-lineheight", styles: { lineHeight: "%value" } },
            letterspacing: { inline: "span", classes: "zn-letterspacing", styles: { letterSpacing: "%value" } },
            fontweight: { inline: "span", classes: "zn-fontweight", styles: { fontWeight: "%value" } },
            uppercase: { inline: "span", classes: "zn-uppercase", styles: { textTransform: "uppercase" } }
          }
        };
        if (typeof tinymce !== "undefined") {
          tinymce.init(config);
        }
      },
      enableTinyMce(event) {
        let inlineEditors;
        if (event.content.length > 0) {
          inlineEditors = event.content[0].querySelectorAll(".znhg-editable-area");
          if (inlineEditors.length > 0) {
            for (let inlineEditor2 of inlineEditors) {
              this.initTinyMCE(null, inlineEditor2);
            }
          }
        }
      },
      disableTinyMce(event) {
        let enabledEditors = event.content[0].querySelectorAll(".znhg-editable-area");
        if (enabledEditors.length > 0) {
          for (let enabledEditor of enabledEditors) {
            if (tinymce.get(enabledEditor.id)) {
              tinymce.get(enabledEditor.id).remove();
            }
          }
        }
      },
      hideEditorOnEscapeKey(event) {
        if (event.keyCode === 27) {
          this.isinlineEditorVisible = false;
          this.isLinkPanelVisible = false;
        }
      }
    }),
    created: function() {
      window.addEventListener("load", this.init);
    },
    beforeDestroy: function() {
      jQuery(document).off("ZnBeforeElementRemove", this.disableTinyMce);
      window.removeEventListener("load", this.init);
      document.removeEventListener("keydown", this.hideEditorOnEscapeKey);
      window.removeEventListener("mouseup", this.stopDrag);
    },
    watch: {
      isActiveBar: function(isActiveBar) {
        if (isActiveBar) {
          document.body.className += " zion-inline-editor--visible";
        } else {
          document.body.className = document.body.className.replace(/\bzion-inline-editor--visible\b/, "");
        }
      },
      isinlineEditorVisible: function(isinlineEditorVisible) {
        if (this.isinlineEditorVisible) {
          this.$nextTick(function() {
            this.checkDragButtonOnScreen();
          });
        }
      }
    }
  };
  const _hoisted_1$1 = {
    key: 1,
    class: "zion-inline-editor-container"
  };
  const _hoisted_2 = {
    key: 3,
    class: "zion-inline-editor-container"
  };
  const _hoisted_3 = /* @__PURE__ */ createBaseVNode(
    "option",
    { value: "_self" },
    "self",
    -1
    /* HOISTED */
  );
  const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
    "option",
    { value: "_blank" },
    "blank",
    -1
    /* HOISTED */
  );
  const _hoisted_5 = [
    _hoisted_3,
    _hoisted_4
  ];
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_zion_inline_editor_group = resolveComponent("zion-inline-editor-group");
    const _component_zion_inline_editor_font_list = resolveComponent("zion-inline-editor-font-list");
    const _component_zion_inline_editor_panel = resolveComponent("zion-inline-editor-panel");
    const _component_zion_inline_editor_font_weight = resolveComponent("zion-inline-editor-font-weight");
    const _component_zion_inline_editor_popover = resolveComponent("zion-inline-editor-popover");
    const _component_zion_inline_editor_button = resolveComponent("zion-inline-editor-button");
    const _component_zion_inline_editor_color_picker = resolveComponent("zion-inline-editor-color-picker");
    return openBlock(), createBlock(Transition, { name: "barShow" }, {
      default: withCtx(() => [
        $options.isActiveBar ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: "zion-inline-editor zion-inline-editor-container zion-inline-editor-dropdown__arrow--bottom",
            style: normalizeStyle($options.barStyles),
            onMousedown: _cache[9] || (_cache[9] = (...args) => $options.onMouseDown && $options.onMouseDown(...args)),
            onMouseup: _cache[10] || (_cache[10] = (...args) => $options.onMouseUp && $options.onMouseUp(...args))
          },
          [
            createCommentVNode("Normally positioned drag button"),
            _ctx.dragButtonOnScreen ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "zion-inline-editor-dragbutton",
                onMousedown: _cache[0] || (_cache[0] = (...args) => $options.startDrag && $options.startDrag(...args)),
                onMouseup: _cache[1] || (_cache[1] = (...args) => $options.stopDrag && $options.stopDrag(...args))
              },
              "|||",
              32
              /* NEED_HYDRATION */
            )) : createCommentVNode("v-if", true),
            createCommentVNode("Editing tools container"),
            _ctx.isinlineEditorVisible ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
              createCommentVNode(" Fonts & text style panel "),
              createVNode(_component_zion_inline_editor_panel, { buttontext: "Aa" }, {
                default: withCtx(() => [
                  createVNode(_component_zion_inline_editor_group),
                  createVNode(_component_zion_inline_editor_font_list)
                ]),
                _: 1
                /* STABLE */
              }),
              createCommentVNode(" Bold popover "),
              createVNode(_component_zion_inline_editor_popover, { icon: "znpb_icon-bold" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.fontWeights, (fontWeight2) => {
                      return openBlock(), createBlock(_component_zion_inline_editor_font_weight, {
                        key: fontWeight2,
                        value: fontWeight2
                      }, null, 8, ["value"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }),
              createCommentVNode(" Italic button "),
              createVNode(_component_zion_inline_editor_button, {
                formatter: "italic",
                icon: "znpb_icon-italic"
              }),
              createCommentVNode(" Underline button "),
              createVNode(_component_zion_inline_editor_button, {
                formatter: "underline",
                icon: "znpb_icon-underline"
              }),
              createCommentVNode(" Uppercase button "),
              createVNode(_component_zion_inline_editor_button, {
                formatter: "uppercase",
                buttontext: "TT"
              }),
              createCommentVNode(" Link button "),
              createBaseVNode("button", {
                class: "zion-inline-editor-button zn_pb_icon znpb_icon-link",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleLinkPanel && $options.toggleLinkPanel(...args))
              }),
              createCommentVNode(" Quote button "),
              createVNode(_component_zion_inline_editor_button, {
                formatter: "blockquote",
                icon: "znpb_icon-quote-right"
              }),
              createCommentVNode(" Color Picker "),
              createVNode(_component_zion_inline_editor_color_picker),
              createCommentVNode(" Text align button "),
              createVNode(_component_zion_inline_editor_popover, { icon: "znpb_icon-align-center" }, {
                default: withCtx(() => [
                  createCommentVNode(" Align left "),
                  createVNode(_component_zion_inline_editor_button, {
                    formatter: "alignleft",
                    icon: "znpb_icon-align-left"
                  }),
                  createCommentVNode(" Align center "),
                  createVNode(_component_zion_inline_editor_button, {
                    formatter: "aligncenter",
                    icon: "znpb_icon-align-center"
                  }),
                  createCommentVNode(" Align right "),
                  createVNode(_component_zion_inline_editor_button, {
                    formatter: "alignright",
                    icon: "znpb_icon-align-right"
                  }),
                  createCommentVNode(" Align justify "),
                  createVNode(_component_zion_inline_editor_button, {
                    formatter: "alignjustify",
                    icon: "znpb_icon-align-justify"
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ])) : createCommentVNode("v-if", true),
            createCommentVNode("Alternatively positioned drag button (if the normal one is out of bounds)"),
            !_ctx.dragButtonOnScreen ? (openBlock(), createElementBlock(
              "div",
              {
                key: 2,
                class: "zion-inline-editor-dragbutton",
                onMousedown: _cache[3] || (_cache[3] = (...args) => $options.startDrag && $options.startDrag(...args)),
                onMouseup: _cache[4] || (_cache[4] = (...args) => $options.stopDrag && $options.stopDrag(...args))
              },
              "|||",
              32
              /* NEED_HYDRATION */
            )) : createCommentVNode("v-if", true),
            createCommentVNode("Link Panel"),
            _ctx.isLinkPanelVisible ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createBaseVNode("button", {
                class: "zion-inline-editor-button zn_pb_icon znpb_icon-unlink",
                onClick: _cache[5] || (_cache[5] = withModifiers((...args) => $options.unlink && $options.unlink(...args), ["prevent"]))
              }),
              withDirectives(createBaseVNode(
                "select",
                {
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.linkTarget = $event),
                  class: "zion-inline-editor-link-target",
                  placeholder: "Select target"
                },
                _hoisted_5,
                512
                /* NEED_PATCH */
              ), [
                [vModelSelect, _ctx.linkTarget]
              ]),
              withDirectives(createBaseVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.linkUrl = $event),
                  class: "zion-inline-editor-link-url",
                  type: "text"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vModelText, _ctx.linkUrl]
              ]),
              createBaseVNode("button", {
                class: "zion-inline-editor-button zn_pb_icon znpb_icon-link",
                onClick: _cache[8] || (_cache[8] = (...args) => $options.addLink && $options.addLink(...args))
              })
            ])) : createCommentVNode("v-if", true)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        )) : createCommentVNode("v-if", true)
      ]),
      _: 1
      /* STABLE */
    });
  }
  const inlineEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const _sfc_main = {
    name: "app",
    data() {
      return {
        tabs: [
          {
            tabTitle: "ADD ELEMENTS",
            tabComponent: "znb-tab-elements"
          },
          {
            tabTitle: "TEMPLATES",
            tabComponent: "znb-tab-templates"
          },
          {
            tabTitle: "SAVED ELEMENTS",
            tabComponent: "znb-tab-saved-elements"
          }
        ]
      };
    },
    computed: __spreadProps(__spreadValues({}, mapGetters(["isEditorResizing", "isEditorVisible", "activeTab"])), {
      styles: function() {
        return {
          height: this.$store.getters.editorHeight + "px"
        };
      },
      placeholderStyles: function() {
        return {
          height: this.$store.getters.editorHeight + 49 + "px"
        };
      }
    }),
    components: {
      "znb-editor-header": headerComponent,
      "znb-dragbar": dragBar,
      "znb-tab-elements": elementsTabContent,
      "znb-tab-templates": templatesTabContent,
      "znb-tab-saved-elements": savedElementsTabContent,
      "zion-inlineeditor": inlineEditor
    },
    methods: {
      // ALLOW EDITOR HIDE BY PRESSING CTRL + H
      hideEditorOnCTRLH(event) {
        if (event.keyCode == 72 && event.ctrlKey) {
          event.preventDefault();
          this.$store.dispatch("toggleEditor");
        }
      }
    },
    created: function() {
      document.addEventListener("keydown", this.hideEditorOnCTRLH);
      for (let i = 0; i < this.tabs.length; i++) {
        this.$store.dispatch("registerTab", this.tabs[i]);
      }
      this.$store.dispatch("setActiveTab", this.tabs[0].tabComponent);
    },
    destroyed: function() {
      document.removeEventListener("keydown", this.hideEditorOnCTRLH);
    }
  };
  const _hoisted_1 = { class: "znpbEditorContentWrapper" };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_znb_dragbar = resolveComponent("znb-dragbar");
    const _component_znb_editor_header = resolveComponent("znb-editor-header");
    const _component_zion_inlineeditor = resolveComponent("zion-inlineeditor");
    return openBlock(), createElementBlock(
      "div",
      {
        class: normalizeClass(["znpbEditorWrapper", { znpbEditorResizing: _ctx.isEditorResizing }])
      },
      [
        createBaseVNode(
          "div",
          {
            class: "znpbEditorHeightPlaceholder",
            style: normalizeStyle($options.placeholderStyles)
          },
          null,
          4
          /* STYLE */
        ),
        createBaseVNode("div", _hoisted_1, [
          withDirectives(createVNode(
            _component_znb_dragbar,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vShow, _ctx.isEditorVisible]
          ]),
          createVNode(_component_znb_editor_header),
          createBaseVNode(
            "div",
            {
              class: "zn_pb_tab_wrapper",
              style: normalizeStyle($options.styles)
            },
            [
              (openBlock(), createBlock(
                KeepAlive,
                null,
                [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeTab)))
                ],
                1024
                /* DYNAMIC_SLOTS */
              ))
            ],
            4
            /* STYLE */
          )
        ]),
        createVNode(_component_zion_inlineeditor),
        createCommentVNode(' <zion-tooltip v-show="isTooltipActive">{{tooltipContent}}</zion-tooltip> ')
      ],
      2
      /* CLASS */
    );
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  const CHANGE_EDITOR_HEIGHT = "CHANGE_EDITOR_HEIGHT";
  const CHANGE_EDITOR_AUX_HEIGHT = "CHANGE_EDITOR_AUX_HEIGHT";
  const SET_EDITOR_VISIBILITY = "SET_EDITOR_VISIBILITY";
  const SET_EDITOR_RESIZING = "SET_EDITOR_RESIZING";
  const SET_VISIBLE_ELEMENTS = "SET_VISIBLE_ELEMENTS";
  const SET_ELEMENTS_ACTIVE_CATEGORY = "SET_ELEMENTS_ACTIVE_CATEGORY";
  const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
  const REGISTER_TAB = "REGISTER_TAB";
  const ADD_TEMPLATE = "ADD_TEMPLATE";
  const REMOVE_TEMPLATE = "REMOVE_TEMPLATE";
  const ADD_SAVED_ELEMENT = "ADD_SAVED_ELEMENT";
  const REMOVE_SAVED_ELEMENT = "REMOVE_SAVED_ELEMENT";
  let initialEditorHeight = 230;
  const state$4 = {
    editorHeight: initialEditorHeight,
    editorAuxHeight: initialEditorHeight,
    //We are using this to remember the height whenever the editor is hidden
    isEditorVisible: true,
    isEditorResizing: false
  };
  const getters$4 = {
    editorHeight: (state2) => state2.editorHeight,
    editorAuxHeight: (state2) => state2.editorAuxHeight,
    isEditorVisible: (state2) => state2.isEditorVisible,
    isEditorResizing: (state2) => state2.isEditorResizing
  };
  const actions$4 = {
    //Change the editor height
    changeHeight: ({ commit }, newHeight) => {
      commit(CHANGE_EDITOR_HEIGHT, newHeight);
    },
    //Set a flag whenever the editor is resizing
    setEditorResizing: ({ commit }, isResizing) => {
      commit(SET_EDITOR_RESIZING, isResizing);
    },
    //Show or hide the editor
    toggleEditor: ({ commit, state: state2 }, event) => {
      let editorHeight = state2.isEditorVisible ? 0 : state2.editorAuxHeight;
      commit(CHANGE_EDITOR_AUX_HEIGHT, state2.editorHeight);
      commit(CHANGE_EDITOR_HEIGHT, editorHeight);
      commit(SET_EDITOR_VISIBILITY, !state2.isEditorVisible);
    },
    showEditor({ commit }) {
      commit(CHANGE_EDITOR_HEIGHT, state$4.editorAuxHeight);
      commit(SET_EDITOR_VISIBILITY, true);
    },
    hideEditor({ commit }) {
      let editorHeight = state$4.editorHeight ? state$4.editorHeight : state$4.editorAuxHeight;
      commit(CHANGE_EDITOR_AUX_HEIGHT, editorHeight);
      commit(CHANGE_EDITOR_HEIGHT, 0);
      commit(SET_EDITOR_VISIBILITY, false);
    }
  };
  const mutations$4 = {
    //Change editor height
    [CHANGE_EDITOR_HEIGHT](state2, newHeight) {
      state2.editorHeight = newHeight;
    },
    //Change the editor auxiliary height (so we keep the height it even when the editor is hidden for example)
    [CHANGE_EDITOR_AUX_HEIGHT](state2, newHeight) {
      state2.editorAuxHeight = newHeight;
    },
    //Set editor visibility
    [SET_EDITOR_VISIBILITY](state2, editorVisibility) {
      state2.isEditorVisible = editorVisibility;
    },
    //Set editor resizing
    [SET_EDITOR_RESIZING](state2, isEditorResizing) {
      state2.isEditorResizing = isEditorResizing;
    }
  };
  const editor = {
    state: state$4,
    getters: getters$4,
    actions: actions$4,
    mutations: mutations$4
  };
  const state$3 = {
    allElements: window.ZnPbData.elements_data,
    elementCategories: window.ZnPbData.pb_menu,
    visibleElements: window.ZnPbData.elements_data,
    activeCategory: ""
  };
  const getters$3 = {
    allElements: (state2) => state2.allElements,
    elementCategories: (state2) => state2.elementCategories,
    activeCategory: (state2) => state2.activeCategory,
    visibleElements: (state2) => state2.visibleElements
  };
  const actions$3 = {
    setActiveCategory({ commit, state: state2 }, category) {
      commit(SET_ELEMENTS_ACTIVE_CATEGORY, category);
    },
    filterElementsByCategory({ commit, state: state2 }, category) {
      let visibleElements = Object.assign(
        [],
        state2.allElements.filter((element) => {
          return element.category.toLowerCase().indexOf(category) !== -1;
        })
      );
      commit(SET_ELEMENTS_ACTIVE_CATEGORY, category);
      commit(SET_VISIBLE_ELEMENTS, visibleElements);
    },
    filterElementsBySearch({ commit, state: state2 }, searchTerm) {
      let visibleElements = Object.assign(
        [],
        state2.allElements.filter((element) => {
          return element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || element.keywords.join().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        })
      );
      commit(SET_VISIBLE_ELEMENTS, visibleElements);
    },
    filterElementsByLevel({ commit, state: state2 }, elementDropLevel) {
      let visibleElements = Object.assign(
        [],
        state2.allElements.filter((element) => {
          if (elementDropLevel === 1) {
            return parseInt(element.level) === 2;
          } else if (elementDropLevel === 2) {
            return parseInt(element.level) === 3;
          } else {
            return parseInt(element.level) === 3 || parseInt(element.level) === 1;
          }
        })
      );
      commit(SET_VISIBLE_ELEMENTS, visibleElements);
    }
  };
  const mutations$3 = {
    [SET_VISIBLE_ELEMENTS](state2, visibleElements) {
      state2.visibleElements = visibleElements;
    },
    [SET_ELEMENTS_ACTIVE_CATEGORY](state2, activeCategory) {
      state2.activeCategory = activeCategory;
    }
  };
  const elements = {
    state: state$3,
    getters: getters$3,
    actions: actions$3,
    mutations: mutations$3
  };
  const state$2 = {
    activeTab: null,
    registeredTabs: []
  };
  const getters$2 = {
    activeTab: (state2) => state2.activeTab,
    registeredTabs: (state2) => state2.registeredTabs
  };
  const actions$2 = {
    // Change the editor height
    setActiveTab: ({ commit }, newTab) => {
      commit(SET_ACTIVE_TAB, newTab);
    },
    registerTab: ({ commit }, tabComponent) => {
      commit(REGISTER_TAB, tabComponent);
    }
  };
  const mutations$2 = {
    [SET_ACTIVE_TAB](state2, newTab) {
      state2.activeTab = newTab;
    },
    [REGISTER_TAB](state2, newTab) {
      state2.registeredTabs.push(newTab);
    }
  };
  const tabs = {
    state: state$2,
    getters: getters$2,
    actions: actions$2,
    mutations: mutations$2
  };
  const state$1 = {
    allTemplates: window.ZnPbData.allTemplates
  };
  const getters$1 = {
    allTemplates: (state2) => state2.allTemplates
  };
  const actions$1 = {
    // Add a new template
    addTemplate: ({ commit }, template) => {
      commit(ADD_TEMPLATE, template);
    },
    removeTemplate: ({ commit }, template) => {
      commit(REMOVE_TEMPLATE, template);
    }
  };
  const mutations$1 = {
    [ADD_TEMPLATE](state2, template) {
      state2.allTemplates.push(template);
    },
    [REMOVE_TEMPLATE](state2, template) {
      let allElements = state2.allTemplates;
      allElements.splice(allElements.indexOf(template), 1);
    }
  };
  const templates = {
    state: state$1,
    getters: getters$1,
    actions: actions$1,
    mutations: mutations$1
  };
  const state = {
    allSavedElements: window.ZnPbData.allSavedElements
  };
  const getters = {
    allSavedElements: (state2) => state2.allSavedElements
  };
  const actions = {
    // Add a new saved element
    addSavedElement: ({ commit }, element) => {
      commit(ADD_SAVED_ELEMENT, element);
    },
    removeSingleElement: ({ commit }, element) => {
      commit(REMOVE_SAVED_ELEMENT, element);
    }
  };
  const mutations = {
    [ADD_SAVED_ELEMENT](state2, element) {
      state2.allSavedElements.push(element);
    },
    [REMOVE_SAVED_ELEMENT](state2, element) {
      let allElements = state2.allSavedElements;
      allElements.splice(allElements.indexOf(element), 1);
    }
  };
  const savedElements = {
    state,
    getters,
    actions,
    mutations
  };
  const debug = false;
  const store = createStore({
    modules: {
      editor,
      elements,
      tabs,
      templates,
      savedElements
    },
    strict: debug
  });
  if (ZnAjax.debug === true) {
    window.showed_message = true;
  } else {
    window.showed_message = false;
    document.onkeydown = check_message;
  }
  window.onbeforeunload = function(e) {
    if (window.showed_message === true) {
      window.showed_message = false;
    } else {
      return "Any unsaved changes will be lost !";
    }
  };
  function check_message(e) {
    if ((e.which || e.keyCode) == 116 || // F5
    e.ctrlKey && e.keyCode == 82 || // CTRL + R
    e.ctrlKey && e.keyCode == 16 && e.keyCode == 82) {
      e.preventDefault();
      new jQuery.ZnModalConfirm(
        "You are about to refresh the page. Any unsaved changes will be lost. <br>Are you sure you want to reload the page ?",
        "Stay on page",
        "Refresh page",
        function() {
          window.showed_message = true;
          location.reload();
        },
        function() {
          window.showed_message = false;
        }
      );
    }
  }
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  var possibleConstructorReturn = function(self2, call) {
    if (!self2) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self2;
  };
  var TypeRegistry = function() {
    function TypeRegistry2() {
      var initial = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      classCallCheck(this, TypeRegistry2);
      this.registeredTypes = initial;
    }
    createClass(TypeRegistry2, [{
      key: "get",
      value: function get2(type) {
        if (typeof this.registeredTypes[type] !== "undefined") {
          return this.registeredTypes[type];
        } else {
          return this.registeredTypes["default"];
        }
      }
    }, {
      key: "register",
      value: function register(type, item) {
        if (typeof this.registeredTypes[type] === "undefined") {
          this.registeredTypes[type] = item;
        }
      }
    }, {
      key: "registerDefault",
      value: function registerDefault(item) {
        this.register("default", item);
      }
    }]);
    return TypeRegistry2;
  }();
  var KeyExtractors = function(_TypeRegistry) {
    inherits(KeyExtractors2, _TypeRegistry);
    function KeyExtractors2(options) {
      classCallCheck(this, KeyExtractors2);
      var _this = possibleConstructorReturn(this, (KeyExtractors2.__proto__ || Object.getPrototypeOf(KeyExtractors2)).call(this, options));
      _this.registerDefault(function(el) {
        return el.getAttribute("name") || "";
      });
      return _this;
    }
    return KeyExtractors2;
  }(TypeRegistry);
  var InputReaders = function(_TypeRegistry) {
    inherits(InputReaders2, _TypeRegistry);
    function InputReaders2(options) {
      classCallCheck(this, InputReaders2);
      var _this = possibleConstructorReturn(this, (InputReaders2.__proto__ || Object.getPrototypeOf(InputReaders2)).call(this, options));
      _this.registerDefault(function(el) {
        return el.value;
      });
      _this.register("checkbox", function(el) {
        return el.getAttribute("value") !== null ? el.checked ? el.getAttribute("value") : null : el.checked;
      });
      _this.register("select", function(el) {
        return getSelectValue(el);
      });
      return _this;
    }
    return InputReaders2;
  }(TypeRegistry);
  function getSelectValue(elem) {
    var value, option, i;
    var options = elem.options;
    var index = elem.selectedIndex;
    var one = elem.type === "select-one";
    var values = one ? null : [];
    var max = one ? index + 1 : options.length;
    if (index < 0) {
      i = max;
    } else {
      i = one ? index : 0;
    }
    for (; i < max; i++) {
      option = options[i];
      if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
      !option.disabled && !(option.parentNode.disabled && option.parentNode.tagName.toLowerCase() === "optgroup")) {
        value = option.value;
        if (one) {
          return value;
        }
        values.push(value);
      }
    }
    return values;
  }
  var KeyAssignmentValidators = function(_TypeRegistry) {
    inherits(KeyAssignmentValidators2, _TypeRegistry);
    function KeyAssignmentValidators2(options) {
      classCallCheck(this, KeyAssignmentValidators2);
      var _this = possibleConstructorReturn(this, (KeyAssignmentValidators2.__proto__ || Object.getPrototypeOf(KeyAssignmentValidators2)).call(this, options));
      _this.registerDefault(function() {
        return true;
      });
      _this.register("radio", function(el) {
        return el.checked;
      });
      return _this;
    }
    return KeyAssignmentValidators2;
  }(TypeRegistry);
  function keySplitter(key) {
    var matches2 = key.match(/[^[\]]+/g);
    var lastKey = void 0;
    if (key.length > 1 && key.indexOf("[]") === key.length - 2) {
      lastKey = matches2.pop();
      matches2.push([lastKey]);
    }
    return matches2;
  }
  function getElementType(el) {
    var typeAttr = void 0;
    var tagName = el.tagName;
    var type = tagName;
    if (tagName.toLowerCase() === "input") {
      typeAttr = el.getAttribute("type");
      if (typeAttr) {
        type = typeAttr;
      } else {
        type = "text";
      }
    }
    return type.toLowerCase();
  }
  function getInputElements(element, options) {
    return Array.prototype.filter.call(element.querySelectorAll("input,select,textarea"), function(el) {
      if (el.tagName.toLowerCase() === "input" && (el.type === "submit" || el.type === "reset")) {
        return false;
      }
      var myType = getElementType(el);
      var extractor = options.keyExtractors.get(myType);
      var identifier = extractor(el);
      var foundInInclude = (options.include || []).indexOf(identifier) !== -1;
      var foundInExclude = (options.exclude || []).indexOf(identifier) !== -1;
      var foundInIgnored = false;
      var reject = false;
      if (options.ignoredTypes) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = options.ignoredTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var selector = _step.value;
            if (el.matches(selector)) {
              foundInIgnored = true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      if (foundInInclude) {
        reject = false;
      } else {
        if (options.include) {
          reject = true;
        } else {
          reject = foundInExclude || foundInIgnored;
        }
      }
      return !reject;
    });
  }
  function assignKeyValue(obj, keychain, value) {
    if (!keychain) {
      return obj;
    }
    var key = keychain.shift();
    if (!obj[key]) {
      obj[key] = Array.isArray(key) ? [] : {};
    }
    if (keychain.length === 0) {
      if (!Array.isArray(obj[key])) {
        obj[key] = value;
      } else if (value !== null) {
        obj[key].push(value);
      }
    }
    if (keychain.length > 0) {
      assignKeyValue(obj[key], keychain, value);
    }
    return obj;
  }
  function serialize(element) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var data = {};
    options.keySplitter = options.keySplitter || keySplitter;
    options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
    options.inputReaders = new InputReaders(options.inputReaders || {});
    options.keyAssignmentValidators = new KeyAssignmentValidators(options.keyAssignmentValidators || {});
    Array.prototype.forEach.call(getInputElements(element, options), function(el) {
      var type = getElementType(el);
      var keyExtractor = options.keyExtractors.get(type);
      var key = keyExtractor(el);
      var inputReader = options.inputReaders.get(type);
      var value = inputReader(el);
      var validKeyAssignment = options.keyAssignmentValidators.get(type);
      if (validKeyAssignment(el, key, value)) {
        var keychain = options.keySplitter(key);
        data = assignKeyValue(data, keychain, value);
      }
    });
    return data;
  }
  (function(_TypeRegistry) {
    inherits(InputWriters, _TypeRegistry);
    function InputWriters(options) {
      classCallCheck(this, InputWriters);
      var _this = possibleConstructorReturn(this, (InputWriters.__proto__ || Object.getPrototypeOf(InputWriters)).call(this, options));
      _this.registerDefault(function(el, value) {
        el.value = value;
      });
      _this.register("checkbox", function(el, value) {
        if (value === null) {
          el.indeterminate = true;
        } else {
          el.checked = Array.isArray(value) ? value.indexOf(el.value) !== -1 : value;
        }
      });
      _this.register("radio", function(el, value) {
        if (value !== void 0) {
          el.checked = el.value === value.toString();
        }
      });
      _this.register("select", setSelectValue);
      return _this;
    }
    return InputWriters;
  })(TypeRegistry);
  function makeArray(arr) {
    var ret = [];
    if (arr !== null) {
      if (Array.isArray(arr)) {
        ret.push.apply(ret, arr);
      } else {
        ret.push(arr);
      }
    }
    return ret;
  }
  function setSelectValue(elem, value) {
    var optionSet, option;
    var options = elem.options;
    var values = makeArray(value);
    var i = options.length;
    while (i--) {
      option = options[i];
      if (values.indexOf(option.value) > -1) {
        option.setAttribute("selected", true);
        optionSet = true;
      }
    }
    if (!optionSet) {
      elem.selectedIndex = -1;
    }
  }
  const __viteBrowserExternal = {};
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var utf8_encode;
  var hasRequiredUtf8_encode;
  function requireUtf8_encode() {
    if (hasRequiredUtf8_encode)
      return utf8_encode;
    hasRequiredUtf8_encode = 1;
    utf8_encode = function utf8_encode2(argString) {
      if (argString === null || typeof argString === "undefined") {
        return "";
      }
      var string = argString + "";
      var utftext = "";
      var start = void 0;
      var end = void 0;
      var stringl = 0;
      start = end = 0;
      stringl = string.length;
      for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
          end++;
        } else if (c1 > 127 && c1 < 2048) {
          enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
        } else if ((c1 & 63488) !== 55296) {
          enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
        } else {
          if ((c1 & 64512) !== 55296) {
            throw new RangeError("Unmatched trail surrogate at " + n);
          }
          var c2 = string.charCodeAt(++n);
          if ((c2 & 64512) !== 56320) {
            throw new RangeError("Unmatched lead surrogate at " + (n - 1));
          }
          c1 = ((c1 & 1023) << 10) + (c2 & 1023) + 65536;
          enc = String.fromCharCode(c1 >> 18 | 240, c1 >> 12 & 63 | 128, c1 >> 6 & 63 | 128, c1 & 63 | 128);
        }
        if (enc !== null) {
          if (end > start) {
            utftext += string.slice(start, end);
          }
          utftext += enc;
          start = end = n + 1;
        }
      }
      if (end > start) {
        utftext += string.slice(start, stringl);
      }
      return utftext;
    };
    return utf8_encode;
  }
  var md5 = function md52(str) {
    var hash = void 0;
    try {
      var crypto = require$$0;
      var md5sum = crypto.createHash("md5");
      md5sum.update(str);
      hash = md5sum.digest("hex");
    } catch (e) {
      hash = void 0;
    }
    if (hash !== void 0) {
      return hash;
    }
    var utf8Encode = requireUtf8_encode();
    var xl = void 0;
    var _rotateLeft = function _rotateLeft2(lValue, iShiftBits) {
      return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
    };
    var _addUnsigned = function _addUnsigned2(lX, lY) {
      var lX4 = void 0, lY4 = void 0, lX8 = void 0, lY8 = void 0, lResult = void 0;
      lX8 = lX & 2147483648;
      lY8 = lY & 2147483648;
      lX4 = lX & 1073741824;
      lY4 = lY & 1073741824;
      lResult = (lX & 1073741823) + (lY & 1073741823);
      if (lX4 & lY4) {
        return lResult ^ 2147483648 ^ lX8 ^ lY8;
      }
      if (lX4 | lY4) {
        if (lResult & 1073741824) {
          return lResult ^ 3221225472 ^ lX8 ^ lY8;
        } else {
          return lResult ^ 1073741824 ^ lX8 ^ lY8;
        }
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    };
    var _F = function _F2(x2, y, z) {
      return x2 & y | ~x2 & z;
    };
    var _G = function _G2(x2, y, z) {
      return x2 & z | y & ~z;
    };
    var _H = function _H2(x2, y, z) {
      return x2 ^ y ^ z;
    };
    var _I = function _I2(x2, y, z) {
      return y ^ (x2 | ~z);
    };
    var _FF = function _FF2(a2, b2, c2, d2, x2, s, ac) {
      a2 = _addUnsigned(a2, _addUnsigned(_addUnsigned(_F(b2, c2, d2), x2), ac));
      return _addUnsigned(_rotateLeft(a2, s), b2);
    };
    var _GG = function _GG2(a2, b2, c2, d2, x2, s, ac) {
      a2 = _addUnsigned(a2, _addUnsigned(_addUnsigned(_G(b2, c2, d2), x2), ac));
      return _addUnsigned(_rotateLeft(a2, s), b2);
    };
    var _HH = function _HH2(a2, b2, c2, d2, x2, s, ac) {
      a2 = _addUnsigned(a2, _addUnsigned(_addUnsigned(_H(b2, c2, d2), x2), ac));
      return _addUnsigned(_rotateLeft(a2, s), b2);
    };
    var _II = function _II2(a2, b2, c2, d2, x2, s, ac) {
      a2 = _addUnsigned(a2, _addUnsigned(_addUnsigned(_I(b2, c2, d2), x2), ac));
      return _addUnsigned(_rotateLeft(a2, s), b2);
    };
    var _convertToWordArray = function _convertToWordArray2(str2) {
      var lWordCount = void 0;
      var lMessageLength = str2.length;
      var lNumberOfWordsTemp1 = lMessageLength + 8;
      var lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - lNumberOfWordsTemp1 % 64) / 64;
      var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
      var lWordArray = new Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | str2.charCodeAt(lByteCount) << lBytePosition;
        lByteCount++;
      }
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    };
    var _wordToHex = function _wordToHex2(lValue) {
      var wordToHexValue = "";
      var wordToHexValueTemp = "";
      var lByte = void 0;
      var lCount = void 0;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = lValue >>> lCount * 8 & 255;
        wordToHexValueTemp = "0" + lByte.toString(16);
        wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
      }
      return wordToHexValue;
    };
    var x = [];
    var k = void 0;
    var AA = void 0;
    var BB = void 0;
    var CC = void 0;
    var DD = void 0;
    var a = void 0;
    var b = void 0;
    var c = void 0;
    var d = void 0;
    var S11 = 7;
    var S12 = 12;
    var S13 = 17;
    var S14 = 22;
    var S21 = 5;
    var S22 = 9;
    var S23 = 14;
    var S24 = 20;
    var S31 = 4;
    var S32 = 11;
    var S33 = 16;
    var S34 = 23;
    var S41 = 6;
    var S42 = 10;
    var S43 = 15;
    var S44 = 21;
    str = utf8Encode(str);
    x = _convertToWordArray(str);
    a = 1732584193;
    b = 4023233417;
    c = 2562383102;
    d = 271733878;
    xl = x.length;
    for (k = 0; k < xl; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = _FF(a, b, c, d, x[k + 0], S11, 3614090360);
      d = _FF(d, a, b, c, x[k + 1], S12, 3905402710);
      c = _FF(c, d, a, b, x[k + 2], S13, 606105819);
      b = _FF(b, c, d, a, x[k + 3], S14, 3250441966);
      a = _FF(a, b, c, d, x[k + 4], S11, 4118548399);
      d = _FF(d, a, b, c, x[k + 5], S12, 1200080426);
      c = _FF(c, d, a, b, x[k + 6], S13, 2821735955);
      b = _FF(b, c, d, a, x[k + 7], S14, 4249261313);
      a = _FF(a, b, c, d, x[k + 8], S11, 1770035416);
      d = _FF(d, a, b, c, x[k + 9], S12, 2336552879);
      c = _FF(c, d, a, b, x[k + 10], S13, 4294925233);
      b = _FF(b, c, d, a, x[k + 11], S14, 2304563134);
      a = _FF(a, b, c, d, x[k + 12], S11, 1804603682);
      d = _FF(d, a, b, c, x[k + 13], S12, 4254626195);
      c = _FF(c, d, a, b, x[k + 14], S13, 2792965006);
      b = _FF(b, c, d, a, x[k + 15], S14, 1236535329);
      a = _GG(a, b, c, d, x[k + 1], S21, 4129170786);
      d = _GG(d, a, b, c, x[k + 6], S22, 3225465664);
      c = _GG(c, d, a, b, x[k + 11], S23, 643717713);
      b = _GG(b, c, d, a, x[k + 0], S24, 3921069994);
      a = _GG(a, b, c, d, x[k + 5], S21, 3593408605);
      d = _GG(d, a, b, c, x[k + 10], S22, 38016083);
      c = _GG(c, d, a, b, x[k + 15], S23, 3634488961);
      b = _GG(b, c, d, a, x[k + 4], S24, 3889429448);
      a = _GG(a, b, c, d, x[k + 9], S21, 568446438);
      d = _GG(d, a, b, c, x[k + 14], S22, 3275163606);
      c = _GG(c, d, a, b, x[k + 3], S23, 4107603335);
      b = _GG(b, c, d, a, x[k + 8], S24, 1163531501);
      a = _GG(a, b, c, d, x[k + 13], S21, 2850285829);
      d = _GG(d, a, b, c, x[k + 2], S22, 4243563512);
      c = _GG(c, d, a, b, x[k + 7], S23, 1735328473);
      b = _GG(b, c, d, a, x[k + 12], S24, 2368359562);
      a = _HH(a, b, c, d, x[k + 5], S31, 4294588738);
      d = _HH(d, a, b, c, x[k + 8], S32, 2272392833);
      c = _HH(c, d, a, b, x[k + 11], S33, 1839030562);
      b = _HH(b, c, d, a, x[k + 14], S34, 4259657740);
      a = _HH(a, b, c, d, x[k + 1], S31, 2763975236);
      d = _HH(d, a, b, c, x[k + 4], S32, 1272893353);
      c = _HH(c, d, a, b, x[k + 7], S33, 4139469664);
      b = _HH(b, c, d, a, x[k + 10], S34, 3200236656);
      a = _HH(a, b, c, d, x[k + 13], S31, 681279174);
      d = _HH(d, a, b, c, x[k + 0], S32, 3936430074);
      c = _HH(c, d, a, b, x[k + 3], S33, 3572445317);
      b = _HH(b, c, d, a, x[k + 6], S34, 76029189);
      a = _HH(a, b, c, d, x[k + 9], S31, 3654602809);
      d = _HH(d, a, b, c, x[k + 12], S32, 3873151461);
      c = _HH(c, d, a, b, x[k + 15], S33, 530742520);
      b = _HH(b, c, d, a, x[k + 2], S34, 3299628645);
      a = _II(a, b, c, d, x[k + 0], S41, 4096336452);
      d = _II(d, a, b, c, x[k + 7], S42, 1126891415);
      c = _II(c, d, a, b, x[k + 14], S43, 2878612391);
      b = _II(b, c, d, a, x[k + 5], S44, 4237533241);
      a = _II(a, b, c, d, x[k + 12], S41, 1700485571);
      d = _II(d, a, b, c, x[k + 3], S42, 2399980690);
      c = _II(c, d, a, b, x[k + 10], S43, 4293915773);
      b = _II(b, c, d, a, x[k + 1], S44, 2240044497);
      a = _II(a, b, c, d, x[k + 8], S41, 1873313359);
      d = _II(d, a, b, c, x[k + 15], S42, 4264355552);
      c = _II(c, d, a, b, x[k + 6], S43, 2734768916);
      b = _II(b, c, d, a, x[k + 13], S44, 1309151649);
      a = _II(a, b, c, d, x[k + 4], S41, 4149444226);
      d = _II(d, a, b, c, x[k + 11], S42, 3174756917);
      c = _II(c, d, a, b, x[k + 2], S43, 718787259);
      b = _II(b, c, d, a, x[k + 9], S44, 3951481745);
      a = _addUnsigned(a, AA);
      b = _addUnsigned(b, BB);
      c = _addUnsigned(c, CC);
      d = _addUnsigned(d, DD);
    }
    var temp = _wordToHex(a) + _wordToHex(b) + _wordToHex(c) + _wordToHex(d);
    return temp.toLowerCase();
  };
  const md5$1 = /* @__PURE__ */ getDefaultExportFromCjs(md5);
  (function($2) {
    jQuery.fn.isolatedScroll = function() {
      return this.on("mousewheel DOMMouseScroll", function(e) {
        var bottomOverflow, delta, topOverflow;
        delta = e.wheelDelta || e.originalEvent && e.originalEvent.wheelDelta || -e.detail;
        bottomOverflow = this.scrollTop + jQuery(this).outerHeight() - this.scrollHeight >= 0;
        topOverflow = this.scrollTop <= 0;
        if (delta < 0 && bottomOverflow || delta > 0 && topOverflow) {
          return e.preventDefault();
        }
      });
    };
  })(jQuery);
  (function($2) {
    $2.ZnFramework = function() {
      this.scope = $2(".zn_pb_wrapper");
      this.publish_button = $2(".zn_publish");
      this.columns_widths = "col-md-12 col-md-11 col-md-10 col-md-9 col-md-8 col-md-7 col-md-6 col-md-5 col-md-4 col-md-3 col-md-2 col-md-1-5 col-sm-12 col-sm-11 col-sm-10 col-sm-9 col-sm-8 col-sm-7 col-sm-6 col-sm-5 col-sm-4 col-sm-3 col-sm-2 col-sm-1-5";
      this.body = $2("body");
      this.zinit();
    };
    $2.ZnFramework.prototype = {
      zinit: function() {
        var fw = this;
        fw.addactions();
        fw.refresh_events(this.body);
        fw.remove_el();
        fw.zn_bind_sortable();
        fw.check_element_content();
      },
      /**
       * Refresh and start the pagebuilder
       */
      refresh_events: function(content) {
        var fw = this;
        fw.show_element_save(content);
        fw.launch_sortable(content);
        fw.check_sortable_content();
        fw.clone_el(content);
      },
      refresh_fw_content: function(content) {
        var fw = this;
        fw.do_live_change(content);
        fw.enable_options_tabs(content);
      },
      /**
       * Bind specific actions
       */
      addactions: function() {
        var fw = this;
        fw.show_element_options();
        fw.select_width();
        fw.showHideElement();
        fw.scope.on("ZnNewContent", function(e) {
          fw.refresh_events(e.content);
        });
        fw.scope.on("ZnNewFWContent", function(e) {
          fw.refresh_fw_content(e.content);
        });
      },
      check_element_content: function() {
        $2(".zn_pb_wrapper .zn_pb_el_container").each(function() {
          if ($2(this).height() < 2 && $2(this).is(":visible")) {
            $2(this).append(
              '<div class="zn-pb-notification">Please configure the element options.</div>'
            );
          }
        });
      },
      isolate_scroll: function(scope) {
        $2(scope).find(".zn-modal-form").isolatedScroll();
      },
      getElementData: function(elementUid, prop) {
        var elementData = {};
        if (elementUid && window.ZnPbData.current_layout[elementUid]) {
          if (prop) {
            elementData = window.ZnPbData.current_layout[elementUid]["data"][prop];
          } else {
            elementData = window.ZnPbData.current_layout[elementUid];
          }
        }
        return elementData;
      },
      /**
       * Will fire up all the sortables ( columns and elements )
       */
      launch_sortable: function(scope) {
        var fw = this;
        $2(scope).find(".zn_columns_container").sortable(fw.sortable_arguments("column_element"));
        $2(scope).find(".zn_sortable_content").sortable(fw.sortable_arguments("content_element"));
      },
      /**
       * Returns the sortable arguments for each type
       */
      sortable_arguments: function(scope) {
        var fw = this, element = scope == "content_element" ? ".zn_pb_wrapper .zn_sortable_content, .zn_pb_wrapper" : ".zn_pb_wrapper .zn_columns_container", placeholder = scope == "content_element" ? "zn_element_placeholder" : "zn_columns_placeholder", cusorAt = scope == "content_element" ? { left: 125, top: 0 } : { left: 0, top: 0 }, tolerance = scope == "content_element" ? "pointer" : "intersect";
        return {
          tolerance,
          cursorAt: cusorAt,
          connectWith: element,
          helper: function() {
            return '<div class="zn_dragging_placeholder"></div>';
          },
          handle: "> .zn_el_options_bar > a.zn_pb_group_handle",
          placeholder,
          start: function(event, ui) {
            $2(".ui-sortable").sortable("refreshPositions");
            fw.body.addClass("zn_dragg_enabled");
            if (scope == "content_element") {
              ui.placeholder.html('<div class="znpb-placeholder"></div>');
            } else {
              $2(".zn_columns_container").addClass("zn_drop_allowed");
              ui.placeholder.html('<div class="znpb-placeholder"></div>');
            }
          },
          change: function(event, ui) {
            if (scope !== "content_element") {
              var helper_height = $2(ui.helper).prev().height();
              ui.placeholder.css("height", helper_height);
            }
          },
          stop: function(event, ui) {
            if (ui.item.hasClass("zn_pb_element")) {
              fw.place_draggable(event, ui);
            }
            $2(".ui-sortable-disabled").sortable("enable");
            fw.body.removeClass("zn_dragg_enabled");
            $2(".zn_drop_allowed").removeClass("zn_drop_allowed");
            fw.check_sortable_content();
            fw.scope.trigger({ type: "ZnWidthChanged", content: ui.item });
            $2(ui.helper).remove();
          },
          receive: function() {
            fw.check_sortable_content();
          }
        };
      },
      place_draggable: function(event, ui) {
        var fw = this;
        var el = $2(ui.item);
        if (el.hasClass("znpb_cancel_drop")) {
          $2(event.target).sortable("cancel");
          el.remove();
          return false;
        }
        $2(event.target).removeClass("zn_pb_no_content");
        var saved_element_name = $2(el).data("template"), widget_id = $2(el).data("widget");
        var saveElementConfig = {
          elementName: saved_element_name,
          isSingle: $2(el).data("is_single") || false
        };
        fw.render_element(
          el,
          "znpb_render_module",
          false,
          saveElementConfig,
          widget_id
        );
      },
      set_element_option: function(option_id, option_value, el) {
        var fw = this, $el = $2(el).hasClass(".zn_pb_el_container") ? $2(el) : $2(el).closest(".zn_pb_el_container"), element_uid = $el.data("uid");
        if (!$el.length) {
          return;
        }
        var options = fw.get_values($el);
        if (!$2.isEmptyObject(options)) {
          options[option_id] = option_value;
          window.ZnPbData.current_layout[element_uid].options = options;
        }
      },
      // GETS SAVED VALUES FROM VAULT
      get_values: function(el) {
        var element_uid = $2(el).data("uid"), values = {};
        if (element_uid && window.ZnPbData.current_layout[element_uid]) {
          values = window.ZnPbData.current_layout[element_uid].data.options;
        }
        return values;
      },
      build_map: function(scope, removeUIds, widget) {
        var fw = this, JsonData = {};
        scope.each(function(sectionIndex, a) {
          var el = $2(this), contenta = {}, zoptions = fw.get_values(el);
          var content = el.find(".zn_content").filter(function() {
            return $2(this).parentsUntil(el, ".zn_content").length === 0;
          });
          if (el.data("has_multiple")) {
            if (fw.stop_order && fw.stop_order != "undefined" && !$2.isEmptyObject(fw.stop_order)) {
              var cached_stop_order = fw.stop_order;
              fw.stop_order = {};
              $2.each(cached_stop_order, function(k, v) {
                if (v === "deleted") {
                  return true;
                }
                if (typeof v.refreshUid !== "undefined" && v.refreshUid) {
                  removeUIds = true;
                }
                contenta[k] = fw.build_map(v, removeUIds);
              });
            } else {
              for (var i = 0; i < content.length; i++) {
                contenta[i] = fw.build_map(
                  $2(content[i]).children(".zn_pb_section"),
                  removeUIds
                );
              }
            }
            contenta.has_multiple = true;
          } else {
            contenta = fw.build_map(
              content.children(".zn_pb_section"),
              removeUIds
            );
          }
          if (widget) {
            zoptions.widget = widget;
          }
          var sectionconfig = {
            object: el.data("object") || "",
            options: zoptions || "",
            content: contenta || "",
            width: fw.get_col_size(el)[0] || "",
            //   widget: widget || "",
            isHidden: fw.getElementData(el.data("uid"), "isHidden")
          };
          if (!removeUIds) {
            sectionconfig.uid = el.data("uid");
          }
          JsonData[sectionIndex] = sectionconfig;
        });
        return JsonData;
      },
      render_element: function(scope, action, clean_uid, saveElementConfig, widget) {
        var fw = this, JsonData = fw.build_map(scope, clean_uid, widget), placeholder = $2(scope), data = {
          action,
          template: JSON.stringify(JsonData),
          post_id: window.ZnPbData.postId,
          security: ZnAjax.security
        };
        if (typeof saveElementConfig != "undefined") {
          data.template_name = saveElementConfig.elementName;
          data.isSingle = saveElementConfig.isSingle;
        }
        if (action == "znpb_clone_element") {
          placeholder = $2(
            '<div class="zn_loading_placeholder"></div>'
          ).insertAfter(scope);
        }
        fw.scope.trigger({
          type: "ZnBeforePlaceholderReplace",
          content: $2(placeholder)
        });
        $2(placeholder).replaceWith(
          '<div class="znpb-loading-bar"> <div class="znpb-loading-bar-inner"><div class="znpb-loading-bar-inner-loading"></div></div></div>'
        );
        fw.show_page_loading(false);
        $2(".znpb-loading-bar-inner-loading").width(50 + Math.random() * 30 + "%");
        jQuery.post(
          ZnAjax.ajaxurl,
          data,
          function(response) {
            if (response) {
              $2(".znpb-loading-bar-inner-loading").width("100%").delay(200).fadeIn(400, function() {
                var new_content = $2(response.template).filter(".zn_pb_el_container").addClass("znpb-animated ZnBounceIn");
                fw.scope.trigger({
                  type: "ZnNewContent_before",
                  content: new_content
                });
                try {
                  $2(".znpb-loading-bar").replaceWith(new_content);
                  var hasImages = new_content.find("img");
                  if (hasImages.length > 0) {
                    new_content.one("load", function() {
                      if (new_content.height() < 2) {
                        new_content.append(
                          '<div class="zn-pb-notification">Please configure the element options.</div>'
                        );
                      }
                    });
                  } else {
                    if (new_content.height() < 2) {
                      new_content.append(
                        '<div class="zn-pb-notification">Please configure the element options.</div>'
                      );
                    }
                  }
                } catch (e) {
                  console.warn("ZnTheme Error received: " + e);
                }
                fw.scope.trigger({
                  type: "ZnNewContent",
                  content: new_content
                });
                fw.add_to_factory(response.current_layout);
                fw.hide_page_loading(false);
              });
            }
          },
          "json"
        ).fail(function() {
          alert("There was an error");
          fw.hide_page_loading(false);
          $2(".znpb-loading-bar").remove();
        });
      },
      add_to_factory: function(data) {
        $2.each(data, function() {
          window.ZnPbData.current_layout[this.data.uid] = this;
        });
      },
      enable_options_tabs: function(scope) {
        var elements2 = scope ? scope.find(".zn-options-tab-header > a") : $2(".zn-options-tab-header > a");
        elements2.on("click", function(e) {
          e.preventDefault();
          var tab = $2(this).data("zntab"), modal = $2(this).closest(".zn-modal-form");
          modal[0].scrollTop = 0;
          $2(this).closest(".zn-tabs-container").children(".zn-options-tab-content.zn-tab-active").removeClass("zn-tab-active");
          $2(this).closest(".zn-tabs-container").find("> .zn-options-tab-header > .zn-tab-active").removeClass("zn-tab-active");
          $2(this).closest(".zn-tabs-container").find(".zn-tab-key-" + tab).add($2(this)).addClass("zn-tab-active");
        });
      },
      zn_apply_live_style: function(config, that) {
        var el = config.css_class, type = config.type, val_prepend = config.val_prepend, input_el = $2(":input", that).is('[data-live-input="1"]') ? $2('[data-live-input="1"]:input', that) : $2(":input", that), input_el = input_el.not('[type="button"]'), val = input_el.val(), input = input_el.last();
        if (typeof config.is_in_group != "undefined") {
          var modal_instanceNr = $2.ZnModal.openInstance.length - 1, opt_form_placeholder = $2(
            ".zn_modal_placeholder_" + modal_instanceNr
          ).closest(".zn_group"), position = $2(opt_form_placeholder).index();
          el = $2(el).eq(position);
        }
        if (type == "css") {
          var unit = $2(":input", that).is('[data-live-unit="1"]') ? $2('[data-live-unit="1"]:input', that).val() : config.unit;
          var rules = $2(":input", that).is("[data-live-property]") ? $2("[data-live-property]:input", that) : config.css_rule.split(",");
          var rules_to_apply = {};
          $2(rules).each(function(i, property) {
            var v = val + (val ? unit : "");
            if ($2(property).is("[data-live-property]")) {
              if (!$2(property).is(":checked")) {
                v = "";
              }
              property = $2(property).attr("data-live-property");
            }
            rules_to_apply[property] = v;
          });
          $2(el).css(rules_to_apply);
        } else if (type == "boxmodel") {
          input_el.each(function(index, property) {
            var boxRule = config.css_rule;
            $2(el).css(
              boxRule + "-" + $2(property).attr("data-side"),
              $2(property).val()
            );
          });
        } else if (type == "font") {
          input_el.each(function(index, property) {
            $2(el).css(
              $2(property).attr("data-live-font-property"),
              $2(property).val()
            );
          });
        } else if (type == "font_icon") {
          var font_family = $2(":input.zn_icon_family", that).val(), zn_icon_unicode = $2(":input.zn_icon_unicode", that).val();
          var unicode = zn_icon_unicode.split("u").join("0x");
          var converted_unicode = String.fromCharCode(unicode);
          if ($2(el).length === 0) {
            $2(that).closest(".zn_option_container").removeClass("zn_live_change");
          } else {
            $2(el).attr("data-zniconfam", font_family).attr("data-zn_icon", converted_unicode);
          }
        } else if (type == "hide") {
          if (input.is(":checked")) {
            $2(el).show();
          } else {
            $2(el).hide();
          }
        } else if (type == "class") {
          if (input.attr("type") == "checkbox") {
            if (input.is(":checked")) {
              $2(el).addClass(input.val());
            } else {
              $2(el).removeClass(input.val());
            }
          } else {
            var values;
            if (input.attr("type") == "radio") {
              values = $2.map($2("input", that), function(option) {
                return option.value;
              });
              var selectedInput = input_el.filter(":checked");
              val = selectedInput.val();
            } else {
              values = $2.map($2("select option", that), function(option) {
                return option.value;
              });
            }
            if (typeof val_prepend != "undefined" && val_prepend.length > 0) {
              values = $2.map(values, function(option) {
                return val_prepend + option;
              });
              val = val_prepend + val;
            }
            $2(el).removeClass(values.join(" "));
            $2(el).addClass(val);
          }
        }
        if (typeof config.tasks != "undefined") {
          var tasks = config.tasks;
          if (!jQuery.isEmptyObject(tasks)) {
            $2.each(tasks, function(idx, task) {
              var condition_type = task.condition_type, css_class = task.css_class, property = task.property, options = task.options, property_value = task.property_value;
              var can_set = false;
              for (var key in options) {
                if (options[key] === val) {
                  can_set = true;
                }
              }
              if (can_set) {
                if (condition_type === "set") {
                  $2(css_class).css(property, property_value);
                }
                if (condition_type === "remove") {
                  $2(css_class).css(property, "");
                }
              }
            });
          }
        }
      },
      do_live_change: function(scope) {
        var elements2 = scope ? scope.find(".zn_live_change") : $2(".zn_live_change"), fw = this;
        elements2.on("change zn_change", function() {
          var config = $2(this).data("live_setup"), that = this;
          if (typeof config.multiple != "undefined" && config.multiple.length > 0) {
            for (var i = config.multiple.length - 1; i >= 0; i--) {
              fw.zn_apply_live_style(config.multiple[i], that);
            }
          } else {
            fw.zn_apply_live_style(config, that);
          }
        });
      },
      select_width: function() {
        var fw = this;
        fw.scope.on(
          "click",
          ".zn_pb_select_width .znpb_sizes_container span",
          function() {
            var section = $2(this).closest(".zn_pb_section"), selected_width = $2(this).data("width");
            section.removeClass(fw.columns_widths);
            section.addClass(selected_width);
            var small_class = selected_width.replace("col-md-", "col-sm-");
            section.addClass(small_class);
            section.find(".selected_width").first().removeClass("selected_width");
            $2(this).addClass("selected_width");
            fw.scope.trigger({ type: "ZnWidthChanged", content: section });
          }
        );
      },
      get_col_size: function(column) {
        if (column.hasClass("col-md-12"))
          return ["col-md-12", "col-md-12", "col-md-11", "12/12"];
        else if (column.hasClass("col-md-11"))
          return ["col-md-11", "col-md-12", "col-md-10", "11/12"];
        else if (column.hasClass("col-md-10"))
          return ["col-md-10", "col-md-11", "col-md-9", "10/12"];
        else if (column.hasClass("col-md-9"))
          return ["col-md-9", "col-md-10", "col-md-8", "9/12"];
        else if (column.hasClass("col-md-8"))
          return ["col-md-8", "col-md-9", "col-md-7", "8/12"];
        else if (column.hasClass("col-md-7"))
          return ["col-md-7", "col-md-8", "col-md-6", "7/12"];
        else if (column.hasClass("col-md-6"))
          return ["col-md-6", "col-md-7", "col-md-5", "6/12"];
        else if (column.hasClass("col-md-5"))
          return ["col-md-5", "col-md-6", "col-md-4", "5/12"];
        else if (column.hasClass("col-md-4"))
          return ["col-md-4", "col-md-5", "col-md-3", "4/12"];
        else if (column.hasClass("col-md-3"))
          return ["col-md-3", "col-md-4", "col-md-2", "3/12"];
        else if (column.hasClass("col-md-2"))
          return ["col-md-2", "col-md-3", "col-md-2", "2/12"];
        else if (column.hasClass("col-md-1-5"))
          return ["col-md-1-5", "col-md-2", "col-md-1-5", "1/5"];
        else
          return false;
      },
      zn_bind_sortable: function() {
        var fw = this;
        fw.scope.on("mousedown", ".zn_pb_group_handle", function(e) {
          var that = $2(this), currentLevel = that.data("level");
          $2(".zn_sortable_content").each(function() {
            var $this = $2(this);
            if ($this.data("droplevel") >= currentLevel) {
              $this.sortable("disable");
            } else {
              $2(this).addClass("zn_drop_allowed");
            }
          });
        });
        $2(document).on("mouseup", ".zn_pb_group_handle", function() {
          fw.body.removeClass("zn_dragg_enabled");
        });
      },
      /**
       * Check if the sortable UI's are empty
       */
      check_sortable_content: function() {
        $2(
          ".zn_pb_wrapper, .zn_pb_wrapper .zn_sortable_content , .zn_pb_wrapper .zn_columns_container"
        ).each(function() {
          if ($2(this).children().length === 0) {
            $2(this).addClass("zn_pb_no_content");
          } else if ($2(this).children().length > 0) {
            $2(this).removeClass("zn_pb_no_content");
          }
        });
      },
      hide_editor: function() {
        store.dispatch("hideEditor");
      },
      show_editor: function() {
        store.dispatch("showEditor");
      },
      show_page_loading: function(full) {
        var body = $2("body");
        body.addClass("znpb-loading-in-progress");
        this.publish_button.addClass("zn_active");
        if (full) {
          body.addClass("zn_pb_loading");
        }
      },
      hide_page_loading: function(full) {
        var body = $2("body");
        body.removeClass("znpb-loading-in-progress");
        this.publish_button.removeClass("zn_active");
        if (full) {
          body.removeClass("zn_pb_loading");
        }
      },
      //ELEMENT ACTIONS
      clone_el: function(scope) {
        var fw = this, element = scope ? scope.find(".zn_pb_clone_button") : $2(".zn_pb_clone_button");
        $2(element).on("click", function() {
          var el = $2(this).closest(".zn_pb_section");
          fw.render_element(el, "znpb_clone_element", true);
        });
      },
      remove_el: function() {
        var fw = this;
        $2(document).on("click", ".zn_pb_remove", function(e) {
          e.preventDefault();
          var element_to_delete = $2(this).closest(".zn_pb_el_container"), element_container = element_to_delete.parent(), el = this, callback = function() {
            fw.scope.trigger({
              type: "ZnBeforeElementRemove",
              content: $2(element_to_delete)
            });
            element_to_delete.remove();
            if (element_container.children().length < 1) {
              element_container.addClass("zn_pb_no_content");
            }
            if (element_container.has(".ui-sortable")) {
              element_container.sortable("refreshPositions");
              element_container.sortable("refresh");
            }
            element_to_delete = null;
            element_container = null;
            $2(document).off("click", el);
          };
          new $2.ZnModalConfirm(
            "Are you sure you want to remove this element ?",
            "No",
            "Yes",
            callback
          );
        });
      },
      show_element_save: function(scope) {
        var fw = this, element = scope ? scope.find(".znpb-element-save-trigger") : $2(".znpb-element-save-trigger");
        $2(element).on("click", function(e) {
          e.preventDefault();
          fw.hide_editor();
          var params = {}, element_uid = $2(this).data("uid"), main_element = $2(this).closest(".zn_pb_el_container"), level = $2(this).closest(".zn_pb_el_container").data("level");
          params.modal_ajax_hook = "znpb_save_module";
          params.modal_backdrop_class = "zn-modal-transparent";
          params.modal_ajax_params = {
            element_uid,
            element_level: level,
            post_id: window.ZnPbData.postId
          };
          params.modal_title = "Save element";
          params.extra_data = main_element;
          params.modal_on_ajax_load = function(e2) {
            fw.znpb_save_element(e2.modal, e2);
            fw.export_element(e2.modal, e2);
          };
          new $2.ZnModal(params);
        });
        return false;
      },
      znpb_save_element: function(scope, modal) {
        var fw = this, element = scope ? scope.find(".zn_button_save_element") : $2(".zn_button_save_element");
        $2(".zn_save_element_form").on("submit", function(e) {
          e.preventDefault();
        });
        element.click(function(e) {
          e.preventDefault();
          var data = {}, input = $2(this).closest(".zn_save_element_form").find(".zn_input"), saved_name = input.val();
          $2(this).data("uid");
          var level = $2(this).data("level"), JsonData = fw.build_map($2(modal.options.extra_data), true);
          if (typeof saved_name == "undefined" || saved_name.length === 0) {
            alert("Please enter a name for this saved element");
            return;
          }
          data = {
            action: "znpb_do_save_element",
            template: JSON.stringify(JsonData),
            level,
            template_name: saved_name,
            post_id: window.ZnPbData.postId,
            security: ZnAjax.security
          };
          fw.show_page_loading(true);
          jQuery.post(ZnAjax.ajaxurl, data, function(response) {
            if (response.message) {
              new $2.ZnModalMessage(response.message);
              store.dispatch("addSavedElement", {
                name: saved_name,
                level
              });
              input.val("");
              modal.close();
            } else {
              input.val("");
              modal.close();
              new $2.ZnModalMessage("There was a problem saving the template !");
            }
            fw.show_editor();
            $2(".znpb_saved_elements").trigger("click");
          });
          fw.hide_page_loading(true);
        });
      },
      export_element: function(scope, modal) {
        var fw = this, element = scope ? scope.find(".zn_button_export_element") : $2(".zn_button_export_element");
        element.click(function(e) {
          e.preventDefault();
          var data = {}, input = $2(this).closest(".zn_save_element_form").find(".zn_input"), saved_name = input.val();
          $2(this).data("uid");
          var level = $2(this).data("level"), JsonData = fw.build_map($2(modal.options.extra_data), true);
          if (typeof saved_name == "undefined" || saved_name.length === 0) {
            alert("Please enter a name for this saved element");
            return;
          }
          data = {
            action: "zn_export_template",
            template: JSON.stringify(JsonData),
            level,
            template_name: saved_name,
            post_id: window.ZnPbData.postId,
            security: ZnAjax.security
          };
          fw.show_page_loading(true);
          jQuery.post(ZnAjax.ajaxurl, data, function(response) {
            fw.hide_page_loading(true);
            if (response.success === true) {
              window.showed_message = true;
              location.href = ZnAjax.ajaxurl + "?action=znpb_download_export&file_name=" + saved_name + "&nonce=" + ZnAjax.security;
            } else {
              new $2.ZnModalMessage(
                "There was a problem exporting the template: " + saved_name
              );
              console.error("Error: ", saved_name);
            }
            modal.close();
            fw.show_editor();
          });
        });
      },
      show_element_options: function() {
        var fw = this;
        fw.scope.on("click", ".znpb-element-options-trigger", function(e) {
          e.preventDefault();
          fw.hide_editor();
          var params = {}, element_uid = $2(this).data("uid"), main_element = $2(this).closest(".zn_pb_el_container"), options = window.ZnPbData.current_layout[element_uid];
          if (typeof options === "undefined") {
            window.ZnPbData.current_layout[element_uid] = {
              object: "ZnColumn",
              width: fw.get_col_size(main_element)[0] || "",
              // GET OPTION CONTAINER
              uid: element_uid,
              options: {},
              content: {}
            };
            options = window.ZnPbData.current_layout[element_uid];
          }
          if (typeof options.data !== "undefined" && typeof options.data.content !== "undefined" && !$2.isEmptyObject(options.data.content)) {
            options.data.content = {};
          }
          params.modal_ajax_hook = "znpb_get_module_option";
          params.modal_class = "znpb-main-modal";
          params.close_button_title = "Close without saving";
          params.modal_backdrop_class = "zn-modal-transparent";
          params.modal_ajax_params = {
            element_options: JSON.stringify(options),
            post_id: window.ZnPbData.postId
          };
          params.modal_title = $2(this).closest(".zn_pb_section").data("el-name");
          params.modal_on_close = function(e2) {
            var colorPickers = e2.modal.find(".wp-color-picker");
            if (colorPickers.length > 0) {
              colorPickers.each(function(el) {
                if (typeof $2(this).data("wpWpColorPicker") !== "undefined") {
                  $2(this).wpColorPicker("close");
                }
              });
            }
            var form = e2.modal.find(".zn-modal-form"), new_content_checksum = md5$1(fw.get_checksum(form));
            if (form.length > 0 && $2.page_builder.active_edit_checksum !== null && new_content_checksum !== fw.active_edit_checksum) {
              var callback = function() {
                e2.preventClose = false;
                fw.stop_order = {};
                e2.close(true);
              };
              new $2.ZnModalConfirm(
                "You have unsaved options! Any unsaved options will be lost! <br /><b>Are you sure you want to close the options panel?</b>",
                "No",
                "Yes",
                callback
              );
              e2.preventClose = true;
            }
          };
          params.modal_on_ajax_load = function(e2) {
            var form = e2.modal.find(".zn-modal-form");
            form.on("submit", function(e3) {
              e3.preventDefault();
            });
            if (typeof wp !== "undefined" && typeof options !== "undefined" && options.class === "ZnWidgetElement") {
              if (wp.textWidgets) {
                let widgetContainer = form.find(".zn-pb-widget-fields");
                widgetContainer.addClass("open");
                var event = new jQuery.Event("widget-added");
                wp.textWidgets.handleWidgetAdded(event, widgetContainer);
                wp.mediaWidgets.handleWidgetAdded(event, widgetContainer);
                if (wp.customHtmlWidgets) {
                  wp.customHtmlWidgets.handleWidgetAdded(event, widgetContainer);
                }
              }
            }
            function save_order(sort_option2, initial_setup2) {
              sort_option2.children().each(function(idx, element) {
                var x = initial_setup2[$2(element).data("idx")];
                if (x && typeof x != "undefined") {
                  fw.stop_order[idx] = x;
                } else {
                  fw.stop_order[idx] = $2("<div></div>");
                }
              });
            }
            if (main_element.data("has_multiple")) {
              var sort_option = form.find(".zn_group_inner").first();
              var elements2 = sort_option.children();
              var content = main_element.find(".zn_content").filter(function() {
                return jQuery(this).parentsUntil(main_element, ".zn_content").length === 0;
              });
              var initial_setup = {};
              fw.stop_order = {};
              elements2.each(function(idx, element) {
                initial_setup[idx] = $2(content[idx]).children(".zn_pb_section");
              });
              sort_option.children().not(".ui-sortable-placeholder").each(function(idx, element) {
                $2(element).data("idx", idx);
              });
              save_order(sort_option, initial_setup);
              sort_option.find(".zn_remove").on("click", function() {
                $2(document).one("znpb:element:removed", function(event2, el) {
                  fw.stop_order[$2(el).data("idx")] = "deleted";
                });
              });
              sort_option.find(".zn_clone_button").on(
                "znpb:element:cloned",
                function(event2, oldContent, newContent) {
                  var clonedElementIndex = newContent.index(), oldContentElementIndex = oldContent.index();
                  newContent.data("idx", clonedElementIndex);
                  initial_setup[clonedElementIndex] = initial_setup[oldContentElementIndex];
                  initial_setup[clonedElementIndex].refreshUid = true;
                  save_order(sort_option, initial_setup);
                }
              );
              sort_option.on("sortupdate", function(event2, ui) {
                save_order(sort_option, initial_setup);
              });
            }
            fw.isolate_scroll(e2.modal);
            fw.active_edit_checksum = md5$1(fw.get_checksum(form));
          };
          params.footer = function(modal) {
            var footer = '<div class="znpb_modal_options_footer">';
            footer += '<a href="#" class="zn-btn-confirm zn-btn-green zn-attach-save-event">SAVE</a>';
            footer += '<a href="#" class="zn-btn-confirm zn-btn-done zn-attach-saveclose-event">SAVE & CLOSE</a>';
            footer += "</div>";
            var $footer = $2(footer);
            $2(".zn-attach-save-event", $footer).on("click", function(e2) {
              e2.preventDefault();
              $2(window).trigger("debouncedresize");
              if (typeof tinyMCE !== "undefined") {
                tinyMCE.triggerSave();
              }
              var form = modal.modal.find(".zn-modal-form");
              fw.update_el(modal.modal);
              fw.active_edit_checksum = md5$1(fw.get_checksum(form));
            });
            $2(".zn-attach-saveclose-event", $footer).on("click", function(e2) {
              e2.preventDefault();
              $2(window).trigger("debouncedresize");
              if (typeof tinyMCE !== "undefined") {
                tinyMCE.triggerSave();
              }
              var colorPickers = modal.modal.find(".wp-color-picker");
              if (colorPickers.length > 0) {
                colorPickers.each(function(el) {
                  if (typeof $2(this).data("wpWpColorPicker") !== "undefined") {
                    $2(this).wpColorPicker("close");
                  }
                });
              }
              fw.update_el(modal.modal);
              fw.stop_order = {};
              modal.close(true);
            });
            return $footer;
          };
          new $2.ZnModal(params);
        });
        return false;
      },
      showHideElement: function() {
        var fw = this;
        $2(document).on("click", ".zn_pb_hide_element_button", function(e) {
          e.preventDefault();
          var $elementContainer = $2(this).closest(".zn_pb_el_container"), isHidden = $elementContainer.hasClass("znklpb-element-hidden");
          if (isHidden) {
            $elementContainer.removeClass("znklpb-element-hidden");
          } else {
            $elementContainer.attr(
              "data-hidden-text",
              window.ZnPbData.l10n.hidden_text
            );
            $elementContainer.addClass("znklpb-element-hidden");
          }
          fw.setElementVisibility($elementContainer, !isHidden);
        });
      },
      setElementVisibility: function($elementContainer, isHidden) {
        var elementUid = $elementContainer.data("uid"), elementData = this.getElementData(elementUid);
        if (!$2.isEmptyObject(elementData)) {
          window.ZnPbData.current_layout[elementUid].data.isHidden = isHidden;
        }
      },
      update_el: function(scope) {
        var fw = this, form = scope.find(".zn-modal-form").first(), element_uid = form.data("uid"), element = $2('.zn_pb_el_container[data-uid="' + element_uid + '"]'), new_content_checksum = md5$1(fw.get_checksum(form));
        if (form.length === 0) {
          return false;
        }
        fw.body.removeClass("znpb-options-opened");
        if (typeof window.ZnPbData.current_layout[element_uid] != "undefined") {
          window.ZnPbData.current_layout[element_uid].data.options = fw.get_form_values(form);
        } else {
          window.ZnPbData.current_layout[element_uid].data.options = fw.get_form_values(form);
        }
        if ($2.page_builder.active_edit_checksum !== null && new_content_checksum === fw.active_edit_checksum) {
          return;
        }
        fw.render_element(element, "znpb_render_module");
      },
      get_form_values: function(scope) {
        var $inputs = $2(":input", scope);
        var values = {};
        $inputs.each(function() {
          values[this.name] = $2(this).val();
        });
        return serialize(scope[0], {
          inputReaders: {
            checkbox: (el) => el.getAttribute("value") !== null ? el.checked ? el.getAttribute("value") : "zn_dummy_value" : el.checked
          }
        });
      },
      get_checksum: function(scope) {
        var elements2 = $2(scope).find(".zn_option_container").not(".zn_live_change").find(":input").not("[type=button]"), checksum = "";
        elements2.each(function() {
          if ($2(this).is(":checkbox") && !$2(this).is(":checked")) {
            return;
          }
          if ($2(this).is(":radio") && !$2(this).is(":checked")) {
            return;
          }
          checksum += $2(this).attr("name") + $2(this).val();
        });
        return checksum;
      }
    };
    window.klpb = window.klpb || {};
    window.klpb.app = new $2.ZnFramework();
    $2.page_builder = window.klpb.app;
  })(jQuery);
  window.hg = window.hg || {};
  const app = createApp(App);
  app.use(store);
  app.mount("#zionBuilderApp");
  window.hg.zionBuilder = app;
})();
