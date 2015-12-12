'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jobj = require('jobj');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetProp = (function () {
	function GetProp(fn) {
		_classCallCheck(this, GetProp);

		if (typeof fn !== 'function') {
			(function () {
				var path = fn;
				fn = function (locals) {
					return locals[path];
				};
			})();
		}
		this.fn = fn;
	}

	_createClass(GetProp, [{
		key: 'get',
		value: function get(context, props) {
			var fn = this.fn;
			return fn.call(context, props, context);
		}
	}]);

	return GetProp;
})();

exports.default = GetProp;