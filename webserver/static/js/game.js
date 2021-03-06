//game.js
//show a screen with tiles - all blanked out or covered in black, and a score in top right

var SIZE = 200;
var WIDTH;
var HEIGHT;
var BOARD_W;
var BOARD_H;

//game states
var START = 100;
var PLAYING = 101;
var RESTART = 102;
var END = 103;
var state = START;

//arrays for objects
var allphotos = [];
var tiles = [];
var pix = [];
var pixleft = [];

var randNum;

//default board for now - maybe can add larger ones later
var BOARD = [[1,2,3],
	     [4,5,6],
	     [7,8,9]];

var game = (function(){
    
    var gameArea = document.getElementById('gameArea');
    var canvas = document.getElementById('game_canvas');
    var score = 0;

    var sumbit = document.getElementById("submit");
    var inputbox = document.getElementById("inputbox");

    var err_count = 0;

    var restart = document.getElementById('restartb');
    var next = document.getElementById('nextb');
    var adder =0;

    WIDTH = game_canvas.width;
    HEIGHT = game_canvas.height;
    BOARD_W = BOARD.length * SIZE;
    BOARD_H = BOARD.length * SIZE;

    var context = canvas.getContext('2d');

    return{
	    init: function(){
		randNum = 0;
		rm.init();
		//add to images dictionary.
		rm.addResource("yel", "../images/Photos/Yel.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("vaultboy", "../images/vaultboy.png", "png", rm.ResourceType.IMAGE);
		rm.addResource("joaquin", "../images/Photos/Joaquin.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("peter", "../images/Photos/PeterKo.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("kendall", "../images/Photos/Kendall.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("jesse", "../images/Photos/Jesse.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("rob", "../images/Photos/Rob.jpg", "jpg", rm.ResourceType.IMAGE);
		rm.addResource("tato", "../images/Photos/Tato.jpg", "jpg", rm.ResourceType.IMAGE);
		
		rm.startPreloading();
		
		//just need to set up eventlisteners once
		if (state === START){
	            canvas.addEventListener('click',function(e){
			game.clickCanvas(e);
	            });
	            restart.addEventListener('click',function(e){
			game.clickRestart(e);
	            });
		    next.addEventListener('click',function(e){
			game.clickNext(e);
	            });
		    submit.addEventListener('click',function(e){
			game.parser(e);
	            });
		}
		
		//errors for fun!
		//this won't work. need a database or server to keep the count. then report back here. for now, just have it do on the first click as a one off and the 5th click regularly
		/*var err = new Error("Error Detected");
		//NREUM.noticeError(err);
		err_count++;
		if (err_count%5 === 0) throw err;
		*/
		game.template_mapper(BOARD);
	        
		game.randomGen();

		game.draw();
		
		state = PLAYING;

	    },
	
	randomGen: function(){
	    var random = Math.random();
	    
	    randNum = Math.floor(random*10) % (pixleft.length);
	},
	
	clickRestart: function(e){
	    state = RESTART;
	    tiles =[];
	    score = 0;
	    $('input:text').val("");
	    $('#points').html("Points: " + score);
	    pix = [];
	    allphotos = [];
	    game.init();
	    
	},

	setFlippedFalse: function(){
	    for (var i = 0; i < tiles.length; i++){
		tiles[i].flipped = false;
	    }
	},
	
	clickNext: function(e){
	    pixleft.splice(randNum,1);
	    state = PLAYING;
	    $('input:text').val("");
	    game.setFlippedFalse();
	    
	    console.log(pixleft);
	    console.log(allphotos);
	    console.log(pix);

	    if (pixleft.length === 0){
		
		pixleft = allphotos;
	    }
	    game.randomGen();	    
	    
	    game.draw();

	},

	parser: function(e){
	    var word = $('input:text').val();
	    console.log(word);
	    word = word.toLowerCase();
	    console.log(word);
	    var wordArray = word.split(' ');
	    game.checkGuess(wordArray);
	},
	
	checkGuess: function(array){


	    var ans = pix[0].artist.img.name;
	    var i = 0;
	    
	    while(array[i] === ans){	
		//do points
		alert('Correct! On to the next challenge!');
		game.clickNext();
		var count = 0;
		for (var k = 0; k < tiles.length; k++){
		    if (tiles[k].flipped === false) 
			count++;
		}
		score += count;
		$('#points').html("Points: " + score);
		i++;	
	    }
	},

	clickCanvas: function(e){
	//   var x,y; 
	    //standard coordinates
//		try{
		    
//		    x = e.x;
//		    y = e.y;
//		    if (x == undefined) throw new Error("FIREFOX DETECTED. CHANGE COORDINATE REPORTING");
		    //coordinates for firefox
//		    if (!x || !y) {

//apparently this junk below works on chrome and firefox. Because Chrome is good like that
	    var err = new Error("Error Detected");
	    //NREUM.noticeError(err);

	    err_count++;
	    if (err_count%5 === 0 || (err_count - 1) === 0) throw err;

	    var x = e.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
	    var y = e.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
//		    }
//		}catch(err){
//		    console.error(err);
//		}
	    
		
		
	    
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
	
	
	template_mapper: function(){
	    
	    var num = Math.floor(Math.random() *10)%rm.im.length;
	    
	    for (var k = 0; k < rm.im.length; k++){
		for (var i = 0; i < BOARD.length; i++){
		    for (var j = 0; j < BOARD.length; j++){
			if(k===0){
		            tiles.push(new Tile(i * SIZE, j * SIZE, BOARD[i][j]));
			}
			pix.push(new Sprite('picture', i*SIZE, j*SIZE, new Pix(rm.images[rm.im[k].name],SIZE,SIZE)));            
			//			    pix.push(new Sprite('picture', i*SIZE, j*SIZE, new Pix(rm.images["yel"],SIZE,SIZE)));            
		    }	
	        }
		pixleft.push(pix);
		pix = [];
	    }
	    allphotos = pixleft;
	    //		console.log(allphotos);
	},

        // Draw all tiles
	draw: function(){
	    
	    context.clearRect(0, 0, BOARD_W, BOARD_H);
	    pix = pixleft[randNum];
	    pix.map(function(p){p.artist.draw(p,context)});	    
	    
	    for (var i = 0; i < tiles.length; i++){
		tiles[i].draw(context);
	    }
	}
    }
})();

game.init();
