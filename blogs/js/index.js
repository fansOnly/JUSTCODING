window.addEventListener('scroll', function() {
    let scrollTop = document.scrollingElement.scrollTop;
    if (scrollTop >= 300) {
        document.getElementById('top').style.display = 'block';
    } else {
        document.getElementById('top').style.display = 'none';
    }
})
document.getElementById('top').onclick = function() {
    window.scroll(0, 0);
}