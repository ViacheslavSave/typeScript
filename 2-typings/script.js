"use strict";
var numbers;
(function (numbers) {
    numbers[numbers["TEN"] = 10] = "TEN";
    numbers[numbers["ONE_HUNDRED"] = 100] = "ONE_HUNDRED";
    numbers[numbers["ONE_THOUSAND"] = 1000] = "ONE_THOUSAND";
    numbers[numbers["ONE_MILLION"] = 1000000] = "ONE_MILLION";
    numbers[numbers["ONE_BILLION"] = 1000000000] = "ONE_BILLION";
    numbers[numbers["ONE_TRILLION"] = 1000000000000] = "ONE_TRILLION";
    numbers[numbers["ONE_QUADRILLION"] = 1000000000000000] = "ONE_QUADRILLION";
    numbers[numbers["MAX"] = 9007199254740992] = "MAX";
})(numbers || (numbers = {}));
var LESS_THAN_TWENTY;
(function (LESS_THAN_TWENTY) {
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["zero"] = 0] = "zero";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["one"] = 1] = "one";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["two"] = 2] = "two";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["three"] = 3] = "three";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["four"] = 4] = "four";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["five"] = 5] = "five";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["six"] = 6] = "six";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["seven"] = 7] = "seven";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["eight"] = 8] = "eight";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["nine"] = 9] = "nine";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["ten"] = 10] = "ten";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["eleven"] = 11] = "eleven";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["twelve"] = 12] = "twelve";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["thirteen"] = 13] = "thirteen";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["fourteen"] = 14] = "fourteen";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["fifteen"] = 15] = "fifteen";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["sixteen"] = 16] = "sixteen";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["seventeen"] = 17] = "seventeen";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["eighteen"] = 18] = "eighteen";
    LESS_THAN_TWENTY[LESS_THAN_TWENTY["nineteen"] = 19] = "nineteen";
})(LESS_THAN_TWENTY || (LESS_THAN_TWENTY = {}));
// var makeOrdinal = require('./makeOrdinal');
// var isFinite = require('./isFinite');
// var isSafeNumber = require('./isSafeNumber');
var TENTHS_LESS_THAN_HUNDRED;
(function (TENTHS_LESS_THAN_HUNDRED) {
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["zero"] = 0] = "zero";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["ten"] = 1] = "ten";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["twenty"] = 2] = "twenty";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["thirty"] = 3] = "thirty";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["forty"] = 4] = "forty";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["fifty"] = 5] = "fifty";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["sixty"] = 6] = "sixty";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["seventy"] = 7] = "seventy";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["eighty"] = 8] = "eighty";
    TENTHS_LESS_THAN_HUNDRED[TENTHS_LESS_THAN_HUNDRED["ninety"] = 9] = "ninety";
})(TENTHS_LESS_THAN_HUNDRED || (TENTHS_LESS_THAN_HUNDRED = {}));
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 *
 *
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function isSafeNumber(num) {
    return num < numbers.MAX && num > -numbers.MAX;
}
function makeOrdinal(words) {
    return `!! ${words} !!`;
}
function toWords(number, asOrdinal) {
    let words;
    const num = parseInt(String(number), 10);
    if (!isFinite(num)) {
        throw new TypeError(`Not a finite number: ${number} (${typeof number} )`);
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}
function generateWords(number, words) {
    let remainder = number, word = '';
    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < numbers.ONE_HUNDRED) {
        remainder = number % numbers.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / numbers.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < numbers.ONE_THOUSAND) {
        remainder = number % numbers.ONE_HUNDRED;
        word = generateWords(Math.floor(number / numbers.ONE_HUNDRED)) + ' hundred';
    }
    else if (number < numbers.ONE_MILLION) {
        remainder = number % numbers.ONE_THOUSAND;
        word = generateWords(Math.floor(number / numbers.ONE_THOUSAND)) + ' thousand,';
    }
    else if (number < numbers.ONE_BILLION) {
        remainder = number % numbers.ONE_MILLION;
        word = generateWords(Math.floor(number / numbers.ONE_MILLION)) + ' million,';
    }
    else if (number < numbers.ONE_TRILLION) {
        remainder = number % numbers.ONE_BILLION;
        word = generateWords(Math.floor(number / numbers.ONE_BILLION)) + ' billion,';
    }
    else if (number < numbers.ONE_QUADRILLION) {
        remainder = number % numbers.ONE_TRILLION;
        word = generateWords(Math.floor(number / numbers.ONE_TRILLION)) + ' trillion,';
    }
    else if (number <= numbers.MAX) {
        remainder = number % numbers.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / numbers.ONE_QUADRILLION)) +
            ' quadrillion,';
    }
    words.push(word);
    return generateWords(remainder, words);
}
// module.exports = toWords;
console.log(toWords('10', true));
console.log(toWords('0', true));
console.log(toWords('-100'));
console.log(toWords('-80'));
console.log(toWords('-10110'));
console.log(toWords('-787979810', true));
