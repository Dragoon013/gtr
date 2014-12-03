//artists for tiles
var Tile = function (x, y){
    
    this.x = x;
    this.y = y;
    this.width = 200;
};

Tile.prototype = {
    drawDown: function(context){
	//var img = this.darken ? this.dimg : this.img;

	context.strokeStyle = 'black';                                                                                                                            
	context.strokeRect(this.x, this.y, this.width, this.width);

    },
    
    drawUp: function(context){
	
	context.strokeStyle = 'blue';                                                                                                                            
	context.strokeRect(this.x, this.y, this.width, this.width);
    }
};
