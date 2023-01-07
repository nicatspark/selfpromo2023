/**
 * 18. Create Directory
 * This snippet uses existsSync() to check whether a directory exists and then mkdirSync() to create it if it doesn’t.
 */
const fs = require('fs');
const createDirIfNotExists = dir =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
createDirIfNotExists('test');
// creates the directory 'test', if it doesn't exist

/**
 * 64. isBrowser
 * This snippet can be used to determine whether the current runtime environment is a browser. This is helpful for avoiding errors when running front-end modules on the server (Node).
 */
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)

/**
 * 94. readFileLines
 * This snippet can be used to read a file by getting an array of lines from a file.
 */
const fs = require('fs');
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

let arr = readFileLines('test.txt');
console.log(arr); // ['line1', 'line2', 'line3']
