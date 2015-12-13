'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (props, state) {

	var _updateDimensions = updateDimensions.bind(this);

	var _onResize = (0, _jobj.onResize)(_updateDimensions);

	var doc = _onResize.doc;
	var win = _onResize.win;
	var dispose = _onResize.dispose;

	this.replaceMethod('componentWillUnmount', dispose);

	Object.assign(state, {
		vw: win.width,
		vh: win.height,
		dw: doc.width,
		dh: doc.height
	});

	return state;
};

var _jobj = require('jobj');

function updateDimensions(_ref) {
	var win = _ref.win;
	var doc = _ref.doc;

	this.setState({
		vw: win.width,
		vh: win.height,
		dw: doc.width,
		dh: doc.height
	});
}