fotos = document.getElementById("fotos");

createpictureholders();
createvogelbekdierpictures();

function createpictureholders() {
    for (var i = 0; i < 9; i++) {
        pictureholder = document.createElement("div");
        pictureholder.className = "picture-holder";
        pictureholder.id = "picture-holder-" + i;
        fotos.appendChild(pictureholder);

    }

}

function createvogelbekdierpictures() {
    pictureholders = document.getElementsByClassName("picture-holder");
    console.log(pictureholders);
    for (var i = 0; i < pictureholders.length; i++) {
        favoriet = document.createElement("div");
        favoriet.className = "favoriet";
        favoriet.id = "favoriet-" + (i);
        vogelbekdierplaatje = document.createElement("img");
        vogelbekdierplaatje.src = "vogelbekdieren300,300/vogelbekdier" + (i + 1) + ".jpg";
        vogelbekdierplaatje.id = i;
        vogelbekdierplaatje.addEventListener("click", function () {
            maakfavoriet(this.id);
        });
        pictureholders[i].appendChild(favoriet);
        pictureholders[i].appendChild(vogelbekdierplaatje);
    }

}

function maakfavoriet(id) {
    console.log("dit is de beste nummer " + id);
    nietfavoriet = document.getElementsByClassName("favoriet");
    for (var i = 0; i < nietfavoriet.length; i++) {
        nietfavoriet[i].style.backgroundImage = "none";
    }
    favoriet = document.getElementById("favoriet-" + id);
    favoriet.style.backgroundImage = "url('vogelbekdieren300,300/hat.png')";

}