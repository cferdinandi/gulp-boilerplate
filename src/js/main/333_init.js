



window.addEventListener('dataReady', function (event) {
    console.log("EventHandler => Data Ready");
    console.log(event.detail);
    setTimeout(function() {
        showApp();
    }, 1000);
    
}, false)

const getStorageProm = new Promise((resolve, reject) => {
    let data;
    if (localStorage.getItem("nwpAppData")) {
        data = localStorage.getItem("nwpAppData");
    } else {
        data = {};
    }
    resolve(data);
})

domready(function () {
    console.log('The DOM is ready!');
    getStorageProm.then(data => {
        console.log("Store Data: true");
        initData();
    }).catch((e) => {
        console.error(e)
    })
    
})

