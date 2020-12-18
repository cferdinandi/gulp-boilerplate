const domready = function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);
};

const serialForm = function (form) {
    let arr = [];
    Array.prototype.slice.call(form.elements).forEach(function (field) {
        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
        if (field.type === 'select-multiple') {
            Array.prototype.slice.call(field.options).forEach(function (option) {
                if (!option.selected) return;
                arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(option.value));
            });
            return;
        }
        if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
        arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
    });
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

