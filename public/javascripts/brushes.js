(function(fabric) {

    /**
     * RainbowBrush class
     * @class fabric.RainbowBrush
     */
    fabric.RainbowBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.RainbowBrush.prototype */ {

        /**
         * Width of a brush
         * @type Number
         * @default
         */
        width: 10,

        /**
         * Constructor
         * @param {fabric.Canvas} canvas
         * @return {fabric.RainbowBrush} Instance of a rainbow brush
         */
        initialize: function(canvas) {
            this.canvas = canvas;
            this.points = [];
        },

        /**
         * Invoked inside on mouse down and mouse move
         * @param {Object} pointer
         */
        drawDot: function(pointer) {
            var point = this.addPoint(pointer),
                ctx = this.canvas.contextTop,
                v = this.canvas.viewportTransform;
            ctx.save();
            ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);

            ctx.fillStyle = point.fill;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        },

        /**
         * Invoked on mouse down
         */
        onMouseDown: function(pointer) {
            this.points.length = 0;
            this.canvas.clearContext(this.canvas.contextTop);
            this._setShadow();
            this.drawDot(pointer);
        },

        /**
         * Invoked on mouse move
         * @param {Object} pointer
         */
        onMouseMove: function(pointer) {
            this.drawDot(pointer);
        },

        /**
         * Invoked on mouse up
         */
        onMouseUp: function() {
            var originalRenderOnAddRemove = this.canvas.renderOnAddRemove;
            this.canvas.renderOnAddRemove = false;

            var circles = [];

            for (var i = 0, len = this.points.length; i < len; i++) {
                var point = this.points[i],
                    circle = new fabric.Circle({
                        radius: point.radius,
                        left: point.x,
                        top: point.y,
                        originX: 'center',
                        originY: 'center',
                        fill: point.fill
                    });

                this.shadow && circle.setShadow(this.shadow);

                circles.push(circle);
            }
            var group = new fabric.Group(circles, { originX: 'center', originY: 'center' });
            group.canvas = this.canvas;

            this.canvas.add(group);
            this.canvas.fire('path:created', { path: group });

            this.canvas.clearContext(this.canvas.contextTop);
            this._resetShadow();
            this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
            this.canvas.renderAll();
        },

        /**
         * @param {Object} pointer
         * @return {fabric.Point} Just added pointer point
         */
        addPoint: function(pointer) {
            var pointerPoint = new fabric.Point(pointer.x, pointer.y);

            var circleRadius = fabric.util.getRandomInt(
                Math.max(0, this.width - 20), this.width + 20) / 2;
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            var col = "rgb(" + r + "," + g + "," + b + ")";
            circleColor = col;

            pointerPoint.radius = circleRadius;
            pointerPoint.fill = circleColor;

            this.points.push(pointerPoint);

            return pointerPoint;
        }
    });
})(fabric);

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

//////////////////
//INITIAL BRASHES
////////////////

var pencil = new fabric.PencilBrush(canvas);
var spray = new fabric.SprayBrush(canvas);
var pattern = new fabric.PatternBrush(canvas);
/**
 * vLinePatternBrush class
 * @class fabric.vLinePatternBrush
 */
var vLine = new fabric.PatternBrush(canvas);
vLine.getPatternSrc = function() {

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
var hLine = new fabric.PatternBrush(canvas);
hLine.getPatternSrc = function() {

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
var square = new fabric.PatternBrush(canvas);
square.getPatternSrc = function() {

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

var lavaTexture = new fabric.PatternBrush(canvas);
var imgLava = new Image();
imgLava.src = '/images/lavaIcon.png';
lavaTexture.source = imgLava;

var waterTexture = new fabric.PatternBrush(canvas);
var imgWater = new Image();
imgWater.src = '/images/waterIcon.png';
waterTexture.source = imgWater;

var grassTexture = new fabric.PatternBrush(canvas);
var imgGrass = new Image();
imgGrass.src = '/images/grassIcon.png';
grassTexture.source = imgGrass;

var woodTexture = new fabric.PatternBrush(canvas);
var imgWood = new Image();
imgWood.src = '/images/woodIcon.png';
woodTexture.source = imgWood;

var stoneTexture = new fabric.PatternBrush(canvas);
var imgStone = new Image();
imgStone.src = '/images/stoneIcon.png';
stoneTexture.source = imgStone;

var textileTexture = new fabric.PatternBrush(canvas);
var imgTextile = new Image();
imgTextile.src = '/images/textileIcon.png';
textileTexture.source = imgTextile;

var redTexture = new fabric.PatternBrush(canvas);
var imgRed = new Image();
imgRed.src = '/images/redTextureIcon.png';
redTexture.source = imgRed;

var blueTexture = new fabric.PatternBrush(canvas);
var imgBlue = new Image();
imgBlue.src = '/images/blueTextureIcon.png';
blueTexture.source = imgBlue;

var dropsTexture = new fabric.PatternBrush(canvas);
var imgDrop = new Image();
imgDrop.src = '/images/dropsIcon.png';
dropsTexture.source = imgDrop;

var circle = new fabric.CircleBrush(canvas);
var rainbow = new fabric.RainbowBrush(canvas);
var rubberBrush = new fabric.PencilBrush(canvas);