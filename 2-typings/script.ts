enum numbers {
  TEN = 10,
  ONE_HUNDRED = 100,
  ONE_THOUSAND = 1000,
  ONE_MILLION = 1000000,
  ONE_BILLION = 1000000000,           //         1.000.000.000 (9)
  ONE_TRILLION = 1000000000000,       //     1.000.000.000.000 (12)
  ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
  MAX = 9007199254740992,
}
enum LESS_THAN_TWENTY {
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen'
}


// var makeOrdinal = require('./makeOrdinal');
// var isFinite = require('./isFinite');
// var isSafeNumber = require('./isSafeNumber');


enum TENTHS_LESS_THAN_HUNDRED {
  'zero',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety'
}

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

function isSafeNumber(num: number): boolean {
  return num < numbers.MAX && num > -numbers.MAX
}

function makeOrdinal(words: string) {
  return `!! ${words} !!`
}


function toWords(number: number | string, asOrdinal?: boolean): string {
  let words: string;
  const num = parseInt(String(number), 10);

  if (!isFinite(num)) {
    throw new TypeError(
      `Not a finite number: ${number} (${typeof number} )`
    );
  }
  if (!isSafeNumber(num)) {
    throw new RangeError(
      'Input is not a safe number, it’s either too large or too small.'
    );
  }
  words = generateWords(num);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words?: string[]): string {
  let remainder = number, word = ''

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

  } else if (number < numbers.ONE_HUNDRED) {
    remainder = number % numbers.TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / numbers.TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += '-' + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }

  } else if (number < numbers.ONE_THOUSAND) {
    remainder = number % numbers.ONE_HUNDRED;
    word = generateWords(Math.floor(number / numbers.ONE_HUNDRED)) + ' hundred';

  } else if (number < numbers.ONE_MILLION) {
    remainder = number % numbers.ONE_THOUSAND;
    word = generateWords(Math.floor(number / numbers.ONE_THOUSAND)) + ' thousand,';

  } else if (number < numbers.ONE_BILLION) {
    remainder = number % numbers.ONE_MILLION;
    word = generateWords(Math.floor(number / numbers.ONE_MILLION)) + ' million,';

  } else if (number < numbers.ONE_TRILLION) {
    remainder = number % numbers.ONE_BILLION;
    word = generateWords(Math.floor(number / numbers.ONE_BILLION)) + ' billion,';

  } else if (number < numbers.ONE_QUADRILLION) {
    remainder = number % numbers.ONE_TRILLION;
    word = generateWords(Math.floor(number / numbers.ONE_TRILLION)) + ' trillion,';

  } else if (number <= numbers.MAX) {
    remainder = number % numbers.ONE_QUADRILLION;
    word = generateWords(Math.floor(number / numbers.ONE_QUADRILLION)) +
      ' quadrillion,';
  }

  words.push(word)
  return generateWords(remainder, words)
}
// module.exports = toWords;

console.log(toWords('10', true))
console.log(toWords('0', true))
console.log(toWords('-100'))
console.log(toWords('-80',))
console.log(toWords('-10110',))
console.log(toWords('-787979810', true))

