//game.js
//show a screen with tiles - all blanked out or covered in black, and a score in top right

var SIZE = 200;
var WIDTH;
var HEIGHT;
var BOARD_W;
var BOARD_H;

var allphotos = [];
var tiles = [];
var pix = [];

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

    var restart = document.getElementById('restartb');
    var next = document.getElementById('nextb');
/*
    restart.onclick() = function(){
	

    }
    next.onclick() = function(){


    }
*/

    WIDTH = game_canvas.width;
    HEIGHT = game_canvas.height;
    BOARD_W = BOARD.length * SIZE;
    BOARD_H = BOARD.length * SIZE;

    var context = canvas.getContext('2d');

    return{
	    init: function(){

		rm.init();
		//add to images dictionary.
		rm.addResource("yel", "/images/Photos/Yel.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("vaultboy", "/images/vaultboy.png", "png", rm.ResourceType.IMAGE);
		rm.addResource("joaquin", "/images/Photos/Joaquin.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("peter", "/images/Photos/PeterKo.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("kendall", "/images/Photos/Kendall.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("jesse", "/images/Photos/Jesse.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("rob", "/images/Photos/Rob.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("tato", "/images/Photos/Tato.jpg", "jpg", rm.ResourceType.IMAGE);
		
		rm.startPreloading();
	        canvas.addEventListener('click',function(e){
		        game.click(e);
	        });
	        game.template_mapper(BOARD);
	        
		game.draw();

	    },

	    click: function(e){
		var x = e.x;
		var y = e.y;
		
            // Firefox
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
		// this here is pretty
		tiles.map(function(t) {
                    if (t.x === rx && t.y === ry)
			t.flipped = true; 
		});
		pix.map(function(p) {
                    if (p.x === rx && p.y === ry)
            		p.artist.show = true; 
		});
		// Redraw game board
		game.draw();
	    },

	    template_mapper: function(template){
		console.log(template);    
	//	for(var k = 0; k < rm.im.length;i++){
	        
		    for (var i = 0; i < template.length; i++){
			for (var j = 0; j < template[i].length; j++){
		            tiles.push(new Tile(i * SIZE, j * SIZE));
	
			    //pix.push(new Sprite('picture', i*SIZE, j*SIZE, new Pix(rm.im[k].name,SIZE,SIZE)));            
//			    pix.push(new Sprite('picture', i*SIZE, j*SIZE, new Pix(rm.images["yel"],SIZE,SIZE)));            
			}
			
	            }
	//	}
		
	    },

        // Draw all tiles
	    draw: function(){
		context.clearRect(0, 0, BOARD_W, BOARD_H);
		pix.map(function(p){p.artist.draw(p,context)});
		

	        for (var i = 0; i < tiles.length; i++){
		        tiles[i].draw(context);
	        }

	    },
	
	drawpic: function(section){
	    
	    section.artist.draw(section,context);    
	    
	}
    }
})();

game.init();
