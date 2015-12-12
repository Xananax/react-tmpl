'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = computeProps;

var _GetProp = require('./GetProp');

var _GetProp2 = _interopRequireDefault(_GetProp);

var _jobj = require('jobj');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _computeProps(context, currentObj, computedProps) {
	function process(val) {
		if (typeof val == 'undefined') {
			return;
		}
		if (val && val.constructor === Object) {
			return _computeProps(context, val, computedProps);
		}
		if (val && val instanceof _GetProp2.default) {
			val = val.get(context, computedProps);
		}
		if (Array.isArray(val)) {
			return val.map(process);
		}
		return val;
	}
	if (Array.isArray(currentObj)) {
		return currentObj.map(process);
	}
	return (0, _jobj.transform)(currentObj, process);
}

function computeProps(context, computedProps) {
	var props = _computeProps(context, computedProps, computedProps);
	return props;
}