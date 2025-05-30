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
/* harmony import */ var _types_TError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/TError */ "./src/types/TError.js");
/* harmony import */ var _utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/assertPrimitive */ "./src/utils/assertPrimitive.js");



/**
 * @returns {TError}
 */
function assert(
    /** @type {() => boolean} */ testFn,
    /** @type {string} */ textOnFail,
    /** @type {Array|Object} */ values,
) {
    const err = (0,_utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_1__.assertPrimitive)(testFn, textOnFail, values);
    return err ? new _types_TError__WEBPACK_IMPORTED_MODULE_0__.TError().set(`[ASSERT FAILURE] ${err}`) : undefined;
}

/***/ }),

/***/ "./src/assertType.js":
/*!***************************!*\
  !*** ./src/assertType.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertType: () => (/* binding */ assertType)
/* harmony export */ });
/* harmony import */ var _utils_assertTypePrimitive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/assertTypePrimitive */ "./src/utils/assertTypePrimitive.js");


/**
 * @returns {TError}
 */
function assertType(
    /** @type {TBase} */ instance,
    /** @type {class} */ type,
) {
    const err = (0,_utils_assertTypePrimitive__WEBPACK_IMPORTED_MODULE_0__.assertTypePrimitive)(instance, type);
    return err ? new TError().set(`[ASSERT FAILURE] ${err}`) : undefined;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TBase: () => (/* reexport safe */ _types_TBase__WEBPACK_IMPORTED_MODULE_2__.TBase),
/* harmony export */   TError: () => (/* reexport safe */ _types_TError__WEBPACK_IMPORTED_MODULE_3__.TError),
/* harmony export */   assert: () => (/* reexport safe */ _assert__WEBPACK_IMPORTED_MODULE_0__.assert),
/* harmony export */   assertType: () => (/* reexport safe */ _assertType__WEBPACK_IMPORTED_MODULE_1__.assertType)
/* harmony export */ });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert */ "./src/assert.js");
/* harmony import */ var _assertType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertType */ "./src/assertType.js");
/* harmony import */ var _types_TBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/TBase */ "./src/types/TBase.js");
/* harmony import */ var _types_TError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types/TError */ "./src/types/TError.js");






/***/ }),

/***/ "./src/types/TBase.js":
/*!****************************!*\
  !*** ./src/types/TBase.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TBase: () => (/* binding */ TBase)
/* harmony export */ });
/* harmony import */ var _utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/assertPrimitive */ "./src/utils/assertPrimitive.js");
/* harmony import */ var _utils_assertTypePrimitive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/assertTypePrimitive */ "./src/utils/assertTypePrimitive.js");



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

    /**
     * @type {Record<string, new (...args: any[]) => TBase<any>>}
     */
    types;

    _validate() {
        (0,_utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_0__.assertPrimitive)(
            () => TBase._PRIMITIVES.some(x => x === this.primitive),
            "a valid primitive type name [EvilTypes]",
            [this.primitive]
        );
        (0,_utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_0__.assertPrimitive)(
            () => (this._value !== undefined)
                ? (typeof this._value === this.primitive)
                : true,
            "a valid primitive type value [EvilTypes]",
            [this._value, this.primitive]
        );

        if (this.primitive === 'object') {
            (0,_utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_0__.assertPrimitive)(
                () =>
                    (typeof this.types === 'object')
                    && Object.keys(this.types).every(k => typeof k === 'string')
                    && Object.values(this.types).every(v => typeof v === 'function'),
                "a valid typed object",
                [this.types, this.primitive]
            );

            for (const k in this.types) {
                (0,_utils_assertTypePrimitive__WEBPACK_IMPORTED_MODULE_1__.assertTypePrimitive)(this._value[k], this.types[k]);
            }
        }

        (0,_utils_assertPrimitive__WEBPACK_IMPORTED_MODULE_0__.assertPrimitive)(
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

/***/ }),

