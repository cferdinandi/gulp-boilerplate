"use strict";
function renderData() {
    let para = document.createElement("pre");
    para.textContent = AppData.list;
    document.querySelector("#view").appendChild(para);
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
