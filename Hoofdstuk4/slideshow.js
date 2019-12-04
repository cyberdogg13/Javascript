var plaatjes = [1,2,3,4,5,6,7,8,9];
var teller = 1;
var slideholder = document.getElementById("slideshow");
slideholder.style.backgroundImage = "url(../Hoofdstuk3/vogelbekdier1.jfif)";

slideholder.addEventListener("click",function (ev) {
   slideholder.style.backgroundImage = "url(../Hoofdstuk3/vogelbekdier"+ getvogelbekdier()+".jfif)"
});

function getvogelbekdier() {
    if (teller >= plaatjes.length ){
        teller =0;
    }
    teller++;
    return teller;
}