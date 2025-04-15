// const keyAPI = '905769aa5ca341bfe6854a203c7e245c';

//     const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${keyAPI}`;


//Variables 


const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const container = document.querySelector('.container');


formulario.addEventListener('submit', buscadorClima);


function buscadorClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    //Alerta si ambos camspos se encuentrar bacios
    if(ciudad === '' || pais === ''){
        imprimirAlerta('Ambos campos son obligatorios');
        return;
    }

    //consultar API Clima
    consultarClima(ciudad, pais);

}

function consultarClima(ciudad, pais){

    const KeyAPIClima = '905769aa5ca341bfe6854a203c7e245c';
    //Template String
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${KeyAPIClima}`;  

    limpiarHTML();
    //Respuesta Fetch
    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //Respuesta incorrecta ciudad
            if(resultado.cod === "404"){
                //Mostrar alerta en cado de no encontrar la ciudad
                imprimirAlerta('La ciudad no se pudo encrontar');
                return;
            }
            imprimirSpinner();

            setTimeout(()=>{
                document.querySelector('.spinner').remove();
                mostrarClima(resultado);
            },3000)
        })
}

//Crear el spinner
function imprimirSpinner(){
    const spinner = document.createElement('DIV');
    spinner.classList.add('spinner');
    spinner.classList.add('mx-auto', 'mx-0')
    spinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    `;

    resultado.appendChild(spinner);

}

//Extraer los elementos de de la API
function mostrarClima(temperatura){
    console.log(temperatura);
    const {main: {temp, temp_max, temp_min}} = temperatura;
    //Convertir la temperartura de cada uno de los elementos
    const actual = convertirKelvinCelsius(temp);
    const max = convertirKelvinCelsius(temp_max);
    const min = convertirKelvinCelsius(temp_min);

    //Mostrar dentro del HTML los elementos
    imprimirTemperatura(actual, max, min);
}

//colocar elementos HTMl
function imprimirTemperatura(actual, max, min){

    const tempDiv = document.createElement('DIV');
    tempDiv.classList.add(  'text-white', 'text-center');

    const tempActual = document.createElement('P');
    tempActual.classList.add('font-bold', 'text-6xl');
    tempActual.innerHTML = `
        ${actual}&#176;
    `;

    const tempMax = document.createElement('P');
    tempMax.classList.add('font-bold', 'text-2xl');
    tempMax.innerHTML = `
        Max: ${max}&#176;
    `;

    const tempMin = document.createElement('P');
    tempMin.classList.add('font-bold', 'text-2xl');
    tempMin.innerHTML = `
        Min: ${min}&#176;
    `;

    tempDiv.appendChild(tempActual);
    tempDiv.appendChild(tempMax);
    tempDiv.appendChild(tempMin);
    resultado.appendChild(tempDiv);
}

//Limpiar el primer el mento dentro del campo resultado
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Convertir temperatura de kelvin a celsius
convertirKelvinCelsius = temp => parseInt(temp - 273.15);



function imprimirAlerta(mensaje){
    //Existe alerta 
    const existeAlerta = document.querySelector('.alerta');
    //Si existe la alerta no crea una nueva
    if(!existeAlerta){
        const alerta = document.createElement('DIV');
        alerta.classList.add('max-w-lg', 'mx-auto','mt-4','p-2', 'bg-red-100', 'text-red-400', 'border-red-700', 'text-center','rounded','alerta');

        alerta.innerHTML = `
            <strong>Error!</strong>
            <p>${mensaje}</p>
        `;

        container.appendChild(alerta);

        //Temporizador para remover alerta de HTML
        setTimeout(()=>{
            alerta.remove();
        },3000)
    }

}
