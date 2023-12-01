// 8 - Creo la funzione che mi genera numeri casuali
function generateUniqueRandomNumber(array_bombs, total_cells){

    let check_number = false;
    let randomInt;

    while(!check_number){
        randomInt = Math.floor(Math.random() * total_cells + 1);
        
        if(!array_bombs.includes(randomInt)){
            check_number = true;
        }
    }
    
    return randomInt;
}

// 9 - Creo l'array di numeri casuali
function generateBombsList(number_of_bombs, total_cells){
    let bombs = [];

    for (let i=0; i<number_of_bombs; i++){
        let bomb_number = generateUniqueRandomNumber(bombs, total_cells);
        bombs.push(bomb_number);
    }
    console.log(bombs);
    return bombs;
}

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

    const NUMBER_OF_BOMBS = 16;
    let points = 0;


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

    let gameOver = false;

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

    const bombs = generateBombsList(NUMBER_OF_BOMBS, cells_number);

    // 6 - Creo ciclo for per creare celle uguali
    for(let i=1; i<=cells_number; i++){

        // Creo la cella
        let square = createCell(i, cells_per_row);
    
        // Assegnazione nuova classe al click della casella
        square.addEventListener('click', function(){
            if(!gameOver){

                if (!bombs.includes(i)) {
                    // if che permette di non aggiungere punteggio se la casella è già clickata
                    if(!this.classList.contains('clicked')){
                        this.classList.add('clicked');
                        points++;
                        document.getElementById('score').innerText = `Il tuo punteggio è pari a: ${points} punti`;
                    }
                } 
                else {
                    // Ciclo for che consente la visualizzazione di tutte le caselle rosse appena si clicka una bomba
                    // Se l'elemento ciclato è presente nell'array delle bombe, aggiungo la classe clicked bomb
                    const squares = document.querySelectorAll('.square');
                    for(let i=0; i<squares.length; i++){
                        // Verifico se l'elemento ciclato è presente nell'array delle bombe
                        if(bombs.includes(parseInt(squares[i].innerText))){
                            squares[i].classList.add('clicked-bomb');
                        }
                    }

                    this.classList.add('clicked-bomb');
                    gameOver = true;
                }
                console.log(`Il numero della casella è: ${i}`);
            }
        })
        
        // Appendo la cella alla griglia
        grid.appendChild(square);
    }
}
