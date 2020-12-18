/*! gulp-boiler-3 v0.0.1 | (c) 2020  | MIT License | http://link-to-your-git-repo.com */
document.addEventListener('click', (function (event) {


	if (!event.target.matches('#click-me')) return;
	alert('You clicked me!');






}), false);


events.on('click', '.click', (function (event) {
	var filling = event.target;
	console.log(filling);
}));