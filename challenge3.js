/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Add input field to HTML where players can set the winning score.

if the scores of the active player 
>= input score
then he's the winner


*/
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-new').addEventListener('click', init);

//Roll the Dice! Creates a random dice roll
document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying){
		// Random dice roll
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;  
		// Display the dice image
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		if(dice1 !== 1 && dice2 !==1) {
			//Calculates and displays round score. 
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		// add current score to global score
		scores[activePlayer] += roundScore;
		// update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		var winningScore;
		//Undefined, 0, null, or "" are coerced to false
		
		if(input){
			var winningScore = input;
		} else {
			winningScore = 100;
		}
		//check if player won the game.
		if (scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; 
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

function nextPlayer(){
		// If the active player is player 0, then the active player is player 1, else it's 0
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		//This sets the roundScore to zero and changes the text, as well. 
		roundScore = 0;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		//This code changes the background and boldness from player 0 to player 1.  See HMTL code
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		// If you roll a one, the dice image goes away.
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

function init (){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	//Removes the dice image upon start
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	//Scarts current and total scores at 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
}

//This code changes the background and boldness from player 0 to player 1,
// But is less effective because you'd have to write more code. 
//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');

//Selects specific ID from HTML code, then textContent calls to change text to dice variable. 
//document.querySelector('#current-' + activePlayer).textContent = dice;   

//Another option using innerHTML
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';  

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

