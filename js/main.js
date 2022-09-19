let droppable_elements = document.querySelector('.droppable-elements');
let draggable_elements = document.querySelector('.draggable-elements');

//Audio App

let audio = async (animal) => {
    let animal_audio = await new Howl({
        src: [`../public/sound/${animal}.mp3`],
        volume: 0.8,
        html5: true
    });

    animal_audio.play();
}

let animales = [
    'vaca',
    'perro',
    'burro',
    'caballo',
    'gallina',
    'oveja',
    'pollo'
];

animales.forEach(animal => {
    draggable_elements.innerHTML += `
        <div class="imagen_app">
            <img class="image" draggable="true" src="./public/img/${animal}.PNG" id="${animal}" alt="${animal}" />
        </div>
    `;
});

animales_aleatorios = animales.sort(() => Math.random() - 0.5);

//console.log(animales_aleatorios);

animales_aleatorios.forEach(item => {
    //console.log(item);
    droppable_elements.innerHTML += `
        <div class="names">
            <p>${item}</p>
        </div>
    `;
});

//Implementacion de drag and drop
let animales_granja = document.querySelectorAll('.image');

//Convertir de Nodelist a Arreglo
animales_granja = [...animales_granja]

animales_granja.forEach(animal => {
    animal.addEventListener('dragstart', event => {
        //console.log('dragstart');
        event.dataTransfer.setData('datos', event.target.id)
    });
});

let nombres_animales = document.querySelectorAll('.names');
nombres_animales = [...nombres_animales];

nombres_animales.forEach(nombre => {
    nombre.addEventListener('dragover', event => {
        event.preventDefault()
        //console.log('dragstart');
    });

    nombre.addEventListener('drop', event => {
        const draggable_dato = event.dataTransfer.getData('datos');
        let animalID = document.querySelector(`#${draggable_dato}`);

        if (draggable_dato == event.target.innerText) {
            //Eliminar etiquetas HTML
            event.target.innerHTML = '';

            event.target.appendChild(animalID);

            audio(draggable_dato);
        }


    });
});
