var $canvasSelector = $('#structure-drawer');
var canvas = $canvasSelector.get(0);
var containerElement = canvas.parentElement;
canvas.width = containerElement.offsetWidth;
canvas.height = containerElement.offsetHeight;

var ctx = canvas.getContext('2d');

containerElement.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = containerElement.offsetWidth;
    canvas.height = containerElement.offsetHeight;
}
resizeCanvas();

//////////////////////////////////////////////////////////////
// FABRIC create a wrapper around native canvas element (with id="...")
///////////////////////////////////////////////////////////////

var canvas = new fabric.Canvas('structure-drawer', {
    selectionColor: "yellow",
    selectionLineWidth: 2,
    selection: true,
    isDrawingMode: true,
    backgroundColor: 'white'
});



///////////////////
//PAINT CIRCLES///
/////////////////

// canvas.on('mouse:move', function(options) {
//     if (options.target) {
//         console.log('an object was clicked! ', options.target.type);
//     }
//     console.log(options.e.clientX, options.e.clientY);

//     var circle101 = new fabric.Circle({
//         radius: 5,
//         fill: 'black',
//         left: options.e.clientX,
//         top: options.e.clientY,
//         selectable: false,
//         opacity: 0.5
//     });
//     canvas.add(circle101);
//     circle101.animate('radius', (Math.round(Math.random() * 20)), {
//         onChange: canvas.renderAll.bind(canvas),
//         duration: 1000

//     });

// });



/////////////////////
//NEW BRASH CLASS///
///////////////////

// var brush = new fabric.BaseBrush(canvas);

// var pencilBrush = new fabric.PencilBrush(canvas);
// canvas.freeDrawingBrush = pencilBrush;

// var curcleBrush = new fabric.CircleBrush(canvas);
// canvas.freeDrawingBrush = curcleBrush;

// var paternBrush = new fabric.PatternBrush(canvas);
// canvas.freeDrawingBrush = paternBrush;

// var crayonBrush = new fabric.CrayonBrush(canvas);
// canvas.freeDrawingBrush = crayonBrush;

var inkBrush = new fabric.InkBrush(canvas);
canvas.freeDrawingBrush = inkBrush;

// var markerBrush = new fabric.MarkerBrush(canvas);
// canvas.freeDrawingBrush = markerBrush;

// var sprayBrush = new fabric.SprayBrush(canvas);
// canvas.freeDrawingBrush = sprayBrush;