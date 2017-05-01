$(function () {
    $.get('drawings').then(function (drawings) {
        drawings
    });

    $('#savePNG').on('click', function (event) {
        event.preventDefault();

        function Drawing(textJSON) {
            this.textJSON = textJSON;
        }

        var canvasToJSON = JSON.stringify(canvas);
        console.log(canvasToJSON);
        $.post('drawings', new Drawing(canvasToJSON));
        alert('Your drawing has been saved!');
    });
});