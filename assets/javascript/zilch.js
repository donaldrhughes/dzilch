$(document).ready(function () {

    // Declare Global Vars
    //================================================

    var database;
    var heldDice = [];
    var dice = [];


    //remove once solve how to load images from new rolldice() duplicate code below
    var numDice = 6;
    for (i = 1; i <= numDice; i++) {
        var die = new Die(0, "assets/images/D" + i + ".jpg", 20, 20);
        dice.push(die);
    };

    //Main Section
    //===================================================

    initPage();


    //Functions
    //======================================================================

    function dbAuth() {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD_MbeNXvxMo1ECZz1CumhkdmRlg5oI2YI",
            authDomain: "tournament-zilch.firebaseapp.com",
            databaseURL: "https://tournament-zilch.firebaseio.com",
            projectId: "tournament-zilch",
            storageBucket: "tournament-zilch.appspot.com",
            messagingSenderId: "1040397840764"
        };
        firebase.initializeApp(config);

        // Create a variable to reference the database
        database = firebase.database();

    };



    function mainAudio() {

        var mainTheme = new Audio();
        mainTheme.src = "./assets/audio/mainTheme.mp3";
        mainTheme.loop = "true";
        mainTheme.play();
    }



    function initPage() {
        $("#holdArea").hide();
        playersOpt = $("#playersOpt");
        playersText = $("#playersText");
        dbAuth();
        loadSettings();
        startBtn();
    }


    function startBtn() {

        var startBtn = $("<button>");
        startBtn.addClass("btn startBtn btn-dark");
        startBtn.text("Start");
        $("#start").append(startBtn);
        startBtn.on("click", function () {
            var numPlayers = playersOpt[0].value;

            // console.log(playersOpt);
            initGame(1, 1, numPlayers);
        })
    };


    function initGame(turn, round, numPlayers) {
        $("#start").hide();
        playersOpt.addClass("playersOpt");
        playersText.addClass("playersOpt");

        mainAudio();
        loadCup();
        notepadScore();
        loadPlayers(numPlayers);
        // console.log("turn: " + turn);
        // console.log("players: " + numPlayers);
        $("#turn-text").text("Turn: " + turn);
        $("#round-text").text("Round: " + round);
        loadholdArea();
    };



    function loadSettings() {
        var settingsGear = { src: "assets/images/settingsicon.png" };
        settingsGearImg = $("<img>");
        settingsGearImg.attr("src", settingsGear.src);
        $("#settings").append(settingsGearImg);
        settingsGearImg.on("click", function () {

            $('#settingsModal').modal('show');

        });

    }


    function notepadScore() {
        var notepad = { src: "assets/images/notepadscoreSmall.png" };
        notepadImg = $("<img>");
        notepadImg.attr("src", notepad.src);
        $("#notepad").append(notepadImg);
        notepadImg.on("click", function () {

            $('#notepadScore').modal('show');

        });

    }


    function loadholdArea() {

        holdArea = $("<div>");
        holdAreaText = $("<div>");
        holdArea.addClass("holdArea border border-light");
        holdAreaText.html("Hold Area")
        $("#holdArea").append(holdArea);
        $("#holdAreaText").append(holdAreaText);
        $("#holdArea").show();
    };





    function Die(value, src, width, height, inholdArea, clickable) {
        this.value = value;
        this.src = src;
        this.width = width;
        this.height = height;
        this.inholdArea = inholdArea;
        this.clickable = clickable;
        this.index;

    };




    function createDice(dice, diceResult, dieTotal) {
        for (i = 0; i < dieTotal; i++) {
            dice[i].value = diceResult[i];
            dice[i].src = "assets/images/D" + dice[i].value + ".jpg";
        }

        //Loads the dice images
        dice.forEach(function (elem, i, ) {
            dice[i].index = i;
            $("#img" + i).empty();


            diceImg = $("<img>");
            diceImg.addClass("dice");
            diceImg.attr("src", elem.src);
            diceImg.attr("width", elem.width);
            diceImg.attr("height", elem.height);
            $("#img" + i).append(diceImg);

            // Move to Hold Area - MUST STAY HERE!
            diceImg.on("click", function () {
                $("#img" + i).prependTo('#holdArea');
                $("#message-text").empty();
                //holdDice();

            })

        });

        console.table(dice);
    }



    function Player(pnum, name, isTurn, wins, losses, score, bank, src, clickable, totalgames) {
        this.pnum = pnum;
        this.name = name;
        this.isTurn = isTurn;
        this.wins = wins;
        this.losses = losses;
        this.score = score;
        this.bank = bank;
        this.src = src;
        this.clickable = clickable;
        this.totalgames = totalgames;

    };



    function loadPlayers(numPlayers, totalgames) {
        
        var players = [];

        for (i = 1; i <= numPlayers; i++) {
            var player = new Player(i, "Player " + i, false, 0, 0, 0, 0, "assets/images/avatar" + i + ".png", totalgames);
            players.push(player);
        };
        players.forEach(function (elem, i) {

            //emptys the player avatar name score bank
            $("#player" + (i + 1)).empty();
            $("#name" + (i + 1)).empty();
            $("#p" + (i + 1) + "bank").empty();
            $("#p" + (i + 1) + "name").empty();
            $("#p" + (i + 1) + "score").empty();

            //Loads the player avatar
            playerImg = $("<img>");
            playerImg.attr("src", elem.src);
            $("#player" + (i + 1)).append(playerImg);

            //loads the player's score into notepad Dom data / obj
            playerScore = $("<div>");
            playerScore.html(elem.score);
            $("#p" + (i + 1) + "score").append(playerScore);

            //loads the players name Dom obj
            playerName = $("<div>");
            playerName.html(elem.name);
            $("#p" + (i + 1) + "name").append(playerName);

            // loads the players Name into the notepad Dom obj
            playerNameNotepad = $("<div>");
            playerNameNotepad.html(elem.name);
            $("#p" + (i + 1) + "notepadName").append(playerNameNotepad);

            //loads the player's bank onto table Dom obj
            playerBank = $("<div>");
            playerBank.html(elem.bank);
            $("#p" + (i + 1) + "bank").append(playerBank);
        })
        // console.table(players);
    };



    function loadCup() {

        // Roll Cup Creation
        var cup = { src: "assets/images/Dicecup.png" };

        cupImg = $("<img>");
        cupImg.addClass("diceCup");
        cupImg.attr("src", cup.src);
        $("#roll-cup").append(cupImg);

        //Rolling the Roll Cup.. lol 
        cupImg.on("click", function () {

            rollSound = new Audio();
            rollSound.src = "./assets/audio/diceroll.wav";
            rollCounter++;
            //$("#rollCounter").text("Roll: " + rollCounter);
            initRoll();

        })

    };


    function sortResult() {
        var sortResults = diceResult.slice();
        sortResults.sort();
        var results = sortResults.join(" ");
        console.log(sortResults);

        database.ref().set({
            sort: results,
            csvSort: diceResult

        });

        // Firebase watcher + initial loader HINT: .on("value")
        database.ref().on("value", function (snapshot) {

            // Log everything that's coming out of snapshot
            console.log(snapshot.val());

            $("#result-text").text(snapshot.val().sort);
        })

    }




    function initRoll() {
        $("#message-text").empty();
        //Main numGen function
        //Main Random Num Gen Array 
        diceResult = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
        var dieTotal = diceResult.length;
        rollCounter++;
        rollSound.play();

        //Number testing...
        // diceResult = [2, 2, 3, 3, 4, 4];
        // console.log(diceResult);
        // console.log(diceResult[0]);
        // console.log(dice.value);

        sortResult(diceResult);
        createDice(dice, diceResult, dieTotal);
        scoring(diceResult, dieTotal);
        console.log("Player Bank" + " " + rollVal);
    }





    function countDice(diceResult, dieTotal) {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        var count5 = 0;
        var count6 = 0;

        console.log(diceResult);

        for (j = 0; j < dieTotal; j++) {
            if (diceResult[j] == 1)
                count1++;

            if (diceResult[j] == 2)
                count2++;

            if (diceResult[j] == 3)
                count3++;

            if (diceResult[j] == 4)
                count4++;

            if (diceResult[j] == 5)
                count5++;

            if (diceResult[j] == 6)
                count6++;
        };

        dieCount = [count1, count2, count3, count4, count5, count6];

    }

    function holdDice(dice, diceResult, diceImg) {

        var dieVal = dice[i].value;
        var dieIndex = diceResult.indexOf(dieVal);

        if (dieIndex > -1) {
            heldDice.push(dieVal);
            diceResult.splice(dieIndex, 1);
            returnDice(i, diceImg, diceResult, heldDice);
        };

        // var diceResultNew = diceResult.slice(i + 1);

        // find out how many dice are in hold area
        //  var numHeldDice = heldDice.length;
        //  var numDice = 6 - numHeldDice;
        //  console.log(numDice);

        console.log(heldDice);
        console.log(diceResult);

        if ((heldDice.lengh > 0)) {
            bankPoints();
        }

    }



    function bankPoints() {
        var bankPointsBtn = { src: "assets/images/bankPoints.gif" };

        bankPointsBtnImg = $("<img>");
        bankPointsBtnImg.addClass("bankPointsBtn");
        bankPointsBtnImg.attr("src", bankPointsBtn.src);
        $("#bankPoints").append(bankPointsBtnImg);
    }



    function scoring(diceResult, dieTotal) {
        // console.log(dieCount);
        countDice(diceResult, dieTotal);
        rollVal = 0;

        //3 pairs main variable
        var threePairs = [0, 0, 0];
        var onePair = false;
        for (k = 0; k < dieCount.length; k++) {
            if (dieCount[k] == 2) {
                threePairs.unshift("Valid");
                threePairs.splice(-1, 3);
                onePair = true;
            }
        }

        // ^^ Pyramid
        if (dieCount[0] == 1 && dieCount[1] == 2 && dieCount[2] == 3) {
            rollVal += 3500;
            $("#message-text").text("You rolled a Pyramid!");
        }
        // ^^ Straight
        else if (dieCount[0] == 1 && dieCount[1] == 1 && dieCount[2] == 1 && dieCount[3] == 1 && dieCount[4] == 1 && dieCount[5] == 1) {
            rollVal += 4000;
            $("#message-text").text("You rolled a Straight!");
        }
        // ^^ 3 Pairs
        else if (threePairs[0] == "Valid" && threePairs[1] == "Valid" && threePairs[2] == "Valid") {
            rollVal += 3000;
            $("#message-text").text("You rolled Three Pairs!");
        }
        // ^^ 3 Pairs w 4 of a kind and 1 pair
        else if (onePair == true && ((dieCount[0] == 4) || (dieCount[1] == 4) || (dieCount[2] == 4) || (dieCount[3] == 4) || (dieCount[4] == 4) || (dieCount[5] == 4))) {
            rollVal += 3000;
            $("#message-text").text("You rolled Three Pairs!");
        }
        else {
            //Remainder of rolls -- 1's 5's 3,4,5,6 of a kind

            if (dieCount[0] == 1) {
                rollVal += 100;
            }
            if (dieCount[0] == 2) {
                rollVal += 200;
            }
            if (dieCount[0] == 3) {
                rollVal += 1000;
            }
            if (dieCount[0] == 4) {
                rollVal += 2500;
                $("#message-text").text("You rolled Four of a Kind!");
            }
            if (dieCount[0] == 5) {
                rollVal += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
            }
            if (dieCount[0] == 6) {
                rollVal += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
            }
            if (dieCount[1] == 3) {
                rollVal += 200;
            }
            if (dieCount[1] == 4) {
                rollVal += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
            }
            if (dieCount[1] == 5) {
                rollVal += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
            }
            if (dieCount[1] == 6) {
                rollVal += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
            }
            if (dieCount[2] == 3) {
                rollVal += 300;
            }
            if (dieCount[2] == 4) {
                rollVal += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
            }
            if (dieCount[2] == 5) {
                rollVal += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
            }
            if (dieCount[2] == 6) {
                rollVal += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
            }
            if (dieCount[3] == 3) {
                rollVal += 400;
            }
            if (dieCount[3] == 4) {
                rollVal += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
            }
            if (dieCount[3] == 5) {
                rollVal += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
            }
            if (dieCount[3] == 6) {
                rollVal += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
            }
            if (dieCount[4] == 1) {
                rollVal += 50;
            }
            if (dieCount[4] == 2) {
                rollVal += 100;
            }
            if (dieCount[4] == 3) {
                rollVal += 500;
            }
            if (dieCount[4] == 4) {
                rollVal += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
            }
            if (dieCount[4] == 5) {
                rollVal += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
            }
            if (dieCount[4] == 6) {
                rollVal += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
            }
            if (dieCount[5] == 3) {
                rollVal += 600;
            }
            if (dieCount[5] == 4) {
                rollVal += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
            }
            if (dieCount[5] == 5) {
                rollVal += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
            }
            if (dieCount[5] == 6) {
                rollVal += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
            }
            if (rollVal == 0) {

                $('#zilchModal').modal('show');
            }


        }
        database.ref().set({
            value: rollVal,
        });

        // Firebase watcher + initial loader HINT: .on("value")
        database.ref().on("value", function (snapshot) {

            $("#value-text").text(snapshot.val().value + " Points!");
        })
    }




    //Check if won

    //Check if over 10,000
})

