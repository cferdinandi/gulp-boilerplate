
window.addEventListener('dataReady', function (event) {
    console.log(event.detail);
    console.log("Init Data Ready");
    showApp();
}, false);


domready(function () {
    console.log('The DOM is ready!');
    initData();
});

