var $canvasSelector = $('#structure-drawer');
var canvas = $canvasSelector.get(0);
var containerElement = canvas.parentElement;
canvas.width = containerElement.offsetWidth;
canvas.height = containerElement.offsetHeight;
var ctx = canvas.getContext('2d');

/////////////////////////////////////////////////////////////////////////
// FABRIC create a wrapper around native canvas element (with id="...")
///////////////////////////////////////////////////////////////////////

var canvas = new fabric.Canvas('structure-drawer', {
    selection: true,
    isDrawingMode: true,
    backgroundColor: "white"
});

///////////////
//DOM ELEMENTS
/////////////

var $id = function(id) { return document.getElementById(id) };

var brushesButtonEl = $id('brushesButton');
var drawingLineWidthEl = $id('rangeinput');
var drawingLineOpacityEl = $id('opacityRangeinput');
var rangeValue = $id('rangevalue');
var opacityRangeValue = $id('opacityRangevalue');
var drawingColorEl = $id('colorPicker');
var drawingModeEl = $id('changeMode');

//////////////////
//INITIAL BRASHES
////////////////

var pencilBrush = new fabric.PencilBrush(canvas);
var sprayBrush = new fabric.SprayBrush(canvas);
var patternBrush = new fabric.PatternBrush(canvas);
/**
 * vLinePatternBrush class
 * @class fabric.vLinePatternBrush
 */
var vLinePatternBrush = new fabric.PatternBrush(canvas);
vLinePatternBrush.getPatternSrc = function() {

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = 10;
    var ctx = patternCanvas.getContext('2d');

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(5, 10);
    ctx.closePath();
    ctx.stroke();

    return patternCanvas;
};
/**
 * hLinePatternBrush class
 * @class fabric.hLinePatternBrush
 */
var hLinePatternBrush = new fabric.PatternBrush(canvas);
hLinePatternBrush.getPatternSrc = function() {

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = 10;
    var ctx = patternCanvas.getContext('2d');

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(10, 5);
    ctx.closePath();
    ctx.stroke();

    return patternCanvas;
};
/**
 * squarePatternBrush class
 * @class fabric.squarePatternBrush
 */
var squarePatternBrush = new fabric.PatternBrush(canvas);
squarePatternBrush.getPatternSrc = function() {

    var squareWidth = 10,
        squareDistance = 2;

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
    var ctx = patternCanvas.getContext('2d');
    patternCanvas.style.backgroundColor = '#555';
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, squareWidth, squareWidth);

    return patternCanvas;
};
/**
 * texturePatternBrush class
 * @class fabric.texturePatternBrush
 */
var img = new Image();
img.src = '/images/lava.jpg';

var texturePatternBrush = new fabric.PatternBrush(canvas);
texturePatternBrush.source = img;

var curcleBrush = new fabric.CircleBrush(canvas);
var dropperBrush = new fabric.DropperBrush(canvas);
var rainbowBrush = new fabric.RainbowBrush(canvas);

/////////////////////
//MAIN NAV FUNCTIONS
///////////////////

$("#savePNG").click(function() {
    canvas.isDrawingMode = false;
    drawingModeEl.innerHTML = '<img src="/images/paletteIcon.png" width=20 > Enter Drawing';
    $("#brushesButton").addClass("disabled");
    brushesButtonEl.innerHTML = '<img src="/images/cupIcon.png" width=20 > BRUSHES <span class="caret"></span>';
    if (!window.localStorage) { alert("This function is not supported by your browser."); return; }
    window.open(canvas.toDataURL('png'));
});

$('fbLogin').click(function(event) {
    event.preventDefault();
});
//////////////////////
// LEFT NAV FUNCTIONS
/////////////////////

$("#toolsBtnToggle").click(function(event) {
    event.preventDefault();
    $("#sidebarLeft").toggleClass("sidebarWidth");
    $("#sidebarLeft").toggleClass("col-md-3 col-xs-12 col-sm-10 col-lg-3");
});

$("#clearCanvas").click(function() {
    $("#brushesButton").removeClass("disabled");
    alert('Are you sure?')
    canvas.clear()
    canvas.backgroundColor = "white";
    canvas.renderAll();
});

$("#PaintBucket").click(function() {
    canvas.backgroundColor = drawingColorEl.value;
    canvas.renderAll();
});

$("#changeMode").click(function() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
        drawingModeEl.innerHTML = '<img src="/images/handDirections.png" width=20 > Cancel Drawing';
        $("#brushesButton").removeClass("disabled");
    } else {
        drawingModeEl.innerHTML = '<img src="/images/paletteIcon.png" width=20 > Enter Drawing';
        $("#brushesButton").addClass("disabled");
        brushesButtonEl.innerHTML = '<img src="/images/cupIcon.png" width=20 > BRUSHES <span class="caret"></span>';
    }
});

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

$("#brushesDropdown").click(function(event) {
    var target = getEventTarget(event);
    switch (target.id) {
        case 'Pencil':
            canvas.freeDrawingBrush = pencilBrush;
            brushesButtonEl.innerHTML = '<img src="/images/pencilIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Spray':
            canvas.freeDrawingBrush = sprayBrush;
            brushesButtonEl.innerHTML = '<img src="/images/sprayIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Doted Brush':
            canvas.freeDrawingBrush = patternBrush;
            brushesButtonEl.innerHTML = '<img src="/images/linesIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'V.Line Brush':
            canvas.freeDrawingBrush = vLinePatternBrush;
            brushesButtonEl.innerHTML = '<img src="/images/linesIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'H.Line Brush':
            canvas.freeDrawingBrush = hLinePatternBrush;
            brushesButtonEl.innerHTML = '<img src="/images/linesIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Square Brush':
            canvas.freeDrawingBrush = squarePatternBrush;
            brushesButtonEl.innerHTML = '<img src="/images/linesIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Texture Brush':
            canvas.freeDrawingBrush = texturePatternBrush;
            brushesButtonEl.innerHTML = '<img src="/images/linesIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Circle Brush':
            canvas.freeDrawingBrush = curcleBrush;
            brushesButtonEl.innerHTML = '<img src="/images/circleIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Dropper':
            canvas.freeDrawingBrush = dropperBrush;
            brushesButtonEl.innerHTML = '<img src="/images/circleIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;
        case 'Rainbow Brush':
            canvas.freeDrawingBrush = rainbowBrush;
            brushesButtonEl.innerHTML = '<img src="/images/circleIcon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
            break;

        default:
            canvas.freeDrawingBrush = pencilBrush;
    }
    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        canvas.freeDrawingBrush.opacity = drawingLineOpacityEl.value / 100 || 1;
    }
});

$("#colorPicker").change(function() {
    canvas.freeDrawingBrush.color = this.value;
});

$("#rangeinput").change(function() {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    rangeValue.innerHTML = canvas.freeDrawingBrush.width;
});

$("#opacityRangeinput").change(function() {
    canvas.freeDrawingBrush.opacity = this.value / 100;
    opacityRangeValue.innerHTML = canvas.freeDrawingBrush.opacity;
});

if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.opacity = drawingLineOpacityEl.value / 100 || 1;
}