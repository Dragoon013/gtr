//artists for tiles
var Tile = function (x, y){
    this.x = x;
    this.y = y;
    this.width = SIZE;
    this.flipped = false;
};

Tile.prototype = {
    draw: function (context) {
        context.save();
        context.globalAlpha = .6;
        context.fillStyle = 'black';
        if (this.flipped) context.fillStyle = 'blue';
	    context.fillRect(this.x, this.y, this.width, this.width);
        context.restore();
    }
};
