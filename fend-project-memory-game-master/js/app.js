// Udacity Memory Game Project 
// Front End Development Nano-Degree Feb-2019. 


let openCards = []; //Array to hold the two open cards and compare
let matchedCards = 0; // Hold matched pair count , 8 matches completes game
let seconds = 0; // seconds Units
let tseconds = 0; // seconds Tens
let minutes = 0; // minutes Units
let tminutes = 0; // minues Tens
let gameTimer = null; // Hold time take to play

const ulDeck = document.querySelector('ul.deck'); // get the ul Deck
const liCards = document.querySelectorAll('li.card'); // get all the 16 cards li
const divReplay = document.querySelector('.restart'); // get the replay icon
const movesCounter = document.querySelector('.moves'); // get the moves counter
let ulStars = document.querySelector('.stars'); // get the stars
let ilStar = document.createElement('li'); // get the il elements
// set modal display elements below
const spanTimer = document.querySelector('#timer');
const msgModal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modalMessage h2');
const modalButton = document.querySelector('.button');
const modalRating = document.querySelector('.modalStars');

// set variables to store font-awesome icons

ilStarHollow = document.createElement('li');
ilStar.innerHTML = `<i class="fa fa-star"></i>`;
ilStarHollow.innerHTML = `<i class="fa fa-star-o"></i>`;
let starCount = 3;

// Array to hold the 8 pairs of card and then call shuffle function
const cards = [`<i class="fa fa-diamond"></i>`,
    `<i class="fa fa-paper-plane-o"></i>`,
    `<i class="fa fa-anchor"></i>`,
    `<i class="fa fa-bolt"></i>`,
    `<i class="fa fa-cube"></i>`,
    `<i class="fa fa-leaf"></i>`,
    `<i class="fa fa-bicycle"></i>`,
    `<i class="fa fa-bomb"></i>`,
    `<i class="fa fa-diamond"></i>`,
    `<i class="fa fa-paper-plane-o"></i>`,
    `<i class="fa fa-anchor"></i>`,
    `<i class="fa fa-bolt"></i>`,
    `<i class="fa fa-cube"></i>`,
    `<i class="fa fa-leaf"></i>`,
    `<i class="fa fa-bicycle"></i>`,
    `<i class="fa fa-bomb"></i>`
];

// start by laying out the deck and add event listeners
layoutDeck(); // function to layout the deck
addCardListener(); // add event listener on deck Ul for click on il target
addReplayDivListener(); // add event listener for click on restart the game
addModalButtonListener(); // add event listener to OK on modal play again

// WELCOME TO THE GAME message with modal

welcome();

// Lays out the deck of cards and displays the cards for 3 seconds
// before hiding the cards.

function layoutDeck() {
    starCount = 3; // start with 3 stars
    shuffle(cards); // shuffle the deck
    movesCounter.innerText = 0; // zero the move counter
    openDeck(); // open and show all cards for player's memory
    setTimeout(hideDeck, 3000); // hide them after 3 seconds 
}

// Show all the cards after shuffle
function openDeck() {
    for (i = 0; i < 16; i++) {
        liCards[i].innerHTML = cards[i];
        liCards[i].classList.add("show", "open", "match");
    }
}

// Hide the cards by removing appropriate classes

function hideDeck() {
    for (i = 0; i < 16; i++) {
        liCards[i].innerHTML = cards[i]
        liCards[i].classList.remove("show", "open", "match");
    }
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*
Add a listener on Deck. Warn if already open, else show the card.
*/

function addCardListener() {
    for (i = 0; i < 16; i++) {
        liCards[i].addEventListener('click', function(clickC) {
            // console.log("Clicked html: " + clickC.target.innerHTML + "clicked Class:" + clickC.target.classList);
            // console.log(openCards.length);
            if (clickC.target.classList.contains("open") || clickC.target.classList.contains("fa")) {
                alert("The card is already Open ..")
            } else {
                showCard(clickC);
            }
            clickC.preventDefault();
        })
    }
}

/*
Everytime the replay icon is clicked 
call reload() to init reload the game
*/

function addReplayDivListener() {
    divReplay.addEventListener('click', function(e) {
        reloadGame();
        e.preventDefault();
    })
}

/*
Hide the Modal and reload the game.
*/

function addModalButtonListener() {
    modalButton.addEventListener('click', function(e) {
        reloadGame();
        e.preventDefault();
    })
}

/*
Inits everything and reloads the game.
*/

function reloadGame() {
    msgModal.style.display = 'none';
    matchedCards = 0;
    starCount = 3;
    layoutDeck();
    // removeStars(3);
    addStars();
    startTimer('stop');
    startTimer('reset');
    openCards = [];
}

/*
Opens 2 cards at a time and call checkMatch to compare
add open class to clicked.target 
*/

function showCard(card) {
    card.target.classList.add("show", "open");
    openCards.push(card.target);
    // console.log(openCards.length + "in Show");
    if (openCards.length === 2) {
        checkMatch(openCards);
        // console.log(openCards.length + "in Listener")
    };
}

/*
Check if two opened cards match? 
Eight matches is all pairs matched and game complete!
*/

function checkMatch(cards) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        // console.log(openCards);
        // console.log("its a MATCH");
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        countMoves(); // two card opened is one move
        matchedCards += 1; // increment pairs matched by 1 for every match
        if (matchedCards === 8) {
            setTimeout(function() {
                let msg = `You took ${tminutes} min ${seconds} sec and ${movesCounter.innerText} Moves to COMPLETE!`
                let stars = ulStars.innerHTML;
                displayModal(msg, stars);
            }, 1000);
            startTimer('stop');
        }
        openCards = [];
    } else {
        openCards[0].classList.add("show", "open", "noMatch"); // if NO MATCH , Hide the open cards
        openCards[1].classList.add("show", "open", "noMatch"); // 
        // console.log("its not a match!");
        setTimeout(hideOpenCards, 500);
        countMoves();
    }
}

