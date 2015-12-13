'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.methods = exports.statics = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jobj = require('jobj');

var _mergeProps = require('./mergeProps');

var _mergeProps2 = _interopRequireDefault(_mergeProps);

var _computeProps = require('./computeProps');

var _computeProps2 = _interopRequireDefault(_computeProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var statics = exports.statics = {
	cx: _classnames2.default,
	templates: {},
	bind: function bind(obj) {
		var bindables = this.bindables;
		if (bindables && bindables.length) {
			bindables.forEach(function (key) {
				obj[key] = obj[key].bind(obj);
			});
		}
	},
	includeCSS: function includeCSS(doInclude) {
		_includeCSS = !!doInclude;
	},
	template: function template(locals) {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'h1',
				null,
				'Default Template'
			),
			_react2.default.createElement(
				'ul',
				null,
				(0, _jobj.mapObj)(locals, function (val, key) {
					return _react2.default.createElement(
						'li',
						{ key: key },
						key,
						':',
						JSON.stringify(val)
					);
				})
			)
		);
	}
};

var methods = exports.methods = {
	initialize: function initialize(props) {
		this.constructor.bind(this);
	},
	replaceMethod: function replaceMethod(name, method) {
		var _old = this[name];
		if (_old) {
			this[name] = function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				_old.apply(this, args);
				return method.apply(this, args);
			};
		} else {
			this[name] = method;
		}
	},
	compute: function compute(computedProps) {
		return (0, _computeProps2.default)(this, computedProps);
	},
	buildStyle: function buildStyle(givenProps, includeCSS) {
		var Template = this.constructor;
		var defCSS = includeCSS && this.constructor.css;
		var defStyle = Template.style;
		var givenStyle = givenProps && givenProps.style;

		if (!defCSS && !defStyle && !givenStyle) {
			return;
		}

		var style = (0, _jobj.assign)(defCSS, defStyle, givenStyle);

		var additional = [];

		if (Template._hoverStyle && this.state.hover) {
			additional.push(Template._hoverStyle);
		}
		if (Template._focusStyle && this.state.focus) {
			additional.push(Template._focusStyle);
		}
		if (additional.length) {
			var _Object;

			return (_Object = Object).assign.apply(_Object, [style].concat(additional));
		}
		return style;
	},
	buildClassName: function buildClassName(givenProps) {
		var Template = this.constructor;
		var def = Template.className;
		var given = givenProps.className;
		if (def && def.length && given && given.length) {
			var isArrayDef = Array.isArray(def);
			var isArrayGiven = Array.isArray(given);
			if (isArrayDef && isArrayGiven) {
				return [].concat(_toConsumableArray(def), _toConsumableArray(given));
			}
			if (isArrayDef) {
				return [].concat(_toConsumableArray(def), [given]);
			}
			if (isArrayGiven) {
				return [def].concat(_toConsumableArray(given));
			}
		}
		if (given && given.length) {
			return given;
		}
		if (def && def.length) {
			return def;
		}
	},
	buildEventsHandlers: function buildEventsHandlers(givenProps) {
		var bindables = this.constructor.bindables;
		if (!bindables || !bindables.length) {
			return;
		}
		var that = this;
		var eventsHandlers = {};
		bindables.forEach(function (name) {
			eventsHandlers[name] = that[name];
		});
		return eventsHandlers;
	},
	processProps: function processProps(mergedProps) {
		return mergedProps;
	},
	buildLocals: function buildLocals(generatedLocals) {
		return generatedLocals;
	},
	computeClasses: function computeClasses(locals) {
		if (locals.props.className) {
			locals.props.className = Array.isArray(locals.props.className) ? _classnames2.default.apply(undefined, _toConsumableArray(locals.props.className)) : (0, _classnames2.default)(locals.props.className);
		}
		return locals;
	},
	mergeProps: function mergeProps(givenProps, eventsHandlers, className, style) {
		var defaultProps = this.constructor.props;
		return (0, _jobj.assign)({
			props: (0, _jobj.assign)(defaultProps.self, givenProps, eventsHandlers, className && { className: className }, style && { style: style })
		}, defaultProps.children);
	},
	getLocals: function getLocals(givenProps, includeCSS) {
		var className = this.buildClassName(givenProps);
		var style = this.buildStyle(givenProps, includeCSS);
		var eventsHandlers = this.buildEventsHandlers(givenProps);
		var mergedProps = this.mergeProps(givenProps, eventsHandlers, className, style);
		var props = this.processProps(mergedProps);
		var locals = this.buildLocals(this.computeClasses(this.compute(props, givenProps)));
		return locals;
	},
	getTemplate: function getTemplate(name) {
		var templates = this.constructor.templates;
		if (name in templates) {
			return templates[name];
		}
		var defTemplates = this.getTemplates();
		if (name in defTemplates) {
			return defTemplates[name];
		}
		throw new Error('could not find the `' + name + '`template');
	},
	fillTemplate: function fillTemplate(name, givenProps, key) {
		var template = this.getTemplate(name);
		var defaultProps = template.props.self;
		var props = (0, _mergeProps2.default)(defaultProps, givenProps);
		if (typeof key !== 'undefined') {
			return _react2.default.createElement(template, _extends({}, props, { key: key }));
		}
		return _react2.default.createElement(template, props);
	},
	autoTemplate: function autoTemplate(name, givenProps, key) {
		if (!givenProps && !this.locals[name]) {
			return null;
		}
		var props = givenProps ? (0, _jobj.assign)(this.locals[name], givenProps) : this.locals[name];
		if (this.props.includeCSS) {
			props.includeCSS = true;
		}
		return this.fillTemplate(name, props, key);
	},
	render: function render() {
		var template = this.constructor.template;
		this.locals = this.getLocals(this.props, this.props.includeCSS);
		return template.call(this, this.locals.props);
	}
};