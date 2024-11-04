const qteTime = 5000;

const bubl = chrome.runtime.getURL("Imgs/bubble.jpeg");
const cabba = chrome.runtime.getURL("Imgs/Cabb.jpg");
const gogeta = chrome.runtime.getURL("Imgs/saveme.jpg");
const targetImg = chrome.runtime.getURL("Imgs/target.png");
const getta4 = new Audio(chrome.runtime.getURL("SFX/4geta.mp3"));
const fnaf = new Audio(chrome.runtime.getURL("SFX/fnaf.mp3"));
const needthis = new Audio(chrome.runtime.getURL("SFX/needthis.mp3"));
getta4.loop = true;
getta4.volume = 0.1;

let qteTimeout;
let startTime;
const startLeft = 90;
const endLeft = 45;

if (sessionStorage.getItem("helpGogeta") === "yes") {
    console.log('Cabba arrives');
    randomInterval();
}
else if (sessionStorage.getItem("helpGogeta") !== "no") {
    console.log('Cabba solo');
    setTimeout(showIntroOverlay, 50);
}

function showIntroOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "9999";
    overlay.style.color = "white";
    overlay.style.fontSize = "32px";
    overlay.style.textAlign = "center";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.textContent = "QUICK! GOGETA NEEDS YOUR HELP";

    //Button
    const helpBtn = document.createElement("button");
    helpBtn.textContent = "HELP GOGETA";
    helpBtn.style.margin = "20px";
    helpBtn.onclick = () => {
        overlay.remove();
        sessionStorage.setItem("helpGogeta", "yes");
        qte();
    };

    const nahBtn = document.createElement("button");
    nahBtn.textContent = "Nah, CABBA SOLOS";
    nahBtn.style.margin = "20px";
    nahBtn.onclick = () => {
        overlay.remove()
        sessionStorage.setItem("helpGogeta", "no");
    };

    overlay.appendChild(helpBtn);
    overlay.appendChild(nahBtn);
    document.body.appendChild(overlay);
}



function moveCabba(timestamp, cabber) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed/qteTime, 1);
    const currentLeft = startLeft - (startLeft - endLeft) * progress;
    cabber.style.left = `${currentLeft}%`;

    if (progress < 1) {
        requestAnimationFrame((newTimestamp) => moveCabba(newTimestamp, cabber));
    }
}

function qte() {
    startTime = null;
    getta4.play();
    needthis.play();
    const overlay = document.createElement('div');
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.7)";
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);

    //container
    let imgCont = document.createElement('div');
    imgCont.style.position = "fixed";
    imgCont.style.top = "0";
    imgCont.style.left = "0";
    imgCont.style.width = "100%";
    imgCont.style.height = "100%";
    imgCont.style.gap = "20px";
    overlay.appendChild(imgCont);

    //bubble
    const bubble = document.createElement("div");
    bubble.style.position = "relative";
    const bubbleimg = document.createElement("img");
    bubbleimg.src = bubl;
    bubbleimg.style.width = "300px";
    bubbleimg.style.height = "auto";
    bubble.appendChild(bubbleimg);

    //cabba
    const cabber = document.createElement("img");
    cabber.src = cabba;
    cabber.style.width = "200px";
    cabber.style.height = "auto";
    cabber.style.position = "absolute";
    cabber.style.left = "90%px";
    cabber.style.bottom = "10px";
    imgCont.appendChild(cabber);

    //gogeta
    const g4 = document.createElement("img");
    g4.src = gogeta;
    g4.style.width = "400px";
    g4.style.height = "auto";
    g4.style.position = "absolute";
    g4.style.right = "850px";
    g4.style.bottom = "10px";
    imgCont.appendChild(g4);

    requestAnimationFrame((newTimestamp) => moveCabba(newTimestamp, cabber));

    //SAVEME
    const bubbleText = document.createElement("div");
    bubbleText.textContent = "PLEASE CABBA I NEED THIS";
    bubbleText.style.position = "absolute";
    bubbleText.style.top = "20%";
    bubbleText.style.left = "35%";
    bubbleText.style.color = "black";
    bubbleText.style.fontSize = "32px";
    bubbleText.style.fontWeight = "bold";
    bubbleText.style.textAlign = "center";
    bubbleText.style.width = "100px";
    bubbleText.style.zIndex = "9999";
    bubble.appendChild(bubbleText);

    bubble.style.position = "absolute";
    bubble.style.bottom = "370px";
    bubble.style.left = "50%";
    bubble.style.transform = "translateX(-50%)";
    overlay.appendChild(bubble);

    //Circle
    function target() {
        const target = document.createElement("img");
        target.src = targetImg;
        target.style.position = "absolute";
        target.style.width = "100px";
        target.style.height = "auto";
        target.style.cursor = "pointer";

        //Position
        const randomX = Math.floor(Math.random() * (window.innerWidth - 50));
        const randomY = Math.floor(Math.random() * (window.innerHeight - 50));
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;

        //Success
        target.addEventListener("click", () => {
            target.remove();
            getta4.pause();
            getta4.currentTime = 0;
            needthis.pause();
            needthis.currentTime = 0;
            fnaf.play();
            alert("THANKS FOR SAVING ME BACK THERE");
            fnaf.pause();
            fnaf.currentTime = 0;
            clearTimeout(qteTimeout);
            overlay.remove();
            randomInterval();
        });

        overlay.appendChild(target);

        //Failure
        qteTimeout = setTimeout(() => {
            target.remove();
            getta4.pause();
            needthis.pause();
            needthis.currentTime = 0;
            getta4.currentTime = 0;
            overlay.innerHTML = "";
            overlay.style.backgroundColor = "rgba(0,0,0,0.7)";
            const failureMessage = document.createElement("div");
            failureMessage.textContent = "NO CABBA PLEASE SPARE ME";
            failureMessage.style.position = "fixed";
            failureMessage.style.top = "50%";
            failureMessage.style.left = "50%";
            failureMessage.style.transform = "translate(-50%, -50%)";
            failureMessage.style.fontSize = "16px";
            overlay.appendChild(failureMessage);


            //Response
            overlay.addEventListener("click", () => {
                overlay.remove();
                randomInterval();
            });

        }, qteTime);
    }

    target();
    }
    function randomInterval() {
        const minInt = 1*60*1000;
        const maxInt = 5*60*1000;
        const randInt = Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
        console.log('Cabba leaves for now');

        setTimeout(qte, randInt);
}
