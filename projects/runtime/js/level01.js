var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": 210 },
                { "type": "sawblade", "x": 1200, "y": groundY },
                { "type": "sawblade", "x": 1500, "y": 200 },
                { "type": "sawblade", "x": 2100, "y": 200 },
                { "type": "box", "x": 2000, "y": groundY-20 },
                { "type": "box", "x": 1700, "y": 215 },
                { "type": "box", "x": 1900, "y": 100 },
                { "type": "box", "x": 1300, "y": 200 },
                { "type": "evil", "x": 600, "y": groundY - 50 },
                { "type": "evil", "x": 1500, "y": groundY - 60 },
                { "type": "evil", "x": 1900, "y": groundY - 50 },
                { "type": "evil", "x": 2000, "y": groundY - 55 },
                { "type": "reward", "x": 2200, "y": 190 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);
        
        // BEGIN EDITING YOUR CODE HERE

       
        
        function createSawBlade (x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = 400;
        sawBladeHitZone.y = 215;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
        }
    
        
        for (var i = 0; i < levelData["gameItems"].length; i++) {
            var eachGameObject = levelData.gameItems[i];
            var eachX = eachGameObject.x;
            var eachY = eachGameObject.y;
            var eachType = eachGameObject.type;
            if (eachType === "sawblade") {
            createSawBlade(eachX,eachY);
            }
            else if (eachType === "box") {
                createBox (eachX,eachY);
            }
            else if (eachType === "evil") {
                createEnemy(eachX, eachY);
            }
            else if (eachType === "reward"){
                createReward(eachX,eachY);
            }
        }
        
        function createBox (x,y) {
            var boxHitZoneSize = 20;
            var damageFromBox = 15;
            var boxHitZone = game.createObstacle(boxHitZoneSize, damageFromBox);
            boxHitZone.x = 375;
            boxHitZone.y = 250;
            game.addGameItem(boxHitZone);
            var boxImage = draw.rect(45, 45, 'Blue', 'LightBlue', 2);
            boxHitZone.addChild(boxImage);
            boxImage.x = -20;
            boxImage.y =-20;
            boxHitZone.x = x;
            boxHitZone.y = y;
        }
        
        function createEnemy (x,y) {
             var enemy =  game.createGameItem('enemy',25);
        var evilSquare = draw.rect(50,50,'yellow', 'orange', 2);
        evilSquare.x = -25;
        evilSquare.y = -25;
        enemy.addChild(evilSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;
        enemy.onPlayerCollision = function () {
            console.log ('The enemy has hit Halle');
            game.changeIntegrity(-10);
        };
        enemy.onProjectileCollision = function() {
            console.log ('Halle has hit the enemy');
            game.increaseScore(100);
            game.changeIntegrity(5)
            enemy.fadeOut();
        };
        }
        
        function createReward (x,y) {
            var reward = game.createGameItem('reward',10);
            var rewardSquare = draw.rect(20,20,'green', 'LightGreen',1);
            rewardSquare.x = -10;
            rewardSquare.y = -10;
            reward.addChild(rewardSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;
            reward.onPlayerCollision = function () {
                console.log("Halle obtained the green shard");
                game.changeIntegrity(20);
                game.increaseScore(300);
                reward.fadeOut();
            };
        }
        
    
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
