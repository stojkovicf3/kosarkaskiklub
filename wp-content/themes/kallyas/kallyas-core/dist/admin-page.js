(function(jQuery2) {
  "use strict";
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
  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  var TypeRegistry = function() {
    function TypeRegistry2() {
      var initial = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      classCallCheck(this, TypeRegistry2);
      this.registeredTypes = initial;
    }
    createClass(TypeRegistry2, [{
      key: "get",
      value: function get(type) {
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
    var matches = key.match(/[^[\]]+/g);
    var lastKey = void 0;
    if (key.length > 1 && key.indexOf("[]") === key.length - 2) {
      lastKey = matches.pop();
      matches.push([lastKey]);
    }
    return matches;
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
  var urlItem = window.location.hash, currentItem = null, menuItems = jQuery2(".nav-stacked li");
  if (urlItem && urlItem.length > 0) {
    currentItem = jQuery2(urlItem + "_menu_item");
  }
  if (currentItem && currentItem.length > 0) {
    menuItems.removeClass("wp-ui-highlight");
    currentItem.addClass("wp-ui-highlight");
    var tab = currentItem.children().attr("href");
    if (jQuery2(".tab-pane.active").length > 0) {
      jQuery2(".tab-pane.active").fadeOut("fast", function() {
        jQuery2(tab).fadeIn("fast").addClass("active");
      }).removeClass("active");
    } else {
      jQuery2(tab).fadeIn("fast").addClass("active");
    }
  }
  jQuery2(".nav-stacked li").on("click", function(e) {
    e.preventDefault();
    if (jQuery2(this).is(".wp-ui-highlight")) {
      return false;
    }
    var tab2 = jQuery2(this).children().attr("href");
    window.location.hash = jQuery2(this).children().attr("href");
    jQuery2(".nav-stacked li.wp-ui-highlight").removeClass("wp-ui-highlight");
    jQuery2(this).addClass("wp-ui-highlight");
    if (jQuery2(".tab-pane.active").length > 0) {
      jQuery2(".tab-pane.active").fadeOut("fast", function() {
        jQuery2(tab2).fadeIn("fast").addClass("active");
      }).removeClass("active");
    } else {
      jQuery2(tab2).fadeIn("fast").addClass("active");
    }
    jQuery2(window).trigger("resize");
  });
  var optionsForm = jQuery2("#zn_options_form");
  optionsForm.on("click", ".zn_save", function() {
    var savedOptions = serialize(jQuery2("#zn_options_form")[0], {
      inputReaders: {
        checkbox: (el) => el.getAttribute("value") !== null ? el.checked ? el.getAttribute("value") : "zn_dummy_value" : el.checked
      }
    });
    savedOptions = JSON.stringify(savedOptions);
    var data = {
      action: "zn_ajax_callback",
      zn_action: "zn_save_options",
      zn_ajax_nonce: ZnAjax.security,
      data: savedOptions
    };
    optionsForm.addClass("zn-is-saving");
    jQuery2.post(ajaxurl, data, function(response) {
      if (response) {
        new jQuery2.ZnModalMessage("Settings saved successfully !");
        optionsForm.removeClass("zn-is-saving");
      }
    });
    return false;
  });
  jQuery2(document).on("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && !event.altKey) {
      switch (String.fromCharCode(event.which).toLowerCase()) {
        case "s":
          event.preventDefault();
          optionsForm.find(".zn_save").first().trigger("click");
          break;
      }
    }
  });
})(jQuery);
