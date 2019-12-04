var tellertop = 1;
var tellermid = 1;
var tellerbot = 1;

var topholder = document.getElementById("top");
topholder.style.backgroundImage = "url(faceparts/top1.jpg)";
var midholder = document.getElementById("mid");
midholder.style.backgroundImage = "url(faceparts/mid1.jpg)";
var botholder = document.getElementById("bot");
botholder.style.backgroundImage = "url(faceparts/bot1.jpg)";

topholder.addEventListener("click", function () {
topholder.style.backgroundImage = "url(faceparts/top"+ nexttop()+".jpg)"
});

midholder.addEventListener("click", function () {
    midholder.style.backgroundImage = "url(faceparts/mid"+ nextmid()+".jpg)"
});

botholder.addEventListener("click", function () {
    botholder.style.backgroundImage = "url(faceparts/bot"+ nextbot()+".jpg)"
});

function nexttop() {
    if (tellertop >=5){
        tellertop = 0;
    }
    tellertop++;
    return tellertop;
}
function nextmid() {
    if (tellermid >=5){
        tellermid = 0;
    }
    tellermid++;
    return tellermid;
}
function nextbot() {
    if (tellerbot >=5){
        tellerbot = 0;
    }
    tellerbot++;
    return tellerbot;
}