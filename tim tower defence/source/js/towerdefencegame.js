//hoofd configuratie
var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

//moeilijkheids instellingen
var moeilijkhijd = 1;
var badguyHP = 110;
var badguySnelheid = 1 / 10000;
var spawnperdiff = 10;

var spawncount = 0;
var kogelSchade = 5;
var graphics;
var pad;
var punten = 0;
var killpoints = 0;
var puntentekst;
var gulden = 50;
var guldentekst;
var levenspunten = 10;
var leventekst;
var gameovertekst;
var gameover = false;

// map array
//dit is om te kijken of er een beschikbare plek is op het de map voor een turret
var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0],
    [0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0],
    [0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0,-1,-1, 0, 0, 0],
    [0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0,-1,-1, 0, 0, 0],
    [0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0, 0],
    [0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0]
];

function preload() {
    // laden van de de plaatsjes en geluidjes

    this.load.image("achtergrond", "assets/tower defence background.png");
    this.load.audio("Mgbulletsound",["assets/sounds/Mgbulletsound.mp3","assets/sounds/Mgbulletsound.ogg"]);
    this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('gunturret', 'assets/turrets/MG.png');
    this.load.image('gunbullet', 'assets/turrets/Bullet_MG.png');
    this.load.image('tower', 'assets/turrets/tower.png');
}

//kogels
var Mgkogel = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function projectiel(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'gunbullet');

            this.dx = 0;
            this.dy = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(1600, 1);
        },

    fire: function (x, y, angle) {
        this.setActive(true);
        this.setVisible(true);


        //  begin positie van de kogel
        this.setPosition(x, y - 8);

        // kogel draaien naar de badguy waar op gemikt word
        //en de kogel verkleinen met 50%
        this.setRotation(angle + 80);
        this.scaleX = 0.3;
        this.scaleY = 0.3;

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 300;
    },

    update: function (time, delta) {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

//badguys
var Enemy = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Enemy(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
            this.follower = {t: 0, vec: new Phaser.Math.Vector2()};

        },
    startOnPath: function () {
        // "t" terug zetten op 0 zodat de badguy op het begin van het pad word geplaatst
        this.follower.t = 0;
        this.hp = (badguyHP*moeilijkhijd);
        this.scaleX = 1.1;
        this.scaleY = 1.1;

        // get x and y of the given t point
        pad.getPoint(this.follower.t, this.follower.vec);

        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },
    receiveDamage: function (damage) {
        this.hp -= damage;

        // if hp drops below 0 we deactivate this enemy
        if (this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
            killpoints += 10;
        }
    },

    update: function (time, delta) {
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += badguySnelheid * delta;

        // get the new x and y coordinates in vec
        pad.getPoint(this.follower.t, this.follower.vec);

        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // als een badguy aan het eind is gekomen word de unit verwijderd
        //tevens worden de levenspunten verlaagt met 1
        if (this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
            levenspunten -= 1;
        }
    }

});

function damageEnemy(enemy, kogel) {
    // alleen als de kogel en de badguy actief is
    if (enemy.active === true && kogel.active === true) {
        //verwijderen van de kogel
        //mischien veranderen in .destroy
        kogel.setActive(false);
        kogel.setVisible(false);

        // badguy HP verlagen met kogelschade
        enemy.receiveDamage(kogelSchade);
    }
}

//turrets
var Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Turret(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'gunturret');
            this.scaleX = 0.22;
            this.scaleY = 0.22;
            this.nextTic = 0;
        },
    place: function (i, j) {
        this.y = i * 50 + 50 / 2;
        this.x = j * 50 + 50 / 2;

        map[i][j] = 1;
    },
    fire: function () {
        var enemy = getEnemy(this.x, this.y, 200);
        if (enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            maakKogel(this.x, this.y, angle);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;

        }
    },
    update: function (time, delta) {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + 200;
        }
    }
});


function tekengrid(graphics) {
    graphics.lineStyle(1, 0xFFFC9A, 0.8);
    for (var i = 0; i < 12; i++) {
        graphics.moveTo(0, i * 50);
        graphics.lineTo(1200, i * 50);
    }
    for (var j = 0; j < 24; j++) {
        graphics.moveTo(j * 50, 0);
        graphics.lineTo(j * 50, 600);
    }
    graphics.strokePath();
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}

