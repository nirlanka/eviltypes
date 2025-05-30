import {
    assert,
    assertType,
    TBase,
    TError,
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
class TNumericRadioOption extends TBase {
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
    let error = assert(() => !isNaN(selectEl.value), "a whole number", [selectEl.value]);

    return [
        selectEl.value ? new TWholeNumber().set(selectEl.value) : undefined,
        selectEl.value ? undefined : new TError().set("No option selected")
    ];
}

const [x6, err6] = getOptionValue(document.querySelector('#pet-select'));
console.log(x6, err6);

if (err6) {
    console.error('Error:', err6.get())
}

function onSelect(/** @type {Event} */ ev) {
    assert(() => ev.type === 'change', "has correct event type", [ev.type]);
    assert(() => ev.target.id === 'pet-select', "has correct target element 'change'", [ev.target.id]);

    const [optionValue, err] = getOptionValue(ev.target);
    console.log(optionValue);
    console.log(err);
}

document.querySelector('#pet-select').addEventListener('change', onSelect);