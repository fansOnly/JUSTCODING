function Scratch (config) {
    this.config = {
        canvas: null,
        showAllPercent: 50, // 全部显示的刮开百分比
        coverImg: null,
        coverColor: null,
        radius: 5, // 橡皮擦半径
        pixelratio: 1,  // 屏幕倍数
        fadeOut: 2000, // 全部淡出时间,
        doneCallback: null,
    }
    Object.assign(this.config, config);
    this.canvas = this.config.canvas;
    this.ctx = null;
    this.offsetX = null;
    this.offsetY = null;
    this.isDown = false;  // 是否在涂层处于按下状态
    this.done = false;  // 是否刮完
    this._init();
}
Scratch.prototype = {
    constructor: Scratch,
    _init: function () {
        let that = this;
        this.ctx = this.canvas.getContext('2d');
        this.offsetX = this.canvas.offsetLeft;
        this.offsetY = this.canvas.offsetTop;
        this._addEvent();
        if (this.config.coverImg) {
            // 背景涂图
            const coverImg = new Image();
            coverImg.src = this.config.coverImg;
            coverImg.onload = function () {
                that.ctx.drawImage(coverImg, 0, 0);
                that.ctx.globalCompositeOperation = 'destination-out';
            }
        } else {
            // 纯色涂层
            this.ctx.fillStyle = this.config.coverColor;
            this.ctx.fillReact(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalCompositeOperation = 'destination-out';
        }
    },
    _addEvent: function () {
        this.canvas.addEventListener('touchstart', this._eventDown.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this._eventUp.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this._scratch.bind(this), { passive: false });
        this.canvas.addEventListener('mousedown', this._eventDown.bind(this), { passive: false });
        this.canvas.addEventListener('mouseup', this._eventUp.bind(this), { passive: false });
        this.canvas.addEventListener('mousemove', this._scratch.bind(this), { passive: false });
    },
    _eventDown: function (e) {
        e.preventDefault();
        this.isDown = true;
    },
    _eventUp: function (e) {
        e.preventDefault();
        this.isDown = false;
    },
    _scratch: function (e) {
        // 刮涂层
        e.preventDefault();
        let that = this;
        if (this.isDown && !this.done) {
            if (e.changedTouches) {
                e = e.changedTouches[e.changedTouches.length - 1];
            }
            const x = (e.clientX + document.body.scrollLeft || e.pageX) - this.offsetX || 0;
            const y = (e.clientY + document.body.scrollTop || e.pageY) - this.offsetY || 0;
            with(this.ctx) {
                beginPath();
                arc(x * that.config.pixelratio, y * that.config.pixelratio, that.config.radius * that.config.pixelratio, 0, Math.PI * 2);
                fill();
            }
            if (this._getScratchPercent() > this.config.showAllPercent) {
                this._scratchAll();
            }
        }
    },
    _scratchAll: function () {
        let that = this;
        this.done = true;
        if (this.config.fadeOut) {
            this.canvas.transition = `all ${this.config.fadeOut / 1000}s linear`;
            this.canvas.style.opacity = 0;
            setTimeout(() => {
                this._clear();
            }, this.config.fadeOut)
        } else {
            this._clear();
        }
        this.config.doneCallback && this.config.doneCallback();
    },
    _clear: function () {
        this.canvas.fillReact(0, 0, this.canvas.width, this.canvas.height);
    },
    _getScratchPercent: function () {
        let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let pixels = imgData.data;
        console.log(pixels);
        let transPixels = [];
        for (let i =0; i < pixels.length; i += 4) {
            if (pixels[i+3] < 128) {
                transPixels.push(pixels[i+3]);
            }
        }
        return (transPixels.length / (pixels.length / 4) * 100).toFixed(2);
    },
}