fotos = document.getElementById("fotos");

createpictureholders();
createvogelbekdierpictures();


function laatfotozien(id) {
    console.log("dit is nummer" + id);
    var selectie = document.getElementById(id);
    selectie.style.visibility = "hidden";

}

function createpictureholders() {
    for (var i = 0; i < 18; i++) {
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
        vogelbekdierplaatje = document.createElement("img");
        vogelbekdierplaatje.src = "../Hoofdstuk5/vogelbekdieren300,300/vogelbekdier" + (i + 1) + ".jpg";
        vogelbekdierplaatje.id = "vogelbekdier" + i;
        vogelbekdierplaatje.addEventListener("click", function () {
            laatfotozien(this.id);
        });
        pictureholders[i].appendChild(vogelbekdierplaatje);
    }

}