function placeTurret(pointer) {
    var i = Math.floor(pointer.y / 50);
    var j = Math.floor(pointer.x / 50);
    if (canPlaceTurret(i, j) && gulden >= 25 ){
        gulden -= 25;
        guldentekst.setText("u heeft:" + gulden + " gulden");
        var turret = turrets.get();
        if (turret) {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }
    }
}

function maakKogel(x, y, angle) {
    var kogel = kogels.get();
    if (kogel) {
        kogel.fire(x, y, angle);
    }
}


//een badguys kiesen en de afstand tussen de turret en de badguy terug geven

function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for (var i = 0; i < enemyUnits.length; i++) {
        if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
            return enemyUnits[i];
    }
    return false;
}


function create() {


    this.achtergrond = this.add.image(600,300 ,"achtergrond");
    this.achtergrond.scaleX = 0.8;
    this.achtergrond.scaleY = 0.8;

    //grid functie uitvoeren
    var graphics = this.add.graphics();
    tekengrid(graphics);

    //het pad voor de badguys
    // getekent met behulp van X/Y coordinaten van het scherm
    pad = this.add.path(600, -5);
    pad.lineTo(600, 200);
    pad.lineTo(150, 200);
    pad.lineTo(150, 400);
    pad.lineTo(800, 400);
    pad.lineTo(800, 200);
    pad.lineTo(1000, 200);
    pad.lineTo(1000, 605);


    graphics.lineStyle(3, 0xffffff, 1);
    // het pad in beeld brengen
    pad.draw(graphics);

    enemies = this.physics.add.group({classType: Enemy, runChildUpdate: true});
    this.nextEnemy = 0;

    turrets = this.add.group({classType: Turret, runChildUpdate: true});
    this.input.on('pointerdown', placeTurret);

    kogels = this.physics.add.group({classType: Mgkogel, runChildUpdate: true});

    this.physics.add.overlap(enemies, kogels, damageEnemy);

    //audio en tekst
    this.Mgbulletsound = this.sound.add("Mgbulletsound");
    puntentekst = this.add.text(16, 16, "u heeft:" + punten + " punten", {fontSize: '32px', fill: '#FFFFFF'});
    guldentekst= this.add.text(16, 54, "u heeft:" + gulden + " gulden", {fontSize: '32px', fill: '#FFFFFF'});
    leventekst= this.add.text(670, 16, "u heeft nog:" + levenspunten + " levens", {fontSize: '32px', fill: '#FFFFFF'});
    gameovertekst = this.add.text(game.config.width / 4, game.config.height / 2, " ", {fontSize: '52px', fill: '#FFFFFF'});
}

var p = 10;
function update(time, delta) {


if (killpoints > punten){
    punten +=  10;
    gulden += 10;
    puntentekst.setText("u heeft:" + punten + " punten");
    guldentekst.setText("u heeft:" + gulden + " gulden");
}

if (levenspunten < p){
    leventekst.setText("u heeft nog:" + levenspunten + " levenspunten");
    p -= 1;
}
    // als het tijd is voor de volgende badguy
    if (time > this.nextEnemy && gameover === false) {
        var enemy = enemies.get();
        if (enemy) {
            spawncount ++;
            console.log(badguyHP*moeilijkhijd);
            console.log(spawncount + " spawncount " + moeilijkhijd + " moeilijkheid ");
            enemy.setActive(true);
            enemy.setVisible(true);

            // plaatst badguy op het begin van het pad
            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        }
    };
    if (gameover) {
        puntentekst.setText("         GAME OVER     F5 to restart");
        gameovertekst.setText("highscore = " + punten)
        leventekst.setText(" ");
        guldentekst.setText(" ");
        badguySnelheid = 0;
        kogelSchade = 0;
        return;
    };
    if(levenspunten === 0){
        gameover = true;
    }
if (spawncount === spawnperdiff ){
    // dit verhoogt de HP van de badguys
  moeilijkhijd += 1;
  spawncount = 0;
};

}

