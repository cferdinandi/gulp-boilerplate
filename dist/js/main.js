/*! gulp-boiler-3 v0.0.1 | (c) 2020  | MIT License | http://link-to-your-git-repo.com */
const domready = function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);
};

const serialForm = function (form) {
    let arr = [];
    Array.prototype.slice.call(form.elements).forEach((function (field) {
        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
        if (field.type === 'select-multiple') {
            Array.prototype.slice.call(field.options).forEach((function (option) {
                if (!option.selected) return;
                arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(option.value));
            }));
            return;
        }
        if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
        arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
    }));
    return arr.join('&');
};
const emitEvent = function (type, elem, detail) {
    if (!type) return;
    elem = elem || window;
    detail = detail || {};
    let event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail
    });
    elem.dispatchEvent(event);
};

const showApp = () => document.getElementById("app").classList.add("loaded");


// window.addEventListener('myCustomEvent', function (event) {
//     console.log(event.detail);
// }, false);

// emitEvent('myCustomEvent', window, {
//     greeting: 'Hello, world!'
// });




// let form = document.querySelector('#save-me');
// let data = serialForm(form);
// console.log(data);


document.addEventListener('click', (function (event) {


	if (!event.target.matches('#click-me')) return;
	alert('You clicked me!');



}), false);


events.on('click', '.click', (function (event) {
	var filling = event.target;
	console.log(filling);
}));


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






window.addEventListener('dataReady', (function (event) {
    console.log(event.detail);
    console.log("Init Data Ready");
    showApp();
}), false);


domready((function () {
    console.log('The DOM is ready!');
    initData();
}));

