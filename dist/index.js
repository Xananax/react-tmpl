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
	function boundBuildTemplate(render, conf) {
		return (0, _buildTemplate2.default)(render, conf, boundBuildTemplate);
	}
	boundBuildTemplate.prop = prop;
	return boundBuildTemplate;
}

var defaultSystem = createTemplates();

exports.default = defaultSystem;