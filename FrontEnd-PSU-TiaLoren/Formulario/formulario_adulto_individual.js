const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const selects = document.querySelectorAll('#formulario select');
const calendar = document.querySelectorAll('#formulario input[type="date"]');

const expresiones = {
    // usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    // password: /^.{4,12}$/, // 4 a 12 dígitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/, // 10 numeros.
    identificacion: /^\d{7,10}$/,
    direccion: /^.{1,40}$/
}

const campos = {
    nrodocumento: false,
    nombre: false,
    fecha_nacimiento: false,
    celular: false,
    direccion: false,
    correo: false,
    politica: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "numero_documento":
            validarCampo(expresiones.identificacion, e.target, 'nrodocumento');
            break;
        case "nombre_titular":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "fecha_nacimiento":
            validarFechaNacimiento(e.target);
            break;
        case "celular_titular":
            validarCampo(expresiones.telefono, e.target, 'celular');
            break;
        case "direccion_titular":
            validarCampo(expresiones.direccion, e.target, 'direccion');
            break;
        case "correo_titular":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
    }
}

const validarCheckbox = () => {
    const aceptar = document.getElementById('aceptar_politica');
    const campo = 'politica';

    if (aceptar.checked) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        // const icono = document.querySelector(`#grupo__${campo} .formulario__validacion-estado`);
        // icono.outerHTML = '<i class="formulario__validacion-estado material-symbols-outlined">check_circle</i>';
        // document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        // const icono = document.querySelector(`#grupo__${campo} .formulario__validacion-estado`);
        // icono.outerHTML = '<i class="formulario__validacion-estado material-symbols-outlined">cancel</i>';
        // document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        const icono = document.querySelector(`#grupo__${campo} .formulario__validacion-estado`);
        icono.outerHTML = '<i class="formulario__validacion-estado material-symbols-outlined">check_circle</i>';
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        const icono = document.querySelector(`#grupo__${campo} .formulario__validacion-estado`);
        icono.outerHTML = '<i class="formulario__validacion-estado material-symbols-outlined">cancel</i>';
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarFechaNacimiento = (input) => {
    const fechaIngresada = new Date(input.value);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Asegura que la comparación se haga solo con la fecha, sin considerar la hora.

    // Calcula la edad de la persona
    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear();
    const mes = fechaActual.getMonth() - fechaIngresada.getMonth();

    // Ajusta la edad si el mes actual es menor al mes de nacimiento o si es el mismo mes pero el día aún no ha llegado
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaIngresada.getDate())) {
        edad--;
    }

    // Verifica si la persona tiene al menos 18 años
    if (edad >= 18) {
        document.getElementById(`grupo__fechanacimiento`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__fechanacimiento`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__fechanacimiento .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['fecha_nacimiento'] = true;
    } else {
        document.getElementById(`grupo__fechanacimiento`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__fechanacimiento`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__fechanacimiento .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['fecha_nacimiento'] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

calendar.forEach((calendar) => {
    calendar.addEventListener('change', validarFormulario);
});


document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const btnAgregarGrupo = document.querySelector(".formulario__btn-enviar");
    // const btnEnviar = document.querySelector(".formulario__btn-enviar");
    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector(".modal-content");
    const closeModal = document.querySelector(".modal .close");

    // Función para mostrar el modal de éxito
    function mostrarModalExito(mensaje) {
        document.getElementById("modal-message").innerText = mensaje;
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
        }, 3000);
    }

    // Cerrar el modal cuando se hace clic en la "X" o fuera del modal
    closeModal.onclick = () => {
        modal.style.display = "none";
    };
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Evento para el botón "Agregar grupo familiar"
    btnAgregarGrupo.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el envío del formulario directamente
        validarCheckbox();

        if (campos.nrodocumento && campos.nombre && campos.celular && campos.direccion && campos.correo && campos.fecha_nacimiento && campos.politica) {
            const datosFormulario = obtenerDatosFormulario(); // Obtener todos los datos del formulario
            enviarDatos(datosFormulario); // Envía los datos al servidor


            formulario.reset(); // Resetea el formulario
            ocultarValidaciones();
            mostrarModalExito("Formulario enviado exitosamente!");

            setTimeout(() => {
                //window.location.href = "registro-adicional.html"; // Redirige después del éxito
            }, 3000);
        } else {
            mostrarMensajeError();
        }
    });

    // Evento para el botón "Enviar"
    // btnEnviar.addEventListener("click", (e) => {
    //     e.preventDefault(); // Evita el envío del formulario directamente
    //     validarCheckbox();

    //     if (campos.nrodocumento && campos.nombre && campos.celular && campos.direccion && campos.correo && campos.fecha_nacimiento && campos.politica) {
    //         const datosFormulario = obtenerDatosFormulario(); // Obtener todos los datos del formularios
    //         enviarDatos(datosFormulario);
    //         mostrarModalExito("Formulario enviado exitosamente!");
    //         formulario.reset(); // Resetea el formulario
    //         ocultarValidaciones();
    //     } else {
    //         mostrarMensajeError();
    //     }
    // });

    function ocultarValidaciones() {
        const grupos = formulario.querySelectorAll(".formulario__grupo");
        grupos.forEach((grupo) => {
            grupo.classList.remove("formulario__grupo-correcto", "formulario__grupo-incorrecto");
        });

        // Remueve los íconos de validación
        const iconos = formulario.querySelectorAll(".formulario__validacion-estado");
        iconos.forEach((icono) => {
            icono.style.display = "none"; // Oculta los íconos
        });

        // Restablece el estado de los campos
        for (const campo in campos) {
            campos[campo] = false;
        }
    }
});


// Función para capturar todos los datos del formulario
function obtenerDatosFormulario() {
    const datos = {};
    const inputs = document.querySelectorAll("#formulario input");
    const selects = document.querySelectorAll("#formulario select");

    inputs.forEach((input) => {
        if (input.type === "checkbox") {
            datos[input.name] = input.checked; // Guarda true o false
        } else {
            datos[input.name] = input.value; // Guarda el valor del input
        }
    });

    selects.forEach((select) => {
        datos[select.name] = select.value; // Guarda el valor seleccionado
    });

    console.log("Datos del formulario:", datos);

    return datos;
}

// Función para enviar los datos al servidor
function enviarDatos(datosFormulario) {
    /*fetch("/ruta_del_servidor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosFormulario),
    })
        .then((response) => response.json())
        .then((data) => console.log("Datos guardados en el servidor:", data))
        .catch((error) => console.error("Error:", error));*/
}

// Función para mostrar mensaje de error
function mostrarMensajeError() {
    const mensajeError = document.getElementById("formulario__mensaje");
    mensajeError.classList.add("formulario__mensaje-activo");

    setTimeout(() => {
        mensajeError.classList.remove("formulario__mensaje-activo");
    }, 3000);
}


// Modal de Política de Tratamiento de Datos
const modal = document.getElementById('modalPolitica');
const politicaLink = document.getElementById('politicaLink');
const closeModal = document.querySelector('.modal .close');

politicaLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('ciudad').addEventListener('change', function () {
    const grupoLocalidad = document.getElementById('grupo__localidad');
    if (this.value === 'bogota') {
        grupoLocalidad.style.display = 'block';
    } else {
        grupoLocalidad.style.display = 'none';
    }
});





