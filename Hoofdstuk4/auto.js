var mijnauto = {
    merk: "ford",
    type:"modeo",
    aantalwielen: 4,
    kleur: "blauw",
    snelheid: 0,
    toeteren: function(){
      console.log("toeter!")
    },
    
    gasgeven: function () {
        this.snelheid += 5
        console.log(this.snelheid);
    }
}

mijnauto.gasgeven();
mijnauto.toeteren();