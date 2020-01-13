

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
    var x = 1;
    for (var i = 0; i < 18; i++) {
        if (x == 10) {
            x = 1;
        }

        vogelbekdierplaatje = document.createElement("img");
        vogelbekdierplaatje.src = "../Hoofdstuk5/vogelbekdieren300,300/vogelbekdier" + x + ".jpg";
        vogelbekdierplaatje.id = i;
        vogelbekdierplaatje.addEventListener("click", function () {
            laatfotozien(this.id);
        });
        pictureholders[i].appendChild(vogelbekdierplaatje);
        x++;
    }
    console.log(pictureholders)
}
