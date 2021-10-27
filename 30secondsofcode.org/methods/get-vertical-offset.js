/**
 * getVerticalOffset
 * Finds the distance from a given element to the top of the document
 * 1. Use a While loop and HTMLElement.offsetParent to move up the offset parents of the given element.
 * 2. Add HTMLElement.offsetTop for each element and returns the result.
 */
const getVerticalOffset = el => {
    let top = el.offsetTop, _el = el
    while (_el.offsetParent) {
        _el = _el.offsetParent
        top += _el.offsetTop
    }
    return top
}


// html - get-vertical-offset.html
