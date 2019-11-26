(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.kiigame = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var Global = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PI_OVER_180 = Math.PI / 180;
	function detectBrowser() {
	    return (typeof window !== 'undefined' &&
	        ({}.toString.call(window) === '[object Window]' ||
	            {}.toString.call(window) === '[object global]'));
	}
	var _detectIE = function (ua) {
	    var msie = ua.indexOf('msie ');
	    if (msie > 0) {
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	    }
	    var trident = ua.indexOf('trident/');
	    if (trident > 0) {
	        var rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	    }
	    var edge = ua.indexOf('edge/');
	    if (edge > 0) {
	        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	    }
	    return false;
	};
	exports._parseUA = function (userAgent) {
	    var ua = userAgent.toLowerCase(), match = /(chrome)[ /]([\w.]+)/.exec(ua) ||
	        /(webkit)[ /]([\w.]+)/.exec(ua) ||
	        /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
	        /(msie) ([\w.]+)/.exec(ua) ||
	        (ua.indexOf('compatible') < 0 &&
	            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
	        [], mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), ieMobile = !!userAgent.match(/IEMobile/i);
	    return {
	        browser: match[1] || '',
	        version: match[2] || '0',
	        isIE: _detectIE(ua),
	        mobile: mobile,
	        ieMobile: ieMobile
	    };
	};
	exports.glob = typeof commonjsGlobal !== 'undefined'
	    ? commonjsGlobal
	    : typeof window !== 'undefined'
	        ? window
	        : typeof WorkerGlobalScope !== 'undefined'
	            ? self
	            : {};
	exports.Konva = {
	    _global: exports.glob,
	    version: '3.4.1',
	    isBrowser: detectBrowser(),
	    isUnminified: /param/.test(function (param) { }.toString()),
	    dblClickWindow: 400,
	    getAngle: function (angle) {
	        return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
	    },
	    enableTrace: false,
	    _pointerEventsEnabled: false,
	    listenClickTap: false,
	    inDblClickWindow: false,
	    pixelRatio: undefined,
	    dragDistance: 3,
	    angleDeg: true,
	    showWarnings: true,
	    dragButtons: [0, 1],
	    isDragging: function () {
	        return exports.Konva['DD'].isDragging;
	    },
	    isDragReady: function () {
	        return !!exports.Konva['DD'].node;
	    },
	    UA: exports._parseUA((exports.glob.navigator && exports.glob.navigator.userAgent) || ''),
	    document: exports.glob.document,
	    _injectGlobal: function (Konva) {
	        exports.glob.Konva = Konva;
	    },
	    _parseUA: exports._parseUA
	};
	exports._NODES_REGISTRY = {};
	exports._registerNode = function (NodeClass) {
	    exports._NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass;
	    exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
	};
	});

	unwrapExports(Global);
	var Global_1 = Global._parseUA;
	var Global_2 = Global.glob;
	var Global_3 = Global.Konva;
	var Global_4 = Global._NODES_REGISTRY;
	var Global_5 = Global._registerNode;

	var Util = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var Collection = (function () {
	    function Collection() {
	    }
	    Collection.toCollection = function (arr) {
	        var collection = new Collection(), len = arr.length, n;
	        for (n = 0; n < len; n++) {
	            collection.push(arr[n]);
	        }
	        return collection;
	    };
	    Collection._mapMethod = function (methodName) {
	        Collection.prototype[methodName] = function () {
	            var len = this.length, i;
	            var args = [].slice.call(arguments);
	            for (i = 0; i < len; i++) {
	                this[i][methodName].apply(this[i], args);
	            }
	            return this;
	        };
	    };
	    Collection.mapMethods = function (constructor) {
	        var prot = constructor.prototype;
	        for (var methodName in prot) {
	            Collection._mapMethod(methodName);
	        }
	    };
	    return Collection;
	}());
	exports.Collection = Collection;
	Collection.prototype = [];
	Collection.prototype.each = function (func) {
	    for (var n = 0; n < this.length; n++) {
	        func(this[n], n);
	    }
	};
	Collection.prototype.toArray = function () {
	    var arr = [], len = this.length, n;
	    for (n = 0; n < len; n++) {
	        arr.push(this[n]);
	    }
	    return arr;
	};
	var Transform = (function () {
	    function Transform(m) {
	        if (m === void 0) { m = [1, 0, 0, 1, 0, 0]; }
	        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
	    }
	    Transform.prototype.copy = function () {
	        return new Transform(this.m);
	    };
	    Transform.prototype.point = function (point) {
	        var m = this.m;
	        return {
	            x: m[0] * point.x + m[2] * point.y + m[4],
	            y: m[1] * point.x + m[3] * point.y + m[5]
	        };
	    };
	    Transform.prototype.translate = function (x, y) {
	        this.m[4] += this.m[0] * x + this.m[2] * y;
	        this.m[5] += this.m[1] * x + this.m[3] * y;
	        return this;
	    };
	    Transform.prototype.scale = function (sx, sy) {
	        this.m[0] *= sx;
	        this.m[1] *= sx;
	        this.m[2] *= sy;
	        this.m[3] *= sy;
	        return this;
	    };
	    Transform.prototype.rotate = function (rad) {
	        var c = Math.cos(rad);
	        var s = Math.sin(rad);
	        var m11 = this.m[0] * c + this.m[2] * s;
	        var m12 = this.m[1] * c + this.m[3] * s;
	        var m21 = this.m[0] * -s + this.m[2] * c;
	        var m22 = this.m[1] * -s + this.m[3] * c;
	        this.m[0] = m11;
	        this.m[1] = m12;
	        this.m[2] = m21;
	        this.m[3] = m22;
	        return this;
	    };
	    Transform.prototype.getTranslation = function () {
	        return {
	            x: this.m[4],
	            y: this.m[5]
	        };
	    };
	    Transform.prototype.skew = function (sx, sy) {
	        var m11 = this.m[0] + this.m[2] * sy;
	        var m12 = this.m[1] + this.m[3] * sy;
	        var m21 = this.m[2] + this.m[0] * sx;
	        var m22 = this.m[3] + this.m[1] * sx;
	        this.m[0] = m11;
	        this.m[1] = m12;
	        this.m[2] = m21;
	        this.m[3] = m22;
	        return this;
	    };
	    Transform.prototype.multiply = function (matrix) {
	        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
	        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
	        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
	        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
	        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
	        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
	        this.m[0] = m11;
	        this.m[1] = m12;
	        this.m[2] = m21;
	        this.m[3] = m22;
	        this.m[4] = dx;
	        this.m[5] = dy;
	        return this;
	    };
	    Transform.prototype.invert = function () {
	        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
	        var m0 = this.m[3] * d;
	        var m1 = -this.m[1] * d;
	        var m2 = -this.m[2] * d;
	        var m3 = this.m[0] * d;
	        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
	        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
	        this.m[0] = m0;
	        this.m[1] = m1;
	        this.m[2] = m2;
	        this.m[3] = m3;
	        this.m[4] = m4;
	        this.m[5] = m5;
	        return this;
	    };
	    Transform.prototype.getMatrix = function () {
	        return this.m;
	    };
	    Transform.prototype.setAbsolutePosition = function (x, y) {
	        var m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3], m4 = this.m[4], m5 = this.m[5], yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2), xt = (x - m4 - m2 * yt) / m0;
	        return this.translate(xt, yt);
	    };
	    return Transform;
	}());
	exports.Transform = Transform;
	var OBJECT_ARRAY = '[object Array]', OBJECT_NUMBER = '[object Number]', OBJECT_STRING = '[object String]', OBJECT_BOOLEAN = '[object Boolean]', PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = '#', EMPTY_STRING = '', ZERO = '0', KONVA_WARNING = 'Konva warning: ', KONVA_ERROR = 'Konva error: ', RGB_PAREN = 'rgb(', COLORS = {
	    aliceblue: [240, 248, 255],
	    antiquewhite: [250, 235, 215],
	    aqua: [0, 255, 255],
	    aquamarine: [127, 255, 212],
	    azure: [240, 255, 255],
	    beige: [245, 245, 220],
	    bisque: [255, 228, 196],
	    black: [0, 0, 0],
	    blanchedalmond: [255, 235, 205],
	    blue: [0, 0, 255],
	    blueviolet: [138, 43, 226],
	    brown: [165, 42, 42],
	    burlywood: [222, 184, 135],
	    cadetblue: [95, 158, 160],
	    chartreuse: [127, 255, 0],
	    chocolate: [210, 105, 30],
	    coral: [255, 127, 80],
	    cornflowerblue: [100, 149, 237],
	    cornsilk: [255, 248, 220],
	    crimson: [220, 20, 60],
	    cyan: [0, 255, 255],
	    darkblue: [0, 0, 139],
	    darkcyan: [0, 139, 139],
	    darkgoldenrod: [184, 132, 11],
	    darkgray: [169, 169, 169],
	    darkgreen: [0, 100, 0],
	    darkgrey: [169, 169, 169],
	    darkkhaki: [189, 183, 107],
	    darkmagenta: [139, 0, 139],
	    darkolivegreen: [85, 107, 47],
	    darkorange: [255, 140, 0],
	    darkorchid: [153, 50, 204],
	    darkred: [139, 0, 0],
	    darksalmon: [233, 150, 122],
	    darkseagreen: [143, 188, 143],
	    darkslateblue: [72, 61, 139],
	    darkslategray: [47, 79, 79],
	    darkslategrey: [47, 79, 79],
	    darkturquoise: [0, 206, 209],
	    darkviolet: [148, 0, 211],
	    deeppink: [255, 20, 147],
	    deepskyblue: [0, 191, 255],
	    dimgray: [105, 105, 105],
	    dimgrey: [105, 105, 105],
	    dodgerblue: [30, 144, 255],
	    firebrick: [178, 34, 34],
	    floralwhite: [255, 255, 240],
	    forestgreen: [34, 139, 34],
	    fuchsia: [255, 0, 255],
	    gainsboro: [220, 220, 220],
	    ghostwhite: [248, 248, 255],
	    gold: [255, 215, 0],
	    goldenrod: [218, 165, 32],
	    gray: [128, 128, 128],
	    green: [0, 128, 0],
	    greenyellow: [173, 255, 47],
	    grey: [128, 128, 128],
	    honeydew: [240, 255, 240],
	    hotpink: [255, 105, 180],
	    indianred: [205, 92, 92],
	    indigo: [75, 0, 130],
	    ivory: [255, 255, 240],
	    khaki: [240, 230, 140],
	    lavender: [230, 230, 250],
	    lavenderblush: [255, 240, 245],
	    lawngreen: [124, 252, 0],
	    lemonchiffon: [255, 250, 205],
	    lightblue: [173, 216, 230],
	    lightcoral: [240, 128, 128],
	    lightcyan: [224, 255, 255],
	    lightgoldenrodyellow: [250, 250, 210],
	    lightgray: [211, 211, 211],
	    lightgreen: [144, 238, 144],
	    lightgrey: [211, 211, 211],
	    lightpink: [255, 182, 193],
	    lightsalmon: [255, 160, 122],
	    lightseagreen: [32, 178, 170],
	    lightskyblue: [135, 206, 250],
	    lightslategray: [119, 136, 153],
	    lightslategrey: [119, 136, 153],
	    lightsteelblue: [176, 196, 222],
	    lightyellow: [255, 255, 224],
	    lime: [0, 255, 0],
	    limegreen: [50, 205, 50],
	    linen: [250, 240, 230],
	    magenta: [255, 0, 255],
	    maroon: [128, 0, 0],
	    mediumaquamarine: [102, 205, 170],
	    mediumblue: [0, 0, 205],
	    mediumorchid: [186, 85, 211],
	    mediumpurple: [147, 112, 219],
	    mediumseagreen: [60, 179, 113],
	    mediumslateblue: [123, 104, 238],
	    mediumspringgreen: [0, 250, 154],
	    mediumturquoise: [72, 209, 204],
	    mediumvioletred: [199, 21, 133],
	    midnightblue: [25, 25, 112],
	    mintcream: [245, 255, 250],
	    mistyrose: [255, 228, 225],
	    moccasin: [255, 228, 181],
	    navajowhite: [255, 222, 173],
	    navy: [0, 0, 128],
	    oldlace: [253, 245, 230],
	    olive: [128, 128, 0],
	    olivedrab: [107, 142, 35],
	    orange: [255, 165, 0],
	    orangered: [255, 69, 0],
	    orchid: [218, 112, 214],
	    palegoldenrod: [238, 232, 170],
	    palegreen: [152, 251, 152],
	    paleturquoise: [175, 238, 238],
	    palevioletred: [219, 112, 147],
	    papayawhip: [255, 239, 213],
	    peachpuff: [255, 218, 185],
	    peru: [205, 133, 63],
	    pink: [255, 192, 203],
	    plum: [221, 160, 203],
	    powderblue: [176, 224, 230],
	    purple: [128, 0, 128],
	    rebeccapurple: [102, 51, 153],
	    red: [255, 0, 0],
	    rosybrown: [188, 143, 143],
	    royalblue: [65, 105, 225],
	    saddlebrown: [139, 69, 19],
	    salmon: [250, 128, 114],
	    sandybrown: [244, 164, 96],
	    seagreen: [46, 139, 87],
	    seashell: [255, 245, 238],
	    sienna: [160, 82, 45],
	    silver: [192, 192, 192],
	    skyblue: [135, 206, 235],
	    slateblue: [106, 90, 205],
	    slategray: [119, 128, 144],
	    slategrey: [119, 128, 144],
	    snow: [255, 255, 250],
	    springgreen: [0, 255, 127],
	    steelblue: [70, 130, 180],
	    tan: [210, 180, 140],
	    teal: [0, 128, 128],
	    thistle: [216, 191, 216],
	    transparent: [255, 255, 255, 0],
	    tomato: [255, 99, 71],
	    turquoise: [64, 224, 208],
	    violet: [238, 130, 238],
	    wheat: [245, 222, 179],
	    white: [255, 255, 255],
	    whitesmoke: [245, 245, 245],
	    yellow: [255, 255, 0],
	    yellowgreen: [154, 205, 5]
	}, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, animQueue = [];
	exports.Util = {
	    _isElement: function (obj) {
	        return !!(obj && obj.nodeType == 1);
	    },
	    _isFunction: function (obj) {
	        return !!(obj && obj.constructor && obj.call && obj.apply);
	    },
	    _isPlainObject: function (obj) {
	        return !!obj && obj.constructor === Object;
	    },
	    _isArray: function (obj) {
	        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
	    },
	    _isNumber: function (obj) {
	        return (Object.prototype.toString.call(obj) === OBJECT_NUMBER &&
	            !isNaN(obj) &&
	            isFinite(obj));
	    },
	    _isString: function (obj) {
	        return Object.prototype.toString.call(obj) === OBJECT_STRING;
	    },
	    _isBoolean: function (obj) {
	        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
	    },
	    isObject: function (val) {
	        return val instanceof Object;
	    },
	    isValidSelector: function (selector) {
	        if (typeof selector !== 'string') {
	            return false;
	        }
	        var firstChar = selector[0];
	        return (firstChar === '#' ||
	            firstChar === '.' ||
	            firstChar === firstChar.toUpperCase());
	    },
	    _sign: function (number) {
	        if (number === 0) {
	            return 0;
	        }
	        if (number > 0) {
	            return 1;
	        }
	        else {
	            return -1;
	        }
	    },
	    requestAnimFrame: function (callback) {
	        animQueue.push(callback);
	        if (animQueue.length === 1) {
	            requestAnimationFrame(function () {
	                var queue = animQueue;
	                animQueue = [];
	                queue.forEach(function (cb) {
	                    cb();
	                });
	            });
	        }
	    },
	    createCanvasElement: function () {
	        var canvas = document.createElement('canvas');
	        try {
	            canvas.style = canvas.style || {};
	        }
	        catch (e) { }
	        return canvas;
	    },
	    createImageElement: function () {
	        return document.createElement('img');
	    },
	    _isInDocument: function (el) {
	        while ((el = el.parentNode)) {
	            if (el == document) {
	                return true;
	            }
	        }
	        return false;
	    },
	    _simplifyArray: function (arr) {
	        var retArr = [], len = arr.length, util = exports.Util, n, val;
	        for (n = 0; n < len; n++) {
	            val = arr[n];
	            if (util._isNumber(val)) {
	                val = Math.round(val * 1000) / 1000;
	            }
	            else if (!util._isString(val)) {
	                val = val.toString();
	            }
	            retArr.push(val);
	        }
	        return retArr;
	    },
	    _urlToImage: function (url, callback) {
	        var imageObj = new Global.glob.Image();
	        imageObj.onload = function () {
	            callback(imageObj);
	        };
	        imageObj.src = url;
	    },
	    _rgbToHex: function (r, g, b) {
	        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	    },
	    _hexToRgb: function (hex) {
	        hex = hex.replace(HASH, EMPTY_STRING);
	        var bigint = parseInt(hex, 16);
	        return {
	            r: (bigint >> 16) & 255,
	            g: (bigint >> 8) & 255,
	            b: bigint & 255
	        };
	    },
	    getRandomColor: function () {
	        var randColor = ((Math.random() * 0xffffff) << 0).toString(16);
	        while (randColor.length < 6) {
	            randColor = ZERO + randColor;
	        }
	        return HASH + randColor;
	    },
	    get: function (val, def) {
	        if (val === undefined) {
	            return def;
	        }
	        else {
	            return val;
	        }
	    },
	    getRGB: function (color) {
	        var rgb;
	        if (color in COLORS) {
	            rgb = COLORS[color];
	            return {
	                r: rgb[0],
	                g: rgb[1],
	                b: rgb[2]
	            };
	        }
	        else if (color[0] === HASH) {
	            return this._hexToRgb(color.substring(1));
	        }
	        else if (color.substr(0, 4) === RGB_PAREN) {
	            rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
	            return {
	                r: parseInt(rgb[1], 10),
	                g: parseInt(rgb[2], 10),
	                b: parseInt(rgb[3], 10)
	            };
	        }
	        else {
	            return {
	                r: 0,
	                g: 0,
	                b: 0
	            };
	        }
	    },
	    colorToRGBA: function (str) {
	        str = str || 'black';
	        return (exports.Util._namedColorToRBA(str) ||
	            exports.Util._hex3ColorToRGBA(str) ||
	            exports.Util._hex6ColorToRGBA(str) ||
	            exports.Util._rgbColorToRGBA(str) ||
	            exports.Util._rgbaColorToRGBA(str));
	    },
	    _namedColorToRBA: function (str) {
	        var c = COLORS[str.toLowerCase()];
	        if (!c) {
	            return null;
	        }
	        return {
	            r: c[0],
	            g: c[1],
	            b: c[2],
	            a: 1
	        };
	    },
	    _rgbColorToRGBA: function (str) {
	        if (str.indexOf('rgb(') === 0) {
	            str = str.match(/rgb\(([^)]+)\)/)[1];
	            var parts = str.split(/ *, */).map(Number);
	            return {
	                r: parts[0],
	                g: parts[1],
	                b: parts[2],
	                a: 1
	            };
	        }
	    },
	    _rgbaColorToRGBA: function (str) {
	        if (str.indexOf('rgba(') === 0) {
	            str = str.match(/rgba\(([^)]+)\)/)[1];
	            var parts = str.split(/ *, */).map(Number);
	            return {
	                r: parts[0],
	                g: parts[1],
	                b: parts[2],
	                a: parts[3]
	            };
	        }
	    },
	    _hex6ColorToRGBA: function (str) {
	        if (str[0] === '#' && str.length === 7) {
	            return {
	                r: parseInt(str.slice(1, 3), 16),
	                g: parseInt(str.slice(3, 5), 16),
	                b: parseInt(str.slice(5, 7), 16),
	                a: 1
	            };
	        }
	    },
	    _hex3ColorToRGBA: function (str) {
	        if (str[0] === '#' && str.length === 4) {
	            return {
	                r: parseInt(str[1] + str[1], 16),
	                g: parseInt(str[2] + str[2], 16),
	                b: parseInt(str[3] + str[3], 16),
	                a: 1
	            };
	        }
	    },
	    haveIntersection: function (r1, r2) {
	        return !(r2.x > r1.x + r1.width ||
	            r2.x + r2.width < r1.x ||
	            r2.y > r1.y + r1.height ||
	            r2.y + r2.height < r1.y);
	    },
	    cloneObject: function (obj) {
	        var retObj = {};
	        for (var key in obj) {
	            if (this._isPlainObject(obj[key])) {
	                retObj[key] = this.cloneObject(obj[key]);
	            }
	            else if (this._isArray(obj[key])) {
	                retObj[key] = this.cloneArray(obj[key]);
	            }
	            else {
	                retObj[key] = obj[key];
	            }
	        }
	        return retObj;
	    },
	    cloneArray: function (arr) {
	        return arr.slice(0);
	    },
	    _degToRad: function (deg) {
	        return deg * PI_OVER_DEG180;
	    },
	    _radToDeg: function (rad) {
	        return rad * DEG180_OVER_PI;
	    },
	    _capitalize: function (str) {
	        return str.charAt(0).toUpperCase() + str.slice(1);
	    },
	    throw: function (str) {
	        throw new Error(KONVA_ERROR + str);
	    },
	    error: function (str) {
	        console.error(KONVA_ERROR + str);
	    },
	    warn: function (str) {
	        if (!Global.Konva.showWarnings) {
	            return;
	        }
	        console.warn(KONVA_WARNING + str);
	    },
	    extend: function (child, parent) {
	        function Ctor() {
	            this.constructor = child;
	        }
	        Ctor.prototype = parent.prototype;
	        var oldProto = child.prototype;
	        child.prototype = new Ctor();
	        for (var key in oldProto) {
	            if (oldProto.hasOwnProperty(key)) {
	                child.prototype[key] = oldProto[key];
	            }
	        }
	        child.__super__ = parent.prototype;
	        child.super = parent;
	    },
	    _getControlPoints: function (x0, y0, x1, y1, x2, y2, t) {
	        var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = (t * d01) / (d01 + d12), fb = (t * d12) / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
	        return [p1x, p1y, p2x, p2y];
	    },
	    _expandPoints: function (p, tension) {
	        var len = p.length, allPoints = [], n, cp;
	        for (n = 2; n < len - 2; n += 2) {
	            cp = exports.Util._getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
	            allPoints.push(cp[0]);
	            allPoints.push(cp[1]);
	            allPoints.push(p[n]);
	            allPoints.push(p[n + 1]);
	            allPoints.push(cp[2]);
	            allPoints.push(cp[3]);
	        }
	        return allPoints;
	    },
	    each: function (obj, func) {
	        for (var key in obj) {
	            func(key, obj[key]);
	        }
	    },
	    _inRange: function (val, left, right) {
	        return left <= val && val < right;
	    },
	    _getProjectionToSegment: function (x1, y1, x2, y2, x3, y3) {
	        var x, y, dist;
	        var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	        if (pd2 == 0) {
	            x = x1;
	            y = y1;
	            dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
	        }
	        else {
	            var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
	            if (u < 0) {
	                x = x1;
	                y = y1;
	                dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
	            }
	            else if (u > 1.0) {
	                x = x2;
	                y = y2;
	                dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
	            }
	            else {
	                x = x1 + u * (x2 - x1);
	                y = y1 + u * (y2 - y1);
	                dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
	            }
	        }
	        return [x, y, dist];
	    },
	    _getProjectionToLine: function (pt, line, isClosed) {
	        var pc = exports.Util.cloneObject(pt);
	        var dist = Number.MAX_VALUE;
	        line.forEach(function (p1, i) {
	            if (!isClosed && i === line.length - 1) {
	                return;
	            }
	            var p2 = line[(i + 1) % line.length];
	            var proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
	            var px = proj[0], py = proj[1], pdist = proj[2];
	            if (pdist < dist) {
	                pc.x = px;
	                pc.y = py;
	                dist = pdist;
	            }
	        });
	        return pc;
	    },
	    _prepareArrayForTween: function (startArray, endArray, isClosed) {
	        var n, start = [], end = [];
	        if (startArray.length > endArray.length) {
	            var temp = endArray;
	            endArray = startArray;
	            startArray = temp;
	        }
	        for (n = 0; n < startArray.length; n += 2) {
	            start.push({
	                x: startArray[n],
	                y: startArray[n + 1]
	            });
	        }
	        for (n = 0; n < endArray.length; n += 2) {
	            end.push({
	                x: endArray[n],
	                y: endArray[n + 1]
	            });
	        }
	        var newStart = [];
	        end.forEach(function (point) {
	            var pr = exports.Util._getProjectionToLine(point, start, isClosed);
	            newStart.push(pr.x);
	            newStart.push(pr.y);
	        });
	        return newStart;
	    },
	    _prepareToStringify: function (obj) {
	        var desc;
	        obj.visitedByCircularReferenceRemoval = true;
	        for (var key in obj) {
	            if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')) {
	                continue;
	            }
	            desc = Object.getOwnPropertyDescriptor(obj, key);
	            if (obj[key].visitedByCircularReferenceRemoval ||
	                exports.Util._isElement(obj[key])) {
	                if (desc.configurable) {
	                    delete obj[key];
	                }
	                else {
	                    return null;
	                }
	            }
	            else if (exports.Util._prepareToStringify(obj[key]) === null) {
	                if (desc.configurable) {
	                    delete obj[key];
	                }
	                else {
	                    return null;
	                }
	            }
	        }
	        delete obj.visitedByCircularReferenceRemoval;
	        return obj;
	    },
	    _assign: function (target, source) {
	        for (var key in source) {
	            target[key] = source[key];
	        }
	        return target;
	    }
	};
	});

	unwrapExports(Util);
	var Util_1 = Util.Collection;
	var Util_2 = Util.Transform;
	var Util_3 = Util.Util;

	var Validators = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function _formatValue(val) {
	    if (Util.Util._isString(val)) {
	        return '"' + val + '"';
	    }
	    if (Object.prototype.toString.call(val) === '[object Number]') {
	        return val;
	    }
	    if (Util.Util._isBoolean(val)) {
	        return val;
	    }
	    return Object.prototype.toString.call(val);
	}
	function RGBComponent(val) {
	    if (val > 255) {
	        return 255;
	    }
	    else if (val < 0) {
	        return 0;
	    }
	    return Math.round(val);
	}
	exports.RGBComponent = RGBComponent;
	function alphaComponent(val) {
	    if (val > 1) {
	        return 1;
	    }
	    else if (val < 0.0001) {
	        return 0.0001;
	    }
	    return val;
	}
	exports.alphaComponent = alphaComponent;
	function getNumberValidator() {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            if (!Util.Util._isNumber(val)) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be a number.');
	            }
	            return val;
	        };
	    }
	}
	exports.getNumberValidator = getNumberValidator;
	function getNumberOrAutoValidator() {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            var isNumber = Util.Util._isNumber(val);
	            var isAuto = val === 'auto';
	            if (!(isNumber || isAuto)) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be a number or "auto".');
	            }
	            return val;
	        };
	    }
	}
	exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
	function getStringValidator() {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            if (!Util.Util._isString(val)) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be a string.');
	            }
	            return val;
	        };
	    }
	}
	exports.getStringValidator = getStringValidator;
	function getFunctionValidator() {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            if (!Util.Util._isFunction(val)) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be a function.');
	            }
	            return val;
	        };
	    }
	}
	exports.getFunctionValidator = getFunctionValidator;
	function getNumberArrayValidator() {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            if (!Util.Util._isArray(val)) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be a array of numbers.');
	            }
	            else {
	                val.forEach(function (item) {
	                    if (!Util.Util._isNumber(item)) {
	                        Util.Util.warn('"' +
	                            attr +
	                            '" attribute has non numeric element ' +
	                            item +
	                            '. Make sure that all elements are numbers.');
	                    }
	                });
	            }
	            return val;
	        };
	    }
	}
	exports.getNumberArrayValidator = getNumberArrayValidator;
	function getBooleanValidator() {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            var isBool = val === true || val === false;
	            if (!isBool) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be a boolean.');
	            }
	            return val;
	        };
	    }
	}
	exports.getBooleanValidator = getBooleanValidator;
	function getComponentValidator(components) {
	    if (Global.Konva.isUnminified) {
	        return function (val, attr) {
	            if (!Util.Util.isObject(val)) {
	                Util.Util.warn(_formatValue(val) +
	                    ' is a not valid value for "' +
	                    attr +
	                    '" attribute. The value should be an object with properties ' +
	                    components);
	            }
	            return val;
	        };
	    }
	}
	exports.getComponentValidator = getComponentValidator;
	});

	unwrapExports(Validators);
	var Validators_1 = Validators.RGBComponent;
	var Validators_2 = Validators.alphaComponent;
	var Validators_3 = Validators.getNumberValidator;
	var Validators_4 = Validators.getNumberOrAutoValidator;
	var Validators_5 = Validators.getStringValidator;
	var Validators_6 = Validators.getFunctionValidator;
	var Validators_7 = Validators.getNumberArrayValidator;
	var Validators_8 = Validators.getBooleanValidator;
	var Validators_9 = Validators.getComponentValidator;

	var Factory = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var GET = 'get', SET = 'set';
	exports.Factory = {
	    addGetterSetter: function (constructor, attr, def, validator, after) {
	        this.addGetter(constructor, attr, def);
	        this.addSetter(constructor, attr, validator, after);
	        this.addOverloadedGetterSetter(constructor, attr);
	    },
	    addGetter: function (constructor, attr, def) {
	        var method = GET + Util.Util._capitalize(attr);
	        constructor.prototype[method] =
	            constructor.prototype[method] ||
	                function () {
	                    var val = this.attrs[attr];
	                    return val === undefined ? def : val;
	                };
	    },
	    addSetter: function (constructor, attr, validator, after) {
	        var method = SET + Util.Util._capitalize(attr);
	        if (!constructor.prototype[method]) {
	            exports.Factory.overWriteSetter(constructor, attr, validator, after);
	        }
	    },
	    overWriteSetter: function (constructor, attr, validator, after) {
	        var method = SET + Util.Util._capitalize(attr);
	        constructor.prototype[method] = function (val) {
	            if (validator && val !== undefined && val !== null) {
	                val = validator.call(this, val, attr);
	            }
	            this._setAttr(attr, val);
	            if (after) {
	                after.call(this);
	            }
	            return this;
	        };
	    },
	    addComponentsGetterSetter: function (constructor, attr, components, validator, after) {
	        var len = components.length, capitalize = Util.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n, component;
	        constructor.prototype[getter] = function () {
	            var ret = {};
	            for (n = 0; n < len; n++) {
	                component = components[n];
	                ret[component] = this.getAttr(attr + capitalize(component));
	            }
	            return ret;
	        };
	        var basicValidator = Validators.getComponentValidator(components);
	        constructor.prototype[setter] = function (val) {
	            var oldVal = this.attrs[attr], key;
	            if (validator) {
	                val = validator.call(this, val);
	            }
	            if (basicValidator) {
	                basicValidator.call(this, val, attr);
	            }
	            for (key in val) {
	                if (!val.hasOwnProperty(key)) {
	                    continue;
	                }
	                this._setAttr(attr + capitalize(key), val[key]);
	            }
	            this._fireChangeEvent(attr, oldVal, val);
	            if (after) {
	                after.call(this);
	            }
	            return this;
	        };
	        this.addOverloadedGetterSetter(constructor, attr);
	    },
	    addOverloadedGetterSetter: function (constructor, attr) {
	        var capitalizedAttr = Util.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
	        constructor.prototype[attr] = function () {
	            if (arguments.length) {
	                this[setter](arguments[0]);
	                return this;
	            }
	            return this[getter]();
	        };
	    },
	    addDeprecatedGetterSetter: function (constructor, attr, def, validator) {
	        Util.Util.error('Adding deprecated ' + attr);
	        var method = GET + Util.Util._capitalize(attr);
	        var message = attr +
	            ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
	        constructor.prototype[method] = function () {
	            Util.Util.error(message);
	            var val = this.attrs[attr];
	            return val === undefined ? def : val;
	        };
	        this.addSetter(constructor, attr, validator, function () {
	            Util.Util.error(message);
	        });
	        this.addOverloadedGetterSetter(constructor, attr);
	    },
	    backCompat: function (constructor, methods) {
	        Util.Util.each(methods, function (oldMethodName, newMethodName) {
	            var method = constructor.prototype[newMethodName];
	            var oldGetter = GET + Util.Util._capitalize(oldMethodName);
	            var oldSetter = SET + Util.Util._capitalize(oldMethodName);
	            function deprecated() {
	                method.apply(this, arguments);
	                Util.Util.error('"' +
	                    oldMethodName +
	                    '" method is deprecated and will be removed soon. Use ""' +
	                    newMethodName +
	                    '" instead.');
	            }
	            constructor.prototype[oldMethodName] = deprecated;
	            constructor.prototype[oldGetter] = deprecated;
	            constructor.prototype[oldSetter] = deprecated;
	        });
	    },
	    afterSetFilter: function () {
	        this._filterUpToDate = false;
	    }
	};
	});

	unwrapExports(Factory);
	var Factory_1 = Factory.Factory;

	var Context_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	var COMMA = ',', OPEN_PAREN = '(', CLOSE_PAREN = ')', OPEN_PAREN_BRACKET = '([', CLOSE_BRACKET_PAREN = '])', SEMICOLON = ';', DOUBLE_PAREN = '()', EQUALS = '=', CONTEXT_METHODS = [
	    'arc',
	    'arcTo',
	    'beginPath',
	    'bezierCurveTo',
	    'clearRect',
	    'clip',
	    'closePath',
	    'createLinearGradient',
	    'createPattern',
	    'createRadialGradient',
	    'drawImage',
	    'ellipse',
	    'fill',
	    'fillText',
	    'getImageData',
	    'createImageData',
	    'lineTo',
	    'moveTo',
	    'putImageData',
	    'quadraticCurveTo',
	    'rect',
	    'restore',
	    'rotate',
	    'save',
	    'scale',
	    'setLineDash',
	    'setTransform',
	    'stroke',
	    'strokeText',
	    'transform',
	    'translate'
	];
	var CONTEXT_PROPERTIES = [
	    'fillStyle',
	    'strokeStyle',
	    'shadowColor',
	    'shadowBlur',
	    'shadowOffsetX',
	    'shadowOffsetY',
	    'lineCap',
	    'lineDashOffset',
	    'lineJoin',
	    'lineWidth',
	    'miterLimit',
	    'font',
	    'textAlign',
	    'textBaseline',
	    'globalAlpha',
	    'globalCompositeOperation',
	    'imageSmoothingEnabled'
	];
	var traceArrMax = 100;
	var Context = (function () {
	    function Context(canvas) {
	        this.canvas = canvas;
	        this._context = canvas._canvas.getContext('2d');
	        if (Global.Konva.enableTrace) {
	            this.traceArr = [];
	            this._enableTrace();
	        }
	    }
	    Context.prototype.fillShape = function (shape) {
	        if (shape.getFillEnabled()) {
	            this._fill(shape);
	        }
	    };
	    Context.prototype._fill = function (shape) {
	    };
	    Context.prototype.strokeShape = function (shape) {
	        if (shape.getStrokeEnabled()) {
	            this._stroke(shape);
	        }
	    };
	    Context.prototype._stroke = function (shape) {
	    };
	    Context.prototype.fillStrokeShape = function (shape) {
	        if (shape.getFillEnabled()) {
	            this._fill(shape);
	        }
	        if (shape.getStrokeEnabled()) {
	            this._stroke(shape);
	        }
	    };
	    Context.prototype.getTrace = function (relaxed) {
	        var traceArr = this.traceArr, len = traceArr.length, str = '', n, trace, method, args;
	        for (n = 0; n < len; n++) {
	            trace = traceArr[n];
	            method = trace.method;
	            if (method) {
	                args = trace.args;
	                str += method;
	                if (relaxed) {
	                    str += DOUBLE_PAREN;
	                }
	                else {
	                    if (Util.Util._isArray(args[0])) {
	                        str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
	                    }
	                    else {
	                        str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
	                    }
	                }
	            }
	            else {
	                str += trace.property;
	                if (!relaxed) {
	                    str += EQUALS + trace.val;
	                }
	            }
	            str += SEMICOLON;
	        }
	        return str;
	    };
	    Context.prototype.clearTrace = function () {
	        this.traceArr = [];
	    };
	    Context.prototype._trace = function (str) {
	        var traceArr = this.traceArr, len;
	        traceArr.push(str);
	        len = traceArr.length;
	        if (len >= traceArrMax) {
	            traceArr.shift();
	        }
	    };
	    Context.prototype.reset = function () {
	        var pixelRatio = this.getCanvas().getPixelRatio();
	        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
	    };
	    Context.prototype.getCanvas = function () {
	        return this.canvas;
	    };
	    Context.prototype.clear = function (bounds) {
	        var canvas = this.getCanvas();
	        if (bounds) {
	            this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
	        }
	        else {
	            this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
	        }
	    };
	    Context.prototype._applyLineCap = function (shape) {
	        var lineCap = shape.getLineCap();
	        if (lineCap) {
	            this.setAttr('lineCap', lineCap);
	        }
	    };
	    Context.prototype._applyOpacity = function (shape) {
	        var absOpacity = shape.getAbsoluteOpacity();
	        if (absOpacity !== 1) {
	            this.setAttr('globalAlpha', absOpacity);
	        }
	    };
	    Context.prototype._applyLineJoin = function (shape) {
	        var lineJoin = shape.getLineJoin();
	        if (lineJoin) {
	            this.setAttr('lineJoin', lineJoin);
	        }
	    };
	    Context.prototype.setAttr = function (attr, val) {
	        this._context[attr] = val;
	    };
	    Context.prototype.arc = function (a0, a1, a2, a3, a4, a5) {
	        this._context.arc(a0, a1, a2, a3, a4, a5);
	    };
	    Context.prototype.arcTo = function (a0, a1, a2, a3, a4, a5) {
	        this._context.arc(a0, a1, a2, a3, a4, a5);
	    };
	    Context.prototype.beginPath = function () {
	        this._context.beginPath();
	    };
	    Context.prototype.bezierCurveTo = function (a0, a1, a2, a3, a4, a5) {
	        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
	    };
	    Context.prototype.clearRect = function (a0, a1, a2, a3) {
	        this._context.clearRect(a0, a1, a2, a3);
	    };
	    Context.prototype.clip = function () {
	        this._context.clip();
	    };
	    Context.prototype.closePath = function () {
	        this._context.closePath();
	    };
	    Context.prototype.createImageData = function (a0, a1) {
	        var a = arguments;
	        if (a.length === 2) {
	            return this._context.createImageData(a0, a1);
	        }
	        else if (a.length === 1) {
	            return this._context.createImageData(a0);
	        }
	    };
	    Context.prototype.createLinearGradient = function (a0, a1, a2, a3) {
	        return this._context.createLinearGradient(a0, a1, a2, a3);
	    };
	    Context.prototype.createPattern = function (a0, a1) {
	        return this._context.createPattern(a0, a1);
	    };
	    Context.prototype.createRadialGradient = function (a0, a1, a2, a3, a4, a5) {
	        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
	    };
	    Context.prototype.drawImage = function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	        var a = arguments, _context = this._context;
	        if (a.length === 3) {
	            _context.drawImage(a0, a1, a2);
	        }
	        else if (a.length === 5) {
	            _context.drawImage(a0, a1, a2, a3, a4);
	        }
	        else if (a.length === 9) {
	            _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
	        }
	    };
	    Context.prototype.ellipse = function (a0, a1, a2, a3, a4, a5, a6, a7) {
	        this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
	    };
	    Context.prototype.isPointInPath = function (x, y) {
	        return this._context.isPointInPath(x, y);
	    };
	    Context.prototype.fill = function () {
	        this._context.fill();
	    };
	    Context.prototype.fillRect = function (x, y, width, height) {
	        this._context.fillRect(x, y, width, height);
	    };
	    Context.prototype.strokeRect = function (x, y, width, height) {
	        this._context.strokeRect(x, y, width, height);
	    };
	    Context.prototype.fillText = function (a0, a1, a2) {
	        this._context.fillText(a0, a1, a2);
	    };
	    Context.prototype.measureText = function (text) {
	        return this._context.measureText(text);
	    };
	    Context.prototype.getImageData = function (a0, a1, a2, a3) {
	        return this._context.getImageData(a0, a1, a2, a3);
	    };
	    Context.prototype.lineTo = function (a0, a1) {
	        this._context.lineTo(a0, a1);
	    };
	    Context.prototype.moveTo = function (a0, a1) {
	        this._context.moveTo(a0, a1);
	    };
	    Context.prototype.rect = function (a0, a1, a2, a3) {
	        this._context.rect(a0, a1, a2, a3);
	    };
	    Context.prototype.putImageData = function (a0, a1, a2) {
	        this._context.putImageData(a0, a1, a2);
	    };
	    Context.prototype.quadraticCurveTo = function (a0, a1, a2, a3) {
	        this._context.quadraticCurveTo(a0, a1, a2, a3);
	    };
	    Context.prototype.restore = function () {
	        this._context.restore();
	    };
	    Context.prototype.rotate = function (a0) {
	        this._context.rotate(a0);
	    };
	    Context.prototype.save = function () {
	        this._context.save();
	    };
	    Context.prototype.scale = function (a0, a1) {
	        this._context.scale(a0, a1);
	    };
	    Context.prototype.setLineDash = function (a0) {
	        if (this._context.setLineDash) {
	            this._context.setLineDash(a0);
	        }
	        else if ('mozDash' in this._context) {
	            this._context['mozDash'] = a0;
	        }
	        else if ('webkitLineDash' in this._context) {
	            this._context['webkitLineDash'] = a0;
	        }
	    };
	    Context.prototype.getLineDash = function () {
	        return this._context.getLineDash();
	    };
	    Context.prototype.setTransform = function (a0, a1, a2, a3, a4, a5) {
	        this._context.setTransform(a0, a1, a2, a3, a4, a5);
	    };
	    Context.prototype.stroke = function () {
	        this._context.stroke();
	    };
	    Context.prototype.strokeText = function (a0, a1, a2, a3) {
	        this._context.strokeText(a0, a1, a2, a3);
	    };
	    Context.prototype.transform = function (a0, a1, a2, a3, a4, a5) {
	        this._context.transform(a0, a1, a2, a3, a4, a5);
	    };
	    Context.prototype.translate = function (a0, a1) {
	        this._context.translate(a0, a1);
	    };
	    Context.prototype._enableTrace = function () {
	        var that = this, len = CONTEXT_METHODS.length, _simplifyArray = Util.Util._simplifyArray, origSetter = this.setAttr, n, args;
	        var func = function (methodName) {
	            var origMethod = that[methodName], ret;
	            that[methodName] = function () {
	                args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
	                ret = origMethod.apply(that, arguments);
	                that._trace({
	                    method: methodName,
	                    args: args
	                });
	                return ret;
	            };
	        };
	        for (n = 0; n < len; n++) {
	            func(CONTEXT_METHODS[n]);
	        }
	        that.setAttr = function () {
	            origSetter.apply(that, arguments);
	            var prop = arguments[0];
	            var val = arguments[1];
	            if (prop === 'shadowOffsetX' ||
	                prop === 'shadowOffsetY' ||
	                prop === 'shadowBlur') {
	                val = val / this.canvas.getPixelRatio();
	            }
	            that._trace({
	                property: prop,
	                val: val
	            });
	        };
	    };
	    Context.prototype._applyGlobalCompositeOperation = function (node) {
	        var globalCompositeOperation = node.getGlobalCompositeOperation();
	        if (globalCompositeOperation !== 'source-over') {
	            this.setAttr('globalCompositeOperation', globalCompositeOperation);
	        }
	    };
	    return Context;
	}());
	exports.Context = Context;
	CONTEXT_PROPERTIES.forEach(function (prop) {
	    Object.defineProperty(Context.prototype, prop, {
	        get: function () {
	            return this._context[prop];
	        },
	        set: function (val) {
	            this._context[prop] = val;
	        }
	    });
	});
	var SceneContext = (function (_super) {
	    __extends(SceneContext, _super);
	    function SceneContext() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    SceneContext.prototype._fillColor = function (shape) {
	        var fill = shape.fill();
	        this.setAttr('fillStyle', fill);
	        shape._fillFunc(this);
	    };
	    SceneContext.prototype._fillPattern = function (shape) {
	        var fillPatternX = shape.getFillPatternX(), fillPatternY = shape.getFillPatternY(), fillPatternScaleX = shape.getFillPatternScaleX(), fillPatternScaleY = shape.getFillPatternScaleY(), fillPatternRotation = Global.Konva.getAngle(shape.getFillPatternRotation()), fillPatternOffsetX = shape.getFillPatternOffsetX(), fillPatternOffsetY = shape.getFillPatternOffsetY();
	        if (fillPatternX || fillPatternY) {
	            this.translate(fillPatternX || 0, fillPatternY || 0);
	        }
	        if (fillPatternRotation) {
	            this.rotate(fillPatternRotation);
	        }
	        if (fillPatternScaleX || fillPatternScaleY) {
	            this.scale(fillPatternScaleX, fillPatternScaleY);
	        }
	        if (fillPatternOffsetX || fillPatternOffsetY) {
	            this.translate(-1 * fillPatternOffsetX, -1 * fillPatternOffsetY);
	        }
	        this.setAttr('fillStyle', shape._getFillPattern());
	        shape._fillFunc(this);
	    };
	    SceneContext.prototype._fillLinearGradient = function (shape) {
	        var grd = shape._getLinearGradient();
	        if (grd) {
	            this.setAttr('fillStyle', grd);
	            shape._fillFunc(this);
	        }
	    };
	    SceneContext.prototype._fillRadialGradient = function (shape) {
	        var grd = shape._getRadialGradient();
	        if (grd) {
	            this.setAttr('fillStyle', grd);
	            shape._fillFunc(this);
	        }
	    };
	    SceneContext.prototype._fill = function (shape) {
	        var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
	        if (hasColor && fillPriority === 'color') {
	            this._fillColor(shape);
	            return;
	        }
	        var hasPattern = shape.getFillPatternImage();
	        if (hasPattern && fillPriority === 'pattern') {
	            this._fillPattern(shape);
	            return;
	        }
	        var hasLinearGradient = shape.getFillLinearGradientColorStops();
	        if (hasLinearGradient && fillPriority === 'linear-gradient') {
	            this._fillLinearGradient(shape);
	            return;
	        }
	        var hasRadialGradient = shape.getFillRadialGradientColorStops();
	        if (hasRadialGradient && fillPriority === 'radial-gradient') {
	            this._fillRadialGradient(shape);
	            return;
	        }
	        if (hasColor) {
	            this._fillColor(shape);
	        }
	        else if (hasPattern) {
	            this._fillPattern(shape);
	        }
	        else if (hasLinearGradient) {
	            this._fillLinearGradient(shape);
	        }
	        else if (hasRadialGradient) {
	            this._fillRadialGradient(shape);
	        }
	    };
	    SceneContext.prototype._strokeLinearGradient = function (shape) {
	        var start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
	        if (colorStops) {
	            for (var n = 0; n < colorStops.length; n += 2) {
	                grd.addColorStop(colorStops[n], colorStops[n + 1]);
	            }
	            this.setAttr('strokeStyle', grd);
	        }
	    };
	    SceneContext.prototype._stroke = function (shape) {
	        var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
	        if (shape.hasStroke()) {
	            if (!strokeScaleEnabled) {
	                this.save();
	                var pixelRatio = this.getCanvas().getPixelRatio();
	                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	            }
	            this._applyLineCap(shape);
	            if (dash && shape.dashEnabled()) {
	                this.setLineDash(dash);
	                this.setAttr('lineDashOffset', shape.dashOffset());
	            }
	            this.setAttr('lineWidth', shape.strokeWidth());
	            if (!shape.getShadowForStrokeEnabled()) {
	                this.setAttr('shadowColor', 'rgba(0,0,0,0)');
	            }
	            var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
	            if (hasLinearGradient) {
	                this._strokeLinearGradient(shape);
	            }
	            else {
	                this.setAttr('strokeStyle', shape.stroke());
	            }
	            shape._strokeFunc(this);
	            if (!strokeScaleEnabled) {
	                this.restore();
	            }
	        }
	    };
	    SceneContext.prototype._applyShadow = function (shape) {
	        var util = Util.Util, color = util.get(shape.getShadowRGBA(), 'black'), blur = util.get(shape.getShadowBlur(), 5), offset = util.get(shape.getShadowOffset(), {
	            x: 0,
	            y: 0
	        }), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
	        this.setAttr('shadowColor', color);
	        this.setAttr('shadowBlur', blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
	        this.setAttr('shadowOffsetX', offset.x * scaleX);
	        this.setAttr('shadowOffsetY', offset.y * scaleY);
	    };
	    return SceneContext;
	}(Context));
	exports.SceneContext = SceneContext;
	var HitContext = (function (_super) {
	    __extends(HitContext, _super);
	    function HitContext() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    HitContext.prototype._fill = function (shape) {
	        this.save();
	        this.setAttr('fillStyle', shape.colorKey);
	        shape._fillFuncHit(this);
	        this.restore();
	    };
	    HitContext.prototype._stroke = function (shape) {
	        if (shape.hasStroke() && shape.hitStrokeWidth()) {
	            var strokeScaleEnabled = shape.getStrokeScaleEnabled();
	            if (!strokeScaleEnabled) {
	                this.save();
	                var pixelRatio = this.getCanvas().getPixelRatio();
	                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	            }
	            this._applyLineCap(shape);
	            var hitStrokeWidth = shape.hitStrokeWidth();
	            var strokeWidth = hitStrokeWidth === 'auto' ? shape.strokeWidth() : hitStrokeWidth;
	            this.setAttr('lineWidth', strokeWidth);
	            this.setAttr('strokeStyle', shape.colorKey);
	            shape._strokeFuncHit(this);
	            if (!strokeScaleEnabled) {
	                this.restore();
	            }
	        }
	    };
	    return HitContext;
	}(Context));
	exports.HitContext = HitContext;
	});

	unwrapExports(Context_1);
	var Context_2 = Context_1.Context;
	var Context_3 = Context_1.SceneContext;
	var Context_4 = Context_1.HitContext;

	var Canvas_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var _pixelRatio;
	function getDevicePixelRatio() {
	    if (_pixelRatio) {
	        return _pixelRatio;
	    }
	    var canvas = Util.Util.createCanvasElement();
	    var context = canvas.getContext('2d');
	    _pixelRatio = (function () {
	        var devicePixelRatio = Global.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio ||
	            context.mozBackingStorePixelRatio ||
	            context.msBackingStorePixelRatio ||
	            context.oBackingStorePixelRatio ||
	            context.backingStorePixelRatio ||
	            1;
	        return devicePixelRatio / backingStoreRatio;
	    })();
	    return _pixelRatio;
	}
	var Canvas = (function () {
	    function Canvas(config) {
	        this.pixelRatio = 1;
	        this.width = 0;
	        this.height = 0;
	        this.isCache = false;
	        var conf = config || {};
	        var pixelRatio = conf.pixelRatio || Global.Konva.pixelRatio || getDevicePixelRatio();
	        this.pixelRatio = pixelRatio;
	        this._canvas = Util.Util.createCanvasElement();
	        this._canvas.style.padding = '0';
	        this._canvas.style.margin = '0';
	        this._canvas.style.border = '0';
	        this._canvas.style.background = 'transparent';
	        this._canvas.style.position = 'absolute';
	        this._canvas.style.top = '0';
	        this._canvas.style.left = '0';
	    }
	    Canvas.prototype.getContext = function () {
	        return this.context;
	    };
	    Canvas.prototype.getPixelRatio = function () {
	        return this.pixelRatio;
	    };
	    Canvas.prototype.setPixelRatio = function (pixelRatio) {
	        var previousRatio = this.pixelRatio;
	        this.pixelRatio = pixelRatio;
	        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
	    };
	    Canvas.prototype.setWidth = function (width) {
	        this.width = this._canvas.width = width * this.pixelRatio;
	        this._canvas.style.width = width + 'px';
	        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
	        _context.scale(pixelRatio, pixelRatio);
	    };
	    Canvas.prototype.setHeight = function (height) {
	        this.height = this._canvas.height = height * this.pixelRatio;
	        this._canvas.style.height = height + 'px';
	        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
	        _context.scale(pixelRatio, pixelRatio);
	    };
	    Canvas.prototype.getWidth = function () {
	        return this.width;
	    };
	    Canvas.prototype.getHeight = function () {
	        return this.height;
	    };
	    Canvas.prototype.setSize = function (width, height) {
	        this.setWidth(width);
	        this.setHeight(height);
	    };
	    Canvas.prototype.toDataURL = function (mimeType, quality) {
	        try {
	            return this._canvas.toDataURL(mimeType, quality);
	        }
	        catch (e) {
	            try {
	                return this._canvas.toDataURL();
	            }
	            catch (err) {
	                Util.Util.error('Unable to get data URL. ' + err.message);
	                return '';
	            }
	        }
	    };
	    return Canvas;
	}());
	exports.Canvas = Canvas;
	Factory.Factory.addGetterSetter(Canvas, 'pixelRatio', undefined, Validators.getNumberValidator());
	var SceneCanvas = (function (_super) {
	    __extends(SceneCanvas, _super);
	    function SceneCanvas(config) {
	        if (config === void 0) { config = { width: 0, height: 0 }; }
	        var _this = _super.call(this, config) || this;
	        _this.context = new Context_1.SceneContext(_this);
	        _this.setSize(config.width, config.height);
	        return _this;
	    }
	    return SceneCanvas;
	}(Canvas));
	exports.SceneCanvas = SceneCanvas;
	var HitCanvas = (function (_super) {
	    __extends(HitCanvas, _super);
	    function HitCanvas(config) {
	        if (config === void 0) { config = { width: 0, height: 0 }; }
	        var _this = _super.call(this, config) || this;
	        _this.hitCanvas = true;
	        _this.context = new Context_1.HitContext(_this);
	        _this.setSize(config.width, config.height);
	        return _this;
	    }
	    return HitCanvas;
	}(Canvas));
	exports.HitCanvas = HitCanvas;
	});

	unwrapExports(Canvas_1);
	var Canvas_2 = Canvas_1.Canvas;
	var Canvas_3 = Canvas_1.SceneCanvas;
	var Canvas_4 = Canvas_1.HitCanvas;

	var Animation_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var now = (function () {
	    if (Global.glob.performance && Global.glob.performance.now) {
	        return function () {
	            return Global.glob.performance.now();
	        };
	    }
	    return function () {
	        return new Date().getTime();
	    };
	})();
	var Animation = (function () {
	    function Animation(func, layers) {
	        this.id = Animation.animIdCounter++;
	        this.frame = {
	            time: 0,
	            timeDiff: 0,
	            lastTime: now(),
	            frameRate: 0
	        };
	        this.func = func;
	        this.setLayers(layers);
	    }
	    Animation.prototype.setLayers = function (layers) {
	        var lays = [];
	        if (!layers) {
	            lays = [];
	        }
	        else if (layers.length > 0) {
	            lays = layers;
	        }
	        else {
	            lays = [layers];
	        }
	        this.layers = lays;
	        return this;
	    };
	    Animation.prototype.getLayers = function () {
	        return this.layers;
	    };
	    Animation.prototype.addLayer = function (layer) {
	        var layers = this.layers, len = layers.length, n;
	        for (n = 0; n < len; n++) {
	            if (layers[n]._id === layer._id) {
	                return false;
	            }
	        }
	        this.layers.push(layer);
	        return true;
	    };
	    Animation.prototype.isRunning = function () {
	        var a = Animation, animations = a.animations, len = animations.length, n;
	        for (n = 0; n < len; n++) {
	            if (animations[n].id === this.id) {
	                return true;
	            }
	        }
	        return false;
	    };
	    Animation.prototype.start = function () {
	        this.stop();
	        this.frame.timeDiff = 0;
	        this.frame.lastTime = now();
	        Animation._addAnimation(this);
	        return this;
	    };
	    Animation.prototype.stop = function () {
	        Animation._removeAnimation(this);
	        return this;
	    };
	    Animation.prototype._updateFrameObject = function (time) {
	        this.frame.timeDiff = time - this.frame.lastTime;
	        this.frame.lastTime = time;
	        this.frame.time += this.frame.timeDiff;
	        this.frame.frameRate = 1000 / this.frame.timeDiff;
	    };
	    Animation._addAnimation = function (anim) {
	        this.animations.push(anim);
	        this._handleAnimation();
	    };
	    Animation._removeAnimation = function (anim) {
	        var id = anim.id, animations = this.animations, len = animations.length, n;
	        for (n = 0; n < len; n++) {
	            if (animations[n].id === id) {
	                this.animations.splice(n, 1);
	                break;
	            }
	        }
	    };
	    Animation._runFrames = function () {
	        var layerHash = {}, animations = this.animations, anim, layers, func, n, i, layersLen, layer, key, needRedraw;
	        for (n = 0; n < animations.length; n++) {
	            anim = animations[n];
	            layers = anim.layers;
	            func = anim.func;
	            anim._updateFrameObject(now());
	            layersLen = layers.length;
	            if (func) {
	                needRedraw = func.call(anim, anim.frame) !== false;
	            }
	            else {
	                needRedraw = true;
	            }
	            if (!needRedraw) {
	                continue;
	            }
	            for (i = 0; i < layersLen; i++) {
	                layer = layers[i];
	                if (layer._id !== undefined) {
	                    layerHash[layer._id] = layer;
	                }
	            }
	        }
	        for (key in layerHash) {
	            if (!layerHash.hasOwnProperty(key)) {
	                continue;
	            }
	            layerHash[key].draw();
	        }
	    };
	    Animation._animationLoop = function () {
	        var Anim = Animation;
	        if (Anim.animations.length) {
	            Anim._runFrames();
	            requestAnimationFrame(Anim._animationLoop);
	        }
	        else {
	            Anim.animRunning = false;
	        }
	    };
	    Animation._handleAnimation = function () {
	        if (!this.animRunning) {
	            this.animRunning = true;
	            requestAnimationFrame(this._animationLoop);
	        }
	    };
	    Animation.animations = [];
	    Animation.animIdCounter = 0;
	    Animation.animRunning = false;
	    return Animation;
	}());
	exports.Animation = Animation;
	});

	unwrapExports(Animation_1);
	var Animation_2 = Animation_1.Animation;

	var DragAndDrop = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.DD = {
	    startPointerPos: {
	        x: 0,
	        y: 0
	    },
	    anim: new Animation_1.Animation(function () {
	        var b = this.dirty;
	        this.dirty = false;
	        return b;
	    }),
	    isDragging: false,
	    justDragged: false,
	    offset: {
	        x: 0,
	        y: 0
	    },
	    node: null,
	    _drag: function (evt) {
	        var node = exports.DD.node;
	        if (node) {
	            if (!exports.DD.isDragging) {
	                var pos = node.getStage().getPointerPosition();
	                if (!pos) {
	                    node.getStage().setPointersPositions(evt);
	                    pos = node.getStage().getPointerPosition();
	                }
	                var dragDistance = node.dragDistance();
	                var distance = Math.max(Math.abs(pos.x - exports.DD.startPointerPos.x), Math.abs(pos.y - exports.DD.startPointerPos.y));
	                if (distance < dragDistance) {
	                    return;
	                }
	            }
	            node.getStage().setPointersPositions(evt);
	            if (!exports.DD.isDragging) {
	                exports.DD.isDragging = true;
	                node.fire('dragstart', {
	                    type: 'dragstart',
	                    target: node,
	                    evt: evt
	                }, true);
	                if (!node.isDragging()) {
	                    return;
	                }
	            }
	            node._setDragPosition(evt);
	            node.fire('dragmove', {
	                type: 'dragmove',
	                target: node,
	                evt: evt
	            }, true);
	        }
	    },
	    _endDragBefore: function (evt) {
	        var node = exports.DD.node;
	        if (node) {
	            exports.DD.anim.stop();
	            if (exports.DD.isDragging) {
	                exports.DD.isDragging = false;
	                exports.DD.justDragged = true;
	                Global.Konva.listenClickTap = false;
	                if (evt) {
	                    evt.dragEndNode = node;
	                }
	            }
	            exports.DD.node = null;
	            var drawNode = node.getLayer() || (node instanceof Global.Konva['Stage'] && node);
	            if (drawNode) {
	                drawNode.draw();
	            }
	        }
	    },
	    _endDragAfter: function (evt) {
	        evt = evt || {};
	        var dragEndNode = evt.dragEndNode;
	        if (evt && dragEndNode) {
	            dragEndNode.fire('dragend', {
	                type: 'dragend',
	                target: dragEndNode,
	                evt: evt
	            }, true);
	        }
	    }
	};
	if (Global.Konva.isBrowser) {
	    window.addEventListener('mouseup', exports.DD._endDragBefore, true);
	    window.addEventListener('touchend', exports.DD._endDragBefore, true);
	    window.addEventListener('mousemove', exports.DD._drag);
	    window.addEventListener('touchmove', exports.DD._drag);
	    window.addEventListener('mouseup', exports.DD._endDragAfter, false);
	    window.addEventListener('touchend', exports.DD._endDragAfter, false);
	}
	});

	unwrapExports(DragAndDrop);
	var DragAndDrop_1 = DragAndDrop.DD;

	var Node_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	exports.ids = {};
	exports.names = {};
	var _addId = function (node, id) {
	    if (!id) {
	        return;
	    }
	    exports.ids[id] = node;
	};
	exports._removeId = function (id, node) {
	    if (!id) {
	        return;
	    }
	    if (exports.ids[id] !== node) {
	        return;
	    }
	    delete exports.ids[id];
	};
	exports._addName = function (node, name) {
	    if (name) {
	        if (!exports.names[name]) {
	            exports.names[name] = [];
	        }
	        exports.names[name].push(node);
	    }
	};
	exports._removeName = function (name, _id) {
	    if (!name) {
	        return;
	    }
	    var nodes = exports.names[name];
	    if (!nodes) {
	        return;
	    }
	    for (var n = 0; n < nodes.length; n++) {
	        var no = nodes[n];
	        if (no._id === _id) {
	            nodes.splice(n, 1);
	        }
	    }
	    if (nodes.length === 0) {
	        delete exports.names[name];
	    }
	};
	var ABSOLUTE_OPACITY = 'absoluteOpacity', ABSOLUTE_TRANSFORM = 'absoluteTransform', ABSOLUTE_SCALE = 'absoluteScale', CANVAS = 'canvas', CHANGE = 'Change', CHILDREN = 'children', KONVA = 'konva', LISTENING = 'listening', MOUSEENTER = 'mouseenter', MOUSELEAVE = 'mouseleave', NAME = 'name', SET = 'set', SHAPE = 'Shape', SPACE = ' ', STAGE = 'stage', TRANSFORM = 'transform', UPPER_STAGE = 'Stage', VISIBLE = 'visible', CLONE_BLACK_LIST = ['id'], TRANSFORM_CHANGE_STR = [
	    'xChange.konva',
	    'yChange.konva',
	    'scaleXChange.konva',
	    'scaleYChange.konva',
	    'skewXChange.konva',
	    'skewYChange.konva',
	    'rotationChange.konva',
	    'offsetXChange.konva',
	    'offsetYChange.konva',
	    'transformsEnabledChange.konva'
	].join(SPACE), SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);
	var emptyChildren = new Util.Collection();
	var idCounter = 1;
	var Node = (function () {
	    function Node(config) {
	        var _this = this;
	        this._id = idCounter++;
	        this.eventListeners = {};
	        this.attrs = {};
	        this.index = 0;
	        this.parent = null;
	        this._cache = new Map();
	        this._lastPos = null;
	        this._filterUpToDate = false;
	        this._isUnderCache = false;
	        this.children = emptyChildren;
	        this.setAttrs(config);
	        this.on(TRANSFORM_CHANGE_STR, function () {
	            _this._clearCache(TRANSFORM);
	            _this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	        });
	        this.on(SCALE_CHANGE_STR, function () {
	            _this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
	        });
	        this.on('visibleChange.konva', function () {
	            _this._clearSelfAndDescendantCache(VISIBLE);
	        });
	        this.on('listeningChange.konva', function () {
	            _this._clearSelfAndDescendantCache(LISTENING);
	        });
	        this.on('opacityChange.konva', function () {
	            _this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	        });
	    }
	    Node.prototype.hasChildren = function () {
	        return false;
	    };
	    Node.prototype.getChildren = function () {
	        return emptyChildren;
	    };
	    Node.prototype._clearCache = function (attr) {
	        if (attr) {
	            this._cache.delete(attr);
	        }
	        else {
	            this._cache.clear();
	        }
	    };
	    Node.prototype._getCache = function (attr, privateGetter) {
	        var cache = this._cache.get(attr);
	        if (cache === undefined) {
	            cache = privateGetter.call(this);
	            this._cache.set(attr, cache);
	        }
	        return cache;
	    };
	    Node.prototype._getCanvasCache = function () {
	        return this._cache.get(CANVAS);
	    };
	    Node.prototype._clearSelfAndDescendantCache = function (attr) {
	        this._clearCache(attr);
	        if (this._getCanvasCache()) {
	            return;
	        }
	        if (this.children) {
	            this.children.each(function (node) {
	                node._clearSelfAndDescendantCache(attr);
	            });
	        }
	    };
	    Node.prototype.clearCache = function () {
	        this._cache.delete(CANVAS);
	        this._clearSelfAndDescendantCache();
	        return this;
	    };
	    Node.prototype.cache = function (config) {
	        var conf = config || {};
	        var rect = {};
	        if (conf.x === undefined ||
	            conf.y === undefined ||
	            conf.width === undefined ||
	            conf.height === undefined) {
	            rect = this.getClientRect({
	                skipTransform: true,
	                relativeTo: this.getParent()
	            });
	        }
	        var width = conf.width || rect.width, height = conf.height || rect.height, pixelRatio = conf.pixelRatio, x = conf.x === undefined ? rect.x : conf.x, y = conf.y === undefined ? rect.y : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false;
	        if (!width || !height) {
	            Util.Util.error('Can not cache the node. Width or height of the node equals 0. Caching is skipped.');
	            return;
	        }
	        width += offset * 2;
	        height += offset * 2;
	        x -= offset;
	        y -= offset;
	        var cachedSceneCanvas = new Canvas_1.SceneCanvas({
	            pixelRatio: pixelRatio,
	            width: width,
	            height: height
	        }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
	            pixelRatio: pixelRatio,
	            width: width,
	            height: height
	        }), cachedHitCanvas = new Canvas_1.HitCanvas({
	            pixelRatio: 1,
	            width: width,
	            height: height
	        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
	        cachedHitCanvas.isCache = true;
	        this._cache.delete('canvas');
	        this._filterUpToDate = false;
	        if (conf.imageSmoothingEnabled === false) {
	            cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
	            cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
	            cachedHitCanvas.getContext()._context.imageSmoothingEnabled = false;
	        }
	        sceneContext.save();
	        hitContext.save();
	        sceneContext.translate(-x, -y);
	        hitContext.translate(-x, -y);
	        this._isUnderCache = true;
	        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
	        this.drawScene(cachedSceneCanvas, this, true);
	        this.drawHit(cachedHitCanvas, this, true);
	        this._isUnderCache = false;
	        sceneContext.restore();
	        hitContext.restore();
	        if (drawBorder) {
	            sceneContext.save();
	            sceneContext.beginPath();
	            sceneContext.rect(0, 0, width, height);
	            sceneContext.closePath();
	            sceneContext.setAttr('strokeStyle', 'red');
	            sceneContext.setAttr('lineWidth', 5);
	            sceneContext.stroke();
	            sceneContext.restore();
	        }
	        this._cache.set(CANVAS, {
	            scene: cachedSceneCanvas,
	            filter: cachedFilterCanvas,
	            hit: cachedHitCanvas,
	            x: x,
	            y: y
	        });
	        return this;
	    };
	    Node.prototype.getClientRect = function (config) {
	        throw new Error('abstract "getClientRect" method call');
	    };
	    Node.prototype._transformedRect = function (rect, top) {
	        var points = [
	            { x: rect.x, y: rect.y },
	            { x: rect.x + rect.width, y: rect.y },
	            { x: rect.x + rect.width, y: rect.y + rect.height },
	            { x: rect.x, y: rect.y + rect.height }
	        ];
	        var minX, minY, maxX, maxY;
	        var trans = this.getAbsoluteTransform(top);
	        points.forEach(function (point) {
	            var transformed = trans.point(point);
	            if (minX === undefined) {
	                minX = maxX = transformed.x;
	                minY = maxY = transformed.y;
	            }
	            minX = Math.min(minX, transformed.x);
	            minY = Math.min(minY, transformed.y);
	            maxX = Math.max(maxX, transformed.x);
	            maxY = Math.max(maxY, transformed.y);
	        });
	        return {
	            x: minX,
	            y: minY,
	            width: maxX - minX,
	            height: maxY - minY
	        };
	    };
	    Node.prototype._drawCachedSceneCanvas = function (context) {
	        context.save();
	        context._applyOpacity(this);
	        context._applyGlobalCompositeOperation(this);
	        var canvasCache = this._getCanvasCache();
	        context.translate(canvasCache.x, canvasCache.y);
	        var cacheCanvas = this._getCachedSceneCanvas();
	        var ratio = cacheCanvas.pixelRatio;
	        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
	        context.restore();
	    };
	    Node.prototype._drawCachedHitCanvas = function (context) {
	        var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
	        context.save();
	        context._applyGlobalCompositeOperation(this);
	        context.translate(canvasCache.x, canvasCache.y);
	        context.drawImage(hitCanvas._canvas, 0, 0);
	        context.restore();
	    };
	    Node.prototype._getCachedSceneCanvas = function () {
	        var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
	        if (filters) {
	            if (!this._filterUpToDate) {
	                var ratio = sceneCanvas.pixelRatio;
	                try {
	                    len = filters.length;
	                    filterContext.clear();
	                    filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
	                    imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
	                    for (n = 0; n < len; n++) {
	                        filter = filters[n];
	                        if (typeof filter !== 'function') {
	                            Util.Util.error('Filter should be type of function, but got ' +
	                                typeof filter +
	                                ' insted. Please check correct filters');
	                            continue;
	                        }
	                        filter.call(this, imageData);
	                        filterContext.putImageData(imageData, 0, 0);
	                    }
	                }
	                catch (e) {
	                    Util.Util.error('Unable to apply filter. ' + e.message);
	                }
	                this._filterUpToDate = true;
	            }
	            return filterCanvas;
	        }
	        return sceneCanvas;
	    };
	    Node.prototype.on = function (evtStr, handler) {
	        if (arguments.length === 3) {
	            return this._delegate.apply(this, arguments);
	        }
	        var events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
	        for (n = 0; n < len; n++) {
	            event = events[n];
	            parts = event.split('.');
	            baseEvent = parts[0];
	            name = parts[1] || '';
	            if (!this.eventListeners[baseEvent]) {
	                this.eventListeners[baseEvent] = [];
	            }
	            this.eventListeners[baseEvent].push({
	                name: name,
	                handler: handler
	            });
	        }
	        return this;
	    };
	    Node.prototype.off = function (evtStr, callback) {
	        var events = (evtStr || '').split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
	        if (!evtStr) {
	            for (t in this.eventListeners) {
	                this._off(t);
	            }
	        }
	        for (n = 0; n < len; n++) {
	            event = events[n];
	            parts = event.split('.');
	            baseEvent = parts[0];
	            name = parts[1];
	            if (baseEvent) {
	                if (this.eventListeners[baseEvent]) {
	                    this._off(baseEvent, name, callback);
	                }
	            }
	            else {
	                for (t in this.eventListeners) {
	                    this._off(t, name, callback);
	                }
	            }
	        }
	        return this;
	    };
	    Node.prototype.dispatchEvent = function (evt) {
	        var e = {
	            target: this,
	            type: evt.type,
	            evt: evt
	        };
	        this.fire(evt.type, e);
	        return this;
	    };
	    Node.prototype.addEventListener = function (type, handler) {
	        this.on(type, function (evt) {
	            handler.call(this, evt.evt);
	        });
	        return this;
	    };
	    Node.prototype.removeEventListener = function (type) {
	        this.off(type);
	        return this;
	    };
	    Node.prototype._delegate = function (event, selector, handler) {
	        var stopNode = this;
	        this.on(event, function (evt) {
	            var targets = evt.target.findAncestors(selector, true, stopNode);
	            for (var i = 0; i < targets.length; i++) {
	                evt = Util.Util.cloneObject(evt);
	                evt.currentTarget = targets[i];
	                handler.call(targets[i], evt);
	            }
	        });
	    };
	    Node.prototype.remove = function () {
	        if (DragAndDrop.DD.node && DragAndDrop.DD.node === this) {
	            this.stopDrag();
	        }
	        this._remove();
	        return this;
	    };
	    Node.prototype._remove = function () {
	        this._clearSelfAndDescendantCache(STAGE);
	        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	        this._clearSelfAndDescendantCache(VISIBLE);
	        this._clearSelfAndDescendantCache(LISTENING);
	        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
	        var parent = this.getParent();
	        if (parent && parent.children) {
	            parent.children.splice(this.index, 1);
	            parent._setChildrenIndices();
	            this.parent = null;
	        }
	    };
	    Node.prototype.destroy = function () {
	        exports._removeId(this.id(), this);
	        var names = (this.name() || '').split(/\s/g);
	        for (var i = 0; i < names.length; i++) {
	            var subname = names[i];
	            exports._removeName(subname, this._id);
	        }
	        this.remove();
	        return this;
	    };
	    Node.prototype.getAttr = function (attr) {
	        var method = 'get' + Util.Util._capitalize(attr);
	        if (Util.Util._isFunction(this[method])) {
	            return this[method]();
	        }
	        return this.attrs[attr];
	    };
	    Node.prototype.getAncestors = function () {
	        var parent = this.getParent(), ancestors = new Util.Collection();
	        while (parent) {
	            ancestors.push(parent);
	            parent = parent.getParent();
	        }
	        return ancestors;
	    };
	    Node.prototype.getAttrs = function () {
	        return this.attrs || {};
	    };
	    Node.prototype.setAttrs = function (config) {
	        var key, method;
	        if (!config) {
	            return this;
	        }
	        for (key in config) {
	            if (key === CHILDREN) {
	                continue;
	            }
	            method = SET + Util.Util._capitalize(key);
	            if (Util.Util._isFunction(this[method])) {
	                this[method](config[key]);
	            }
	            else {
	                this._setAttr(key, config[key]);
	            }
	        }
	        return this;
	    };
	    Node.prototype.isListening = function () {
	        return this._getCache(LISTENING, this._isListening);
	    };
	    Node.prototype._isListening = function () {
	        var listening = this.listening(), parent = this.getParent();
	        if (listening === 'inherit') {
	            if (parent) {
	                return parent.isListening();
	            }
	            else {
	                return true;
	            }
	        }
	        else {
	            return listening;
	        }
	    };
	    Node.prototype.isVisible = function () {
	        return this._getCache(VISIBLE, this._isVisible);
	    };
	    Node.prototype._isVisible = function (relativeTo) {
	        var visible = this.visible(), parent = this.getParent();
	        if (visible === 'inherit') {
	            if (parent && parent !== relativeTo) {
	                return parent._isVisible(relativeTo);
	            }
	            else {
	                return true;
	            }
	        }
	        else {
	            return visible;
	        }
	    };
	    Node.prototype.shouldDrawHit = function () {
	        var layer = this.getLayer();
	        return ((!layer && this.isListening() && this.isVisible()) ||
	            (layer &&
	                layer.hitGraphEnabled() &&
	                this.isListening() &&
	                this.isVisible()));
	    };
	    Node.prototype.show = function () {
	        this.visible(true);
	        return this;
	    };
	    Node.prototype.hide = function () {
	        this.visible(false);
	        return this;
	    };
	    Node.prototype.getZIndex = function () {
	        return this.index || 0;
	    };
	    Node.prototype.getAbsoluteZIndex = function () {
	        var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
	        function addChildren(children) {
	            nodes = [];
	            len = children.length;
	            for (n = 0; n < len; n++) {
	                child = children[n];
	                index++;
	                if (child.nodeType !== SHAPE) {
	                    nodes = nodes.concat(child.getChildren().toArray());
	                }
	                if (child._id === that._id) {
	                    n = len;
	                }
	            }
	            if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
	                addChildren(nodes);
	            }
	        }
	        if (that.nodeType !== UPPER_STAGE) {
	            addChildren(that.getStage().getChildren());
	        }
	        return index;
	    };
	    Node.prototype.getDepth = function () {
	        var depth = 0, parent = this.parent;
	        while (parent) {
	            depth++;
	            parent = parent.parent;
	        }
	        return depth;
	    };
	    Node.prototype.setPosition = function (pos) {
	        this.x(pos.x);
	        this.y(pos.y);
	        return this;
	    };
	    Node.prototype.getPosition = function () {
	        return {
	            x: this.x(),
	            y: this.y()
	        };
	    };
	    Node.prototype.getAbsolutePosition = function (top) {
	        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util.Transform(), offset = this.offset();
	        absoluteTransform.m = absoluteMatrix.slice();
	        absoluteTransform.translate(offset.x, offset.y);
	        return absoluteTransform.getTranslation();
	    };
	    Node.prototype.setAbsolutePosition = function (pos) {
	        var origTrans = this._clearTransform(), it;
	        this.attrs.x = origTrans.x;
	        this.attrs.y = origTrans.y;
	        delete origTrans.x;
	        delete origTrans.y;
	        it = this.getAbsoluteTransform();
	        it.invert();
	        it.translate(pos.x, pos.y);
	        pos = {
	            x: this.attrs.x + it.getTranslation().x,
	            y: this.attrs.y + it.getTranslation().y
	        };
	        this.setPosition({ x: pos.x, y: pos.y });
	        this._setTransform(origTrans);
	        return this;
	    };
	    Node.prototype._setTransform = function (trans) {
	        var key;
	        for (key in trans) {
	            this.attrs[key] = trans[key];
	        }
	        this._clearCache(TRANSFORM);
	        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	    };
	    Node.prototype._clearTransform = function () {
	        var trans = {
	            x: this.x(),
	            y: this.y(),
	            rotation: this.rotation(),
	            scaleX: this.scaleX(),
	            scaleY: this.scaleY(),
	            offsetX: this.offsetX(),
	            offsetY: this.offsetY(),
	            skewX: this.skewX(),
	            skewY: this.skewY()
	        };
	        this.attrs.x = 0;
	        this.attrs.y = 0;
	        this.attrs.rotation = 0;
	        this.attrs.scaleX = 1;
	        this.attrs.scaleY = 1;
	        this.attrs.offsetX = 0;
	        this.attrs.offsetY = 0;
	        this.attrs.skewX = 0;
	        this.attrs.skewY = 0;
	        this._clearCache(TRANSFORM);
	        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
	        return trans;
	    };
	    Node.prototype.move = function (change) {
	        var changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
	        if (changeX !== undefined) {
	            x += changeX;
	        }
	        if (changeY !== undefined) {
	            y += changeY;
	        }
	        this.setPosition({ x: x, y: y });
	        return this;
	    };
	    Node.prototype._eachAncestorReverse = function (func, top) {
	        var family = [], parent = this.getParent(), len, n;
	        if (top && top._id === this._id) {
	            func(this);
	            return;
	        }
	        family.unshift(this);
	        while (parent && (!top || parent._id !== top._id)) {
	            family.unshift(parent);
	            parent = parent.parent;
	        }
	        len = family.length;
	        for (n = 0; n < len; n++) {
	            func(family[n]);
	        }
	    };
	    Node.prototype.rotate = function (theta) {
	        this.rotation(this.rotation() + theta);
	        return this;
	    };
	    Node.prototype.moveToTop = function () {
	        if (!this.parent) {
	            Util.Util.warn('Node has no parent. moveToTop function is ignored.');
	            return false;
	        }
	        var index = this.index;
	        this.parent.children.splice(index, 1);
	        this.parent.children.push(this);
	        this.parent._setChildrenIndices();
	        return true;
	    };
	    Node.prototype.moveUp = function () {
	        if (!this.parent) {
	            Util.Util.warn('Node has no parent. moveUp function is ignored.');
	            return false;
	        }
	        var index = this.index, len = this.parent.getChildren().length;
	        if (index < len - 1) {
	            this.parent.children.splice(index, 1);
	            this.parent.children.splice(index + 1, 0, this);
	            this.parent._setChildrenIndices();
	            return true;
	        }
	        return false;
	    };
	    Node.prototype.moveDown = function () {
	        if (!this.parent) {
	            Util.Util.warn('Node has no parent. moveDown function is ignored.');
	            return false;
	        }
	        var index = this.index;
	        if (index > 0) {
	            this.parent.children.splice(index, 1);
	            this.parent.children.splice(index - 1, 0, this);
	            this.parent._setChildrenIndices();
	            return true;
	        }
	        return false;
	    };
	    Node.prototype.moveToBottom = function () {
	        if (!this.parent) {
	            Util.Util.warn('Node has no parent. moveToBottom function is ignored.');
	            return false;
	        }
	        var index = this.index;
	        if (index > 0) {
	            this.parent.children.splice(index, 1);
	            this.parent.children.unshift(this);
	            this.parent._setChildrenIndices();
	            return true;
	        }
	        return false;
	    };
	    Node.prototype.setZIndex = function (zIndex) {
	        if (!this.parent) {
	            Util.Util.warn('Node has no parent. zIndex parameter is ignored.');
	            return this;
	        }
	        if (zIndex < 0 || zIndex >= this.parent.children.length) {
	            Util.Util.warn('Unexpected value ' +
	                zIndex +
	                ' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' +
	                (this.parent.children.length - 1) +
	                '.');
	        }
	        var index = this.index;
	        this.parent.children.splice(index, 1);
	        this.parent.children.splice(zIndex, 0, this);
	        this.parent._setChildrenIndices();
	        return this;
	    };
	    Node.prototype.getAbsoluteOpacity = function () {
	        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
	    };
	    Node.prototype._getAbsoluteOpacity = function () {
	        var absOpacity = this.opacity();
	        var parent = this.getParent();
	        if (parent && !parent._isUnderCache) {
	            absOpacity *= parent.getAbsoluteOpacity();
	        }
	        return absOpacity;
	    };
	    Node.prototype.moveTo = function (newContainer) {
	        if (this.getParent() !== newContainer) {
	            this._remove();
	            newContainer.add(this);
	        }
	        return this;
	    };
	    Node.prototype.toObject = function () {
	        var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
	        obj.attrs = {};
	        for (key in attrs) {
	            val = attrs[key];
	            nonPlainObject =
	                Util.Util.isObject(val) && !Util.Util._isPlainObject(val) && !Util.Util._isArray(val);
	            if (nonPlainObject) {
	                continue;
	            }
	            getter = typeof this[key] === 'function' && this[key];
	            delete attrs[key];
	            defaultValue = getter ? getter.call(this) : null;
	            attrs[key] = val;
	            if (defaultValue !== val) {
	                obj.attrs[key] = val;
	            }
	        }
	        obj.className = this.getClassName();
	        return Util.Util._prepareToStringify(obj);
	    };
	    Node.prototype.toJSON = function () {
	        return JSON.stringify(this.toObject());
	    };
	    Node.prototype.getParent = function () {
	        return this.parent;
	    };
	    Node.prototype.findAncestors = function (selector, includeSelf, stopNode) {
	        var res = [];
	        if (includeSelf && this._isMatch(selector)) {
	            res.push(this);
	        }
	        var ancestor = this.parent;
	        while (ancestor) {
	            if (ancestor === stopNode) {
	                return res;
	            }
	            if (ancestor._isMatch(selector)) {
	                res.push(ancestor);
	            }
	            ancestor = ancestor.parent;
	        }
	        return res;
	    };
	    Node.prototype.isAncestorOf = function (node) {
	        return false;
	    };
	    Node.prototype.findAncestor = function (selector, includeSelf, stopNode) {
	        return this.findAncestors(selector, includeSelf, stopNode)[0];
	    };
	    Node.prototype._isMatch = function (selector) {
	        if (!selector) {
	            return false;
	        }
	        if (typeof selector === 'function') {
	            return selector(this);
	        }
	        var selectorArr = selector.replace(/ /g, '').split(','), len = selectorArr.length, n, sel;
	        for (n = 0; n < len; n++) {
	            sel = selectorArr[n];
	            if (!Util.Util.isValidSelector(sel)) {
	                Util.Util.warn('Selector "' +
	                    sel +
	                    '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
	                Util.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
	                Util.Util.warn('Konva is awesome, right?');
	            }
	            if (sel.charAt(0) === '#') {
	                if (this.id() === sel.slice(1)) {
	                    return true;
	                }
	            }
	            else if (sel.charAt(0) === '.') {
	                if (this.hasName(sel.slice(1))) {
	                    return true;
	                }
	            }
	            else if (this.className === selector || this.nodeType === selector) {
	                return true;
	            }
	        }
	        return false;
	    };
	    Node.prototype.getLayer = function () {
	        var parent = this.getParent();
	        return parent ? parent.getLayer() : null;
	    };
	    Node.prototype.getStage = function () {
	        return this._getCache(STAGE, this._getStage);
	    };
	    Node.prototype._getStage = function () {
	        var parent = this.getParent();
	        if (parent) {
	            return parent.getStage();
	        }
	        else {
	            return undefined;
	        }
	    };
	    Node.prototype.fire = function (eventType, evt, bubble) {
	        evt = evt || {};
	        evt.target = evt.target || this;
	        if (bubble) {
	            this._fireAndBubble(eventType, evt);
	        }
	        else {
	            this._fire(eventType, evt);
	        }
	        return this;
	    };
	    Node.prototype.getAbsoluteTransform = function (top) {
	        if (top) {
	            return this._getAbsoluteTransform(top);
	        }
	        else {
	            return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
	        }
	    };
	    Node.prototype._getAbsoluteTransform = function (top) {
	        var at = new Util.Transform();
	        this._eachAncestorReverse(function (node) {
	            var transformsEnabled = node.getTransformsEnabled();
	            if (transformsEnabled === 'all') {
	                at.multiply(node.getTransform());
	            }
	            else if (transformsEnabled === 'position') {
	                at.translate(node.getX() - node.getOffsetX(), node.getY() - node.getOffsetY());
	            }
	        }, top);
	        return at;
	    };
	    Node.prototype.getAbsoluteScale = function (top) {
	        if (top) {
	            return this._getAbsoluteScale(top);
	        }
	        else {
	            return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
	        }
	    };
	    Node.prototype._getAbsoluteScale = function (top) {
	        var parent = this;
	        while (parent) {
	            if (parent._isUnderCache) {
	                top = parent;
	            }
	            parent = parent.getParent();
	        }
	        var scaleX = 1, scaleY = 1;
	        this._eachAncestorReverse(function (node) {
	            scaleX *= node.scaleX();
	            scaleY *= node.scaleY();
	        }, top);
	        return {
	            x: scaleX,
	            y: scaleY
	        };
	    };
	    Node.prototype.getTransform = function () {
	        return this._getCache(TRANSFORM, this._getTransform);
	    };
	    Node.prototype._getTransform = function () {
	        var m = new Util.Transform(), x = this.x(), y = this.y(), rotation = Global.Konva.getAngle(this.rotation()), scaleX = this.scaleX(), scaleY = this.scaleY(), skewX = this.skewX(), skewY = this.skewY(), offsetX = this.offsetX(), offsetY = this.offsetY();
	        if (x !== 0 || y !== 0) {
	            m.translate(x, y);
	        }
	        if (rotation !== 0) {
	            m.rotate(rotation);
	        }
	        if (skewX !== 0 || skewY !== 0) {
	            m.skew(skewX, skewY);
	        }
	        if (scaleX !== 1 || scaleY !== 1) {
	            m.scale(scaleX, scaleY);
	        }
	        if (offsetX !== 0 || offsetY !== 0) {
	            m.translate(-1 * offsetX, -1 * offsetY);
	        }
	        return m;
	    };
	    Node.prototype.clone = function (obj) {
	        var attrs = Util.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
	        for (var i in CLONE_BLACK_LIST) {
	            var blockAttr = CLONE_BLACK_LIST[i];
	            delete attrs[blockAttr];
	        }
	        for (key in obj) {
	            attrs[key] = obj[key];
	        }
	        var node = new this.constructor(attrs);
	        for (key in this.eventListeners) {
	            allListeners = this.eventListeners[key];
	            len = allListeners.length;
	            for (n = 0; n < len; n++) {
	                listener = allListeners[n];
	                if (listener.name.indexOf(KONVA) < 0) {
	                    if (!node.eventListeners[key]) {
	                        node.eventListeners[key] = [];
	                    }
	                    node.eventListeners[key].push(listener);
	                }
	            }
	        }
	        return node;
	    };
	    Node.prototype._toKonvaCanvas = function (config) {
	        config = config || {};
	        var box = this.getClientRect();
	        var stage = this.getStage(), x = config.x !== undefined ? config.x : box.x, y = config.y !== undefined ? config.y : box.y, pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
	            width: config.width || box.width || (stage ? stage.getWidth() : 0),
	            height: config.height || box.height || (stage ? stage.getHeight() : 0),
	            pixelRatio: pixelRatio
	        }), context = canvas.getContext();
	        context.save();
	        if (x || y) {
	            context.translate(-1 * x, -1 * y);
	        }
	        this.drawScene(canvas);
	        context.restore();
	        return canvas;
	    };
	    Node.prototype.toCanvas = function (config) {
	        return this._toKonvaCanvas(config)._canvas;
	    };
	    Node.prototype.toDataURL = function (config) {
	        config = config || {};
	        var mimeType = config.mimeType || null, quality = config.quality || null;
	        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
	        if (config.callback) {
	            config.callback(url);
	        }
	        return url;
	    };
	    Node.prototype.toImage = function (config) {
	        if (!config || !config.callback) {
	            throw 'callback required for toImage method config argument';
	        }
	        var callback = config.callback;
	        delete config.callback;
	        Util.Util._urlToImage(this.toDataURL(config), function (img) {
	            callback(img);
	        });
	    };
	    Node.prototype.setSize = function (size) {
	        this.width(size.width);
	        this.height(size.height);
	        return this;
	    };
	    Node.prototype.getSize = function () {
	        return {
	            width: this.width(),
	            height: this.height()
	        };
	    };
	    Node.prototype.getClassName = function () {
	        return this.className || this.nodeType;
	    };
	    Node.prototype.getType = function () {
	        return this.nodeType;
	    };
	    Node.prototype.getDragDistance = function () {
	        if (this.attrs.dragDistance !== undefined) {
	            return this.attrs.dragDistance;
	        }
	        else if (this.parent) {
	            return this.parent.getDragDistance();
	        }
	        else {
	            return Global.Konva.dragDistance;
	        }
	    };
	    Node.prototype._off = function (type, name, callback) {
	        var evtListeners = this.eventListeners[type], i, evtName, handler;
	        for (i = 0; i < evtListeners.length; i++) {
	            evtName = evtListeners[i].name;
	            handler = evtListeners[i].handler;
	            if ((evtName !== 'konva' || name === 'konva') &&
	                (!name || evtName === name) &&
	                (!callback || callback === handler)) {
	                evtListeners.splice(i, 1);
	                if (evtListeners.length === 0) {
	                    delete this.eventListeners[type];
	                    break;
	                }
	                i--;
	            }
	        }
	    };
	    Node.prototype._fireChangeEvent = function (attr, oldVal, newVal) {
	        this._fire(attr + CHANGE, {
	            oldVal: oldVal,
	            newVal: newVal
	        });
	    };
	    Node.prototype.setId = function (id) {
	        var oldId = this.id();
	        exports._removeId(oldId, this);
	        _addId(this, id);
	        this._setAttr('id', id);
	        return this;
	    };
	    Node.prototype.setName = function (name) {
	        var oldNames = (this.name() || '').split(/\s/g);
	        var newNames = (name || '').split(/\s/g);
	        var subname, i;
	        for (i = 0; i < oldNames.length; i++) {
	            subname = oldNames[i];
	            if (newNames.indexOf(subname) === -1 && subname) {
	                exports._removeName(subname, this._id);
	            }
	        }
	        for (i = 0; i < newNames.length; i++) {
	            subname = newNames[i];
	            if (oldNames.indexOf(subname) === -1 && subname) {
	                exports._addName(this, subname);
	            }
	        }
	        this._setAttr(NAME, name);
	        return this;
	    };
	    Node.prototype.addName = function (name) {
	        if (!this.hasName(name)) {
	            var oldName = this.name();
	            var newName = oldName ? oldName + ' ' + name : name;
	            this.setName(newName);
	        }
	        return this;
	    };
	    Node.prototype.hasName = function (name) {
	        if (!name) {
	            return false;
	        }
	        var fullName = this.name();
	        if (!fullName) {
	            return false;
	        }
	        var names = (fullName || '').split(/\s/g);
	        return names.indexOf(name) !== -1;
	    };
	    Node.prototype.removeName = function (name) {
	        var names = (this.name() || '').split(/\s/g);
	        var index = names.indexOf(name);
	        if (index !== -1) {
	            names.splice(index, 1);
	            this.setName(names.join(' '));
	        }
	        return this;
	    };
	    Node.prototype.setAttr = function (attr, val) {
	        var func = this[SET + Util.Util._capitalize(attr)];
	        if (Util.Util._isFunction(func)) {
	            func.call(this, val);
	        }
	        else {
	            this._setAttr(attr, val);
	        }
	        return this;
	    };
	    Node.prototype._setAttr = function (key, val) {
	        var oldVal = this.attrs[key];
	        if (oldVal === val && !Util.Util.isObject(val)) {
	            return;
	        }
	        if (val === undefined || val === null) {
	            delete this.attrs[key];
	        }
	        else {
	            this.attrs[key] = val;
	        }
	        this._fireChangeEvent(key, oldVal, val);
	    };
	    Node.prototype._setComponentAttr = function (key, component, val) {
	        var oldVal;
	        if (val !== undefined) {
	            oldVal = this.attrs[key];
	            if (!oldVal) {
	                this.attrs[key] = this.getAttr(key);
	            }
	            this.attrs[key][component] = val;
	            this._fireChangeEvent(key, oldVal, val);
	        }
	    };
	    Node.prototype._fireAndBubble = function (eventType, evt, compareShape) {
	        if (evt && this.nodeType === SHAPE) {
	            evt.target = this;
	        }
	        var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
	            ((compareShape &&
	                (this === compareShape ||
	                    (this.isAncestorOf && this.isAncestorOf(compareShape)))) ||
	                (this.nodeType === 'Stage' && !compareShape));
	        if (!shouldStop) {
	            this._fire(eventType, evt);
	            var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
	                (compareShape &&
	                    compareShape.isAncestorOf &&
	                    compareShape.isAncestorOf(this) &&
	                    !compareShape.isAncestorOf(this.parent));
	            if (((evt && !evt.cancelBubble) || !evt) &&
	                this.parent &&
	                this.parent.isListening() &&
	                !stopBubble) {
	                if (compareShape && compareShape.parent) {
	                    this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
	                }
	                else {
	                    this._fireAndBubble.call(this.parent, eventType, evt);
	                }
	            }
	        }
	    };
	    Node.prototype._fire = function (eventType, evt) {
	        var events = this.eventListeners[eventType], i;
	        if (events) {
	            evt = evt || {};
	            evt.currentTarget = this;
	            evt.type = eventType;
	            for (i = 0; i < events.length; i++) {
	                events[i].handler.call(this, evt);
	            }
	        }
	    };
	    Node.prototype.draw = function () {
	        this.drawScene();
	        this.drawHit();
	        return this;
	    };
	    Node.prototype.startDrag = function () {
	        var stage = this.getStage(), layer = this.getLayer(), pos = stage.getPointerPosition(), ap = this.getAbsolutePosition();
	        if (pos) {
	            if (DragAndDrop.DD.node) {
	                DragAndDrop.DD.node.stopDrag();
	            }
	            DragAndDrop.DD.node = this;
	            DragAndDrop.DD.startPointerPos = pos;
	            DragAndDrop.DD.offset.x = pos.x - ap.x;
	            DragAndDrop.DD.offset.y = pos.y - ap.y;
	            DragAndDrop.DD.anim.setLayers(layer || this['getLayers']());
	            DragAndDrop.DD.anim.start();
	            this._setDragPosition();
	        }
	    };
	    Node.prototype._setDragPosition = function (evt) {
	        var pos = this.getStage().getPointerPosition(), dbf = this.dragBoundFunc();
	        if (!pos) {
	            return;
	        }
	        var newNodePos = {
	            x: pos.x - DragAndDrop.DD.offset.x,
	            y: pos.y - DragAndDrop.DD.offset.y
	        };
	        if (dbf !== undefined) {
	            newNodePos = dbf.call(this, newNodePos, evt);
	        }
	        this.setAbsolutePosition(newNodePos);
	        if (!this._lastPos ||
	            this._lastPos.x !== newNodePos.x ||
	            this._lastPos.y !== newNodePos.y) {
	            DragAndDrop.DD.anim['dirty'] = true;
	        }
	        this._lastPos = newNodePos;
	    };
	    Node.prototype.stopDrag = function () {
	        var evt = {};
	        DragAndDrop.DD._endDragBefore(evt);
	        DragAndDrop.DD._endDragAfter(evt);
	    };
	    Node.prototype.setDraggable = function (draggable) {
	        this._setAttr('draggable', draggable);
	        this._dragChange();
	    };
	    Node.prototype.isDragging = function () {
	        return !!(DragAndDrop.DD.node && DragAndDrop.DD.node === this && DragAndDrop.DD.isDragging);
	    };
	    Node.prototype._listenDrag = function () {
	        this._dragCleanup();
	        this.on('mousedown.konva touchstart.konva', function (evt) {
	            var shouldCheckButton = evt.evt['button'] !== undefined;
	            var canDrag = !shouldCheckButton || Global.Konva.dragButtons.indexOf(evt.evt['button']) >= 0;
	            if (!canDrag) {
	                return;
	            }
	            if (!DragAndDrop.DD.node) {
	                this.startDrag();
	            }
	        });
	    };
	    Node.prototype._dragChange = function () {
	        if (this.attrs.draggable) {
	            this._listenDrag();
	        }
	        else {
	            this._dragCleanup();
	            var stage = this.getStage();
	            var dd = DragAndDrop.DD;
	            if (stage && dd.node && dd.node._id === this._id) {
	                dd.node.stopDrag();
	            }
	        }
	    };
	    Node.prototype._dragCleanup = function () {
	        this.off('mousedown.konva');
	        this.off('touchstart.konva');
	    };
	    Node.create = function (data, container) {
	        if (Util.Util._isString(data)) {
	            data = JSON.parse(data);
	        }
	        return this._createNode(data, container);
	    };
	    Node._createNode = function (obj, container) {
	        var className = Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
	        if (container) {
	            obj.attrs.container = container;
	        }
	        if (!Global._NODES_REGISTRY[className]) {
	            Util.Util.warn('Can not find a node with class name "' +
	                className +
	                '". Fallback to "Shape".');
	            className = 'Shape';
	        }
	        var Class = Global._NODES_REGISTRY[className];
	        no = new Class(obj.attrs);
	        if (children) {
	            len = children.length;
	            for (n = 0; n < len; n++) {
	                no.add(Node._createNode(children[n]));
	            }
	        }
	        return no;
	    };
	    return Node;
	}());
	exports.Node = Node;
	Node.prototype.nodeType = 'Node';
	Node.prototype._attrsAffectingSize = [];
	Factory.Factory.addGetterSetter(Node, 'zIndex');
	Factory.Factory.addGetterSetter(Node, 'absolutePosition');
	Factory.Factory.addGetterSetter(Node, 'position');
	Factory.Factory.addGetterSetter(Node, 'x', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'y', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'globalCompositeOperation', 'source-over', Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Node, 'opacity', 1, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'name', '', Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Node, 'id', '', Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Node, 'rotation', 0, Validators.getNumberValidator());
	Factory.Factory.addComponentsGetterSetter(Node, 'scale', ['x', 'y']);
	Factory.Factory.addGetterSetter(Node, 'scaleX', 1, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'scaleY', 1, Validators.getNumberValidator());
	Factory.Factory.addComponentsGetterSetter(Node, 'skew', ['x', 'y']);
	Factory.Factory.addGetterSetter(Node, 'skewX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'skewY', 0, Validators.getNumberValidator());
	Factory.Factory.addComponentsGetterSetter(Node, 'offset', ['x', 'y']);
	Factory.Factory.addGetterSetter(Node, 'offsetX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'offsetY', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'dragDistance', null, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'width', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'height', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Node, 'listening', 'inherit', function (val) {
	    var isValid = val === true || val === false || val === 'inherit';
	    if (!isValid) {
	        Util.Util.warn(val +
	            ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".');
	    }
	    return val;
	});
	Factory.Factory.addGetterSetter(Node, 'preventDefault', true, Validators.getBooleanValidator());
	Factory.Factory.addGetterSetter(Node, 'filters', null, function (val) {
	    this._filterUpToDate = false;
	    return val;
	});
	Factory.Factory.addGetterSetter(Node, 'visible', 'inherit', function (val) {
	    var isValid = val === true || val === false || val === 'inherit';
	    if (!isValid) {
	        Util.Util.warn(val +
	            ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".');
	    }
	    return val;
	});
	Factory.Factory.addGetterSetter(Node, 'transformsEnabled', 'all', Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Node, 'size');
	Factory.Factory.addGetterSetter(Node, 'dragBoundFunc');
	Factory.Factory.addGetterSetter(Node, 'draggable', false, Validators.getBooleanValidator());
	Factory.Factory.backCompat(Node, {
	    rotateDeg: 'rotate',
	    setRotationDeg: 'setRotation',
	    getRotationDeg: 'getRotation'
	});
	Util.Collection.mapMethods(Node);
	});

	unwrapExports(Node_1);
	var Node_2 = Node_1.ids;
	var Node_3 = Node_1.names;
	var Node_4 = Node_1._removeId;
	var Node_5 = Node_1._addName;
	var Node_6 = Node_1._removeName;
	var Node_7 = Node_1.Node;

	var Container_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Container = (function (_super) {
	    __extends(Container, _super);
	    function Container() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.children = new Util.Collection();
	        return _this;
	    }
	    Container.prototype.getChildren = function (filterFunc) {
	        if (!filterFunc) {
	            return this.children;
	        }
	        var results = new Util.Collection();
	        this.children.each(function (child) {
	            if (filterFunc(child)) {
	                results.push(child);
	            }
	        });
	        return results;
	    };
	    Container.prototype.hasChildren = function () {
	        return this.getChildren().length > 0;
	    };
	    Container.prototype.removeChildren = function () {
	        var child;
	        for (var i = 0; i < this.children.length; i++) {
	            child = this.children[i];
	            child.parent = null;
	            child.index = 0;
	            child.remove();
	        }
	        this.children = new Util.Collection();
	        return this;
	    };
	    Container.prototype.destroyChildren = function () {
	        var child;
	        for (var i = 0; i < this.children.length; i++) {
	            child = this.children[i];
	            child.parent = null;
	            child.index = 0;
	            child.destroy();
	        }
	        this.children = new Util.Collection();
	        return this;
	    };
	    Container.prototype.add = function (child) {
	        if (arguments.length > 1) {
	            for (var i = 0; i < arguments.length; i++) {
	                this.add(arguments[i]);
	            }
	            return this;
	        }
	        if (child.getParent()) {
	            child.moveTo(this);
	            return this;
	        }
	        var children = this.children;
	        this._validateAdd(child);
	        child.index = children.length;
	        child.parent = this;
	        children.push(child);
	        this._fire('add', {
	            child: child
	        });
	        if (child.isDragging()) {
	            DragAndDrop.DD.anim.setLayers(child.getLayer());
	        }
	        return this;
	    };
	    Container.prototype.destroy = function () {
	        if (this.hasChildren()) {
	            this.destroyChildren();
	        }
	        _super.prototype.destroy.call(this);
	        return this;
	    };
	    Container.prototype.find = function (selector) {
	        return this._generalFind(selector, false);
	    };
	    Container.prototype.get = function (selector) {
	        Util.Util.warn('collection.get() method is deprecated. Please use collection.find() instead.');
	        return this.find(selector);
	    };
	    Container.prototype.findOne = function (selector) {
	        var result = this._generalFind(selector, true);
	        return result.length > 0 ? result[0] : undefined;
	    };
	    Container.prototype._generalFind = function (selector, findOne) {
	        var retArr = [];
	        this._descendants(function (node) {
	            var valid = node._isMatch(selector);
	            if (valid) {
	                retArr.push(node);
	            }
	            if (valid && findOne) {
	                return true;
	            }
	            return false;
	        });
	        return Util.Collection.toCollection(retArr);
	    };
	    Container.prototype._descendants = function (fn) {
	        var shouldStop = false;
	        for (var i = 0; i < this.children.length; i++) {
	            var child = this.children[i];
	            shouldStop = fn(child);
	            if (shouldStop) {
	                return true;
	            }
	            if (!child.hasChildren()) {
	                continue;
	            }
	            shouldStop = child._descendants(fn);
	            if (shouldStop) {
	                return true;
	            }
	        }
	        return false;
	    };
	    Container.prototype.toObject = function () {
	        var obj = Node_1.Node.prototype.toObject.call(this);
	        obj.children = [];
	        var children = this.getChildren();
	        var len = children.length;
	        for (var n = 0; n < len; n++) {
	            var child = children[n];
	            obj.children.push(child.toObject());
	        }
	        return obj;
	    };
	    Container.prototype._getDescendants = function (arr) {
	        var retArr = [];
	        var len = arr.length;
	        for (var n = 0; n < len; n++) {
	            var node = arr[n];
	            if (this.isAncestorOf(node)) {
	                retArr.push(node);
	            }
	        }
	        return retArr;
	    };
	    Container.prototype.isAncestorOf = function (node) {
	        var parent = node.getParent();
	        while (parent) {
	            if (parent._id === this._id) {
	                return true;
	            }
	            parent = parent.getParent();
	        }
	        return false;
	    };
	    Container.prototype.clone = function (obj) {
	        var node = Node_1.Node.prototype.clone.call(this, obj);
	        this.getChildren().each(function (no) {
	            node.add(no.clone());
	        });
	        return node;
	    };
	    Container.prototype.getAllIntersections = function (pos) {
	        var arr = [];
	        this.find('Shape').each(function (shape) {
	            if (shape.isVisible() && shape.intersects(pos)) {
	                arr.push(shape);
	            }
	        });
	        return arr;
	    };
	    Container.prototype._setChildrenIndices = function () {
	        this.children.each(function (child, n) {
	            child.index = n;
	        });
	    };
	    Container.prototype.drawScene = function (can, top, caching) {
	        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas()), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
	        if (this.isVisible() || caching) {
	            if (!caching && cachedSceneCanvas) {
	                context.save();
	                layer._applyTransform(this, context, top);
	                this._drawCachedSceneCanvas(context);
	                context.restore();
	            }
	            else {
	                this._drawChildren(canvas, 'drawScene', top, false, caching, caching);
	            }
	        }
	        return this;
	    };
	    Container.prototype.drawHit = function (can, top, caching) {
	        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
	        if (this.shouldDrawHit(canvas) || caching) {
	            if (!caching && cachedHitCanvas) {
	                context.save();
	                layer._applyTransform(this, context, top);
	                this._drawCachedHitCanvas(context);
	                context.restore();
	            }
	            else {
	                this._drawChildren(canvas, 'drawHit', top, false, caching, caching);
	            }
	        }
	        return this;
	    };
	    Container.prototype._drawChildren = function (canvas, drawMethod, top, caching, skipBuffer, skipComposition) {
	        var layer = this.getLayer(), context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = (clipWidth && clipHeight) || clipFunc, clipX, clipY;
	        if (hasClip && layer) {
	            context.save();
	            var transform = this.getAbsoluteTransform(top);
	            var m = transform.getMatrix();
	            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	            context.beginPath();
	            if (clipFunc) {
	                clipFunc.call(this, context, this);
	            }
	            else {
	                clipX = this.clipX();
	                clipY = this.clipY();
	                context.rect(clipX, clipY, clipWidth, clipHeight);
	            }
	            context.clip();
	            m = transform
	                .copy()
	                .invert()
	                .getMatrix();
	            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	        }
	        var hasComposition = this.globalCompositeOperation() !== 'source-over' && !skipComposition;
	        if (hasComposition && layer) {
	            context.save();
	            context._applyGlobalCompositeOperation(this);
	        }
	        this.children.each(function (child) {
	            child[drawMethod](canvas, top, caching, skipBuffer);
	        });
	        if (hasComposition && layer) {
	            context.restore();
	        }
	        if (hasClip && layer) {
	            context.restore();
	        }
	    };
	    Container.prototype.shouldDrawHit = function (canvas) {
	        var layer = this.getLayer();
	        var layerUnderDrag = DragAndDrop.DD.isDragging && DragAndDrop.DD.anim.getLayers().indexOf(layer) !== -1;
	        return ((canvas && canvas.isCache) ||
	            (layer && layer.hitGraphEnabled() && this.isVisible() && !layerUnderDrag));
	    };
	    Container.prototype.getClientRect = function (attrs) {
	        attrs = attrs || {};
	        var skipTransform = attrs.skipTransform;
	        var relativeTo = attrs.relativeTo;
	        var minX, minY, maxX, maxY;
	        var selfRect = {
	            x: Infinity,
	            y: Infinity,
	            width: 0,
	            height: 0
	        };
	        var that = this;
	        this.children.each(function (child) {
	            if (!child.visible()) {
	                return;
	            }
	            var rect = child.getClientRect({
	                relativeTo: that,
	                skipShadow: attrs.skipShadow,
	                skipStroke: attrs.skipStroke
	            });
	            if (rect.width === 0 && rect.height === 0) {
	                return;
	            }
	            if (minX === undefined) {
	                minX = rect.x;
	                minY = rect.y;
	                maxX = rect.x + rect.width;
	                maxY = rect.y + rect.height;
	            }
	            else {
	                minX = Math.min(minX, rect.x);
	                minY = Math.min(minY, rect.y);
	                maxX = Math.max(maxX, rect.x + rect.width);
	                maxY = Math.max(maxY, rect.y + rect.height);
	            }
	        });
	        var shapes = this.find('Shape');
	        var hasVisible = false;
	        for (var i = 0; i < shapes.length; i++) {
	            var shape = shapes[i];
	            if (shape._isVisible(this)) {
	                hasVisible = true;
	                break;
	            }
	        }
	        if (hasVisible) {
	            selfRect = {
	                x: minX,
	                y: minY,
	                width: maxX - minX,
	                height: maxY - minY
	            };
	        }
	        else {
	            selfRect = {
	                x: 0,
	                y: 0,
	                width: 0,
	                height: 0
	            };
	        }
	        if (!skipTransform) {
	            return this._transformedRect(selfRect, relativeTo);
	        }
	        return selfRect;
	    };
	    return Container;
	}(Node_1.Node));
	exports.Container = Container;
	Factory.Factory.addComponentsGetterSetter(Container, 'clip', [
	    'x',
	    'y',
	    'width',
	    'height'
	]);
	Factory.Factory.addGetterSetter(Container, 'clipX', undefined, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Container, 'clipY', undefined, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Container, 'clipWidth', undefined, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Container, 'clipHeight', undefined, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Container, 'clipFunc');
	Util.Collection.mapMethods(Container);
	});

	unwrapExports(Container_1);
	var Container_2 = Container_1.Container;

	var PointerEvents = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Captures = new Map();
	function getCapturedShape(pointerId) {
	    return Captures.get(pointerId);
	}
	exports.getCapturedShape = getCapturedShape;
	function createEvent(evt) {
	    return {
	        evt: evt,
	        pointerId: evt.pointerId
	    };
	}
	exports.createEvent = createEvent;
	function hasPointerCapture(pointerId, shape) {
	    return Captures.get(pointerId) === shape;
	}
	exports.hasPointerCapture = hasPointerCapture;
	function setPointerCapture(pointerId, shape) {
	    releaseCapture(pointerId);
	    var stage = shape.getStage();
	    if (!stage)
	        return;
	    Captures.set(pointerId, shape);
	    shape._fire('gotpointercapture', createEvent(new PointerEvent('gotpointercapture')));
	}
	exports.setPointerCapture = setPointerCapture;
	function releaseCapture(pointerId, target) {
	    var shape = Captures.get(pointerId);
	    if (!shape)
	        return;
	    var stage = shape.getStage();
	    if (stage && stage.content) {
	        stage.content.releasePointerCapture(pointerId);
	    }
	    Captures.delete(pointerId);
	    shape._fire('lostpointercapture', createEvent(new PointerEvent('lostpointercapture')));
	}
	exports.releaseCapture = releaseCapture;
	});

	unwrapExports(PointerEvents);
	var PointerEvents_1 = PointerEvents.getCapturedShape;
	var PointerEvents_2 = PointerEvents.createEvent;
	var PointerEvents_3 = PointerEvents.hasPointerCapture;
	var PointerEvents_4 = PointerEvents.setPointerCapture;
	var PointerEvents_5 = PointerEvents.releaseCapture;

	var Stage_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });






	var Global_2 = Global;

	var STAGE = 'Stage', STRING = 'string', PX = 'px', MOUSEOUT = 'mouseout', MOUSELEAVE = 'mouseleave', MOUSEOVER = 'mouseover', MOUSEENTER = 'mouseenter', MOUSEMOVE = 'mousemove', MOUSEDOWN = 'mousedown', MOUSEUP = 'mouseup', POINTERMOVE = 'pointermove', POINTERDOWN = 'pointerdown', POINTERUP = 'pointerup', POINTERCANCEL = 'pointercancel', LOSTPOINTERCAPTURE = 'lostpointercapture', CONTEXTMENU = 'contextmenu', CLICK = 'click', DBL_CLICK = 'dblclick', TOUCHSTART = 'touchstart', TOUCHEND = 'touchend', TAP = 'tap', DBL_TAP = 'dbltap', TOUCHMOVE = 'touchmove', WHEEL = 'wheel', CONTENT_MOUSEOUT = 'contentMouseout', CONTENT_MOUSEOVER = 'contentMouseover', CONTENT_MOUSEMOVE = 'contentMousemove', CONTENT_MOUSEDOWN = 'contentMousedown', CONTENT_MOUSEUP = 'contentMouseup', CONTENT_CONTEXTMENU = 'contentContextmenu', CONTENT_CLICK = 'contentClick', CONTENT_DBL_CLICK = 'contentDblclick', CONTENT_TOUCHSTART = 'contentTouchstart', CONTENT_TOUCHEND = 'contentTouchend', CONTENT_DBL_TAP = 'contentDbltap', CONTENT_TAP = 'contentTap', CONTENT_TOUCHMOVE = 'contentTouchmove', CONTENT_WHEEL = 'contentWheel', RELATIVE = 'relative', KONVA_CONTENT = 'konvajs-content', UNDERSCORE = '_', CONTAINER = 'container', MAX_LAYERS_NUMBER = 5, EMPTY_STRING = '', EVENTS = [
	    MOUSEENTER,
	    MOUSEDOWN,
	    MOUSEMOVE,
	    MOUSEUP,
	    MOUSEOUT,
	    TOUCHSTART,
	    TOUCHMOVE,
	    TOUCHEND,
	    MOUSEOVER,
	    WHEEL,
	    CONTEXTMENU,
	    POINTERDOWN,
	    POINTERMOVE,
	    POINTERUP,
	    POINTERCANCEL,
	    LOSTPOINTERCAPTURE
	], eventsLength = EVENTS.length;
	function addEvent(ctx, eventName) {
	    ctx.content.addEventListener(eventName, function (evt) {
	        ctx[UNDERSCORE + eventName](evt);
	    }, false);
	}
	var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
	exports.stages = [];
	function checkNoClip(attrs) {
	    if (attrs === void 0) { attrs = {}; }
	    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
	        Util.Util.warn('Stage does not support clipping. Please use clip for Layers or Groups.');
	    }
	    return attrs;
	}
	var Stage = (function (_super) {
	    __extends(Stage, _super);
	    function Stage(config) {
	        var _this = _super.call(this, checkNoClip(config)) || this;
	        _this._buildDOM();
	        _this._bindContentEvents();
	        exports.stages.push(_this);
	        _this.on('widthChange.konva heightChange.konva', _this._resizeDOM);
	        _this.on('visibleChange.konva', _this._checkVisibility);
	        _this.on('clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva', function () {
	            checkNoClip(_this.attrs);
	        });
	        _this._checkVisibility();
	        return _this;
	    }
	    Stage.prototype._validateAdd = function (child) {
	        var isLayer = child.getType() === 'Layer';
	        var isFastLayer = child.getType() === 'FastLayer';
	        var valid = isLayer || isFastLayer;
	        if (!valid) {
	            Util.Util.throw('You may only add layers to the stage.');
	        }
	    };
	    Stage.prototype._checkVisibility = function () {
	        var style = this.visible() ? '' : 'none';
	        this.content.style.display = style;
	    };
	    Stage.prototype.setContainer = function (container) {
	        if (typeof container === STRING) {
	            if (container.charAt(0) === '.') {
	                var className = container.slice(1);
	                container = document.getElementsByClassName(className)[0];
	            }
	            else {
	                var id;
	                if (container.charAt(0) !== '#') {
	                    id = container;
	                }
	                else {
	                    id = container.slice(1);
	                }
	                container = document.getElementById(id);
	            }
	            if (!container) {
	                throw 'Can not find container in document with id ' + id;
	            }
	        }
	        this._setAttr(CONTAINER, container);
	        if (this.content) {
	            if (this.content.parentElement) {
	                this.content.parentElement.removeChild(this.content);
	            }
	            container.appendChild(this.content);
	        }
	        return this;
	    };
	    Stage.prototype.shouldDrawHit = function () {
	        return true;
	    };
	    Stage.prototype.clear = function () {
	        var layers = this.children, len = layers.length, n;
	        for (n = 0; n < len; n++) {
	            layers[n].clear();
	        }
	        return this;
	    };
	    Stage.prototype.clone = function (obj) {
	        if (!obj) {
	            obj = {};
	        }
	        obj.container = document.createElement('div');
	        return Container_1.Container.prototype.clone.call(this, obj);
	    };
	    Stage.prototype.destroy = function () {
	        _super.prototype.destroy.call(this);
	        var content = this.content;
	        if (content && Util.Util._isInDocument(content)) {
	            this.container().removeChild(content);
	        }
	        var index = exports.stages.indexOf(this);
	        if (index > -1) {
	            exports.stages.splice(index, 1);
	        }
	        return this;
	    };
	    Stage.prototype.getPointerPosition = function () {
	        if (!this.pointerPos) {
	            Util.Util.warn(NO_POINTERS_MESSAGE);
	        }
	        return this.pointerPos;
	    };
	    Stage.prototype.getStage = function () {
	        return this;
	    };
	    Stage.prototype.getContent = function () {
	        return this.content;
	    };
	    Stage.prototype._toKonvaCanvas = function (config) {
	        config = config || {};
	        var x = config.x || 0, y = config.y || 0, canvas = new Canvas_1.SceneCanvas({
	            width: config.width || this.width(),
	            height: config.height || this.height(),
	            pixelRatio: config.pixelRatio || 1
	        }), _context = canvas.getContext()._context, layers = this.children;
	        if (x || y) {
	            _context.translate(-1 * x, -1 * y);
	        }
	        layers.each(function (layer) {
	            if (!layer.isVisible()) {
	                return;
	            }
	            var layerCanvas = layer._toKonvaCanvas(config);
	            _context.drawImage(layerCanvas._canvas, x, y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
	        });
	        return canvas;
	    };
	    Stage.prototype.getIntersection = function (pos, selector) {
	        var layers = this.children, len = layers.length, end = len - 1, n, shape;
	        for (n = end; n >= 0; n--) {
	            shape = layers[n].getIntersection(pos, selector);
	            if (shape) {
	                return shape;
	            }
	        }
	        return null;
	    };
	    Stage.prototype._resizeDOM = function () {
	        if (this.content) {
	            var width = this.width(), height = this.height(), layers = this.getChildren(), len = layers.length, n, layer;
	            this.content.style.width = width + PX;
	            this.content.style.height = height + PX;
	            this.bufferCanvas.setSize(width, height);
	            this.bufferHitCanvas.setSize(width, height);
	            for (n = 0; n < len; n++) {
	                layer = layers[n];
	                layer.setSize({ width: width, height: height });
	                layer.draw();
	            }
	        }
	    };
	    Stage.prototype.add = function (layer) {
	        if (arguments.length > 1) {
	            for (var i = 0; i < arguments.length; i++) {
	                this.add(arguments[i]);
	            }
	            return this;
	        }
	        _super.prototype.add.call(this, layer);
	        var length = this.children.length;
	        if (length > MAX_LAYERS_NUMBER) {
	            Util.Util.warn('The stage has ' +
	                length +
	                ' layers. Recommended maximin number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.');
	        }
	        layer._setCanvasSize(this.width(), this.height());
	        layer.draw();
	        if (Global.Konva.isBrowser) {
	            this.content.appendChild(layer.canvas._canvas);
	        }
	        return this;
	    };
	    Stage.prototype.getParent = function () {
	        return null;
	    };
	    Stage.prototype.getLayer = function () {
	        return null;
	    };
	    Stage.prototype.hasPointerCapture = function (pointerId) {
	        return PointerEvents.hasPointerCapture(pointerId, this);
	    };
	    Stage.prototype.setPointerCapture = function (pointerId) {
	        PointerEvents.setPointerCapture(pointerId, this);
	    };
	    Stage.prototype.releaseCapture = function (pointerId) {
	        PointerEvents.releaseCapture(pointerId, this);
	    };
	    Stage.prototype.getLayers = function () {
	        return this.getChildren();
	    };
	    Stage.prototype._bindContentEvents = function () {
	        if (!Global.Konva.isBrowser) {
	            return;
	        }
	        for (var n = 0; n < eventsLength; n++) {
	            addEvent(this, EVENTS[n]);
	        }
	    };
	    Stage.prototype._mouseenter = function (evt) {
	        this.setPointersPositions(evt);
	        this._fire(MOUSEENTER, { evt: evt, target: this, currentTarget: this });
	    };
	    Stage.prototype._mouseover = function (evt) {
	        this.setPointersPositions(evt);
	        this._fire(CONTENT_MOUSEOVER, { evt: evt });
	        this._fire(MOUSEOVER, { evt: evt, target: this, currentTarget: this });
	    };
	    Stage.prototype._mouseout = function (evt) {
	        this.setPointersPositions(evt);
	        var targetShape = this.targetShape;
	        if (targetShape && !DragAndDrop.DD.isDragging) {
	            targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
	            targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
	            this.targetShape = null;
	        }
	        else if (!DragAndDrop.DD.isDragging) {
	            this._fire(MOUSELEAVE, {
	                evt: evt,
	                target: this,
	                currentTarget: this
	            });
	            this._fire(MOUSEOUT, {
	                evt: evt,
	                target: this,
	                currentTarget: this
	            });
	        }
	        this.pointerPos = undefined;
	        this._fire(CONTENT_MOUSEOUT, { evt: evt });
	    };
	    Stage.prototype._mousemove = function (evt) {
	        if (Global.Konva.UA.ieMobile) {
	            return this._touchmove(evt);
	        }
	        this.setPointersPositions(evt);
	        var shape;
	        if (!DragAndDrop.DD.isDragging) {
	            shape = this.getIntersection(this.getPointerPosition());
	            if (shape && shape.isListening()) {
	                var differentTarget = !this.targetShape || this.targetShape !== shape;
	                if (!DragAndDrop.DD.isDragging && differentTarget) {
	                    if (this.targetShape) {
	                        this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt }, shape);
	                        this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt }, shape);
	                    }
	                    shape._fireAndBubble(MOUSEOVER, { evt: evt }, this.targetShape);
	                    shape._fireAndBubble(MOUSEENTER, { evt: evt }, this.targetShape);
	                    this.targetShape = shape;
	                }
	                else {
	                    shape._fireAndBubble(MOUSEMOVE, { evt: evt });
	                }
	            }
	            else {
	                if (this.targetShape && !DragAndDrop.DD.isDragging) {
	                    this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
	                    this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
	                    this._fire(MOUSEOVER, {
	                        evt: evt,
	                        target: this,
	                        currentTarget: this
	                    });
	                    this.targetShape = null;
	                }
	                this._fire(MOUSEMOVE, {
	                    evt: evt,
	                    target: this,
	                    currentTarget: this
	                });
	            }
	            this._fire(CONTENT_MOUSEMOVE, { evt: evt });
	        }
	        if (evt.cancelable) {
	            evt.preventDefault();
	        }
	    };
	    Stage.prototype._mousedown = function (evt) {
	        if (Global.Konva.UA.ieMobile) {
	            return this._touchstart(evt);
	        }
	        this.setPointersPositions(evt);
	        var shape = this.getIntersection(this.getPointerPosition());
	        Global.Konva.listenClickTap = true;
	        if (shape && shape.isListening()) {
	            this.clickStartShape = shape;
	            shape._fireAndBubble(MOUSEDOWN, { evt: evt });
	        }
	        else {
	            this._fire(MOUSEDOWN, {
	                evt: evt,
	                target: this,
	                currentTarget: this
	            });
	        }
	        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
	    };
	    Stage.prototype._mouseup = function (evt) {
	        if (Global.Konva.UA.ieMobile) {
	            return this._touchend(evt);
	        }
	        this.setPointersPositions(evt);
	        var shape = this.getIntersection(this.getPointerPosition()), clickStartShape = this.clickStartShape, clickEndShape = this.clickEndShape, fireDblClick = false;
	        if (Global.Konva.inDblClickWindow) {
	            fireDblClick = true;
	            clearTimeout(this.dblTimeout);
	        }
	        else if (!DragAndDrop.DD.justDragged) {
	            Global.Konva.inDblClickWindow = true;
	            clearTimeout(this.dblTimeout);
	        }
	        else if (DragAndDrop.DD) {
	            DragAndDrop.DD.justDragged = false;
	        }
	        this.dblTimeout = setTimeout(function () {
	            Global.Konva.inDblClickWindow = false;
	        }, Global.Konva.dblClickWindow);
	        if (shape && shape.isListening()) {
	            this.clickEndShape = shape;
	            shape._fireAndBubble(MOUSEUP, { evt: evt });
	            if (Global.Konva.listenClickTap &&
	                clickStartShape &&
	                clickStartShape._id === shape._id) {
	                shape._fireAndBubble(CLICK, { evt: evt });
	                if (fireDblClick && clickEndShape && clickEndShape === shape) {
	                    shape._fireAndBubble(DBL_CLICK, { evt: evt });
	                }
	            }
	        }
	        else {
	            this._fire(MOUSEUP, { evt: evt, target: this, currentTarget: this });
	            if (Global.Konva.listenClickTap) {
	                this._fire(CLICK, { evt: evt, target: this, currentTarget: this });
	            }
	            if (fireDblClick) {
	                this._fire(DBL_CLICK, {
	                    evt: evt,
	                    target: this,
	                    currentTarget: this
	                });
	            }
	        }
	        this._fire(CONTENT_MOUSEUP, { evt: evt });
	        if (Global.Konva.listenClickTap) {
	            this._fire(CONTENT_CLICK, { evt: evt });
	            if (fireDblClick) {
	                this._fire(CONTENT_DBL_CLICK, { evt: evt });
	            }
	        }
	        Global.Konva.listenClickTap = false;
	        if (evt.cancelable) {
	            evt.preventDefault();
	        }
	    };
	    Stage.prototype._contextmenu = function (evt) {
	        this.setPointersPositions(evt);
	        var shape = this.getIntersection(this.getPointerPosition());
	        if (shape && shape.isListening()) {
	            shape._fireAndBubble(CONTEXTMENU, { evt: evt });
	        }
	        else {
	            this._fire(CONTEXTMENU, {
	                evt: evt,
	                target: this,
	                currentTarget: this
	            });
	        }
	        this._fire(CONTENT_CONTEXTMENU, { evt: evt });
	    };
	    Stage.prototype._touchstart = function (evt) {
	        this.setPointersPositions(evt);
	        var shape = this.getIntersection(this.getPointerPosition());
	        Global.Konva.listenClickTap = true;
	        if (shape && shape.isListening()) {
	            this.tapStartShape = shape;
	            shape._fireAndBubble(TOUCHSTART, { evt: evt });
	            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
	                evt.preventDefault();
	            }
	        }
	        else {
	            this._fire(TOUCHSTART, {
	                evt: evt,
	                target: this,
	                currentTarget: this
	            });
	        }
	        this._fire(CONTENT_TOUCHSTART, { evt: evt });
	    };
	    Stage.prototype._touchend = function (evt) {
	        this.setPointersPositions(evt);
	        var shape = this.getIntersection(this.getPointerPosition()), clickEndShape = this.clickEndShape, fireDblClick = false;
	        if (Global.Konva.inDblClickWindow) {
	            fireDblClick = true;
	            clearTimeout(this.dblTimeout);
	        }
	        else {
	            Global.Konva.inDblClickWindow = true;
	            clearTimeout(this.dblTimeout);
	        }
	        this.dblTimeout = setTimeout(function () {
	            Global.Konva.inDblClickWindow = false;
	        }, Global.Konva.dblClickWindow);
	        if (shape && shape.isListening()) {
	            this.clickEndShape = shape;
	            shape._fireAndBubble(TOUCHEND, { evt: evt });
	            if (Global.Konva.listenClickTap &&
	                this.tapStartShape &&
	                shape._id === this.tapStartShape._id) {
	                shape._fireAndBubble(TAP, { evt: evt });
	                if (fireDblClick && clickEndShape && clickEndShape === shape) {
	                    shape._fireAndBubble(DBL_TAP, { evt: evt });
	                }
	            }
	            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
	                evt.preventDefault();
	            }
	        }
	        else {
	            this._fire(TOUCHEND, { evt: evt, target: this, currentTarget: this });
	            if (Global.Konva.listenClickTap) {
	                this._fire(TAP, { evt: evt, target: this, currentTarget: this });
	            }
	            if (fireDblClick) {
	                this._fire(DBL_TAP, {
	                    evt: evt,
	                    target: this,
	                    currentTarget: this
	                });
	            }
	        }
	        this._fire(CONTENT_TOUCHEND, { evt: evt });
	        if (Global.Konva.listenClickTap) {
	            this._fire(CONTENT_TAP, { evt: evt });
	            if (fireDblClick) {
	                this._fire(CONTENT_DBL_TAP, { evt: evt });
	            }
	        }
	        Global.Konva.listenClickTap = false;
	    };
	    Stage.prototype._touchmove = function (evt) {
	        this.setPointersPositions(evt);
	        var shape;
	        if (!DragAndDrop.DD.isDragging) {
	            shape = this.getIntersection(this.getPointerPosition());
	            if (shape && shape.isListening()) {
	                shape._fireAndBubble(TOUCHMOVE, { evt: evt });
	                if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
	                    evt.preventDefault();
	                }
	            }
	            else {
	                this._fire(TOUCHMOVE, {
	                    evt: evt,
	                    target: this,
	                    currentTarget: this
	                });
	            }
	            this._fire(CONTENT_TOUCHMOVE, { evt: evt });
	        }
	        if (DragAndDrop.DD.isDragging && DragAndDrop.DD.node.preventDefault() && evt.cancelable) {
	            evt.preventDefault();
	        }
	    };
	    Stage.prototype._wheel = function (evt) {
	        this.setPointersPositions(evt);
	        var shape = this.getIntersection(this.getPointerPosition());
	        if (shape && shape.isListening()) {
	            shape._fireAndBubble(WHEEL, { evt: evt });
	        }
	        else {
	            this._fire(WHEEL, {
	                evt: evt,
	                target: this,
	                currentTarget: this
	            });
	        }
	        this._fire(CONTENT_WHEEL, { evt: evt });
	    };
	    Stage.prototype._pointerdown = function (evt) {
	        if (!Global.Konva._pointerEventsEnabled) {
	            return;
	        }
	        this.setPointersPositions(evt);
	        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
	            this.getIntersection(this.getPointerPosition());
	        if (shape) {
	            shape._fireAndBubble(POINTERDOWN, PointerEvents.createEvent(evt));
	        }
	    };
	    Stage.prototype._pointermove = function (evt) {
	        if (!Global.Konva._pointerEventsEnabled) {
	            return;
	        }
	        this.setPointersPositions(evt);
	        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
	            this.getIntersection(this.getPointerPosition());
	        if (shape) {
	            shape._fireAndBubble(POINTERMOVE, PointerEvents.createEvent(evt));
	        }
	    };
	    Stage.prototype._pointerup = function (evt) {
	        if (!Global.Konva._pointerEventsEnabled) {
	            return;
	        }
	        this.setPointersPositions(evt);
	        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
	            this.getIntersection(this.getPointerPosition());
	        if (shape) {
	            shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
	        }
	        PointerEvents.releaseCapture(evt.pointerId);
	    };
	    Stage.prototype._pointercancel = function (evt) {
	        if (!Global.Konva._pointerEventsEnabled) {
	            return;
	        }
	        this.setPointersPositions(evt);
	        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
	            this.getIntersection(this.getPointerPosition());
	        if (shape) {
	            shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
	        }
	        PointerEvents.releaseCapture(evt.pointerId);
	    };
	    Stage.prototype._lostpointercapture = function (evt) {
	        PointerEvents.releaseCapture(evt.pointerId);
	    };
	    Stage.prototype.setPointersPositions = function (evt) {
	        var contentPosition = this._getContentPosition(), x = null, y = null;
	        evt = evt ? evt : window.event;
	        if (evt.touches !== undefined) {
	            if (evt.touches.length > 0) {
	                var touch = evt.touches[0];
	                x = touch.clientX - contentPosition.left;
	                y = touch.clientY - contentPosition.top;
	            }
	        }
	        else {
	            x = evt.clientX - contentPosition.left;
	            y = evt.clientY - contentPosition.top;
	        }
	        if (x !== null && y !== null) {
	            this.pointerPos = {
	                x: x,
	                y: y
	            };
	        }
	    };
	    Stage.prototype._setPointerPosition = function (evt) {
	        Util.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
	        this.setPointersPositions(evt);
	    };
	    Stage.prototype._getContentPosition = function () {
	        var rect = this.content.getBoundingClientRect
	            ? this.content.getBoundingClientRect()
	            : { top: 0, left: 0 };
	        return {
	            top: rect.top,
	            left: rect.left
	        };
	    };
	    Stage.prototype._buildDOM = function () {
	        this.bufferCanvas = new Canvas_1.SceneCanvas();
	        this.bufferHitCanvas = new Canvas_1.HitCanvas({ pixelRatio: 1 });
	        if (!Global.Konva.isBrowser) {
	            return;
	        }
	        var container = this.container();
	        if (!container) {
	            throw 'Stage has no container. A container is required.';
	        }
	        container.innerHTML = EMPTY_STRING;
	        this.content = document.createElement('div');
	        this.content.style.position = RELATIVE;
	        this.content.style.userSelect = 'none';
	        this.content.className = KONVA_CONTENT;
	        this.content.setAttribute('role', 'presentation');
	        container.appendChild(this.content);
	        this._resizeDOM();
	    };
	    Stage.prototype.cache = function () {
	        Util.Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
	        return this;
	    };
	    Stage.prototype.clearCache = function () {
	        return this;
	    };
	    Stage.prototype.batchDraw = function () {
	        this.children.each(function (layer) {
	            layer.batchDraw();
	        });
	        return this;
	    };
	    return Stage;
	}(Container_1.Container));
	exports.Stage = Stage;
	Stage.prototype.nodeType = STAGE;
	Global_2._registerNode(Stage);
	Factory.Factory.addGetterSetter(Stage, 'container');
	});

	unwrapExports(Stage_1);
	var Stage_2 = Stage_1.stages;
	var Stage_3 = Stage_1.Stage;

	var BaseLayer_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var BaseLayer = (function (_super) {
	    __extends(BaseLayer, _super);
	    function BaseLayer(config) {
	        var _this = _super.call(this, config) || this;
	        _this.canvas = new Canvas_1.SceneCanvas();
	        _this._waitingForDraw = false;
	        _this.on('visibleChange', _this._checkVisibility);
	        _this._checkVisibility();
	        _this.on('imageSmoothingEnabledChange', _this._checkSmooth);
	        _this._checkSmooth();
	        return _this;
	    }
	    BaseLayer.prototype.createPNGStream = function () {
	        var c = this.canvas._canvas;
	        return c.createPNGStream();
	    };
	    BaseLayer.prototype.getCanvas = function () {
	        return this.canvas;
	    };
	    BaseLayer.prototype.getHitCanvas = function () {
	        return this.hitCanvas;
	    };
	    BaseLayer.prototype.getContext = function () {
	        return this.getCanvas().getContext();
	    };
	    BaseLayer.prototype.clear = function (bounds) {
	        this.getContext().clear(bounds);
	        return this;
	    };
	    BaseLayer.prototype.setZIndex = function (index) {
	        _super.prototype.setZIndex.call(this, index);
	        var stage = this.getStage();
	        if (stage) {
	            stage.content.removeChild(this.getCanvas()._canvas);
	            if (index < stage.getChildren().length - 1) {
	                stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[index + 1].getCanvas()._canvas);
	            }
	            else {
	                stage.content.appendChild(this.getCanvas()._canvas);
	            }
	        }
	        return this;
	    };
	    BaseLayer.prototype.moveToTop = function () {
	        Node_1.Node.prototype.moveToTop.call(this);
	        var stage = this.getStage();
	        if (stage) {
	            stage.content.removeChild(this.getCanvas()._canvas);
	            stage.content.appendChild(this.getCanvas()._canvas);
	        }
	        return true;
	    };
	    BaseLayer.prototype.moveUp = function () {
	        var moved = Node_1.Node.prototype.moveUp.call(this);
	        if (!moved) {
	            return false;
	        }
	        var stage = this.getStage();
	        if (!stage) {
	            return false;
	        }
	        stage.content.removeChild(this.getCanvas()._canvas);
	        if (this.index < stage.getChildren().length - 1) {
	            stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[this.index + 1].getCanvas()._canvas);
	        }
	        else {
	            stage.content.appendChild(this.getCanvas()._canvas);
	        }
	        return true;
	    };
	    BaseLayer.prototype.moveDown = function () {
	        if (Node_1.Node.prototype.moveDown.call(this)) {
	            var stage = this.getStage();
	            if (stage) {
	                var children = stage.getChildren();
	                stage.content.removeChild(this.getCanvas()._canvas);
	                stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
	            }
	            return true;
	        }
	        return false;
	    };
	    BaseLayer.prototype.moveToBottom = function () {
	        if (Node_1.Node.prototype.moveToBottom.call(this)) {
	            var stage = this.getStage();
	            if (stage) {
	                var children = stage.getChildren();
	                stage.content.removeChild(this.getCanvas()._canvas);
	                stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
	            }
	            return true;
	        }
	        return false;
	    };
	    BaseLayer.prototype.getLayer = function () {
	        return this;
	    };
	    BaseLayer.prototype.remove = function () {
	        var _canvas = this.getCanvas()._canvas;
	        Node_1.Node.prototype.remove.call(this);
	        if (_canvas && _canvas.parentNode && Util.Util._isInDocument(_canvas)) {
	            _canvas.parentNode.removeChild(_canvas);
	        }
	        return this;
	    };
	    BaseLayer.prototype.getStage = function () {
	        return this.parent;
	    };
	    BaseLayer.prototype.setSize = function (_a) {
	        var width = _a.width, height = _a.height;
	        this.canvas.setSize(width, height);
	        return this;
	    };
	    BaseLayer.prototype._toKonvaCanvas = function (config) {
	        config = config || {};
	        config.width = config.width || this.getWidth();
	        config.height = config.height || this.getHeight();
	        config.x = config.x !== undefined ? config.x : this.x();
	        config.y = config.y !== undefined ? config.y : this.y();
	        return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
	    };
	    BaseLayer.prototype._checkVisibility = function () {
	        var visible = this.visible();
	        if (visible) {
	            this.canvas._canvas.style.display = 'block';
	        }
	        else {
	            this.canvas._canvas.style.display = 'none';
	        }
	    };
	    BaseLayer.prototype._checkSmooth = function () {
	        this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
	    };
	    BaseLayer.prototype.getWidth = function () {
	        if (this.parent) {
	            return this.parent.width();
	        }
	    };
	    BaseLayer.prototype.setWidth = function () {
	        Util.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
	    };
	    BaseLayer.prototype.getHeight = function () {
	        if (this.parent) {
	            return this.parent.height();
	        }
	    };
	    BaseLayer.prototype.setHeight = function () {
	        Util.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
	    };
	    BaseLayer.prototype.getIntersection = function (pos, selector) {
	        return null;
	    };
	    BaseLayer.prototype.batchDraw = function () {
	        var _this = this;
	        if (!this._waitingForDraw) {
	            this._waitingForDraw = true;
	            Util.Util.requestAnimFrame(function () {
	                _this.draw();
	                _this._waitingForDraw = false;
	            });
	        }
	        return this;
	    };
	    BaseLayer.prototype._applyTransform = function (shape, context, top) {
	        var m = shape.getAbsoluteTransform(top).getMatrix();
	        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	    };
	    return BaseLayer;
	}(Container_1.Container));
	exports.BaseLayer = BaseLayer;
	BaseLayer.prototype.nodeType = 'BaseLayer';
	Factory.Factory.addGetterSetter(BaseLayer, 'imageSmoothingEnabled', true);
	Factory.Factory.addGetterSetter(BaseLayer, 'clearBeforeDraw', true);
	Util.Collection.mapMethods(BaseLayer);
	});

	unwrapExports(BaseLayer_1);
	var BaseLayer_2 = BaseLayer_1.BaseLayer;

	var Shape_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });






	var HAS_SHADOW = 'hasShadow';
	var SHADOW_RGBA = 'shadowRGBA';
	var patternImage = 'patternImage';
	var linearGradient = 'linearGradient';
	var radialGradient = 'radialGradient';
	var dummyContext;
	function getDummyContext() {
	    if (dummyContext) {
	        return dummyContext;
	    }
	    dummyContext = Util.Util.createCanvasElement().getContext('2d');
	    return dummyContext;
	}
	exports.shapes = {};
	function _fillFunc(context) {
	    context.fill();
	}
	function _strokeFunc(context) {
	    context.stroke();
	}
	function _fillFuncHit(context) {
	    context.fill();
	}
	function _strokeFuncHit(context) {
	    context.stroke();
	}
	function _clearHasShadowCache() {
	    this._clearCache(HAS_SHADOW);
	}
	function _clearGetShadowRGBACache() {
	    this._clearCache(SHADOW_RGBA);
	}
	function _clearFillPatternCache() {
	    this._clearCache(patternImage);
	}
	function _clearLinearGradientCache() {
	    this._clearCache(linearGradient);
	}
	function _clearRadialGradientCache() {
	    this._clearCache(radialGradient);
	}
	var Shape = (function (_super) {
	    __extends(Shape, _super);
	    function Shape(config) {
	        var _this = _super.call(this, config) || this;
	        var key;
	        while (true) {
	            key = Util.Util.getRandomColor();
	            if (key && !(key in exports.shapes)) {
	                break;
	            }
	        }
	        _this.colorKey = key;
	        exports.shapes[key] = _this;
	        _this.on('shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);
	        _this.on('shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
	        _this.on('fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva', _clearFillPatternCache);
	        _this.on('fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva', _clearLinearGradientCache);
	        _this.on('fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva', _clearRadialGradientCache);
	        return _this;
	    }
	    Shape.prototype.getContext = function () {
	        return this.getLayer().getContext();
	    };
	    Shape.prototype.getCanvas = function () {
	        return this.getLayer().getCanvas();
	    };
	    Shape.prototype.getSceneFunc = function () {
	        return this.attrs.sceneFunc || this['_sceneFunc'];
	    };
	    Shape.prototype.getHitFunc = function () {
	        return this.attrs.hitFunc || this['_hitFunc'];
	    };
	    Shape.prototype.hasShadow = function () {
	        return this._getCache(HAS_SHADOW, this._hasShadow);
	    };
	    Shape.prototype._hasShadow = function () {
	        return (this.shadowEnabled() &&
	            (this.shadowOpacity() !== 0 &&
	                !!(this.shadowColor() ||
	                    this.shadowBlur() ||
	                    this.shadowOffsetX() ||
	                    this.shadowOffsetY())));
	    };
	    Shape.prototype._getFillPattern = function () {
	        return this._getCache(patternImage, this.__getFillPattern);
	    };
	    Shape.prototype.__getFillPattern = function () {
	        if (this.fillPatternImage()) {
	            var ctx = getDummyContext();
	            return ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || 'repeat');
	        }
	    };
	    Shape.prototype._getLinearGradient = function () {
	        return this._getCache(linearGradient, this.__getLinearGradient);
	    };
	    Shape.prototype.__getLinearGradient = function () {
	        var colorStops = this.fillLinearGradientColorStops();
	        if (colorStops) {
	            var ctx = getDummyContext();
	            var start = this.fillLinearGradientStartPoint();
	            var end = this.fillLinearGradientEndPoint();
	            var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
	            for (var n = 0; n < colorStops.length; n += 2) {
	                grd.addColorStop(colorStops[n], colorStops[n + 1]);
	            }
	            return grd;
	        }
	    };
	    Shape.prototype._getRadialGradient = function () {
	        return this._getCache(radialGradient, this.__getRadialGradient);
	    };
	    Shape.prototype.__getRadialGradient = function () {
	        var colorStops = this.fillRadialGradientColorStops();
	        if (colorStops) {
	            var ctx = getDummyContext();
	            var start = this.fillRadialGradientStartPoint();
	            var end = this.fillRadialGradientEndPoint();
	            var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
	            for (var n = 0; n < colorStops.length; n += 2) {
	                grd.addColorStop(colorStops[n], colorStops[n + 1]);
	            }
	            return grd;
	        }
	    };
	    Shape.prototype.getShadowRGBA = function () {
	        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
	    };
	    Shape.prototype._getShadowRGBA = function () {
	        if (this.hasShadow()) {
	            var rgba = Util.Util.colorToRGBA(this.shadowColor());
	            return ('rgba(' +
	                rgba.r +
	                ',' +
	                rgba.g +
	                ',' +
	                rgba.b +
	                ',' +
	                rgba.a * (this.shadowOpacity() || 1) +
	                ')');
	        }
	    };
	    Shape.prototype.hasFill = function () {
	        return !!(this.fill() ||
	            this.fillPatternImage() ||
	            this.fillLinearGradientColorStops() ||
	            this.fillRadialGradientColorStops());
	    };
	    Shape.prototype.hasStroke = function () {
	        return (this.strokeEnabled() &&
	            this.strokeWidth() &&
	            !!(this.stroke() || this.strokeLinearGradientColorStops()));
	    };
	    Shape.prototype.intersects = function (point) {
	        var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;
	        bufferHitCanvas.getContext().clear();
	        this.drawHit(bufferHitCanvas);
	        p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
	        return p[3] > 0;
	    };
	    Shape.prototype.destroy = function () {
	        Node_1.Node.prototype.destroy.call(this);
	        delete exports.shapes[this.colorKey];
	        delete this.colorKey;
	        return this;
	    };
	    Shape.prototype._useBufferCanvas = function (caching) {
	        return !!((!caching || this.hasShadow()) &&
	            this.perfectDrawEnabled() &&
	            this.getAbsoluteOpacity() !== 1 &&
	            this.hasFill() &&
	            this.hasStroke() &&
	            this.getStage());
	    };
	    Shape.prototype.setStrokeHitEnabled = function (val) {
	        if (val) {
	            this.hitStrokeWidth('auto');
	        }
	        else {
	            this.hitStrokeWidth(0);
	        }
	    };
	    Shape.prototype.getStrokeHitEnabled = function () {
	        if (this.hitStrokeWidth() === 0) {
	            return false;
	        }
	        else {
	            return true;
	        }
	    };
	    Shape.prototype.getSelfRect = function () {
	        var size = this.size();
	        return {
	            x: this._centroid ? Math.round(-size.width / 2) : 0,
	            y: this._centroid ? Math.round(-size.height / 2) : 0,
	            width: size.width,
	            height: size.height
	        };
	    };
	    Shape.prototype.getClientRect = function (attrs) {
	        attrs = attrs || {};
	        var skipTransform = attrs.skipTransform;
	        var relativeTo = attrs.relativeTo;
	        var fillRect = this.getSelfRect();
	        var applyStroke = !attrs.skipStroke && this.hasStroke();
	        var strokeWidth = (applyStroke && this.strokeWidth()) || 0;
	        var fillAndStrokeWidth = fillRect.width + strokeWidth;
	        var fillAndStrokeHeight = fillRect.height + strokeWidth;
	        var applyShadow = !attrs.skipShadow && this.hasShadow();
	        var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
	        var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
	        var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
	        var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
	        var blurRadius = (applyShadow && this.shadowBlur()) || 0;
	        var width = preWidth + blurRadius * 2;
	        var height = preHeight + blurRadius * 2;
	        var roundingOffset = 0;
	        if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
	            roundingOffset = 1;
	        }
	        var rect = {
	            width: width + roundingOffset,
	            height: height + roundingOffset,
	            x: -Math.round(strokeWidth / 2 + blurRadius) +
	                Math.min(shadowOffsetX, 0) +
	                fillRect.x,
	            y: -Math.round(strokeWidth / 2 + blurRadius) +
	                Math.min(shadowOffsetY, 0) +
	                fillRect.y
	        };
	        if (!skipTransform) {
	            return this._transformedRect(rect, relativeTo);
	        }
	        return rect;
	    };
	    Shape.prototype.drawScene = function (can, top, caching, skipBuffer) {
	        var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.sceneFunc(), hasShadow = this.hasShadow(), hasStroke = this.hasStroke(), stage, bufferCanvas, bufferContext;
	        if (!this.isVisible() && !caching) {
	            return this;
	        }
	        if (cachedCanvas) {
	            context.save();
	            layer._applyTransform(this, context, top);
	            this._drawCachedSceneCanvas(context);
	            context.restore();
	            return this;
	        }
	        if (!drawFunc) {
	            return this;
	        }
	        context.save();
	        if (this._useBufferCanvas(caching) && !skipBuffer) {
	            stage = this.getStage();
	            bufferCanvas = stage.bufferCanvas;
	            bufferContext = bufferCanvas.getContext();
	            bufferContext.clear();
	            bufferContext.save();
	            bufferContext._applyLineJoin(this);
	            if (!caching) {
	                if (layer) {
	                    layer._applyTransform(this, bufferContext, top);
	                }
	                else {
	                    var m = this.getAbsoluteTransform(top).getMatrix();
	                    context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	                }
	            }
	            drawFunc.call(this, bufferContext, this);
	            bufferContext.restore();
	            var ratio = bufferCanvas.pixelRatio;
	            if (hasShadow && !canvas.hitCanvas) {
	                context.save();
	                context._applyShadow(this);
	                context._applyOpacity(this);
	                context._applyGlobalCompositeOperation(this);
	                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
	                context.restore();
	            }
	            else {
	                context._applyOpacity(this);
	                context._applyGlobalCompositeOperation(this);
	                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
	            }
	        }
	        else {
	            context._applyLineJoin(this);
	            if (!caching) {
	                if (layer) {
	                    layer._applyTransform(this, context, top);
	                }
	                else {
	                    var o = this.getAbsoluteTransform(top).getMatrix();
	                    context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
	                }
	            }
	            if (hasShadow && hasStroke && !canvas.hitCanvas) {
	                context.save();
	                if (!caching) {
	                    context._applyOpacity(this);
	                    context._applyGlobalCompositeOperation(this);
	                }
	                context._applyShadow(this);
	                drawFunc.call(this, context, this);
	                context.restore();
	                if (this.hasFill() && this.shadowForStrokeEnabled()) {
	                    drawFunc.call(this, context, this);
	                }
	            }
	            else if (hasShadow && !canvas.hitCanvas) {
	                context.save();
	                if (!caching) {
	                    context._applyOpacity(this);
	                    context._applyGlobalCompositeOperation(this);
	                }
	                context._applyShadow(this);
	                drawFunc.call(this, context, this);
	                context.restore();
	            }
	            else {
	                if (!caching) {
	                    context._applyOpacity(this);
	                    context._applyGlobalCompositeOperation(this);
	                }
	                drawFunc.call(this, context, this);
	            }
	        }
	        context.restore();
	        return this;
	    };
	    Shape.prototype.drawHit = function (can, top, caching) {
	        var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
	        if (!this.colorKey) {
	            Util.Util.warn('Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()');
	        }
	        if (!this.shouldDrawHit() && !caching) {
	            return this;
	        }
	        if (cachedHitCanvas) {
	            context.save();
	            layer._applyTransform(this, context, top);
	            this._drawCachedHitCanvas(context);
	            context.restore();
	            return this;
	        }
	        if (!drawFunc) {
	            return this;
	        }
	        context.save();
	        context._applyLineJoin(this);
	        if (!caching) {
	            if (layer) {
	                layer._applyTransform(this, context, top);
	            }
	            else {
	                var o = this.getAbsoluteTransform(top).getMatrix();
	                context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
	            }
	        }
	        drawFunc.call(this, context, this);
	        context.restore();
	        return this;
	    };
	    Shape.prototype.drawHitFromCache = function (alphaThreshold) {
	        if (alphaThreshold === void 0) { alphaThreshold = 0; }
	        var cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i, alpha;
	        hitContext.clear();
	        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
	        try {
	            hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
	            hitData = hitImageData.data;
	            len = hitData.length;
	            rgbColorKey = Util.Util._hexToRgb(this.colorKey);
	            for (i = 0; i < len; i += 4) {
	                alpha = hitData[i + 3];
	                if (alpha > alphaThreshold) {
	                    hitData[i] = rgbColorKey.r;
	                    hitData[i + 1] = rgbColorKey.g;
	                    hitData[i + 2] = rgbColorKey.b;
	                    hitData[i + 3] = 255;
	                }
	                else {
	                    hitData[i + 3] = 0;
	                }
	            }
	            hitContext.putImageData(hitImageData, 0, 0);
	        }
	        catch (e) {
	            Util.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
	        }
	        return this;
	    };
	    Shape.prototype.hasPointerCapture = function (pointerId) {
	        return PointerEvents.hasPointerCapture(pointerId, this);
	    };
	    Shape.prototype.setPointerCapture = function (pointerId) {
	        PointerEvents.setPointerCapture(pointerId, this);
	    };
	    Shape.prototype.releaseCapture = function (pointerId) {
	        PointerEvents.releaseCapture(pointerId, this);
	    };
	    return Shape;
	}(Node_1.Node));
	exports.Shape = Shape;
	Shape.prototype._fillFunc = _fillFunc;
	Shape.prototype._strokeFunc = _strokeFunc;
	Shape.prototype._fillFuncHit = _fillFuncHit;
	Shape.prototype._strokeFuncHit = _strokeFuncHit;
	Shape.prototype._centroid = false;
	Shape.prototype.nodeType = 'Shape';
	Global._registerNode(Shape);
	Factory.Factory.addGetterSetter(Shape, 'stroke', undefined, Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Shape, 'strokeWidth', 2, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'hitStrokeWidth', 'auto', Validators.getNumberOrAutoValidator());
	Factory.Factory.addGetterSetter(Shape, 'strokeHitEnabled', true, Validators.getBooleanValidator());
	Factory.Factory.addGetterSetter(Shape, 'perfectDrawEnabled', true, Validators.getBooleanValidator());
	Factory.Factory.addGetterSetter(Shape, 'shadowForStrokeEnabled', true, Validators.getBooleanValidator());
	Factory.Factory.addGetterSetter(Shape, 'lineJoin');
	Factory.Factory.addGetterSetter(Shape, 'lineCap');
	Factory.Factory.addGetterSetter(Shape, 'sceneFunc');
	Factory.Factory.addGetterSetter(Shape, 'hitFunc');
	Factory.Factory.addGetterSetter(Shape, 'dash');
	Factory.Factory.addGetterSetter(Shape, 'dashOffset', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'shadowColor', undefined, Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Shape, 'shadowBlur', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'shadowOpacity', 1, Validators.getNumberValidator());
	Factory.Factory.addComponentsGetterSetter(Shape, 'shadowOffset', ['x', 'y']);
	Factory.Factory.addGetterSetter(Shape, 'shadowOffsetX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'shadowOffsetY', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'fillPatternImage');
	Factory.Factory.addGetterSetter(Shape, 'fill', undefined, Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Shape, 'fillPatternX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'fillPatternY', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'fillLinearGradientColorStops');
	Factory.Factory.addGetterSetter(Shape, 'strokeLinearGradientColorStops');
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientStartRadius', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientEndRadius', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientColorStops');
	Factory.Factory.addGetterSetter(Shape, 'fillPatternRepeat', 'repeat');
	Factory.Factory.addGetterSetter(Shape, 'fillEnabled', true);
	Factory.Factory.addGetterSetter(Shape, 'strokeEnabled', true);
	Factory.Factory.addGetterSetter(Shape, 'shadowEnabled', true);
	Factory.Factory.addGetterSetter(Shape, 'dashEnabled', true);
	Factory.Factory.addGetterSetter(Shape, 'strokeScaleEnabled', true);
	Factory.Factory.addGetterSetter(Shape, 'fillPriority', 'color');
	Factory.Factory.addComponentsGetterSetter(Shape, 'fillPatternOffset', ['x', 'y']);
	Factory.Factory.addGetterSetter(Shape, 'fillPatternOffsetX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'fillPatternOffsetY', 0, Validators.getNumberValidator());
	Factory.Factory.addComponentsGetterSetter(Shape, 'fillPatternScale', ['x', 'y']);
	Factory.Factory.addGetterSetter(Shape, 'fillPatternScaleX', 1, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Shape, 'fillPatternScaleY', 1, Validators.getNumberValidator());
	Factory.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientStartPoint', [
	    'x',
	    'y'
	]);
	Factory.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientStartPoint', [
	    'x',
	    'y'
	]);
	Factory.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointX', 0);
	Factory.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointX', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointY', 0);
	Factory.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointY', 0);
	Factory.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientEndPoint', [
	    'x',
	    'y'
	]);
	Factory.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientEndPoint', [
	    'x',
	    'y'
	]);
	Factory.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointX', 0);
	Factory.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointX', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointY', 0);
	Factory.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointY', 0);
	Factory.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientStartPoint', [
	    'x',
	    'y'
	]);
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointX', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointY', 0);
	Factory.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientEndPoint', [
	    'x',
	    'y'
	]);
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointX', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointY', 0);
	Factory.Factory.addGetterSetter(Shape, 'fillPatternRotation', 0);
	Factory.Factory.backCompat(Shape, {
	    dashArray: 'dash',
	    getDashArray: 'getDash',
	    setDashArray: 'getDash',
	    drawFunc: 'sceneFunc',
	    getDrawFunc: 'getSceneFunc',
	    setDrawFunc: 'setSceneFunc',
	    drawHitFunc: 'hitFunc',
	    getDrawHitFunc: 'getHitFunc',
	    setDrawHitFunc: 'setHitFunc'
	});
	Util.Collection.mapMethods(Shape);
	});

	unwrapExports(Shape_1);
	var Shape_2 = Shape_1.shapes;
	var Shape_3 = Shape_1.Shape;

	var Layer_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });








	var HASH = '#', BEFORE_DRAW = 'beforeDraw', DRAW = 'draw', INTERSECTION_OFFSETS = [
	    { x: 0, y: 0 },
	    { x: -1, y: -1 },
	    { x: 1, y: -1 },
	    { x: 1, y: 1 },
	    { x: -1, y: 1 }
	], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
	var Layer = (function (_super) {
	    __extends(Layer, _super);
	    function Layer() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.hitCanvas = new Canvas_1.HitCanvas({
	            pixelRatio: 1
	        });
	        return _this;
	    }
	    Layer.prototype._setCanvasSize = function (width, height) {
	        this.canvas.setSize(width, height);
	        this.hitCanvas.setSize(width, height);
	        this._checkSmooth();
	    };
	    Layer.prototype._validateAdd = function (child) {
	        var type = child.getType();
	        if (type !== 'Group' && type !== 'Shape') {
	            Util.Util.throw('You may only add groups and shapes to a layer.');
	        }
	    };
	    Layer.prototype.getIntersection = function (pos, selector) {
	        var obj, i, intersectionOffset, shape;
	        if (!this.hitGraphEnabled() || !this.isVisible()) {
	            return null;
	        }
	        var spiralSearchDistance = 1;
	        var continueSearch = false;
	        while (true) {
	            for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
	                intersectionOffset = INTERSECTION_OFFSETS[i];
	                obj = this._getIntersection({
	                    x: pos.x + intersectionOffset.x * spiralSearchDistance,
	                    y: pos.y + intersectionOffset.y * spiralSearchDistance
	                });
	                shape = obj.shape;
	                if (shape && selector) {
	                    return shape.findAncestor(selector, true);
	                }
	                else if (shape) {
	                    return shape;
	                }
	                continueSearch = !!obj.antialiased;
	                if (!obj.antialiased) {
	                    break;
	                }
	            }
	            if (continueSearch) {
	                spiralSearchDistance += 1;
	            }
	            else {
	                return null;
	            }
	        }
	    };
	    Layer.prototype._getIntersection = function (pos) {
	        var ratio = this.hitCanvas.pixelRatio;
	        var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data, p3 = p[3], colorKey, shape;
	        if (p3 === 255) {
	            colorKey = Util.Util._rgbToHex(p[0], p[1], p[2]);
	            shape = Shape_1.shapes[HASH + colorKey];
	            if (shape) {
	                return {
	                    shape: shape
	                };
	            }
	            return {
	                antialiased: true
	            };
	        }
	        else if (p3 > 0) {
	            return {
	                antialiased: true
	            };
	        }
	        return {};
	    };
	    Layer.prototype.drawScene = function (can, top) {
	        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
	        this._fire(BEFORE_DRAW, {
	            node: this
	        });
	        if (this.clearBeforeDraw()) {
	            canvas.getContext().clear();
	        }
	        Container_1.Container.prototype.drawScene.call(this, canvas, top);
	        this._fire(DRAW, {
	            node: this
	        });
	        return this;
	    };
	    Layer.prototype.drawHit = function (can, top) {
	        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);
	        if (layer && layer.clearBeforeDraw()) {
	            layer
	                .getHitCanvas()
	                .getContext()
	                .clear();
	        }
	        Container_1.Container.prototype.drawHit.call(this, canvas, top);
	        return this;
	    };
	    Layer.prototype.clear = function (bounds) {
	        BaseLayer_1.BaseLayer.prototype.clear.call(this, bounds);
	        this.getHitCanvas()
	            .getContext()
	            .clear(bounds);
	        return this;
	    };
	    Layer.prototype.enableHitGraph = function () {
	        this.hitGraphEnabled(true);
	        return this;
	    };
	    Layer.prototype.disableHitGraph = function () {
	        this.hitGraphEnabled(false);
	        return this;
	    };
	    Layer.prototype.toggleHitCanvas = function () {
	        if (!this.parent) {
	            return;
	        }
	        var parent = this.parent;
	        var added = !!this.hitCanvas._canvas.parentNode;
	        if (added) {
	            parent.content.removeChild(this.hitCanvas._canvas);
	        }
	        else {
	            parent.content.appendChild(this.hitCanvas._canvas);
	        }
	    };
	    Layer.prototype.setSize = function (_a) {
	        var width = _a.width, height = _a.height;
	        _super.prototype.setSize.call(this, { width: width, height: height });
	        this.hitCanvas.setSize(width, height);
	        return this;
	    };
	    return Layer;
	}(BaseLayer_1.BaseLayer));
	exports.Layer = Layer;
	Layer.prototype.nodeType = 'Layer';
	Global._registerNode(Layer);
	Factory.Factory.addGetterSetter(Layer, 'hitGraphEnabled', true, Validators.getBooleanValidator());
	Util.Collection.mapMethods(Layer);
	});

	unwrapExports(Layer_1);
	var Layer_2 = Layer_1.Layer;

	var FastLayer_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });




	var FastLayer = (function (_super) {
	    __extends(FastLayer, _super);
	    function FastLayer() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    FastLayer.prototype._validateAdd = function (child) {
	        var type = child.getType();
	        if (type !== 'Shape') {
	            Util.Util.throw('You may only add shapes to a fast layer.');
	        }
	    };
	    FastLayer.prototype._setCanvasSize = function (width, height) {
	        this.canvas.setSize(width, height);
	        this._checkSmooth();
	    };
	    FastLayer.prototype.hitGraphEnabled = function () {
	        return false;
	    };
	    FastLayer.prototype.drawScene = function (can) {
	        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
	        if (this.clearBeforeDraw()) {
	            canvas.getContext().clear();
	        }
	        Container_1.Container.prototype.drawScene.call(this, canvas);
	        return this;
	    };
	    FastLayer.prototype.draw = function () {
	        this.drawScene();
	        return this;
	    };
	    return FastLayer;
	}(BaseLayer_1.BaseLayer));
	exports.FastLayer = FastLayer;
	FastLayer.prototype.nodeType = 'FastLayer';
	Global._registerNode(FastLayer);
	Util.Collection.mapMethods(FastLayer);
	});

	unwrapExports(FastLayer_1);
	var FastLayer_2 = FastLayer_1.FastLayer;

	var Group_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	var Group = (function (_super) {
	    __extends(Group, _super);
	    function Group() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Group.prototype._validateAdd = function (child) {
	        var type = child.getType();
	        if (type !== 'Group' && type !== 'Shape') {
	            Util.Util.throw('You may only add groups and shapes to groups.');
	        }
	    };
	    return Group;
	}(Container_1.Container));
	exports.Group = Group;
	Group.prototype.nodeType = 'Group';
	Global._registerNode(Group);
	Util.Collection.mapMethods(Group);
	});

	unwrapExports(Group_1);
	var Group_2 = Group_1.Group;

	var Tween_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var blacklist = {
	    node: 1,
	    duration: 1,
	    easing: 1,
	    onFinish: 1,
	    yoyo: 1
	}, PAUSED = 1, PLAYING = 2, REVERSING = 3, idCounter = 0, colorAttrs = ['fill', 'stroke', 'shadowColor'];
	var TweenEngine = (function () {
	    function TweenEngine(prop, propFunc, func, begin, finish, duration, yoyo) {
	        this.prop = prop;
	        this.propFunc = propFunc;
	        this.begin = begin;
	        this._pos = begin;
	        this.duration = duration;
	        this._change = 0;
	        this.prevPos = 0;
	        this.yoyo = yoyo;
	        this._time = 0;
	        this._position = 0;
	        this._startTime = 0;
	        this._finish = 0;
	        this.func = func;
	        this._change = finish - this.begin;
	        this.pause();
	    }
	    TweenEngine.prototype.fire = function (str) {
	        var handler = this[str];
	        if (handler) {
	            handler();
	        }
	    };
	    TweenEngine.prototype.setTime = function (t) {
	        if (t > this.duration) {
	            if (this.yoyo) {
	                this._time = this.duration;
	                this.reverse();
	            }
	            else {
	                this.finish();
	            }
	        }
	        else if (t < 0) {
	            if (this.yoyo) {
	                this._time = 0;
	                this.play();
	            }
	            else {
	                this.reset();
	            }
	        }
	        else {
	            this._time = t;
	            this.update();
	        }
	    };
	    TweenEngine.prototype.getTime = function () {
	        return this._time;
	    };
	    TweenEngine.prototype.setPosition = function (p) {
	        this.prevPos = this._pos;
	        this.propFunc(p);
	        this._pos = p;
	    };
	    TweenEngine.prototype.getPosition = function (t) {
	        if (t === undefined) {
	            t = this._time;
	        }
	        return this.func(t, this.begin, this._change, this.duration);
	    };
	    TweenEngine.prototype.play = function () {
	        this.state = PLAYING;
	        this._startTime = this.getTimer() - this._time;
	        this.onEnterFrame();
	        this.fire('onPlay');
	    };
	    TweenEngine.prototype.reverse = function () {
	        this.state = REVERSING;
	        this._time = this.duration - this._time;
	        this._startTime = this.getTimer() - this._time;
	        this.onEnterFrame();
	        this.fire('onReverse');
	    };
	    TweenEngine.prototype.seek = function (t) {
	        this.pause();
	        this._time = t;
	        this.update();
	        this.fire('onSeek');
	    };
	    TweenEngine.prototype.reset = function () {
	        this.pause();
	        this._time = 0;
	        this.update();
	        this.fire('onReset');
	    };
	    TweenEngine.prototype.finish = function () {
	        this.pause();
	        this._time = this.duration;
	        this.update();
	        this.fire('onFinish');
	    };
	    TweenEngine.prototype.update = function () {
	        this.setPosition(this.getPosition(this._time));
	    };
	    TweenEngine.prototype.onEnterFrame = function () {
	        var t = this.getTimer() - this._startTime;
	        if (this.state === PLAYING) {
	            this.setTime(t);
	        }
	        else if (this.state === REVERSING) {
	            this.setTime(this.duration - t);
	        }
	    };
	    TweenEngine.prototype.pause = function () {
	        this.state = PAUSED;
	        this.fire('onPause');
	    };
	    TweenEngine.prototype.getTimer = function () {
	        return new Date().getTime();
	    };
	    return TweenEngine;
	}());
	var Tween = (function () {
	    function Tween(config) {
	        var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo, key;
	        if (typeof config.duration === 'undefined') {
	            duration = 0.3;
	        }
	        else if (config.duration === 0) {
	            duration = 0.001;
	        }
	        else {
	            duration = config.duration;
	        }
	        this.node = node;
	        this._id = idCounter++;
	        var layers = node.getLayer() ||
	            (node instanceof Global.Konva['Stage'] ? node.getLayers() : null);
	        if (!layers) {
	            Util.Util.error('Tween constructor have `node` that is not in a layer. Please add node into layer first.');
	        }
	        this.anim = new Animation_1.Animation(function () {
	            that.tween.onEnterFrame();
	        }, layers);
	        this.tween = new TweenEngine(key, function (i) {
	            that._tweenFunc(i);
	        }, easing, 0, 1, duration * 1000, yoyo);
	        this._addListeners();
	        if (!Tween.attrs[nodeId]) {
	            Tween.attrs[nodeId] = {};
	        }
	        if (!Tween.attrs[nodeId][this._id]) {
	            Tween.attrs[nodeId][this._id] = {};
	        }
	        if (!Tween.tweens[nodeId]) {
	            Tween.tweens[nodeId] = {};
	        }
	        for (key in config) {
	            if (blacklist[key] === undefined) {
	                this._addAttr(key, config[key]);
	            }
	        }
	        this.reset();
	        this.onFinish = config.onFinish;
	        this.onReset = config.onReset;
	    }
	    Tween.prototype._addAttr = function (key, end) {
	        var node = this.node, nodeId = node._id, start, diff, tweenId, n, len, trueEnd, trueStart, endRGBA;
	        tweenId = Tween.tweens[nodeId][key];
	        if (tweenId) {
	            delete Tween.attrs[nodeId][tweenId][key];
	        }
	        start = node.getAttr(key);
	        if (Util.Util._isArray(end)) {
	            diff = [];
	            len = Math.max(end.length, start.length);
	            if (key === 'points' && end.length !== start.length) {
	                if (end.length > start.length) {
	                    trueStart = start;
	                    start = Util.Util._prepareArrayForTween(start, end, node.closed());
	                }
	                else {
	                    trueEnd = end;
	                    end = Util.Util._prepareArrayForTween(end, start, node.closed());
	                }
	            }
	            if (key.indexOf('fill') === 0) {
	                for (n = 0; n < len; n++) {
	                    if (n % 2 === 0) {
	                        diff.push(end[n] - start[n]);
	                    }
	                    else {
	                        var startRGBA = Util.Util.colorToRGBA(start[n]);
	                        endRGBA = Util.Util.colorToRGBA(end[n]);
	                        start[n] = startRGBA;
	                        diff.push({
	                            r: endRGBA.r - startRGBA.r,
	                            g: endRGBA.g - startRGBA.g,
	                            b: endRGBA.b - startRGBA.b,
	                            a: endRGBA.a - startRGBA.a
	                        });
	                    }
	                }
	            }
	            else {
	                for (n = 0; n < len; n++) {
	                    diff.push(end[n] - start[n]);
	                }
	            }
	        }
	        else if (colorAttrs.indexOf(key) !== -1) {
	            start = Util.Util.colorToRGBA(start);
	            endRGBA = Util.Util.colorToRGBA(end);
	            diff = {
	                r: endRGBA.r - start.r,
	                g: endRGBA.g - start.g,
	                b: endRGBA.b - start.b,
	                a: endRGBA.a - start.a
	            };
	        }
	        else {
	            diff = end - start;
	        }
	        Tween.attrs[nodeId][this._id][key] = {
	            start: start,
	            diff: diff,
	            end: end,
	            trueEnd: trueEnd,
	            trueStart: trueStart
	        };
	        Tween.tweens[nodeId][key] = this._id;
	    };
	    Tween.prototype._tweenFunc = function (i) {
	        var node = this.node, attrs = Tween.attrs[node._id][this._id], key, attr, start, diff, newVal, n, len, end;
	        for (key in attrs) {
	            attr = attrs[key];
	            start = attr.start;
	            diff = attr.diff;
	            end = attr.end;
	            if (Util.Util._isArray(start)) {
	                newVal = [];
	                len = Math.max(start.length, end.length);
	                if (key.indexOf('fill') === 0) {
	                    for (n = 0; n < len; n++) {
	                        if (n % 2 === 0) {
	                            newVal.push((start[n] || 0) + diff[n] * i);
	                        }
	                        else {
	                            newVal.push('rgba(' +
	                                Math.round(start[n].r + diff[n].r * i) +
	                                ',' +
	                                Math.round(start[n].g + diff[n].g * i) +
	                                ',' +
	                                Math.round(start[n].b + diff[n].b * i) +
	                                ',' +
	                                (start[n].a + diff[n].a * i) +
	                                ')');
	                        }
	                    }
	                }
	                else {
	                    for (n = 0; n < len; n++) {
	                        newVal.push((start[n] || 0) + diff[n] * i);
	                    }
	                }
	            }
	            else if (colorAttrs.indexOf(key) !== -1) {
	                newVal =
	                    'rgba(' +
	                        Math.round(start.r + diff.r * i) +
	                        ',' +
	                        Math.round(start.g + diff.g * i) +
	                        ',' +
	                        Math.round(start.b + diff.b * i) +
	                        ',' +
	                        (start.a + diff.a * i) +
	                        ')';
	            }
	            else {
	                newVal = start + diff * i;
	            }
	            node.setAttr(key, newVal);
	        }
	    };
	    Tween.prototype._addListeners = function () {
	        var _this = this;
	        this.tween.onPlay = function () {
	            _this.anim.start();
	        };
	        this.tween.onReverse = function () {
	            _this.anim.start();
	        };
	        this.tween.onPause = function () {
	            _this.anim.stop();
	        };
	        this.tween.onFinish = function () {
	            var node = _this.node;
	            var attrs = Tween.attrs[node._id][_this._id];
	            if (attrs.points && attrs.points.trueEnd) {
	                node.setAttr('points', attrs.points.trueEnd);
	            }
	            if (_this.onFinish) {
	                _this.onFinish.call(_this);
	            }
	        };
	        this.tween.onReset = function () {
	            var node = _this.node;
	            var attrs = Tween.attrs[node._id][_this._id];
	            if (attrs.points && attrs.points.trueStart) {
	                node.points(attrs.points.trueStart);
	            }
	            if (_this.onReset) {
	                _this.onReset();
	            }
	        };
	    };
	    Tween.prototype.play = function () {
	        this.tween.play();
	        return this;
	    };
	    Tween.prototype.reverse = function () {
	        this.tween.reverse();
	        return this;
	    };
	    Tween.prototype.reset = function () {
	        this.tween.reset();
	        return this;
	    };
	    Tween.prototype.seek = function (t) {
	        this.tween.seek(t * 1000);
	        return this;
	    };
	    Tween.prototype.pause = function () {
	        this.tween.pause();
	        return this;
	    };
	    Tween.prototype.finish = function () {
	        this.tween.finish();
	        return this;
	    };
	    Tween.prototype.destroy = function () {
	        var nodeId = this.node._id, thisId = this._id, attrs = Tween.tweens[nodeId], key;
	        this.pause();
	        for (key in attrs) {
	            delete Tween.tweens[nodeId][key];
	        }
	        delete Tween.attrs[nodeId][thisId];
	    };
	    Tween.attrs = {};
	    Tween.tweens = {};
	    return Tween;
	}());
	exports.Tween = Tween;
	Node_1.Node.prototype.to = function (params) {
	    var onFinish = params.onFinish;
	    params.node = this;
	    params.onFinish = function () {
	        this.destroy();
	        if (onFinish) {
	            onFinish();
	        }
	    };
	    var tween = new Tween(params);
	    tween.play();
	};
	exports.Easings = {
	    BackEaseIn: function (t, b, c, d) {
	        var s = 1.70158;
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    },
	    BackEaseOut: function (t, b, c, d) {
	        var s = 1.70158;
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    },
	    BackEaseInOut: function (t, b, c, d) {
	        var s = 1.70158;
	        if ((t /= d / 2) < 1) {
	            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	        }
	        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    },
	    ElasticEaseIn: function (t, b, c, d, a, p) {
	        var s = 0;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) === 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * 0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        }
	        else {
	            s = (p / (2 * Math.PI)) * Math.asin(c / a);
	        }
	        return (-(a *
	            Math.pow(2, 10 * (t -= 1)) *
	            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b);
	    },
	    ElasticEaseOut: function (t, b, c, d, a, p) {
	        var s = 0;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) === 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * 0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        }
	        else {
	            s = (p / (2 * Math.PI)) * Math.asin(c / a);
	        }
	        return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
	            c +
	            b);
	    },
	    ElasticEaseInOut: function (t, b, c, d, a, p) {
	        var s = 0;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d / 2) === 2) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * (0.3 * 1.5);
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        }
	        else {
	            s = (p / (2 * Math.PI)) * Math.asin(c / a);
	        }
	        if (t < 1) {
	            return (-0.5 *
	                (a *
	                    Math.pow(2, 10 * (t -= 1)) *
	                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
	                b);
	        }
	        return (a *
	            Math.pow(2, -10 * (t -= 1)) *
	            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
	            0.5 +
	            c +
	            b);
	    },
	    BounceEaseOut: function (t, b, c, d) {
	        if ((t /= d) < 1 / 2.75) {
	            return c * (7.5625 * t * t) + b;
	        }
	        else if (t < 2 / 2.75) {
	            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	        }
	        else if (t < 2.5 / 2.75) {
	            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	        }
	        else {
	            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	        }
	    },
	    BounceEaseIn: function (t, b, c, d) {
	        return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
	    },
	    BounceEaseInOut: function (t, b, c, d) {
	        if (t < d / 2) {
	            return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
	        }
	        else {
	            return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	        }
	    },
	    EaseIn: function (t, b, c, d) {
	        return c * (t /= d) * t + b;
	    },
	    EaseOut: function (t, b, c, d) {
	        return -c * (t /= d) * (t - 2) + b;
	    },
	    EaseInOut: function (t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return (c / 2) * t * t + b;
	        }
	        return (-c / 2) * (--t * (t - 2) - 1) + b;
	    },
	    StrongEaseIn: function (t, b, c, d) {
	        return c * (t /= d) * t * t * t * t + b;
	    },
	    StrongEaseOut: function (t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    },
	    StrongEaseInOut: function (t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return (c / 2) * t * t * t * t * t + b;
	        }
	        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
	    },
	    Linear: function (t, b, c, d) {
	        return (c * t) / d + b;
	    }
	};
	});

	unwrapExports(Tween_1);
	var Tween_2 = Tween_1.Tween;
	var Tween_3 = Tween_1.Easings;

	var _CoreInternals = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });














	exports.Konva = Util.Util._assign(Global.Konva, {
	    Collection: Util.Collection,
	    Util: Util.Util,
	    Node: Node_1.Node,
	    ids: Node_1.ids,
	    names: Node_1.names,
	    Container: Container_1.Container,
	    Stage: Stage_1.Stage,
	    stages: Stage_1.stages,
	    Layer: Layer_1.Layer,
	    FastLayer: FastLayer_1.FastLayer,
	    Group: Group_1.Group,
	    DD: DragAndDrop.DD,
	    Shape: Shape_1.Shape,
	    shapes: Shape_1.shapes,
	    Animation: Animation_1.Animation,
	    Tween: Tween_1.Tween,
	    Easings: Tween_1.Easings,
	    Context: Context_1.Context,
	    Canvas: Canvas_1.Canvas
	});
	});

	unwrapExports(_CoreInternals);
	var _CoreInternals_1 = _CoreInternals.Konva;

	var Arc_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Global_2 = Global;
	var Arc = (function (_super) {
	    __extends(Arc, _super);
	    function Arc() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Arc.prototype._sceneFunc = function (context) {
	        var angle = Global.Konva.getAngle(this.angle()), clockwise = this.clockwise();
	        context.beginPath();
	        context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
	        context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Arc.prototype.getWidth = function () {
	        return this.outerRadius() * 2;
	    };
	    Arc.prototype.getHeight = function () {
	        return this.outerRadius() * 2;
	    };
	    Arc.prototype.setWidth = function (width) {
	        this.outerRadius(width / 2);
	    };
	    Arc.prototype.setHeight = function (height) {
	        this.outerRadius(height / 2);
	    };
	    return Arc;
	}(Shape_1.Shape));
	exports.Arc = Arc;
	Arc.prototype._centroid = true;
	Arc.prototype.className = 'Arc';
	Arc.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
	Global_2._registerNode(Arc);
	Factory.Factory.addGetterSetter(Arc, 'innerRadius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Arc, 'outerRadius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Arc, 'angle', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Arc, 'clockwise', false, Validators.getBooleanValidator());
	Util.Collection.mapMethods(Arc);
	});

	unwrapExports(Arc_1);
	var Arc_2 = Arc_1.Arc;

	var Line_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Line = (function (_super) {
	    __extends(Line, _super);
	    function Line(config) {
	        var _this = _super.call(this, config) || this;
	        _this.on('pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva', function () {
	            this._clearCache('tensionPoints');
	        });
	        return _this;
	    }
	    Line.prototype._sceneFunc = function (context) {
	        var points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n;
	        if (!length) {
	            return;
	        }
	        context.beginPath();
	        context.moveTo(points[0], points[1]);
	        if (tension !== 0 && length > 4) {
	            tp = this.getTensionPoints();
	            len = tp.length;
	            n = closed ? 0 : 4;
	            if (!closed) {
	                context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
	            }
	            while (n < len - 2) {
	                context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
	            }
	            if (!closed) {
	                context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
	            }
	        }
	        else if (bezier) {
	            n = 2;
	            while (n < length) {
	                context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
	            }
	        }
	        else {
	            for (n = 2; n < length; n += 2) {
	                context.lineTo(points[n], points[n + 1]);
	            }
	        }
	        if (closed) {
	            context.closePath();
	            context.fillStrokeShape(this);
	        }
	        else {
	            context.strokeShape(this);
	        }
	    };
	    Line.prototype.getTensionPoints = function () {
	        return this._getCache('tensionPoints', this._getTensionPoints);
	    };
	    Line.prototype._getTensionPoints = function () {
	        if (this.closed()) {
	            return this._getTensionPointsClosed();
	        }
	        else {
	            return Util.Util._expandPoints(this.points(), this.tension());
	        }
	    };
	    Line.prototype._getTensionPointsClosed = function () {
	        var p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = Util.Util._getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = Util.Util._getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = Util.Util._expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]]
	            .concat(middle)
	            .concat([
	            lastControlPoints[0],
	            lastControlPoints[1],
	            p[len - 2],
	            p[len - 1],
	            lastControlPoints[2],
	            lastControlPoints[3],
	            firstControlPoints[0],
	            firstControlPoints[1],
	            p[0],
	            p[1]
	        ]);
	        return tp;
	    };
	    Line.prototype.getWidth = function () {
	        return this.getSelfRect().width;
	    };
	    Line.prototype.getHeight = function () {
	        return this.getSelfRect().height;
	    };
	    Line.prototype.getSelfRect = function () {
	        var points;
	        if (this.tension() !== 0) {
	            points = this._getTensionPoints();
	        }
	        else {
	            points = this.points();
	        }
	        var minX = points[0];
	        var maxX = points[0];
	        var minY = points[1];
	        var maxY = points[1];
	        var x, y;
	        for (var i = 0; i < points.length / 2; i++) {
	            x = points[i * 2];
	            y = points[i * 2 + 1];
	            minX = Math.min(minX, x);
	            maxX = Math.max(maxX, x);
	            minY = Math.min(minY, y);
	            maxY = Math.max(maxY, y);
	        }
	        return {
	            x: Math.round(minX),
	            y: Math.round(minY),
	            width: Math.round(maxX - minX),
	            height: Math.round(maxY - minY)
	        };
	    };
	    return Line;
	}(Shape_1.Shape));
	exports.Line = Line;
	Line.prototype.className = 'Line';
	Line.prototype._attrsAffectingSize = ['points', 'bezier', 'tension'];
	Global._registerNode(Line);
	Factory.Factory.addGetterSetter(Line, 'closed', false);
	Factory.Factory.addGetterSetter(Line, 'bezier', false);
	Factory.Factory.addGetterSetter(Line, 'tension', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Line, 'points', [], Validators.getNumberArrayValidator());
	Util.Collection.mapMethods(Line);
	});

	unwrapExports(Line_1);
	var Line_2 = Line_1.Line;

	var Arrow_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Arrow = (function (_super) {
	    __extends(Arrow, _super);
	    function Arrow() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Arrow.prototype._sceneFunc = function (ctx) {
	        _super.prototype._sceneFunc.call(this, ctx);
	        var PI2 = Math.PI * 2;
	        var points = this.points();
	        var tp = points;
	        var fromTension = this.tension() !== 0 && points.length > 4;
	        if (fromTension) {
	            tp = this.getTensionPoints();
	        }
	        var n = points.length;
	        var dx, dy;
	        if (fromTension) {
	            dx = points[n - 2] - tp[n - 2];
	            dy = points[n - 1] - tp[n - 1];
	        }
	        else {
	            dx = points[n - 2] - points[n - 4];
	            dy = points[n - 1] - points[n - 3];
	        }
	        var radians = (Math.atan2(dy, dx) + PI2) % PI2;
	        var length = this.pointerLength();
	        var width = this.pointerWidth();
	        ctx.save();
	        ctx.beginPath();
	        ctx.translate(points[n - 2], points[n - 1]);
	        ctx.rotate(radians);
	        ctx.moveTo(0, 0);
	        ctx.lineTo(-length, width / 2);
	        ctx.lineTo(-length, -width / 2);
	        ctx.closePath();
	        ctx.restore();
	        if (this.pointerAtBeginning()) {
	            ctx.save();
	            ctx.translate(points[0], points[1]);
	            if (fromTension) {
	                dx = tp[0] - points[0];
	                dy = tp[1] - points[1];
	            }
	            else {
	                dx = points[2] - points[0];
	                dy = points[3] - points[1];
	            }
	            ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
	            ctx.moveTo(0, 0);
	            ctx.lineTo(-length, width / 2);
	            ctx.lineTo(-length, -width / 2);
	            ctx.closePath();
	            ctx.restore();
	        }
	        var isDashEnabled = this.dashEnabled();
	        if (isDashEnabled) {
	            this.attrs.dashEnabled = false;
	            ctx.setLineDash([]);
	        }
	        ctx.fillStrokeShape(this);
	        if (isDashEnabled) {
	            this.attrs.dashEnabled = true;
	        }
	    };
	    return Arrow;
	}(Line_1.Line));
	exports.Arrow = Arrow;
	Arrow.prototype.className = 'Arrow';
	Global._registerNode(Arrow);
	Factory.Factory.addGetterSetter(Arrow, 'pointerLength', 10, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Arrow, 'pointerWidth', 10, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Arrow, 'pointerAtBeginning', false);
	Util.Collection.mapMethods(Arrow);
	});

	unwrapExports(Arrow_1);
	var Arrow_2 = Arrow_1.Arrow;

	var Circle_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Circle = (function (_super) {
	    __extends(Circle, _super);
	    function Circle() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Circle.prototype._sceneFunc = function (context) {
	        context.beginPath();
	        context.arc(0, 0, this.radius(), 0, Math.PI * 2, false);
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Circle.prototype.getWidth = function () {
	        return this.radius() * 2;
	    };
	    Circle.prototype.getHeight = function () {
	        return this.radius() * 2;
	    };
	    Circle.prototype.setWidth = function (width) {
	        if (this.radius() !== width / 2) {
	            this.radius(width / 2);
	        }
	    };
	    Circle.prototype.setHeight = function (height) {
	        if (this.radius() !== height / 2) {
	            this.radius(height / 2);
	        }
	    };
	    return Circle;
	}(Shape_1.Shape));
	exports.Circle = Circle;
	Circle.prototype._centroid = true;
	Circle.prototype.className = 'Circle';
	Circle.prototype._attrsAffectingSize = ['radius'];
	Global._registerNode(Circle);
	Factory.Factory.addGetterSetter(Circle, 'radius', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(Circle);
	});

	unwrapExports(Circle_1);
	var Circle_2 = Circle_1.Circle;

	var Ellipse_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Ellipse = (function (_super) {
	    __extends(Ellipse, _super);
	    function Ellipse() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Ellipse.prototype._sceneFunc = function (context) {
	        var rx = this.radiusX(), ry = this.radiusY();
	        context.beginPath();
	        context.save();
	        if (rx !== ry) {
	            context.scale(1, ry / rx);
	        }
	        context.arc(0, 0, rx, 0, Math.PI * 2, false);
	        context.restore();
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Ellipse.prototype.getWidth = function () {
	        return this.radiusX() * 2;
	    };
	    Ellipse.prototype.getHeight = function () {
	        return this.radiusY() * 2;
	    };
	    Ellipse.prototype.setWidth = function (width) {
	        this.radiusX(width / 2);
	    };
	    Ellipse.prototype.setHeight = function (height) {
	        this.radiusY(height / 2);
	    };
	    return Ellipse;
	}(Shape_1.Shape));
	exports.Ellipse = Ellipse;
	Ellipse.prototype.className = 'Ellipse';
	Ellipse.prototype._centroid = true;
	Ellipse.prototype._attrsAffectingSize = ['radiusX', 'radiusY'];
	Global._registerNode(Ellipse);
	Factory.Factory.addComponentsGetterSetter(Ellipse, 'radius', ['x', 'y']);
	Factory.Factory.addGetterSetter(Ellipse, 'radiusX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Ellipse, 'radiusY', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(Ellipse);
	});

	unwrapExports(Ellipse_1);
	var Ellipse_2 = Ellipse_1.Ellipse;

	var Image_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Image = (function (_super) {
	    __extends(Image, _super);
	    function Image() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Image.prototype._useBufferCanvas = function () {
	        return !!((this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
	            this.hasStroke() &&
	            this.getStage());
	    };
	    Image.prototype._sceneFunc = function (context) {
	        var width = this.width(), height = this.height(), image = this.image(), cropWidth, cropHeight, params;
	        if (image) {
	            cropWidth = this.cropWidth();
	            cropHeight = this.cropHeight();
	            if (cropWidth && cropHeight) {
	                params = [
	                    image,
	                    this.cropX(),
	                    this.cropY(),
	                    cropWidth,
	                    cropHeight,
	                    0,
	                    0,
	                    width,
	                    height
	                ];
	            }
	            else {
	                params = [image, 0, 0, width, height];
	            }
	        }
	        if (this.hasFill() || this.hasStroke()) {
	            context.beginPath();
	            context.rect(0, 0, width, height);
	            context.closePath();
	            context.fillStrokeShape(this);
	        }
	        if (image) {
	            context.drawImage.apply(context, params);
	        }
	    };
	    Image.prototype._hitFunc = function (context) {
	        var width = this.width(), height = this.height();
	        context.beginPath();
	        context.rect(0, 0, width, height);
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Image.prototype.getWidth = function () {
	        var image = this.image();
	        return this.attrs.width || (image ? image.width : 0);
	    };
	    Image.prototype.getHeight = function () {
	        var image = this.image();
	        return this.attrs.height || (image ? image.height : 0);
	    };
	    Image.fromURL = function (url, callback) {
	        var img = Util.Util.createImageElement();
	        img.onload = function () {
	            var image = new Image({
	                image: img
	            });
	            callback(image);
	        };
	        img.crossOrigin = 'Anonymous';
	        img.src = url;
	    };
	    return Image;
	}(Shape_1.Shape));
	exports.Image = Image;
	Image.prototype.className = 'Image';
	Global._registerNode(Image);
	Factory.Factory.addGetterSetter(Image, 'image');
	Factory.Factory.addComponentsGetterSetter(Image, 'crop', ['x', 'y', 'width', 'height']);
	Factory.Factory.addGetterSetter(Image, 'cropX', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Image, 'cropY', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Image, 'cropWidth', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Image, 'cropHeight', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(Image);
	});

	unwrapExports(Image_1);
	var Image_2 = Image_1.Image;

	var Label_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });






	var ATTR_CHANGE_LIST = [
	    'fontFamily',
	    'fontSize',
	    'fontStyle',
	    'padding',
	    'lineHeight',
	    'text',
	    'width'
	], CHANGE_KONVA = 'Change.konva', NONE = 'none', UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left', attrChangeListLen = ATTR_CHANGE_LIST.length;
	var Label = (function (_super) {
	    __extends(Label, _super);
	    function Label(config) {
	        var _this = _super.call(this, config) || this;
	        _this.on('add.konva', function (evt) {
	            this._addListeners(evt.child);
	            this._sync();
	        });
	        return _this;
	    }
	    Label.prototype.getText = function () {
	        return this.find('Text')[0];
	    };
	    Label.prototype.getTag = function () {
	        return this.find('Tag')[0];
	    };
	    Label.prototype._addListeners = function (text) {
	        var that = this, n;
	        var func = function () {
	            that._sync();
	        };
	        for (n = 0; n < attrChangeListLen; n++) {
	            text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
	        }
	    };
	    Label.prototype.getWidth = function () {
	        return this.getText().width();
	    };
	    Label.prototype.getHeight = function () {
	        return this.getText().height();
	    };
	    Label.prototype._sync = function () {
	        var text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x, y, pointerHeight;
	        if (text && tag) {
	            width = text.width();
	            height = text.height();
	            pointerDirection = tag.pointerDirection();
	            pointerWidth = tag.pointerWidth();
	            pointerHeight = tag.pointerHeight();
	            x = 0;
	            y = 0;
	            switch (pointerDirection) {
	                case UP:
	                    x = width / 2;
	                    y = -1 * pointerHeight;
	                    break;
	                case RIGHT:
	                    x = width + pointerWidth;
	                    y = height / 2;
	                    break;
	                case DOWN:
	                    x = width / 2;
	                    y = height + pointerHeight;
	                    break;
	                case LEFT:
	                    x = -1 * pointerWidth;
	                    y = height / 2;
	                    break;
	            }
	            tag.setAttrs({
	                x: -1 * x,
	                y: -1 * y,
	                width: width,
	                height: height
	            });
	            text.setAttrs({
	                x: -1 * x,
	                y: -1 * y
	            });
	        }
	    };
	    return Label;
	}(Group_1.Group));
	exports.Label = Label;
	Label.prototype.className = 'Label';
	Global._registerNode(Label);
	Util.Collection.mapMethods(Label);
	var Tag = (function (_super) {
	    __extends(Tag, _super);
	    function Tag() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Tag.prototype._sceneFunc = function (context) {
	        var width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = Math.min(this.cornerRadius(), width / 2, height / 2);
	        context.beginPath();
	        if (!cornerRadius) {
	            context.moveTo(0, 0);
	        }
	        else {
	            context.moveTo(cornerRadius, 0);
	        }
	        if (pointerDirection === UP) {
	            context.lineTo((width - pointerWidth) / 2, 0);
	            context.lineTo(width / 2, -1 * pointerHeight);
	            context.lineTo((width + pointerWidth) / 2, 0);
	        }
	        if (!cornerRadius) {
	            context.lineTo(width, 0);
	        }
	        else {
	            context.lineTo(width - cornerRadius, 0);
	            context.arc(width - cornerRadius, cornerRadius, cornerRadius, (Math.PI * 3) / 2, 0, false);
	        }
	        if (pointerDirection === RIGHT) {
	            context.lineTo(width, (height - pointerHeight) / 2);
	            context.lineTo(width + pointerWidth, height / 2);
	            context.lineTo(width, (height + pointerHeight) / 2);
	        }
	        if (!cornerRadius) {
	            context.lineTo(width, height);
	        }
	        else {
	            context.lineTo(width, height - cornerRadius);
	            context.arc(width - cornerRadius, height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
	        }
	        if (pointerDirection === DOWN) {
	            context.lineTo((width + pointerWidth) / 2, height);
	            context.lineTo(width / 2, height + pointerHeight);
	            context.lineTo((width - pointerWidth) / 2, height);
	        }
	        if (!cornerRadius) {
	            context.lineTo(0, height);
	        }
	        else {
	            context.lineTo(cornerRadius, height);
	            context.arc(cornerRadius, height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
	        }
	        if (pointerDirection === LEFT) {
	            context.lineTo(0, (height + pointerHeight) / 2);
	            context.lineTo(-1 * pointerWidth, height / 2);
	            context.lineTo(0, (height - pointerHeight) / 2);
	        }
	        if (cornerRadius) {
	            context.lineTo(0, cornerRadius);
	            context.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, (Math.PI * 3) / 2, false);
	        }
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Tag.prototype.getSelfRect = function () {
	        var x = 0, y = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
	        if (direction === UP) {
	            y -= pointerHeight;
	            height += pointerHeight;
	        }
	        else if (direction === DOWN) {
	            height += pointerHeight;
	        }
	        else if (direction === LEFT) {
	            x -= pointerWidth * 1.5;
	            width += pointerWidth;
	        }
	        else if (direction === RIGHT) {
	            width += pointerWidth * 1.5;
	        }
	        return {
	            x: x,
	            y: y,
	            width: width,
	            height: height
	        };
	    };
	    return Tag;
	}(Shape_1.Shape));
	exports.Tag = Tag;
	Tag.prototype.className = 'Tag';
	Global._registerNode(Tag);
	Factory.Factory.addGetterSetter(Tag, 'pointerDirection', NONE);
	Factory.Factory.addGetterSetter(Tag, 'pointerWidth', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Tag, 'pointerHeight', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Tag, 'cornerRadius', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(Tag);
	});

	unwrapExports(Label_1);
	var Label_2 = Label_1.Label;
	var Label_3 = Label_1.Tag;

	var Path_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });




	var Path = (function (_super) {
	    __extends(Path, _super);
	    function Path(config) {
	        var _this = _super.call(this, config) || this;
	        _this.dataArray = [];
	        _this.pathLength = 0;
	        _this.dataArray = Path.parsePathData(_this.data());
	        _this.pathLength = 0;
	        for (var i = 0; i < _this.dataArray.length; ++i) {
	            _this.pathLength += _this.dataArray[i].pathLength;
	        }
	        _this.on('dataChange.konva', function () {
	            this.dataArray = Path.parsePathData(this.data());
	            this.pathLength = 0;
	            for (var i = 0; i < this.dataArray.length; ++i) {
	                this.pathLength += this.dataArray[i].pathLength;
	            }
	        });
	        return _this;
	    }
	    Path.prototype._sceneFunc = function (context) {
	        var ca = this.dataArray;
	        context.beginPath();
	        for (var n = 0; n < ca.length; n++) {
	            var c = ca[n].command;
	            var p = ca[n].points;
	            switch (c) {
	                case 'L':
	                    context.lineTo(p[0], p[1]);
	                    break;
	                case 'M':
	                    context.moveTo(p[0], p[1]);
	                    break;
	                case 'C':
	                    context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
	                    break;
	                case 'Q':
	                    context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
	                    break;
	                case 'A':
	                    var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
	                    var r = rx > ry ? rx : ry;
	                    var scaleX = rx > ry ? 1 : rx / ry;
	                    var scaleY = rx > ry ? ry / rx : 1;
	                    context.translate(cx, cy);
	                    context.rotate(psi);
	                    context.scale(scaleX, scaleY);
	                    context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
	                    context.scale(1 / scaleX, 1 / scaleY);
	                    context.rotate(-psi);
	                    context.translate(-cx, -cy);
	                    break;
	                case 'z':
	                    context.closePath();
	                    break;
	            }
	        }
	        context.fillStrokeShape(this);
	    };
	    Path.prototype.getSelfRect = function () {
	        var points = [];
	        this.dataArray.forEach(function (data) {
	            points = points.concat(data.points);
	        });
	        var minX = points[0];
	        var maxX = points[0];
	        var minY = points[1];
	        var maxY = points[1];
	        var x, y;
	        for (var i = 0; i < points.length / 2; i++) {
	            x = points[i * 2];
	            y = points[i * 2 + 1];
	            if (!isNaN(x)) {
	                minX = Math.min(minX, x);
	                maxX = Math.max(maxX, x);
	            }
	            if (!isNaN(y)) {
	                minY = Math.min(minY, y);
	                maxY = Math.max(maxY, y);
	            }
	        }
	        return {
	            x: Math.round(minX),
	            y: Math.round(minY),
	            width: Math.round(maxX - minX),
	            height: Math.round(maxY - minY)
	        };
	    };
	    Path.prototype.getLength = function () {
	        return this.pathLength;
	    };
	    Path.prototype.getPointAtLength = function (length) {
	        var point, i = 0, ii = this.dataArray.length;
	        if (!ii) {
	            return null;
	        }
	        while (i < ii && length > this.dataArray[i].pathLength) {
	            length -= this.dataArray[i].pathLength;
	            ++i;
	        }
	        if (i === ii) {
	            point = this.dataArray[i - 1].points.slice(-2);
	            return {
	                x: point[0],
	                y: point[1]
	            };
	        }
	        if (length < 0.01) {
	            point = this.dataArray[i].points.slice(0, 2);
	            return {
	                x: point[0],
	                y: point[1]
	            };
	        }
	        var cp = this.dataArray[i];
	        var p = cp.points;
	        switch (cp.command) {
	            case 'L':
	                return Path.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
	            case 'C':
	                return Path.getPointOnCubicBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[4], p[5]);
	            case 'Q':
	                return Path.getPointOnQuadraticBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3]);
	            case 'A':
	                var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6];
	                theta += (dTheta * length) / cp.pathLength;
	                return Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
	        }
	        return null;
	    };
	    Path.getLineLength = function (x1, y1, x2, y2) {
	        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	    };
	    Path.getPointOnLine = function (dist, P1x, P1y, P2x, P2y, fromX, fromY) {
	        if (fromX === undefined) {
	            fromX = P1x;
	        }
	        if (fromY === undefined) {
	            fromY = P1y;
	        }
	        var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
	        var run = Math.sqrt((dist * dist) / (1 + m * m));
	        if (P2x < P1x) {
	            run *= -1;
	        }
	        var rise = m * run;
	        var pt;
	        if (P2x === P1x) {
	            pt = {
	                x: fromX,
	                y: fromY + rise
	            };
	        }
	        else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
	            pt = {
	                x: fromX + run,
	                y: fromY + rise
	            };
	        }
	        else {
	            var ix, iy;
	            var len = this.getLineLength(P1x, P1y, P2x, P2y);
	            if (len < 0.00000001) {
	                return undefined;
	            }
	            var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
	            u = u / (len * len);
	            ix = P1x + u * (P2x - P1x);
	            iy = P1y + u * (P2y - P1y);
	            var pRise = this.getLineLength(fromX, fromY, ix, iy);
	            var pRun = Math.sqrt(dist * dist - pRise * pRise);
	            run = Math.sqrt((pRun * pRun) / (1 + m * m));
	            if (P2x < P1x) {
	                run *= -1;
	            }
	            rise = m * run;
	            pt = {
	                x: ix + run,
	                y: iy + rise
	            };
	        }
	        return pt;
	    };
	    Path.getPointOnCubicBezier = function (pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
	        function CB1(t) {
	            return t * t * t;
	        }
	        function CB2(t) {
	            return 3 * t * t * (1 - t);
	        }
	        function CB3(t) {
	            return 3 * t * (1 - t) * (1 - t);
	        }
	        function CB4(t) {
	            return (1 - t) * (1 - t) * (1 - t);
	        }
	        var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
	        var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
	        return {
	            x: x,
	            y: y
	        };
	    };
	    Path.getPointOnQuadraticBezier = function (pct, P1x, P1y, P2x, P2y, P3x, P3y) {
	        function QB1(t) {
	            return t * t;
	        }
	        function QB2(t) {
	            return 2 * t * (1 - t);
	        }
	        function QB3(t) {
	            return (1 - t) * (1 - t);
	        }
	        var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
	        var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
	        return {
	            x: x,
	            y: y
	        };
	    };
	    Path.getPointOnEllipticalArc = function (cx, cy, rx, ry, theta, psi) {
	        var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
	        var pt = {
	            x: rx * Math.cos(theta),
	            y: ry * Math.sin(theta)
	        };
	        return {
	            x: cx + (pt.x * cosPsi - pt.y * sinPsi),
	            y: cy + (pt.x * sinPsi + pt.y * cosPsi)
	        };
	    };
	    Path.parsePathData = function (data) {
	        if (!data) {
	            return [];
	        }
	        var cs = data;
	        var cc = [
	            'm',
	            'M',
	            'l',
	            'L',
	            'v',
	            'V',
	            'h',
	            'H',
	            'z',
	            'Z',
	            'c',
	            'C',
	            'q',
	            'Q',
	            't',
	            'T',
	            's',
	            'S',
	            'a',
	            'A'
	        ];
	        cs = cs.replace(new RegExp(' ', 'g'), ',');
	        for (var n = 0; n < cc.length; n++) {
	            cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
	        }
	        var arr = cs.split('|');
	        var ca = [];
	        var coords = [];
	        var cpx = 0;
	        var cpy = 0;
	        var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
	        var match;
	        for (n = 1; n < arr.length; n++) {
	            var str = arr[n];
	            var c = str.charAt(0);
	            str = str.slice(1);
	            coords.length = 0;
	            while ((match = re.exec(str))) {
	                coords.push(match[0]);
	            }
	            var p = [];
	            for (var j = 0, jlen = coords.length; j < jlen; j++) {
	                var parsed = parseFloat(coords[j]);
	                if (!isNaN(parsed)) {
	                    p.push(parsed);
	                }
	                else {
	                    p.push(0);
	                }
	            }
	            while (p.length > 0) {
	                if (isNaN(p[0])) {
	                    break;
	                }
	                var cmd = null;
	                var points = [];
	                var startX = cpx, startY = cpy;
	                var prevCmd, ctlPtx, ctlPty;
	                var rx, ry, psi, fa, fs, x1, y1;
	                switch (c) {
	                    case 'l':
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'L':
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        points.push(cpx, cpy);
	                        break;
	                    case 'm':
	                        var dx = p.shift();
	                        var dy = p.shift();
	                        cpx += dx;
	                        cpy += dy;
	                        cmd = 'M';
	                        if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
	                            for (var idx = ca.length - 2; idx >= 0; idx--) {
	                                if (ca[idx].command === 'M') {
	                                    cpx = ca[idx].points[0] + dx;
	                                    cpy = ca[idx].points[1] + dy;
	                                    break;
	                                }
	                            }
	                        }
	                        points.push(cpx, cpy);
	                        c = 'l';
	                        break;
	                    case 'M':
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'M';
	                        points.push(cpx, cpy);
	                        c = 'L';
	                        break;
	                    case 'h':
	                        cpx += p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'H':
	                        cpx = p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'v':
	                        cpy += p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'V':
	                        cpy = p.shift();
	                        cmd = 'L';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'C':
	                        points.push(p.shift(), p.shift(), p.shift(), p.shift());
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        points.push(cpx, cpy);
	                        break;
	                    case 'c':
	                        points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'C';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'S':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if (prevCmd.command === 'C') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
	                            ctlPty = cpy + (cpy - prevCmd.points[3]);
	                        }
	                        points.push(ctlPtx, ctlPty, p.shift(), p.shift());
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'C';
	                        points.push(cpx, cpy);
	                        break;
	                    case 's':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if (prevCmd.command === 'C') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
	                            ctlPty = cpy + (cpy - prevCmd.points[3]);
	                        }
	                        points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'C';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'Q':
	                        points.push(p.shift(), p.shift());
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        points.push(cpx, cpy);
	                        break;
	                    case 'q':
	                        points.push(cpx + p.shift(), cpy + p.shift());
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'Q';
	                        points.push(cpx, cpy);
	                        break;
	                    case 'T':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if (prevCmd.command === 'Q') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
	                            ctlPty = cpy + (cpy - prevCmd.points[1]);
	                        }
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'Q';
	                        points.push(ctlPtx, ctlPty, cpx, cpy);
	                        break;
	                    case 't':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        prevCmd = ca[ca.length - 1];
	                        if (prevCmd.command === 'Q') {
	                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
	                            ctlPty = cpy + (cpy - prevCmd.points[1]);
	                        }
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'Q';
	                        points.push(ctlPtx, ctlPty, cpx, cpy);
	                        break;
	                    case 'A':
	                        rx = p.shift();
	                        ry = p.shift();
	                        psi = p.shift();
	                        fa = p.shift();
	                        fs = p.shift();
	                        x1 = cpx;
	                        y1 = cpy;
	                        cpx = p.shift();
	                        cpy = p.shift();
	                        cmd = 'A';
	                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
	                        break;
	                    case 'a':
	                        rx = p.shift();
	                        ry = p.shift();
	                        psi = p.shift();
	                        fa = p.shift();
	                        fs = p.shift();
	                        x1 = cpx;
	                        y1 = cpy;
	                        cpx += p.shift();
	                        cpy += p.shift();
	                        cmd = 'A';
	                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
	                        break;
	                }
	                ca.push({
	                    command: cmd || c,
	                    points: points,
	                    start: {
	                        x: startX,
	                        y: startY
	                    },
	                    pathLength: this.calcLength(startX, startY, cmd || c, points)
	                });
	            }
	            if (c === 'z' || c === 'Z') {
	                ca.push({
	                    command: 'z',
	                    points: [],
	                    start: undefined,
	                    pathLength: 0
	                });
	            }
	        }
	        return ca;
	    };
	    Path.calcLength = function (x, y, cmd, points) {
	        var len, p1, p2, t;
	        var path = Path;
	        switch (cmd) {
	            case 'L':
	                return path.getLineLength(x, y, points[0], points[1]);
	            case 'C':
	                len = 0.0;
	                p1 = path.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
	                for (t = 0.01; t <= 1; t += 0.01) {
	                    p2 = path.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
	                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                    p1 = p2;
	                }
	                return len;
	            case 'Q':
	                len = 0.0;
	                p1 = path.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
	                for (t = 0.01; t <= 1; t += 0.01) {
	                    p2 = path.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
	                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                    p1 = p2;
	                }
	                return len;
	            case 'A':
	                len = 0.0;
	                var start = points[4];
	                var dTheta = points[5];
	                var end = points[4] + dTheta;
	                var inc = Math.PI / 180.0;
	                if (Math.abs(start - end) < inc) {
	                    inc = Math.abs(start - end);
	                }
	                p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
	                if (dTheta < 0) {
	                    for (t = start - inc; t > end; t -= inc) {
	                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
	                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                        p1 = p2;
	                    }
	                }
	                else {
	                    for (t = start + inc; t < end; t += inc) {
	                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
	                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                        p1 = p2;
	                    }
	                }
	                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
	                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
	                return len;
	        }
	        return 0;
	    };
	    Path.convertEndpointToCenterParameterization = function (x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
	        var psi = psiDeg * (Math.PI / 180.0);
	        var xp = (Math.cos(psi) * (x1 - x2)) / 2.0 + (Math.sin(psi) * (y1 - y2)) / 2.0;
	        var yp = (-1 * Math.sin(psi) * (x1 - x2)) / 2.0 +
	            (Math.cos(psi) * (y1 - y2)) / 2.0;
	        var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
	        if (lambda > 1) {
	            rx *= Math.sqrt(lambda);
	            ry *= Math.sqrt(lambda);
	        }
	        var f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
	            (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
	        if (fa === fs) {
	            f *= -1;
	        }
	        if (isNaN(f)) {
	            f = 0;
	        }
	        var cxp = (f * rx * yp) / ry;
	        var cyp = (f * -ry * xp) / rx;
	        var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
	        var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
	        var vMag = function (v) {
	            return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	        };
	        var vRatio = function (u, v) {
	            return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	        };
	        var vAngle = function (u, v) {
	            return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
	        };
	        var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
	        var u = [(xp - cxp) / rx, (yp - cyp) / ry];
	        var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
	        var dTheta = vAngle(u, v);
	        if (vRatio(u, v) <= -1) {
	            dTheta = Math.PI;
	        }
	        if (vRatio(u, v) >= 1) {
	            dTheta = 0;
	        }
	        if (fs === 0 && dTheta > 0) {
	            dTheta = dTheta - 2 * Math.PI;
	        }
	        if (fs === 1 && dTheta < 0) {
	            dTheta = dTheta + 2 * Math.PI;
	        }
	        return [cx, cy, rx, ry, theta, dTheta, psi, fs];
	    };
	    return Path;
	}(Shape_1.Shape));
	exports.Path = Path;
	Path.prototype.className = 'Path';
	Path.prototype._attrsAffectingSize = ['data'];
	Global._registerNode(Path);
	Factory.Factory.addGetterSetter(Path, 'data');
	Util.Collection.mapMethods(Path);
	});

	unwrapExports(Path_1);
	var Path_2 = Path_1.Path;

	var Rect_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });




	var Rect = (function (_super) {
	    __extends(Rect, _super);
	    function Rect() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Rect.prototype._sceneFunc = function (context) {
	        var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
	        context.beginPath();
	        if (!cornerRadius) {
	            context.rect(0, 0, width, height);
	        }
	        else {
	            var topLeft = 0;
	            var topRight = 0;
	            var bottomLeft = 0;
	            var bottomRight = 0;
	            if (typeof cornerRadius === 'number') {
	                topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
	            }
	            else {
	                topLeft = Math.min(cornerRadius[0], width / 2, height / 2);
	                topRight = Math.min(cornerRadius[1], width / 2, height / 2);
	                bottomRight = Math.min(cornerRadius[2], width / 2, height / 2);
	                bottomLeft = Math.min(cornerRadius[3], width / 2, height / 2);
	            }
	            context.moveTo(topLeft, 0);
	            context.lineTo(width - topRight, 0);
	            context.arc(width - topRight, topRight, topRight, (Math.PI * 3) / 2, 0, false);
	            context.lineTo(width, height - bottomRight);
	            context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
	            context.lineTo(bottomLeft, height);
	            context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
	            context.lineTo(0, topLeft);
	            context.arc(topLeft, topLeft, topLeft, Math.PI, (Math.PI * 3) / 2, false);
	        }
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    return Rect;
	}(Shape_1.Shape));
	exports.Rect = Rect;
	Rect.prototype.className = 'Rect';
	Global._registerNode(Rect);
	Factory.Factory.addGetterSetter(Rect, 'cornerRadius', 0);
	Util.Collection.mapMethods(Rect);
	});

	unwrapExports(Rect_1);
	var Rect_2 = Rect_1.Rect;

	var RegularPolygon_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var RegularPolygon = (function (_super) {
	    __extends(RegularPolygon, _super);
	    function RegularPolygon() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    RegularPolygon.prototype._sceneFunc = function (context) {
	        var sides = this.sides(), radius = this.radius(), n, x, y;
	        context.beginPath();
	        context.moveTo(0, 0 - radius);
	        for (n = 1; n < sides; n++) {
	            x = radius * Math.sin((n * 2 * Math.PI) / sides);
	            y = -1 * radius * Math.cos((n * 2 * Math.PI) / sides);
	            context.lineTo(x, y);
	        }
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    RegularPolygon.prototype.getWidth = function () {
	        return this.radius() * 2;
	    };
	    RegularPolygon.prototype.getHeight = function () {
	        return this.radius() * 2;
	    };
	    RegularPolygon.prototype.setWidth = function (width) {
	        this.radius(width / 2);
	    };
	    RegularPolygon.prototype.setHeight = function (height) {
	        this.radius(height / 2);
	    };
	    return RegularPolygon;
	}(Shape_1.Shape));
	exports.RegularPolygon = RegularPolygon;
	RegularPolygon.prototype.className = 'RegularPolygon';
	RegularPolygon.prototype._centroid = true;
	RegularPolygon.prototype._attrsAffectingSize = ['radius'];
	Global._registerNode(RegularPolygon);
	Factory.Factory.addGetterSetter(RegularPolygon, 'radius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(RegularPolygon, 'sides', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(RegularPolygon);
	});

	unwrapExports(RegularPolygon_1);
	var RegularPolygon_2 = RegularPolygon_1.RegularPolygon;

	var Ring_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var PIx2 = Math.PI * 2;
	var Ring = (function (_super) {
	    __extends(Ring, _super);
	    function Ring() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Ring.prototype._sceneFunc = function (context) {
	        context.beginPath();
	        context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
	        context.moveTo(this.outerRadius(), 0);
	        context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Ring.prototype.getWidth = function () {
	        return this.outerRadius() * 2;
	    };
	    Ring.prototype.getHeight = function () {
	        return this.outerRadius() * 2;
	    };
	    Ring.prototype.setWidth = function (width) {
	        this.outerRadius(width / 2);
	    };
	    Ring.prototype.setHeight = function (height) {
	        this.outerRadius(height / 2);
	    };
	    return Ring;
	}(Shape_1.Shape));
	exports.Ring = Ring;
	Ring.prototype.className = 'Ring';
	Ring.prototype._centroid = true;
	Ring.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
	Global._registerNode(Ring);
	Factory.Factory.addGetterSetter(Ring, 'innerRadius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Ring, 'outerRadius', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(Ring);
	});

	unwrapExports(Ring_1);
	var Ring_2 = Ring_1.Ring;

	var Sprite_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });






	var Sprite = (function (_super) {
	    __extends(Sprite, _super);
	    function Sprite(config) {
	        var _this = _super.call(this, config) || this;
	        _this._updated = true;
	        _this.anim = new Animation_1.Animation(function () {
	            var updated = _this._updated;
	            _this._updated = false;
	            return updated;
	        });
	        _this.on('animationChange.konva', function () {
	            this.frameIndex(0);
	        });
	        _this.on('frameIndexChange.konva', function () {
	            this._updated = true;
	        });
	        _this.on('frameRateChange.konva', function () {
	            if (!this.anim.isRunning()) {
	                return;
	            }
	            clearInterval(this.interval);
	            this._setInterval();
	        });
	        return _this;
	    }
	    Sprite.prototype._sceneFunc = function (context) {
	        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x = set[ix4 + 0], y = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
	        if (this.hasFill() || this.hasStroke()) {
	            context.beginPath();
	            context.rect(0, 0, width, height);
	            context.closePath();
	            context.fillStrokeShape(this);
	        }
	        if (image) {
	            if (offsets) {
	                var offset = offsets[anim], ix2 = index * 2;
	                context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
	            }
	            else {
	                context.drawImage(image, x, y, width, height, 0, 0, width, height);
	            }
	        }
	    };
	    Sprite.prototype._hitFunc = function (context) {
	        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
	        context.beginPath();
	        if (offsets) {
	            var offset = offsets[anim];
	            var ix2 = index * 2;
	            context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
	        }
	        else {
	            context.rect(0, 0, width, height);
	        }
	        context.closePath();
	        context.fillShape(this);
	    };
	    Sprite.prototype._useBufferCanvas = function () {
	        return ((this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasStroke());
	    };
	    Sprite.prototype._setInterval = function () {
	        var that = this;
	        this.interval = setInterval(function () {
	            that._updateIndex();
	        }, 1000 / this.frameRate());
	    };
	    Sprite.prototype.start = function () {
	        if (this.isRunning()) {
	            return;
	        }
	        var layer = this.getLayer();
	        this.anim.setLayers(layer);
	        this._setInterval();
	        this.anim.start();
	    };
	    Sprite.prototype.stop = function () {
	        this.anim.stop();
	        clearInterval(this.interval);
	    };
	    Sprite.prototype.isRunning = function () {
	        return this.anim.isRunning();
	    };
	    Sprite.prototype._updateIndex = function () {
	        var index = this.frameIndex(), animation = this.animation(), animations = this.animations(), anim = animations[animation], len = anim.length / 4;
	        if (index < len - 1) {
	            this.frameIndex(index + 1);
	        }
	        else {
	            this.frameIndex(0);
	        }
	    };
	    return Sprite;
	}(Shape_1.Shape));
	exports.Sprite = Sprite;
	Sprite.prototype.className = 'Sprite';
	Global._registerNode(Sprite);
	Factory.Factory.addGetterSetter(Sprite, 'animation');
	Factory.Factory.addGetterSetter(Sprite, 'animations');
	Factory.Factory.addGetterSetter(Sprite, 'frameOffsets');
	Factory.Factory.addGetterSetter(Sprite, 'image');
	Factory.Factory.addGetterSetter(Sprite, 'frameIndex', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Sprite, 'frameRate', 17, Validators.getNumberValidator());
	Factory.Factory.backCompat(Sprite, {
	    index: 'frameIndex',
	    getIndex: 'getFrameIndex',
	    setIndex: 'setFrameIndex'
	});
	Util.Collection.mapMethods(Sprite);
	});

	unwrapExports(Sprite_1);
	var Sprite_2 = Sprite_1.Sprite;

	var Star_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Star = (function (_super) {
	    __extends(Star, _super);
	    function Star() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Star.prototype._sceneFunc = function (context) {
	        var innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
	        context.beginPath();
	        context.moveTo(0, 0 - outerRadius);
	        for (var n = 1; n < numPoints * 2; n++) {
	            var radius = n % 2 === 0 ? outerRadius : innerRadius;
	            var x = radius * Math.sin((n * Math.PI) / numPoints);
	            var y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
	            context.lineTo(x, y);
	        }
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Star.prototype.getWidth = function () {
	        return this.outerRadius() * 2;
	    };
	    Star.prototype.getHeight = function () {
	        return this.outerRadius() * 2;
	    };
	    Star.prototype.setWidth = function (width) {
	        this.outerRadius(width / 2);
	    };
	    Star.prototype.setHeight = function (height) {
	        this.outerRadius(height / 2);
	    };
	    return Star;
	}(Shape_1.Shape));
	exports.Star = Star;
	Star.prototype.className = 'Star';
	Star.prototype._centroid = true;
	Star.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
	Global._registerNode(Star);
	Factory.Factory.addGetterSetter(Star, 'numPoints', 5, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Star, 'innerRadius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Star, 'outerRadius', 0, Validators.getNumberValidator());
	Util.Collection.mapMethods(Star);
	});

	unwrapExports(Star_1);
	var Star_2 = Star_1.Star;

	var Text_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Global_2 = Global;
	var AUTO = 'auto', CENTER = 'center', JUSTIFY = 'justify', CHANGE_KONVA = 'Change.konva', CONTEXT_2D = '2d', DASH = '-', LEFT = 'left', TEXT = 'text', TEXT_UPPER = 'Text', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle', NORMAL = 'normal', PX_SPACE = 'px ', SPACE = ' ', RIGHT = 'right', WORD = 'word', CHAR = 'char', NONE = 'none', ELLIPSIS = '…', ATTR_CHANGE_LIST = [
	    'fontFamily',
	    'fontSize',
	    'fontStyle',
	    'fontVariant',
	    'padding',
	    'align',
	    'verticalAlign',
	    'lineHeight',
	    'text',
	    'width',
	    'height',
	    'wrap',
	    'ellipsis',
	    'letterSpacing'
	], attrChangeListLen = ATTR_CHANGE_LIST.length;
	var dummyContext;
	function getDummyContext() {
	    if (dummyContext) {
	        return dummyContext;
	    }
	    dummyContext = Util.Util.createCanvasElement().getContext(CONTEXT_2D);
	    return dummyContext;
	}
	function _fillFunc(context) {
	    context.fillText(this._partialText, this._partialTextX, this._partialTextY);
	}
	function _strokeFunc(context) {
	    context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
	}
	function checkDefaultFill(config) {
	    config = config || {};
	    if (!config.fillLinearGradientColorStops &&
	        !config.fillRadialGradientColorStops &&
	        !config.fillPatternImage) {
	        config.fill = config.fill || 'black';
	    }
	    return config;
	}
	var Text = (function (_super) {
	    __extends(Text, _super);
	    function Text(config) {
	        var _this = _super.call(this, checkDefaultFill(config)) || this;
	        _this._partialTextX = 0;
	        _this._partialTextY = 0;
	        for (var n = 0; n < attrChangeListLen; n++) {
	            _this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, _this._setTextData);
	        }
	        _this._setTextData();
	        return _this;
	    }
	    Text.prototype._sceneFunc = function (context) {
	        var padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, textArr = this.textArr, textArrLen = textArr.length, verticalAlign = this.verticalAlign(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf('underline') !== -1, shouldLineThrough = textDecoration.indexOf('line-through') !== -1, n;
	        var translateY = 0;
	        var translateY = lineHeightPx / 2;
	        var lineTranslateX = 0;
	        var lineTranslateY = 0;
	        context.setAttr('font', this._getContextFont());
	        context.setAttr('textBaseline', MIDDLE);
	        context.setAttr('textAlign', LEFT);
	        if (verticalAlign === MIDDLE) {
	            alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
	        }
	        else if (verticalAlign === BOTTOM) {
	            alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
	        }
	        context.translate(padding, alignY + padding);
	        for (n = 0; n < textArrLen; n++) {
	            var lineTranslateX = 0;
	            var lineTranslateY = 0;
	            var obj = textArr[n], text = obj.text, width = obj.width, lastLine = n !== textArrLen - 1, spacesNumber, oneWord, lineWidth;
	            context.save();
	            if (align === RIGHT) {
	                lineTranslateX += totalWidth - width - padding * 2;
	            }
	            else if (align === CENTER) {
	                lineTranslateX += (totalWidth - width - padding * 2) / 2;
	            }
	            if (shouldUnderline) {
	                context.save();
	                context.beginPath();
	                context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
	                spacesNumber = text.split(' ').length - 1;
	                oneWord = spacesNumber === 0;
	                lineWidth =
	                    align === JUSTIFY && lastLine && !oneWord
	                        ? totalWidth - padding * 2
	                        : width;
	                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
	                context.lineWidth = fontSize / 15;
	                context.strokeStyle = fill;
	                context.stroke();
	                context.restore();
	            }
	            if (shouldLineThrough) {
	                context.save();
	                context.beginPath();
	                context.moveTo(lineTranslateX, translateY + lineTranslateY);
	                spacesNumber = text.split(' ').length - 1;
	                oneWord = spacesNumber === 0;
	                lineWidth =
	                    align === JUSTIFY && lastLine && !oneWord
	                        ? totalWidth - padding * 2
	                        : width;
	                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
	                context.lineWidth = fontSize / 15;
	                context.strokeStyle = fill;
	                context.stroke();
	                context.restore();
	            }
	            if (letterSpacing !== 0 || align === JUSTIFY) {
	                spacesNumber = text.split(' ').length - 1;
	                for (var li = 0; li < text.length; li++) {
	                    var letter = text[li];
	                    if (letter === ' ' && n !== textArrLen - 1 && align === JUSTIFY) {
	                        lineTranslateX += Math.floor((totalWidth - padding * 2 - width) / spacesNumber);
	                    }
	                    this._partialTextX = lineTranslateX;
	                    this._partialTextY = translateY + lineTranslateY;
	                    this._partialText = letter;
	                    context.fillStrokeShape(this);
	                    lineTranslateX +=
	                        Math.round(this.measureSize(letter).width) + letterSpacing;
	                }
	            }
	            else {
	                this._partialTextX = lineTranslateX;
	                this._partialTextY = translateY + lineTranslateY;
	                this._partialText = text;
	                context.fillStrokeShape(this);
	            }
	            context.restore();
	            if (textArrLen > 1) {
	                translateY += lineHeightPx;
	            }
	        }
	    };
	    Text.prototype._hitFunc = function (context) {
	        var width = this.getWidth(), height = this.getHeight();
	        context.beginPath();
	        context.rect(0, 0, width, height);
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Text.prototype.setText = function (text) {
	        var str = Util.Util._isString(text) ? text : (text || '').toString();
	        this._setAttr(TEXT, str);
	        return this;
	    };
	    Text.prototype.getWidth = function () {
	        var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
	        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
	    };
	    Text.prototype.getHeight = function () {
	        var isAuto = this.attrs.height === AUTO || this.attrs.height === undefined;
	        return isAuto
	            ? this.fontSize() * this.textArr.length * this.lineHeight() +
	                this.padding() * 2
	            : this.attrs.height;
	    };
	    Text.prototype.getTextWidth = function () {
	        return this.textWidth;
	    };
	    Text.prototype.getTextHeight = function () {
	        Util.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
	        return this.textHeight;
	    };
	    Text.prototype.measureSize = function (text) {
	        var _context = getDummyContext(), fontSize = this.fontSize(), metrics;
	        _context.save();
	        _context.font = this._getContextFont();
	        metrics = _context.measureText(text);
	        _context.restore();
	        return {
	            width: metrics.width,
	            height: fontSize
	        };
	    };
	    Text.prototype._getContextFont = function () {
	        if (Global.Konva.UA.isIE) {
	            return (this.fontStyle() +
	                SPACE +
	                this.fontSize() +
	                PX_SPACE +
	                this.fontFamily());
	        }
	        return (this.fontStyle() +
	            SPACE +
	            this.fontVariant() +
	            SPACE +
	            this.fontSize() +
	            PX_SPACE +
	            this.fontFamily());
	    };
	    Text.prototype._addTextLine = function (line) {
	        if (this.align() === JUSTIFY) {
	            line = line.trim();
	        }
	        var width = this._getTextWidth(line);
	        return this.textArr.push({ text: line, width: width });
	    };
	    Text.prototype._getTextWidth = function (text) {
	        var letterSpacing = this.letterSpacing();
	        var length = text.length;
	        return (getDummyContext().measureText(text).width +
	            (length ? letterSpacing * (length - 1) : 0));
	    };
	    Text.prototype._setTextData = function () {
	        var lines = this.text().split('\n'), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== undefined, fixedHeight = height !== AUTO && height !== undefined, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis() && !shouldWrap;
	        this.textArr = [];
	        getDummyContext().font = this._getContextFont();
	        var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
	        for (var i = 0, max = lines.length; i < max; ++i) {
	            var line = lines[i];
	            var lineWidth = this._getTextWidth(line);
	            if (fixedWidth && lineWidth > maxWidth) {
	                while (line.length > 0) {
	                    var low = 0, high = line.length, match = '', matchWidth = 0;
	                    while (low < high) {
	                        var mid = (low + high) >>> 1, substr = line.slice(0, mid + 1), substrWidth = this._getTextWidth(substr) + additionalWidth;
	                        if (substrWidth <= maxWidth) {
	                            low = mid + 1;
	                            match = substr + (shouldAddEllipsis ? ELLIPSIS : '');
	                            matchWidth = substrWidth;
	                        }
	                        else {
	                            high = mid;
	                        }
	                    }
	                    if (match) {
	                        if (wrapAtWord) {
	                            var wrapIndex;
	                            var nextChar = line[match.length];
	                            var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
	                            if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
	                                wrapIndex = match.length;
	                            }
	                            else {
	                                wrapIndex =
	                                    Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) +
	                                        1;
	                            }
	                            if (wrapIndex > 0) {
	                                low = wrapIndex;
	                                match = match.slice(0, low);
	                                matchWidth = this._getTextWidth(match);
	                            }
	                        }
	                        match = match.trimRight();
	                        this._addTextLine(match);
	                        textWidth = Math.max(textWidth, matchWidth);
	                        currentHeightPx += lineHeightPx;
	                        if (!shouldWrap ||
	                            (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)) {
	                            break;
	                        }
	                        line = line.slice(low);
	                        line = line.trimLeft();
	                        if (line.length > 0) {
	                            lineWidth = this._getTextWidth(line);
	                            if (lineWidth <= maxWidth) {
	                                this._addTextLine(line);
	                                currentHeightPx += lineHeightPx;
	                                textWidth = Math.max(textWidth, lineWidth);
	                                break;
	                            }
	                        }
	                    }
	                    else {
	                        break;
	                    }
	                }
	            }
	            else {
	                this._addTextLine(line);
	                currentHeightPx += lineHeightPx;
	                textWidth = Math.max(textWidth, lineWidth);
	            }
	            if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
	                break;
	            }
	        }
	        this.textHeight = fontSize;
	        this.textWidth = textWidth;
	    };
	    Text.prototype.getStrokeScaleEnabled = function () {
	        return true;
	    };
	    return Text;
	}(Shape_1.Shape));
	exports.Text = Text;
	Text.prototype._fillFunc = _fillFunc;
	Text.prototype._strokeFunc = _strokeFunc;
	Text.prototype.className = TEXT_UPPER;
	Text.prototype._attrsAffectingSize = [
	    'text',
	    'fontSize',
	    'padding',
	    'wrap',
	    'lineHeight'
	];
	Global_2._registerNode(Text);
	Factory.Factory.overWriteSetter(Text, 'width', Validators.getNumberOrAutoValidator());
	Factory.Factory.overWriteSetter(Text, 'height', Validators.getNumberOrAutoValidator());
	Factory.Factory.addGetterSetter(Text, 'fontFamily', 'Arial');
	Factory.Factory.addGetterSetter(Text, 'fontSize', 12, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Text, 'fontStyle', NORMAL);
	Factory.Factory.addGetterSetter(Text, 'fontVariant', NORMAL);
	Factory.Factory.addGetterSetter(Text, 'padding', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Text, 'align', LEFT);
	Factory.Factory.addGetterSetter(Text, 'verticalAlign', TOP);
	Factory.Factory.addGetterSetter(Text, 'lineHeight', 1, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Text, 'wrap', WORD);
	Factory.Factory.addGetterSetter(Text, 'ellipsis', false);
	Factory.Factory.addGetterSetter(Text, 'letterSpacing', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Text, 'text', '', Validators.getStringValidator());
	Factory.Factory.addGetterSetter(Text, 'textDecoration', '');
	Util.Collection.mapMethods(Text);
	});

	unwrapExports(Text_1);
	var Text_2 = Text_1.Text;

	var TextPath_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });







	var EMPTY_STRING = '', NORMAL = 'normal';
	function _fillFunc(context) {
	    context.fillText(this.partialText, 0, 0);
	}
	function _strokeFunc(context) {
	    context.strokeText(this.partialText, 0, 0);
	}
	var TextPath = (function (_super) {
	    __extends(TextPath, _super);
	    function TextPath(config) {
	        var _this = _super.call(this, config) || this;
	        _this.dummyCanvas = Util.Util.createCanvasElement();
	        _this.dataArray = [];
	        _this.dataArray = Path_1.Path.parsePathData(_this.attrs.data);
	        _this.on('dataChange.konva', function () {
	            this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
	            this._setTextData();
	        });
	        _this.on('textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva', _this._setTextData);
	        if (config && config['getKerning']) {
	            Util.Util.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.');
	            _this.kerningFunc(config['getKerning']);
	        }
	        _this._setTextData();
	        return _this;
	    }
	    TextPath.prototype._sceneFunc = function (context) {
	        context.setAttr('font', this._getContextFont());
	        context.setAttr('textBaseline', this.textBaseline());
	        context.setAttr('textAlign', 'left');
	        context.save();
	        var textDecoration = this.textDecoration();
	        var fill = this.fill();
	        var fontSize = this.fontSize();
	        var glyphInfo = this.glyphInfo;
	        if (textDecoration === 'underline') {
	            context.beginPath();
	        }
	        for (var i = 0; i < glyphInfo.length; i++) {
	            context.save();
	            var p0 = glyphInfo[i].p0;
	            context.translate(p0.x, p0.y);
	            context.rotate(glyphInfo[i].rotation);
	            this.partialText = glyphInfo[i].text;
	            context.fillStrokeShape(this);
	            if (textDecoration === 'underline') {
	                if (i === 0) {
	                    context.moveTo(0, fontSize / 2 + 1);
	                }
	                context.lineTo(fontSize, fontSize / 2 + 1);
	            }
	            context.restore();
	        }
	        if (textDecoration === 'underline') {
	            context.strokeStyle = fill;
	            context.lineWidth = fontSize / 20;
	            context.stroke();
	        }
	        context.restore();
	    };
	    TextPath.prototype._hitFunc = function (context) {
	        context.beginPath();
	        var glyphInfo = this.glyphInfo;
	        if (glyphInfo.length >= 1) {
	            var p0 = glyphInfo[0].p0;
	            context.moveTo(p0.x, p0.y);
	        }
	        for (var i = 0; i < glyphInfo.length; i++) {
	            var p1 = glyphInfo[i].p1;
	            context.lineTo(p1.x, p1.y);
	        }
	        context.setAttr('lineWidth', this.fontSize());
	        context.setAttr('strokeStyle', this.colorKey);
	        context.stroke();
	    };
	    TextPath.prototype.getTextWidth = function () {
	        return this.textWidth;
	    };
	    TextPath.prototype.getTextHeight = function () {
	        Util.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
	        return this.textHeight;
	    };
	    TextPath.prototype.setText = function (text) {
	        return Text_1.Text.prototype.setText.call(this, text);
	    };
	    TextPath.prototype._getContextFont = function () {
	        return Text_1.Text.prototype._getContextFont.call(this);
	    };
	    TextPath.prototype._getTextSize = function (text) {
	        var dummyCanvas = this.dummyCanvas;
	        var _context = dummyCanvas.getContext('2d');
	        _context.save();
	        _context.font = this._getContextFont();
	        var metrics = _context.measureText(text);
	        _context.restore();
	        return {
	            width: metrics.width,
	            height: parseInt(this.attrs.fontSize, 10)
	        };
	    };
	    TextPath.prototype._setTextData = function () {
	        var that = this;
	        var size = this._getTextSize(this.attrs.text);
	        var letterSpacing = this.letterSpacing();
	        var align = this.align();
	        var kerningFunc = this.kerningFunc();
	        this.textWidth = size.width;
	        this.textHeight = size.height;
	        var textFullWidth = Math.max(this.textWidth + ((this.attrs.text || '').length - 1) * letterSpacing, 0);
	        this.glyphInfo = [];
	        var fullPathWidth = 0;
	        for (var l = 0; l < that.dataArray.length; l++) {
	            if (that.dataArray[l].pathLength > 0) {
	                fullPathWidth += that.dataArray[l].pathLength;
	            }
	        }
	        var offset = 0;
	        if (align === 'center') {
	            offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
	        }
	        if (align === 'right') {
	            offset = Math.max(0, fullPathWidth - textFullWidth);
	        }
	        var charArr = this.text().split('');
	        var spacesNumber = this.text().split(' ').length - 1;
	        var p0, p1, pathCmd;
	        var pIndex = -1;
	        var currentT = 0;
	        var getNextPathSegment = function () {
	            currentT = 0;
	            var pathData = that.dataArray;
	            for (var j = pIndex + 1; j < pathData.length; j++) {
	                if (pathData[j].pathLength > 0) {
	                    pIndex = j;
	                    return pathData[j];
	                }
	                else if (pathData[j].command === 'M') {
	                    p0 = {
	                        x: pathData[j].points[0],
	                        y: pathData[j].points[1]
	                    };
	                }
	            }
	            return {};
	        };
	        var findSegmentToFitCharacter = function (c) {
	            var glyphWidth = that._getTextSize(c).width + letterSpacing;
	            if (c === ' ' && align === 'justify') {
	                glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
	            }
	            var currLen = 0;
	            var attempts = 0;
	            p1 = undefined;
	            while (Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 &&
	                attempts < 25) {
	                attempts++;
	                var cumulativePathLength = currLen;
	                while (pathCmd === undefined) {
	                    pathCmd = getNextPathSegment();
	                    if (pathCmd &&
	                        cumulativePathLength + pathCmd.pathLength < glyphWidth) {
	                        cumulativePathLength += pathCmd.pathLength;
	                        pathCmd = undefined;
	                    }
	                }
	                if (pathCmd === {} || p0 === undefined) {
	                    return undefined;
	                }
	                var needNewSegment = false;
	                switch (pathCmd.command) {
	                    case 'L':
	                        if (Path_1.Path.getLineLength(p0.x, p0.y, pathCmd.points[0], pathCmd.points[1]) > glyphWidth) {
	                            p1 = Path_1.Path.getPointOnLine(glyphWidth, p0.x, p0.y, pathCmd.points[0], pathCmd.points[1], p0.x, p0.y);
	                        }
	                        else {
	                            pathCmd = undefined;
	                        }
	                        break;
	                    case 'A':
	                        var start = pathCmd.points[4];
	                        var dTheta = pathCmd.points[5];
	                        var end = pathCmd.points[4] + dTheta;
	                        if (currentT === 0) {
	                            currentT = start + 0.00000001;
	                        }
	                        else if (glyphWidth > currLen) {
	                            currentT += ((Math.PI / 180.0) * dTheta) / Math.abs(dTheta);
	                        }
	                        else {
	                            currentT -= ((Math.PI / 360.0) * dTheta) / Math.abs(dTheta);
	                        }
	                        if ((dTheta < 0 && currentT < end) ||
	                            (dTheta >= 0 && currentT > end)) {
	                            currentT = end;
	                            needNewSegment = true;
	                        }
	                        p1 = Path_1.Path.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
	                        break;
	                    case 'C':
	                        if (currentT === 0) {
	                            if (glyphWidth > pathCmd.pathLength) {
	                                currentT = 0.00000001;
	                            }
	                            else {
	                                currentT = glyphWidth / pathCmd.pathLength;
	                            }
	                        }
	                        else if (glyphWidth > currLen) {
	                            currentT += (glyphWidth - currLen) / pathCmd.pathLength;
	                        }
	                        else {
	                            currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
	                        }
	                        if (currentT > 1.0) {
	                            currentT = 1.0;
	                            needNewSegment = true;
	                        }
	                        p1 = Path_1.Path.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
	                        break;
	                    case 'Q':
	                        if (currentT === 0) {
	                            currentT = glyphWidth / pathCmd.pathLength;
	                        }
	                        else if (glyphWidth > currLen) {
	                            currentT += (glyphWidth - currLen) / pathCmd.pathLength;
	                        }
	                        else {
	                            currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
	                        }
	                        if (currentT > 1.0) {
	                            currentT = 1.0;
	                            needNewSegment = true;
	                        }
	                        p1 = Path_1.Path.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
	                        break;
	                }
	                if (p1 !== undefined) {
	                    currLen = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
	                }
	                if (needNewSegment) {
	                    needNewSegment = false;
	                    pathCmd = undefined;
	                }
	            }
	        };
	        var testChar = 'C';
	        var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
	        for (var k = 0; k < offset / glyphWidth; k++) {
	            findSegmentToFitCharacter(testChar);
	            if (p0 === undefined || p1 === undefined) {
	                break;
	            }
	            p0 = p1;
	        }
	        for (var i = 0; i < charArr.length; i++) {
	            findSegmentToFitCharacter(charArr[i]);
	            if (p0 === undefined || p1 === undefined) {
	                break;
	            }
	            var width = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
	            var kern = 0;
	            if (kerningFunc) {
	                try {
	                    kern = kerningFunc(charArr[i - 1], charArr[i]) * this.fontSize();
	                }
	                catch (e) {
	                    kern = 0;
	                }
	            }
	            p0.x += kern;
	            p1.x += kern;
	            this.textWidth += kern;
	            var midpoint = Path_1.Path.getPointOnLine(kern + width / 2.0, p0.x, p0.y, p1.x, p1.y);
	            var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
	            this.glyphInfo.push({
	                transposeX: midpoint.x,
	                transposeY: midpoint.y,
	                text: charArr[i],
	                rotation: rotation,
	                p0: p0,
	                p1: p1
	            });
	            p0 = p1;
	        }
	    };
	    TextPath.prototype.getSelfRect = function () {
	        var points = [];
	        this.glyphInfo.forEach(function (info) {
	            points.push(info.p0.x);
	            points.push(info.p0.y);
	            points.push(info.p1.x);
	            points.push(info.p1.y);
	        });
	        var minX = points[0];
	        var maxX = points[0];
	        var minY = points[0];
	        var maxY = points[0];
	        var x, y;
	        for (var i = 0; i < points.length / 2; i++) {
	            x = points[i * 2];
	            y = points[i * 2 + 1];
	            minX = Math.min(minX, x);
	            maxX = Math.max(maxX, x);
	            minY = Math.min(minY, y);
	            maxY = Math.max(maxY, y);
	        }
	        var fontSize = this.fontSize();
	        return {
	            x: Math.round(minX) - fontSize / 2,
	            y: Math.round(minY) - fontSize / 2,
	            width: Math.round(maxX - minX) + fontSize,
	            height: Math.round(maxY - minY) + fontSize
	        };
	    };
	    return TextPath;
	}(Shape_1.Shape));
	exports.TextPath = TextPath;
	TextPath.prototype._fillFunc = _fillFunc;
	TextPath.prototype._strokeFunc = _strokeFunc;
	TextPath.prototype._fillFuncHit = _fillFunc;
	TextPath.prototype._strokeFuncHit = _strokeFunc;
	TextPath.prototype.className = 'TextPath';
	TextPath.prototype._attrsAffectingSize = ['text', 'fontSize', 'data'];
	Global._registerNode(TextPath);
	Factory.Factory.addGetterSetter(TextPath, 'data');
	Factory.Factory.addGetterSetter(TextPath, 'fontFamily', 'Arial');
	Factory.Factory.addGetterSetter(TextPath, 'fontSize', 12, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(TextPath, 'fontStyle', NORMAL);
	Factory.Factory.addGetterSetter(TextPath, 'align', 'left');
	Factory.Factory.addGetterSetter(TextPath, 'letterSpacing', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(TextPath, 'textBaseline', 'middle');
	Factory.Factory.addGetterSetter(TextPath, 'fontVariant', NORMAL);
	Factory.Factory.addGetterSetter(TextPath, 'text', EMPTY_STRING);
	Factory.Factory.addGetterSetter(TextPath, 'textDecoration', null);
	Factory.Factory.addGetterSetter(TextPath, 'kerningFunc', null);
	Util.Collection.mapMethods(TextPath);
	});

	unwrapExports(TextPath_1);
	var TextPath_2 = TextPath_1.TextPath;

	var Transformer_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });








	var Global_2 = Global;
	var ATTR_CHANGE_LIST = [
	    'resizeEnabledChange',
	    'rotateAnchorOffsetChange',
	    'rotateEnabledChange',
	    'enabledAnchorsChange',
	    'anchorSizeChange',
	    'borderEnabledChange',
	    'borderStrokeChange',
	    'borderStrokeWidthChange',
	    'borderDashChange',
	    'anchorStrokeChange',
	    'anchorStrokeWidthChange',
	    'anchorFillChange',
	    'anchorCornerRadiusChange',
	    'ignoreStrokeChange'
	].join(' ');
	var NODE_RECT = 'nodeRect';
	var TRANSFORM_CHANGE_STR = [
	    'widthChange.tr',
	    'heightChange.tr',
	    'scaleXChange.tr',
	    'scaleYChange.tr',
	    'skewXChange.tr',
	    'skewYChange.tr',
	    'rotationChange.tr',
	    'offsetXChange.tr',
	    'offsetYChange.tr',
	    'transformsEnabledChange.tr',
	    'strokeWidthChange.tr'
	].join(' ');
	var ANGLES = {
	    'top-left': -45,
	    'top-center': 0,
	    'top-right': 45,
	    'middle-right': -90,
	    'middle-left': 90,
	    'bottom-left': -135,
	    'bottom-center': 180,
	    'bottom-right': 135
	};
	function getCursor(anchorName, rad, isMirrored) {
	    if (anchorName === 'rotater') {
	        return 'crosshair';
	    }
	    rad += Util.Util._degToRad(ANGLES[anchorName] || 0);
	    if (isMirrored) {
	        rad *= -1;
	    }
	    var angle = ((Util.Util._radToDeg(rad) % 360) + 360) % 360;
	    if (Util.Util._inRange(angle, 315 + 22.5, 360) || Util.Util._inRange(angle, 0, 22.5)) {
	        return 'ns-resize';
	    }
	    else if (Util.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
	        return 'nesw-resize';
	    }
	    else if (Util.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
	        return 'ew-resize';
	    }
	    else if (Util.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
	        return 'nwse-resize';
	    }
	    else if (Util.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
	        return 'ns-resize';
	    }
	    else if (Util.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
	        return 'nesw-resize';
	    }
	    else if (Util.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
	        return 'ew-resize';
	    }
	    else if (Util.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
	        return 'nwse-resize';
	    }
	    else {
	        Util.Util.error('Transformer has unknown angle for cursor detection: ' + angle);
	        return 'pointer';
	    }
	}
	var ANCHORS_NAMES = [
	    'top-left',
	    'top-center',
	    'top-right',
	    'middle-right',
	    'middle-left',
	    'bottom-left',
	    'bottom-center',
	    'bottom-right'
	];
	var MAX_SAFE_INTEGER = 100000000;
	var Transformer = (function (_super) {
	    __extends(Transformer, _super);
	    function Transformer(config) {
	        var _this = _super.call(this, config) || this;
	        _this._transforming = false;
	        _this._createElements();
	        _this._handleMouseMove = _this._handleMouseMove.bind(_this);
	        _this._handleMouseUp = _this._handleMouseUp.bind(_this);
	        _this.update = _this.update.bind(_this);
	        _this.on(ATTR_CHANGE_LIST, _this.update);
	        if (_this.getNode()) {
	            _this.update();
	        }
	        return _this;
	    }
	    Transformer.prototype.attachTo = function (node) {
	        this.setNode(node);
	        return this;
	    };
	    Transformer.prototype.setNode = function (node) {
	        var _this = this;
	        if (this._node) {
	            this.detach();
	        }
	        this._node = node;
	        this._resetTransformCache();
	        var additionalEvents = node._attrsAffectingSize
	            .map(function (prop) { return prop + 'Change.tr'; })
	            .join(' ');
	        var onChange = function () {
	            _this._resetTransformCache();
	            if (!_this._transforming) {
	                _this.update();
	            }
	        };
	        node.on(additionalEvents, onChange);
	        node.on(TRANSFORM_CHANGE_STR, onChange);
	        node.on('xChange.tr yChange.tr', function () { return _this._resetTransformCache(); });
	        var elementsCreated = !!this.findOne('.top-left');
	        if (elementsCreated) {
	            this.update();
	        }
	        return this;
	    };
	    Transformer.prototype.getNode = function () {
	        return this._node;
	    };
	    Transformer.prototype.detach = function () {
	        if (this.getNode()) {
	            this.getNode().off('.tr');
	            this._node = undefined;
	        }
	        this._resetTransformCache();
	    };
	    Transformer.prototype._resetTransformCache = function () {
	        this._clearCache(NODE_RECT);
	        this._clearCache('transform');
	        this._clearSelfAndDescendantCache('absoluteTransform');
	    };
	    Transformer.prototype._getNodeRect = function () {
	        return this._getCache(NODE_RECT, this.__getNodeRect);
	    };
	    Transformer.prototype.__getNodeRect = function () {
	        var node = this.getNode();
	        if (!node) {
	            return {
	                x: -MAX_SAFE_INTEGER,
	                y: -MAX_SAFE_INTEGER,
	                width: 0,
	                height: 0,
	                rotation: 0
	            };
	        }
	        if (node.parent && this.parent && node.parent !== this.parent) {
	            Util.Util.warn('Transformer and attached node have different parents. Konva does not support such case right now. Please move Transformer to the parent of attaching node.');
	        }
	        var rect = node.getClientRect({
	            skipTransform: true,
	            skipShadow: true,
	            skipStroke: this.ignoreStroke()
	        });
	        var rotation = Global.Konva.getAngle(node.rotation());
	        var dx = rect.x * node.scaleX() - node.offsetX() * node.scaleX();
	        var dy = rect.y * node.scaleY() - node.offsetY() * node.scaleY();
	        return {
	            x: node.x() + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
	            y: node.y() + dy * Math.cos(rotation) + dx * Math.sin(rotation),
	            width: rect.width * node.scaleX(),
	            height: rect.height * node.scaleY(),
	            rotation: node.rotation()
	        };
	    };
	    Transformer.prototype.getX = function () {
	        return this._getNodeRect().x;
	    };
	    Transformer.prototype.getY = function () {
	        return this._getNodeRect().y;
	    };
	    Transformer.prototype.getRotation = function () {
	        return this._getNodeRect().rotation;
	    };
	    Transformer.prototype.getWidth = function () {
	        return this._getNodeRect().width;
	    };
	    Transformer.prototype.getHeight = function () {
	        return this._getNodeRect().height;
	    };
	    Transformer.prototype._createElements = function () {
	        this._createBack();
	        ANCHORS_NAMES.forEach(function (name) {
	            this._createAnchor(name);
	        }.bind(this));
	        this._createAnchor('rotater');
	    };
	    Transformer.prototype._createAnchor = function (name) {
	        var _this = this;
	        var anchor = new Rect_1.Rect({
	            stroke: 'rgb(0, 161, 255)',
	            fill: 'white',
	            strokeWidth: 1,
	            name: name + ' _anchor',
	            dragDistance: 0,
	            draggable: true
	        });
	        var self = this;
	        anchor.on('mousedown touchstart', function (e) {
	            self._handleMouseDown(e);
	        });
	        anchor.on('dragstart', function (e) {
	            e.cancelBubble = true;
	        });
	        anchor.on('dragmove', function (e) {
	            e.cancelBubble = true;
	        });
	        anchor.on('dragend', function (e) {
	            e.cancelBubble = true;
	        });
	        anchor.on('mouseenter', function () {
	            var rad = Global.Konva.getAngle(_this.rotation());
	            var scale = _this.getNode().getAbsoluteScale();
	            var isMirrored = scale.y * scale.x < 0;
	            var cursor = getCursor(name, rad, isMirrored);
	            anchor.getStage().content.style.cursor = cursor;
	            _this._cursorChange = true;
	        });
	        anchor.on('mouseout', function () {
	            if (!anchor.getStage() || !anchor.getParent()) {
	                return;
	            }
	            anchor.getStage().content.style.cursor = '';
	            _this._cursorChange = false;
	        });
	        this.add(anchor);
	    };
	    Transformer.prototype._createBack = function () {
	        var back = new Shape_1.Shape({
	            name: 'back',
	            width: 0,
	            height: 0,
	            listening: false,
	            sceneFunc: function (ctx) {
	                var tr = this.getParent();
	                var padding = tr.padding();
	                ctx.beginPath();
	                ctx.rect(-padding, -padding, this.width() + padding * 2, this.height() + padding * 2);
	                ctx.moveTo(this.width() / 2, -padding);
	                if (tr.rotateEnabled()) {
	                    ctx.lineTo(this.width() / 2, -tr.rotateAnchorOffset() * Util.Util._sign(this.height()));
	                }
	                ctx.fillStrokeShape(this);
	            }
	        });
	        this.add(back);
	    };
	    Transformer.prototype._handleMouseDown = function (e) {
	        this.movingResizer = e.target.name().split(' ')[0];
	        var attrs = this._getNodeRect();
	        var width = attrs.width;
	        var height = attrs.height;
	        var hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
	        this.sin = Math.abs(height / hypotenuse);
	        this.cos = Math.abs(width / hypotenuse);
	        window.addEventListener('mousemove', this._handleMouseMove);
	        window.addEventListener('touchmove', this._handleMouseMove);
	        window.addEventListener('mouseup', this._handleMouseUp, true);
	        window.addEventListener('touchend', this._handleMouseUp, true);
	        this._transforming = true;
	        this._fire('transformstart', { evt: e });
	        this.getNode()._fire('transformstart', { evt: e });
	    };
	    Transformer.prototype._handleMouseMove = function (e) {
	        var x, y, newHypotenuse;
	        var resizerNode = this.findOne('.' + this.movingResizer);
	        var stage = resizerNode.getStage();
	        var box = stage.getContent().getBoundingClientRect();
	        var zeroPoint = {
	            x: box.left,
	            y: box.top
	        };
	        var pointerPos = {
	            left: e.clientX !== undefined ? e.clientX : e.touches[0].clientX,
	            top: e.clientX !== undefined ? e.clientY : e.touches[0].clientY
	        };
	        var newAbsPos = {
	            x: pointerPos.left - zeroPoint.x,
	            y: pointerPos.top - zeroPoint.y
	        };
	        resizerNode.setAbsolutePosition(newAbsPos);
	        var keepProportion = this.keepRatio() || e.shiftKey;
	        if (this.movingResizer === 'top-left') {
	            if (keepProportion) {
	                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-right').x() - resizerNode.x(), 2) +
	                    Math.pow(this.findOne('.bottom-right').y() - resizerNode.y(), 2));
	                var reverse = this.findOne('.top-left').x() > this.findOne('.bottom-right').x()
	                    ? -1
	                    : 1;
	                x = newHypotenuse * this.cos * reverse;
	                y = newHypotenuse * this.sin * reverse;
	                this.findOne('.top-left').x(this.findOne('.bottom-right').x() - x);
	                this.findOne('.top-left').y(this.findOne('.bottom-right').y() - y);
	            }
	        }
	        else if (this.movingResizer === 'top-center') {
	            this.findOne('.top-left').y(resizerNode.y());
	        }
	        else if (this.movingResizer === 'top-right') {
	            if (keepProportion) {
	                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-left').x() - resizerNode.x(), 2) +
	                    Math.pow(this.findOne('.bottom-left').y() - resizerNode.y(), 2));
	                var reverse = this.findOne('.top-right').x() < this.findOne('.top-left').x()
	                    ? -1
	                    : 1;
	                x = newHypotenuse * this.cos * reverse;
	                y = newHypotenuse * this.sin * reverse;
	                this.findOne('.top-right').x(x);
	                this.findOne('.top-right').y(this.findOne('.bottom-left').y() - y);
	            }
	            var pos = resizerNode.position();
	            this.findOne('.top-left').y(pos.y);
	            this.findOne('.bottom-right').x(pos.x);
	        }
	        else if (this.movingResizer === 'middle-left') {
	            this.findOne('.top-left').x(resizerNode.x());
	        }
	        else if (this.movingResizer === 'middle-right') {
	            this.findOne('.bottom-right').x(resizerNode.x());
	        }
	        else if (this.movingResizer === 'bottom-left') {
	            if (keepProportion) {
	                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.top-right').x() - resizerNode.x(), 2) +
	                    Math.pow(this.findOne('.top-right').y() - resizerNode.y(), 2));
	                var reverse = this.findOne('.top-right').x() < this.findOne('.bottom-left').x()
	                    ? -1
	                    : 1;
	                x = newHypotenuse * this.cos * reverse;
	                y = newHypotenuse * this.sin * reverse;
	                this.findOne('.bottom-left').x(this.findOne('.top-right').x() - x);
	                this.findOne('.bottom-left').y(y);
	            }
	            pos = resizerNode.position();
	            this.findOne('.top-left').x(pos.x);
	            this.findOne('.bottom-right').y(pos.y);
	        }
	        else if (this.movingResizer === 'bottom-center') {
	            this.findOne('.bottom-right').y(resizerNode.y());
	        }
	        else if (this.movingResizer === 'bottom-right') {
	            if (keepProportion) {
	                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-right').x(), 2) +
	                    Math.pow(this.findOne('.bottom-right').y(), 2));
	                var reverse = this.findOne('.top-left').x() > this.findOne('.bottom-right').x()
	                    ? -1
	                    : 1;
	                x = newHypotenuse * this.cos * reverse;
	                y = newHypotenuse * this.sin * reverse;
	                this.findOne('.bottom-right').x(x);
	                this.findOne('.bottom-right').y(y);
	            }
	        }
	        else if (this.movingResizer === 'rotater') {
	            var padding = this.padding();
	            var attrs = this._getNodeRect();
	            x = resizerNode.x() - attrs.width / 2;
	            y = -resizerNode.y() + attrs.height / 2;
	            var dAlpha = Math.atan2(-y, x) + Math.PI / 2;
	            if (attrs.height < 0) {
	                dAlpha -= Math.PI;
	            }
	            var rot = Global.Konva.getAngle(this.rotation());
	            var newRotation = Util.Util._radToDeg(rot) + Util.Util._radToDeg(dAlpha);
	            var alpha = Global.Konva.getAngle(this.getNode().rotation());
	            var newAlpha = Util.Util._degToRad(newRotation);
	            var snaps = this.rotationSnaps();
	            var offset = 0.1;
	            for (var i = 0; i < snaps.length; i++) {
	                var angle = Global.Konva.getAngle(snaps[i]);
	                var dif = Math.abs(angle - Util.Util._degToRad(newRotation)) % (Math.PI * 2);
	                if (dif < offset) {
	                    newRotation = Util.Util._radToDeg(angle);
	                    newAlpha = Util.Util._degToRad(newRotation);
	                }
	            }
	            var dx = padding;
	            var dy = padding;
	            this._fitNodeInto({
	                rotation: Global.Konva.angleDeg ? newRotation : Util.Util._degToRad(newRotation),
	                x: attrs.x +
	                    (attrs.width / 2 + padding) *
	                        (Math.cos(alpha) - Math.cos(newAlpha)) +
	                    (attrs.height / 2 + padding) *
	                        (Math.sin(-alpha) - Math.sin(-newAlpha)) -
	                    (dx * Math.cos(rot) + dy * Math.sin(-rot)),
	                y: attrs.y +
	                    (attrs.height / 2 + padding) *
	                        (Math.cos(alpha) - Math.cos(newAlpha)) +
	                    (attrs.width / 2 + padding) *
	                        (Math.sin(alpha) - Math.sin(newAlpha)) -
	                    (dy * Math.cos(rot) + dx * Math.sin(rot)),
	                width: attrs.width + padding * 2,
	                height: attrs.height + padding * 2
	            }, e);
	        }
	        else {
	            console.error(new Error('Wrong position argument of selection resizer: ' + this.movingResizer));
	        }
	        if (this.movingResizer === 'rotater') {
	            return;
	        }
	        var absPos = this.findOne('.top-left').getAbsolutePosition(this.getParent());
	        var centeredScaling = this.centeredScaling() || e.altKey;
	        if (centeredScaling) {
	            var topLeft = this.findOne('.top-left');
	            var bottomRight = this.findOne('.bottom-right');
	            var topOffsetX = topLeft.x();
	            var topOffsetY = topLeft.y();
	            var bottomOffsetX = this.getWidth() - bottomRight.x();
	            var bottomOffsetY = this.getHeight() - bottomRight.y();
	            bottomRight.move({
	                x: -topOffsetX,
	                y: -topOffsetY
	            });
	            topLeft.move({
	                x: bottomOffsetX,
	                y: bottomOffsetY
	            });
	            absPos = topLeft.getAbsolutePosition(this.getParent());
	        }
	        x = absPos.x;
	        y = absPos.y;
	        var width = this.findOne('.bottom-right').x() - this.findOne('.top-left').x();
	        var height = this.findOne('.bottom-right').y() - this.findOne('.top-left').y();
	        this._fitNodeInto({
	            x: x + this.offsetX(),
	            y: y + this.offsetY(),
	            width: width,
	            height: height
	        }, e);
	    };
	    Transformer.prototype._handleMouseUp = function (e) {
	        this._removeEvents(e);
	    };
	    Transformer.prototype._removeEvents = function (e) {
	        if (this._transforming) {
	            this._transforming = false;
	            window.removeEventListener('mousemove', this._handleMouseMove);
	            window.removeEventListener('touchmove', this._handleMouseMove);
	            window.removeEventListener('mouseup', this._handleMouseUp, true);
	            window.removeEventListener('touchend', this._handleMouseUp, true);
	            this._fire('transformend', { evt: e });
	            var node = this.getNode();
	            if (node) {
	                node.fire('transformend', { evt: e });
	            }
	        }
	    };
	    Transformer.prototype._fitNodeInto = function (newAttrs, evt) {
	        var boundBoxFunc = this.boundBoxFunc();
	        if (boundBoxFunc) {
	            var oldAttrs = this._getNodeRect();
	            newAttrs = boundBoxFunc.call(this, oldAttrs, newAttrs);
	        }
	        var node = this.getNode();
	        if (newAttrs.rotation !== undefined) {
	            this.getNode().rotation(newAttrs.rotation);
	        }
	        var pure = node.getClientRect({
	            skipTransform: true,
	            skipShadow: true,
	            skipStroke: this.ignoreStroke()
	        });
	        var padding = this.padding();
	        var scaleX = (newAttrs.width - padding * 2) / pure.width;
	        var scaleY = (newAttrs.height - padding * 2) / pure.height;
	        var rotation = Global.Konva.getAngle(node.rotation());
	        var dx = pure.x * scaleX - padding - node.offsetX() * scaleX;
	        var dy = pure.y * scaleY - padding - node.offsetY() * scaleY;
	        this.getNode().setAttrs({
	            scaleX: scaleX,
	            scaleY: scaleY,
	            x: newAttrs.x - (dx * Math.cos(rotation) + dy * Math.sin(-rotation)),
	            y: newAttrs.y - (dy * Math.cos(rotation) + dx * Math.sin(rotation))
	        });
	        this._fire('transform', { evt: evt });
	        this.getNode()._fire('transform', { evt: evt });
	        this.update();
	        this.getLayer().batchDraw();
	    };
	    Transformer.prototype.forceUpdate = function () {
	        this._resetTransformCache();
	        this.update();
	    };
	    Transformer.prototype.update = function () {
	        var _this = this;
	        var attrs = this._getNodeRect();
	        var node = this.getNode();
	        var scale = { x: 1, y: 1 };
	        if (node && node.getParent()) {
	            scale = node.getParent().getAbsoluteScale();
	        }
	        var invertedScale = {
	            x: 1 / scale.x,
	            y: 1 / scale.y
	        };
	        var width = attrs.width;
	        var height = attrs.height;
	        var enabledAnchors = this.enabledAnchors();
	        var resizeEnabled = this.resizeEnabled();
	        var padding = this.padding();
	        var anchorSize = this.anchorSize();
	        this.find('._anchor').each(function (node) {
	            return node.setAttrs({
	                width: anchorSize,
	                height: anchorSize,
	                offsetX: anchorSize / 2,
	                offsetY: anchorSize / 2,
	                stroke: _this.anchorStroke(),
	                strokeWidth: _this.anchorStrokeWidth(),
	                fill: _this.anchorFill(),
	                cornerRadius: _this.anchorCornerRadius()
	            });
	        });
	        this.findOne('.top-left').setAttrs({
	            x: -padding,
	            y: -padding,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('top-left') >= 0
	        });
	        this.findOne('.top-center').setAttrs({
	            x: width / 2,
	            y: -padding,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('top-center') >= 0
	        });
	        this.findOne('.top-right').setAttrs({
	            x: width + padding,
	            y: -padding,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('top-right') >= 0
	        });
	        this.findOne('.middle-left').setAttrs({
	            x: -padding,
	            y: height / 2,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('middle-left') >= 0
	        });
	        this.findOne('.middle-right').setAttrs({
	            x: width + padding,
	            y: height / 2,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('middle-right') >= 0
	        });
	        this.findOne('.bottom-left').setAttrs({
	            x: -padding,
	            y: height + padding,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('bottom-left') >= 0
	        });
	        this.findOne('.bottom-center').setAttrs({
	            x: width / 2,
	            y: height + padding,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('bottom-center') >= 0
	        });
	        this.findOne('.bottom-right').setAttrs({
	            x: width + padding,
	            y: height + padding,
	            scale: invertedScale,
	            visible: resizeEnabled && enabledAnchors.indexOf('bottom-right') >= 0
	        });
	        var scaledRotateAnchorOffset = -this.rotateAnchorOffset() * Math.abs(invertedScale.y);
	        this.findOne('.rotater').setAttrs({
	            x: width / 2,
	            y: scaledRotateAnchorOffset * Util.Util._sign(height),
	            scale: invertedScale,
	            visible: this.rotateEnabled()
	        });
	        this.findOne('.back').setAttrs({
	            width: width * scale.x,
	            height: height * scale.y,
	            scale: invertedScale,
	            visible: this.borderEnabled(),
	            stroke: this.borderStroke(),
	            strokeWidth: this.borderStrokeWidth(),
	            dash: this.borderDash()
	        });
	    };
	    Transformer.prototype.isTransforming = function () {
	        return this._transforming;
	    };
	    Transformer.prototype.stopTransform = function () {
	        if (this._transforming) {
	            this._removeEvents();
	            var resizerNode = this.findOne('.' + this.movingResizer);
	            if (resizerNode) {
	                resizerNode.stopDrag();
	            }
	        }
	    };
	    Transformer.prototype.destroy = function () {
	        if (this.getStage() && this._cursorChange) {
	            this.getStage().content.style.cursor = '';
	        }
	        Group_1.Group.prototype.destroy.call(this);
	        this.detach();
	        this._removeEvents();
	        return this;
	    };
	    Transformer.prototype.toObject = function () {
	        return Node_1.Node.prototype.toObject.call(this);
	    };
	    return Transformer;
	}(Group_1.Group));
	exports.Transformer = Transformer;
	function validateAnchors(val) {
	    if (!(val instanceof Array)) {
	        Util.Util.warn('enabledAnchors value should be an array');
	    }
	    if (val instanceof Array) {
	        val.forEach(function (name) {
	            if (ANCHORS_NAMES.indexOf(name) === -1) {
	                Util.Util.warn('Unknown anchor name: ' +
	                    name +
	                    '. Available names are: ' +
	                    ANCHORS_NAMES.join(', '));
	            }
	        });
	    }
	    return val || [];
	}
	Transformer.prototype.className = 'Transformer';
	Global_2._registerNode(Transformer);
	Factory.Factory.addGetterSetter(Transformer, 'enabledAnchors', ANCHORS_NAMES, validateAnchors);
	Factory.Factory.addGetterSetter(Transformer, 'resizeEnabled', true);
	Factory.Factory.addGetterSetter(Transformer, 'anchorSize', 10, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Transformer, 'rotateEnabled', true);
	Factory.Factory.addGetterSetter(Transformer, 'rotationSnaps', []);
	Factory.Factory.addGetterSetter(Transformer, 'rotateAnchorOffset', 50, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Transformer, 'borderEnabled', true);
	Factory.Factory.addGetterSetter(Transformer, 'anchorStroke', 'rgb(0, 161, 255)');
	Factory.Factory.addGetterSetter(Transformer, 'anchorStrokeWidth', 1, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Transformer, 'anchorFill', 'white');
	Factory.Factory.addGetterSetter(Transformer, 'anchorCornerRadius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Transformer, 'borderStroke', 'rgb(0, 161, 255)');
	Factory.Factory.addGetterSetter(Transformer, 'borderStrokeWidth', 1, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Transformer, 'borderDash');
	Factory.Factory.addGetterSetter(Transformer, 'keepRatio', true);
	Factory.Factory.addGetterSetter(Transformer, 'centeredScaling', false);
	Factory.Factory.addGetterSetter(Transformer, 'ignoreStroke', false);
	Factory.Factory.addGetterSetter(Transformer, 'padding', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Transformer, 'node');
	Factory.Factory.addGetterSetter(Transformer, 'boundBoxFunc');
	Factory.Factory.backCompat(Transformer, {
	    lineEnabled: 'borderEnabled',
	    rotateHandlerOffset: 'rotateAnchorOffset',
	    enabledHandlers: 'enabledAnchors'
	});
	Util.Collection.mapMethods(Transformer);
	});

	unwrapExports(Transformer_1);
	var Transformer_2 = Transformer_1.Transformer;

	var Wedge_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	var Global_2 = Global;
	var Wedge = (function (_super) {
	    __extends(Wedge, _super);
	    function Wedge() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Wedge.prototype._sceneFunc = function (context) {
	        context.beginPath();
	        context.arc(0, 0, this.radius(), 0, Global.Konva.getAngle(this.angle()), this.clockwise());
	        context.lineTo(0, 0);
	        context.closePath();
	        context.fillStrokeShape(this);
	    };
	    Wedge.prototype.getWidth = function () {
	        return this.radius() * 2;
	    };
	    Wedge.prototype.getHeight = function () {
	        return this.radius() * 2;
	    };
	    Wedge.prototype.setWidth = function (width) {
	        this.radius(width / 2);
	    };
	    Wedge.prototype.setHeight = function (height) {
	        this.radius(height / 2);
	    };
	    return Wedge;
	}(Shape_1.Shape));
	exports.Wedge = Wedge;
	Wedge.prototype.className = 'Wedge';
	Wedge.prototype._centroid = true;
	Wedge.prototype._attrsAffectingSize = ['radius'];
	Global_2._registerNode(Wedge);
	Factory.Factory.addGetterSetter(Wedge, 'radius', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Wedge, 'angle', 0, Validators.getNumberValidator());
	Factory.Factory.addGetterSetter(Wedge, 'clockwise', false);
	Factory.Factory.backCompat(Wedge, {
	    angleDeg: 'angle',
	    getAngleDeg: 'getAngle',
	    setAngleDeg: 'setAngle'
	});
	Util.Collection.mapMethods(Wedge);
	});

	unwrapExports(Wedge_1);
	var Wedge_2 = Wedge_1.Wedge;

	var Blur = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function BlurStack() {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = 0;
	    this.next = null;
	}
	var mul_table = [
	    512,
	    512,
	    456,
	    512,
	    328,
	    456,
	    335,
	    512,
	    405,
	    328,
	    271,
	    456,
	    388,
	    335,
	    292,
	    512,
	    454,
	    405,
	    364,
	    328,
	    298,
	    271,
	    496,
	    456,
	    420,
	    388,
	    360,
	    335,
	    312,
	    292,
	    273,
	    512,
	    482,
	    454,
	    428,
	    405,
	    383,
	    364,
	    345,
	    328,
	    312,
	    298,
	    284,
	    271,
	    259,
	    496,
	    475,
	    456,
	    437,
	    420,
	    404,
	    388,
	    374,
	    360,
	    347,
	    335,
	    323,
	    312,
	    302,
	    292,
	    282,
	    273,
	    265,
	    512,
	    497,
	    482,
	    468,
	    454,
	    441,
	    428,
	    417,
	    405,
	    394,
	    383,
	    373,
	    364,
	    354,
	    345,
	    337,
	    328,
	    320,
	    312,
	    305,
	    298,
	    291,
	    284,
	    278,
	    271,
	    265,
	    259,
	    507,
	    496,
	    485,
	    475,
	    465,
	    456,
	    446,
	    437,
	    428,
	    420,
	    412,
	    404,
	    396,
	    388,
	    381,
	    374,
	    367,
	    360,
	    354,
	    347,
	    341,
	    335,
	    329,
	    323,
	    318,
	    312,
	    307,
	    302,
	    297,
	    292,
	    287,
	    282,
	    278,
	    273,
	    269,
	    265,
	    261,
	    512,
	    505,
	    497,
	    489,
	    482,
	    475,
	    468,
	    461,
	    454,
	    447,
	    441,
	    435,
	    428,
	    422,
	    417,
	    411,
	    405,
	    399,
	    394,
	    389,
	    383,
	    378,
	    373,
	    368,
	    364,
	    359,
	    354,
	    350,
	    345,
	    341,
	    337,
	    332,
	    328,
	    324,
	    320,
	    316,
	    312,
	    309,
	    305,
	    301,
	    298,
	    294,
	    291,
	    287,
	    284,
	    281,
	    278,
	    274,
	    271,
	    268,
	    265,
	    262,
	    259,
	    257,
	    507,
	    501,
	    496,
	    491,
	    485,
	    480,
	    475,
	    470,
	    465,
	    460,
	    456,
	    451,
	    446,
	    442,
	    437,
	    433,
	    428,
	    424,
	    420,
	    416,
	    412,
	    408,
	    404,
	    400,
	    396,
	    392,
	    388,
	    385,
	    381,
	    377,
	    374,
	    370,
	    367,
	    363,
	    360,
	    357,
	    354,
	    350,
	    347,
	    344,
	    341,
	    338,
	    335,
	    332,
	    329,
	    326,
	    323,
	    320,
	    318,
	    315,
	    312,
	    310,
	    307,
	    304,
	    302,
	    299,
	    297,
	    294,
	    292,
	    289,
	    287,
	    285,
	    282,
	    280,
	    278,
	    275,
	    273,
	    271,
	    269,
	    267,
	    265,
	    263,
	    261,
	    259
	];
	var shg_table = [
	    9,
	    11,
	    12,
	    13,
	    13,
	    14,
	    14,
	    15,
	    15,
	    15,
	    15,
	    16,
	    16,
	    16,
	    16,
	    17,
	    17,
	    17,
	    17,
	    17,
	    17,
	    17,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    18,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    19,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    20,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    21,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    22,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    23,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24,
	    24
	];
	function filterGaussBlurRGBA(imageData, radius) {
	    var pixels = imageData.data, width = imageData.width, height = imageData.height;
	    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
	    var div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2, stackStart = new BlurStack(), stackEnd = null, stack = stackStart, stackIn = null, stackOut = null, mul_sum = mul_table[radius], shg_sum = shg_table[radius];
	    for (i = 1; i < div; i++) {
	        stack = stack.next = new BlurStack();
	        if (i === radiusPlus1) {
	            stackEnd = stack;
	        }
	    }
	    stack.next = stackStart;
	    yw = yi = 0;
	    for (y = 0; y < height; y++) {
	        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;
	        stack = stackStart;
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }
	        for (i = 1; i < radiusPlus1; i++) {
	            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
	            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
	            a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;
	            stack = stack.next;
	        }
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (x = 0; x < width; x++) {
	            pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
	            if (pa !== 0) {
	                pa = 255 / pa;
	                pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
	                pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	            }
	            else {
	                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
	            }
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;
	            p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
	            r_in_sum += stackIn.r = pixels[p];
	            g_in_sum += stackIn.g = pixels[p + 1];
	            b_in_sum += stackIn.b = pixels[p + 2];
	            a_in_sum += stackIn.a = pixels[p + 3];
	            r_sum += r_in_sum;
	            g_sum += g_in_sum;
	            b_sum += b_in_sum;
	            a_sum += a_in_sum;
	            stackIn = stackIn.next;
	            r_out_sum += pr = stackOut.r;
	            g_out_sum += pg = stackOut.g;
	            b_out_sum += pb = stackOut.b;
	            a_out_sum += pa = stackOut.a;
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;
	            stackOut = stackOut.next;
	            yi += 4;
	        }
	        yw += width;
	    }
	    for (x = 0; x < width; x++) {
	        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
	        yi = x << 2;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;
	        stack = stackStart;
	        for (i = 0; i < radiusPlus1; i++) {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }
	        yp = width;
	        for (i = 1; i <= radius; i++) {
	            yi = (yp + x) << 2;
	            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
	            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
	            a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;
	            stack = stack.next;
	            if (i < heightMinus1) {
	                yp += width;
	            }
	        }
	        yi = x;
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (y = 0; y < height; y++) {
	            p = yi << 2;
	            pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
	            if (pa > 0) {
	                pa = 255 / pa;
	                pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
	                pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	            }
	            else {
	                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
	            }
	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;
	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;
	            p =
	                (x +
	                    ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width) <<
	                    2;
	            r_sum += r_in_sum += stackIn.r = pixels[p];
	            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
	            b_sum += b_in_sum += stackIn.b = pixels[p + 2];
	            a_sum += a_in_sum += stackIn.a = pixels[p + 3];
	            stackIn = stackIn.next;
	            r_out_sum += pr = stackOut.r;
	            g_out_sum += pg = stackOut.g;
	            b_out_sum += pb = stackOut.b;
	            a_out_sum += pa = stackOut.a;
	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;
	            stackOut = stackOut.next;
	            yi += width;
	        }
	    }
	}
	exports.Blur = function Blur(imageData) {
	    var radius = Math.round(this.blurRadius());
	    if (radius > 0) {
	        filterGaussBlurRGBA(imageData, radius);
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'blurRadius', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Blur);
	var Blur_1 = Blur.Blur;

	var Brighten = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.Brighten = function (imageData) {
	    var brightness = this.brightness() * 255, data = imageData.data, len = data.length, i;
	    for (i = 0; i < len; i += 4) {
	        data[i] += brightness;
	        data[i + 1] += brightness;
	        data[i + 2] += brightness;
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'brightness', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Brighten);
	var Brighten_1 = Brighten.Brighten;

	var Contrast = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.Contrast = function (imageData) {
	    var adjust = Math.pow((this.contrast() + 100) / 100, 2);
	    var data = imageData.data, nPixels = data.length, red = 150, green = 150, blue = 150, i;
	    for (i = 0; i < nPixels; i += 4) {
	        red = data[i];
	        green = data[i + 1];
	        blue = data[i + 2];
	        red /= 255;
	        red -= 0.5;
	        red *= adjust;
	        red += 0.5;
	        red *= 255;
	        green /= 255;
	        green -= 0.5;
	        green *= adjust;
	        green += 0.5;
	        green *= 255;
	        blue /= 255;
	        blue -= 0.5;
	        blue *= adjust;
	        blue += 0.5;
	        blue *= 255;
	        red = red < 0 ? 0 : red > 255 ? 255 : red;
	        green = green < 0 ? 0 : green > 255 ? 255 : green;
	        blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
	        data[i] = red;
	        data[i + 1] = green;
	        data[i + 2] = blue;
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'contrast', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Contrast);
	var Contrast_1 = Contrast.Contrast;

	var Emboss = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	exports.Emboss = function (imageData) {
	    var strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), dirY = 0, dirX = 0, data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
	    switch (direction) {
	        case 'top-left':
	            dirY = -1;
	            dirX = -1;
	            break;
	        case 'top':
	            dirY = -1;
	            dirX = 0;
	            break;
	        case 'top-right':
	            dirY = -1;
	            dirX = 1;
	            break;
	        case 'right':
	            dirY = 0;
	            dirX = 1;
	            break;
	        case 'bottom-right':
	            dirY = 1;
	            dirX = 1;
	            break;
	        case 'bottom':
	            dirY = 1;
	            dirX = 0;
	            break;
	        case 'bottom-left':
	            dirY = 1;
	            dirX = -1;
	            break;
	        case 'left':
	            dirY = 0;
	            dirX = -1;
	            break;
	        default:
	            Util.Util.error('Unknown emboss direction: ' + direction);
	    }
	    do {
	        var offsetY = (y - 1) * w4;
	        var otherY = dirY;
	        if (y + otherY < 1) {
	            otherY = 0;
	        }
	        if (y + otherY > h) {
	            otherY = 0;
	        }
	        var offsetYOther = (y - 1 + otherY) * w * 4;
	        var x = w;
	        do {
	            var offset = offsetY + (x - 1) * 4;
	            var otherX = dirX;
	            if (x + otherX < 1) {
	                otherX = 0;
	            }
	            if (x + otherX > w) {
	                otherX = 0;
	            }
	            var offsetOther = offsetYOther + (x - 1 + otherX) * 4;
	            var dR = data[offset] - data[offsetOther];
	            var dG = data[offset + 1] - data[offsetOther + 1];
	            var dB = data[offset + 2] - data[offsetOther + 2];
	            var dif = dR;
	            var absDif = dif > 0 ? dif : -dif;
	            var absG = dG > 0 ? dG : -dG;
	            var absB = dB > 0 ? dB : -dB;
	            if (absG > absDif) {
	                dif = dG;
	            }
	            if (absB > absDif) {
	                dif = dB;
	            }
	            dif *= strength;
	            if (blend) {
	                var r = data[offset] + dif;
	                var g = data[offset + 1] + dif;
	                var b = data[offset + 2] + dif;
	                data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
	                data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
	                data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
	            }
	            else {
	                var grey = greyLevel - dif;
	                if (grey < 0) {
	                    grey = 0;
	                }
	                else if (grey > 255) {
	                    grey = 255;
	                }
	                data[offset] = data[offset + 1] = data[offset + 2] = grey;
	            }
	        } while (--x);
	    } while (--y);
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'embossStrength', 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'embossWhiteLevel', 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'embossDirection', 'top-left', null, Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'embossBlend', false, null, Factory.Factory.afterSetFilter);
	});

	unwrapExports(Emboss);
	var Emboss_1 = Emboss.Emboss;

	var Enhance = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function remap(fromValue, fromMin, fromMax, toMin, toMax) {
	    var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;
	    if (fromRange === 0) {
	        return toMin + toRange / 2;
	    }
	    if (toRange === 0) {
	        return toMin;
	    }
	    toValue = (fromValue - fromMin) / fromRange;
	    toValue = toRange * toValue + toMin;
	    return toValue;
	}
	exports.Enhance = function (imageData) {
	    var data = imageData.data, nSubPixels = data.length, rMin = data[0], rMax = rMin, r, gMin = data[1], gMax = gMin, g, bMin = data[2], bMax = bMin, b, i;
	    var enhanceAmount = this.enhance();
	    if (enhanceAmount === 0) {
	        return;
	    }
	    for (i = 0; i < nSubPixels; i += 4) {
	        r = data[i + 0];
	        if (r < rMin) {
	            rMin = r;
	        }
	        else if (r > rMax) {
	            rMax = r;
	        }
	        g = data[i + 1];
	        if (g < gMin) {
	            gMin = g;
	        }
	        else if (g > gMax) {
	            gMax = g;
	        }
	        b = data[i + 2];
	        if (b < bMin) {
	            bMin = b;
	        }
	        else if (b > bMax) {
	            bMax = b;
	        }
	    }
	    if (rMax === rMin) {
	        rMax = 255;
	        rMin = 0;
	    }
	    if (gMax === gMin) {
	        gMax = 255;
	        gMin = 0;
	    }
	    if (bMax === bMin) {
	        bMax = 255;
	        bMin = 0;
	    }
	    var rMid, rGoalMax, rGoalMin, gMid, gGoalMax, gGoalMin, bMid, bGoalMax, bGoalMin;
	    if (enhanceAmount > 0) {
	        rGoalMax = rMax + enhanceAmount * (255 - rMax);
	        rGoalMin = rMin - enhanceAmount * (rMin - 0);
	        gGoalMax = gMax + enhanceAmount * (255 - gMax);
	        gGoalMin = gMin - enhanceAmount * (gMin - 0);
	        bGoalMax = bMax + enhanceAmount * (255 - bMax);
	        bGoalMin = bMin - enhanceAmount * (bMin - 0);
	    }
	    else {
	        rMid = (rMax + rMin) * 0.5;
	        rGoalMax = rMax + enhanceAmount * (rMax - rMid);
	        rGoalMin = rMin + enhanceAmount * (rMin - rMid);
	        gMid = (gMax + gMin) * 0.5;
	        gGoalMax = gMax + enhanceAmount * (gMax - gMid);
	        gGoalMin = gMin + enhanceAmount * (gMin - gMid);
	        bMid = (bMax + bMin) * 0.5;
	        bGoalMax = bMax + enhanceAmount * (bMax - bMid);
	        bGoalMin = bMin + enhanceAmount * (bMin - bMid);
	    }
	    for (i = 0; i < nSubPixels; i += 4) {
	        data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
	        data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
	        data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'enhance', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Enhance);
	var Enhance_1 = Enhance.Enhance;

	var Grayscale = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Grayscale = function (imageData) {
	    var data = imageData.data, len = data.length, i, brightness;
	    for (i = 0; i < len; i += 4) {
	        brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
	        data[i] = brightness;
	        data[i + 1] = brightness;
	        data[i + 2] = brightness;
	    }
	};
	});

	unwrapExports(Grayscale);
	var Grayscale_1 = Grayscale.Grayscale;

	var HSL = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	Factory.Factory.addGetterSetter(Node_1.Node, 'hue', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'saturation', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'luminance', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	exports.HSL = function (imageData) {
	    var data = imageData.data, nPixels = data.length, v = 1, s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127, i;
	    var vsu = v * s * Math.cos((h * Math.PI) / 180), vsw = v * s * Math.sin((h * Math.PI) / 180);
	    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
	    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
	    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
	    var r, g, b, a;
	    for (i = 0; i < nPixels; i += 4) {
	        r = data[i + 0];
	        g = data[i + 1];
	        b = data[i + 2];
	        a = data[i + 3];
	        data[i + 0] = rr * r + rg * g + rb * b + l;
	        data[i + 1] = gr * r + gg * g + gb * b + l;
	        data[i + 2] = br * r + bg * g + bb * b + l;
	        data[i + 3] = a;
	    }
	};
	});

	unwrapExports(HSL);
	var HSL_1 = HSL.HSL;

	var HSV = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.HSV = function (imageData) {
	    var data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, i;
	    var vsu = v * s * Math.cos((h * Math.PI) / 180), vsw = v * s * Math.sin((h * Math.PI) / 180);
	    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
	    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
	    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
	    var r, g, b, a;
	    for (i = 0; i < nPixels; i += 4) {
	        r = data[i + 0];
	        g = data[i + 1];
	        b = data[i + 2];
	        a = data[i + 3];
	        data[i + 0] = rr * r + rg * g + rb * b;
	        data[i + 1] = gr * r + gg * g + gb * b;
	        data[i + 2] = br * r + bg * g + bb * b;
	        data[i + 3] = a;
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'hue', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'saturation', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'value', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(HSV);
	var HSV_1 = HSV.HSV;

	var Invert = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Invert = function (imageData) {
	    var data = imageData.data, len = data.length, i;
	    for (i = 0; i < len; i += 4) {
	        data[i] = 255 - data[i];
	        data[i + 1] = 255 - data[i + 1];
	        data[i + 2] = 255 - data[i + 2];
	    }
	};
	});

	unwrapExports(Invert);
	var Invert_1 = Invert.Invert;

	var Kaleidoscope = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var ToPolar = function (src, dst, opt) {
	    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, r = 0, g = 0, b = 0, a = 0;
	    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
	    x = xSize - xMid;
	    y = ySize - yMid;
	    rad = Math.sqrt(x * x + y * y);
	    rMax = rad > rMax ? rad : rMax;
	    var rSize = ySize, tSize = xSize, radius, theta;
	    var conversion = ((360 / tSize) * Math.PI) / 180, sin, cos;
	    for (theta = 0; theta < tSize; theta += 1) {
	        sin = Math.sin(theta * conversion);
	        cos = Math.cos(theta * conversion);
	        for (radius = 0; radius < rSize; radius += 1) {
	            x = Math.floor(xMid + ((rMax * radius) / rSize) * cos);
	            y = Math.floor(yMid + ((rMax * radius) / rSize) * sin);
	            i = (y * xSize + x) * 4;
	            r = srcPixels[i + 0];
	            g = srcPixels[i + 1];
	            b = srcPixels[i + 2];
	            a = srcPixels[i + 3];
	            i = (theta + radius * xSize) * 4;
	            dstPixels[i + 0] = r;
	            dstPixels[i + 1] = g;
	            dstPixels[i + 2] = b;
	            dstPixels[i + 3] = a;
	        }
	    }
	};
	var FromPolar = function (src, dst, opt) {
	    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, dx, dy, r = 0, g = 0, b = 0, a = 0;
	    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
	    x = xSize - xMid;
	    y = ySize - yMid;
	    rad = Math.sqrt(x * x + y * y);
	    rMax = rad > rMax ? rad : rMax;
	    var rSize = ySize, tSize = xSize, radius, theta, phaseShift = opt.polarRotation || 0;
	    var x1, y1;
	    for (x = 0; x < xSize; x += 1) {
	        for (y = 0; y < ySize; y += 1) {
	            dx = x - xMid;
	            dy = y - yMid;
	            radius = (Math.sqrt(dx * dx + dy * dy) * rSize) / rMax;
	            theta = ((Math.atan2(dy, dx) * 180) / Math.PI + 360 + phaseShift) % 360;
	            theta = (theta * tSize) / 360;
	            x1 = Math.floor(theta);
	            y1 = Math.floor(radius);
	            i = (y1 * xSize + x1) * 4;
	            r = srcPixels[i + 0];
	            g = srcPixels[i + 1];
	            b = srcPixels[i + 2];
	            a = srcPixels[i + 3];
	            i = (y * xSize + x) * 4;
	            dstPixels[i + 0] = r;
	            dstPixels[i + 1] = g;
	            dstPixels[i + 2] = b;
	            dstPixels[i + 3] = a;
	        }
	    }
	};
	exports.Kaleidoscope = function (imageData) {
	    var xSize = imageData.width, ySize = imageData.height;
	    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
	    var power = Math.round(this.kaleidoscopePower());
	    var angle = Math.round(this.kaleidoscopeAngle());
	    var offset = Math.floor((xSize * (angle % 360)) / 360);
	    if (power < 1) {
	        return;
	    }
	    var tempCanvas = Util.Util.createCanvasElement();
	    tempCanvas.width = xSize;
	    tempCanvas.height = ySize;
	    var scratchData = tempCanvas
	        .getContext('2d')
	        .getImageData(0, 0, xSize, ySize);
	    ToPolar(imageData, scratchData, {
	        polarCenterX: xSize / 2,
	        polarCenterY: ySize / 2
	    });
	    var minSectionSize = xSize / Math.pow(2, power);
	    while (minSectionSize <= 8) {
	        minSectionSize = minSectionSize * 2;
	        power -= 1;
	    }
	    minSectionSize = Math.ceil(minSectionSize);
	    var sectionSize = minSectionSize;
	    var xStart = 0, xEnd = sectionSize, xDelta = 1;
	    if (offset + minSectionSize > xSize) {
	        xStart = sectionSize;
	        xEnd = 0;
	        xDelta = -1;
	    }
	    for (y = 0; y < ySize; y += 1) {
	        for (x = xStart; x !== xEnd; x += xDelta) {
	            xoff = Math.round(x + offset) % xSize;
	            srcPos = (xSize * y + xoff) * 4;
	            r = scratchData.data[srcPos + 0];
	            g = scratchData.data[srcPos + 1];
	            b = scratchData.data[srcPos + 2];
	            a = scratchData.data[srcPos + 3];
	            dstPos = (xSize * y + x) * 4;
	            scratchData.data[dstPos + 0] = r;
	            scratchData.data[dstPos + 1] = g;
	            scratchData.data[dstPos + 2] = b;
	            scratchData.data[dstPos + 3] = a;
	        }
	    }
	    for (y = 0; y < ySize; y += 1) {
	        sectionSize = Math.floor(minSectionSize);
	        for (i = 0; i < power; i += 1) {
	            for (x = 0; x < sectionSize + 1; x += 1) {
	                srcPos = (xSize * y + x) * 4;
	                r = scratchData.data[srcPos + 0];
	                g = scratchData.data[srcPos + 1];
	                b = scratchData.data[srcPos + 2];
	                a = scratchData.data[srcPos + 3];
	                dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
	                scratchData.data[dstPos + 0] = r;
	                scratchData.data[dstPos + 1] = g;
	                scratchData.data[dstPos + 2] = b;
	                scratchData.data[dstPos + 3] = a;
	            }
	            sectionSize *= 2;
	        }
	    }
	    FromPolar(scratchData, imageData, { polarRotation: 0 });
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'kaleidoscopePower', 2, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'kaleidoscopeAngle', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Kaleidoscope);
	var Kaleidoscope_1 = Kaleidoscope.Kaleidoscope;

	var Mask = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function pixelAt(idata, x, y) {
	    var idx = (y * idata.width + x) * 4;
	    var d = [];
	    d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
	    return d;
	}
	function rgbDistance(p1, p2) {
	    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) +
	        Math.pow(p1[1] - p2[1], 2) +
	        Math.pow(p1[2] - p2[2], 2));
	}
	function rgbMean(pTab) {
	    var m = [0, 0, 0];
	    for (var i = 0; i < pTab.length; i++) {
	        m[0] += pTab[i][0];
	        m[1] += pTab[i][1];
	        m[2] += pTab[i][2];
	    }
	    m[0] /= pTab.length;
	    m[1] /= pTab.length;
	    m[2] /= pTab.length;
	    return m;
	}
	function backgroundMask(idata, threshold) {
	    var rgbv_no = pixelAt(idata, 0, 0);
	    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
	    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
	    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
	    var thres = threshold || 10;
	    if (rgbDistance(rgbv_no, rgbv_ne) < thres &&
	        rgbDistance(rgbv_ne, rgbv_se) < thres &&
	        rgbDistance(rgbv_se, rgbv_so) < thres &&
	        rgbDistance(rgbv_so, rgbv_no) < thres) {
	        var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
	        var mask = [];
	        for (var i = 0; i < idata.width * idata.height; i++) {
	            var d = rgbDistance(mean, [
	                idata.data[i * 4],
	                idata.data[i * 4 + 1],
	                idata.data[i * 4 + 2]
	            ]);
	            mask[i] = d < thres ? 0 : 255;
	        }
	        return mask;
	    }
	}
	function applyMask(idata, mask) {
	    for (var i = 0; i < idata.width * idata.height; i++) {
	        idata.data[4 * i + 3] = mask[i];
	    }
	}
	function erodeMask(mask, sw, sh) {
	    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
	    var side = Math.round(Math.sqrt(weights.length));
	    var halfSide = Math.floor(side / 2);
	    var maskResult = [];
	    for (var y = 0; y < sh; y++) {
	        for (var x = 0; x < sw; x++) {
	            var so = y * sw + x;
	            var a = 0;
	            for (var cy = 0; cy < side; cy++) {
	                for (var cx = 0; cx < side; cx++) {
	                    var scy = y + cy - halfSide;
	                    var scx = x + cx - halfSide;
	                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
	                        var srcOff = scy * sw + scx;
	                        var wt = weights[cy * side + cx];
	                        a += mask[srcOff] * wt;
	                    }
	                }
	            }
	            maskResult[so] = a === 255 * 8 ? 255 : 0;
	        }
	    }
	    return maskResult;
	}
	function dilateMask(mask, sw, sh) {
	    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
	    var side = Math.round(Math.sqrt(weights.length));
	    var halfSide = Math.floor(side / 2);
	    var maskResult = [];
	    for (var y = 0; y < sh; y++) {
	        for (var x = 0; x < sw; x++) {
	            var so = y * sw + x;
	            var a = 0;
	            for (var cy = 0; cy < side; cy++) {
	                for (var cx = 0; cx < side; cx++) {
	                    var scy = y + cy - halfSide;
	                    var scx = x + cx - halfSide;
	                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
	                        var srcOff = scy * sw + scx;
	                        var wt = weights[cy * side + cx];
	                        a += mask[srcOff] * wt;
	                    }
	                }
	            }
	            maskResult[so] = a >= 255 * 4 ? 255 : 0;
	        }
	    }
	    return maskResult;
	}
	function smoothEdgeMask(mask, sw, sh) {
	    var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
	    var side = Math.round(Math.sqrt(weights.length));
	    var halfSide = Math.floor(side / 2);
	    var maskResult = [];
	    for (var y = 0; y < sh; y++) {
	        for (var x = 0; x < sw; x++) {
	            var so = y * sw + x;
	            var a = 0;
	            for (var cy = 0; cy < side; cy++) {
	                for (var cx = 0; cx < side; cx++) {
	                    var scy = y + cy - halfSide;
	                    var scx = x + cx - halfSide;
	                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
	                        var srcOff = scy * sw + scx;
	                        var wt = weights[cy * side + cx];
	                        a += mask[srcOff] * wt;
	                    }
	                }
	            }
	            maskResult[so] = a;
	        }
	    }
	    return maskResult;
	}
	exports.Mask = function (imageData) {
	    var threshold = this.threshold(), mask = backgroundMask(imageData, threshold);
	    if (mask) {
	        mask = erodeMask(mask, imageData.width, imageData.height);
	        mask = dilateMask(mask, imageData.width, imageData.height);
	        mask = smoothEdgeMask(mask, imageData.width, imageData.height);
	        applyMask(imageData, mask);
	    }
	    return imageData;
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'threshold', 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Mask);
	var Mask_1 = Mask.Mask;

	var Noise = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.Noise = function (imageData) {
	    var amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2, i;
	    for (i = 0; i < nPixels; i += 4) {
	        data[i + 0] += half - 2 * half * Math.random();
	        data[i + 1] += half - 2 * half * Math.random();
	        data[i + 2] += half - 2 * half * Math.random();
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'noise', 0.2, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Noise);
	var Noise_1 = Noise.Noise;

	var Pixelate = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	exports.Pixelate = function (imageData) {
	    var pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, x, y, i, red, green, blue, alpha, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), xBinStart, xBinEnd, yBinStart, yBinEnd, xBin, yBin, pixelsInBin, data = imageData.data;
	    if (pixelSize <= 0) {
	        Util.Util.error('pixelSize value can not be <= 0');
	        return;
	    }
	    for (xBin = 0; xBin < nBinsX; xBin += 1) {
	        for (yBin = 0; yBin < nBinsY; yBin += 1) {
	            red = 0;
	            green = 0;
	            blue = 0;
	            alpha = 0;
	            xBinStart = xBin * pixelSize;
	            xBinEnd = xBinStart + pixelSize;
	            yBinStart = yBin * pixelSize;
	            yBinEnd = yBinStart + pixelSize;
	            pixelsInBin = 0;
	            for (x = xBinStart; x < xBinEnd; x += 1) {
	                if (x >= width) {
	                    continue;
	                }
	                for (y = yBinStart; y < yBinEnd; y += 1) {
	                    if (y >= height) {
	                        continue;
	                    }
	                    i = (width * y + x) * 4;
	                    red += data[i + 0];
	                    green += data[i + 1];
	                    blue += data[i + 2];
	                    alpha += data[i + 3];
	                    pixelsInBin += 1;
	                }
	            }
	            red = red / pixelsInBin;
	            green = green / pixelsInBin;
	            blue = blue / pixelsInBin;
	            alpha = alpha / pixelsInBin;
	            for (x = xBinStart; x < xBinEnd; x += 1) {
	                if (x >= width) {
	                    continue;
	                }
	                for (y = yBinStart; y < yBinEnd; y += 1) {
	                    if (y >= height) {
	                        continue;
	                    }
	                    i = (width * y + x) * 4;
	                    data[i + 0] = red;
	                    data[i + 1] = green;
	                    data[i + 2] = blue;
	                    data[i + 3] = alpha;
	                }
	            }
	        }
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'pixelSize', 8, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Pixelate);
	var Pixelate_1 = Pixelate.Pixelate;

	var Posterize = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.Posterize = function (imageData) {
	    var levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels, i;
	    for (i = 0; i < len; i += 1) {
	        data[i] = Math.floor(data[i] / scale) * scale;
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'levels', 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Posterize);
	var Posterize_1 = Posterize.Posterize;

	var RGB = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.RGB = function (imageData) {
	    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), i, brightness;
	    for (i = 0; i < nPixels; i += 4) {
	        brightness =
	            (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
	        data[i] = brightness * red;
	        data[i + 1] = brightness * green;
	        data[i + 2] = brightness * blue;
	        data[i + 3] = data[i + 3];
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'red', 0, function (val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	        return 255;
	    }
	    else if (val < 0) {
	        return 0;
	    }
	    else {
	        return Math.round(val);
	    }
	});
	Factory.Factory.addGetterSetter(Node_1.Node, 'green', 0, function (val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	        return 255;
	    }
	    else if (val < 0) {
	        return 0;
	    }
	    else {
	        return Math.round(val);
	    }
	});
	Factory.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators.RGBComponent, Factory.Factory.afterSetFilter);
	});

	unwrapExports(RGB);
	var RGB_1 = RGB.RGB;

	var RGBA = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.RGBA = function (imageData) {
	    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha(), i, ia;
	    for (i = 0; i < nPixels; i += 4) {
	        ia = 1 - alpha;
	        data[i] = red * alpha + data[i] * ia;
	        data[i + 1] = green * alpha + data[i + 1] * ia;
	        data[i + 2] = blue * alpha + data[i + 2] * ia;
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'red', 0, function (val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	        return 255;
	    }
	    else if (val < 0) {
	        return 0;
	    }
	    else {
	        return Math.round(val);
	    }
	});
	Factory.Factory.addGetterSetter(Node_1.Node, 'green', 0, function (val) {
	    this._filterUpToDate = false;
	    if (val > 255) {
	        return 255;
	    }
	    else if (val < 0) {
	        return 0;
	    }
	    else {
	        return Math.round(val);
	    }
	});
	Factory.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators.RGBComponent, Factory.Factory.afterSetFilter);
	Factory.Factory.addGetterSetter(Node_1.Node, 'alpha', 1, function (val) {
	    this._filterUpToDate = false;
	    if (val > 1) {
	        return 1;
	    }
	    else if (val < 0) {
	        return 0;
	    }
	    else {
	        return val;
	    }
	});
	});

	unwrapExports(RGBA);
	var RGBA_1 = RGBA.RGBA;

	var Sepia = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Sepia = function (imageData) {
	    var data = imageData.data, nPixels = data.length, i, r, g, b;
	    for (i = 0; i < nPixels; i += 4) {
	        r = data[i + 0];
	        g = data[i + 1];
	        b = data[i + 2];
	        data[i + 0] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
	        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
	        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
	    }
	};
	});

	unwrapExports(Sepia);
	var Sepia_1 = Sepia.Sepia;

	var Solarize = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Solarize = function (imageData) {
	    var data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
	    do {
	        var offsetY = (y - 1) * w4;
	        var x = w;
	        do {
	            var offset = offsetY + (x - 1) * 4;
	            var r = data[offset];
	            var g = data[offset + 1];
	            var b = data[offset + 2];
	            if (r > 127) {
	                r = 255 - r;
	            }
	            if (g > 127) {
	                g = 255 - g;
	            }
	            if (b > 127) {
	                b = 255 - b;
	            }
	            data[offset] = r;
	            data[offset + 1] = g;
	            data[offset + 2] = b;
	        } while (--x);
	    } while (--y);
	};
	});

	unwrapExports(Solarize);
	var Solarize_1 = Solarize.Solarize;

	var Threshold = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.Threshold = function (imageData) {
	    var level = this.threshold() * 255, data = imageData.data, len = data.length, i;
	    for (i = 0; i < len; i += 1) {
	        data[i] = data[i] < level ? 0 : 255;
	    }
	};
	Factory.Factory.addGetterSetter(Node_1.Node, 'threshold', 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
	});

	unwrapExports(Threshold);
	var Threshold_1 = Threshold.Threshold;

	var _FullInternals = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





































	exports.Konva = _CoreInternals.Konva.Util._assign(_CoreInternals.Konva, {
	    Arc: Arc_1.Arc,
	    Arrow: Arrow_1.Arrow,
	    Circle: Circle_1.Circle,
	    Ellipse: Ellipse_1.Ellipse,
	    Image: Image_1.Image,
	    Label: Label_1.Label,
	    Tag: Label_1.Tag,
	    Line: Line_1.Line,
	    Path: Path_1.Path,
	    Rect: Rect_1.Rect,
	    RegularPolygon: RegularPolygon_1.RegularPolygon,
	    Ring: Ring_1.Ring,
	    Sprite: Sprite_1.Sprite,
	    Star: Star_1.Star,
	    Text: Text_1.Text,
	    TextPath: TextPath_1.TextPath,
	    Transformer: Transformer_1.Transformer,
	    Wedge: Wedge_1.Wedge,
	    Filters: {
	        Blur: Blur.Blur,
	        Brighten: Brighten.Brighten,
	        Contrast: Contrast.Contrast,
	        Emboss: Emboss.Emboss,
	        Enhance: Enhance.Enhance,
	        Grayscale: Grayscale.Grayscale,
	        HSL: HSL.HSL,
	        HSV: HSV.HSV,
	        Invert: Invert.Invert,
	        Kaleidoscope: Kaleidoscope.Kaleidoscope,
	        Mask: Mask.Mask,
	        Noise: Noise.Noise,
	        Pixelate: Pixelate.Pixelate,
	        Posterize: Posterize.Posterize,
	        RGB: RGB.RGB,
	        RGBA: RGBA.RGBA,
	        Sepia: Sepia.Sepia,
	        Solarize: Solarize.Solarize,
	        Threshold: Threshold.Threshold
	    }
	});
	});

	unwrapExports(_FullInternals);
	var _FullInternals_1 = _FullInternals.Konva;

	var lib = createCommonjsModule(function (module, exports) {
	var Konva = _FullInternals.Konva;
	Konva._injectGlobal(Konva);
	exports['default'] = Konva;
	module.exports = exports['default'];
	});

	class JSONGetter {
	    constructor () {

	    }

	    getJSON(json_file) {
	        var request = new XMLHttpRequest();
	        request.open("GET", json_file, false);
	        request.send(null);
	        var json = request.responseText;
	        return json;
	    }
	}

	/**
	 * Adds new layers to images_json before it is being used to construct the stage.
	 */
	class LayerAdder {
	    constructor() {
	    }

	    /**
	     * @param {object} imagesJson The JSON object that includes all the layers and images for stage
	     * @param {object} newLayers The new layers (as a JSON object) that are to be inserted into images_json
	     * @param {string} nextLayerId Splice the new layers before the layer with this id.
	     * @returns {object} The combined JSON object.
	     */
	    process(imagesJson, newLayers, nextLayerId) {
	        var indexOfNextLayer = imagesJson['children'].indexOf(
	            imagesJson['children'].find(function(child){
	                return child.attrs.id === nextLayerId;
	            })
	        );

	        newLayers.forEach(function(newLayer){
	            imagesJson['children'].splice(indexOfNextLayer, 0, newLayer);
	            indexOfNextLayer++; // The nextLayer index has moved
	        });

	        return imagesJson;
	    }
	}

	/**
	 * Add child elements to a layer in images_json before it is used to construct the stage.
	 */
	class LayerChildAdder {
	    constructor() {
	    }

	    /**
	     * @param {object} imagesJson The JSON object that includes all the layers and images for stage
	     * @param {object} newChildren The new children (as a JSON object) that are to be added to the layer
	     * @param {string} layerName Add the children to the layer with this id
	     * @returns {object} The combined JSON object.
	     */
	    add(imagesJson, newChildren, layerName)
	    {
	        var layer = imagesJson.children.find(function(child){
	            return child.attrs.id === layerName;
	        });
	        layer.children.push.apply(
	            layer.children,
	            newChildren
	        );
	        return imagesJson;
	    }
	}

	/** */
	class SequencesBuilder {

	    constructor(sequenceBuilder) {
	        this.sequenceBuilder = sequenceBuilder;
	    }

	    build(sequences_json) {
	        var builtSequences = [];
	        for (var key in sequences_json) {
	            builtSequences.push(
	                this.sequenceBuilder.build(
	                    sequences_json[key].slides, key
	                )
	            );
	        }
	        return builtSequences;
	    }
	}

	/** */
	class SequenceBuilder {

	    constructor(slideBuilder) {
	        this.slideBuilder = slideBuilder;
	    }

	    build(slides, key) {
	        var builtSequence = {
	            attrs: {},
	            children: [],
	            className: "Layer"
	        };
	        builtSequence.attrs.category = 'sequence';
	        builtSequence.attrs.visible = false;
	        builtSequence.attrs.id = key;
	        for (let [index, slide] of slides.entries()) {
	            builtSequence.children.push(this.slideBuilder.build(slide));
	        }        return builtSequence;
	    }
	}

	/** */
	class SlideBuilder {

	    constructor(textBuilder) {
	        this.textBuilder = textBuilder;
	    }

	    build(slide) {
	        var builtSlide = {
	            "attrs": {}
	        };

	        var background = {
	            "attrs": {}
	        };

	        if (slide.imageSrc) {
	            background.attrs.src = slide.imageSrc;
	            background.className = "Image";
	        } else {
	            background.attrs.x = 0;
	            background.attrs.y = 0;
	            background.attrs.fill = "black";
	            background.attrs.height = 643;
	            background.attrs.width = 981;
	            background.className = "Rect";
	        }

	        if (slide.text) {
	            builtSlide.className = "Group";
	            builtSlide.attrs.height = 643;
	            builtSlide.attrs.width = 981;    
	            builtSlide.children = [];
	            builtSlide.children.push(background);
	            builtSlide.children.push(this.textBuilder.build(slide.text));
	        } else {
	            builtSlide = background;
	        }

	        builtSlide.attrs.visible = false;
	        builtSlide.attrs.category = "sequence";
	        builtSlide.attrs.id = slide.id;

	        return builtSlide;
	    }
	}

	/** */
	class TextBuilder {

	    constructor() {
	    }

	    build(text) {
	        var builtText = {
	            "attrs": {}
	        };
	        builtText.attrs.text = text.text;
	        builtText.attrs.fontFamily = "Chalkboard SE";
	        builtText.attrs.fontSize = 26;
	        builtText.attrs.fill = "white";
	        builtText.attrs.shadowColor = "#bbbbbb";
	        builtText.attrs.shadowBlur = 10;
	        builtText.attrs.width = 981;
	        builtText.attrs.align = "center";
	        builtText.attrs.y = 321;
	        builtText.className = "Text";
	        return builtText;
	    }
	}

	class KiiGame {
	    constructor(jsonGetter = null, sequencesBuilder = null) {
	        this.jsonGetter = jsonGetter;
	        this.sequencesBuilder = sequencesBuilder;

	        if (this.jsonGetter === null) {
	            this.jsonGetter = new JSONGetter();
	        }
	        if (this.sequencesBuilder === null) {
	            this.sequencesBuilder = new SequencesBuilder(
	                new SequenceBuilder(
	                    new SlideBuilder(
	                        new TextBuilder()
	                    )
	                )
	            );
	        }

	        // Alternative variable for `this` to allow reference even when it's shadowed
	        var self = this;

	        // The amount of rewards found. LZ specific, TODO refactor
	        this.rewards = 0;

	        // List of items in the inventory. inventory_list.length gives the item amount.
	        this.inventory_list = [];
	        // Offset from left for drawing inventory items starting from proper position
	        this.offsetFromLeft = 50;
	        // How many items the inventory can show at a time (7 with current settings)
	        this.inventory_max = 7;
	        // The item number where the shown items start from
	        // (how many items from the beginning are not shown)
	        this.inventory_index = 0;

	        // Timeout event for showing character animation for certain duration
	        this.character_animation_timeout;

	        // Temporary location for inventory items if they need to be moved back to the location because of invalid interaction
	        this.dragStartX;
	        this.dragStartY;

	        // For limiting the amount of intersection checks
	        this.delayEnabled = false;

	        // For limiting the speed of inventory browsing when dragging an item
	        this.dragDelay = 500;
	        this.dragDelayEnabled = false;

	        // Music
	        // Different browsers and different browser versions support different formats. MP3 should work with in all the major
	        // browsers in current versions.
	        this.current_music;
	        this.current_music_source;

	        // Menu
	        this.menu; // also accessed in latkazombit.js
	        // Track the currently shown menu
	        this.current_menu;

	        // The item dragged from the inventory
	        this.dragged_item;

	        // Intersection target (object below dragged item)
	        this.target;

	        // Animations
	        // Animation for fading the screen
	        this.fade_full;

	        // Animation for fading the room portion of the screen
	        this.fade_room;

	        // List of animated objects
	        this.animated_objects = [];

	        // List of character animations.
	        this.character_animations = []; // also accessed in latkazombit.js

	        // Timeout event for showing character animation for certain duration
	        this.character_animation_timeout;

	        // Default character animations
	        this.speak_animation;
	        this.idle_animation;

	        // Variable for saving the current room (for changing backgrounds and object layers)
	        this.current_layer;
	        this.current_background;
	        this.game_start_layer; // also accessed in latkazombit.js
	        this.start_layer; // also accessed in latkazombit.js

	        // List of animated objects
	        this.animated_objects = [];

	        // List of character animations.
	        this.character_animations = []; // also accessed in latkazombit.js

	        // Get jsons from the server
	        this.images_json = JSON.parse(this.getJSON('images.json'));
	        this.rooms_json = JSON.parse(this.getJSON('rooms.json'))['rooms'];
	        this.texts_json = JSON.parse(this.getJSON('texts.json'));
	        this.interactions_json = JSON.parse(this.getJSON('interactions.json'));
	        this.character_json = JSON.parse(this.getJSON('character.json'));
	        this.sequences_json = JSON.parse(this.getJSON('sequences.json'));
	        this.music_json = JSON.parse(this.getJSON('music.json'));
	        this.menu_json = JSON.parse(this.getJSON('menu.json'));
	        this.items_json = JSON.parse(this.getJSON('items.json'));

	        // Add rooms to images_json for stage building. Add them before the room
	        // fade layer to ensure correct draw order.
	        var stageLayerAdder = new LayerAdder();
	        this.images_json = stageLayerAdder.process(
	            this.images_json,
	            this.rooms_json,
	            'fade_layer_room'
	        );

	        // Build an array of all the sequences out of sequences_json and merge them to
	        // images_json for stage building.
	        var builtSequences = this.sequencesBuilder.build(this.sequences_json);
	        this.images_json = stageLayerAdder.process(
	            this.images_json,
	            builtSequences,
	            'start_layer_menu' // TODO: Use fade_layer_full ?
	        );

	        // Push items.json contents to correct layer.
	        var stageLayerChildAdder = new LayerChildAdder();
	        this.images_json = stageLayerChildAdder.add(
	            this.images_json,
	            this.items_json,
	            'inventory_item_cache'
	        );
	        // Push character animation frames to correct layer.
	        this.images_json = stageLayerChildAdder.add(
	            this.images_json,
	            this.character_json.frames,
	            'character_layer'
	        );

	        // Create stage and everything in it from json
	        this.images_json_text = JSON.stringify(this.images_json);
	        this.stage = lib.Node.create(this.images_json_text, 'container');

	        // Define variables from stage for easier use

	        // Texts & layers
	        this.monologue = this.getObject("monologue");
	        this.character_speech_bubble = this.getObject("character_speech_bubble");
	        this.npc_monologue = this.getObject("npc_monologue");
	        this.npc_speech_bubble = this.getObject("npc_speech_bubble");
	        this.interaction_text = this.getObject("interaction_text");

	        this.inventory_layer = this.getObject("inventory_layer");
	        this.inventory_bar_layer = this.getObject("inventory_bar_layer");
	        this.character_layer = this.getObject("character_layer");
	        this.text_layer = this.getObject("text_layer");
	        this.fade_layer_full = this.getObject("fade_layer_full");
	        this.fade_layer_room = this.getObject("fade_layer_room");

	        // Scale background and UI elements
	        this.getObject("black_screen_full").size({width: this.stage.width(), height: this.stage.height()});
	        this.getObject("black_screen_room").size({width: this.stage.width(), height: this.stage.height() - 100});
	        this.getObject("inventory_bar").y(this.stage.height() - 100);
	        this.getObject("inventory_bar").width(this.stage.width());

	        // Animation for fading the screen
	        this.fade_full = new lib.Tween({
	            node : this.fade_layer_full,
	            duration : 0.6,
	            opacity : 1
	        });

	        // Animation for fading the room portion of the screen
	        this.fade_room = new lib.Tween({
	            node : this.fade_layer_room,
	            duration : 0.6,
	            opacity : 1
	        });

	        // Load up frames from json to the character animations array.
	        var animation_data = this.character_json.animations;
	        for (var i in animation_data) {
	            var frames = [];
	            for (var j in animation_data[i].frames) {
	                var frame = new lib.Tween({
	                    node: this.getObject(animation_data[i].frames[j].node),
	                    duration: animation_data[i].frames[j].duration
	                });
	                frames.push(frame);
	            }
	           this.character_animations[animation_data[i].id] = frames;
	        }

	        // Set up onFinish functions for each frame to show the next frame. In the case
	        // of the last of the frames, show the first frame.
	        for (var i in this.character_animations) {
	            for (var j = 0; j < this.character_animations[i].length; j++) {
	                if (this.character_animations[i].length > j+1) {
	                    this.character_animations[i][j].onFinish = function() {
	                        // `this` refers to the character_animations object,
	                        // `self` refers to the engine object
	                        for (var k in self.character_animations) {
	                            if (self.character_animations[k].indexOf(this) > -1) {
	                                var animation = self.character_animations[k];
	                                var frame_index = self.character_animations[k].indexOf(this);
	                                this.node.hide();
	                                animation[frame_index+1].node.show();
	                                this.reset();
	                                animation[frame_index+1].play();
	                            }
	                        }
	                    };
	                } else {
	                    this.character_animations[i][j].onFinish = function() {
	                        for (var k in self.character_animations) {
	                            if (self.character_animations[k].indexOf(this) > -1) {
	                                var animation = self.character_animations[k];
	                                this.node.hide();
	                                animation[0].node.show();
	                                this.reset();
	                                animation[0].play();
	                            }
	                        }
	                    };
	                }
	            }
	        }

	        // Default character animations
	        this.speak_animation = this.character_animations["speak"];
	        this.idle_animation = this.character_animations["idle"];

	        // Creating all image objects from json file based on their attributes
	        var imageData = this.stage.toObject();

	        for (var i = 0; i < imageData.children.length; i++) {
	            for (var j = 0; j < imageData.children[i].children.length; j++) {
	                if (imageData.children[i].children[j].className == 'Image') {
	                    this.createObject(imageData.children[i].children[j].attrs);
	                    var object_attrs = imageData.children[i].children[j].attrs;

	                    if (object_attrs.animated === true) {
	                        this.create_animation(this.getObject(object_attrs.id));
	                    }
	                }
	            }
	            if (imageData.children[i].attrs.category == 'menu') {
	                this.create_menu_action(imageData.children[i]);
	            }
	        }

	        // On window load we create image hit regions for our items on object layers
	        window.onload = () => { this.init_hit_regions(); };

	        // Mouse up and touch end events (picking up items from the environment
	        // Mouse click and tap events (examine items in the inventory)
	        this.inventory_layer.on('click tap', (event) => {
	            this.handle_click(event);
	        });
	        // Drag start events
	        this.stage.find('Image').on('dragstart', (event) => {
	            this.dragged_item = event.target;
	            this.inventoryDrag(this.dragged_item);
	        });

	        // While dragging events (use item on item or object)
	        this.stage.on('dragmove', (event) => {
	            this.dragged_item = event.target;

	            if (!this.delayEnabled) {
	                // Setting a small delay to not spam intersection check on every moved pixel
	                this.setDelay(10);

	                // Loop through all the items on the current object layer
	                for (var i = 0; i < this.current_layer.children.length; i++) {
	                    var object = (this.current_layer.getChildren())[i];

	                    if (object != undefined && object.getAttr('category') != 'room_background') {
	                        // Break if still intersecting with the same target
	                        if (this.target != null && this.checkIntersection(this.dragged_item, this.target)) {
	                            break;
	                        } else if (this.checkIntersection(this.dragged_item, object)) {
	                            // If not, check for a new target
	                            if (this.target != object) {
	                                this.target = object;
	                            }
	                            break;
	                        } else {
	                            // No target, move on
	                            this.target = null;
	                        }
	                    }
	                }

	                // If no intersecting targets were found on object layer, check the inventory
	                if (this.target == null) {
	                    // Loop through all the items on the inventory layer
	                    for (var i = 0; i < this.inventory_layer.children.length; i++) {
	                        var object = (this.inventory_layer.getChildren())[i];
	                        if (object != undefined) {
	                            // Look for intersecting targets
	                            if (this.checkIntersection(this.dragged_item, object)) {
	                                if (this.target != object) {
	                                    this.target = object;
	                                }
	                                break;
	                            } else {
	                                this.target = null;
	                            }
	                        }
	                    }
	                }

	                // Next, check the inventory_bar_layer, if the item is dragged over the inventory arrows
	                if (this.target == null) {
	                    var leftArrow = this.getObject("inventory_left_arrow");
	                    var rightArrow = this.getObject("inventory_right_arrow");
	                    if (!this.dragDelayEnabled) {
	                        if (this.checkIntersection(this.dragged_item, leftArrow)) {
	                            this.dragDelayEnabled = true;
	                            this.inventory_index--;
	                            this.redrawInventory();
	                            setTimeout(() => this.dragDelayEnabled = false, this.dragDelay);
	                        } else if (this.checkIntersection(this.dragged_item, rightArrow)) {
	                            this.dragDelayEnabled = true;
	                            this.inventory_index++;
	                            this.redrawInventory();
	                            setTimeout(() => this.dragDelayEnabled = false, this.dragDelay);
	                        } else {
	                            this.target = null;
	                        }
	                    }
	                    this.clearText(this.interaction_text);
	                }

	                // If target is found, highlight it and show the interaction text
	                if (this.target != null) {
	                    this.current_layer.getChildren().each((shape, i) => {
	                        shape.shadowBlur(0);
	                    });
	                    this.inventory_layer.getChildren().each((shape, i) => {
	                        shape.shadowBlur(0);
	                    });
	                    this.target.clearCache();
	                    this.target.shadowColor('purple');
	                    this.target.shadowOffset({x: 0, y: 0});
	                    this.target.shadowBlur(20);
	                    this.inventory_layer.draw();

	                    // Don't cause a mass of errors if no text found
	                    try {
	                        this.interaction_text.text(this.texts_json[this.target.id()].name);
	                    } catch (e) {
	                        // Do nothing
	                    }

	                    this.interaction_text.x(this.dragged_item.x() + (this.dragged_item.width() / 2));
	                    this.interaction_text.y(this.dragged_item.y() - 30);
	                    this.interaction_text.offset({
	                        x : this.interaction_text.width() / 2
	                    });

	                    this.text_layer.draw();
	                } else {
	                    // If no target, clear the texts and highlights
	                    this.current_layer.getChildren().each((shape, i) => {
	                        shape.shadowBlur(0);
	                    });
	                    this.inventory_layer.getChildren().each((shape, i) => {
	                        shape.shadowBlur(0);
	                    });
	                    this.clearText(this.interaction_text);
	                }

	                this.current_layer.draw();
	            }
	        });

	        /// Stop character animations and clear monologue when clicked or touched
	        /// anywhere on the screen.
	        this.stage.on('touchstart mousedown', (event) => {
	            this.clearText(this.monologue);
	            this.clearText(this.npc_monologue);
	            this.stopCharacterAnimations();
	        });

	        /// Touch start and mouse down events (save the coordinates before dragging)
	        this.inventory_layer.on('touchstart mousedown', (event) => {
	            this.dragStartX = event.target.x();
	            this.dragStartY = event.target.y();
	        });

	        /// Inventory arrow clicking events
	        this.inventory_bar_layer.on('click tap', (event) => {
	            this.handle_click(event);
	        });

	        /// Drag end events for inventory items.
	        this.stage.find('Image').on('dragend', (event) => {
	            var dragged_item = event.target;

	            // If nothing's under the dragged item
	            if (this.target == null) {
	                dragged_item.x(this.dragStartX);
	                dragged_item.y(this.dragStartY);
	            }
	            // Look up the possible interaction from interactions.json.
	            else if (this.target.getAttr('category') == 'furniture' || this.target.getAttr('category') == 'item') {
	                var commands;

	                // Not all dragged_items have an entry in interactions_json, or have
	                // anything specified for target_item.
	                try {
	                    commands = this.interactions_json[dragged_item.id()][this.target.id()];
	                } catch (e) {
	                    // Do nothing
	                }

	                // no dragend interaction defined: usual text
	                if (commands == null) {
	                    commands = [{"command":"monologue", "textkey":{"object": dragged_item.id(), "string": this.target.id()}}];
	                }

	                this.handle_commands(commands);
	            }

	            // Check if dragged item's destroyed, if not, add it to inventory
	            if (dragged_item.isVisible()) {
	                this.inventoryAdd(dragged_item);
	            }

	            // Clearing the glow effects
	            this.current_layer.getChildren().each((shape, i) => {
	                shape.shadowBlur(0);
	            });
	            this.inventory_layer.getChildren().each((shape, i) => {
	                shape.shadowBlur(0);
	            });
	            // Clearing the texts
	            this.clearText(this.interaction_text);

	            this.redrawInventory();
	        });

	        // Set start layer
	        this.stage.getChildren().each((o) => {
	            if (o.getAttr('category') === 'room' && o.getAttr('start') === true) {
	                this.game_start_layer = o;
	            }
	        });

	        // Not using getObject (with its error messaging), because these are optional.
	        this.start_layer = this.stage.find("#start_layer")[0]; // TODO: get rid of start_layer

	        // The optional start layer has optional splash screen and optional start menu.
	        // TODO: Delay transition to game_start_layer?
	        if (this.stage.find("#start_layer")[0] != null) {
	            this.current_background = 'start_layer';
	            this.current_layer = this.start_layer;
	            if (this.stage.find('#splash_screen')[0] != null) {
	                this.stage.find('#splash_screen')[0].on('tap click', (event) => {
	                    this.stage.find('#splash_screen')[0].hide();
	                    if (this.stage.find('#start_layer_menu')[0] != null) {
	                        this.display_start_menu();
	                    } else {
	                        this.do_transition(this.game_start_layer.id());
	                    }
	                });
	            } else { // no splash screen
	                if (this.stage.find('#start_layer_menu')[0] != null) {
	                    this.display_start_menu();
	                } else {
	                    // start layer without splash or menu?!
	                    this.do_transition(this.game_start_layer.id());
	                }
	            }
	        } else {
	            // no start layer
	            this.do_transition(this.game_start_layer.id());
	        }
	    }

	    // Create image hit regions for our items on object layers
	    // Loop backgrounds to create item hit regions and register mouseup event
	    init_hit_regions() {
	        this.stage.getChildren().each((o) => {
	            if (o.getAttr('category') == 'room') {
	                o.getChildren().each((shape, i) => {
	                    if (shape.getAttr('category') != 'secret' && shape.className == 'Image') {
	                        shape.cache();
	                        shape.drawHitFromCache();
	                    }
	                });

	                o.on('mouseup touchend', (event) => {
	                    this.handle_click(event);
	                });
	            }
	        });

	        this.stage.draw();
	        this.idle_animation[0].node.show();
	        this.idle_animation[0].play();
	    }


	    create_animation(object) {
	        var attrs = object.getAttr("animation");
	        var animation = new lib.Tween({
	            node: object,
	            x: attrs.x ? object.x() + attrs.x : object.x(),
	            y: attrs.y ? object.y() + attrs.y : object.y(),
	            width: attrs.width ? object.width() - 15 : object.width(),
	            easing: lib.Easings.EaseInOut,
	            duration: attrs.duration,

	            onFinish: () => {
	                animation.reverse();
	                setTimeout(() => {
	                    animation.play();
	                }, attrs.duration * 1000);
	            }
	        });

	        this.animated_objects.push(animation);
	    }

	    /*
	    Create item actions such as "new game" for the given menu object
	    Menus may have certain kinds of actions: start_game, credits, main_menu
	    Other actions (such as "none") are regarded as non-functioning menu buttons
	    Object menu_image - the menu image object with the items inside
	    */
	    create_menu_action(menu_image) {
	        var menu_object = this.menu_json[menu_image.attrs.id];
	        if (!menu_object) {
	            console.warn("Could not find menu.json entry for menu '", menu_image.attrs.id, "'");
	            return;
	        }

	        // Go through the menu items to bind their actions
	        for (var i = 0; i < menu_image.children.length; i++) {
	            var item_id = menu_image.children[i].attrs.id;
	            var item_action = menu_object.items[item_id];

	            var item = this.getObject(item_id);
	            // Don't override custom menu event listeners
	            if (item.eventListeners.click) {
	                continue;
	            }

	            if (item_action == "start_game") {
	                item.on('tap click', (event) => {
	                    if (this.getObject("intro") != "") {
	                        var intro_delay = this.play_sequence("intro", true);
	                        setTimeout(() => {
	                            this.do_transition(this.game_start_layer.id(), 0);
	                        }, intro_delay);
	                    } else {
	                        // Assume intro layer has a transition to game_start_layer
	                        this.do_transition(this.game_start_layer.id());
	                    }
	                });
	            } else if (item_action == "credits") {
	                item.on('tap click', (event) => {
	                    this.setMonologue(this.findMonologue(event.target.id()));
	                });
	            } else if (item_action == "main_menu") {
	                // TODO: Return to main menu after end of game.
	                item.on('tap click', (event) => {
	                    this.getObject("end_texts").hide();
	                    this.display_start_menu();
	                });
	            }
	        }
	    }

	    // Display menu for the given layer
	    // string layerId - the ID of the layer we want to display the menu for
	    display_menu(layerId) {
	        this.hide_menu();
	        this.menu = this.menu_json[layerId] !== undefined ? this.getObject(this.menu_json[layerId]["menu"]) : false;
	        if (!this.menu) {
	            return;
	        }

	        this.menu.show();
	        this.current_menu = this.menu;
	    }

	    hide_menu() {
	        if (!this.current_menu) {
	            return;
	        }

	        this.menu.hide();
	        this.current_menu = null;
	    }

	    // Display the start menu including "click" to proceed image
	    display_start_menu() {
	        this.start_layer.show();
	        this.display_menu("start_layer");
	        this.character_layer.show();
	        this.inventory_bar_layer.show();
	        this.stage.draw();
	        this.play_music('start_layer');
	    }

	    /*
	    Play music
	    string id - object ID from JSON with "music":"file name" attribute
	    */
	    play_music(id) {
	        if (id == undefined) {
	            return;
	        }

	        var data = this.music_json[id];

	        // ID and music found from JSON?
	        if (!data || !data.music) {
	            if (this.current_music) {
	                this.current_music.pause();
	                this.current_music = null;
	            }
	            return;
	        }

	        // If not already playing music or old/new songs are different
	        if (!this.current_music || this.current_music_source != data.music) {
	            var old_music = null;
	            if (this.current_music) {
	                old_music = this.current_music;
	                this.current_music = new Audio(data.music);
	                this.current_music.volume = 0;
	            } else {
	                this.current_music = new Audio(data.music);
	                this.current_music.volume = 1;
	                data.music_loop === false ? this.current_music.loop = false : this.current_music.loop = true;
	            }

	            this.current_music.play();

	            // Fade music volume if set so
	            if (data.music_fade === true) {
	                this.current_music.faded = true;

	                if (old_music) {
	                    var fade_interval_2 = setInterval(() => {
	                        // Audio API will throw exception when volume is maxed
	                        try {
	                            old_music.volume -= 0.05;
	                        } catch (e) {
	                            old_music.pause();
	                            clearInterval(fade_interval_2);
	                        }

	                        try {
	                            this.current_music.volume += 0.05;
	                        } catch (e) {
	                            old_music.volume = 1;
	                        }
	                    }, 200);
	                } else if (this.current_music) {
	                    var fade_interval = setInterval(() => {
	                        // Audio API will throw exception when volume is maxed
	                        try {
	                            this.current_music.volume += 0.05;
	                        } catch (e) {
	                            this.current_music.volume = 1;
	                            clearInterval(fade_interval);
	                        }
	                    }, 200);
	                }
	            } else {
	                this.current_music.faded = false;
	                this.current_music.volume = 1;

	                if (old_music) {
	                    old_music.pause();
	                }
	            }
	            this.current_music_source = data.music;
	        }
	    }

	    stop_music() {
	        if (this.current_music == null) {
	            return;
	        }

	        // Fade music volume if set so
	        if (this.current_music.faded === true) {
	            var fade_interval = setInterval(() => {
	                // Audio API will throw exception when volume is maxed
	                // or an crossfade interval may still be running
	                try {
	                    this.current_music.volume -= 0.05;
	                    this.current_music.pause();
	                } catch (e) {
	                    clearInterval(fade_interval);
	                }
	            }, 100);
	        } else {
	            this.current_music.pause();
	        }
	    }

	    /// Plays a sequence defined in sequences.json
	    /// @param id The sequence id in sequences.json
	    /// @param monologue boolean Show sequence's examine text at the end of sequence
	    /// @return The length of sequence in ms. Doesn't include the fade-in!
	    play_sequence(id, monologue) {
	        var delay = 700;

	        // Animation cycle for proper fading and drawing order
	        this.fade_full.reset();
	        this.fade_layer_full.show();
	        this.fade_full.play();

	        var old_layer = this.current_layer;
	        this.current_layer = this.getObject(id);
	        var sequence_exit_text = monologue === true ? this.findMonologue(this.current_layer.id()) : null;
	        var sequence = this.sequences_json[this.current_layer.id()];
	        var final_fade_duration = sequence.transition_length != null ? sequence.transition_length : 0;
	        var slide = null;

	        this.play_music(id);

	        for (var i in sequence.slides) {

	            var lastSlide = slide;
	            slide = this.getObject(sequence.slides[i].id);

	            var displaySlide = (i, slide, lastSlide) => {
	                setTimeout(() => {
	                    this.current_layer.show();
	                    old_layer.hide();
	                    this.fade_layer_full.show();
	                    this.hide_menu(); // So that the menu is hidden after first fadeout.
	                    this.character_layer.hide();
	                    this.inventory_bar_layer.hide();
	                    this.inventory_layer.hide();
	                    this.fade_full.play();

	                    if (lastSlide) {
	                        lastSlide.hide();
	                    }
	                    slide.show();

	                    // Fade-in the slide
	                    var slideFade = sequence.slides[i].do_fade;
	                    if (slideFade === true) {
	                        setTimeout(() => {
	                            this.fade_full.reverse();
	                            this.stage.draw();
	                        }, 700);
	                    } else {
	                        // Immediately display the slide
	                        this.fade_full.reset();
	                        this.stage.draw();
	                    }

	                }, delay);
	            };
	            displaySlide(i, slide, lastSlide);

	            delay = delay + sequence.slides[i].show_time;
	        }
	        // After last slide, do the final fade and set up exit monologue.
	        if (final_fade_duration > 0) {
	            setTimeout(() => {
	                this.fade_full.tween.duration = final_fade_duration;
	                this.fade_full.play();

	                setTimeout(() => {
	                    this.fade_full.reverse();
	                    setTimeout(() => {
	                        this.fade_layer_full.hide();
	                        this.fade_full.tween.duration = 600; // reset to default
	                        if (monologue === true) {
	                            this.setMonologue(sequence_exit_text);
	                        }
	                    }, final_fade_duration);
	                }, final_fade_duration);
	            }, delay);

	            // Doesn't include the fade-in!
	            delay = delay + final_fade_duration;
	        }

	        // Return sequence delay
	        return delay;
	    }

	    /// Transition to a room.
	    /// @param room_id The id of the room to transition to.
	    /// @param fade_time_param The fade duration; if null, use a default.
	    /// @param comingFrom The room where the transition was started in. Sets up
	    ///                   the monologue text.
	    do_transition(room_id, fade_time_param, comingFrom) {
	        var fade_time = fade_time_param;

	        // By default do fast fade
	        if (fade_time_param == null) {
	            var fade_time = 700;
	        }

	        // Don't fade if duration is zero.
	        if (fade_time != 0) {
	            this.fade_room.tween.duration = fade_time;
	            this.fade_layer_room.show();
	            this.fade_room.play();
	        }

	        setTimeout(() => {
	            this.stop_music();
	            // Don't fade if duration is zero.
	            if (fade_time != 0) {
	                this.fade_room.reverse();
	            }

	            // may be null if no start_layer is defined
	            if (this.current_layer != null) {
	                this.current_layer.hide();
	            }

	            this.current_layer = this.getObject(room_id);

	            // Play the animations of the room
	            for (var i in this.animated_objects) {
	                if (this.animated_objects[i].node.parent.id() == this.current_layer.id()) {
	                    this.animated_objects[i].play();
	                } else if (this.animated_objects[i].anim.isRunning()) {
	                    this.animated_objects[i].anim.stop(); // Should this be .anim.stop() or .pause()?
	                }
	            }

	            this.current_layer.show();
	            this.inventory_layer.show();
	            this.inventory_bar_layer.show();
	            this.character_layer.show();
	            this.stage.draw();

	            setTimeout(() => {
	                this.fade_layer_room.hide();
	                this.play_music(this.current_layer.id());
	                if (comingFrom) {
	                    this.setMonologue(this.findMonologue(comingFrom));
	                }
	            }, fade_time);
	        }, fade_time);
	    }

	    // Basic intersection check; checking whether corners of the dragged item are inside the area of the intersecting object
	    checkIntersection(dragged_item, target) {
	        // If target is visible and of suitable category
	        if (target.isVisible()&& (target.getAttr('category') != undefined && target.getAttr('category') != 'secret')) {
	            // If horizontally inside
	            if (dragged_item.x() > target.x() && dragged_item.x() < (target.x() + target.width()) || (dragged_item.x() + dragged_item.width()) > target.x() && (dragged_item.x() + dragged_item.width()) < (target.x() + target.width())) {
	                // If vertically inside
	                if (dragged_item.y() > target.y() && dragged_item.y() < (target.y() + target.height()) || (dragged_item.y() + dragged_item.height()) > target.y() && (dragged_item.y() + dragged_item.height()) < (target.y() + target.height())) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    }

	    /// Handle click interactions on room objects, inventory items and inventory
	    /// arrows.
	    handle_click(event) {
	        var target = event.target;
	        var target_category = target.getAttr('category');

	        if (target_category == 'furniture' || target_category == 'item') {
	            var commands;

	            // Not all clicked items have their entry in interactions_json.
	            try {
	                commands = this.interactions_json[target.id()].click;
	            } catch (e) {
	                // Do nothing
	            }

	            // no click interaction defined: usual examine
	            if (commands == null) {
	                commands = [{"command":"monologue", "textkey":{"object": target.id(), "string": "examine"}}];
	            }

	            this.handle_commands(commands);
	        }
	        // Pick up rewards
	        else if (target_category == 'secret') {
	            this.setMonologue(this.findMonologue(target.id(), 'pickup'));
	            var rewardID = target.getAttr('reward');
	            this.inventoryAdd(this.getObject(rewardID));
	            this.rewards++;
	            this.removeObject(target);

	            // To prevent multiple events happening at the same time
	            event.cancelBubble = true;
	        }
	        // Print examine texts for rewards
	        else if (target_category == 'reward') {
	            this.setMonologue(this.findMonologue(target.id()));
	        }
	        // Inventory arrow buttons
	        else if (target.getAttr('id') == 'inventory_left_arrow') {
	            if (target.getAttr('visible') == true) {
	                this.inventory_index--;
	                this.redrawInventory();
	            }
	        }
	        else if (target.getAttr('id') == 'inventory_right_arrow') {
	            if (target.getAttr('visible') == true) {
	                this.inventory_index++;
	                this.redrawInventory();
	            }
	        }
	    }

	    /// Loop through a list of interaction commands and execute them with
	    /// handle_command, with timeout if specified.
	    handle_commands(commands) {
	        for (var i in commands) {
	            if (commands[i].timeout != null) {
	                ((commands, i) => {
	                    setTimeout(() => {
	                        this.handle_command(commands[i]);
	                    }, commands[i].timeout);
	                })(commands, i);
	            } else {
	                this.handle_command(commands[i]);
	            }
	        }
	    }

	    /// Handle each interaction. Check what command is coming in, and do the thing.
	    /// Timeouts are done in handle_commands. Order of commands in interactinos.json
	    /// can be important: for instance, monologue plays the speaking animation, so
	    /// play_character_animation should come after it, so that the speaking
	    /// animation is stopped and the defined animation plays, and not vice versa.
	    handle_command(command) {
	        if (command.command == "monologue") {
	            this.setMonologue(this.findMonologue(command.textkey.object, command.textkey.string));
	        } else if (command.command == "inventory_add") {
	            this.inventoryAdd(this.getObject(command.item));
	        } else if (command.command == "inventory_remove") {
	            this.inventoryRemove(this.getObject(command.item));
	        } else if (command.command == "remove_object") {
	            this.removeObject(this.getObject(command.object));
	        } else if (command.command == "add_object") {
	            this.addObject(this.getObject(command.object));
	        } else if (command.command == "play_ending") {
	            this.play_ending(command.ending);
	        } else if (command.command == "do_transition") {
	            this.do_transition(command.destination, command.length != null ? command.length : 700);
	        } else if (command.command == "play_character_animation") {
	            // Overrides default speak animation from setMonologue.
	            this.playCharacterAnimation(this.character_animations[command.animation], command.length);
	        } else if (command.command == "play_sequence") {
	            this.play_sequence(command.sequence, command.monologue);
	        } else if (command.command == "set_idle_animation") {
	            this.setIdleAnimation(command.animation_name);
	        } else if (command.command == "set_speak_animation") {
	            this.setSpeakAnimation(command.animation_name);
	        } else if (command.command == "npc_monologue") {
	            nthis.pcMonologue(
	                this.getObject(command.npc),
	                this.findMonologue(command.textkey.object, command.textkey.string)
	            );
	        } else {
	            console.warn("Unknown interaction command " + command.command);
	        }
	    }

	    /// Get an object from stage by it's id. Gives an error message in console with
	    /// the looked up name if it is not found. Basically, a wrapper for
	    /// stage.find(id) with error messaging, helpful with typos in jsons,
	    /// and also gives some errors if an object required by the kiigame.js script
	    /// itself is missing.
	    /// @param object The name of the object to look up.
	    /// @return Returns the object if it's found, or null if it isn't.
	    getObject(id) {
	        var object = this.stage.find('#' + id)[0];
	        if (object == null) {
	            console.warn("Could not find object from stage with id " + id);
	        }
	        return object;
	    }

	    /// Add an object to the stage. Currently, this means setting its visibility
	    /// to true. // TODO: Add animations & related parts.
	    /// @param The object to be added.
	    addObject(object) {
	        object.clearCache();
	        object.show();
	        object.cache();
	        this.current_layer.draw();
	    }

	    /// Remove an object from stage. Called after interactions that remove objects.
	    /// The removed object is hidden. Handles animations.
	    /// @param object The object to be destroyed.
	    removeObject(object) {
	        this.removeAnimation(object.id());
	        object.hide();
	        this.current_layer.draw();
	    }

	    /// Remove an object from the list of animated objects.
	    /// @param id The id of the object to be de-animated.
	    removeAnimation(id) {
	        if (this.animated_objects.indexOf(id) > -1) {
	            this.animated_objects.splice(this.animated_objects.indexOf(id), 1);
	        }
	    }

	    // Play the hardcoded end sequence and show the correct end screen based on the number of rewards found
	    play_ending(ending) {
	        this.fade_full.reset();
	        this.fade_layer_full.show();
	        this.fade_full.play();

	        setTimeout(() => {
	            // Clear inventory except rewards
	            for (var i = this.inventory_layer.children.length-1; i >= 0; i--) {
	                var shape = this.inventory_layer.children[i];
	                if (shape.getAttr('category') != 'reward') {
	                    this.inventoryRemove(shape);
	                }
	                this.inventory_index = 0;
	            }

	            this.play_music(ending);
	            var rewards_text = this.getObject("rewards_text");
	            var old_text = rewards_text.text();
	            rewards_text.text(this.rewards + rewards_text.text());

	            this.current_layer.hide(); // hide the sequence layer
	            this.current_layer = this.getObject(ending);
	            this.current_layer.show();
	            this.inventory_bar_layer.show();
	            this.inventory_layer.show();
	            this.display_menu(this.current_layer.id());
	            this.character_layer.show();
	            this.getObject("end_texts").show();
	            this.stage.draw();
	            rewards_text.text(old_text);

	            this.fade_full.reverse();
	            setTimeout(() => this.fade_layer_full.hide(), 700);
	        }, 700);
	    }

	    // Clearing the given text
	    clearText(text) {
	        text.text("");

	        if (text.id() == 'monologue') {
	            this.character_speech_bubble.hide();
	        } else if (text.id() == 'npc_monologue') {
	            this.npc_speech_bubble.hide();
	        }

	        this.text_layer.draw();
	    }

	    /// Find monologue text in object. If a text is not found from texts_json by
	    /// the parameter, return the default text for the object (if it exists), or
	    /// the master default text.
	    /// @param object_id The id of the object which's texts are looked up.
	    /// @param key The key to look up the text with. If null, set to 'examine' by
	    ///            default. Otherwise usually the name of the other object in
	    ///            item-object interactions.
	    /// @return The text found, or the default text.
	    findMonologue(object_id, key) {
	        if (key == null) {
	            key = 'examine';
	        }

	        var text = null;
	        try { // Might not find with object_id
	            text = this.texts_json[object_id][key];
	        } catch(e) {
	            // Do nothing
	        }

	        // If no text found, use default text
	        if (!text || text.length == 0) {
	            // Item's own default
	            console.warn("No text " + key + " found for " + object_id);
	            try { // Might not find with object_id
	                text = this.texts_json[object_id]['default'];
	            } catch(e) {
	                // Do nothing
	            }

	            if (!text) {
	                // Master default
	                console.warn("Default text not found for " + object_id + ". Using master default.");
	                try {
	                    text = this.texts_json["default"]["examine"];
	                } catch (e) {
	                    text = "Fallback default examine entry missing from texts.json!"; // crude
	                }
	            }
	        }

	        return text;
	    }

	    /// Set NPC monologue text and position the NPC speech bubble to the desired
	    /// NPC.
	    /// @param npc The object in the stage that will have the speech bubble.
	    /// @param text The text to be shown in the speech bubble.
	    npcMonologue(npc, text) {
	        this.npc_monologue.setWidth('auto');
	        this.npc_speech_bubble.show();
	        this.npc_monologue.text(text);

	        var npc_tag = this.getObject("npc_tag");
	        if (npc.x() + npc.width() > (this.stage.width()/2)) {
	            npc_tag.pointerDirection("right");
	            if (this.npc_monologue.width() > npc.x() - 100) {
	                this.npc_monologue.width(npc.x() - 100);
	            }
	            this.npc_monologue.text(text);
	            this.npc_speech_bubble.x(npc.x());
	        } else {
	            npc_tag.pointerDirection("left");
	            if (this.npc_monologue.width() > this.stage.width() - (npc.x() + npc.width() + 100)) {
	                this.npc_monologue.width(this.stage.width() - (npc.x() + npc.width() + 100));
	            }
	            this.npc_monologue.text(text);
	            this.npc_speech_bubble.x(npc.x() + npc.width());
	        }

	        this.npc_speech_bubble.y(npc.y() + (npc.height()/3));

	        this.text_layer.draw();
	    }

	    /// Set monologue text.
	    /// @param text The text to be shown in the monologue bubble.
	    setMonologue(text) {
	        this.monologue.setWidth('auto');
	        this.character_speech_bubble.show();
	        this.monologue.text(text);
	        if (this.monologue.width() > 524) {
	            this.monologue.width(524);
	            this.monologue.text(text);
	        }

	        this.character_speech_bubble.y(this.stage.height() - 100 - 15 - this.monologue.height() / 2);
	        this.text_layer.draw();

	        this.playCharacterAnimation(this.speak_animation, 3000);
	    }

	    /// Play a character animation
	    /// @param animation The animation to play.
	    /// @param timeout The time in ms until the character returns to idle animation.
	    playCharacterAnimation(animation, timeout) {
	        this.stopCharacterAnimations();
	        for (var i in this.idle_animation) {
	            this.idle_animation[i].node.hide();
	            this.idle_animation[i].reset();
	        }
	        animation[0].node.show();
	        animation[0].play();

	        this.character_layer.draw();

	        clearTimeout(this.character_animation_timeout);
	        this.character_animation_timeout = setTimeout(() => {
	            this.stopCharacterAnimations();
	        }, timeout);
	    }

	    ///Stop the characer animations, start idle animation
	    stopCharacterAnimations() {
	        for (var i in this.character_animations) {
	            for (var j in this.character_animations[i]) {
	                this.character_animations[i][j].node.hide();
	                this.character_animations[i][j].reset();
	            }
	        }

	        this.idle_animation[0].node.show();
	        this.idle_animation[0].play();
	        this.character_layer.draw();
	    }

	    /// Change idle animation, so that the character graphics can be changed
	    /// mid-game.
	    /// @param animation_name The name of the animation, look the animation up
	    ///                       from this.character_animations[].
	    setIdleAnimation(animation_name) {
	        this.idle_animation = this.character_animations[animation_name];
	        this.stopCharacterAnimations(); // reset and play the new idle animation
	    }

	    /// Change speak animation, so that the character graphics can be changed
	    /// mid-game.
	    /// @param animation_name The name of the animation, look the animation up
	    ///                       from this.character_animations[].
	    setSpeakAnimation(animation_name) {
	        this.speak_animation = this.character_animations[animation_name];
	        this.stopCharacterAnimations(); // reset and play idle animation
	    }

	    // Load json from the server
	    getJSON(json_file) {
	        return this.jsonGetter.getJSON(json_file);
	    }

	    // Setting an image to the stage and scaling it based on relative values if they exist
	    createObject(o) {
	        window[o.id] = new Image();
	        window[o.id].onLoad = (() => {
	            this.getObject(o.id).image(window[o.id]);
	        })();
	        window[o.id].src = o.src;
	    }

	    /// Adding an item to the inventory. Adds new items, but also an item that
	    /// has been dragged out of the inventory is put back with this function.
	    /// XXX: May become problematic if interaction both returns the dragged item
	    /// and adds a new one.
	    /// @param item Item to be added to the inventory
	    inventoryAdd(item) {
	        item.show();
	        item.moveTo(this.inventory_layer);
	        item.clearCache();
	        item.size({width: 80, height: 80});

	        if (this.inventory_list.indexOf(item) > -1) {
	            this.inventory_list.splice(this.inventory_list.indexOf(item), 1, item);
	        } else {
	            this.inventory_list.push(item);
	        }

	        // The picked up item should be visible in the inventory. Scroll inventory
	        // to the right if necessary.
	        if (this.inventory_list.indexOf(item) > this.inventory_index + this.inventory_max - 1) {
	            this.inventory_index = Math.max(this.inventory_list.indexOf(item) + 1 - this.inventory_max, 0);
	        }

	        this.current_layer.draw();
	        this.redrawInventory();
	    }

	    /// Removing an item from the inventory. Dragged items are currently just
	    /// hidden & inventory is readrawn only after drag ends.
	    /// @param item Item to be removed from the inventory
	    inventoryRemove(item) {
	        item.hide();
	        item.moveTo(this.current_layer);
	        item.draggable(false);
	        this.inventory_list.splice(this.inventory_list.indexOf(item), 1);
	        this.redrawInventory();
	    }

	    // Dragging an item from the inventory
	    inventoryDrag(item) {
	        item.moveTo(this.current_layer);
	        this.inventory_bar_layer.draw();
	        this.inventory_layer.draw();
	        this.clearText(this.monologue);
	        this.clearText(this.npc_monologue);
	        this.stopCharacterAnimations();
	    }

	    /// Redrawing inventory. Shows the items that should be visible according to
	    /// inventory_index and takes care of showing inventory arrows as necessary.
	    redrawInventory() {
	        this.inventory_layer.getChildren().each((shape, i) => {
	            shape.setAttr('visible', false);
	            shape.draggable(false);
	        });

	        // If the left arrow is visible AND there's empty space to the right,
	        // scroll the inventory to the left. This should happen when removing items.
	        if (this.inventory_index + this.inventory_max > this.inventory_list.length) {
	            this.inventory_index = Math.max(this.inventory_list.length - this.inventory_max, 0);
	        }

	        for (var i = this.inventory_index; i < Math.min(this.inventory_index + this.inventory_max, this.inventory_list.length); i++) {
	            var shape = this.inventory_list[i];
	            shape.draggable(true);
	            shape.x(this.offsetFromLeft + (this.inventory_list.indexOf(shape) - this.inventory_index) * 100);
	            shape.y(this.stage.height() - 90);
	            shape.setAttr('visible', true);
	        }

	        if (this.inventory_index > 0) {
	            this.getObject("inventory_left_arrow").show();
	        } else {
	            this.getObject("inventory_left_arrow").hide();
	        }

	        if (this.inventory_index + this.inventory_max < this.inventory_list.length) {
	            this.getObject("inventory_right_arrow").show();
	        } else {
	            this.getObject("inventory_right_arrow").hide();
	        }

	        this.inventory_bar_layer.draw();
	        this.inventory_layer.draw();
	        this.current_layer.draw();
	    }

	    // Delay to be set after each intersection check
	    setDelay(delay) {
	        this.delayEnabled = true;
	        setTimeout(() => this.delayEnabled = false, delay);
	    }
	    
	}

	exports.KiiGame = KiiGame;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
