$(document).ready(function() {


    // GLOBAL VARIABLES
    // ==================================================================
    var planetExpress = 
    {
        name: ['Fry', 'Bender', 'Leela', 'Nibbler'],
        image: ['fry', 'bender', 'leela', 'nibbler'],
        hp: [100, 220, 300, 90],
        attack: [10, 8, 12, 11],
        counterattack: [20, 10, 30, 40]
    };

    var enemySelected = false; 

    //FUNCTIONS
    //==================================================================
    function main()
    {

        $(".defender").empty(); 
        $(".attacker").empty();
        $(".enemyChar").empty();
        $(".selectChar").empty();
        $(".defeated").empty();
        //Create a div to add all units to select character section
        var div = $("<div>");
        div.addClass("characters");
        //Append div to html
        $(".selectChar").append(div);
            //Create for-loop to create all characters
        for (var i = 0; i < planetExpress.name.length; i++)
        {
            //Create div that has all character info
            var unit = $("<div>");
            unit.addClass("units");
            unit.attr("name", planetExpress.name[i]);
            unit.attr("hp", planetExpress.hp[i]);
            unit.attr("max-hp", planetExpress.hp[i]);
            unit.attr("attack", planetExpress.attack[i]);
            unit.append('<img src="assets/images/' + planetExpress.image[i] + '.png">');
            //Name unit
            var unitName = $("<div>");
            unitName.addClass("unitName");
            unitName.text(planetExpress.name[i]);
            unit.append(unitName);        
            //Create healthbars
            var unitHealthPoints = $("<div>");
            unitHealthPoints.addClass("health");
            unitHealthPoints.text("HP: " + planetExpress.hp[i] + " / " + planetExpress.hp[i]);
            unit.append(unitHealthPoints);
            $(".characters").append(unit);
        }        
    }
    //THIS FUNCTION WILL MOVE OTHER CHARACTERS TO ENEMY DIV
    function playerChoose()
    {
        console.log('select a player');
        $("body").one("click", ".units", function()
        {
            console.log('player selected');
            //Move other characters to enemies
            $(".enemyChar").append($(".characters"));
            //Keep selected character in same div
            $(".defender").append(this);
            //Give selected character a id
            $(this).attr("id","player");
            chooseEnemy();
        });
    }

    //Create click event to select enemy
    //=========================================================================
    function chooseEnemy()
    {
        $(".enemyChar").on("click", ".units", function()
        {
            //Create flag so you can only choose one opponent at a time
            if(enemySelected === false)
            {
                //Append enemy to defender div
                $(".attacker").append(this);
                //Give enemy clicked an id to reference later
                $(this).attr("id","enemy");
            }
            enemySelected = true;
        })
    }
    //
    //===========================================================================
    $(".attackBtn").on("click", function(){
        if(enemySelected == true) {
           var attackPoints = $("#player").attr("attack");
           var playerHealth = $("#player").attr("hp") - $("#enemy").attr("attack");
           var enemyHealth = $("#enemy").attr("hp") - attackPoints;
           
           $('#enemy > .health').text("HP: " + enemyHealth + " / " + $("#enemy").attr("hp"));

           $('#player > .health').text("HP: " + playerHealth + " / " + $("#player").attr("hp"));

           $('#enemy').attr('hp', enemyHealth);
           $('#player').attr('hp', playerHealth);

        if(playerHealth <= 0){
            alert("Opponent won. Try again.");
            main();
            playerChoose();
        }else if (enemyHealth <= 0){
            alert("You won.");
            $(".defeated").append($('#enemy'));
            $("#enemy").attr('id', '');
            enemySelected = false;
            chooseEnemy();

        }
        }
    });
    //
    main();
    playerChoose();
});