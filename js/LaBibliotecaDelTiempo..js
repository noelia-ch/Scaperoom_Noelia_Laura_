
// Variables 
var ojoIzAbierto = false;
var ojoDerAbierto = false;
var faseEscena4 = 0;
var faseEscena5 = 0;
var faseFinalVerdadero = 0;
var pasoOjos = 0;
var tiempoRestante = 180; // segundos del temporizador
var intervaloTimer = null;
var tiempoAgotado = false;



// cambiar de escena


function irA(idEscena) {
    var transicion = document.getElementById('transicion');

    transicion.classList.add('activa');

    setTimeout(function () {

        var todasLasEscenas = document.querySelectorAll('.escena');
        todasLasEscenas.forEach(function (escena) {
            escena.classList.remove('activa');
        });


        document.getElementById(idEscena).classList.add('activa');


        prepararEscena(idEscena);


        setTimeout(function () {
            transicion.classList.remove('activa');
        }, 200);

    }, 800);
}



function prepararEscena(idEscena) {
    if (idEscena === 'escena-2') {
        prepararOscuridad();
    }
    if (idEscena === 'escena-4') {
        faseEscena4 = 0;
        prepararEscena4();
    }
    if (idEscena === 'escena-5') {
        faseEscena5 = 0;
    }
    if (idEscena === 'escena-6') {
        document.getElementById('fondo-escena1').style.backgroundImage = `url('./imagenes/estanteria.jpg')`;
        document.querySelector('.zona-hueco').style.display = 'block';
        document.getElementById('texto-escena6').innerHTML = "Mientras te acercas a la polvorienta estantería, intentas encontrar el lugar en el que colocar el libro. Hay un hueco que llama tu atención...";

    }
    
    if (idEscena === 'escena-titulo') {

        reiniciarJuego();
    }
}



function abrirOjo() {

    pasoOjos++;



    if (pasoOjos === 1) {



        document.getElementById('fondo-escena1').style.backgroundImage = `url('./imagenes/sueñoOjoAbierto.jpeg')`;


    }



    if (pasoOjos === 2) {



        document.getElementById('fondo-escena1').style.backgroundImage = `url('./imagenes/sueñoOjosAbiertos.jpeg')`;


        document.getElementById('pista-escena1').textContent = '';



        document.getElementById('zona-ojos').style.display = 'none';



        setTimeout(function () {

            irA('escena-2');

        }, 1800);

    }

}


function prepararOscuridad() {

    var oscuridad = document.getElementById('oscuridad');
    oscuridad.classList.remove('encendida');


}



function encenderLampara() {
    document.getElementById('oscuridad').classList.add('encendida');

    setTimeout(function () {
        irA('escena-3');
    }, 1800);
}



function prepararEscena4() {
    var dialogo = document.getElementById('dialogo-escena4');

    dialogo.onclick = avanzarEscena4;
}

function avanzarEscena4() {
    faseEscena4++;

    if (faseEscena4 === 1) {

        document.getElementById('texto-escena4').innerHTML =
            '— No tengas miedo, no voy a hacerte daño, ni siquiera puedo tocarte. ' +
            'La materia que formaba mi cuerpo me abandonó hace muchos años. ' +
            'Yo también quedé atrapado aquí, y nunca más pude salir. ' +
            'Puedo ayudarte... no quiero que corras la misma suerte que yo.';
        document.getElementById('pista-escena4').textContent = '';


        document.getElementById('dialogo-escena4').onclick = null;


        var botonesHTML =
            '<div class="botones-eleccion">' +
            '<button class="boton btn-choice boton-miedo" onclick="elegirMiedo()">¡Aléjate de mí!</button>' +
            '<button class="boton btn-choice boton-aceptar" onclick="elegirAceptar()">Claro... quiero salir de aquí.</button>' +
            '</div>';

        document.getElementById('dialogo-escena4').innerHTML += botonesHTML;
    }
}

function elegirMiedo() {
    irA('final-1');
}

function elegirAceptar() {
    irA('escena-5');
}


