//game.js
//show a screen with tiles - all blanked out or covered in black, and a score in top right


var SIZE = 50;
var WIDTH;
var HEIGHT;

var BOARD = [[123],
	     [456],
	     [789]];

var game = (function(){

    var gameArea = document.getElementById('gameArea');
    var canvas = document.getElementById('game_canvas');

    WIDTH = game_canvas.width;
    HEIGHT = game_canvas.height;

    var context = canvas.getContext('2d');
    
    return{
	
	init: function(){
	    game.draw();
	},
	
	draw: function(){
	    
	    context.fillStyle = 'black';
	    context.strokeRect(0,0,WIDTH,HEIGHT);
	}
    }
})();

game.init();