/*
Keep track of moves count and take away one star at 10, 16 and 25th move.
Start the game timer at First Move.
*/

function countMoves() {
    movesCounter.innerText = Number(movesCounter.innerText) + 1;
    // console.log(Number(movesCounter.innerText));
    if (movesCounter.innerText == 1) {
        startTimer('start');
    }

    if ((Number(movesCounter.innerText) === 10) || (Number(movesCounter.innerText) === 16) || (Number(movesCounter.innerText) === 25)) {
        removeStars(movesCounter.innerText);
    }
}

// Hide the two open cards and clear the open card list

function hideOpenCards() {
    openCards[0].classList.remove("show", "open", "noMatch");
    openCards[1].classList.remove("show", "open", "noMatch");
    openCards = [];
}

// add the lost stars back to Scores Panel.

function addStars() {
    ulStars.innerHTML = `
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
            `;
}

/* 
Remove one star at 10th, 16th and 25th move.
Decrement star rating and show modal to restart game if all stars lost.
*/

function removeStars(moves) {
    // ulStars.innerHTML = ``;
    numMoves = Number(moves);
    switch (numMoves) {
        case 10:
            // console.log(`moves ${numMoves}`);
            ulStars.innerHTML = `
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star-o"></i></li>
            `;
            break;
        case 16:
            // console.log(`moves ${numMoves}`);
            ulStars.innerHTML = `
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star-o"></i></li>
                <li><i class="fa fa-star-o"></i></li>
            `;
            break;
        case 25:
            // console.log(`moves ${numMoves}`);
            ulStars.innerHTML = `
                <li><i class="fa fa-star-o"></i></li>
                <li><i class="fa fa-star-o"></i></li>
                <li><i class="fa fa-star-o"></i></li>
            `;
            break;
    }

    starCount -= 1;
    if (starCount === 0) {
        setTimeout(function() {
            let msg = `You lost all STARS! in ${tminutes} min ${seconds} sec and ${movesCounter.innerText} Moves!`;
            let stars = ulStars.innerHTML;
            displayModal(msg, stars);
        }, 1000);
        startTimer('stop');
    }
}


/*
Function to track time.
*/

function timer() {
    seconds += 1;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes += 1;
    }

    if (seconds < 10) {
        tseconds = `0${seconds}`;
    } else {
        tseconds = seconds;
    }

    if (minutes < 10) {
        tminutes = `0${minutes}`;
    } else {
        tminutes = minutes;
    }

    spanTimer.innerText = `${tminutes}:${tseconds}`;

}

/*
Function timer takes start, stop or reset as arguments 
*/

function startTimer(cmd) {
    switch (cmd) {
        case 'start':
            gameTimer = setInterval(timer, 1000);
            break;
        case 'stop':
            clearInterval(gameTimer);
            break;
        case 'reset':
            clearInterval(gameTimer);
            seconds = 0;
            minutes = 0;
            tseconds = `00`;
            tminutes = `00`;
            spanTimer.innerText = `${tminutes}:${tseconds}`;
            break;
    }
}

/*  
Display modal function takes a message with a star rating to display
in the modal. Called when game complete and all stars lost in 25 moves.
*/

function displayModal(msg, stars) {
    message = msg;
    rating = stars;
    modalMessage.innerText = `${message}`;
    modalRating.innerHTML = `${rating}`;
    msgModal.style.display = 'block';

}

function welcome() {
    welcomeMsg = ` WELCOME
    to Memory Matching Game! 
    Memorize the deck before it hides in 3 seconds.
    You WIN when all pairs are matched ..
    and LOSE when all STARS are empty! 
    Loose one star at 10th, 16th
    and 25th move. 
    GOOD LUCK!
    `;
    rating = ulStars.innerHTML;
    displayModal(welcomeMsg, rating);
}