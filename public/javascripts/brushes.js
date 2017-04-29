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
            var pointerPoint = new fabric.Point(pointer.x, pointer.y),

                circleRadius = fabric.util.getRandomInt(
                    Math.max(0, this.width - 20), this.width + 20) / 2,

                circleColor = ('rgb(' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ')')

            pointerPoint.radius = circleRadius;
            pointerPoint.fill = circleColor;

            this.points.push(pointerPoint);

            return pointerPoint;
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * DropperBrush class
     * @class fabric.DropperBrush
     */
    fabric.DropperBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.DropperBrush.prototype */ {

        /**
         * Width of a brush
         * @type Number
         * @default
         */
        width: 10,

        /**
         * Constructor
         * @param {fabric.Canvas} canvas
         * @return {fabric.DropperBrush} Instance of a dropper brush
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
                circle.animate('radius', (Math.random() * (point.radius * 1.1)), {
                    onChange: canvas.renderAll.bind(canvas),
                    duration: 2000
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
            var pointerPoint = new fabric.Point(pointer.x, pointer.y),

                circleRadius = this.width,


                circleColor = this.color;

            pointerPoint.radius = circleRadius;
            pointerPoint.fill = circleColor;

            this.points.push(pointerPoint);

            return pointerPoint;
        }
    });

})(fabric);