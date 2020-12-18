events.on('click', '.click', function (event) {
    var filling = event.target;
    console.log(filling);
})



document.addEventListener('click', function (event) {
    if (!event.target.matches('#click-me')) return;
    alert('You clicked me!');
}, false)