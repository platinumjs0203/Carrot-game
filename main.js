'use strict';

const CARROT_SIZE = 80
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 20;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameStart = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__time');
const gameScore = document.querySelector('.game__score')
const gamePopup = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__text');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
let started = false;
let score = 0;
let time = undefined;

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
	
	if(!started){
		return;
	}
	const target = event.target;
	if(target.matches('.carrot')) {
		target.remove();
		score++;
		playSound(carrotSound);
		updateScoreBoard();
		if(score === CARROT_COUNT) {
			finishGame(true);
			
		}
	} else if(target.matches('.bug')){
		
		finishGame(false);
	}
}

function stopSound(sound){
	sound.pause();
}

function playSound(sound){
	sound.currentTime = 0;
	sound.play();
}

function startGame(){
	started = true;
	init();
	showStopBtn();
	showTimerScore();
	playSound(bgSound);
}

function stopGame(){
	started = false;
	showPlayBtn();
	stopPlz();
	showPopUpWithText('Replay?');
	playSound(alertSound);
	stopSound(bgSound);
}

function finishGame(win) {
	started = false;
	showTimerScore();
	if(win) {
		playSound(winSound);
	} else {
		playSound(bugSound);
	}
	stopPlz();
	stopSound(bgSound);
	showPopUpWithText(win? 'YOU WON' : 'YOU LOST');
}

function updateScoreBoard() {
	gameScore.innerText = CARROT_COUNT - score;
}

gameStart.addEventListener('click', ()=>{
	if(started) {
		stopGame();
	} else {
		startGame();
	}
	timer();
});


function showStopBtn(){
	const icon = gameStart.querySelector('.fas');
	icon.classList.add('fa-stop');
	icon.classList.remove('fa-play');
	gameStart.style.visibility = 'visible';
}


function showTimerScore(){
	gameTimer.style.visibility = 'visible';
	gameScore.style.visibility = 'visible';
}



function stopPlz(){
	clearInterval(time)
}

function showPlayBtn(){
	const playIcon = gameStart.querySelector('.fa-stop');
	playIcon.classList.add('fa-play');
	playIcon.classList.remove('fa-stop');
	gameStart.style.visibility = 'hidden';
}

function addItem(className, count, imgPath) {
	const x1 = 0;
	const y1 = 0; // 0.0 잡아줌
	const x2 = fieldRect.width - CARROT_SIZE;
	const y2 = fieldRect.height - CARROT_SIZE;
	for (let i = 0; i < count; i++) {
		const item = document.createElement('img');
		item.setAttribute('class', className);
		item.setAttribute('src', imgPath);
		item.style.position = 'absolute';
		const x = randomNumber(x1, x2);
		const y = randomNumber(y1, y2);
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);
	}
}

function randomNumber(min, max){
	return Math.random() * (max - min) + min;
}


function timer(){
	let timeLeft = GAME_DURATION_SEC;
	updateTimerText(timeLeft);
	time = setInterval(()=>{
		if (timeLeft <= 0) {
			clearInterval(time);
			finishGame(CARROT_COUNT === score);
			return;
		} 
		updateTimerText(--timeLeft);
	
		
	}, 1000);

}
function updateTimerText(timeA) {
	const m = Math.floor(timeA/60);
	const s = timeA % 60;
	gameTimer.innerText = `${m}:${s}`
}

function showPopUpWithText(text) {
	popUpText.innerText = text;
	gamePopup.classList.remove('pop-up--hide')
}

function init(){
	score = 0;
	field.innerHTML = '';
	gameScore.innerHTML = CARROT_COUNT; 
	addItem('carrot', CARROT_COUNT, 'img/carrot.png');
	addItem('bug', BUG_COUNT, 'img/bug.png');
}

popUpRefresh.addEventListener('click', ()=>{
	gamePopup.classList.add('pop-up--hide');
	gameStart.style.visibility = 'visible';
	startGame();
	init();
	timer();
});


