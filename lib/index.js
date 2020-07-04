"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewportUnitOnMobile = void 0;
var debounce_fn_1 = __importDefault(require("debounce-fn"));
// SEE: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
var setCssProperty = function () {
    var vh = window.innerHeight * 0.01;
    var vw = window.innerWidth * 0.01;
    var root = document.documentElement;
    root.style.setProperty('--vh', vh + "px");
    if (vh > vw) {
        root.style.setProperty('--vmax', vh + "px");
        root.style.setProperty('--vmin', vw + "px");
    }
    else {
        root.style.setProperty('--vmax', vw + "px");
        root.style.setProperty('--vmin', vh + "px");
    }
};
function viewportUnitOnMobile() {
    setCssProperty();
    window.addEventListener('resize', debounce_fn_1.default(setCssProperty, { wait: 50 }));
}
exports.viewportUnitOnMobile = viewportUnitOnMobile;
