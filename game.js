//game.js
//show a screen with tiles - all blanked out or covered in black, and a score in top right


var SIZE = 200;
var WIDTH;
var HEIGHT;
var BOARD_W;
var BOARD_H;

var tiles = [];

var BOARD = [[1,2,3],
	     [4,5,6],
	     [7,8,9]];

var game = (function(){

    var tiles = [];
    var gameTiles = [];
    var picTiles = [];

    var gameArea = document.getElementById('gameArea');
    var canvas = document.getElementById('game_canvas');

    WIDTH = game_canvas.width;
    HEIGHT = game_canvas.height;
    BOARD_W = BOARD.length * SIZE;
    BOARD_H = BOARD.length * SIZE;
    
    var context = canvas.getContext('2d');
    
    return{
	
	init: function(){
	    canvas.addEventListener('click',function(e){
		game.click(e);
	    });
	    game.template_mapper(BOARD);
	    game.draw();
	    
	},

	click: function(e){
	    
	    if (e.x != undefined && e.y != undefined){
                var x = e.x;
                var y = e.y;
            }
            else{// Firefox                                                                                                                                           
		
                x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
	    
	    //makes the grid reasonable
	    x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
	    
	    var rx = Math.floor(x/SIZE) %BOARD.length;
	    var ry = Math.floor(y/SIZE) %BOARD.length;
	    
	    for( var i = 0; i < tiles.length; i++){
		
		if(tiles[i].x === rx && tiles[i].y === ry){
		    tiles[i].drawUp(context);
		}
	    }
	    context.strokeStyle = 'black';	    
	    context.strokeRect(0,0,BOARD_W, BOARD_H);
	},

	template_mapper: function(template){

	    for (var i = 0; i < template.length; i++){
		for (var j = 0; j < template[i].length; j++){
		    tiles.push(new Tile(i*SIZE, j * SIZE)); 
		}

	    }	    
	},
	
	draw: function(){
	    
	    for(var i = 0; i < tiles.length; i++){
		tiles[i].drawDown(context);
	    }
	    


	}
    }
})();

game.init();

