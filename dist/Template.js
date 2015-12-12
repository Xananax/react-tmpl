'use strict';

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
	compute: function compute(computedProps) {
		return (0, _computeProps2.default)(this, computedProps);
	},
	buildStyle: function buildStyle(givenProps, includeCSS) {
		var defCSS = includeCSS && this.constructor.css;
		var defStyle = this.constructor.style;
		var givenStyle = givenProps && givenProps.style;

		if (!defCSS && !defStyle && !givenStyle) {
			return;
		}

		return (0, _jobj.assign)(defCSS, defStyle, givenStyle);
	},
	buildClassName: function buildClassName(givenProps) {
		var def = this.constructor.className;
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
	buildLocals: function buildLocals(props) {
		return props;
	},
	getLocals: function getLocals(givenProps, includeCSS) {
		var className = this.buildClassName(givenProps);
		var style = this.buildStyle(givenProps, includeCSS);
		var defaultProps = this.constructor.props;
		var props = this.buildLocals((0, _jobj.assign)(defaultProps.self, defaultProps.children, givenProps, className && { className: className }, style && { style: style }));
		var locals = this.compute(props, givenProps);
		if (locals.className) {
			locals.className = Array.isArray(locals.className) ? _classnames2.default.apply(undefined, _toConsumableArray(locals.className)) : (0, _classnames2.default)(locals.className);
		}
		return locals;
	},
	getTemplate: function getTemplate(name) {
		var templates = this.getTemplates();
		if (name in templates) {
			return templates[name];
		}
		throw new Error('could not find the `' + name + '`template');
	},
	fillTemplate: function fillTemplate(name, givenProps) {
		var template = this.getTemplate(name);
		var defaultProps = template.props.self;
		var props = (0, _mergeProps2.default)(defaultProps, givenProps);
		return _react2.default.createElement(template, props);
	},
	autoTemplate: function autoTemplate(name, givenProps) {
		if (!givenProps && !this.locals[name]) {
			return null;
		}
		var props = givenProps ? (0, _jobj.assign)(this.locals[name], givenProps) : this.locals[name];
		if (this.props.includeCSS) {
			props.includeCSS = true;
		}
		return this.fillTemplate(name, props);
	},
	render: function render() {
		var template = this.constructor.template;
		this.locals = this.getLocals(this.props, this.props.includeCSS);
		return template.call(this, this.locals);
	}
};