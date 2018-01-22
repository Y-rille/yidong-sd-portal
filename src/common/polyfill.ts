import 'core-js/es6/map';
import 'core-js/es6/set';
declare const global;

global.requestAnimationFrame =
    global.requestAnimationFrame || function requestAnimationFrame(callback) {
        setTimeout(callback, 0);
    };
