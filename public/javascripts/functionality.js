$(window).on("load", function() {
    ///////////////
    //DOM ELEMENTS
    /////////////

    var $id = function(id) { return document.getElementById(id) };

    var brushesButtonEl = $id('brushesButton');
    var drawingLineWidthEl = $id('rangeinput');
    var drawingLineOpacityEl = $id('opacityRangeinput');
    var rangeValue = $id('rangevalue');
    var opacityRangeValue = $id('opacityRangevalue');
    var shadowOffsetXRangeValue = $id('shadowOffsetXRangevalue');
    var shadowOffsetYRangevalue = $id('shadowOffsetYRangevalue');
    var drawingColorEl = $id('colorPicker');
    var shadowColorEl = $id('colorPickerShadow');
    var backgroundColorEl = $id('colorBackground');
    var drawingModeEl = $id('changeMode');


    /////////////////////
    //MAIN NAV FUNCTIONS
    ///////////////////

    // $("#savePNG").click(function() {
    //     canvas.isDrawingMode = false;
    //     drawingModeEl.innerHTML = '<img src="/images/paletteIcon.png" width=20 > Enter Drawing';
    //     $("#brushesButton").addClass("disabled");
    //     brushesButtonEl.innerHTML = '<img src="/images/cupIcon.png" width=20 > BRUSHES <span class="caret"></span>';
    //     if (!window.localStorage) { alert("This function is not supported by your browser."); return; }
    //     window.open(canvas.toDataURL('png'));
    // });


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

    $("#PaintBucket").click(function() {
        canvas.backgroundColor = backgroundColorEl.value;
        canvas.renderAll();
        $("#Rubber").removeClass("disabled");
    });

    $("#CleanBackground").click(function() {
        canvas.backgroundColor = 0;
        canvas.renderAll();
        $("#Rubber").addClass("disabled");
    });

    $("#Rubber").click(function() {
        canvas.freeDrawingBrush = rubberBrush;
        canvas.freeDrawingBrush.color = backgroundColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    });

    $("#changeMode").click(function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = '<span class="glyphicon glyphicon-move"></span> Cancel Drawing';
            $("#brushesButton").removeClass("disabled");
        } else {
            drawingModeEl.innerHTML = '<img src="/images/paletteIcon.png" width=20 > Enter Drawing';
            $("#brushesButton").addClass("disabled");
            brushesButtonEl.innerHTML = '<img src="/images/cupIcon.png" width=20 > BRUSHES <span class="caret"></span>';
        }
    });

    $("#clearCanvas").click(function() {
        $("#brushesButton").removeClass("disabled");
        alert('Are you sure?')
        canvas.clear()
        canvas.backgroundColor = "white";
        canvas.renderAll();
    });

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    $("#brushesDropdown").click(function(event) {
        var target = getEventTarget(event);
        switch (target.id) {
            case 'pencil':
                canvas.freeDrawingBrush = pencil;
                break;
            case 'spray':
                canvas.freeDrawingBrush = spray;
                break;
            case 'doted':
                canvas.freeDrawingBrush = pattern;
                break;
            case 'vLine':
                canvas.freeDrawingBrush = vLine;
                break;
            case 'hLine':
                canvas.freeDrawingBrush = hLine;
                break;
            case 'square':
                canvas.freeDrawingBrush = square;
                break;
            case 'texture':
                canvas.freeDrawingBrush = lavaTexture;
                break;
            case 'circle':
                canvas.freeDrawingBrush = circle;
                break;
            case 'rainbow':
                canvas.freeDrawingBrush = rainbow;
                break;
            case 'lava':
                canvas.freeDrawingBrush = lavaTexture;
                break;
            case 'water':
                canvas.freeDrawingBrush = waterTexture;
                break;
            case 'grass':
                canvas.freeDrawingBrush = grassTexture;
                break;
            case 'wood':
                canvas.freeDrawingBrush = woodTexture;
                break;
            case 'stone':
                canvas.freeDrawingBrush = stoneTexture;
                break;
            case 'textile':
                canvas.freeDrawingBrush = textileTexture;
                break;
            case 'redTexture':
                canvas.freeDrawingBrush = redTexture;
                break;
            case 'blueTexture':
                canvas.freeDrawingBrush = blueTexture;
                break;
            case 'drops':
                canvas.freeDrawingBrush = dropsTexture;
                break;
            default:
                canvas.freeDrawingBrush = pencil;
        }
        brushesButtonEl.innerHTML = '<img src="/images/' + target.id + 'Icon.png" width=20 > ' + target.id + ' <span class="caret"></span>';
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
            canvas.freeDrawingBrush.setShadow();
            canvas.freeDrawingBrush.shadow.color = shadowColorEl.value;
            canvas.freeDrawingBrush.shadow.blur = drawingLineOpacityEl.value;
            canvas.freeDrawingBrush.shadow.offsetX = 0;
            canvas.freeDrawingBrush.shadow.offsetY = 0;
        }
    });

    $("#rangeinput").change(function() {
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        rangeValue.innerHTML = this.value;
    });

    $("#opacityRangeinput").change(function() {
        canvas.freeDrawingBrush.shadow.blur = this.value;
        opacityRangeValue.innerHTML = this.value;
    });

    $("#shadowOffsetXInput").change(function() {
        canvas.freeDrawingBrush.shadow.offsetX = this.value;
        shadowOffsetXRangeValue.innerHTML = this.value;
    });

    $("#shadowOffsetYInput").change(function() {
        canvas.freeDrawingBrush.shadow.offsetY = this.value;
        shadowOffsetYRangevalue.innerHTML = this.value;
    });

    $("#colorPicker").change(function() {
        canvas.freeDrawingBrush.color = this.value;
    });

    $("#colorPickerShadow").change(function() {
        canvas.freeDrawingBrush.shadow.color = this.value;
    });

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        canvas.freeDrawingBrush.setShadow();
        canvas.freeDrawingBrush.shadow.color = shadowColorEl.value;
        canvas.freeDrawingBrush.shadow.blur = 0;
        canvas.freeDrawingBrush.shadow.offsetX = 0;
        canvas.freeDrawingBrush.shadow.offsetY = 0;
    }
});