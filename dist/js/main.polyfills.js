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

var AppData = {};
"use strict";
function renderData() {
    let para = document.createElement("pre");
    para.textContent = AppData.list;
    document.querySelector("#out").appendChild(para);
}

function fetchAndDecode(url, type) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                if (type === "json") {
                    return response.json();
                } else if (type === "text") {
                    return response.text();
                }
            }
        })
        .catch((e) => {
            console.log(`There has been a problem with your fetch operation for resource "${url}": ` + e.message);
        });
}

let page = fetchAndDecode("https://nwp-cgn.de/api/data/?f=app4", "json");
let hsp = fetchAndDecode("https://nwp-cgn.de/api/app/hsp/", "json");
let file = fetchAndDecode("https://nwp-cgn.de/api/app/file/", "json");

const initData = () => {
    Promise.all([hsp, file, page])
        .then((values) => {
            AppData = {};
            let descText = JSON.stringify(values[2], null, 2);
            let h1 = values[0].data1;
            let h2 = values[0].data2;
            let f1 = values[1].data1;
            let f2 = values[1].data2;
            let ic = values[2].icons;
            let ap = values[2].pages;
            AppData.hsp1 = h1;
            AppData.hsp2 = h2;
            AppData.file1 = f1;
            AppData.file2 = f2;
            AppData.icon = ic;
            AppData.app = ap;
            let stat = Object.keys(AppData);
            AppData.list = stat;
            renderData(AppData.list);
        })
        .then(() => {
            let dat = JSON.stringify(AppData);
            localStorage.setItem("nwpAppData", dat);
        })
        .then(() => {
            emitEvent("dataReady", window, {
                dataReadyEv: {
                    AppData: AppData.list,
                },
            });
        });
};

events.on('click', '.click', (function (event) {
    var filling = event.target;
    console.log(filling);
}))



document.addEventListener('click', (function (event) {
    if (!event.target.matches('#click-me')) return;
    alert('You clicked me!');
}), false)




window.addEventListener('dataReady', (function (event) {
    console.log("EventHandler => Data Ready");
    console.log(event.detail);
    setTimeout((function() {
        showApp();
    }), 1000);
    
}), false)

const getStorageProm = new Promise((resolve, reject) => {
    let data;
    if (localStorage.getItem("nwpAppData")) {
        data = localStorage.getItem("nwpAppData");
    } else {
        data = {};
    }
    resolve(data);
})

domready((function () {
    console.log('The DOM is ready!');
    getStorageProm.then(data => {
        console.log("Store Data: true");
        initData();
    }).catch((e) => {
        console.error(e)
    })
    
}))


/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}