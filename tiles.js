//artists for tiles
var Tile = function (x, y){
    this.x = x;
    this.y = y;
    this.width = SIZE;
    this.flipped = false;
    this.padding = 2;
};

Tile.prototype = {
    draw: function (context) {
        // Setup
        context.save();
        context.globalAlpha = .6;
        context.fillStyle = 'black';
        if (this.flipped) context.fillStyle = 'blue';

        // Drawing
	    context.fillRect(this.x+this.padding, this.y+this.padding, this.width-2*this.padding, this.width-2*this.padding);
        context.restore();
    }
};
