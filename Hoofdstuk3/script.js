var fotos = document.getElementsByTagName("img");
var willekeuriggetal = 0;
var willekeurigegetallen = [];

while(willekeurigegetallen.length<9){
    willekeuriggetal = Math.floor(Math.random()*9)+1;
    if(willekeurigegetallen.lastIndexOf(willekeuriggetal) == -1){
        willekeurigegetallen.push(willekeuriggetal);
    }
}
willekeuriggetal = 0;
for (var foto in fotos){
    fotos[foto].src = "vogelbekdier"+willekeurigegetallen[willekeuriggetal] +".jfif";
    willekeuriggetal++;
}
