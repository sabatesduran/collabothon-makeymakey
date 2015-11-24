$( document ).ready(function() {

    // VARIABLES
    // Temps de duració de la partida
    var time = 10;
    var element;

    // Listeners d'events
    window.addEventListener("keydown", buttonTouched, false);
    window.addEventListener("keyup", keyupCancel, false);


    /**
     * Agafa l'element amb l'atribut data-keycode amb el resultat de l'event disparat
     * i li elimina la classe "hold" per a que pugui tornanr a detectar el click del botó.
     * @param  Object e Objecte de l'event executat
     */
    function keyupCancel(e) {
        console.dir(e);
        element = getElementByDataAttrAndValue('keycode', e.keyCode);
        $(element[0]).removeClass( "hold" );
    }

    /**
     * Agafa l'element amb l'atribut data-keycode amb el resultat de l'event disparat
     * i li posa la classe "hold" per a que no detecti més d'un "click" en deixar
     * el botó apretat.
     * @param  Object e Objecte de l'event executat
     */
    function buttonTouched(e) {

        var keyCode = e.keyCode;

        doKeyAction(keyCode);

        element = getElementByDataAttrAndValue('keycode', keyCode);
        if ($(element[0]).hasClass( "hold" )) { return false; }
        $(element[0]).addClass( "hold" );

    }

    /**
     * Agafa l'element amb l'atribut data
     * @param  {[type]} attr  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    function getElementByDataAttrAndValue(attr, value) {
        var el = $("html").find("[data-"+attr+"='" + value + "']");
        return el;
    }

    /**
     * Mostra per consola la tecla que s'esta disparant amb l'event
     * @param  Integer keyCode Numero ASCII de la tecla pressionada
     */
    function doKeyAction(keyCode) {
        switch(keyCode) {
            case 32:
                console.log("space key pressed");
                startGame();
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
    
    function checkWinner() {
        var winner = 0;
        var missatge = "Ha guanyat l'equip ";
        var punts1 = parseInt($('#punts-1').html());
        var punts2 = parseInt($('#punts-2').html());

        if(punts1 > punts2) {
            winner = missatge + "1";
        } else if(punts1 === punts2) {
            winner = "Heu quedat empat, haureu de tornar a jugar no? =P";
        } else {
            winner = missatge + "2";
        }

        return winner;
    }

    function startGame(){
        var counter = time;
        $('#clock').html(counter);
        var interval = setInterval(function() {
            counter--;
            $('#clock').html(counter);
            if (counter == 0) {
                var winner = checkWinner();
                alert(winner);
                clearInterval(interval);
            }
        }, 1000);
    }
});
