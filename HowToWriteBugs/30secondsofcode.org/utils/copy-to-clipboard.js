/**
 * copy-text-to-clipboard-with-javascript
 * 1、Create a <textarea> element to be appended to the document. Set it value to the string we want to copy to the clipboard.
 * 2、Append said <textarea> element to the current HTML document.
 * 3、Use HTMLInputElement.select() to select the contents of the <textarea> element.
 * 4、Use Document.execCommand('copy') to copy the contents of the <textarea> to the clipboard.
 * 5、Remove the <textarea> element from the docuement.
 */
const copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}


/**
 * copy-to-clipboard
 * 保留页面文本选择
 * 1、Create a <textarea> element, fill it with the supplied data and add it to the HTML document.
 * 2、Use Selection.getRangeAt() to store the selected range (if any).
 * 3、Use Document.execCommand('copy') to copy to the clipboard.
 * 4、Remove the <textarea> element from the docuement.
 * 5、Use Selection.addRange() to recover the original selected range (if any).
 */
const copyToClipboard2 = str => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected = document.getSelection().rangeCount ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
    }
}
