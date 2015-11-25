/**
 * Logica del joc
 */
$( document ).ready(function() {

    // VARIABLES
    // Temps de duració de la partida
    var time = 40;
    var interval;
    var punts1 = 0;
    var punts2 = 0;
    var current_1 = 0;
    var current_2 = 0;
    var tecles_jug1 = [38, 37, 40];
    var tecles_jug2 = [65, 87, 39];
    var circleColor = "#29a1ee";
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
     * [paintCircle description]
     * @param  {[type]} keyCode [description]
     * @return {[type]}         [description]
     */
    function paintCircle(keyCode, color){
        var el = getElementByDataAttrAndValue('keycode', keyCode);
        el.css('background-color', color);
    }

    /**
     * Mostra per consola la tecla que s'esta disparant amb l'event
     * @param  Integer keyCode Numero ASCII de la tecla pressionada
     */
    function doKeyAction(keyCode) {
        switch(keyCode) {
            // Start game
            case 32:
                console.log("START GAME!!!");
                startGame();
                break;

            // Jugador 1
            case 37:
            case 38:
            case 40:
                checkPoint(1, keyCode);
                console.log("Jugador 1");
                break;

            // Jugador 2
            case 65:
            case 39:
            case 87:
                checkPoint(2, keyCode);
                console.log("Jugador 2");
                break;
        }
    }

    function plusPointToPlayer(jugador) {
        if(jugador === 1){
            punts1++;
            $('#punts-1').html(punts1);
        } else {
            punts2++;
            $('#punts-2').html(punts2);
        }
    }

    /**
     * [checkPoint description]
     * @param  {[type]} jugador [description]
     * @param  {[type]} keyCode [description]
     * @return {[type]}         [description]
     */
    function checkPoint(jugador, keyCode) {
        if(jugador === 1){
            if(keyCode === current_1) {
                plusPointToPlayer(jugador);
                randomCircle(jugador);
            }
        } else {
            if(keyCode === current_2) {
                plusPointToPlayer(jugador);
                randomCircle(jugador);
            }
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

    function randomCircle(jugador) {
        var random = 0;
        if(jugador === 1) {
            paintCircle(current_1, '#fff');
            random = tecles_jug1[Math.floor(Math.random() * tecles_jug1.length)];
            while(random == current_1) {
                random = tecles_jug1[Math.floor(Math.random() * tecles_jug1.length)];
            }
            current_1 = random;
        } else {
            paintCircle(current_2, '#fff');
            random = tecles_jug2[Math.floor(Math.random() * tecles_jug2.length)];
            while(random == current_2) {
                random = tecles_jug2[Math.floor(Math.random() * tecles_jug2.length)];
            }
            current_2 = random;
        }

        paintCircle(random, circleColor);
    }

    function startGame(){
        resetGame();
        var counter = time;
        $('#clock').html(counter);
        randomCircle(1);
        randomCircle(2);
        interval = setInterval(function() {
            counter--;
            $('#clock').html(counter);
            if (counter == 0) {
                var winner = checkWinner();
                alert(winner);
                clearInterval(interval);
            }
        }, 1000);
    }

    function resetGame(){
        clearInterval(interval);
        punts1 = 0;
        punts2 = 0;
        current_1 = 0;
        current_2 = 0;
        $('#punts-1').html(punts1);
        $('#punts-2').html(punts2);
        element = $("html").find("[data-keycode]");
        element.css('background-color', "#fff");
        element="";
    }
});
