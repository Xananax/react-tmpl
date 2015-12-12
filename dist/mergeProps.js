'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = mergeProps;

var _jobj = require('jobj');

function mergeProps() {
	for (var _len = arguments.length, propsObjs = Array(_len), _key = 0; _key < _len; _key++) {
		propsObjs[_key] = arguments[_key];
	}

	return _jobj.merge.apply(undefined, [function (value, oldValue, key) {
		if (key === 'style') {
			return (0, _jobj.assign)(oldValue, value);
		}
		if (key === 'className') {
			if (oldValue) {
				return oldValue.concat(value);
			}
			return [value];
		}
		if (/^[A-Z]/.test(key)) {
			return mergeProps(value, oldValue);
		}
		return value;
	}].concat(propsObjs));
}