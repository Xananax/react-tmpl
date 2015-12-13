'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.prop = prop;
exports.createTemplates = createTemplates;

var _buildTemplate = require('./buildTemplate');

var _buildTemplate2 = _interopRequireDefault(_buildTemplate);

var _Template = require('./Template');

var _Template2 = _interopRequireDefault(_Template);

var _GetProp = require('./GetProp');

var _GetProp2 = _interopRequireDefault(_GetProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prop(fn) {
	return new _GetProp2.default(fn);
}

function createTemplates() {
	function boundBuildTemplate(render) {
		for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			mixins[_key - 1] = arguments[_key];
		}

		var conf = mixins.pop();
		return _buildTemplate2.default.apply(undefined, [render, conf, boundBuildTemplate].concat(mixins));
	}
	boundBuildTemplate.prop = prop;
	return boundBuildTemplate;
}

var defaultSystem = createTemplates();

exports.default = defaultSystem;