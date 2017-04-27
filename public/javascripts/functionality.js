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
var markerBrush = new fabric.MarkerBrush(canvas);
var patternBrush = new fabric.PatternBrush(canvas);
var crayonBrush = new fabric.CrayonBrush(canvas);
var sprayBrush = new fabric.SprayBrush(canvas);
var paintingRoller = new fabric.InkBrush(canvas);
var curcleBrush = new fabric.CircleBrush(canvas);

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
            brushesButtonEl.innerHTML = '<img src="/images/pencilIcon.png" width=20 > Pencil <span class="caret"></span>';
            break;
        case 'Marker':
            canvas.freeDrawingBrush = markerBrush;
            brushesButtonEl.innerHTML = '<img src="/images/markerIcon.png" width=20 > Marker <span class="caret"></span>';
            break;
        case 'Line Brush':
            canvas.freeDrawingBrush = patternBrush;
            brushesButtonEl.innerHTML = '<img src="/images/linesIcon.png" width=20 > Line Brush <span class="caret"></span>';
            break;
        case 'Pastelle':
            canvas.freeDrawingBrush = crayonBrush;
            brushesButtonEl.innerHTML = '<img src="/images/pastelIcon.png" width=20 > Pastelle <span class="caret"></span>';
            break;
        case 'Spray':
            canvas.freeDrawingBrush = sprayBrush;
            brushesButtonEl.innerHTML = '<img src="/images/sprayIcon.png" width=20 > Spray <span class="caret"></span>';
            break;
        case 'Painting Roller':
            canvas.freeDrawingBrush = paintingRoller;
            brushesButtonEl.innerHTML = '<img src="/images/paintingRollerIcon.png" width=20 > Painting Roller <span class="caret"></span>';
            break;
        case 'Circle Brush':
            canvas.freeDrawingBrush = curcleBrush;
            brushesButtonEl.innerHTML = '<img src="/images/circleIcon.png" width=20 > Circle Brush <span class="caret"></span>';
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