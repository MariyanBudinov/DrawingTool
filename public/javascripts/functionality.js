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
});

var $ = function(id) { return document.getElementById(id) };

var drawingOptionsEl = $('brushesDropdown');
var drawingLineWidthEl = $('rangeinput');
var drawingLineOpacityEl = $('opacityRangeinput');
var rangeValue = $('rangevalue');
var opacityRangeValue = $('opacityRangevalue');
var drawingColorEl = $('colorPicker');
var drawingModeEl = $('changeMode');
var clearEl = $('clearCanvas');

//////////////////
//NEW BRASH CLASS
////////////////

var pencilBrush = new fabric.PencilBrush(canvas);
var markerBrush = new fabric.MarkerBrush(canvas);
var patternBrush = new fabric.PatternBrush(canvas);
var crayonBrush = new fabric.CrayonBrush(canvas);
var sprayBrush = new fabric.SprayBrush(canvas);
var paintingRoller = new fabric.InkBrush(canvas);
var curcleBrush = new fabric.CircleBrush(canvas);

//////////////////////
//NEW BRASH CLASS END
////////////////////

clearEl.onclick = function() { canvas.clear() };

drawingModeEl.onclick = function() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
        drawingModeEl.innerHTML = 'Cancel Drawing Mode';
    } else {
        drawingModeEl.innerHTML = 'Enter Drawing Mode';
    }
};

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var brushesList = document.getElementById('brushesDropdown');
brushesList.onclick = function(event) {
    var target = getEventTarget(event);

    switch (target.id) {
        case 'Pencil':
            canvas.freeDrawingBrush = pencilBrush;
            break;
        case 'Marker':
            canvas.freeDrawingBrush = markerBrush;
            break;
        case 'Line Brush':
            canvas.freeDrawingBrush = patternBrush;
            break;
        case 'Pastelle':
            canvas.freeDrawingBrush = crayonBrush;
            break;
        case 'Spray':
            canvas.freeDrawingBrush = sprayBrush;
            break;
        case 'Painting Roller':
            canvas.freeDrawingBrush = paintingRoller;
            break;
        case 'Circle Brush':
            canvas.freeDrawingBrush = curcleBrush;
            break;
        default:
            canvas.freeDrawingBrush = pencilBrush;
    }

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        canvas.freeDrawingBrush.opacity = drawingLineOpacityEl.value / 100 || 1;
    }
};

drawingColorEl.onchange = function() {
    canvas.freeDrawingBrush.color = this.value;
};
drawingLineWidthEl.onchange = function() {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    rangeValue.innerHTML = canvas.freeDrawingBrush.width;
};
drawingLineOpacityEl.onchange = function() {
    canvas.freeDrawingBrush.opacity = this.value / 100;
    opacityRangeValue.innerHTML = canvas.freeDrawingBrush.opacity;
};

if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.opacity = drawingLineOpacityEl.value / 100 || 1;
}