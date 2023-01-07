/**
 * 25. degreesToRads
 * This code snippet can be used to convert a value from degrees to radians.
 */
const degreesToRads = deg => (deg * Math.PI) / 180.0;

degreesToRads(90.0); // ~1.5708

/**
 * 89. radsToDegrees
 * This snippet can be used to convert an angle from radians to degrees.
 */
const radsToDegrees = rad => (rad * 180.0) / Math.PI;

radsToDegrees(Math.PI / 2); // 90

/**
 * 30. distance
 * This snippet returns the distance between two points by calculating the Euclidean distance.
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

distance(1, 1, 2, 3); // 2.23606797749979

/**
 * 92. randomIntegerInRange
 * This snippet can be used to generate a random integer in a specified range.
 */
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

randomIntegerInRange(0, 5); // 3

/**
 * 93. randomNumberInRange
 * This snippet can be used to return a random number in a specified range.
 */
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

randomNumberInRange(2, 10); // 6.0211363285087005

/**
 * 97. round
 * This snippet can be used to round a number to a specified number of digits.
 */
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

round(1.005, 2); // 1.01
