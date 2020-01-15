var allefotos = [18];
var aantalkliks = 0;
var nietgevondenfotos = [];
var punten1 = 0;
var punten2 = 0;
var foto1;
var foto2;
var nummer1;
var nummer2;
var beurt = 0;
var x = 1;
for (var i = 0; i < 18; i++) {
    if (x > 9) {
        x = 1;
    }
    allefotos[i] = new Image(300, 300);
    allefotos[i].src = "../Hoofdstuk5/vogelbekdieren300,300/vogelbekdier" + x + ".jpg";
    allefotos[i].id = i + 1;
    x++;
}
console.log(allefotos);


document.getElementById("knop").addEventListener("click", function () {
    volgende();
})
document.getElementById("knop").style.visibility = "hidden";
document.getElementById("beurt").innerText = "Speler 1 is aan de beurt"

createpictureholders();


function laatfotozien(id) {

    if (aantalkliks <= 1) {
        console.log("dit is nummer " + id);
        console.log("aantal keer geklikt = " + aantalkliks);
        var selectie = document.getElementById(id);
        selectie.style.opacity = "1";
    }
    if (aantalkliks == 0) {
        foto1 = selectie;
        nummer1 = foto1.id;
    }
    if (aantalkliks == 1) {
        document.getElementById("knop").style.visibility = "visible";
        foto2 = selectie;
        nummer2 = foto2.id;
    }
    aantalkliks++;
}

function createpictureholders() {
    shuffle(allefotos);
    for (var i = 0; i < 18; i++) {
        pictureholder = document.createElement("div");
        pictureholder.className = "picture-holder";
        pictureholder.id = "picture-holder-" + i;
        fotos.appendChild(pictureholder);
        pictureholder.appendChild(allefotos[i]);
        allefotos[i].addEventListener("click", function () {
            laatfotozien(this.id);
        });
        nietgevondenfotos[i] = allefotos[i];
        nietgevondenfotos[i].style.opacity = "0.01";
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function volgende() {
    aantalkliks = 0;

    if ((parseInt(nummer1) + 9) == parseInt(nummer2) || (parseInt(nummer2) + 9) == parseInt(nummer1)) {
        console.log("gevonden!");
        nietgevondenfotos.splice(nietgevondenfotos.indexOf(foto1), 1);
        nietgevondenfotos.splice(nietgevondenfotos.indexOf(foto2), 1);
        if (beurt == 0) {
            punten1++
            document.getElementById("punten1").innerText = punten1 + " aantal punten";
        }
        if (beurt == 1) {
            punten2++
            document.getElementById("punten2").innerText = punten2 + " aantal punten";
        }
    }
    else {
        wisselbeurt();
    }

    for (var i = 0; i < nietgevondenfotos.length; i++) {
        nietgevondenfotos[i].style.opacity = "0.01";

    }
    console.log(beurt);
    document.getElementById("knop").style.visibility = "hidden";
}

function wisselbeurt() {
    if (beurt == 0){
        beurt++
        document.getElementById("beurt").innerText = "Speler 2 is aan de beurt";

    }
    else {
        beurt --;
        document.getElementById("beurt").innerText = "Speler 1 is aan de beurt";

    }

}
