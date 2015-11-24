$( document ).ready(function() {

    var time = 30;
    var element;

    window.addEventListener("keydown", buttonTouched, false);
    window.addEventListener("keyup", keyupCancel, false);


    function keyupCancel(e) {
        element = getElementByDataAttrAndValue('keycode', e.keyCode);
        $(element[0]).removeClass( "hold" );
    }

    function buttonTouched(e) {

        var keyCode = e.keyCode;

        // getTranslateKeyPressed(keyCode);
        element = getElementByDataAttrAndValue('keycode', keyCode);
        if ($(element[0]).hasClass( "hold" )) { return false; }
        $(element[0]).addClass( "hold" );

    }

    function getElementByDataAttrAndValue(attr, value) {
        var el = $("html").find("[data-"+attr+"='" + value + "']");
        return el;
    }

    function getTranslateKeyPressed(keyCode) {
        switch(keyCode) {
            case 32:
                console.log("space key pressed");
                break;
            case 37:
                console.log("left key pressed");
                break;
            case 38:
                console.log("up key pressed");
                break;
            case 39:
                console.log("right key pressed");
                break;
            case 40:
                console.log("down key pressed");
                break;
            case 65:
                console.log("a key pressed");
                break;
            case 87:
                console.log("w key pressed");
                break;
        }
    }

});
