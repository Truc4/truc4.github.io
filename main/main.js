var start = new Date().getTime();
var timer = 0;
var pixels = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = document.getElementById("canvasSize").getBoundingClientRect().width;
canvas.height = document.getElementById("canvasSize").getBoundingClientRect().height;

document.getElementById("introButton").addEventListener("click", () => {
    console.log(document.getElementById("html").style);
    document.getElementById("html").style["-ms-overflow-style"] = "";
    document.getElementById("html").style["scrollbar-width"] = "";
    document.getElementById("html").setAttribute('data--webkit-scrollbar', '');
});

// ctx.fillStyle = "rgba(0, 0, 0, 1)";
// ctx.fillRect(0, 0, getViewport()[0], getViewport()[1]);

for (i = 0; i < rand(8); i++) {
    spawnPixel();
}

console.log('y');

document.getElementById("head").style.opacity = "1";

setInterval(main, 0);

function main() {
    var end = new Date().getTime();
    var delta = (end - start) / 1000;
    start = end;
    timer += delta;
    if (timer >= .5) {
        timer = 0;
        for (i = 0; i < rand(8); i++) {
            spawnPixel();
        }
    }

    const canvasSize = document.getElementById("canvasSize").getBoundingClientRect();
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    // ctx.fillRect(0, 0, getViewport()[0], getViewport()[1]);
    // ctx.fillStyle = "#FFF";
    // ctx.fillRect(10, 10, 10, 10);

    pixels.forEach((pixel, index) => {
        // const trail = 4;
        // for (i = trail; i > -1; i--) {
        //     const alpha = 1 - (i / trail);
        //     ctx.fillStyle = `rgb(${pixel.color.r * alpha}, ${pixel.color.g * alpha}, ${pixel.color.b * alpha})`;
        //     ctx.fillRect(pixel.x + i * pixel.size / 2, pixel.y + i * pixel.size / 2, pixel.size, pixel.size);
        // }
        ctx.fillStyle = `rgb(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b})`;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        pixel.x += -pixel.speed * delta * 100;
        pixel.y += -pixel.speed * delta * 100;
        if (pixel.x < -50 || pixel.y < -50) {
            pixels.splice(index, 1);
        }
    });
}

function spawnPixel() {
    const layer = rand(3);
    var newPixel = {
        size: layer * 3,
        speed: (((layer + 5) / 3) - 1) / 3,
        x: rand(canvas.width * 1.5),
        y: canvas.height + rand(150),
        color: {
            r: 0,
            g: 100,
            b: 255
        }
    };
    pixels.push(newPixel);
}

function rand(value) { return Math.floor(Math.random() * value) + 1 }

function getViewport() {

    var viewPortWidth;
    var viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined' &&
        typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
}