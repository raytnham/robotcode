"use strict";
exports.__esModule = true;
var Board = /** @class */ (function () {
    function Board(width, height) {
        var _this = this;
        this.toString = function () { return "width = " + _this.width + "; height = " + _this.height; };
        this.width = width;
        this.height = height;
    }
    return Board;
}());
exports.Board = Board;
