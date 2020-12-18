document.addEventListener('click', function (event) {


	if (!event.target.matches('#click-me')) return;
	alert('You clicked me!');



}, false);


events.on('click', '.click', function (event) {
	var filling = event.target;
	console.log(filling);
});


function fetchAndDecode(url, type) {
	return fetch(url).then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			if (type === 'json') {
				return response.json();
			} else if (type === 'text') {
				return response.text();
			}
		}
	})
		.catch(e => {
			console.log(`There has been a problem with your fetch operation for resource "${url}": ` + e.message);
		});
}


let page = fetchAndDecode("https://nwp-cgn.de/api/data/?f=app4", "json");
let hsp = fetchAndDecode("https://nwp-cgn.de/api/app/hsp/", "json")
let file = fetchAndDecode("https://nwp-cgn.de/api/app/file/", "json")

const initData = () => {

	Promise.all([hsp, file, page]).then(values => {
		console.log(values);
		// Store each value returned from the promises in separate variables; create object URLs from the blobs
		//let objectURL1 = URL.createObjectURL(values[0]);
		//let objectURL2 = URL.createObjectURL(values[1]);
		let descText = JSON.stringify(values[2], null, 2);

		// Display the images in <img> elements
		// let image1 = document.createElement('img');
		// let image2 = document.createElement('img');
		// image1.src = objectURL1;
		// image2.src = objectURL2;
		// document.body.appendChild(image1);
		// document.body.appendChild(image2);

		// Display the text in a paragraph
		let para = document.createElement('pre');
		para.textContent = descText;
		document.querySelector("#out").appendChild(para);

	}).then(() => {
		emitEvent('dataReady', window, {
			greeting: 'DB fetch OK!'
		})
	});
}




