// =====================================================
// LA BIBLIOTECA DEL TIEMPO - Lógica del juego
// =====================================================

// Variables globales del juego
var ojoIzAbierto = false;
var ojoDerAbierto = false;
var faseEscena4 = 0;
var faseEscena5 = 0;
var faseFinalVerdadero = 0;

var tiempoRestante = 180; // 3 minutos en segundos
var intervaloTimer = null;
var tiempoAgotado = false;


// =====================================================
// FUNCIÓN PRINCIPAL: cambiar de escena
// =====================================================

function irA(idEscena) {
    var transicion = document.getElementById('transicion');

    // Fade a negro
    transicion.classList.add('activa');

    // Después del fade, cambiar escena
    setTimeout(function() {
        // Ocultar todas las escenas
        var todasLasEscenas = document.querySelectorAll('.escena');
        todasLasEscenas.forEach(function(escena) {
            escena.classList.remove('activa');
        });

        // Mostrar la escena destino
        document.getElementById(idEscena).classList.add('activa');

        // Preparar la escena que se va a mostrar
        prepararEscena(idEscena);

        // Quitar el fade
        setTimeout(function() {
            transicion.classList.remove('activa');
        }, 200);

    }, 800);
}


// =====================================================
// PREPARACIÓN DE CADA ESCENA al entrar en ella
// =====================================================

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
        // Restaurar el fondo por si se reinicia
        document.getElementById('fondo-estanteria').style.backgroundImage = "url('estanteria.jpg')";
        document.querySelector('.zona-hueco').style.display = 'block';
        document.getElementById('texto-escena6').innerHTML = "Mientras te acercas a la polvorienta estantería, intentas encontrar el lugar en el que colocar el libro. Hay un hueco que llama tu atención...";
        
    }
    if (idEscena === 'escena-7') {
        iniciarTimer();
    }
    if (idEscena === 'escena-titulo') {
        // Resetear el juego al volver al título
        resetearJuego();
    }
}


// =====================================================
// ESCENA 1 - ABRIR LOS OJOS
// =====================================================

var pasoOjos = 0;



function abrirOjo() {

    pasoOjos++;



    if (pasoOjos === 1) {

        // Cambiar fondo a imagen con un ojo abierto

        document.getElementById('fondo-escena1').style.backgroundImage = "url('sueñoOjoAbierto.jpeg')";


    }



    if (pasoOjos === 2) {

        // Cambiar fondo a imagen con los dos ojos abiertos

        document.getElementById('fondo-escena1').style.backgroundImage = "url('sueñoOjosAbiertos.jpeg')";


        document.getElementById('pista-escena1').textContent = '';

        // Ocultar la zona clickable para que no se pueda volver a pulsar

        document.getElementById('zona-ojos').style.display = 'none';

        // Esperar un momento y pasar a la siguiente escena

        setTimeout(function() {

            irA('escena-2');

        }, 1800);

    }

}


// =====================================================
// ESCENA 2 - LÁMPARA Y OSCURIDAD
// =====================================================

function prepararOscuridad() {
    // Resetear la oscuridad
    var oscuridad = document.getElementById('oscuridad');
    oscuridad.classList.remove('encendida');

    // Mover la linterna con el ratón
    document.getElementById('escena-2').addEventListener('mousemove', moverLinterna);
}

function moverLinterna(evento) {
    var linterna = document.getElementById('linterna');
    linterna.style.left = evento.clientX + 'px';
    linterna.style.top = evento.clientY + 'px';
}

function encenderLampara() {
    document.getElementById('oscuridad').classList.add('encendida');
    // Esperar a que se vea la biblioteca iluminada y pasar
    setTimeout(function() {
        irA('escena-3');
    }, 1800);
}


// =====================================================
// ESCENA 4 - DIÁLOGO CON EL FANTASMA
// =====================================================

function prepararEscena4() {
    var dialogo = document.getElementById('dialogo-escena4');
    // Añadir evento de click al diálogo para la primera fase
    dialogo.onclick = avanzarEscena4;
}