/***/ "./src/types/TError.js":
/*!*****************************!*\
  !*** ./src/types/TError.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TError: () => (/* binding */ TError)
/* harmony export */ });
/* harmony import */ var _TBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TBase */ "./src/types/TBase.js");


class TError extends _TBase__WEBPACK_IMPORTED_MODULE_0__.TBase {
    primitive = 'string';

    assert(/** @type {string} */ value) {
        return !!value;
    }
}

/***/ }),

/***/ "./src/utils/assertPrimitive.js":
/*!**************************************!*\
  !*** ./src/utils/assertPrimitive.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertPrimitive: () => (/* binding */ assertPrimitive)
/* harmony export */ });
/**
 * @returns {Error}
 */
function assertPrimitive(
    /** @type {() => boolean} */ testFn,
    /** @type {string} */ textOnFail,
    /** @type {Array|Object} */ values,
) {
    let err;

    try {
        const isTestPass = testFn();
        if (!isTestPass)
            throw Error(`Assert failure: NOT ${textOnFail}, with debug values: ${values ? JSON.stringify(values) : testFn}`);
    } catch (_err) {
        err = _err;
        console.error(`[ASSERT FAILURE] ${err}`);
    }

    return err;
}


/***/ }),

/***/ "./src/utils/assertTypePrimitive.js":
/*!******************************************!*\
  !*** ./src/utils/assertTypePrimitive.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertTypePrimitive: () => (/* binding */ assertTypePrimitive)
/* harmony export */ });
/* harmony import */ var _assertPrimitive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assertPrimitive */ "./src/utils/assertPrimitive.js");


function assertTypePrimitive(
    /** @type {object} */ instance,
    /** @type {class} */ type,
) {
    (0,_assertPrimitive__WEBPACK_IMPORTED_MODULE_0__.assertPrimitive)(
        () => instance.constructor.name === type.name,
        "the same type as expected [EvilTypes]",
        [instance, type]
    );
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
class TNumericRadioOption extends _src__WEBPACK_IMPORTED_MODULE_0__.TBase {
    primitive = 'object';

    types = {
        'value': TWholeNumber,
        'label': TUnformattedText
    };
}

/** @type {TNumericRadioOption} */
const x4 = new TNumericRadioOption().set({
    value: new TWholeNumber().set(0),
    label: new TUnformattedText().set("Option 0"),
});
console.log(x4);
console.log(x4.get().value);
console.log(x4.get().value.get());

/** @type {TNumericRadioOption} */
const x5 = new TNumericRadioOption().set({
    value: new TWholeNumber().set(-1),
    label: new TUnformattedText().set("[Please select]"),
});
console.log(x5);
console.log(x5.get().value);
console.log(x5.get().value.get());

/** @returns {[TWholeNumber, TError]} */
function getOptionValue(/** @type {HTMLSelectElement} */ selectEl) {
    let error = (0,_src__WEBPACK_IMPORTED_MODULE_0__.assert)(() => !isNaN(selectEl.value), "a whole number", [selectEl.value]);

    return [
        selectEl.value ? new TWholeNumber().set(selectEl.value) : undefined,
        error 
            || (selectEl.value ? undefined : new _src__WEBPACK_IMPORTED_MODULE_0__.TError().set("No option selected")),
    ];
}

const [x6, err6] = getOptionValue(document.querySelector('#pet-select'));
console.log(x6, err6);

if (err6) {
    console.error('Error:', err6.get())
}

function onSelect(/** @type {Event} */ ev) {
    (0,_src__WEBPACK_IMPORTED_MODULE_0__.assert)(() => ev.type === 'change', "has correct event type", [ev.type]);
    (0,_src__WEBPACK_IMPORTED_MODULE_0__.assert)(() => ev.target.id === 'pet-select', "has correct target element 'change'", [ev.target.id]);

    const [optionValue, err] = getOptionValue(ev.target);
    console.log(optionValue);
    console.log(err);
}

document.querySelector('#pet-select').addEventListener('change', onSelect);

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