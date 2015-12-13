'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = buildTemplate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jobj = require('jobj');

var _Template = require('./Template');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var skip = /^(propTypes|name|className|style|css|state)$/;
var staticsKeys = Object.keys(_Template.statics);
var methodsKeys = Object.keys(_Template.methods);

function buildTemplate(render, conf, templates) {

	var name = conf && conf.name || render.name;
	var state = conf && conf.state || null;
	if (!name) {
		throw new Error('`name` is a required property');
	}

	function Template(props, context) {
		if (!(this instanceof Template)) {
			return new Template(props, context);
		}
		_react.Component.call(this, props, context);
		this.state = state;
		this.initialize(props);
	}

	staticsKeys.forEach(function (key) {
		Template[key] = _Template.statics[key];
	});

	Template.displayName = name;
	Template.props = { self: {}, children: {} };
	Template.template = render;

	var prototype = new _react.Component();
	methodsKeys.forEach(function (key) {
		prototype[key] = _Template.methods[key];
	});

	Template.prototype = prototype;
	Template.prototype.constructor = Template;

	Template.prototype.getTemplates = function getTemplates() {
		return templates;
	};

	var propTypes = conf && conf.propTypes && (Array.isArray(conf.propTypes) ? (0, _jobj.arrayToObj)(conf.propTypes, function (prop) {
		return [prop, _react.PropTypes.any.isRequired];
	}) : conf.propTypes);

	if (propTypes) {
		Template.propTypes = propTypes;
	}
	if (conf && conf.style) {
		Template.style = conf.style;
	}
	if (conf && conf.css) {
		Template.css = conf.css;
	}
	if (conf && conf.className) {
		Template.className = conf.className;
	}

	conf && Object.keys(conf).forEach(function (key) {
		var val = conf[key];
		if (skip.test(key)) {
			return;
		}
		if (typeof val === 'function') {
			Template.prototype[key] = val;
			if (/^on/.test(key)) {
				Template.bindables = Template.bindables ? [].concat(_toConsumableArray(Template.bindables), [key]) : [key];
			}
			return;
		}
		if (/^[A-Z]/.test(key)) {
			Template.prototype[key] = function (locals, arrKey) {
				return this.autoTemplate(key, locals, arrKey);
			};
			Template.bindables = Template.bindables ? [].concat(_toConsumableArray(Template.bindables), [key]) : [key];
			Template.props.children[key] = val;
			return;
		}
		Template.props.self[key] = val;
	});

	templates[name] = Template;
	return Template;
}