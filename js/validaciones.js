export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
   //es sobre el div padre no sobre el input por eso se pone parent
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML=''
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML= mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
] 

const mensajesDeError = {//son objetos 
    nombre: {//Objeto
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra miníscula y una mayúscula, un número y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing: "El campo teléfono no puede estar vacío",
        patternMismatch: "Formato requerido es XXXXXXXXXX 10 números",
    },
    direccion:{
        valueMissing: "El campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",        
    },
    provincia: {
        valueMissing: "El campo no puede estar vacío",
        patternMismatch: "La provincia debe contener entre 10 a 40 caracteres",        
    },
}

const validadores = { //es un objeto
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    const fechaNacimiento = new Date (
        fechaCliente.getUTCFullYear(),
        fechaCliente.getUTCMonth(),
        fechaCliente.getUTCDate()
    )
    console.log(fechaNacimiento);
    let mensaje = "";   
    if (!mayorDeEdad(fechaNacimiento)){
        mensaje = "Debes tener al menos 18 años de edad"
    };
    
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
        const fechaActual = new Date();
        const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
   
    console.log(fechaActual)
    console.log(diferenciaFechas)
    return (diferenciaFechas <= fechaActual);
}



    