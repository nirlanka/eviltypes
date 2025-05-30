import {
    assert,
    TBase,
    TError,
    assertType,
} from '../src';

class TWholeNumber extends TBase {
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

class TUnformattedText extends TBase {
    primitive = 'string';

    assert(value) {
        return !!value;
    }
}

/** Radio component option value **/
class TRadioOption extends TBase {
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
    assert(() => !isNaN(selectEl.value), "a whole number", [selectEl.value]);

    return [
        selectEl.value && new TWholeNumber().set(selectEl.value),
        !selectEl.value && new TError().set("No option selected")
    ];
}

const [x6, err6] = getOptionValue(document.querySelector('#pet-select'));
console.log(x6, err6);

if (err6) {
    console.error('Error:', err6.get())
}