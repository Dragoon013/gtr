//artists for tiles
var Tile = function (x, y, number){
    this.x = x;
    this.y = y;
    this.width = SIZE;
    this.flipped = false;
    this.padding = 1;
    this.number = number;
};

Tile.prototype = {
    draw: function (context) {
        // Setup
        context.save();
	context.fillStyle = 'black';
        context.globalAlpha = .4;
	
	if (this.flipped) context.globalAlpha = 0;
        // Drawing
//	context.fillRect(this.x+this.padding, this.y+this.padding, this.width-1*this.padding, this.width-1*this.padding);
	context.fillRect(this.x, this.y,this.width, this.width);
        context.restore();
    }
};

var Pix = function(img, w, h){
    this.img = img;
    this.w = w;
    this.h = h;
    this.show = false;
    this.used = false;
};

Pix.prototype = {
    draw: function (sprite,context){
	context.globalAlpha = 0;
	if (this.show) context.globalAlpha = 1;
	context.drawImage(this.img,
			  sprite.x,sprite.y, 
			  this.w, this.h, 
			  sprite.x, sprite.y, 
			  this.w, this.h);
	

    }
};

var Sprite = function(type, x, y, artist){
    this.artist = artist;
    this.type = type;
    this.x = x;
    this.y = y;

 
    
};
    
