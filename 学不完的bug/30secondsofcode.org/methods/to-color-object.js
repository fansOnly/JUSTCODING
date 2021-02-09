/**
 * Converts an hsl() color string to an object with the value of each color.
 * 1. Use String.prototype.match() to get an array of 3 string with the numeric values.
 * 2. Use Array.prototype.map() to combination with Number to convert them into an array of numeric values.
 * 3. Use Array destructuring to store the values into named variables and create an appropriate object from them.
 */
const toHSLObject = hslStr => {
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number)
    return [hue, saturation, lightness]
}

const res = toHSLObject('hsl(50, 10%, 10%)')
console.log('res: ', res); // [ 50, 10, 10 ]


/**
 * Converts an rgb() color string to n object with the values of each color.
 */
const toRGBObject = rgbStr => {
    const [red, green, blue] = rgbStr.match(/\d+/g).map(Number)
    return [red, green, blue]
}

const res2 = toRGBObject('rgb(255, 12, 0)')
console.log('res2: ', res2); // [ 255, 12, 0 ]


/**
 * Changes the lightness value of an hsl() color to string.
 */
const changeLightness = (delta, hslStr) => {
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number)
    const newLightness = Math.max(0, Math.min(100, parseInt(delta) + lightness))
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`
}

const res3 = changeLightness(10, 'hsl(330, 50%, 50%)')
console.log('res3: ', res3);

const res4 = changeLightness(-10, 'hsl(330, 50%, 50%)')
console.log('res4: ', res4);
