/**
 * 12. byteSize
 * This snippet returns the length of a string in bytes.
 */
const byteSize = str => new Blob([str]).size;

byteSize('😀'); // 4
byteSize('Hello World'); // 11

/**
 * 13. capitalize
 * This snippet capitalizes the first letter of a string.
 */
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
// or...
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * 14. capitalizeEveryWord
 * This snippet capitalizes the first letter of every word in a given string.
 */
const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

capitalizeEveryWord('hello world!'); // 'Hello World!'

/**
 * 21. decapitalize
 * This snippet turns the first letter of a string into lowercase.
 */
const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('');

decapitalize('FooBar'); // 'fooBar'
decapitalize('FooBar'); // 'fooBar'

/**
 * 88. pad
 * This snippet can be used to pad a string on both sides with a specified character if it is shorter than the specified length.
 */
const pad = (str, length, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);

pad('cat', 8); // '  cat   '
pad(String(42), 6, '0'); // '004200'
pad('foobar', 3); // 'foobar'

/**
 * 110. sortCharactersInString
 * This snippet can be used to alphabetically sort the characters in a string.
 */
const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

sortCharactersInString('cabbage'); // 'aabbceg'

/**
 * 111. splitLines
 * This snippet can be used to split a multi-line string into an array of lines.
 */
const splitLines = str => str.split(/\r?\n/);

splitLines('This\nis a\nmultiline\nstring.\n'); // ['This', 'is a', 'multiline', 'string.' , '']

/**
 * 112. stripHTMLTags
 * This snippet can be used to remove HTML/XML tags from a string.
 */
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'

/**
 * 127. words
 * This snippet converts a string into an array of words.
 */

const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean);

words('I love javaScript!!'); // ["I", "love", "javaScript"]
words('python, javaScript & coffee'); // ["python", "javaScript", "coffee"]


/**
 * Truncate in middle.
 */
const truncateInMiddle = (string, length, start, end) => {
  return `${string.slice(0, start)}...${string.slice(string.length - end)}`;
}

/**
 * Convert string to URL slug.
 */
const slugify = (string) => string.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

/**
 * Genrate a random string.
 */
const randomString = () => Math.random().toString(36).slice(2)
// for eg: y3lpt2gs5q