function avanzarEscena5() {
    faseEscena5++;

    if (faseEscena5 === 1) {
        document.getElementById('texto-escena5').innerHTML =
            '<em>— ¡Vaya!</em>, no esperaba que ese reloj volviera a funcionar, lleva parado desde que me quedé encerrado aquí. ' +
            'En el momento en que se detuvo, no pude volver a encontrar la llave. ' +
            '<em>¡Pase lo que pase, no debes dejar que se acabe tu tiempo!</em><br><br>' +
            'Al recoger el reloj, te fijas en el libro que está a su lado: <em>"En busca del tiempo perdido"</em> de Marcel Proust.';

        document.getElementById('timer').style.display = 'block';
        iniciarTimer();
    } else if (faseEscena5 === 2) {
        document.getElementById('texto-escena5').innerHTML =
            '<em>— Ese libro... ya lo he visto antes.</em> Estoy seguro de que su sitio está en aquella estantería.';
        document.getElementById('pista-escena5').textContent = 'Click para continuar →';
    } else if (faseEscena5 === 3) {
        irA('escena-6');
    }
}


function colocarLibro() {
    document.getElementById('fondo-estanteria').style.backgroundImage = `url('./imagenes/estanteriaLibro.jpeg')`;


    document.querySelector('.zona-hueco').style.display = 'none';


    document.getElementById('texto-escena6').innerHTML = '<em>— ¡Has abierto el pasadizo secreto!</em>';
    document.getElementById('pista-escena6').textContent = 'Click para continuar →';


    document.querySelector('#escena-6 .caja-dialogo').onclick = function () {
        irA('escena-7');
    };
}



function cogerLlave() {

    // Parar el temporizador
    clearInterval(intervaloTimer);
    document.getElementById('timer').style.display = 'none';

    if (tiempoAgotado) {
        // Final rosa marchita
        irA('final-2');
    } else {
        // Final verdadero
        irA('final-verdadero');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var finalVerdadero = document.getElementById('final-verdadero');
    finalVerdadero.addEventListener('click', avanzarFinalVerdadero);
});

function avanzarFinalVerdadero() {
    faseFinalVerdadero++;

    if (faseFinalVerdadero === 1) {
        document.getElementById('texto-final-verdadero').innerHTML =
            '<em>— Parece que después de tantos años por fin soy libre y podré descansar en paz. Gracias.</em><br><br>' +
            'Aprecias un tono de felicidad en la voz cada vez más tenue de tu nuevo amigo, aunque no puedes ver de dónde viene.';
    } else if (faseFinalVerdadero === 2) {
        document.getElementById('texto-final-verdadero').innerHTML =
            'Caminas hacia tu hogar, mientras escuchas el tic-tac de las manecillas del reloj, ' +
            'que ahora se mueven <em>en el sentido en el que siempre debieron hacerlo.</em>';
        document.getElementById('pista-final-verdadero').style.display = 'none';
        document.getElementById('boton-final').style.display = 'block';
    }
}


function iniciarTimer() {

    clearInterval(intervaloTimer);
    tiempoRestante = 180;
    tiempoAgotado = false;

    actualizarDisplayTimer();

    intervaloTimer = setInterval(function () {
        tiempoRestante--;
        actualizarDisplayTimer();

        if (tiempoRestante <= 0) {
            clearInterval(intervaloTimer);
            tiempoAgotado = true;
            document.getElementById('timer-numeros').textContent = '0:00';
        }
    }, 1000);
}

function actualizarDisplayTimer() {
    var minutos = Math.floor(tiempoRestante / 60);
    var segundos = tiempoRestante % 60;
    var texto = minutos + ':' + (segundos < 10 ? '0' : '') + segundos;

    var display = document.getElementById('timer-numeros');
    display.textContent = texto;

    display.classList.remove('aviso', 'peligro');
    if (tiempoRestante <= 30) {
        display.classList.add('peligro');
    } else if (tiempoRestante <= 60) {
        display.classList.add('aviso');
    }
}

//musica 


function reproducirMusica() {

    var musica = document.getElementById('musica-principal');
    if (musica.paused) musica.play();
    else musica.pause();
}


// reiniciar juego(actualizar pagina)

function reiniciarJuego() {
    window.location.reload();
}