function avanzarEscena4() {
    faseEscena4++;

    if (faseEscena4 === 1) {
        // Segundo mensaje del fantasma
        document.getElementById('texto-escena4').innerHTML =
            '<em>— No tengas miedo, no voy a hacerte daño, ni siquiera puedo tocarte.</em> ' +
            'La materia que formaba mi cuerpo me abandonó hace muchos años. ' +
            'Yo también quedé atrapado aquí, y nunca más pude salir. ' +
            'Puedo ayudarte... no quiero que corras la misma suerte que yo.';
        document.getElementById('pista-escena4').textContent = '';

        // Quitar el click del diálogo y mostrar botones de elección
        document.getElementById('dialogo-escena4').onclick = null;

        // Crear los botones de elección
        var botonesHTML =
            '<div class="botones-eleccion">' +
                '<button class="boton btn-choice boton-miedo" onclick="elegirMiedo()">¡Aléjate de mí!</button>' +
                '<button class="boton btn-choice boton-aceptar" onclick="elegirAceptar()">Claro... quiero salir de aquí.</button>' +
            '</div>';

        document.getElementById('dialogo-escena4').innerHTML +=  botonesHTML;
    }
}

function elegirMiedo() {
    irA('final-1');
}

function elegirAceptar() {
    irA('escena-5');
}


// =====================================================
// ESCENA 5 - EL RELOJ (3 fases de diálogo)
// =====================================================

function avanzarEscena5() {
    faseEscena5++;

    if (faseEscena5 === 1) {
        document.getElementById('texto-escena5').innerHTML =
            '<em>— ¡Vaya!</em>, no esperaba que ese reloj volviera a funcionar, lleva parado desde que me quedé encerrado aquí. ' +
            'En el momento en que se detuvo, no pude volver a encontrar la llave. ' +
            '<em>¡Pase lo que pase, no debes dejar que se acabe tu tiempo!</em><br><br>' +
            'Al recoger el reloj, te fijas en el libro que está a su lado: <em>"En busca del tiempo perdido"</em> de Marcel Proust.';
        // Mostrar el timer
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


// =====================================================
// ESCENA 6 - COLOCAR EL LIBRO
// =====================================================

function colocarLibro() {
    // Cambiar imagen a la estantería con el libro colocado
    document.getElementById('fondo-estanteria').style.backgroundImage = "url('estanteriaLibro.jpeg')";

    // Ocultar el punto clickable
    document.querySelector('.zona-hueco').style.display = 'none';

    // Cambiar el texto
    document.getElementById('texto-escena6').innerHTML = '<em>— ¡Has abierto el pasadizo secreto!</em>';
    document.getElementById('pista-escena6').textContent = 'Click para continuar →';

    // Hacer que el click en el diálogo lleve a escena 7
    document.querySelector('#escena-6 .caja-dialogo').onclick = function() {
        irA('escena-7');
    };
}


// =====================================================
// ESCENA 7 - COGER LA LLAVE
// =====================================================

function cogerLlave() {
     
    // Parar el timer
    clearInterval(intervaloTimer);
    document.getElementById('timer').style.display = 'none';

    if (tiempoAgotado) {
        // Final malo: se acabó el tiempo
        irA('final-2');
    } else {
        // Final verdadero: llegó a tiempo
        irA('final-verdadero');
    }
}


// =====================================================
// FINAL VERDADERO - 3 bloques de texto
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
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


// =====================================================
// TIMER - Cuenta atrás
// =====================================================

function iniciarTimer() {
    // Limpiar timer anterior si existe
    clearInterval(intervaloTimer);
    tiempoRestante = 180;
    tiempoAgotado = false;

    actualizarDisplayTimer();

    intervaloTimer = setInterval(function() {
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

    // Cambiar color según el tiempo
    display.classList.remove('aviso', 'peligro');
    if (tiempoRestante <= 30) {
        display.classList.add('peligro');
    } else if (tiempoRestante <= 60) {
        display.classList.add('aviso');
    }
}


// =====================================================
// RESETEAR EL JUEGO (al volver al título)
// =====================================================

function reiniciarJuego() {
    window.location.reload(); 
}