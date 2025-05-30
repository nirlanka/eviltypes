var eviltypes;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assert.js":
/*!***********************!*\
  !*** ./src/assert.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
function assert(
                /** @type {() => boolean} */ testFn,
                /** @type {string} */ textOnFail,
                /** @type {Array|Object} */ values,
) {
    try {
        const isTestPass = testFn();
        if (!isTestPass)
            throw Error(`Assert failure: NOT ${textOnFail}, with debug values: ${values ? JSON.stringify(values) : testFn}`);
    } catch (err) {
        console.error('[ASSERT FAILURE]', err);
    }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TBase: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_1__.TBase),
/* harmony export */   TError: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_1__.TError),
/* harmony export */   assert: () => (/* reexport safe */ _assert_js__WEBPACK_IMPORTED_MODULE_0__.assert),
/* harmony export */   assertType: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_1__.assertType)
/* harmony export */ });
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert.js */ "./src/assert.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types.js */ "./src/types.js");



/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TBase: () => (/* binding */ TBase),
/* harmony export */   TError: () => (/* binding */ TError),
/* harmony export */   assertType: () => (/* binding */ assertType)
/* harmony export */ });
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert.js */ "./src/assert.js");


function assertType(instance, type) {
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(
        () => instance.constructor.name === type.name,
        "the same type as expected [EvilTypes]",
        [instance, type]
    );
}

class TBase {
    static _PRIMITIVES = [
        'number',
        'string',
        'object',
        'function',
    ];

    /** 
     * @abstract
     * @type {string}
     * Underlying primitive data type
     */
    primitive;

    _validate() {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(
            () => TBase._PRIMITIVES.some(x => x === this.primitive),
            "a valid primitive type name  [EvilTypes]",
            [this.primitive]
        );
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(
            () => (this._value !== undefined)
                ? (typeof this._value === this.primitive)
                : true,
            "a valid primitive type value [EvilTypes]",
            [this._value, this.primitive]
        );

        if (this.primitive === 'object') {
            (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(
                () =>
                    (typeof this.types === 'object')
                    && Object.keys(this.types).every(k => typeof k === 'string')
                    && Object.values(this.types).every(v => typeof v === 'function'),
                "a valid typed object",
                [this.types, this.primitive]
            );

            for (const k in this.types) {
                assertType(this._value[k], this.types[k]);
            }
        }

        (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert)(
            () => this.assert(this._value),
            "a valid value [EvilTypes]",
            [this._value],
        );
    }

    /**
     * @type {any} 
     */
    _value;

    /** @final */
    set(/** @type {any} */ v) {
        this._value = v;
        this._validate();
        return this;
    }

    /** 
     * @final
     * @returns {any} reference to the stored primitive value
     */
    get() {
        this._validate();
        return this._value;
    }

    /**
     * @abstract 
     * @returns {boolean}
     */
    assert(/** @type {any} */ value) {
        return true;
    }
}

class TError extends TBase {
    primitive = 'string';

    assert(/** @type {string} */ value) {
        return !!value;
    }
}

/***/ }),

/***/ "./tests/assert-tests.js":
/*!*******************************!*\
  !*** ./tests/assert-tests.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");


for (const value of [
    '',
    "test",
    12,
    'true',
]) {
    (0,_src__WEBPACK_IMPORTED_MODULE_0__.assert)(
        () => ['true', 'false'].some(x => x === value),
        "a proper string version of the boolean.");
}

/***/ }),

/***/ "./tests/types-tests.js":
/*!******************************!*\
  !*** ./tests/types-tests.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");


class TWholeNumber extends _src__WEBPACK_IMPORTED_MODULE_0__.TBase {
    primitive = 'number';

    assert(value) {
        return value >= 0;
    }
}

const x0 = new TWholeNumber();
console.log(x0.get());

/** @type {TWholeNumber} */
const x1 = new TWholeNumber().set('9');
console.log(x1);

/** @type {TWholeNumber} */
const x2 = new TWholeNumber().set(13);
console.log(x2);

/** @type {TWholeNumber} */
const x3 = new TWholeNumber().set(-4);
console.log(x3);

class TUnformattedText extends _src__WEBPACK_IMPORTED_MODULE_0__.TBase {
    primitive = 'string';

    assert(value) {
        return !!value;
    }
}

/** Radio component option value **/
class TRadioOption extends _src__WEBPACK_IMPORTED_MODULE_0__.TBase {
    primitive = 'object';

    types = {
        'value': TWholeNumber,
        'label': TUnformattedText
    };
}

/** @type {TRadioOption} */
const x4 = new TRadioOption().set({
    value: new TWholeNumber().set(0),
    label: new TUnformattedText().set("Option 0"),
});
console.log(x4);
console.log(x4.get().value);
console.log(x4.get().value.get());

/** @type {TRadioOption} */
const x5 = new TRadioOption().set({
    value: new TWholeNumber().set(-1),
    label: new TUnformattedText().set("[Please select]"),
});
console.log(x5);
console.log(x5.get().value);
console.log(x5.get().value.get());

/** @returns {[TWholeNumber, TError]} */
function getOptionValue(/** @type {HTMLSelectElement} */ selectEl) {
    (0,_src__WEBPACK_IMPORTED_MODULE_0__.assert)(() => !isNaN(selectEl.value), "a whole number", [selectEl.value]);

    return [
        selectEl.value && new TWholeNumber().set(selectEl.value),
        !selectEl.value && new _src__WEBPACK_IMPORTED_MODULE_0__.TError().set("No option selected")
    ];
}

const [x6, err6] = getOptionValue(document.querySelector('#pet-select'));
console.log(x6, err6);

if (err6) {
    console.error('Error:', err6.get())
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./tests/index.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assert_tests_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert-tests.js */ "./tests/assert-tests.js");
/* harmony import */ var _types_tests_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types-tests.js */ "./tests/types-tests.js");


})();

eviltypes = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=eviltypes.tests.bundle.js.map