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
    var score = document.getElementById('score');

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
            var x = e.x;
            var y = e.y;

            // Firefox (im not sure this works)
            if (!x || !y) {
                var x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                var y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }

            // Align x,y with the canvas
	        x -= canvas.offsetLeft;
            y -= canvas.offsetTop;

            // Snap x,y to grid corners where a tile's x,y will be
	        var rx = Math.floor(x / SIZE) * SIZE;
	        var ry = Math.floor(y / SIZE) * SIZE;

            // Find the tile we just clicked and flip it
            tiles.map(function(t) {
                if (t.x === rx && t.y === ry)
                    t.flipped = true;
                else
                    t.flipped = false;
            });


            // Redraw game board
            game.draw();
	    },

	    template_mapper: function(template){
	        for (var i = 0; i < template.length; i++){
		        for (var j = 0; j < template[i].length; j++){
		            tiles.push(new Tile(i * SIZE, j * SIZE));
		        }
	        }
	    },

        // Draw all tiles
	    draw: function(){
	        for (var i = 0; i < tiles.length; i++){
		        tiles[i].draw(context);
	        }
	    }
    }
})();

game.init();
