// 1 - Dichiaro const per il pulsante play
const play_btn = document.getElementById('play_btn');

// 2 - Creo funzione per il click del pulsante play
play_btn.addEventListener('click', function(){
    createNewGame();
});

// 4 - Creo funzione per creare singola cella
function createCell(num, cellsPerRow){

    // Creo un div chiamato element
    const element = document.createElement('div');
    // Gli aggiungo la classe square per stilizzarlo
    element.classList.add('square');
    // Stringhe per dimensioni celle
    element.style.width = `calc(100% / ${cellsPerRow})`;
    element.style.height = element.style.width;
    // Gli inserisco del testo che sarà il numero della casella
    element.innerText = num;

    return element;
}

function createNewGame(){
    // 5 - Recupero l'elemento che contiene la griglia
    let grid = document.getElementById('grid');
    
    // Stringa che permette di non replicare la tabella in loop
    document.getElementById("grid").innerHTML = "";
    
    // Stringa per aggiungere classe di margine alla tabella
    grid.classList.add('my_margin');
    
    // 7 - Aggiungo i livelli di difficoltà
    const difficulty = document.getElementById('difficulty');
    const level = parseInt(difficulty.value);

    let cells_number;
    let cells_per_row;

    switch(level){
        case 1:
            cells_number = 100;
            break;
        case 2:
            cells_number = 81;
            break;
        case 3:
            cells_number = 49;
            break;
        default:
            alert('Seleziona prima il livello di difficoltà');
            break;
    }

    cells_per_row = Math.sqrt(cells_number);

    // 6 - Creo ciclo for per creare celle uguali
    for(let i=1; i<=cells_number; i++){
        
        // Creo la cella
        let square = createCell(i, cells_per_row);
    
        // Assegnazione nuova classe al click della casella
        square.addEventListener('click', function(){
            this.classList.toggle('clicked');
            console.log(`Il numero della casella è: ${i+1}`);
        })
    
        // Appendo la cella alla griglia
        grid.appendChild(square);
    }
}
