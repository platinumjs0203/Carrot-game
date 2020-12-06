const field = document.querySelector('.game__field')

function getRandomPosition(element) {
	var x = document.body.offsetHeight-element.clientHeight;
	var y = document.body.offsetWidth-element.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}
window.onload = function() {
    var bug = document.createElement('img');
    var carrot = document.createElement('img');
	bug.setAttribute("style", "position:absolute;");
    bug.setAttribute("src", "img/bug.png");
    
    carrot.setAttribute("src", "img/carrot.png");
	field.appendChild(bug);
	var xy = getRandomPosition(bug);
	bug.style.top = xy[0] + 'px';
    bug.style.left = xy[1] + 'px';
    field.appendChild(carrot);
	var xy = getRandomPosition(carrot);
	carrot.style.top = xy[0] + 'px';
	carrot.style.left = xy[1] + 'px';
}