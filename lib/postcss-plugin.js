"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcssPlugin = void 0;
var postcss_1 = __importDefault(require("postcss"));
// SEE: https://qiita.com/ota-meshi/items/0738f2089009b150134c
function replacer(original, snum, unit) {
    if (Number.isNaN(snum)) {
        return original;
    }
    return "calc(" + snum + " * var(--" + unit + ", 1" + unit + "))";
}
function createPlugin() {
    return function (root) {
        var replaces = [];
        root.walkDecls(function (decl) {
            var newValue = decl.value.replace(/\b([+-]?[\d.]+)(vh|vmax|vmin)\b/g, replacer);
            if (decl.value !== newValue) {
                replaces.push({ decl: decl, newValue: newValue });
            }
        });
        for (var _i = 0, replaces_1 = replaces; _i < replaces_1.length; _i++) {
            var _a = replaces_1[_i], decl = _a.decl, newValue = _a.newValue;
            decl.parent.insertAfter(decl, decl.clone({ value: newValue }));
        }
    };
}
var postcssPlugin = postcss_1.default.plugin('postcss-viewport-units-on-mobile', function () { return createPlugin(); });
exports.postcssPlugin = postcssPlugin;
